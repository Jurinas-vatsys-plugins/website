import type { CopyKey } from "../shared/copy.ts";

export type PageId = "home" | "plugin";

export type PageMeta = {
  id: PageId;
  /** Output file name, also used in links between pages. */
  file: string;
  titleKey: CopyKey;
  description: string;
};

export const pages: Record<PageId, PageMeta> = {
  home: {
    id: "home",
    file: "index.html",
    titleKey: "homeTitle",
    description: "Jurina's plugins for the vatSys ATC client: the latest releases, downloads and release notes, straight from GitHub.",
  },
  plugin: {
    id: "plugin",
    file: "plugin.html",
    titleKey: "pluginPageTitle",
    description: "Latest release, files and release notes of a vatSys plugin.",
  },
};

export const links = {
  org: "https://github.com/Jurinas-vatsys-plugins",
  homepage: "https://www.jurina.org/",
  projects: "https://www.jurina.org/projects.html",
  github: "https://github.com/lpxlpx7",
  mailGeneral: "contact@jurina.org",
  mailDevelopment: "dev@jurina.org",
};
