import { css } from "../../build/css.ts";

/** Tablet and small-laptop overrides. */
export default css`
@media (max-width: 900px) {
  .install-steps { grid-template-columns: 1fr; }
  .step-number { margin-bottom: 18px; }
}
`;
