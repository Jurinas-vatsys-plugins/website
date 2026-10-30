import type { PluginList } from "../../shared/api.ts";

/** The list the build embedded in the page, if it had one. */
export const readSnapshot = (): PluginList | null => {
  const script = document.getElementById("plugin-snapshot");
  if (!script?.textContent) return null;
  try {
    return JSON.parse(script.textContent) as PluginList;
  } catch {
    return null;
  }
};

/** The API caches for 60 s, so asking more often than this only returns the same answer. */
const refreshAfter = 60_000;

/**
 * Keeps calling `load` while the page is open: once now, then whenever the tab comes back into
 * view after the API's cache time, and every few minutes while it stays visible.
 */
export const keepFresh = (load: () => Promise<void>) => {
  let last = 0;
  let running = false;
  const run = async () => {
    if (running) return;
    running = true;
    last = Date.now();
    try { await load(); } finally { running = false; }
  };
  void run();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && Date.now() - last > refreshAfter) void run();
  });
  window.setInterval(() => {
    if (document.visibilityState === "visible" && Date.now() - last > refreshAfter * 5) void run();
  }, refreshAfter);
  return run;
};
