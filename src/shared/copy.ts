/**
 * Page copy, kept in one place so templates and page scripts use the same words.
 * `{name}` placeholders are filled in by `fill()` for text built from API data.
 */
export const copy = {
  brand: "Jurina's vatSys Plugins", navHomepage: "Jurina's Homepage", themeLabel: "Switch color theme",
  homeTitle: "Jurina's vatSys Plugins", pluginPageTitle: "Plugin | Jurina's vatSys Plugins", pluginTitle: "{name} | Jurina's vatSys Plugins",
  heroTitle: "Plugins for vatSys",
  heroBody: "Small add-ons for vatSys, the ATC client used on VATSIM. Each version and download is the plugin's latest GitHub release.",
  pluginsTitle: "Plugins",
  statusLoading: "Checking GitHub for the latest releases…",
  statusLive: "Synced with GitHub. New releases appear within seconds.",
  statusSynced: "Last synced with GitHub: {date}",
  statusStale: "GitHub didn't answer the last update. Showing the releases found {time}.",
  statusOffline: "Can't check for new releases right now. Showing a saved copy from {time}.",
  statusNever: "Waiting for the first sync with GitHub.",
  loadFailed: "Couldn't load the plugins. Check your connection and try again.", retry: "Try again",
  download: "Download", details: "Details", releaseNotes: "Release notes", github: "GitHub", viewOnGithub: "View on GitHub",
  comingSoon: "Coming soon", noRelease: "No release yet. Watch the repository on GitHub to get notified.",
  released: "Released {date}",
  pluginCount: "{count} plugins",
  backToAll: "All plugins", filesTitle: "Files",
  defaultFile: "Default", chooseFile: "Choose a file to download",noFiles: "This release has no files to download.",
  notFoundTitle: "No plugin called “{name}”.", notFoundBody: "It may have been renamed or removed. The plugin list shows what is available.",
  missingName: "Pick a plugin from the list.", seeAll: "See all plugins",
  tipTitle: "Plugin not loading?",
  tipBody: "Windows may block DLL files downloaded from the Internet.",
  tipSteps: "<li>Close vatSys completely.</li><li>Right-click the plugin's <code>.dll</code> and select <strong>Properties</strong>.</li><li>On the <strong>General</strong> tab, enable <strong>Unblock</strong> if it is shown.</li><li>Click <strong>Apply</strong>, then <strong>OK</strong>, and start vatSys again.</li>",
  tipZip: "Downloaded a <code>.zip</code>? Unblock the zip the same way before extracting it, and every file inside comes out unblocked.",
  tipPowershell: "Or in PowerShell:",
  tipCommand: "Unblock-File \"<path to the plugin>.dll\"",
  footerJurina: "Jurina", footerContact: "Contact",
  footerHomepage: "Homepage", footerProjects: "Projects",
  source: "Jurinas-vatsys-plugins on GitHub", pride: "Stands with the LGBTQIA+ community",
  primaryNavLabel: "Primary navigation", footerLabel: "Footer links",
  transFlagLabel: "Transgender flag", rainbowFlagLabel: "Rainbow flag", biFlagLabel: "Bisexual flag",
  screensAlt: "vatSys radar screens with aircraft labels, from virtualairtrafficsystem.com",
};

export type CopyKey = keyof typeof copy;

/** Replaces `{name}` placeholders. Values are inserted as given, so escape API text first. */
export const fill = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
