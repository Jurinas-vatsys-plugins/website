/* Runs on every page. Each feature finds its own elements and does nothing when they're absent. */
import { initPageChrome } from "./features/page-chrome.ts";
import { initTheme } from "./features/theme.ts";
import { initDownloadMenus } from "./features/download-menu.ts";
import { initPluginList } from "./plugins/list.ts";
import { initPluginDetail } from "./plugins/detail.ts";

initPageChrome();
initTheme();
initDownloadMenus();
initPluginList();
initPluginDetail();

// Start-up state (theme icon, plugin cards) is now final. Flush styles while transitions are
// still off, then turn them on, so nothing fades in from the HTML defaults.
void document.body.offsetWidth;
document.documentElement.classList.remove("is-booting");
