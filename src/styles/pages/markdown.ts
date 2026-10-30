import { css } from "../../build/css.ts";

/** Release notes rendered from GitHub Markdown. */
export default css`
.markdown { color: var(--ink); font-size: 17px; line-height: 1.6; overflow-wrap: break-word; }
.markdown > :first-child { margin-top: 0; }
.markdown > :last-child { margin-bottom: 0; }
.markdown :is(h3, h4, h5, h6) { margin: 32px 0 10px; font-weight: 600; line-height: 1.25; letter-spacing: -.02em; }
.markdown h3 { font-size: 22px; }
.markdown h4 { font-size: 19px; }
.markdown :is(h5, h6) { font-size: 17px; color: var(--muted); }
.markdown p { margin: 0 0 14px; }
.markdown :is(ul, ol) { margin: 0 0 14px; padding-left: 1.4em; }
.markdown li + li { margin-top: 6px; }
.markdown li::marker { color: var(--muted); }
.markdown a { color: var(--blue); }
.markdown a:hover { text-decoration: underline; text-underline-offset: 3px; }
.markdown strong { font-weight: 600; }
.markdown pre { margin: 0 0 16px; padding: 16px 18px; border-radius: 14px; background: rgba(127,127,127,.1); overflow-x: auto; }
.markdown pre code { padding: 0; background: none; font-size: 14px; line-height: 1.55; white-space: pre; overflow-wrap: normal; }
.markdown blockquote { margin: 0 0 14px; padding-left: 16px; border-left: 3px solid var(--line); color: var(--muted); }
.markdown hr { margin: 28px 0; border: 0; border-top: 1px solid var(--line); }
`;
