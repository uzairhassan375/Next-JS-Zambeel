'use client';

import { useRef, useState, useEffect } from 'react';
import { attachTickerBlinkRaf } from '../../../lib/tickerBlinkRaf';
import { FONT_FAMILIES } from '../../../lib/editorFonts';

const TICKER_COLORS = [
  { label: 'Yellow', value: '#fcd64c' },
  { label: 'White', value: '#ffffff' },
  { label: 'Red', value: '#ff4d4f' },
  { label: 'Green', value: '#52c41a' },
  { label: 'Blue', value: '#40a9ff' },
  { label: 'Orange', value: '#fa8c16' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Black', value: '#000000' },
];

function readLinkStyles(link) {
  if (!link || link.tagName !== 'A') {
    return { showUnderline: false, underlineColor: '#fcd64c' };
  }
  const dataUnderline = link.getAttribute('data-ticker-underline');
  const showUnderline =
    dataUnderline === 'true' ||
    (dataUnderline !== 'false' && link.style.textDecoration.includes('underline'));
  const underlineColor =
    link.getAttribute('data-ticker-underline-color') ||
    link.style.textDecorationColor ||
    '#fcd64c';
  return { showUnderline, underlineColor };
}

function applyLinkStyles(link, { showUnderline, underlineColor }) {
  if (!link || link.tagName !== 'A') return;
  link.classList.add('ticker-link');

  if (showUnderline) {
    link.setAttribute('data-ticker-underline', 'true');
    link.setAttribute('data-ticker-underline-color', underlineColor);
    link.style.textDecoration = 'underline';
    link.style.textDecorationColor = underlineColor;
    link.style.textUnderlineOffset = '2px';
    link.style.textDecorationSkipInk = 'none';
  } else {
    link.setAttribute('data-ticker-underline', 'false');
    link.removeAttribute('data-ticker-underline-color');
    link.style.textDecoration = 'none';
    link.style.textDecorationColor = '';
    link.style.textUnderlineOffset = '';
    link.style.textDecorationSkipInk = '';
  }
}

const INITIAL_ACTIVE_EFFECTS = {
  bold: false,
  italic: false,
  underline: false,
  blink: false,
  link: false,
  color: false,
};

function getRangeAnchor(range) {
  const node = range.commonAncestorContainer;
  return node.nodeType === 3 ? node.parentElement : node;
}

function getDepth(node) {
  let depth = 0;
  let current = node;
  while (current?.parentElement) {
    depth += 1;
    current = current.parentElement;
  }
  return depth;
}

function unwrapElement(el) {
  const parent = el.parentNode;
  if (!parent) return;
  while (el.firstChild) {
    parent.insertBefore(el.firstChild, el);
  }
  parent.removeChild(el);
}

function detectBlinkInRange(range, container) {
  const anchor = getRangeAnchor(range);
  if (!anchor || !container.contains(anchor)) return false;
  if (anchor.classList?.contains('ticker-blink') || anchor.closest('.ticker-blink')) return true;
  return Array.from(container.querySelectorAll('.ticker-blink')).some((el) => range.intersectsNode(el));
}

function detectLinkInRange(range) {
  const anchor = getRangeAnchor(range);
  if (!anchor) return false;
  return anchor.tagName === 'A' || !!anchor.closest('a');
}

function detectColorInRange(range, container) {
  const anchor = getRangeAnchor(range);
  if (!anchor || !container.contains(anchor)) return false;
  let el = anchor;
  while (el && container.contains(el)) {
    if (el.tagName === 'SPAN' && el.style.color && !el.classList.contains('ticker-blink')) {
      return true;
    }
    if (el === container) break;
    el = el.parentElement;
  }
  return Array.from(container.querySelectorAll('span[style*="color"]')).some(
    (span) => !span.classList.contains('ticker-blink') && range.intersectsNode(span)
  );
}

function removeBlinkInSelection(container, range) {
  const blinks = Array.from(container.querySelectorAll('.ticker-blink')).filter((el) =>
    range.intersectsNode(el)
  );
  blinks.sort((a, b) => getDepth(b) - getDepth(a));
  blinks.forEach(unwrapElement);
  return blinks.length > 0;
}

function removeColorInSelection(container, range) {
  const spans = Array.from(container.querySelectorAll('span[style*="color"]')).filter(
    (span) => !span.classList.contains('ticker-blink') && range.intersectsNode(span)
  );
  spans.sort((a, b) => getDepth(b) - getDepth(a));
  spans.forEach((span) => {
    span.style.removeProperty('color');
    if (!span.style.cssText.trim() && span.classList.length === 0) {
      unwrapElement(span);
    }
  });
  return spans.length > 0;
}

function activeBtnClass(isActive) {
  return isActive
    ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
    : 'hover:bg-gray-100';
}

function wrapSelectionWithNode(containerEl, nodeFactory) {
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
    selection.removeAllRanges();
    return true;
  } catch {
    return false;
  }
}

export default function TickerRichTextEditor({ value, onChange, dir = 'ltr' }) {
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const linkDialogRef = useRef(null);
  const savedRangeRef = useRef(null);
  const lastEmittedRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#fcd64c');
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0].value);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkShowUnderline, setLinkShowUnderline] = useState(false);
  const [linkUnderlineColor, setLinkUnderlineColor] = useState('#fcd64c');
  const [hasTextSelection, setHasTextSelection] = useState(false);
  const [activeEffects, setActiveEffects] = useState(INITIAL_ACTIVE_EFFECTS);

  function resetLinkDialog() {
    setLinkUrl('');
    setLinkTitle('');
    setLinkShowUnderline(false);
    setLinkUnderlineColor('#fcd64c');
  }

  function emitChange() {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastEmittedRef.current = html;
      onChange(html);
    }
  }

  function refreshActiveEffects() {
    const el = editorRef.current;
    if (!el) return;
    setTimeout(() => {
      const sel = document.getSelection();
      if (!sel?.rangeCount || !el.contains(sel.anchorNode)) {
        setActiveEffects(INITIAL_ACTIVE_EFFECTS);
        return;
      }
      const range = sel.getRangeAt(0);
      const isOnLink = detectLinkInRange(range);
      setActiveEffects({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        blink: detectBlinkInRange(range, el),
        link: isOnLink,
        color: detectColorInRange(range, el),
      });
    }, 0);
  }

  function saveSelection() {
    const sel = document.getSelection();
    if (!sel.rangeCount || !editorRef.current?.contains(sel.anchorNode)) return;
    savedRangeRef.current = sel.getRangeAt(0).cloneRange();
  }

  function restoreSelection() {
    if (!savedRangeRef.current || !editorRef.current) return;
    const sel = document.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRangeRef.current);
    editorRef.current.focus();
  }

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (value !== lastEmittedRef.current && el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
    return attachTickerBlinkRaf(el);
  }, [value]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const checkSelection = () => {
      const sel = document.getSelection();
      if (sel.rangeCount > 0 && el.contains(sel.anchorNode)) {
        const range = sel.getRangeAt(0);
        const selectedText = range.toString().trim();
        const isOnLink = detectLinkInRange(range);
        setHasTextSelection(selectedText.length > 0 || isOnLink);
        setActiveEffects({
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          underline: document.queryCommandState('underline'),
          blink: detectBlinkInRange(range, el),
          link: isOnLink,
          color: detectColorInRange(range, el),
        });
      } else {
        setHasTextSelection(false);
        setActiveEffects(INITIAL_ACTIVE_EFFECTS);
      }
    };

    const handleClick = () => setTimeout(checkSelection, 10);

    el.addEventListener('mouseup', handleClick);
    el.addEventListener('keyup', checkSelection);
    el.addEventListener('select', checkSelection);
    el.addEventListener('click', handleClick);

    return () => {
      el.removeEventListener('mouseup', handleClick);
      el.removeEventListener('keyup', checkSelection);
      el.removeEventListener('select', checkSelection);
      el.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        toolbarRef.current?.contains(event.target) ||
        linkDialogRef.current?.contains(event.target)
      ) {
        return;
      }
      if (showLinkDialog && linkDialogRef.current && !linkDialogRef.current.contains(event.target)) {
        setShowLinkDialog(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLinkDialog]);

  function runSimple(command) {
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand(command, false);
    emitChange();
    refreshActiveEffects();
  }

  function applyTextColor(color) {
    const el = editorRef.current;
    if (!el) return;
    restoreSelection();
    const ok = wrapSelectionWithNode(el, () => {
      const span = document.createElement('span');
      span.style.color = color;
      return span;
    });
    if (ok) {
      emitChange();
      attachTickerBlinkRaf(el);
    }
  }

  function applyFontFamily(fontFamily) {
    const el = editorRef.current;
    if (!el || !fontFamily) return;
    restoreSelection();
    const ok = wrapSelectionWithNode(el, () => {
      const span = document.createElement('span');
      span.style.fontFamily = fontFamily;
      return span;
    });
    if (ok) {
      emitChange();
      attachTickerBlinkRaf(el);
    }
  }

  function toggleTextColor(color) {
    const el = editorRef.current;
    if (!el) return;
    restoreSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    if (detectColorInRange(range, el)) {
      removeColorInSelection(el, range);
      emitChange();
      refreshActiveEffects();
    } else {
      applyTextColor(color);
      refreshActiveEffects();
    }
  }

  function toggleBlink() {
    const el = editorRef.current;
    if (!el) return;
    restoreSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    if (detectBlinkInRange(range, el)) {
      removeBlinkInSelection(el, range);
      emitChange();
      attachTickerBlinkRaf(el);
      refreshActiveEffects();
    } else {
      const ok = wrapSelectionWithNode(el, () => {
        const span = document.createElement('span');
        span.className = 'ticker-blink';
        return span;
      });
      if (ok) {
        emitChange();
        attachTickerBlinkRaf(el);
        refreshActiveEffects();
      }
    }
  }

  function clearSelectedFormatting() {
    const el = editorRef.current;
    if (!el) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;
    if (!el.contains(range.commonAncestorContainer)) return;

    const selectedText = range.toString();
    range.deleteContents();
    range.insertNode(document.createTextNode(selectedText));
    selection.removeAllRanges();
    emitChange();
    refreshActiveEffects();
  }

  function handleLinkClick() {
    if (!hasTextSelection) return;

    restoreSelection();
    const sel = document.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const selectedText = range.toString();

      let anchor = null;
      if (range.commonAncestorContainer.nodeType === 3) {
        anchor = range.commonAncestorContainer.parentElement;
      } else {
        anchor = range.commonAncestorContainer;
      }

      if (anchor?.tagName === 'A' || anchor?.closest('a')) {
        const linkElement = anchor.tagName === 'A' ? anchor : anchor.closest('a');
        setLinkUrl(linkElement.href || linkElement.getAttribute('href') || '');
        setLinkTitle(linkElement.title || '');
        const { showUnderline, underlineColor } = readLinkStyles(linkElement);
        setLinkShowUnderline(showUnderline);
        setLinkUnderlineColor(underlineColor);
      } else if (selectedText.trim()) {
        setLinkUrl('');
        setLinkTitle('');
        setLinkShowUnderline(false);
        setLinkUnderlineColor('#fcd64c');
      } else {
        resetLinkDialog();
      }
    } else {
      resetLinkDialog();
    }
    setShowLinkDialog(true);
  }

  function insertLink() {
    let url = linkUrl.trim();
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
      url = 'http://' + url;
    }

    restoreSelection();
    editorRef.current?.focus();

    const sel = document.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const selectedText = range.toString().trim();

      let existingLink = null;
      if (range.commonAncestorContainer.nodeType === 3) {
        existingLink = range.commonAncestorContainer.parentElement;
      } else {
        existingLink = range.commonAncestorContainer;
      }

      if (existingLink?.tagName === 'A' || existingLink?.closest('a')) {
        const linkElement =
          existingLink.tagName === 'A' ? existingLink : existingLink.closest('a');
        linkElement.href = url;
        if (linkTitle.trim()) {
          linkElement.title = linkTitle.trim();
        } else {
          linkElement.removeAttribute('title');
        }
        applyLinkStyles(linkElement, {
          showUnderline: linkShowUnderline,
          underlineColor: linkUnderlineColor,
        });
        emitChange();
      } else if (selectedText) {
        document.execCommand('createLink', false, url);
        setTimeout(() => {
          const links = editorRef.current?.querySelectorAll('a');
          if (links) {
            Array.from(links).reverse().some((link) => {
              if (
                link.textContent.trim() === selectedText &&
                (link.href === url || link.getAttribute('href') === url)
              ) {
                if (linkTitle.trim()) {
                  link.title = linkTitle.trim();
                }
                applyLinkStyles(link, {
                  showUnderline: linkShowUnderline,
                  underlineColor: linkUnderlineColor,
                });
                return true;
              }
              return false;
            });
          }
          emitChange();
        }, 10);
      }
    }

    setShowLinkDialog(false);
    resetLinkDialog();
  }

  function removeLink() {
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand('unlink', false);
    emitChange();
    setShowLinkDialog(false);
    resetLinkDialog();
  }

  return (
    <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div
        ref={toolbarRef}
        className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50"
        onMouseDown={(e) => {
          e.stopPropagation();
          saveSelection();
        }}
      >
        <button
          type="button"
          onClick={() => runSimple('bold')}
          className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.bold)}`}
          title={activeEffects.bold ? 'Remove bold' : 'Apply bold'}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => runSimple('italic')}
          className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.italic)}`}
          title={activeEffects.italic ? 'Remove italic' : 'Apply italic'}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => runSimple('underline')}
          className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.underline)}`}
          title={activeEffects.underline ? 'Remove underline' : 'Apply underline'}
        >
          Underline
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleLinkClick();
          }}
          disabled={!hasTextSelection}
          className={`px-2 py-1 text-xs border rounded flex items-center gap-1 ${
            !hasTextSelection
              ? 'text-gray-400 cursor-not-allowed opacity-50'
              : activeBtnClass(activeEffects.link)
          }`}
          title={
            !hasTextSelection
              ? 'Select text to create a link'
              : activeEffects.link
                ? 'Edit or remove link'
                : 'Insert link'
          }
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          Link
        </button>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="px-2 py-1 text-xs border rounded bg-white min-w-[100px]"
          title="Choose text color"
        >
          {TICKER_COLORS.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => toggleTextColor(selectedColor)}
          className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.color)}`}
          title={activeEffects.color ? 'Remove color' : 'Apply color'}
        >
          {activeEffects.color ? 'Remove Color' : 'Apply Color'}
        </button>
        <select
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          className="px-2 py-1 text-xs border rounded bg-white min-w-[130px]"
          title="Choose font"
          style={{ fontFamily: selectedFont }}
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => applyFontFamily(selectedFont)}
          className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
          title="Apply font to selected text"
        >
          Apply Font
        </button>
        <button
          type="button"
          onClick={toggleBlink}
          className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.blink)}`}
          title={activeEffects.blink ? 'Remove blink' : 'Apply blink'}
        >
          {activeEffects.blink ? 'Unblink' : 'Blink'}
        </button>
        <button
          type="button"
          onClick={clearSelectedFormatting}
          className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        dir={dir}
        className="ticker-editor min-h-[100px] p-3 text-sm focus:outline-none"
        onInput={emitChange}
        onMouseDown={saveSelection}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ticker-editor a,
        .ticker-editor .ticker-link {
          color: #2563eb;
          cursor: pointer;
        }
        .ticker-editor a:hover,
        .ticker-editor .ticker-link:hover {
          color: #1d4ed8;
        }
      `,
        }}
      />

      {showLinkDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div
            ref={linkDialogRef}
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 min-w-[400px] max-w-[500px] mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Link to</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="http:// or /pages/..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use http:// for external links or / for internal pages
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Link title</label>
              <input
                type="text"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="Used for accessibility and SEO"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Used for accessibility and SEO</p>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={linkShowUnderline}
                  onChange={(e) => setLinkShowUnderline(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Show underline on link
              </label>
            </div>

            {linkShowUnderline && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Underline color
                </label>
                <select
                  value={linkUnderlineColor}
                  onChange={(e) => setLinkUnderlineColor(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {TICKER_COLORS.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowLinkDialog(false);
                  resetLinkDialog();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              {linkUrl && (
                <button
                  type="button"
                  onClick={removeLink}
                  className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50"
                >
                  Remove Link
                </button>
              )}
              <button
                type="button"
                onClick={insertLink}
                className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e3a8a]/90"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
