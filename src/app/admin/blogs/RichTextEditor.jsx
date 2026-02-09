'use client';

import { useRef, useEffect } from 'react';

const TEXT_SIZES = [
  { label: 'Small', value: '2' },
  { label: 'Normal', value: '3' },
  { label: 'Large', value: '4' },
  { label: 'Extra large', value: '5' },
];

const COLORS = [
  '#000000', '#1e3a8a', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', '#0d9488', '#4f46e5',
];

export default function RichTextEditor({ value = '', onChange, placeholder, dir, className = '' }) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastEmittedRef = useRef(null);
  const savedRangeRef = useRef(null);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (value !== lastEmittedRef.current && el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
  }, [value]);

  function emitChange() {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastEmittedRef.current = html;
      onChange(html);
    }
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

  function exec(cmd, valueArg = null) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, valueArg);
    emitChange();
  }

  function applyTextSize(sizeValue) {
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand('fontSize', false, sizeValue);
    emitChange();
  }

  function handleImageFile(e) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      exec('insertImage', reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1e3a8a] focus-within:border-[#1e3a8a] ${className}`}>
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 border-b border-gray-300"
        onMouseDown={saveSelection}
      >
        <button
          type="button"
          onClick={() => exec('bold')}
          className="p-2 rounded hover:bg-gray-200 font-bold text-gray-700"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => exec('italic')}
          className="p-2 rounded hover:bg-gray-200 italic text-gray-700"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => exec('underline')}
          className="p-2 rounded hover:bg-gray-200 text-gray-700 underline"
          title="Underline"
        >
          U
        </button>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <span className="text-xs text-gray-500 mr-1">Color:</span>
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => exec('foreColor', color)}
            className="w-6 h-6 rounded border border-gray-300 hover:ring-2 hover:ring-[#1e3a8a]"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <span className="text-xs text-gray-500 mr-1">Size:</span>
        <select
          onChange={(e) => { const v = e.target.value; if (v) applyTextSize(v); e.target.value = ''; }}
          className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-700"
          title="Text size (select text first)"
        >
          <option value="">Text size</option>
          {TEXT_SIZES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageFile}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded hover:bg-gray-200 text-gray-700 flex items-center gap-1"
          title="Insert image"
        >
          🖼️ Image
        </button>
      </div>
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        dir={dir}
        className="rich-editor-placeholder min-h-[200px] p-4 text-gray-800 prose prose-sm max-w-none focus:outline-none"
        data-placeholder={placeholder}
        onInput={emitChange}
        onBlur={emitChange}
        suppressContentEditableWarning
        style={{ outline: 'none' }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .rich-editor-placeholder[contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
        .rich-editor-placeholder font[size="2"] { font-size: 0.875rem; }
        .rich-editor-placeholder font[size="3"] { font-size: 1rem; }
        .rich-editor-placeholder font[size="4"] { font-size: 1.125rem; }
        .rich-editor-placeholder font[size="5"] { font-size: 1.35rem; }
      `}} />
    </div>
  );
}
