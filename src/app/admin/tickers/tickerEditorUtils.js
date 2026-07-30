export function getRangeAnchor(range) {
  const node = range.commonAncestorContainer;
  return node.nodeType === 3 ? node.parentElement : node;
}

export function getDepth(node) {
  let depth = 0;
  let current = node;
  while (current?.parentElement) {
    depth += 1;
    current = current.parentElement;
  }
  return depth;
}

export function unwrapElement(el) {
  const parent = el.parentNode;
  if (!parent) return;
  while (el.firstChild) {
    parent.insertBefore(el.firstChild, el);
  }
  parent.removeChild(el);
}

export function normalizeColor(color) {
  if (!color) return null;
  const trimmed = color.trim().toLowerCase();
  if (trimmed.startsWith('#')) {
    if (trimmed.length === 4) {
      return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
    }
    return trimmed;
  }
  const rgbMatch = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return `#${[rgbMatch[1], rgbMatch[2], rgbMatch[3]]
      .map((value) => Number(value).toString(16).padStart(2, '0'))
      .join('')}`;
  }
  return trimmed;
}

export function hasExplicitTextColor(el) {
  if (!el || el.nodeType !== 1) return false;
  const color = el.style?.color;
  return Boolean(color && color !== 'inherit' && color !== 'initial');
}

export function spanHasOnlyRemovableColor(span) {
  if (!span || span.tagName !== 'SPAN') return false;
  if (span.classList.contains('ticker-blink')) return false;
  if (!hasExplicitTextColor(span)) return false;
  const style = span.style;
  const hasOtherStyles =
    Boolean(style.fontFamily) ||
    Boolean(style.fontWeight) ||
    Boolean(style.fontStyle) ||
    Boolean(style.textDecoration);
  return !hasOtherStyles;
}

export function shouldUnwrapSpan(span) {
  if (!span || span.tagName !== 'SPAN') return false;
  if (span.classList.contains('ticker-blink')) return false;
  if (span.attributes.length === 0) return true;
  if (span.classList.length === 0 && !span.style.cssText.trim()) return true;
  if (span.classList.length === 0 && !span.style.fontFamily && !hasExplicitTextColor(span)) {
    return true;
  }
  return false;
}

function collectElements(root, predicate) {
  const results = [];

  function walk(node) {
    if (!node) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (predicate(node)) results.push(node);
      Array.from(node.childNodes).forEach(walk);
      return;
    }
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  }

  walk(root);
  return results;
}

export function unwrapTextColorInNode(root) {
  const spans = collectElements(root, (node) => node.tagName === 'SPAN' && hasExplicitTextColor(node));
  spans.sort((a, b) => getDepth(b) - getDepth(a));
  spans.forEach((span) => {
    span.style.removeProperty('color');
    if (shouldUnwrapSpan(span)) {
      unwrapElement(span);
    }
  });
}

export function detectColorInRange(range, container) {
  if (!range || !container) return false;

  const anchor = getRangeAnchor(range);
  if (anchor && container.contains(anchor)) {
    let el = anchor;
    while (el && container.contains(el)) {
      if (hasExplicitTextColor(el)) return true;
      if (el === container) break;
      el = el.parentElement;
    }
  }

  return collectElements(container, (node) => hasExplicitTextColor(node)).some((node) =>
    range.intersectsNode(node)
  );
}

export function getSelectionColor(range, container) {
  if (!range || !container) return null;

  const anchor = getRangeAnchor(range);
  if (anchor && container.contains(anchor)) {
    let el = anchor;
    while (el && container.contains(el)) {
      if (hasExplicitTextColor(el)) {
        return normalizeColor(el.style.color);
      }
      if (el === container) break;
      el = el.parentElement;
    }
  }

  const colored = collectElements(container, (node) => hasExplicitTextColor(node)).filter((node) =>
    range.intersectsNode(node)
  );
  if (colored.length === 0) return null;

  const normalized = normalizeColor(colored[0].style.color);
  const allSame = colored.every((node) => normalizeColor(node.style.color) === normalized);
  return allSame ? normalized : null;
}

function fragmentContainsElement(fragment, tagName) {
  let found = false;
  function walk(node) {
    if (!node || found) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === tagName) {
        found = true;
        return;
      }
      Array.from(node.childNodes).forEach(walk);
      return;
    }
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  }
  walk(fragment);
  return found;
}

function colorizeLinkContents(link, color) {
  unwrapTextColorInNode(link);
  const span = document.createElement('span');
  span.style.color = color;
  while (link.firstChild) {
    span.appendChild(link.firstChild);
  }
  link.appendChild(span);
}

function colorizeFragment(fragment, color) {
  if (fragmentContainsElement(fragment, 'A')) {
    const links = collectElements(fragment, (node) => node.tagName === 'A');
    links.forEach((link) => colorizeLinkContents(link, color));
    return { type: 'fragment', links, node: fragment };
  }

  unwrapTextColorInNode(fragment);
  const span = document.createElement('span');
  span.style.color = color;
  span.appendChild(fragment);
  return { type: 'span', node: span };
}

export function applyColorToRange(range, color) {
  if (!range || range.collapsed || !color) return false;

  const fragment = range.extractContents();
  const result = colorizeFragment(fragment, color);
  range.insertNode(result.node);

  const selection = window.getSelection();
  if (selection) {
    const newRange = document.createRange();
    if (result.type === 'span') {
      newRange.selectNodeContents(result.node);
    } else if (result.links?.[0]?.isConnected) {
      const coloredSpan = result.links[0].querySelector('span[style*="color"]') || result.links[0];
      newRange.selectNodeContents(coloredSpan);
    }
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  return true;
}

export function removeColorFromRange(range) {
  if (!range || range.collapsed) return false;

  const fragment = range.extractContents();

  // Keep colored spans inside links — only strip the color property there.
  collectElements(fragment, (node) => node.tagName === 'A').forEach((link) => {
    unwrapTextColorInNode(link);
  });
  unwrapTextColorInNode(fragment);

  range.insertNode(fragment);

  const selection = window.getSelection();
  if (selection) {
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return true;
}

export function detectBlinkInRange(range, container) {
  const anchor = getRangeAnchor(range);
  if (!anchor || !container.contains(anchor)) return false;
  if (anchor.classList?.contains('ticker-blink') || anchor.closest('.ticker-blink')) return true;
  return Array.from(container.querySelectorAll('.ticker-blink')).some((el) => range.intersectsNode(el));
}

export function removeBlinkInSelection(container, range) {
  const blinks = Array.from(container.querySelectorAll('.ticker-blink')).filter((el) =>
    range.intersectsNode(el)
  );
  blinks.sort((a, b) => getDepth(b) - getDepth(a));
  blinks.forEach(unwrapElement);
  return blinks.length > 0;
}

export function detectLinkInRange(range) {
  const anchor = getRangeAnchor(range);
  if (!anchor) return false;
  return anchor.tagName === 'A' || !!anchor.closest('a');
}

export function wrapSelectionWithNode(containerEl, nodeFactory) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  if (range.collapsed) return false;
  if (!containerEl.contains(range.commonAncestorContainer)) return false;

  const wrapper = nodeFactory();
  try {
    const fragment = range.extractContents();
    wrapper.appendChild(fragment);
    range.insertNode(wrapper);

    const newRange = document.createRange();
    newRange.selectNodeContents(wrapper);
    selection.removeAllRanges();
    selection.addRange(newRange);
    return true;
  } catch {
    return false;
  }
}

export function removeFontInRange(range) {
  if (!range || range.collapsed) return false;

  const fragment = range.extractContents();
  const spans = collectElements(fragment, (node) => node.tagName === 'SPAN' && Boolean(node.style.fontFamily));
  spans.sort((a, b) => getDepth(b) - getDepth(a));
  spans.forEach((span) => {
    span.style.removeProperty('font-family');
    if (shouldUnwrapSpan(span)) {
      unwrapElement(span);
    }
  });
  range.insertNode(fragment);

  const selection = window.getSelection();
  if (selection) {
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return true;
}
