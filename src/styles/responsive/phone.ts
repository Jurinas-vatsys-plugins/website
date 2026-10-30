import { css } from "../../build/css.ts";

/** Phone overrides. */
export default css`
@media (max-width: 734px) {
  :root { --gutter: 20px; --radius-tile: 24px; }
  body { font-size: 16px; }
  .nav-right { gap: 10px; }
  .eyebrow { font-size: 15px; }

  .product-stack { gap: 10px; padding-inline: 10px; }
  .product-feature { padding-top: 44px; }
  .product-copy { padding-inline: 20px; }
  .product-copy .eyebrow { font-size: 15px; }
  .product-copy :is(h1, h2) { font-size: clamp(30px, 8.6vw, 40px); }
  .hero-tile .product-copy h1 { font-size: clamp(40px, 12vw, 52px); }
  .product-tagline { font-size: 17px; }
  .product-art { width: calc(100% - 32px); height: 200px; margin-top: 24px; }
  .api-status { font-size: 13px; }

  .plugins-section { padding-block: 64px 72px; }
  .section-heading { margin-bottom: 24px; }
  .section-heading h2 { font-size: clamp(34px, 10vw, 44px); }
  .plugin-card { padding: 24px 22px 18px; }
  .plugin-title h3 { font-size: 23px; }

  .detail-main { padding-block: 24px 64px; gap: 14px; }
  .detail-hero { padding-block: 16px; }
  .plugin-icon-large { width: 88px; height: 88px; }
  .detail-description { font-size: 17px; }
  .detail-actions { flex-direction: column; gap: 6px; }
  .detail-card { padding: 26px 22px; }
  .detail-card h2 { font-size: 24px; }
  .markdown { font-size: 16px; }
  .file-row { align-items: flex-start; flex-direction: column; gap: 10px; }

  .footer-directory { grid-template-columns: 1fr 1fr; gap: 28px 20px; padding-block: 28px; }
  .footer-column:last-child { grid-column: 1 / -1; }
  .footer-column a { font-size: 14px; }
  .footer-top, .footer-bottom { flex-direction: column; align-items: flex-start; }
  .pride-note { flex-wrap: wrap; }
}
`;
