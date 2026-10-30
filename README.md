# vatSys Plugins

The website for [Jurinas-vatsys-plugins](https://github.com/Jurinas-vatsys-plugins): every plugin's
latest release and its files.

Nothing about the plugins is written by hand. The list comes from the vatSys plugin API
(`https://api.jurina.org/v1/vatsys-plugins/plugins`), which checks the organization's GitHub releases
every hour. A new repository or a new release shows up here without touching this site. Download
buttons link straight to the files on GitHub.

- At build time, a snapshot of the list is baked into the HTML, so the page shows real content
  right away and still works without JavaScript.
- In the browser, the page loads the list again, refreshes it when you come back to the tab, and
  falls back to the snapshot if it can't be reached.
- A plugin's description is its GitHub repository description ("About"). Fill that in on GitHub and
  it appears here.

## Development

Everything is TypeScript, built the same way as [jurina.org](https://github.com/lpxlpx7/jurinas-website).

```bash
npm install
npm run dev     # rebuild dist/ whenever src/ changes
npm run build   # one-off build
npm run check   # type-check everything
```

To preview, serve `dist/` with any static server, e.g. `python -m http.server -d dist`.

### Where things live

```
public/            copied into dist/ as-is: fonts, icons, vatSys artwork
src/
  shared/          used by both the build and the browser
    api.ts         plugin API types and requests
    render.ts      HTML for plugin cards, the status line and the plugin page
    copy.ts        all page text
  site/            page templates (index.html, plugin.html), header, footer
  styles/          the CSS, one module per area; index.ts sets the order
  client/          browser scripts, bundled into js/main.js
  build/           build script and the html/css template helpers
```

`plugin.html?name=<repo>` shows one plugin. It works for any repository in the organization,
including ones added after the last build.

## Publishing on GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes `dist/` on every push to `main`, and
every 6 hours to refresh the baked-in snapshot.

The site lives at <https://vatsys.jurina.org/>, published from
[Jurinas-vatsys-plugins/website](https://github.com/Jurinas-vatsys-plugins/website) with
Settings → Pages → Source set to "GitHub Actions".

- `public/CNAME` and the repository's Pages setting both hold the domain.
- DNS is on Cloudflare: `vatsys` is a proxied CNAME to `jurinas-vatsys-plugins.github.io`, so
  Cloudflare serves HTTPS (SSL/TLS mode "Full").
- All links are relative, so the build also works under any other path or domain.

Pull requests run `.github/workflows/ci.yml` (type-check and build) before they can be merged.

## Credits

vatSys screenshots, the vatSys mark and the vatSys app icon are from
[virtualairtrafficsystem.com](https://virtualairtrafficsystem.com/) and the vatSys client, used here to
show what the plugins are for. Icons are from Ionicons (MIT) and GitHub Octicons (MIT).
