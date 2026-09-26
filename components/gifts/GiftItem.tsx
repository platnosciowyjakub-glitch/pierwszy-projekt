"use client";

import { useState } from "react";
import { gifts as t } from "@/content/gifts";
import { fill } from "@/lib/plural";
import { affiliateUrl, linkRel } from "@/lib/affiliate";
import { useGifts } from "@/lib/gifts/store";
import { giftCost, type Gift } from "@/lib/gifts/types";
import { GiftForm } from "@/components/gifts/Forms";
import { Avatar, GiftPlaceholder, Menu, Sheet, StatusControl, useMoney } from "@/components/gifts/ui";

// Jeden prezent na liście: zdjęcie, nazwa, cena, sklep, etap i szybkie akcje.
export function GiftItem({ gift, showPerson = false }: { gift: Gift; showPerson?: boolean }) {
  const { recipients, imageUrls, justChanged, removeGift, duplicateGift, updateGift } = useGifts();
  const money = useMoney();
  const [editing, setEditing] = useState(false);
  const [moving, setMoving] = useState(false);
  const person = recipients.find((r) => r.id === gift.recipient_id);
  const image = gift.image_path ? imageUrls[gift.image_path] : null;
  const link = gift.url ? affiliateUrl(gift.url) : null;
  const done = gift.status === "given";

  return (
    <li className="pop-in relative py-3.5 has-[[aria-expanded=true]]:z-20">
      <div className="flex items-start gap-3">
        <button type="button" onClick={() => setEditing(true)} className="shrink-0 overflow-hidden rounded-2xl" aria-label={`${t.gift.edit}: ${gift.title}`}>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="h-14 w-14 bg-cream object-cover" />
          ) : (
            <GiftPlaceholder className="h-14 w-14" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <button type="button" onClick={() => setEditing(true)} className="block max-w-full text-left">
            <span className={`block break-words font-semibold leading-snug hover:underline hover:underline-offset-4 ${done ? "text-moss" : ""}`}>{gift.title}</span>
          </button>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-moss">
            {showPerson && person && <span className="font-semibold text-spruce">{person.name}</span>}
            {gift.price_grosze !== null && (
              <span className="tabular-nums">
                {money(giftCost(gift))}
                {gift.quantity > 1 && ` · ${fill(t.gift.quantity, { n: gift.quantity })}`}
              </span>
            )}
            {gift.store_name && <span>{gift.store_name}</span>}
            {gift.priority === "high" && <span className="rounded-full bg-sage px-2 text-xs font-semibold text-spruce">{t.priorities.high}</span>}
          </p>
          {link && (
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm">
              <a href={link.href} target="_blank" rel={linkRel(link.sponsored)} className="inline-flex min-h-8 items-center font-semibold text-cranberry underline underline-offset-4">
                {t.gift.openLink}
              </a>
              {link.sponsored && <span className="rounded-full border border-line px-2 text-xs text-moss">{t.gift.affiliate}</span>}
            </p>
          )}
          <div className="mt-2 sm:hidden">
            <StatusControl id={gift.id} status={gift.status} name={gift.title} animate={justChanged === gift.id} />
          </div>
        </div>
        <div className="hidden sm:block">
          <StatusControl id={gift.id} status={gift.status} name={gift.title} animate={justChanged === gift.id} />
        </div>
        <Menu
          label={fill(t.gift.menu, { name: gift.title })}
          items={[
            { label: t.gift.edit, onSelect: () => setEditing(true) },
            ...(recipients.length > 1 ? [{ label: t.gift.move, onSelect: () => setMoving(true) }] : []),
            { label: t.gift.duplicate, onSelect: () => duplicateGift(gift.id) },
            { label: t.gift.remove, onSelect: () => removeGift(gift.id), danger: true },
          ]}
        />
      </div>

      <GiftForm open={editing} onClose={() => setEditing(false)} gift={gift} />
      <Sheet open={moving} onClose={() => setMoving(false)} title={fill(t.gift.moveTitle, { name: gift.title })}>
        <ul className="space-y-1">
          {recipients
            .filter((r) => r.id !== gift.recipient_id)
            .map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={async () => {
                    if (await updateGift(gift.id, { recipient_id: r.id })) setMoving(false);
                  }}
                  className="flex min-h-14 w-full items-center gap-3 rounded-2xl px-2 text-left font-semibold hover:bg-cream"
                >
                  <Avatar name={r.name} color={r.avatar_color} />
                  {r.name}
                </button>
              </li>
            ))}
        </ul>
      </Sheet>
    </li>
  );
}
