import { escapeHtml } from "./format.ts";

/*
 * A small Markdown renderer for GitHub release notes: headings, paragraphs, lists, fenced code,
 * quotes, rules, inline code, bold, italics and links. Release notes come from GitHub, so every
 * piece of text is escaped and only http(s) links survive.
 */

const inline = (source: string): string => {
  const codes: string[] = [];
  // Inline code first, so nothing inside it is treated as Markdown.
  let text = source.replace(/`([^`]+)`/g, (_, code: string) => `\u0000${codes.push(code) - 1}\u0000`);
  // Backslash escapes for ASCII punctuation only; "bin\Plugins" keeps its backslash.
  const escapes: string[] = [];
  text = text.replace(/\\([!-/:-@[-`{-~])/g, (_, char: string) => `\u0001${escapes.push(char) - 1}\u0001`);
  text = escapeHtml(text);
  text = text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label: string, href: string) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`)
    .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (_, before: string, href: string) =>
      `${before}<a href="${href}" target="_blank" rel="noopener noreferrer">${href}</a>`)
    .replace(/\*\*(.+?)\*\*|__(.+?)__/g, (_, a?: string, b?: string) => `<strong>${a ?? b}</strong>`)
    .replace(/(^|[^*\w])\*(?!\s)(.+?)\*(?!\w)|(^|[^_\w])_(?!\s)(.+?)_(?!\w)/g,
      (_, beforeA?: string, a?: string, beforeB?: string, b?: string) => `${beforeA ?? beforeB}<em>${a ?? b}</em>`);
  return text
    .replace(/\u0001(\d+)\u0001/g, (_, index: string) => escapeHtml(escapes[Number(index)]))
    .replace(/\u0000(\d+)\u0000/g, (_, index: string) => `<code>${escapeHtml(codes[Number(index)])}</code>`);
};

type ListItem = { ordered: boolean; text: string };
const listItem = (line: string): ListItem | null => {
  const match = /^\s*(?:([-*+])|(\d+)[.)])\s+(.*)$/.exec(line);
  return match ? { ordered: match[2] !== undefined, text: match[3] } : null;
};

export const renderMarkdown = (source: string): string => {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const fence = /^\s*(```|~~~)\s*([\w-]*)/.exec(line);
    if (fence) {
      const body: string[] = [];
      index++;
      while (index < lines.length && !lines[index].trim().startsWith(fence[1])) body.push(lines[index++]);
      index++;
      out.push(`<pre><code>${escapeHtml(body.join("\n"))}</code></pre>`);
      continue;
    }
    if (!line.trim()) { index++; continue; }
    const heading = /^(#{1,6})\s+(.*?)\s*#*$/.exec(line);
    if (heading) {
      // Notes sit under the page's own h2, so their headings start one level down.
      const level = Math.min(6, heading[1].length + 2);
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      index++;
      continue;
    }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { out.push("<hr>"); index++; continue; }
    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith(">")) quote.push(lines[index++].replace(/^>\s?/, ""));
      out.push(`<blockquote>${renderMarkdown(quote.join("\n"))}</blockquote>`);
      continue;
    }
    const first = listItem(line);
    if (first) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = listItem(lines[index]);
        if (item && item.ordered === first.ordered) { items.push(item.text); index++; continue; }
        // An indented line continues the previous item.
        if (items.length && /^\s{2,}\S/.test(lines[index])) { items[items.length - 1] += ` ${lines[index].trim()}`; index++; continue; }
        break;
      }
      const tag = first.ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.map((item) => `<li>${inline(item)}</li>`).join("")}</${tag}>`);
      continue;
    }
    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !/^(#{1,6}\s|\s*(```|~~~)|>)/.test(lines[index]) && !listItem(lines[index])) {
      paragraph.push(lines[index++].trim());
    }
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
  }
  return out.join("\n");
};
