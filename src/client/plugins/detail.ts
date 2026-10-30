import { ApiError, fetchPlugin, type Plugin } from "../../shared/api.ts";
import { copy, fill } from "../../shared/copy.ts";
import { displayName } from "../../shared/format.ts";
import { detailLoading, detailMessage, loadError, pluginDetail } from "../../shared/render.ts";
import { updatePageLinks } from "../core/page-links.ts";
import { observeReveal } from "../features/page-chrome.ts";
import { keepFresh, readSnapshot } from "./source.ts";

type State = { kind: "loading" } | { kind: "ready"; plugin: Plugin } | { kind: "missing" } | { kind: "failed" };

/** plugin.html?name=…: one plugin's release, files and notes, kept current while the page is open. */
export const initPluginDetail = () => {
  const main = document.querySelector<HTMLElement>("[data-plugin-detail]");
  if (!main) return;
  const name = new URLSearchParams(window.location.search).get("name")?.trim() ?? "";
  // Draw straight away from the build's snapshot when it knows this plugin.
  const saved = readSnapshot()?.plugins.find((plugin) => plugin.name.toLowerCase() === name.toLowerCase());
  let state: State = saved ? { kind: "ready", plugin: saved } : { kind: "loading" };
  let drawn = "";

  const draw = () => {
    const content = !name ? detailMessage()
      : state.kind === "ready" ? pluginDetail(state.plugin)
      : state.kind === "missing" ? detailMessage(name)
      : state.kind === "failed" ? loadError()
      : detailLoading();
    document.title = state.kind === "ready" ? fill(copy.pluginTitle, { name: displayName(state.plugin) }) : copy.pluginPageTitle;
    if (content === drawn) return;
    main.innerHTML = content;
    drawn = content;
    observeReveal(main);
    updatePageLinks();
  };

  draw();
  if (!name) return;

  const refresh = keepFresh(async () => {
    try {
      state = { kind: "ready", plugin: await fetchPlugin(name) };
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) state = { kind: "missing" };
      // A network hiccup keeps whatever is already on screen.
      else if (state.kind !== "ready") state = { kind: "failed" };
    }
    draw();
  });

  main.addEventListener("click", (event) => {
    if (!(event.target instanceof Element) || !event.target.closest("[data-retry]")) return;
    state = { kind: "loading" };
    draw();
    void refresh();
  });
};
