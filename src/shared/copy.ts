/**
 * Page copy, kept in one place so templates and page scripts use the same words.
 * `{name}` placeholders are filled in by `fill()` for text built from API data.
 */
export const copy = {
  brand: "vatSys Plugins", navHomepage: "Jurina's Homepage", themeLabel: "Switch color theme",
  homeTitle: "vatSys Plugins | Jurina", pluginPageTitle: "Plugin | vatSys Plugins", pluginTitle: "{name} | vatSys Plugins",
  heroEyebrow: "For VATSIM controllers", heroTitle: "vatSys plugins.",
  heroBody: "Small plugins for the vatSys ATC client. Versions and downloads here always match the latest release on GitHub.",
  pluginsEyebrow: "Plugins", pluginsTitle: "Latest releases.",
  statusLoading: "Checking GitHub for the latest releases…",
  statusChecked: "Checked with GitHub {time}",
  statusStale: "GitHub didn't answer the last check. Showing the releases found {time}.",
  statusOffline: "Can't check for new releases right now. Showing a saved copy from {time}.",
  statusNever: "Waiting for the first check with GitHub.",
  loadFailed: "Couldn't load the plugins. Check your connection and try again.", retry: "Try again",
  download: "Download", releaseNotes: "Release notes", github: "GitHub", viewOnGithub: "View on GitHub",
  comingSoon: "Coming soon", noRelease: "Not released yet. Watch the repository on GitHub to hear when it is.",
  released: "Released {date}",
  downloadsOne: "1 download", downloadsMany: "{count} downloads",
  pluginCount: "{count} plugins",
  backToAll: "All plugins", filesTitle: "Files", notesTitle: "What's new", viewRelease: "Full release on GitHub",
  defaultFile: "Default", noFiles: "This release has no files to download.", noNotes: "This release has no notes.",
  notFoundTitle: "No plugin called “{name}”.", notFoundBody: "It may have been renamed or removed. The list has every plugin that's available now.",
  missingName: "Pick a plugin from the list.", seeAll: "See all plugins",
  footerPlugins: "Plugins", footerJurina: "Jurina", footerContact: "Contact",
  footerAll: "All plugins",
  footerHomepage: "Homepage", footerProjects: "Projects",
  source: "Jurinas-vatsys-plugins on GitHub", pride: "Stands with the LGBTQIA+ community",
  primaryNavLabel: "Primary navigation", footerLabel: "Footer links",
  transFlagLabel: "Transgender flag", rainbowFlagLabel: "Rainbow flag",
  screensAlt: "vatSys radar screens with aircraft labels, from virtualairtrafficsystem.com",
};

export type CopyKey = keyof typeof copy;

/** Replaces `{name}` placeholders. Values are inserted as given, so escape API text first. */
export const fill = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
