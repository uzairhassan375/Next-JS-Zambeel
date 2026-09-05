'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { attachTickerBlinkRaf } from '../../../lib/tickerBlinkRaf';
import { FONT_FAMILIES } from '../../../lib/editorFonts';
import {
  applyColorToRange,
  detectBlinkInRange,
  detectColorInRange,
  detectLinkInRange,
  getSelectionColor,
  normalizeColor,
  removeBlinkInSelection,
  removeColorFromRange,
  removeFontInRange,
  wrapSelectionWithNode,
} from './tickerEditorUtils';

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

const INITIAL_ACTIVE_EFFECTS = {
  bold: false,
  italic: false,
  underline: false,
  blink: false,
  link: false,
  color: false,
};

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

function activeBtnClass(isActive) {
  return isActive ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'hover:bg-gray-100';
}

function preventToolbarFocusLoss(event) {
  event.preventDefault();
}

export default function TickerRichTextEditor({ value, onChange, dir = 'ltr' }) {
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const linkDialogRef = useRef(null);
  const savedRangeRef = useRef(null);
  const lastEmittedRef = useRef(null);
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0].value);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkShowUnderline, setLinkShowUnderline] = useState(false);
  const [linkUnderlineColor, setLinkUnderlineColor] = useState('#fcd64c');
  const [hasTextSelection, setHasTextSelection] = useState(false);
  const [activeEffects, setActiveEffects] = useState(INITIAL_ACTIVE_EFFECTS);
  const [selectionColor, setSelectionColor] = useState(null);
  const [darkCanvas, setDarkCanvas] = useState(true);

  function resetLinkDialog() {
    setLinkUrl('');
    setLinkTitle('');
    setLinkShowUnderline(false);
    setLinkUnderlineColor('#fcd64c');
  }

  const emitChange = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastEmittedRef.current = html;
      onChange(html);
    }
  }, [onChange]);

  const saveSelection = useCallback(() => {
    const sel = document.getSelection();
    if (!sel?.rangeCount || !editorRef.current?.contains(sel.anchorNode)) return;
    savedRangeRef.current = sel.getRangeAt(0).cloneRange();
  }, []);

  const restoreSelection = useCallback(() => {
    if (!savedRangeRef.current || !editorRef.current) return false;
    const sel = document.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRangeRef.current);
    editorRef.current.focus();
    return true;
  }, []);

  const getWorkingRange = useCallback(() => {
    restoreSelection();
    const sel = document.getSelection();
    if (!sel?.rangeCount) return null;
    const range = sel.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) return null;
    return range;
  }, [restoreSelection]);

  const refreshActiveEffects = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      const sel = document.getSelection();
      if (!sel?.rangeCount || !el.contains(sel.anchorNode)) {
        setHasTextSelection(false);
        setActiveEffects(INITIAL_ACTIVE_EFFECTS);
        setSelectionColor(null);
        return;
      }

      const range = sel.getRangeAt(0);
      const selectedText = range.toString().trim();
      const isOnLink = detectLinkInRange(range);
      const hasColor = detectColorInRange(range, el);
      const currentColor = getSelectionColor(range, el);

      setHasTextSelection(selectedText.length > 0 || isOnLink);
      setSelectionColor(currentColor);
      setActiveEffects({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        blink: detectBlinkInRange(range, el),
        link: isOnLink,
        color: hasColor,
      });
    });
  }, []);

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

    const checkSelection = () => refreshActiveEffects();

    el.addEventListener('mouseup', checkSelection);
    el.addEventListener('keyup', checkSelection);
    el.addEventListener('select', checkSelection);
    el.addEventListener('click', checkSelection);

    return () => {
      el.removeEventListener('mouseup', checkSelection);
      el.removeEventListener('keyup', checkSelection);
      el.removeEventListener('select', checkSelection);
      el.removeEventListener('click', checkSelection);
    };
  }, [refreshActiveEffects]);

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
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(command, false);
    emitChange();
    refreshActiveEffects();
  }

  function handleApplyColor(color) {
    const el = editorRef.current;
    if (!el) return;
    editorRef.current.focus();
    const range = getWorkingRange();
    if (!range || range.collapsed) return;

    const applied = applyColorToRange(range, color);
    if (applied) {
      emitChange();
      attachTickerBlinkRaf(el);
      saveSelection();
      refreshActiveEffects();
    }
  }

  function handleRemoveColor() {
    const el = editorRef.current;
    if (!el) return;
    editorRef.current.focus();
    const range = getWorkingRange();
    if (!range || range.collapsed) return;

    const removed = removeColorFromRange(range);
    if (removed) {
      emitChange();
      attachTickerBlinkRaf(el);
      saveSelection();
      refreshActiveEffects();
    }
  }

  function applyFontFamily(fontFamily) {
    const el = editorRef.current;
    if (!el || !fontFamily) return;
    editorRef.current.focus();
    restoreSelection();
    const ok = wrapSelectionWithNode(el, () => {
      const span = document.createElement('span');
      span.style.fontFamily = fontFamily;
      return span;
    });
    if (ok) {
      emitChange();
      attachTickerBlinkRaf(el);
      saveSelection();
      refreshActiveEffects();
    }
  }

  function handleRemoveFont() {
    const el = editorRef.current;
    if (!el) return;
    editorRef.current.focus();
    const range = getWorkingRange();
    if (!range || range.collapsed) return;

    const removed = removeFontInRange(range);
    if (removed) {
      emitChange();
      attachTickerBlinkRaf(el);
      saveSelection();
      refreshActiveEffects();
    }
  }

  function toggleBlink() {
    const el = editorRef.current;
    if (!el) return;
    editorRef.current.focus();
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
        saveSelection();
        refreshActiveEffects();
      }
    }
  }

  function clearSelectedFormatting() {
    const el = editorRef.current;
    if (!el) return;
    editorRef.current.focus();
    const range = getWorkingRange();
    if (!range || range.collapsed) return;

    const plainText = range.toString();
    range.deleteContents();
    range.insertNode(document.createTextNode(plainText));

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

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
        className="flex flex-col gap-2 p-2 border-b border-gray-200 bg-gray-50"
        onMouseDown={saveSelection}
      >
        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onMouseDown={preventToolbarFocusLoss}
            onClick={() => runSimple('bold')}
            className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.bold)}`}
            title={activeEffects.bold ? 'Remove bold' : 'Apply bold'}
          >
            Bold
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarFocusLoss}
            onClick={() => runSimple('italic')}
            className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.italic)}`}
            title={activeEffects.italic ? 'Remove italic' : 'Apply italic'}
          >
            Italic
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarFocusLoss}
            onClick={() => runSimple('underline')}
            className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.underline)}`}
            title={activeEffects.underline ? 'Remove underline' : 'Apply underline'}
          >
            Underline
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarFocusLoss}
            onClick={handleLinkClick}
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
            Link
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarFocusLoss}
            onClick={toggleBlink}
            className={`px-2 py-1 text-xs border rounded ${activeBtnClass(activeEffects.blink)}`}
            title={activeEffects.blink ? 'Remove blink' : 'Apply blink'}
          >
            {activeEffects.blink ? 'Unblink' : 'Blink'}
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarFocusLoss}
            onClick={clearSelectedFormatting}
            className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
            title="Clear all formatting from selection"
          >
            Clear
          </button>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex flex-wrap gap-1.5">
            {TICKER_COLORS.map((color) => {
              const isActive = normalizeColor(selectionColor) === normalizeColor(color.value);
              const isLight =
                normalizeColor(color.value) === '#ffffff' ||
                normalizeColor(color.value) === '#fcd64c';
              return (
                <button
                  key={color.value}
                  type="button"
                  onMouseDown={preventToolbarFocusLoss}
                  onClick={() => handleApplyColor(color.value)}
                  disabled={!hasTextSelection}
                  className={`relative h-7 w-7 rounded-full border-2 transition-transform ${
                    !hasTextSelection ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
                  } ${isActive ? 'border-[#1e3a8a] ring-2 ring-[#1e3a8a]/30' : 'border-gray-400'}`}
                  style={{
                    backgroundColor: color.value,
                    boxShadow: isLight ? 'inset 0 0 0 1px rgba(0,0,0,0.2)' : undefined,
                  }}
                  title={color.label}
                  aria-label={color.label}
                >
                  {normalizeColor(color.value) === '#ffffff' ? (
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-gray-500">
                      W
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          {activeEffects.color && selectionColor ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-600">
              Selected
              <span
                className="inline-block h-3.5 w-3.5 rounded-full border border-gray-400"
                style={{ backgroundColor: selectionColor }}
                title={selectionColor}
              />
              <span className="font-mono text-[10px]">{normalizeColor(selectionColor)}</span>
            </span>
          ) : null}
          <button
            type="button"
            onMouseDown={preventToolbarFocusLoss}
            onClick={handleRemoveColor}
            disabled={!hasTextSelection || !activeEffects.color}
            className={`px-2 py-1 text-xs border rounded ${
              !hasTextSelection || !activeEffects.color
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-red-50 text-red-700 border-red-200'
            }`}
            title="Remove color from highlighted text"
          >
            Remove Color
          </button>
          <div className="ms-auto flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 text-[11px]">
            <button
              type="button"
              onMouseDown={preventToolbarFocusLoss}
              onClick={() => setDarkCanvas(true)}
              className={`rounded-md px-2 py-1 ${
                darkCanvas ? 'bg-[#1e3a8a] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Dark canvas — easier to see white/yellow text"
            >
              Dark canvas
            </button>
            <button
              type="button"
              onMouseDown={preventToolbarFocusLoss}
              onClick={() => setDarkCanvas(false)}
              className={`rounded-md px-2 py-1 ${
                !darkCanvas ? 'bg-[#1e3a8a] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Light canvas — easier to see black text"
            >
              Light canvas
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-gray-600">Font</span>
          <select
            value={selectedFont}
            onMouseDown={preventToolbarFocusLoss}
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
            onMouseDown={preventToolbarFocusLoss}
            onClick={() => applyFontFamily(selectedFont)}
            disabled={!hasTextSelection}
            className={`px-2 py-1 text-xs border rounded ${
              !hasTextSelection ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            title="Apply font to selected text"
          >
            Apply Font
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarFocusLoss}
            onClick={handleRemoveFont}
            disabled={!hasTextSelection}
            className={`px-2 py-1 text-xs border rounded ${
              !hasTextSelection ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            title="Remove custom font from selected text"
          >
            Remove Font
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        dir={dir}
        className={`ticker-editor min-h-[100px] p-3 text-sm focus:outline-none ${
          darkCanvas ? 'ticker-editor--dark' : 'ticker-editor--light'
        }`}
        onInput={emitChange}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ticker-editor {
          line-height: 1.6;
        }
        .ticker-editor--dark {
          background-color: #2e3b78;
          color: #ffffff;
        }
        .ticker-editor--light {
          background-color: #ffffff;
          color: #111827;
        }
        .ticker-editor a span[style*="color"],
        .ticker-editor .ticker-link span[style*="color"] {
          text-decoration: inherit;
        }
        .ticker-editor--dark a:not(:has(span[style*="color"])) {
          color: #fcd64c;
          cursor: pointer;
        }
        .ticker-editor--dark a:hover:not(:has(span[style*="color"])) {
          color: #ffffff;
        }
        .ticker-editor--light a:not(:has(span[style*="color"])) {
          color: #2563eb;
          cursor: pointer;
        }
        .ticker-editor--light a:hover:not(:has(span[style*="color"])) {
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
