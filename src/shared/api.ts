/*
 * The vatSys plugin API (docs: jurinas-api/docs/vatsys-plugins.md). It is public, needs no key and
 * allows CORS, so both the build and the browser call it directly. GitHub notifies the server of
 * every release through a webhook, and requests never reach GitHub, so calling it often costs nothing.
 */
export const apiBase = "https://api.jurina.org/v1/vatsys-plugins";

/** Repositories in the organization that aren't plugins, such as this site. Lowercase. */
const notPlugins = new Set(["website"]);
export const isPlugin = (name: string): boolean => !notPlugins.has(name.toLowerCase());

export type Asset = {
  name: string;
  size: number;
  content_type: string;
  download_count: number;
  /** Our API's link, which redirects to the file on GitHub. */
  download_url: string;
  github_url: string;
};

export type Release = {
  tag: string;
  /** The tag without its leading "v". */
  version: string;
  name: string;
  /** Markdown. */
  notes: string;
  published_at: string;
  url: string;
  assets: Asset[];
};

export type Plugin = {
  name: string;
  description: string;
  repo_url: string;
  /** Null until the repository publishes its first release. */
  latest: Release | null;
  /** Always-latest link to the default file; empty when there is nothing to download. */
  download_url: string;
};

export type PluginList = {
  org: string;
  /** Last successful check with GitHub; null before the first one. */
  checked_at: string | null;
  last_try: string;
  /** Only present when the last check failed; `plugins` then holds the previous result. */
  last_error?: string;
  interval: string;
  plugins: Plugin[];
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const getJson = async <T>(path: string, timeout = 15_000): Promise<T> => {
  const response = await fetch(`${apiBase}${path}`, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(timeout) });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: { code?: string; message?: string } } | null;
    throw new ApiError(response.status, body?.error?.code ?? "http_error", body?.error?.message ?? `HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const fetchPlugins = async (): Promise<PluginList> => {
  const list = await getJson<PluginList>("/plugins");
  if (!Array.isArray(list.plugins)) throw new ApiError(500, "bad_response", "The plugin list is missing");
  return { ...list, plugins: list.plugins.filter((plugin) => isPlugin(plugin.name)) };
};

export const fetchPlugin = async (name: string): Promise<Plugin> => {
  if (!isPlugin(name)) throw new ApiError(404, "unknown_plugin", `${name} is not a plugin`);
  return getJson<Plugin>(`/plugins/${encodeURIComponent(name)}`);
};

/** The release's default file, chosen the same way as the API's download link. */
export const defaultAsset = (release: Release): Asset | undefined => {
  const { assets } = release;
  if (assets.length <= 1) return assets[0];
  const ext = (suffix: string) => assets.find((asset) => asset.name.toLowerCase().endsWith(suffix));
  return ext(".zip") ?? ext(".dll") ?? assets[0];
};
