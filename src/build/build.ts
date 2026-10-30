/*
 * Builds the static site into dist/:
 *   public/            copied as-is (fonts, icons)
 *   src/client/*.ts    bundled by esbuild into js/
 *   src/styles         joined and minified into css/
 *   src/site/pages     rendered to .html with a snapshot of the plugin API baked in, linking assets
 *                      with a content hash for cache busting
 * The pages refresh everything from the API in the browser, so the snapshot only has to be a good
 * first paint. If the API is down during the build, the pages ship with loading placeholders.
 */
import { createHash } from "node:crypto";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import { fetchPlugins, type PluginList } from "../shared/api.ts";
import { stylesheets } from "../styles/index.ts";
import type { Assets } from "../site/layout.ts";
import { homePage } from "../site/pages/home.ts";
import { pluginPage } from "../site/pages/plugin.ts";

const root = fileURLToPath(new URL("../../", import.meta.url));
const dist = join(root, "dist");
const client = join(root, "src/client");

/** Browser targets for both scripts and styles. */
const target = ["chrome111", "edge111", "firefox114", "safari16.4"];

const write = async (path: string, contents: string) => {
  await mkdir(dirname(join(dist, path)), { recursive: true });
  await writeFile(join(dist, path), contents);
};

const bundle = async (entry: string): Promise<string> => {
  const result = await esbuild.build({
    entryPoints: [join(client, entry)],
    bundle: true,
    format: "iife",
    minify: true,
    target,
    write: false,
    legalComments: "none",
  });
  return result.outputFiles[0].text;
};

const loadSnapshot = async (): Promise<PluginList | null> => {
  try {
    const list = await fetchPlugins();
    console.log(`Plugin API: ${list.plugins.length} plugins, checked ${list.checked_at ?? "never"}`);
    return list;
  } catch (error) {
    console.warn(`Plugin API unavailable, building without a snapshot: ${error instanceof Error ? error.message : error}`);
    return null;
  }
};

const started = performance.now();
const snapshot = await loadSnapshot();
await rm(dist, { recursive: true, force: true });
await cp(join(root, "public"), dist, { recursive: true });

const files = new Map<string, string>([["js/main.js", await bundle("main.ts")]]);
for (const [path, modules] of Object.entries(stylesheets)) {
  const { code } = await esbuild.transform(modules.join("\n\n"), { loader: "css", minify: true, target });
  files.set(path, code);
}
for (const [path, contents] of files) await write(path, contents);

const hashes = new Map([...files].map(([path, contents]) => [path, createHash("sha256").update(contents).digest("hex").slice(0, 10)]));
const assets: Assets = {
  url: (path) => {
    const hash = hashes.get(path);
    if (!hash) throw new Error(`No built asset at ${path}`);
    return `${path}?v=${hash}`;
  },
  themeInit: (await bundle("theme-init.ts")).trim(),
};

const pages = { "index.html": homePage, "plugin.html": pluginPage };
for (const [file, render] of Object.entries(pages)) await write(file, render(assets, snapshot));

const summary = [...files.keys(), ...Object.keys(pages)].map((path) => `  ${path}`).join("\n");
console.log(`Built dist/ in ${Math.round(performance.now() - started)} ms\n${summary}`);
