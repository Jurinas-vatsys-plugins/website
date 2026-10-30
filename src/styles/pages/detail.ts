import { css } from "../../build/css.ts";

/** plugin.html: one plugin's header and file list. */
export default css`
.detail-main { width: min(880px, calc(100% - var(--gutter) * 2)); min-height: 60vh; padding-block: 40px 96px; display: grid; align-content: start; gap: 20px; }
.back-link { justify-self: start; margin-bottom: -20px; }
.detail-hero { padding-block: 32px 28px; display: grid; justify-items: center; gap: 14px; text-align: center; }
.plugin-icon-large { width: 112px; height: 112px; margin-bottom: 8px; }
.detail-hero h1 { margin: 0; font-size: clamp(40px, 6vw, 64px); font-weight: 700; line-height: 1.06; letter-spacing: -.03em; overflow-wrap: anywhere; }
.detail-meta { margin: 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 14px; color: var(--muted); font-size: 15px; }
.detail-description { max-width: 620px; margin: 0; color: var(--muted); font-size: 21px; line-height: 1.38; }
.detail-actions { margin-top: 10px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px 26px; }
.detail-hero.is-loading .plugin-icon { border-radius: 26px; background: rgba(127,127,127,.14); filter: none; animation: skeleton 1.4s ease-in-out infinite alternate; }
.detail-hero.is-loading .skeleton-line { width: min(360px, 80%); }
.skeleton-line.is-title { height: 44px; border-radius: 12px; }
.detail-missing { padding-block: 80px; }
.detail-missing h1 { font-size: clamp(32px, 4.4vw, 48px); }

.detail-card { padding: 36px 40px 32px; border-radius: var(--radius-tile); background: var(--surface); box-shadow: var(--tile-shadow); }
.detail-card h2 { margin: 0 0 18px; font-size: 28px; font-weight: 700; line-height: 1.14; letter-spacing: -.025em; }
.detail-empty { margin: 0; color: var(--muted); }
.file-list { margin: 0; padding: 0; list-style: none; }
.file-row { padding-block: 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid var(--line); }
.file-row:first-child { border-top: 0; padding-top: 0; }
.file-row:last-child { padding-bottom: 0; }
.file-info { min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; }
.file-name { min-width: 0; font: 600 15px/1.4 var(--mono); letter-spacing: 0; overflow-wrap: anywhere; }
.file-facts { flex-basis: 100%; color: var(--muted); font-size: 13px; }
.file-download { flex: none; min-height: 36px; padding: 0 16px; border-radius: 999px; display: inline-flex; align-items: center; gap: 6px; background: rgba(0,113,227,.1); color: var(--blue); font-size: 14px; font-weight: 600; transition: background-color .2s ease; }
.file-download:hover { background: rgba(0,113,227,.18); }
.file-download .icon { width: 15px; height: 15px; }
[data-theme="dark"] .file-download { background: rgba(41,151,255,.16); }
[data-theme="dark"] .file-download:hover { background: rgba(41,151,255,.24); }
`;
