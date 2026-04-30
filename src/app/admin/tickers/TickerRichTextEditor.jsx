'use client';

import { useRef, useState } from 'react';

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
  const [selectedColor, setSelectedColor] = useState('#fcd64c');

  function runSimple(command) {
    document.execCommand(command, false);
    onChange(editorRef.current?.innerHTML || '');
  }

  function applyTextColor(color) {
    const el = editorRef.current;
    if (!el) return;
    const ok = wrapSelectionWithNode(el, () => {
      const span = document.createElement('span');
      span.style.color = color;
      return span;
    });
    if (ok) onChange(el.innerHTML || '');
  }

  function applyBlink() {
    const el = editorRef.current;
    if (!el) return;
    const ok = wrapSelectionWithNode(el, () => {
      const span = document.createElement('span');
      span.className = 'ticker-blink';
      return span;
    });
    if (ok) onChange(el.innerHTML || '');
  }

  function clearSelectedFormatting() {
    const el = editorRef.current;
    if (!el) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;
    if (!el.contains(range.commonAncestorContainer)) return;

    // Replace selected content with plain text to remove all styling/effects.
    const selectedText = range.toString();
    range.deleteContents();
    range.insertNode(document.createTextNode(selectedText));
    selection.removeAllRanges();
    onChange(el.innerHTML || '');
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={() => runSimple('bold')} className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
          Bold
        </button>
        <button type="button" onClick={() => runSimple('italic')} className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
          Italic
        </button>
        <button type="button" onClick={() => runSimple('underline')} className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
          Underline
        </button>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="px-2 py-1 text-xs border rounded bg-white"
          title="Choose text color"
        >
          <option value="#fcd64c">Yellow</option>
          <option value="#ffffff">White</option>
          <option value="#ff4d4f">Red</option>
          <option value="#52c41a">Green</option>
          <option value="#40a9ff">Blue</option>
          <option value="#fa8c16">Orange</option>
          <option value="#a855f7">Purple</option>
          <option value="#000000">Black</option>
        </select>
        <button type="button" onClick={() => applyTextColor(selectedColor)} className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
          Apply Color
        </button>
        <button type="button" onClick={applyBlink} className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
          Blink
        </button>
        <button type="button" onClick={clearSelectedFormatting} className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
          Clear
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        dir={dir}
        className="min-h-[100px] p-3 text-sm focus:outline-none"
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />
    </div>
  );
}
