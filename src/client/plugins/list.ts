import { fetchPlugins } from "../../shared/api.ts";
import { loadError, loadingCards, pluginCards, pluginCount, status, statusHtml } from "../../shared/render.ts";
import { updatePageLinks } from "../core/page-links.ts";
import { observeReveal } from "../features/page-chrome.ts";
import { keepFresh, readSnapshot } from "./source.ts";

/** Home page: plugin cards, count and status, redrawn with fresh data while the page is open. */
export const initPluginList = () => {
  const grid = document.querySelector<HTMLElement>("[data-plugin-list]");
  if (!grid) return;
  const count = document.querySelector("[data-plugin-count]");
  let list = readSnapshot();
  let failed = false;
  // The build already drew the snapshot; only swap the cards when they actually change, so the
  // fade-in doesn't replay on every refresh.
  let drawn = list ? pluginCards(list) : "";

  const drawStatus = () => {
    const line = document.querySelector("[data-status]");
    if (line) line.outerHTML = statusHtml(status(list, { offline: failed && list !== null }));
  };

  const draw = () => {
    drawStatus();
    const cards = list ? pluginCards(list) : failed ? loadError() : loadingCards();
    if (count) count.textContent = list ? pluginCount(list) : "";
    if (cards === drawn) return;
    grid.innerHTML = cards;
    drawn = cards;
    observeReveal(grid);
    updatePageLinks();
  };

  draw();
  const refresh = keepFresh(async () => {
    try {
      list = await fetchPlugins();
      failed = false;
    } catch {
      failed = true;
    }
    draw();
  });

  grid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element) || !event.target.closest("[data-retry]")) return;
    failed = false;
    draw();
    void refresh();
  });
  // Keeps "checked 5 minutes ago" true while the page sits open.
  window.setInterval(drawStatus, 30_000);
};
