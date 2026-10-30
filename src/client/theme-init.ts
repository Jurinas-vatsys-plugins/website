/* Inlined into <head> so the right theme is set before anything paints. */
(() => {
  type ThemePreference = "light" | "dark" | "system";
  const themes: readonly string[] = ["light", "dark", "system"];
  const isTheme = (value: string | null): value is ThemePreference => value !== null && themes.includes(value);

  let preference = "system";
  const urlPreference = new URLSearchParams(window.location.search).get("theme");
  try {
    preference = isTheme(urlPreference) ? urlPreference : (localStorage.getItem("theme") || "system");
  } catch {
    preference = isTheme(urlPreference) ? urlPreference : "system";
  }

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = preference === "dark" || (preference === "system" && systemDark);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.dataset.themePreference = preference;
  // No transitions until main.js has set the real initial state (see client/main.ts).
  document.documentElement.classList.add("is-booting");
})();
