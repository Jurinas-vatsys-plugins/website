import { html } from "../../build/html.ts";
import type { PluginList } from "../../shared/api.ts";
import { detailLoading } from "../../shared/render.ts";
import { layout, type Assets } from "../layout.ts";
import { snapshotScript } from "./snapshot.ts";

/**
 * One plugin, picked by ?name=. The name is only known in the browser, so the page ships empty
 * and the script fills it from the snapshot right away, then from the API.
 */
export const pluginPage = (assets: Assets, snapshot: PluginList | null): string => layout("plugin", html`
  <main class="detail-main shell" data-plugin-detail aria-live="polite">
    ${detailLoading()}
  </main>
  ${snapshotScript(snapshot)}`, assets);
