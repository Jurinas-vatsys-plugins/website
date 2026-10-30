/*
 * HTML for everything that comes from the plugin data. The build uses these to bake a snapshot
 * into the pages, and the browser uses the same functions to redraw with live data.
 * Every API string goes through escapeHtml; the copy is ours and may hold markup.
 * Download links point straight at the files on GitHub.
 */
import { defaultAsset, type Plugin, type PluginList, type Release } from "./api.ts";
import { copy, fill } from "./copy.ts";
import { displayName, escapeHtml, formatDate, formatNumber, formatRelative, formatSize } from "./format.ts";
import { renderMarkdown } from "./markdown.ts";
import { icon } from "../site/components/icon.ts";

const externalLink = (href: string) => `href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer"`;

export const detailHref = (plugin: Plugin): string => `plugin.html?name=${encodeURIComponent(plugin.name)}`;

/** Every plugin uses the vatSys app icon until it has one of its own. */
const pluginIcon = (className = "plugin-icon"): string =>
  `<img class="${className}" src="img/vatsys/vatsys-icon.png" alt="" width="256" height="256" decoding="async">`;

const downloads = (count: number): string => (count === 1 ? copy.downloadsOne : fill(copy.downloadsMany, { count: formatNumber(count) }));

const totalDownloads = (release: Release) => release.assets.reduce((sum, asset) => sum + asset.download_count, 0);

const released = (release: Release) =>
  `<time datetime="${escapeHtml(release.published_at)}">${fill(copy.released, { date: formatDate(release.published_at) })}</time>`;

/** The release's default file on GitHub, or a greyed-out button when it has none. */
const downloadButton = (release: Release) => {
  const asset = defaultAsset(release);
  if (!asset) return `<span class="button button-disabled" aria-disabled="true">${icon("download")}<span>${copy.download}</span></span>`;
  return `<a class="button button-primary" href="${escapeHtml(asset.github_url)}" title="${escapeHtml(asset.name)}">${icon("download")}<span>${copy.download}</span></a>`;
};

const description = (plugin: Plugin, className: string) =>
  plugin.description.trim() ? `<p class="${className}">${escapeHtml(plugin.description.trim())}</p>` : "";

/* ---------- Plugin list ---------- */

const releasedCard = (plugin: Plugin, release: Release): string => {
  const asset = defaultAsset(release);
  const facts = [
    asset && `<li class="plugin-file" title="${escapeHtml(asset.name)}">${escapeHtml(asset.name)}</li>`,
    asset && `<li>${formatSize(asset.size)}</li>`,
    `<li>${downloads(totalDownloads(release))}</li>`,
  ].filter(Boolean).join("");
  return `<article class="plugin-card reveal">
  <div class="plugin-head">${pluginIcon()}<div class="plugin-title">
    <h3><a href="${detailHref(plugin)}">${escapeHtml(displayName(plugin))}</a></h3>
    <p class="plugin-meta-line"><span class="pill">v${escapeHtml(release.version)}</span>${released(release)}</p>
  </div></div>
  ${description(plugin, "plugin-description")}
  <ul class="plugin-facts">${facts}</ul>
  <div class="plugin-actions">
    ${downloadButton(release)}
    <a class="product-link" href="${detailHref(plugin)}"><span>${copy.releaseNotes}</span>${icon("chevron")}</a>
    <a class="product-link" ${externalLink(plugin.repo_url)}><span>${copy.github}</span>${icon("external")}</a>
  </div>
</article>`;
};

const upcomingCard = (plugin: Plugin): string => `<article class="plugin-card is-upcoming reveal">
  <div class="plugin-head">${pluginIcon()}<div class="plugin-title">
    <h3>${escapeHtml(displayName(plugin))}</h3>
    <p class="plugin-meta-line"><span class="pill pill-muted">${copy.comingSoon}</span></p>
  </div></div>
  ${description(plugin, "plugin-description")}
  <p class="plugin-note">${copy.noRelease}</p>
  <div class="plugin-actions">
    <a class="product-link" ${externalLink(plugin.repo_url)}><span>${copy.viewOnGithub}</span>${icon("external")}</a>
  </div>
</article>`;

/** Released plugins first, keeping the API's alphabetical order within each group. */
export const pluginCards = (list: PluginList): string => {
  const ordered = [...list.plugins.filter((plugin) => plugin.latest), ...list.plugins.filter((plugin) => !plugin.latest)];
  return ordered.map((plugin) => (plugin.latest ? releasedCard(plugin, plugin.latest) : upcomingCard(plugin))).join("\n");
};

export const pluginCount = (list: PluginList): string => fill(copy.pluginCount, { count: formatNumber(list.plugins.length) });

export const loadingCards = (count = 3): string =>
  Array.from({ length: count }, () => `<div class="plugin-card is-loading" aria-hidden="true"><div class="plugin-head"><span class="plugin-icon"></span><div class="plugin-title"><span class="skeleton-line"></span><span class="skeleton-line is-short"></span></div></div><span class="skeleton-line"></span><span class="skeleton-line is-short"></span></div>`).join("");

export const loadError = (): string =>
  `<div class="plugins-error"><p>${copy.loadFailed}</p><button class="button button-primary" type="button" data-retry>${copy.retry}</button></div>`;

/** Unblocking downloaded DLLs, from the drag-and-zoom README. Shown under the list and each plugin. */
export const loadingTip = (): string => `<details class="tip-card">
  <summary>${icon("alert")}<span>${copy.tipTitle}</span>${icon("chevron")}</summary>
  <div class="tip-body">
    <p>${copy.tipBody}</p>
    <ol>${copy.tipSteps}</ol>
    <p>${copy.tipZip}</p>
    <p>${copy.tipPowershell}</p>
    <pre><code>${escapeHtml(copy.tipCommand)}</code></pre>
  </div>
</details>`;

/* ---------- Status line ---------- */

export type StatusState = "loading" | "live" | "stale" | "offline";
export type Status = { state: StatusState; text: string; title: string };

/** The status pill under the hero: how fresh the list is, and whether something went wrong. */
export const status = (list: PluginList | null, { offline = false } = {}): Status => {
  if (!list) return { state: "loading", text: copy.statusLoading, title: "" };
  const checked = list.checked_at;
  const title = checked ? new Date(checked).toLocaleString("en-US") : "";
  const time = checked ? formatRelative(checked) : "";
  if (offline) return { state: "offline", text: fill(copy.statusOffline, { time }), title };
  if (!checked) return { state: "stale", text: copy.statusNever, title };
  if (list.last_error) return { state: "stale", text: fill(copy.statusStale, { time }), title };
  return { state: "live", text: fill(copy.statusChecked, { time }), title };
};

const statusIcons = { loading: "sync", live: "github", stale: "alert", offline: "alert" } as const;

export const statusHtml = ({ state, text, title }: Status): string =>
  `<p class="api-status is-${state}" role="status" data-status${title ? ` title="${escapeHtml(title)}"` : ""}>${icon(statusIcons[state])}<span class="status-text">${text}</span></p>`;

/* ---------- Plugin detail ---------- */

const fileList = (release: Release): string => {
  if (!release.assets.length) return `<p class="detail-empty">${copy.noFiles}</p>`;
  const main = defaultAsset(release);
  return `<ul class="file-list">${release.assets.map((asset) => `<li class="file-row">
    <div class="file-info"><span class="file-name">${escapeHtml(asset.name)}</span>${asset === main && release.assets.length > 1 ? `<span class="pill pill-muted">${copy.defaultFile}</span>` : ""}
      <span class="file-facts">${formatSize(asset.size)} · ${downloads(asset.download_count)}</span></div>
    <a class="file-download" href="${escapeHtml(asset.github_url)}" aria-label="${escapeHtml(`${copy.download}: ${asset.name}`)}">${icon("download")}<span>${copy.download}</span></a>
  </li>`).join("")}</ul>`;
};

export const pluginDetail = (plugin: Plugin): string => {
  const release = plugin.latest;
  const meta = release
    ? `<p class="detail-meta"><span class="pill">v${escapeHtml(release.version)}</span>${released(release)}<span>${downloads(totalDownloads(release))}</span></p>`
    : `<p class="detail-meta"><span class="pill pill-muted">${copy.comingSoon}</span></p>`;
  const hero = `<a class="product-link back-link" href="index.html#plugins">${icon("chevron-back")}<span>${copy.backToAll}</span></a>
  <header class="detail-hero reveal">
    ${pluginIcon("plugin-icon plugin-icon-large")}
    <h1>${escapeHtml(displayName(plugin))}</h1>
    ${meta}
    ${description(plugin, "detail-description")}
    <div class="detail-actions">
      ${release ? downloadButton(release) : ""}
      <a class="product-link" ${externalLink(plugin.repo_url)}><span>${copy.viewOnGithub}</span>${icon("external")}</a>
    </div>
  </header>`;
  if (!release) return `${hero}<section class="detail-card reveal"><p class="detail-empty">${copy.noRelease}</p></section>`;
  const notes = renderMarkdown(release.notes ?? "");
  return `${hero}
  <section class="detail-card reveal" aria-labelledby="files-title"><h2 id="files-title">${copy.filesTitle}</h2>${fileList(release)}${release.assets.length ? loadingTip() : ""}</section>
  <section class="detail-card reveal" aria-labelledby="notes-title"><h2 id="notes-title">${copy.notesTitle}</h2>
    <div class="markdown">${notes || `<p class="detail-empty">${copy.noNotes}</p>`}</div>
    <a class="product-link notes-link" ${externalLink(release.url)}><span>${copy.viewRelease}</span>${icon("external")}</a>
  </section>`;
};

export const detailMessage = (name?: string): string => `<header class="detail-hero detail-missing">
    <h1>${name ? fill(copy.notFoundTitle, { name: escapeHtml(name) }) : copy.missingName}</h1>
    ${name ? `<p class="detail-description">${copy.notFoundBody}</p>` : ""}
    <div class="detail-actions"><a class="button button-primary" href="index.html#plugins">${copy.seeAll}</a></div>
  </header>`;

export const detailLoading = (): string =>
  `<header class="detail-hero is-loading" aria-hidden="true"><span class="plugin-icon plugin-icon-large"></span><span class="skeleton-line is-title"></span><span class="skeleton-line is-short"></span></header>`;
