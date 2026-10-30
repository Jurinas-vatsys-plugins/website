import { css } from "../../build/css.ts";

/** Sticky glass header with the homepage link and theme button. */
export default css`
.site-header {
  position: sticky; z-index: 30; top: 0; height: 48px;
  background: var(--glass);
  box-shadow: 0 .5px 0 var(--glass-border);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
}
.nav { height: 48px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.brand { display: inline-flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 600; letter-spacing: -.022em; white-space: nowrap; }
.brand .icon { width: 18px; height: 18px; }
.nav-right { display: flex; align-items: center; gap: 20px; }
.nav-link { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; letter-spacing: -.01em; white-space: nowrap; opacity: .72; transition: opacity .2s ease; }
.nav-link:hover { opacity: 1; }
.theme-button { width: 32px; height: 32px; padding: 0; border: 0; border-radius: 50%; display: grid; place-items: center; background: none; color: var(--ink); font: inherit; cursor: pointer; opacity: .8; transition: opacity .2s ease, background-color .2s ease; }
.theme-button:hover { opacity: 1; background: rgba(127,127,127,.12); }
.theme-icon { display: grid; place-items: center; }
.theme-icon .icon { width: 17px; height: 17px; }
`;
