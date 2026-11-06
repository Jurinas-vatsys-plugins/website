import { css } from "../../build/css.ts";

/*
 * Split Download button: the left half gives the default file, the arrow opens a menu with every
 * file. The menu follows macOS pull-down menus: frosted glass, small system type, a check on the
 * default row and a blue highlight on the row under the pointer.
 */
export default css`
.download-group { position: relative; display: inline-flex; align-items: stretch; gap: 1px; }
.download-group > .button { border-radius: 999px 0 0 999px; padding-right: 16px; }
.plugin-actions .download-group { margin-right: 4px; }
.plugin-actions .download-group > .button { margin-right: 0; padding-right: 14px; }
.plugin-actions .download-toggle { margin-right: 0; padding: 0 12px 0 10px; }
.download-menu { display: flex; }
.download-toggle { height: 100%; min-height: 0; padding: 0 14px 0 12px; border-radius: 0 999px 999px 0; list-style: none; cursor: pointer; user-select: none; }
.download-toggle::-webkit-details-marker { display: none; }
.download-toggle .icon { width: 11px; height: 11px; transform: rotate(90deg); transition: transform .25s var(--ease-out); }
.download-menu[open] .download-toggle .icon { transform: rotate(-90deg); }
.download-menu[open] .download-toggle { background: var(--blue-hover); }
.download-toggle:active { transform: none; }
/* Keep an open menu above the cards that come after this one. */
:is(.plugin-card, .detail-hero):has(.download-menu[open]) { position: relative; z-index: 5; }

.download-options {
  position: absolute; z-index: 20; top: calc(100% + 6px); left: 0;
  width: max-content; min-width: 220px; max-width: min(380px, calc(100vw - 40px));
  margin: 0; padding: 5px; list-style: none; text-align: left;
  border-radius: 12px;
  background: rgba(246,246,248,.78);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  backdrop-filter: saturate(180%) blur(24px);
  box-shadow: 0 0 0 .5px rgba(0,0,0,.14), 0 10px 32px rgba(0,0,0,.16), 0 2px 6px rgba(0,0,0,.06);
  transform-origin: top left;
  animation: menu-in .16s var(--ease-out);
}
[data-theme="dark"] .download-options {
  background: rgba(40,40,42,.78);
  box-shadow: 0 0 0 .5px rgba(255,255,255,.16), inset 0 .5px 0 rgba(255,255,255,.08), 0 10px 32px rgba(0,0,0,.5);
}
@keyframes menu-in { from { opacity: 0; transform: scale(.97); } }
.download-options li + li { margin-top: 1px; }
.download-options a {
  padding: 6px 12px 7px 6px; border-radius: 7px;
  display: grid; grid-template-columns: 18px auto; column-gap: 6px; align-items: baseline;
  color: var(--ink);
}
.download-option-check { grid-row: 1 / 3; align-self: center; display: grid; place-items: center; color: var(--blue); }
.download-option-check .icon { width: 12px; height: 12px; }
.download-option-name { overflow: hidden; font-size: 13px; line-height: 1.35; letter-spacing: -.01em; white-space: nowrap; text-overflow: ellipsis; }
.download-option-meta { color: var(--muted); font-size: 11px; line-height: 1.35; letter-spacing: 0; }
.download-options a:hover, .download-options a:focus-visible { background: var(--button); color: #fff; outline: none; }
.download-options a:is(:hover, :focus-visible) :is(.download-option-meta, .download-option-check) { color: rgba(255,255,255,.82); }

/* Centred on the plugin page, so the menu opens centred under the button too. */
.detail-actions .download-options { left: 50%; transform: translateX(-50%); transform-origin: top center; animation: none; }
`;
