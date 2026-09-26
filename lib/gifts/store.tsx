"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { gifts as t } from "@/content/gifts";
import { freeLimits } from "@/config/pricing";
import { fill } from "@/lib/plural";
import {
  GIFT_BUCKET,
  GIFT_FIELDS,
  LIST_FIELDS,
  RECIPIENT_FIELDS,
  type Gift,
  type GiftList,
  type GiftStatus,
  type Recipient,
} from "@/lib/gifts/types";

// Wspólny stan modułu prezentów: lista (okazja), osoby, prezenty, ukrywanie kwot i komunikaty.
// Zmiany widać od razu na ekranie; gdy zapis się nie uda, wraca poprzedni stan i spokojny komunikat.

const ACTIVE_KEY = "gviazdka-aktywna-lista";
const HIDE_KEY = "gviazdka-ukryj-kwoty";

export type Toast = { id: number; text: string; action?: { label: string; run: () => void } };
export type RecipientInput = Pick<Recipient, "name" | "relation" | "budget_grosze" | "notes" | "birthday" | "avatar_color">;
export type GiftInput = Pick<Gift, "recipient_id" | "title" | "price_grosze" | "quantity" | "url" | "store_name" | "image_path" | "notes" | "priority"> & {
  status?: GiftStatus;
};
export type ListInput = Pick<GiftList, "name" | "occasion_type" | "event_date" | "total_budget_grosze">;

type Store = {
  supabase: SupabaseClient;
  session: Session;
  ready: boolean;
  error: string;
  lists: GiftList[];
  list: GiftList | null;
  recipients: Recipient[];
  gifts: Gift[];
  imageUrls: Record<string, string>;
  hideAmounts: boolean;
  toast: Toast | null;
  justChanged: string | null;
  toggleHide: () => void;
  dismissToast: () => void;
  notify: (text: string, action?: Toast["action"]) => void;
  selectList: (id: string) => void;
  createList: (input: ListInput) => Promise<boolean>;
  updateList: (input: ListInput) => Promise<boolean>;
  addRecipient: (input: RecipientInput) => Promise<Recipient | null>;
  updateRecipient: (id: string, input: Partial<RecipientInput>) => Promise<boolean>;
  removeRecipient: (id: string) => Promise<boolean>;
  addGift: (input: GiftInput) => Promise<Gift | null>;
  updateGift: (id: string, input: Partial<GiftInput>) => Promise<boolean>;
  setStatus: (id: string, status: GiftStatus) => Promise<boolean>;
  removeGift: (id: string) => Promise<void>;
  duplicateGift: (id: string) => Promise<void>;
  signImages: (paths: string[]) => Promise<void>;
};

const Ctx = createContext<Store | null>(null);

export function useGifts() {
  const store = useContext(Ctx);
  if (!store) throw new Error("useGifts poza GiftsProvider");
  return store;
}

function readLocal(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeLocal(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function GiftsProvider({ supabase, session, children }: { supabase: SupabaseClient; session: Session; children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [lists, setLists] = useState<GiftList[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [giftRows, setGiftRows] = useState<Gift[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [hideAmounts, setHideAmounts] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [justChanged, setJustChanged] = useState<string | null>(null);
  const toastId = useRef(0);
  const giftsRef = useRef<Gift[]>([]);
  giftsRef.current = giftRows;

  const notify = useCallback((text: string, action?: Toast["action"]) => {
    toastId.current += 1;
    setToast({ id: toastId.current, text, action });
  }, []);
  const failed = useCallback(() => {
    notify(t.saveError);
    return false;
  }, [notify]);

  useEffect(() => {
    setHideAmounts(readLocal(HIDE_KEY) === "1");
  }, []);

  const toggleHide = useCallback(() => {
    setHideAmounts((h) => {
      writeLocal(HIDE_KEY, h ? "0" : "1");
      return !h;
    });
  }, []);

  const signImages = useCallback(
    async (paths: string[]) => {
      const missing = [...new Set(paths)].filter((p) => p && !imageUrls[p]);
      if (!missing.length) return;
      const { data } = await supabase.storage.from(GIFT_BUCKET).createSignedUrls(missing, 3600);
      if (!data) return;
      setImageUrls((m) => {
        const next = { ...m };
        for (const row of data) if (row.path && row.signedUrl) next[row.path] = row.signedUrl;
        return next;
      });
    },
    [supabase, imageUrls],
  );

  // 1. Listy: jeśli nie ma żadnej, tworzymy „Święta 2026”
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const load = () => supabase.from("gift_lists").select(LIST_FIELDS).is("archived_at", null).order("created_at");
      let { data, error } = await load();
      if (!error && data && data.length === 0) {
        const created = await supabase
          .from("gift_lists")
          .insert({ name: t.list.defaultName, occasion_type: "christmas", event_date: t.list.defaultDate, is_default: true })
          .select(LIST_FIELDS)
          .single();
        // 23505 = ktoś (np. druga karta) właśnie ją utworzył – wystarczy wczytać ponownie
        if (created.error && created.error.code !== "23505") error = created.error;
        ({ data, error } = await load());
      }
      if (cancelled) return;
      if (error || !data) {
        setError(t.loadError);
        setReady(true);
        return;
      }
      const rows = data as GiftList[];
      setLists(rows);
      const saved = readLocal(ACTIVE_KEY);
      setActiveId(rows.find((l) => l.id === saved)?.id ?? rows.find((l) => l.is_default)?.id ?? rows[0]?.id ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  // 2. Osoby i prezenty wybranej listy
  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;
    setReady(false);
    (async () => {
      const [r, g] = await Promise.all([
        supabase.from("recipients").select(RECIPIENT_FIELDS).eq("list_id", activeId).order("created_at"),
        supabase.from("gifts").select(GIFT_FIELDS).eq("list_id", activeId).is("deleted_at", null).order("created_at"),
      ]);
      if (cancelled) return;
      if (r.error || g.error) {
        setError(t.loadError);
      } else {
        setError("");
        setRecipients(r.data as Recipient[]);
        setGiftRows(g.data as Gift[]);
        const paths = (g.data as Gift[]).map((x) => x.image_path).filter(Boolean) as string[];
        if (paths.length) {
          const { data } = await supabase.storage.from(GIFT_BUCKET).createSignedUrls(paths, 3600);
          if (data && !cancelled) {
            const map: Record<string, string> = {};
            for (const row of data) if (row.path && row.signedUrl) map[row.path] = row.signedUrl;
            setImageUrls(map);
          }
        }
      }
      setReady(true);
      // Sprzątanie: prezenty usunięte ponad dobę temu znikają na dobre
      const dayAgo = new Date(Date.now() - 86_400_000).toISOString();
      supabase.from("gifts").delete().eq("list_id", activeId).lt("deleted_at", dayAgo).then(() => {});
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase, activeId]);

  const list = lists.find((l) => l.id === activeId) ?? null;

  const selectList = useCallback((id: string) => {
    writeLocal(ACTIVE_KEY, id);
    setActiveId(id);
  }, []);

  const createList = useCallback(
    async (input: ListInput) => {
      const { data, error } = await supabase.from("gift_lists").insert(input).select(LIST_FIELDS).single();
      if (error) return failed();
      setLists((ls) => [...ls, data as GiftList]);
      selectList((data as GiftList).id);
      return true;
    },
    [supabase, failed, selectList],
  );

  const updateList = useCallback(
    async (input: ListInput) => {
      if (!activeId) return false;
      const { error } = await supabase.from("gift_lists").update(input).eq("id", activeId);
      if (error) return failed();
      setLists((ls) => ls.map((l) => (l.id === activeId ? { ...l, ...input } : l)));
      return true;
    },
    [supabase, activeId, failed],
  );

  const addRecipient = useCallback(
    async (input: RecipientInput) => {
      if (!activeId) return null;
      // Miejsce na limit wersji darmowej (config/pricing.ts → freeLimits; na razie wyłączony)
      if (freeLimits.maxRecipients !== null && recipients.length >= freeLimits.maxRecipients) {
        notify(t.limitReached);
        return null;
      }
      const { data, error } = await supabase
        .from("recipients")
        .insert({ ...input, list_id: activeId })
        .select(RECIPIENT_FIELDS)
        .single();
      if (error) {
        failed();
        return null;
      }
      setRecipients((rs) => [...rs, data as Recipient]);
      return data as Recipient;
    },
    [supabase, activeId, failed, notify, recipients.length],
  );

  const updateRecipient = useCallback(
    async (id: string, input: Partial<RecipientInput>) => {
      const { error } = await supabase.from("recipients").update(input).eq("id", id);
      if (error) return failed();
      setRecipients((rs) => rs.map((r) => (r.id === id ? { ...r, ...input } : r)));
      return true;
    },
    [supabase, failed],
  );

  const removeRecipient = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("recipients").delete().eq("id", id);
      if (error) return failed();
      setRecipients((rs) => rs.filter((r) => r.id !== id));
      setGiftRows((gs) => gs.filter((g) => g.recipient_id !== id));
      return true;
    },
    [supabase, failed],
  );

  const addGift = useCallback(
    async (input: GiftInput) => {
      if (!activeId) return null;
      const { data, error } = await supabase
        .from("gifts")
        .insert({ ...input, list_id: activeId })
        .select(GIFT_FIELDS)
        .single();
      if (error) {
        failed();
        return null;
      }
      setGiftRows((gs) => [...gs, data as Gift]);
      if ((data as Gift).image_path) signImages([(data as Gift).image_path!]);
      return data as Gift;
    },
    [supabase, activeId, failed, signImages],
  );

  const patchGift = useCallback(
    async (id: string, patch: Partial<Gift>) => {
      const before = giftsRef.current;
      setGiftRows((gs) => gs.map((g) => (g.id === id ? { ...g, ...patch } : g)));
      const { error } = await supabase.from("gifts").update(patch).eq("id", id);
      if (error) {
        setGiftRows(before);
        return failed();
      }
      return true;
    },
    [supabase, failed],
  );

  const updateGift = useCallback(
    async (id: string, input: Partial<GiftInput>) => {
      const ok = await patchGift(id, input);
      if (ok && input.image_path) signImages([input.image_path]);
      return ok;
    },
    [patchGift, signImages],
  );

  const setStatus = useCallback(
    async (id: string, status: GiftStatus) => {
      setJustChanged(id);
      return patchGift(id, { status });
    },
    [patchGift],
  );

  const removeGift = useCallback(
    async (id: string) => {
      const gift = giftsRef.current.find((g) => g.id === id);
      if (!gift) return;
      const before = giftsRef.current;
      setGiftRows((gs) => gs.filter((g) => g.id !== id));
      const { error } = await supabase.from("gifts").update({ deleted_at: new Date().toISOString() }).eq("id", id);
      if (error) {
        setGiftRows(before);
        failed();
        return;
      }
      notify(fill(t.gift.removed, { name: gift.title }), {
        label: t.gift.undo,
        run: async () => {
          const { error } = await supabase.from("gifts").update({ deleted_at: null }).eq("id", id);
          if (error) return failed();
          setGiftRows((gs) => (gs.some((g) => g.id === id) ? gs : [...gs, gift].sort((a, b) => a.created_at.localeCompare(b.created_at))));
        },
      });
    },
    [supabase, failed, notify],
  );

  const duplicateGift = useCallback(
    async (id: string) => {
      const g = giftsRef.current.find((x) => x.id === id);
      if (!g) return;
      const copy = await addGift({
        recipient_id: g.recipient_id,
        title: g.title,
        price_grosze: g.price_grosze,
        quantity: g.quantity,
        url: g.url,
        store_name: g.store_name,
        image_path: g.image_path,
        notes: g.notes,
        priority: g.priority,
      });
      if (copy) notify(fill(t.gift.duplicated, { name: g.title }));
    },
    [addGift, notify],
  );

  const store = useMemo<Store>(
    () => ({
      supabase,
      session,
      ready,
      error,
      lists,
      list,
      recipients,
      gifts: giftRows,
      imageUrls,
      hideAmounts,
      toast,
      justChanged,
      toggleHide,
      dismissToast: () => setToast(null),
      notify,
      selectList,
      createList,
      updateList,
      addRecipient,
      updateRecipient,
      removeRecipient,
      addGift,
      updateGift,
      setStatus,
      removeGift,
      duplicateGift,
      signImages,
    }),
    [
      supabase, session, ready, error, lists, list, recipients, giftRows, imageUrls, hideAmounts, toast, justChanged,
      toggleHide, notify, selectList, createList, updateList, addRecipient, updateRecipient, removeRecipient, addGift,
      updateGift, setStatus, removeGift, duplicateGift, signImages,
    ],
  );

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}
