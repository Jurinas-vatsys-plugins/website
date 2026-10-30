import { html, label, text } from "../../build/html.ts";
import type { PluginList } from "../../shared/api.ts";
import { loadingCards, pluginCards, pluginCount, status, statusHtml } from "../../shared/render.ts";
import { layout, type Assets } from "../layout.ts";
import { snapshotScript } from "./snapshot.ts";

/* Screenshots of vatSys from virtualairtrafficsystem.com, faded in turn (styles: pages/home). */
const screens = `<div class="hero-screens" role="img" ${label("screensAlt")}>`
  + [1, 2, 3].map((n) => `<img src="img/vatsys/screen-${n}.png" alt="" width="862" height="361"${n > 1 ? ' loading="lazy"' : ""}>`).join("")
  + `</div>`;


export const homePage = (assets: Assets, snapshot: PluginList | null): string => layout("home", html`
  <main class="plugins-main">
    <div class="product-stack">
      <section class="product-feature product-vatsys hero-tile" aria-labelledby="hero-title">
        <div class="product-copy shell">
          <p class="eyebrow" ${text("heroEyebrow")}</p>
          <h1 id="hero-title" ${text("heroTitle")}</h1>
          <p class="product-tagline" ${text("heroBody")}</p>
          ${statusHtml(status(snapshot))}
        </div>
        ${screens}
      </section>
    </div>

    <section class="plugins-section shell" id="plugins" aria-labelledby="plugins-title">
      <div class="section-heading reveal">
        <div><p class="eyebrow" ${text("pluginsEyebrow")}</p><h2 id="plugins-title" ${text("pluginsTitle")}</h2></div>
        <p class="section-count" data-plugin-count>${snapshot ? pluginCount(snapshot) : ""}</p>
      </div>
      <div class="plugin-grid" data-plugin-list aria-live="polite">
${snapshot ? pluginCards(snapshot) : loadingCards()}
      </div>
    </section>

  </main>
  ${snapshotScript(snapshot)}`, assets);
