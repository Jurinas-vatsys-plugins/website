import { external, html, label, text } from "../../build/html.ts";
import { links } from "../config.ts";
import { icon } from "./icon.ts";

export const header = (): string => html`
  <header class="site-header">
    <nav class="nav shell" ${label("primaryNavLabel")}>
      <a class="brand" href="index.html">${icon("vatsys")}<span ${text("brand")}</span></a>
      <div class="nav-right">
        <a class="nav-link" ${external(links.homepage)}><span ${text("navHomepage")}</span> ${icon("external")}</a>
        <button class="theme-button" type="button" ${label("themeLabel")}><span class="theme-icon" aria-hidden="true">${icon("moon")}</span></button>
      </div>
    </nav>
  </header>`;
