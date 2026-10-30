import { css } from "../../build/css.ts";

/** "Plugin not loading?" tip: a closed disclosure under the plugin list and in each plugin's files. */
export default css`
.tip-card { margin-top: 20px; border-radius: 22px; background: var(--surface); box-shadow: var(--tile-shadow); }
.tip-card summary { padding: 20px 26px; display: flex; align-items: center; gap: 10px; font-size: 17px; font-weight: 600; cursor: pointer; list-style: none; }
.tip-card summary::-webkit-details-marker { display: none; }
.tip-card summary .icon-alert { width: 20px; height: 20px; color: #c93400; }
[data-theme="dark"] .tip-card summary .icon-alert { color: #ff9f0a; }
.tip-card summary .icon-chevron { margin-left: auto; color: var(--muted); transition: transform .25s var(--ease-out); }
.tip-card[open] summary .icon-chevron { transform: rotate(90deg); }
.tip-card summary:hover > span { color: var(--blue); }
.tip-body { padding: 0 26px 24px 56px; color: var(--muted); font-size: 15px; line-height: 1.55; }
.tip-body p, .tip-body ol { margin: 0 0 12px; }
.tip-body ol { padding-left: 1.3em; color: var(--ink); }
.tip-body li + li { margin-top: 4px; }
.tip-body strong { color: var(--ink); font-weight: 600; }
.tip-body pre { margin: 0; padding: 12px 16px; border-radius: 12px; background: rgba(127,127,127,.1); overflow-x: auto; }
.tip-body pre code { padding: 0; background: none; color: var(--ink); font-size: 13px; white-space: pre; overflow-wrap: normal; }

/* Inside the Files card it is part of the list, not a card of its own. */
.detail-card .tip-card { margin: 18px 0 0; border-top: 1px solid var(--line); border-radius: 0; background: none; box-shadow: none; }
.detail-card .tip-card summary { padding: 16px 0 0; font-size: 15px; }
.detail-card .tip-body { padding: 12px 0 0 30px; }

@media (max-width: 734px) {
  .tip-card summary { padding: 18px 20px; }
  .tip-body { padding: 0 20px 20px; }
  .detail-card .tip-body { padding-left: 0; }
}
`;
