import type { PluginList } from "../../shared/api.ts";

/**
 * The plugin list as the build saw it, embedded for the browser. The page script draws from it
 * at once and falls back to it when the API can't be reached.
 */
export const snapshotScript = (snapshot: PluginList | null): string => snapshot
  ? `<script type="application/json" id="plugin-snapshot">${JSON.stringify(snapshot).replace(/</g, "\u003c")}</script>`
  : "";
