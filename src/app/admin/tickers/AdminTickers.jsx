'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useTickerBlinkSubtree } from '../../../lib/tickerBlinkRaf';
import { getTickerPageGroups } from '../../../lib/tickerPages';
import {
  TICKER_BAR_EFFECTS,
  TICKER_BAR_PRESETS,
  TICKER_SEPARATORS,
  TICKER_SPEED_MAX,
  TICKER_SPEED_MIN,
  barEffectClass,
  clampSpeed,
  contrastTextColor,
  fontScaleClass,
  hexToRgbArray,
  normalizeHexColor,
  normalizeTickerStyle,
} from '../../../lib/tickerStyle';
import TickerRichTextEditor from './TickerRichTextEditor';

function sanitizePreviewHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

function LivePreview({ draft, lang }) {
  const previewRootRef = useRef(null);
  const style = normalizeTickerStyle(draft, draft.pageId);
  const html =
    lang === 'ar'
      ? draft.textAr?.trim() || draft.textEn?.trim() || 'Ticker preview'
      : draft.textEn?.trim() || 'Ticker preview';
  const gradientRgb = hexToRgbArray(style.barColor);
  useTickerBlinkSubtree(previewRootRef, html);

  return (
    <div
      ref={previewRootRef}
      className={`w-full rounded-lg py-2.5 ${barEffectClass(style.barEffect)}`}
      style={{ backgroundColor: style.barColor, color: style.textColor }}
      dir="ltr"
    >
      <div className="ticker-bar-content rounded-lg">
        <Marquee
          key={`preview-${style.speed}-${style.barColor}-${style.textColor}-${style.barEffect}-${lang}`}
          speed={style.speed}
          gradient={style.showGradient}
          gradientColor={gradientRgb}
          gradientWidth={40}
          pauseOnHover={style.pauseOnHover}
          direction={lang === 'ar' ? 'right' : 'left'}
          autoFill
        >
          <span
            className={`mx-5 inline-flex items-center whitespace-nowrap ${fontScaleClass(style.fontScale)} ${
              style.uppercase ? 'uppercase tracking-wide' : ''
            }`}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            style={{ color: style.textColor }}
          >
            {style.emojiPrefix ? <span className="me-2">{style.emojiPrefix}</span> : null}
            <span
              className="ticker-content"
              style={{ color: style.textColor }}
              dangerouslySetInnerHTML={{ __html: sanitizePreviewHtml(html) }}
            />
            <span className="mx-4 opacity-60" aria-hidden>
              {style.separator || '•'}
            </span>
          </span>
        </Marquee>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange, presets, hint }) {
  const hex = normalizeHexColor(value);
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="color"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded border border-gray-200 bg-white p-0.5"
          aria-label={label}
        />
        <input
          type="text"
          defaultValue={hex}
          key={hex}
          onBlur={(e) => onChange(normalizeHexColor(e.target.value, hex))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
          className="w-28 rounded-lg border border-gray-300 px-2 py-1.5 font-mono text-xs"
          maxLength={7}
        />
        {presets?.map((p) => (
          <button
            key={p.value}
            type="button"
            title={p.label}
            onClick={() => onChange(p.value)}
            className={`h-7 w-7 rounded-full border-2 transition ${
              hex === normalizeHexColor(p.value)
                ? 'border-gray-800 scale-110'
                : 'border-white shadow ring-1 ring-gray-200'
            }`}
            style={{ backgroundColor: p.value }}
          />
        ))}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

function Toggle({ label, checked, onChange, hint }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1e3a8a]"
      />
      <span>
        <span className="block text-sm font-medium text-gray-800">{label}</span>
        {hint ? <span className="mt-0.5 block text-xs text-gray-500">{hint}</span> : null}
      </span>
    </label>
  );
}

function EditorSheet({ draft, onChange, onClose, onSave, saving, error }) {
  const [previewLang, setPreviewLang] = useState('en');

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  function setField(field, value) {
    onChange((prev) => ({ ...prev, [field]: value }));
  }

  function setBarColor(color) {
    const barColor = normalizeHexColor(color);
    onChange((prev) => {
      const next = { ...prev, barColor };
      const prevContrast = contrastTextColor(prev.barColor);
      const currentText = normalizeHexColor(prev.textColor, prevContrast);
      // Only auto-flip text when it still matches the previous auto-contrast color
      if (currentText === normalizeHexColor(prevContrast)) {
        next.textColor = contrastTextColor(barColor);
      }
      return next;
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        aria-label="Close editor"
        onClick={onClose}
      />
      <aside
        className="relative flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl animate-in slide-in-from-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticker-editor-title"
      >
        <header className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              {draft.pageGroup || draft.path}
            </p>
            <h2 id="ticker-editor-title" className="text-lg font-semibold text-gray-900">
              {draft.label}
            </h2>
            <p className="mt-0.5 font-mono text-xs text-gray-400">{draft.path}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Close
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          {/* Live preview */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Live preview</h3>
              <div className="flex rounded-lg border border-gray-200 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewLang('en')}
                  className={`rounded-md px-2.5 py-1 ${
                    previewLang === 'en' ? 'bg-[#1e3a8a] text-white' : 'text-gray-600'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewLang('ar')}
                  className={`rounded-md px-2.5 py-1 ${
                    previewLang === 'ar' ? 'bg-[#1e3a8a] text-white' : 'text-gray-600'
                  }`}
                >
                  AR
                </button>
              </div>
            </div>
            <LivePreview draft={draft} lang={previewLang} />
          </section>

          {/* Content */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">Ticker content</h3>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">English</label>
              <TickerRichTextEditor
                value={draft.textEn || ''}
                onChange={(val) => setField('textEn', val)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Arabic</label>
              <TickerRichTextEditor
                value={draft.textAr || ''}
                onChange={(val) => setField('textAr', val)}
                dir="rtl"
              />
            </div>
            <p className="text-xs text-gray-500">
              Select text to apply bold, underline, color, blink, or links. Use blink sparingly for
              urgency words.
            </p>
          </section>

          {/* Bar appearance */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">Bar appearance</h3>
            <ColorField
              label="Bar color"
              value={draft.barColor}
              onChange={setBarColor}
              presets={TICKER_BAR_PRESETS}
            />
            <ColorField
              label="Text color"
              value={draft.textColor}
              onChange={(c) => setField('textColor', normalizeHexColor(c))}
              hint="Default color for ticker text and links. Colors you apply to selected words in the content editor override this."
              presets={[
                { label: 'White', value: '#FFFFFF' },
                { label: 'Black', value: '#000000' },
                { label: 'Navy', value: '#2E3B78' },
                { label: 'Gold', value: '#FCD64C' },
              ]}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Scroll speed ({draft.speed})
              </label>
              <input
                type="range"
                min={TICKER_SPEED_MIN}
                max={TICKER_SPEED_MAX}
                value={clampSpeed(draft.speed)}
                onChange={(e) => setField('speed', Number(e.target.value))}
                className="w-full accent-[#1e3a8a]"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Separator</label>
                <select
                  value={draft.separator || '•'}
                  onChange={(e) => setField('separator', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  {TICKER_SEPARATORS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Text size</label>
                <select
                  value={draft.fontScale || 'md'}
                  onChange={(e) => setField('fontScale', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Toggle
                label="Edge fade (gradient)"
                checked={Boolean(draft.showGradient)}
                onChange={(v) => setField('showGradient', v)}
                hint="Soft fade at left/right edges"
              />
              <Toggle
                label="Pause on hover"
                checked={Boolean(draft.pauseOnHover)}
                onChange={(v) => setField('pauseOnHover', v)}
                hint="Lets visitors read the message"
              />
            </div>
          </section>

          {/* Attention features */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">Attention &amp; attraction</h3>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Bar effect</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TICKER_BAR_EFFECTS.map((effect) => (
                  <button
                    key={effect.id}
                    type="button"
                    onClick={() => setField('barEffect', effect.id)}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      draft.barEffect === effect.id
                        ? 'border-[#1e3a8a] bg-[#1e3a8a]/5 font-medium text-[#1e3a8a]'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {effect.label}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-gray-500">
                Pulse / glow / shine draw the eye to the bar without changing the copy.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Emoji prefix (optional)
              </label>
              <input
                type="text"
                value={draft.emojiPrefix || ''}
                onChange={(e) => setField('emojiPrefix', e.target.value.slice(0, 8))}
                placeholder="e.g. 🔥 or ⚡"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                maxLength={8}
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['🔥', '⚡', '✨', '🎉', '📢', '🚀', '💎', '⭐'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setField('emojiPrefix', emoji)}
                    className="rounded-md border border-gray-200 px-2 py-1 text-base hover:bg-gray-50"
                  >
                    {emoji}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setField('emojiPrefix', '')}
                  className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>

            <Toggle
              label="UPPERCASE text"
              checked={Boolean(draft.uppercase)}
              onChange={(v) => setField('uppercase', v)}
              hint="Makes the whole ticker shout louder"
            />
          </section>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-gray-200 bg-white px-5 py-4">
          {error ? <p className="text-sm text-red-600">{error}</p> : <span />}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e3a8a]/90 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save ticker'}
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}

export default function AdminTickers() {
  const groups = useMemo(() => getTickerPageGroups(), []);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(groups[0]?.group || '');
  const [selectedPageId, setSelectedPageId] = useState('');
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/tickers', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load');
        return r.json();
      })
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch(() => setError('Failed to load tickers'))
      .finally(() => setLoading(false));
  }, []);

  const activeGroup = groups.find((g) => g.group === selectedGroup) || groups[0];
  const groupTickers = activeGroup?.tickers || [];

  useEffect(() => {
    if (!groupTickers.length) {
      setSelectedPageId('');
      return;
    }
    if (!groupTickers.some((t) => t.id === selectedPageId)) {
      setSelectedPageId(groupTickers[0].id);
    }
  }, [selectedGroup, groupTickers, selectedPageId]);

  const selectedItem = list.find((item) => item.pageId === selectedPageId);

  function openEditor() {
    if (!selectedItem) return;
    setError('');
    setDraft({ ...selectedItem });
  }

  async function saveDraft() {
    if (!draft) return;
    setSaving(true);
    setError('');
    try {
      const style = normalizeTickerStyle(draft, draft.pageId);
      const res = await fetch('/api/admin/tickers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: draft.pageId,
          textEn: draft.textEn || '',
          textAr: draft.textAr || '',
          ...style,
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      setList((prev) =>
        prev.map((item) =>
          item.pageId === draft.pageId ? { ...item, ...draft, ...style } : item
        )
      );
      setDraft(null);
    } catch {
      setError('Failed to save ticker');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading…</p>;
  if (error && list.length === 0) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      {error && !draft ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">1. Select page</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
            >
              {groups.map((g) => (
                <option key={g.group} value={g.group}>
                  {g.group} ({g.path})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              2. Select ticker
              {groupTickers.length > 1 ? (
                <span className="ms-1 font-normal text-gray-400">
                  ({groupTickers.length} on this page)
                </span>
              ) : null}
            </label>
            <select
              value={selectedPageId}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              disabled={!groupTickers.length}
            >
              {groupTickers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedItem ? (
          <div className="mt-5 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-gray-800">{selectedItem.label}</p>
                <p className="text-xs text-gray-500">
                  Bar {selectedItem.barColor} · Speed {selectedItem.speed} · Effect{' '}
                  {selectedItem.barEffect || 'none'}
                </p>
              </div>
              <button
                type="button"
                onClick={openEditor}
                className="rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e3a8a]/90"
              >
                Open editor
              </button>
            </div>
            <div
              className="overflow-hidden rounded-md py-2 text-sm"
              style={{
                backgroundColor: selectedItem.barColor,
                color: selectedItem.textColor,
              }}
            >
              <p
                className="truncate px-3"
                dangerouslySetInnerHTML={{
                  __html: sanitizePreviewHtml(
                    selectedItem.textEn?.slice(0, 180) || 'Empty ticker'
                  ),
                }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-500">
        Tip: pages with multiple tickers (Learn Ecommerce, Dropshipping) show both in step 2. The
        editor sheet has live preview, bar colors, speed, separators, and attention effects.
      </div>

      {draft ? (
        <EditorSheet
          draft={draft}
          onChange={setDraft}
          onClose={() => {
            setDraft(null);
            setError('');
          }}
          onSave={saveDraft}
          saving={saving}
          error={error}
        />
      ) : null}
    </div>
  );
}
