import { gifts as t } from "@/content/gifts";
import { fill, plural } from "@/lib/plural";
import type { GiftList } from "@/lib/gifts/types";

// Ile pełnych dni do daty (liczone po kalendarzu, w czasie lokalnym)
export function daysUntil(isoDate: string, now = new Date()) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const target = Date.UTC(y, m - 1, d);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86_400_000);
}

export function countdownText(list: GiftList, now = new Date()) {
  if (!list.event_date) return null;
  const n = daysUntil(list.event_date, now);
  const c = t.countdown;
  if (n < 0) return c.past;
  const christmas = list.occasion_type === "christmas";
  if (n === 0) return christmas ? c.christmasToday : fill(c.otherToday, { name: list.name });
  if (n === 1) return christmas ? c.christmasTomorrow : fill(c.otherTomorrow, { name: list.name });
  return fill(christmas ? c.christmasMany : c.otherMany, { n, days: plural(n, c.days), name: list.name });
}

export function formatDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pl-PL", { day: "numeric", month: "long" });
}
