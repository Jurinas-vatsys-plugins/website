/* Stylesheets the build writes, and the modules each one is made of, in cascade order. */
import fonts from "./base/fonts.ts";
import tokens from "./base/tokens.ts";
import reset from "./base/reset.ts";
import header from "./layout/header.ts";
import buttons from "./base/buttons.ts";
import tiles from "./base/tiles.ts";
import footer from "./layout/footer.ts";
import home from "./pages/home.ts";
import pluginCards from "./pages/plugin-cards.ts";
import detail from "./pages/detail.ts";
import markdown from "./pages/markdown.ts";
import reveal from "./base/reveal.ts";
import icons from "./base/icons.ts";
import tablet from "./responsive/tablet.ts";
import phone from "./responsive/phone.ts";
import reducedMotion from "./responsive/reduced-motion.ts";

export const stylesheets = {
  /** Every page. Breakpoint overrides come last so they win over the sections above them. */
  "css/style.css": [
    fonts, tokens, reset, header, buttons, tiles,
    footer, home, pluginCards, detail, markdown, reveal, icons,
    tablet, phone, reducedMotion,
  ],
} satisfies Record<string, string[]>;

export type StylesheetPath = keyof typeof stylesheets;
