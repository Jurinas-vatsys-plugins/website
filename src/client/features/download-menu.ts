/**
 * The file menus are <details>, so they open without JavaScript. This closes an open one when you
 * click elsewhere, pick a file or press Escape. Listeners sit on the document because the plugin
 * cards are redrawn whenever fresh data arrives.
 */
export const initDownloadMenus = () => {
  const openMenus = () => document.querySelectorAll<HTMLDetailsElement>(".download-menu[open]");

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const inside = target?.closest<HTMLDetailsElement>(".download-menu");
    const pickedFile = target?.closest(".download-options a");
    openMenus().forEach((menu) => { if (menu !== inside || pickedFile) menu.open = false; });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    openMenus().forEach((menu) => {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    });
  });
};
