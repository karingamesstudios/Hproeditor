import type { EditorElement } from '../types/editor';

const escapeHTML = (value: unknown): string => String(value ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const safeId = (value: string): string => (value || 'elemento').replace(/[^a-zA-Z0-9_-]/g, '-');
const kebab = (key: string) => key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
const OMIT = new Set(['tabletStyles', 'mobileStyles', 'hoverStyles', 'activeStyles', 'customClass']);
const UNITLESS = new Set([
  'animationIterationCount', 'aspectRatio', 'borderImageOutset', 'borderImageSlice', 'borderImageWidth',
  'boxFlex', 'columnCount', 'fillOpacity', 'flex', 'flexGrow', 'flexShrink', 'fontWeight', 'gridArea',
  'gridColumn', 'gridColumnEnd', 'gridColumnStart', 'gridRow', 'gridRowEnd', 'gridRowStart', 'lineHeight',
  'opacity', 'order', 'orphans', 'scale', 'stopOpacity', 'strokeDasharray', 'strokeDashoffset', 'strokeMiterlimit',
  'strokeOpacity', 'strokeWidth', 'tabSize', 'widows', 'zIndex', 'zoom', 'WebkitLineClamp'
]);
const cssValue = (key: string, value: unknown): string | null => {
  if (value == null || typeof value === 'boolean' || typeof value === 'object') return null;
  if (typeof value === 'number') return UNITLESS.has(key) || value === 0 ? String(value) : `${value}px`;
  const text = String(value).trim();
  if (!text || /[<>]/.test(text)) return null;
  return text;
};
function stylesToCSS(styles: Record<string, unknown> = {}): string {
  return Object.entries(styles).filter(([key]) => !OMIT.has(key) && key !== 'cssText')
    .map(([key, value]) => {
      const v = cssValue(key, value);
      return v === null ? '' : `  ${kebab(key)}: ${v};`;
    }).filter(Boolean).join('\n');
}
function walk(element: EditorElement, callback: (el: EditorElement) => void) {
  callback(element);
  element.children?.forEach(child => walk(child, callback));
}
export function createExportIdMap(element: EditorElement, prefix = ''): Map<EditorElement, string> {
  const ids = new Map<EditorElement, string>();
  const used = new Set<string>();
  let fallback = 0;
  walk(element, (el) => {
    const base = `${prefix}${safeId(el.id || `elemento-${++fallback}`)}`;
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    ids.set(el, id);
  });
  return ids;
}
function getId(element: EditorElement, ids?: Map<EditorElement, string>): string {
  return ids?.get(element) || safeId(element.id || 'elemento');
}
function canvasDefaultStyles(element: EditorElement): Record<string, unknown> {
  const isRoot = element.id === 'root-body';
  const defaults: Record<string, unknown> = {
    display: 'block',
    width: element.type === 'button' || element.type === 'link' ? 'fit-content' : '100%',
    maxWidth: '100%',
    minWidth: 0,
    minHeight: isRoot ? '100%' : undefined,
    boxSizing: 'border-box',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '12px',
    paddingRight: '12px',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    transition: 'all 0.2s ease',
    borderRadius: isRoot ? '16px' : element.type === 'image' ? '16px' : '0px',
  };
  if (element.type === 'image') {
    defaults.marginTop = '8px';
    defaults.marginBottom = '8px';
    defaults.objectFit = 'cover';
  }
  return defaults;
}
function mergedCanvasStyles(element: EditorElement, overrides?: Record<string, unknown>): Record<string, unknown> {
  const styles = { ...canvasDefaultStyles(element), ...(element.styles || {}), ...(overrides || {}) };
  // Match the canvas's automatic centering for centered text and constrained imported layouts.
  if (styles.textAlign === 'center' && !styles.marginLeft) styles.marginLeft = 'auto';
  if ((styles.textAlign === 'center' || styles.textAlign === 'right') && !styles.marginRight) styles.marginRight = 'auto';
  if (styles.width === '100%' && styles.maxWidth && styles.maxWidth !== '100%' && styles.marginLeft === '0px') {
    styles.marginLeft = 'auto';
    styles.marginRight = 'auto';
  }
  return styles;
}
export function generateCSS(element: EditorElement, ids?: Map<EditorElement, string>): string {
  const idMap = ids || createExportIdMap(element);
  const rules: string[] = [];
  walk(element, el => {
    const id = getId(el, idMap);
    const base = stylesToCSS(mergedCanvasStyles(el));
    if (base) rules.push(`#${id} {\n${base}\n}`);
    const tablet = stylesToCSS(el.tabletStyles as Record<string, unknown> | undefined);
    if (tablet) rules.push(`@media (max-width: 1024px) {\n  #${id} {\n${tablet.split('\n').map(x => `  ${x}`).join('\n')}\n  }\n}`);
    const mobile = stylesToCSS(el.mobileStyles as Record<string, unknown> | undefined);
    if (mobile) rules.push(`@media (max-width: 640px) {\n  #${id} {\n${mobile.split('\n').map(x => `  ${x}`).join('\n')}\n  }\n}`);
  });
  return rules.join('\n\n');
}

export interface HTMLExportOptions {
  pageFiles?: Map<string, string>;
  ids?: Map<EditorElement, string>;
}
const escapeAttribute = (value: unknown) => escapeHTML(value);
function safeHref(value: string): string {
  const trimmed = value.trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmed) || /^(#|\/|\.\.?\/)/.test(trimmed)) return trimmed;
  return '#';
}
export function generateHTML(element: EditorElement, options: HTMLExportOptions = {}): string {
  const ids = options.ids || createExportIdMap(element);
  const id = escapeAttribute(getId(element, ids));
  const content = escapeHTML(element.content || '').replace(/\r?\n/g, '<br>');
  const childrenHTML = element.children?.map(child => generateHTML(child, { ...options, ids })).join('\n') ?? '';
  const name = escapeAttribute(element.name || '');
  const src = escapeAttribute(element.src || '');
  const customClass = typeof element.styles?.customClass === 'string'
    ? ` class="${escapeAttribute(element.styles.customClass.split(/\s+/).filter(Boolean).join(' '))}"` : '';
  const targetFile = element.targetPageId ? options.pageFiles?.get(element.targetPageId) : undefined;
  const internalHref = targetFile || (element.targetPageId ? `#${safeId(element.targetPageId)}` : '');
  const href = safeHref(element.linkUrl || internalHref || '#');
  const hasNavigation = Boolean(element.linkUrl?.trim() || element.targetPageId);
  const children = childrenHTML ? `\n${childrenHTML}\n` : '';
  const wrapper = (inner: string) => `<div id="${id}"${customClass}>${inner}</div>`;
  const textStyles = 'style="display:block;width:100%;height:auto;min-height:1.4em;margin:0;padding:0;box-sizing:border-box;overflow-wrap:break-word;word-break:break-word;color:inherit;font:inherit;text-align:inherit"';
  switch (element.type) {
    case 'heading': return wrapper(`<h1 ${textStyles}>${content}</h1>`);
    case 'paragraph': return wrapper(`<p ${textStyles}>${content}</p>`);
    case 'button': return wrapper(hasNavigation
      ? `<a href="${escapeAttribute(href)}" role="button" style="display:block;width:auto;margin:0;padding:0;border:0;background:transparent;color:inherit;font:inherit;text-align:inherit;text-decoration:none;box-sizing:border-box"${element.linkUrl?.trim() && /^https?:/i.test(element.linkUrl.trim()) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${content || name}</a>`
      : `<button type="button" style="display:block;width:auto;margin:0;padding:0;border:0;background:transparent;color:inherit;font:inherit;text-align:inherit;box-sizing:border-box;appearance:none">${content}</button>`);
    case 'link': return wrapper(`<a href="${escapeAttribute(href)}" style="display:block;width:100%;margin:0;padding:0;border:0;background:transparent;color:inherit;font:inherit;text-align:inherit;text-decoration:inherit;box-sizing:border-box"${element.linkUrl?.trim() && /^https?:/i.test(element.linkUrl.trim()) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${content || name}</a>`);
    case 'image': return wrapper(`<img src="${src}" alt="${name}" loading="lazy" style="display:block;width:100%;height:${escapeAttribute(element.styles?.height || 'auto')};max-height:${element.styles?.height ? 'none' : '500px'};object-fit:${escapeAttribute(element.styles?.objectFit || 'cover')};border-radius:${escapeAttribute(element.styles?.borderRadius || '16px')};box-sizing:border-box">`);
    case 'section': return `<section id="${id}"${customClass}>${children}</section>`;
    case 'header': return `<header id="${id}"${customClass}>${content}${content && childrenHTML ? '\n' : ''}${childrenHTML}</header>`;
    case 'nav': return `<nav id="${id}"${customClass}>${content}${content && childrenHTML ? '\n' : ''}${childrenHTML}</nav>`;
    case 'article': return `<article id="${id}"${customClass}>${content}${content && childrenHTML ? '\n' : ''}${childrenHTML}</article>`;
    case 'footer': return `<footer id="${id}"${customClass}>${content}${content && childrenHTML ? '\n' : ''}${childrenHTML}</footer>`;
    case 'container': return `<div id="${id}"${customClass}>${content}${content && childrenHTML ? '\n' : ''}${childrenHTML}</div>`;
    default: return `<div id="${id}"${customClass}>${content}${content && childrenHTML ? '\n' : ''}${childrenHTML}</div>`;
  }
}

export function generateFullDocument(element: EditorElement, pageName = 'Página'): string {
  const ids = createExportIdMap(element);
  return `<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>${escapeHTML(pageName)}</title>\n  <style>\n*{box-sizing:border-box}html,body{margin:0;min-height:100%;width:100%;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}img{max-width:100%;height:auto;display:block}button,a{cursor:pointer}button{font:inherit}h1,h2,h3,h4,h5,h6,p{margin:0}*{min-width:0}body{overflow-wrap:break-word}\n${generateCSS(element, ids)}\n</style>\n</head>\n<body>\n${generateHTML(element, { ids })}\n</body>\n</html>`;
}
