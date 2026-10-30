import { css } from "../../build/css.ts";

/** Home page: hero tile with vatSys screens and the status line, then the install steps. */
export default css`
.plugins-main { padding-top: 12px; }
.hero-tile .product-copy h1 { font-size: clamp(48px, 6.4vw, 80px); line-height: 1.04; letter-spacing: -.035em; }

.product-vatsys { background: #eaf3fa; }
.product-vatsys .product-copy :is(h1, h2) { color: #1d1d1f; }
.product-vatsys .eyebrow, .product-vatsys .product-tagline { color: #6e6e73; }
[data-theme="dark"] .product-vatsys { background: #0f2132; }
[data-theme="dark"] .product-vatsys .product-copy :is(h1, h2) { color: #f5f5f7; }
[data-theme="dark"] .product-vatsys .eyebrow, [data-theme="dark"] .product-vatsys .product-tagline { color: #a1a1a6; }

/* Three vatSys screenshots (virtualairtrafficsystem.com) taking turns, like a scope cycling maps.
   The frame sits on the tile's bottom edge, so the tile clips its lower corners. */
.hero-screens {
  position: relative; width: min(862px, calc(100% - 48px)); aspect-ratio: 862 / 361; margin: 44px auto 0;
  overflow: hidden; border-radius: 18px 18px 0 0; background: #0c2a33;
  box-shadow: 0 -1px 0 rgba(255,255,255,.08) inset, 0 20px 60px -20px rgba(0,30,60,.45);
}
.hero-screens img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; opacity: 0; animation: screen-cycle 18s infinite; }
.hero-screens img:nth-child(1) { opacity: 1; }
.hero-screens img:nth-child(2) { animation-delay: 6s; }
.hero-screens img:nth-child(3) { animation-delay: 12s; }
.hero-screens img:nth-child(1) { animation-name: screen-cycle-first; }
@keyframes screen-cycle { 0%, 33.3% { opacity: 0; } 3%, 30% { opacity: 1; } }
@keyframes screen-cycle-first { 0%, 30% { opacity: 1; } 33.3%, 97% { opacity: 0; } 100% { opacity: 1; } }

/* Freshness of the list: GitHub mark when checked, warning when the last check failed or we're offline. */
.api-status { width: fit-content; max-width: 100%; margin: 0 auto; padding: 8px 16px; border-radius: 999px; display: inline-flex; align-items: center; gap: 9px; background: rgba(255,255,255,.7); color: #424245; font-size: 14px; line-height: 1.35; text-align: left; box-shadow: 0 0 0 1px rgba(0,0,0,.05); }
[data-theme="dark"] .api-status { background: rgba(255,255,255,.07); color: #c7c7cc; box-shadow: 0 0 0 1px rgba(255,255,255,.08); }
.api-status .icon { width: 16px; height: 16px; }
.api-status.is-stale .icon { color: #c93400; }
.api-status.is-offline .icon { color: #d70015; }
[data-theme="dark"] .api-status.is-stale .icon { color: #ff9f0a; }
[data-theme="dark"] .api-status.is-offline .icon { color: #ff453a; }
.api-status.is-loading .icon { animation: status-spin 1.2s linear infinite; }
@keyframes status-spin { to { transform: rotate(360deg); } }

.plugins-section { padding-block: 96px 40px; }
.install-section { padding-block: 56px 96px; }
.install-steps { margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; list-style: none; }
.install-step { padding: 32px 30px 34px; border-radius: 22px; background: var(--surface); box-shadow: var(--tile-shadow); }
.step-number { width: 40px; height: 40px; margin-bottom: 28px; border-radius: 50%; display: grid; place-items: center; background: var(--button); color: #fff; font: 600 19px/1 var(--display-font); }
.install-step h3 { margin: 0 0 8px; font-size: 24px; font-weight: 600; line-height: 1.17; letter-spacing: -.02em; }
.install-step p { margin: 0; color: var(--muted); }
`;
