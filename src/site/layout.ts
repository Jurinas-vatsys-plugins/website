import { attr, html } from "../build/html.ts";
import { copy } from "../shared/copy.ts";
import { pages, type PageId } from "./config.ts";
import { footer } from "./components/footer.ts";
import { header } from "./components/header.ts";

export type Assets = {
  /** Built URL (with cache-busting hash) for a css/ or js/ path. */
  url: (path: string) => string;
  /** The theme bootstrap, inlined so nothing paints in the wrong theme. */
  themeInit: string;
};

/** Wraps a page body in the shared head, header, phone menu and footer. */
export const layout = (id: PageId, main: string, assets: Assets): string => {
  const page = pages[id];
  return html`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="description" content="${attr(page.description)}">
  <meta name="theme-color" content="#f5f5f7">
  <title>${copy[page.titleKey]}</title>
  <link rel="preconnect" href="https://api.jurina.org" crossorigin>
  <link rel="icon" type="image/png" href="img/vatsys/vatsys-icon.png">
  <script>${assets.themeInit}</script>
  <link rel="stylesheet" href="${assets.url("css/style.css")}">
  <script src="${assets.url("js/main.js")}" defer></script>
</head>
<body>
${header()}

${main}
${footer()}
</body>
</html>
`;
};
