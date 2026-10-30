import type { Plugin } from "./api.ts";

/** Escapes API text for element content and double-quoted attributes. */
export const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const lowercaseWords = new Set(["and", "or", "of", "the", "for", "to", "in"]);

/**
 * A readable plugin name. The release title wins when it says more than the tag
 * ("Drag and Zoom v2.0.0" → "Drag and Zoom"); repo names that already use capitals are kept
 * ("Discord-RP"), and kebab-case ones are title-cased ("plugins-manager" → "Plugins Manager").
 */
export const displayName = (plugin: Plugin): string => {
  const release = plugin.latest;
  if (release) {
    const title = release.name.replace(new RegExp(`\\s*v?${release.version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"), "").trim();
    if (title && title !== release.tag) return title;
  }
  if (/[A-Z]/.test(plugin.name)) return plugin.name;
  return plugin.name.split(/[-_\s]+/).filter(Boolean)
    .map((word, index) => (index > 0 && lowercaseWords.has(word) ? word : word[0].toUpperCase() + word.slice(1)))
    .join(" ");
};

const locale = "en-US";

export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(iso));

export const formatNumber = (value: number): string => new Intl.NumberFormat(locale).format(value);

export const formatSize = (bytes: number): string => {
  const [unit, size] = bytes >= 1_000_000 ? ["megabyte", bytes / 1_000_000] : bytes >= 1_000 ? ["kilobyte", bytes / 1_000] : ["byte", bytes];
  return new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "short", maximumFractionDigits: size < 10 ? 1 : 0 }).format(size);
};

const steps: Array<[Intl.RelativeTimeFormatUnit, number]> = [["year", 31_536_000], ["month", 2_592_000], ["week", 604_800], ["day", 86_400], ["hour", 3_600], ["minute", 60]];

/** "5 minutes ago", or "just now" for anything under a minute. */
export const formatRelative = (iso: string, now = Date.now()): string => {
  const seconds = (new Date(iso).getTime() - now) / 1000;
  const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  for (const [unit, length] of steps) {
    if (Math.abs(seconds) >= length) return format.format(Math.round(seconds / length), unit);
  }
  return format.format(0, "second");
};
