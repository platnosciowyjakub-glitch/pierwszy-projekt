// Kształt danych modułu prezentów (tak jak w bazie, migracja 0002).

export type GiftStatus = "idea" | "bought" | "wrapped" | "given";
export const STATUSES: GiftStatus[] = ["idea", "bought", "wrapped", "given"];

export type OccasionType = "christmas" | "mikolajki" | "birthday" | "other";
export type Relation = "mama" | "tata" | "partner" | "dziecko" | "rodzenstwo" | "dziadkowie" | "przyjaciel" | "wspolpracownik" | "inne";
export const RELATIONS: Relation[] = ["mama", "tata", "partner", "dziecko", "rodzenstwo", "dziadkowie", "przyjaciel", "wspolpracownik", "inne"];
export type AvatarColor = "sage" | "gold" | "cranberry" | "spruce" | "sand" | "moss";
export const AVATAR_COLORS: AvatarColor[] = ["sage", "gold", "cranberry", "spruce", "sand", "moss"];
export type Priority = "high" | "normal" | "low";

export type GiftList = {
  id: string;
  owner_id: string;
  name: string;
  occasion_type: OccasionType;
  event_date: string | null;
  total_budget_grosze: number | null;
  is_default: boolean;
  archived_at: string | null;
  created_at: string;
};

export type Recipient = {
  id: string;
  list_id: string;
  name: string;
  relation: Relation;
  budget_grosze: number | null;
  notes: string | null;
  birthday: string | null;
  avatar_color: AvatarColor;
  created_at: string;
};

export type Gift = {
  id: string;
  list_id: string;
  recipient_id: string;
  title: string;
  price_grosze: number | null;
  quantity: number;
  url: string | null;
  store_name: string | null;
  image_path: string | null;
  notes: string | null;
  status: GiftStatus;
  priority: Priority | null;
  deleted_at: string | null;
  created_at: string;
};

export type Attachment = {
  id: string;
  gift_id: string;
  list_id: string;
  storage_path: string;
  kind: "photo" | "receipt";
  mime: string;
  size_bytes: number;
  created_at: string;
};

export const LIST_FIELDS = "id, owner_id, name, occasion_type, event_date, total_budget_grosze, is_default, archived_at, created_at";
export const RECIPIENT_FIELDS = "id, list_id, name, relation, budget_grosze, notes, birthday, avatar_color, created_at";
export const GIFT_FIELDS =
  "id, list_id, recipient_id, title, price_grosze, quantity, url, store_name, image_path, notes, status, priority, deleted_at, created_at";
export const ATTACHMENT_FIELDS = "id, gift_id, list_id, storage_path, kind, mime, size_bytes, created_at";

export const GIFT_BUCKET = "gift-files";

// Wydane = kupione i dalej; planowane = pomysły z ceną
export function giftCost(g: Gift) {
  return (g.price_grosze ?? 0) * g.quantity;
}
export function spentOf(gifts: Gift[]) {
  return gifts.reduce((s, g) => s + (g.status !== "idea" ? giftCost(g) : 0), 0);
}
export function plannedOf(gifts: Gift[]) {
  return gifts.reduce((s, g) => s + (g.status === "idea" ? giftCost(g) : 0), 0);
}
export function nextStatus(s: GiftStatus): GiftStatus | null {
  const i = STATUSES.indexOf(s);
  return i < STATUSES.length - 1 ? STATUSES[i + 1] : null;
}
