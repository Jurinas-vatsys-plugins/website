import { external, html, label, text } from "../../build/html.ts";
import { links } from "../config.ts";
import { icon } from "./icon.ts";

export const footer = (): string => html`
  <footer class="site-footer shell">
    <div class="footer-directory" ${label("footerLabel")}>
      <div class="footer-column">
        <h2 ${text("footerPlugins")}</h2>
        <a href="index.html#plugins" ${text("footerAll")}</a>
      </div>
      <div class="footer-column">
        <h2 ${text("footerJurina")}</h2>
        <a ${external(links.homepage)} ${text("footerHomepage")}</a>
        <a ${external(links.projects)} ${text("footerProjects")}</a>
        <a ${external(links.github)}>GitHub</a>
      </div>
      <div class="footer-column">
        <h2 ${text("footerContact")}</h2>
        <a href="mailto:${links.mailDevelopment}">${links.mailDevelopment}</a>
        <a href="mailto:${links.mailGeneral}">${links.mailGeneral}</a>
      </div>
    </div>
    <div class="footer-top"><a ${external(links.org)}><span ${text("source")}</span> ${icon("external")}</a></div>
    <div class="footer-bottom">
      <p>© <span id="current-year">${new Date().getFullYear()}</span> Jurina</p>
      <div class="pride-note">
        <span ${text("pride")}</span>
        <span class="pride-flags"><span class="pride-flag pride-flag-trans" role="img" ${label("transFlagLabel")}></span><span class="pride-flag pride-flag-lgbt" role="img" ${label("rainbowFlagLabel")}></span></span>
      </div>
    </div>
  </footer>`;
