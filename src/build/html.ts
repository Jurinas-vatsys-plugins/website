import { copy, type CopyKey } from "../shared/copy.ts";

type Value = string | number | false | null | undefined | Value[];

const flatten = (value: Value): string => {
  if (Array.isArray(value)) return value.map(flatten).join("");
  if (value === false || value === null || value === undefined) return "";
  return String(value);
};

/**
 * Tag for page templates. Values are inserted as-is (the copy is ours and may contain markup such
 * as <code>); arrays are joined and false/null/undefined render nothing, so conditionals read naturally.
 */
export const html = (strings: TemplateStringsArray, ...values: Value[]): string =>
  strings.reduce((out, part, index) => out + part + (index < values.length ? flatten(values[index]) : ""), "");

/** Escapes text for use inside a double-quoted attribute. */
export const attr = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Closes an opening tag with a piece of copy: `<h2 ${text("pluginsTitle")}</h2>`. */
export const text = (key: CopyKey): string => `>${copy[key]}`;

/** aria-label attribute from a piece of copy. */
export const label = (key: CopyKey): string => `aria-label="${attr(stripTags(copy[key]))}"`;

/** Attributes for a link that opens another site in a new tab. */
export const external = (href: string): string => `href="${attr(href)}" target="_blank" rel="noopener noreferrer"`;

const stripTags = (value: string) => value.replace(/<[^>]*>/g, "");
