/** Decorative mask icon from base/icons; the name matches its `.icon-<name>` class. */
export type IconName = "external" | "chevron" | "chevron-back" | "download" | "moon" | "sun" | "github" | "alert" | "sync" | "vatsys";

export const icon = (name: IconName): string => `<span class="icon icon-${name}" aria-hidden="true"></span>`;
