import { css } from "../../build/css.ts";

/** Mask-based icons, so they take the text color. */
export default css`
/* ---------- Icons (Ionicons, MIT: img/icons/LICENSE-ionicons.txt) ----------
   Each icon is a mask filled with the current text colour, so it follows links, hovers and themes. */
.icon {
  display: inline-block; flex: none; width: 1em; height: 1em; vertical-align: -.125em;
  background-color: currentColor;
  -webkit-mask: var(--icon) center / contain no-repeat;
  mask: var(--icon) center / contain no-repeat;
}
.icon-sun { --icon: url("../img/icons/sunny.svg"); }
.icon-moon { --icon: url("../img/icons/moon.svg"); }
.icon-download { --icon: url("../img/icons/download-outline.svg"); }
.icon-github { --icon: url("../img/icons/logo-github.svg"); }
.icon-alert { --icon: url("../img/icons/alert-circle-outline.svg"); }
.icon-sync { --icon: url("../img/icons/sync-outline.svg"); }
/* The vatSys mark, from virtualairtrafficsystem.com. */
.icon-vatsys { --icon: url("../img/vatsys/vatsys-mark.svg"); }
.icon-chevron { --icon: url("../img/icons/chevron-forward-outline.svg"); width: .7em; height: .7em; vertical-align: -.02em; }
.icon-chevron-back { --icon: url("../img/icons/chevron-back-outline.svg"); width: .7em; height: .7em; vertical-align: -.02em; }
/* Apple marks outbound links with a north-east arrow. */
.icon-external { --icon: url("../img/icons/arrow-forward-outline.svg"); width: .72em; height: .72em; vertical-align: -.02em; transform: rotate(-45deg); }
`;
