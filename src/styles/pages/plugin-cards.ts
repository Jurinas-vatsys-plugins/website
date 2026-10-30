import { css } from "../../build/css.ts";

/** Plugin cards on the home page, plus the app-style icon shared with the detail page. */
export default css`
.plugin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr)); gap: 20px; }
.plugin-card {
  min-width: 0; padding: 30px 30px 24px; border-radius: var(--radius-tile);
  display: flex; flex-direction: column; gap: 18px;
  background: var(--surface); box-shadow: var(--tile-shadow);
}
/* Listed after the reveal transition would be, so hover lift and fade-in can share transform. */
.reveal-ready .plugin-card.reveal.is-visible { transition: box-shadow .4s var(--ease-out), transform .4s var(--ease-out), opacity 1s var(--ease-out); }
.plugin-card:not(.is-loading):hover { box-shadow: var(--tile-shadow-hover); }
.reveal-ready .plugin-card.reveal.is-visible:hover { transform: translateY(-3px); }
.plugin-head { display: flex; align-items: center; gap: 18px; min-width: 0; }
/* The vatSys app icon has its own shape, so it sits on the card with only a soft drop shadow. */
.plugin-icon { display: block; width: 64px; height: 64px; flex: none; border-radius: 15px; object-fit: contain; filter: drop-shadow(0 6px 10px rgba(0,40,60,.18)); }
.plugin-title { min-width: 0; display: grid; gap: 6px; }
.plugin-title h3 { margin: 0; font-size: 26px; font-weight: 700; line-height: 1.12; letter-spacing: -.025em; overflow-wrap: anywhere; }
.plugin-title h3 a { transition: color .2s ease; }
.plugin-title h3 a:hover { color: var(--blue); }
.plugin-meta-line { margin: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; color: var(--muted); font-size: 14px; }
.plugin-description { margin: 0; color: var(--ink); }
.plugin-note { margin: 0; color: var(--muted); }
.plugin-facts { margin: 0; padding: 14px 0 0; display: flex; flex-wrap: wrap; gap: 4px 0; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; list-style: none; }
.plugin-facts li { white-space: nowrap; }
.plugin-facts li + li::before { content: "·"; margin-inline: 8px; }
.plugin-file { max-width: 100%; overflow: hidden; text-overflow: ellipsis; font-family: var(--mono); font-size: 12px; }
.plugin-actions { margin-top: auto; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 22px; }
.plugin-actions .button { margin-right: 4px; min-height: 40px; padding-inline: 18px; font-size: 15px; }
.plugin-actions .product-link { font-size: 15px; }
.is-upcoming .plugin-icon { filter: grayscale(.85); opacity: .65; }

.plugin-card.is-loading { gap: 14px; min-height: 260px; }
.plugin-card.is-loading .plugin-icon { background: rgba(127,127,127,.14); filter: none; animation: skeleton 1.4s ease-in-out infinite alternate; }
.plugin-card.is-loading .plugin-title { flex: 1; gap: 10px; }

.plugins-error { grid-column: 1 / -1; padding: 48px 24px; border-radius: var(--radius-tile); display: grid; justify-items: center; gap: 18px; background: var(--surface); color: var(--muted); text-align: center; }
.plugins-error p { margin: 0; }
`;
