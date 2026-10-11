import type { EditorElement } from '../types/editor';

/**
 * Importa HTML intentando conservar el aspecto calculado por el navegador.
 * Los scripts se eliminan antes de renderizar el documento en un iframe aislado;
 * las hojas CSS externas y los bloques <style> se mantienen para calcular estilos.
 */
export async function parseHTMLToEditorElement(htmlString: string): Promise<EditorElement> {
  const parsed = new DOMParser().parseFromString(htmlString, 'text/html');
  const baseHref = parsed.querySelector('base')?.href || 'https://karingames.itch.io/';

  // No ejecutar código del HTML importado dentro de Hproeditor.
  parsed.querySelectorAll('script, noscript').forEach((node) => node.remove());
  parsed.querySelectorAll('*').forEach((node) => {
    Array.from(node.attributes).forEach((attr) => {
      if (/^on/i.test(attr.name)) node.removeAttribute(attr.name);
    });
  });
  if (!parsed.querySelector('base')) {
    const base = parsed.createElement('base');
    base.href = baseHref;
    parsed.head.prepend(base);
  }

  // El canvas solo representa elementos del árbol; el texto suelto dentro de
  // divs y enlaces personalizados se perdía. Envolvemos esos nodos para que
  // también se puedan importar y editar.
  const walker = parsed.createTreeWalker(parsed.body, NodeFilter.SHOW_TEXT);
  const looseTextNodes: Text[] = [];
  while (walker.nextNode()) {
    const textNode = walker.currentNode as Text;
    const parentTag = textNode.parentElement?.tagName.toLowerCase();
    const parentOwnsText = parentTag && (/^h[1-6]$/.test(parentTag) || ['p', 'blockquote', 'li', 'label', 'a', 'button', 'textarea', 'title', 'script', 'style', 'span', 'small', 'strong', 'em', 'b', 'i'].includes(parentTag));
    if (textNode.nodeValue?.trim() && textNode.parentElement && !parentOwnsText) {
      looseTextNodes.push(textNode);
    }
  }
  looseTextNodes.forEach((textNode) => {
    const parent = textNode.parentElement;
    if (!parent) return;
    const span = parsed.createElement('span');
    span.setAttribute('data-hpro-imported-text', 'true');
    span.textContent = textNode.nodeValue || '';
    parent.replaceChild(span, textNode);
  });

  const frame = document.createElement('iframe');
  frame.setAttribute('sandbox', 'allow-same-origin');
  frame.setAttribute('aria-hidden', 'true');
  frame.tabIndex = -1;
  Object.assign(frame.style, {
    position: 'fixed', left: '-20000px', top: '0', width: '1440px', height: '1000px',
    border: '0', opacity: '0', pointerEvents: 'none', zIndex: '-1',
  });
  document.body.appendChild(frame);

  try {
    const source = '<!doctype html>\n' + parsed.documentElement.outerHTML;
    await new Promise<void>((resolve) => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        resolve();
      };
      frame.addEventListener('load', finish, { once: true });
      frame.srcdoc = source;
      // Algunas páginas con recursos externos tardan o no disparan load; no bloquear la importación.
      window.setTimeout(finish, 5000);
    });

    const doc = frame.contentDocument;
    const view = frame.contentWindow;
    if (!doc || !view || !doc.body) return parseWithoutComputedStyles(parsed);

    const makeId = () => `el-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const visualProperties = [
      'color', 'background', 'backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition',
      'backgroundRepeat', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'textDecoration',
      'letterSpacing', 'lineHeight', 'textAlign', 'padding', 'paddingTop', 'paddingRight',
      'paddingBottom', 'paddingLeft', 'margin', 'marginTop', 'marginRight', 'marginBottom',
      'marginLeft', 'display', 'flexDirection', 'flexWrap', 'flex', 'flexGrow', 'flexShrink',
      'flexBasis', 'justifyContent', 'alignItems', 'alignContent', 'alignSelf', 'gap', 'opacity',
      'border', 'borderRadius', 'borderWidth', 'borderStyle', 'borderColor', 'borderTopWidth',
      'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'boxShadow', 'objectFit',
      'overflow', 'position', 'top', 'left', 'right', 'bottom', 'zIndex', 'transform', 'aspectRatio', 'maxWidth',
      'minWidth', 'minHeight', 'height', 'boxSizing', 'textTransform', 'whiteSpace', 'gridTemplateColumns', 'gridTemplateRows', 'objectPosition',
    ] as const;

    const convert = (node: Element, parentRect?: DOMRect): EditorElement | null => {
      const tag = node.tagName.toLowerCase();
      if (['script', 'style', 'link', 'meta', 'title', 'base', 'template'].includes(tag)) return null;
      const htmlNode = node as HTMLElement;
      const computed = view.getComputedStyle(node);
      if (computed.display === 'none' || computed.visibility === 'hidden') return null;

      const id = node.id || makeId();
      const type = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? 'heading'
        : ['p', 'blockquote', 'li', 'label'].includes(tag) || (['span', 'small', 'strong', 'em', 'b', 'i'].includes(tag) && !node.children.length && Boolean(node.textContent?.trim())) ? 'paragraph'
        : tag === 'button' ? 'button'
        : tag === 'a' ? 'link'
        : tag === 'img' ? 'image'
        : ['section', 'header', 'nav', 'footer', 'article', 'main'].includes(tag) ? 'section'
        : 'container';

      const rect = node.getBoundingClientRect();
      const styles: Record<string, any> = {};
      for (const property of visualProperties) {
        const value = (computed as any)[property];
        if (value !== undefined && value !== '' && value !== 'normal' && value !== 'none' && value !== 'auto') {
          styles[property] = value;
        }
      }

      // Medir el ancho respecto al padre evita importar anchos de escritorio fijos
      // que dejan el contenido en una columna diminuta en la vista móvil.
      const parentElement = node.parentElement;
      const parentDisplay = parentElement ? view.getComputedStyle(parentElement).display : 'block';
      const parentUsesLayout = parentDisplay.includes('flex') || parentDisplay.includes('grid');
      if (type !== 'image') {
        if (parentUsesLayout && rect.width > 0 && parentRect && parentRect.width > 0) {
          const ratio = rect.width / parentRect.width;
          if (ratio >= 0.97) styles.width = '100%';
          else if (ratio > 0.04) styles.width = `${Math.max(1, Math.min(100, Math.round(ratio * 1000) / 10))}%`;
        } else if (['block', 'flex', 'grid', 'list-item'].includes(computed.display)) {
          styles.width = '100%';
        }
      }

      // Las coordenadas absolutas de páginas completas (por ejemplo itch.io)
      // dependen del viewport original y dejan grandes huecos o elementos fuera
      // del canvas. Se prioriza el flujo responsive; el usuario podrá recolocar
      // los elementos después desde el editor.
      if (styles.position === 'fixed' || styles.position === 'sticky' || styles.position === 'absolute') {
        styles.position = 'relative';
        delete styles.top;
        delete styles.left;
        delete styles.right;
        delete styles.bottom;
        delete styles.zIndex;
        delete styles.transform;
      }
      // Las alturas rígidas de wrappers de sitios completos suelen reservar
      // espacio para scripts/widgets que no se ejecutan en el importador.
      if (styles.height && /^\d+(?:\.\d+)?px$/.test(String(styles.height)) && parseFloat(String(styles.height)) > 900 && !['img', 'video', 'iframe'].includes(tag)) {
        delete styles.height;
      }
      if (styles.minHeight && /^\d+(?:\.\d+)?px$/.test(String(styles.minHeight)) && parseFloat(String(styles.minHeight)) > 1200) {
        styles.minHeight = 'auto';
      }
      if (tag === 'img') {
        styles.width = computed.width && computed.width !== 'auto' ? styles.width || '100%' : '100%';
        styles.objectFit = computed.objectFit || 'contain';
        styles.height = computed.height !== 'auto' && rect.height > 0 ? `${Math.round(rect.height)}px` : 'auto';
        styles.maxWidth = '100%';
      }
      if (styles.backgroundColor === 'rgba(0, 0, 0, 0)') delete styles.backgroundColor;
      if (styles.color === 'rgb(0, 0, 0)' && !node.hasAttribute('style')) {
        // Se conserva el color calculado: el negro puede ser intencional.
      }

      const children: EditorElement[] = [];
      Array.from(node.children).forEach((child) => {
        const converted = convert(child, rect);
        if (converted) children.push(converted);
      });

      // itch.io suele usar una cuadrícula de dos columnas aunque la columna
      // lateral esté oculta por el tema. Al importar solo queda .left_col con
      // un ancho de 66.666%, dejando un gran rectángulo vacío a la derecha.
      // Si la columna lateral no sobrevivió a la conversión, expandir la única
      // columna restante para aprovechar el ancho del contenido.
      if (node.classList.contains('columns') && children.length === 1) {
        children[0].styles = {
          ...(children[0].styles || {}),
          width: '100%',
          maxWidth: '100%',
          flex: '1 1 100%',
          flexBasis: '100%',
        };
      }

      let content: string | undefined;
      if (['heading', 'paragraph', 'button', 'link'].includes(type)) {
        // textContent conserva el texto aunque venga envuelto en <strong>, <em> o <span>.
        content = (node.textContent || '').replace(/\s+/g, ' ').trim();
      }

      const result: EditorElement = {
        id,
        name: `${tag.toUpperCase()} (${id.slice(0, 6)})`,
        type,
        content,
        src: tag === 'img' ? (node as HTMLImageElement).currentSrc || node.getAttribute('src') || '' : undefined,
        linkUrl: tag === 'a' ? (node as HTMLAnchorElement).getAttribute('href') || undefined : undefined,
        styles,
        children: children.length ? children : undefined,
      };
      return result;
    };

    // itch.io exporta la cabecera global, menús de cuenta y controles de edición
    // junto a la página del juego. Importar todo el body introduce barras extrañas
    // y columnas estrechas; en ese caso se toma solo el wrapper del contenido.
    const isItchioPage = Boolean(doc.querySelector('.game_page_wrapper, .view_game_page, #game_header_3382914'))
      || /(^|\.)itch\.io$/i.test(new URL(baseHref, window.location.href).hostname);
    const contentRoot = isItchioPage
      ? (doc.querySelector('#wrapper.game_page_wrapper') || doc.querySelector('#wrapper') || doc.querySelector('.game_page_wrapper'))
      : (doc.querySelector('main[role="main"]') || doc.querySelector('main') || doc.querySelector('[role="main"]'));
    const bodyRect = doc.body.getBoundingClientRect();
    const sourceNodes = contentRoot ? [contentRoot] : Array.from(doc.body.children);
    const children = sourceNodes
      .map((child) => convert(child, bodyRect))
      .filter((child): child is EditorElement => child !== null);

    const bodyStyle = view.getComputedStyle(doc.body);
    const selectedStyle = contentRoot ? view.getComputedStyle(contentRoot) : bodyStyle;
    const root: EditorElement = {
      id: 'root-body',
      name: isItchioPage ? 'Contenido importado de itch.io' : 'Cuerpo de la Página',
      type: 'container',
      styles: {
        width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column',
        gap: '0px', padding: '0px', margin: '0px', boxSizing: 'border-box',
        backgroundColor: selectedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ? selectedStyle.backgroundColor : (bodyStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ? bodyStyle.backgroundColor : undefined),
        color: selectedStyle.color || bodyStyle.color || undefined,
        fontFamily: selectedStyle.fontFamily || bodyStyle.fontFamily || undefined,
      },
      children,
    };
    return root;
  } finally {
    frame.remove();
  }
}

function parseWithoutComputedStyles(parsed: Document): EditorElement {
  const makeElement = (node: Element): EditorElement | null => {
    const tag = node.tagName.toLowerCase();
    if (['script', 'style', 'link', 'meta', 'title', 'base', 'template'].includes(tag)) return null;
    const id = node.id || `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const type = /^h[1-6]$/.test(tag) ? 'heading' : (tag === 'p' || (['span', 'small', 'strong', 'em', 'b', 'i'].includes(tag) && !node.children.length && Boolean(node.textContent?.trim()))) ? 'paragraph' : tag === 'button' ? 'button' : tag === 'a' ? 'link' : tag === 'img' ? 'image' : ['section', 'header', 'nav', 'footer', 'article', 'main'].includes(tag) ? 'section' : 'container';
    const children = Array.from(node.children).map(makeElement).filter((item): item is EditorElement => item !== null);
    return {
      id, name: `${tag.toUpperCase()} (${id.slice(0, 6)})`, type,
      content: ['heading', 'paragraph', 'button', 'link'].includes(type) ? (node.textContent || '').replace(/\s+/g, ' ').trim() : undefined,
      src: tag === 'img' ? (node.getAttribute('src') || '') : undefined,
      linkUrl: tag === 'a' ? node.getAttribute('href') || undefined : undefined,
      styles: { ...(node as HTMLElement).style ? Object.fromEntries(Array.from((node as HTMLElement).style).map((prop) => [prop, (node as HTMLElement).style.getPropertyValue(prop)])) : {}, width: '100%', maxWidth: '100%' },
      children: children.length ? children : undefined,
    };
  };
  return {
    id: 'root-body', name: 'Cuerpo de la Página', type: 'container',
    styles: { width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '0px', margin: '0px', boxSizing: 'border-box' },
    children: Array.from(parsed.body.children).map(makeElement).filter((item): item is EditorElement => item !== null),
  };
}
