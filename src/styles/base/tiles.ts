import { css } from "../../build/css.ts";

/** Full-width feature tiles, as on jurina.org/projects, plus the pills and headings they share. */
export default css`
.product-stack { display: grid; gap: 12px; padding-inline: 12px; }
.product-feature { overflow: hidden; padding-top: 60px; border-radius: var(--radius-tile); background: var(--surface); text-align: center; }
.product-copy { position: relative; z-index: 1; padding-inline: 24px; }
.product-copy .eyebrow { margin-bottom: 10px; font-size: 17px; }
.product-copy :is(h1, h2) { margin: 0; font-size: clamp(36px, 4.6vw, 56px); font-weight: 700; line-height: 1.07; letter-spacing: -.03em; }
.product-tagline { max-width: 660px; margin: 14px auto 22px; color: var(--muted); font-size: 21px; line-height: 1.38; }
.product-link { display: inline-flex; align-items: center; gap: 4px; min-height: 44px; color: var(--blue); font-size: 17px; }
.product-link:hover > span { text-decoration: underline; text-underline-offset: 3px; }
.product-link .icon { width: 11px; height: 11px; }
.product-art { position: relative; width: min(900px, calc(100% - 48px)); height: 300px; margin: 36px auto 0; display: flex; align-items: center; justify-content: center; user-select: none; }

.pill { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; background: rgba(0,113,227,.1); color: var(--blue); font-size: 12px; font-weight: 600; letter-spacing: 0; white-space: nowrap; }
[data-theme="dark"] .pill { background: rgba(41,151,255,.16); }
.pill-muted { background: rgba(127,127,127,.14); color: var(--muted); }
[data-theme="dark"] .pill-muted { background: rgba(255,255,255,.1); }

code { padding: .12em .4em; border-radius: 6px; background: rgba(127,127,127,.13); font: .86em/1.4 var(--mono); letter-spacing: 0; overflow-wrap: anywhere; }

.section-heading { margin-bottom: 36px; display: flex; align-items: flex-end; justify-content: space-between; gap: 16px 32px; flex-wrap: wrap; }
.section-heading h2 { margin: 0; font-size: clamp(40px, 5vw, 56px); font-weight: 700; line-height: 1.07; letter-spacing: -.03em; }
.section-heading .eyebrow { margin-bottom: 8px; }
.section-count { margin: 0 0 8px; color: var(--muted); font-size: 17px; }

.skeleton-line { display: block; height: 14px; border-radius: 7px; background: rgba(127,127,127,.14); animation: skeleton 1.4s ease-in-out infinite alternate; }
.skeleton-line.is-short { width: 55%; }
@keyframes skeleton { to { opacity: .45; } }
`;
