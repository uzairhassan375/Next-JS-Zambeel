'use client';

import { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { FONT_FAMILIES } from '../../../lib/editorFonts';

const TEXT_SIZES = [
  { label: 'Small', value: '2' },
  { label: 'Normal', value: '3' },
  { label: 'Large', value: '4' },
  { label: 'Extra large', value: '5' },
];

const TEXT_COLORS = [
  { label: 'Black', value: '#000000' },
  { label: 'Navy', value: '#1e3a8a' },
  { label: 'Red', value: '#dc2626' },
  { label: 'Green', value: '#16a34a' },
  { label: 'Gold', value: '#ca8a04' },
  { label: 'Purple', value: '#9333ea' },
  { label: 'Teal', value: '#0d9488' },
  { label: 'Indigo', value: '#4f46e5' },
];

export default function RichTextEditor({ value = '', onChange, placeholder, dir, className = '' }) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastEmittedRef = useRef(null);
  const savedRangeRef = useRef(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageUrlDialog, setShowImageUrlDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hasTextSelection, setHasTextSelection] = useState(false);
  const [showAlignDropdown, setShowAlignDropdown] = useState(false);
  const [currentAlign, setCurrentAlign] = useState('justifyLeft');
  const [isImageSelected, setIsImageSelected] = useState(false);
  const selectedImageRef = useRef(null);
  const alignDropdownRef = useRef(null);
  const toolbarRef = useRef(null);
  const linkDialogRef = useRef(null);
  const imageUrlDialogRef = useRef(null);
  const deselectImageRef = useRef(null);

  const deselectImage = useCallback(() => {
    const selectedImage = selectedImageRef.current;
    if (selectedImage) {
      selectedImage.style.outline = '';
      selectedImage.style.outlineOffset = '';
      selectedImage.style.cursor = '';
      selectedImage.removeAttribute('data-selected');
      selectedImageRef.current = null;
      setIsImageSelected(false);
    }
    // Also deselect any other selected images
    if (editorRef.current) {
      const allImages = editorRef.current.querySelectorAll('img[data-selected]');
      allImages.forEach(img => {
        img.style.outline = '';
        img.style.outlineOffset = '';
        img.style.cursor = '';
        img.removeAttribute('data-selected');
      });
    }
  }, []);

  // Store the function in a ref so it can be accessed in effects without being in dependency arrays
  useLayoutEffect(() => {
    deselectImageRef.current = deselectImage;
  }, [deselectImage]);

  const selectImage = useCallback((img) => {
    if (!img || !editorRef.current?.contains(img)) return;
    // Deselect previous image
    deselectImage();
    selectedImageRef.current = img;
    setIsImageSelected(true);
    // Add visual indicator
    img.style.outline = '2px solid #1e3a8a';
    img.style.outlineOffset = '2px';
    img.style.cursor = 'move';
    img.setAttribute('data-selected', 'true');
    
    // Detect current alignment of the image
    const wrapper = img.parentElement;
    if (wrapper && wrapper.tagName === 'DIV' && wrapper.style.textAlign) {
      const align = wrapper.style.textAlign;
      if (align === 'left') setCurrentAlign('justifyLeft');
      else if (align === 'center') setCurrentAlign('justifyCenter');
      else if (align === 'right') setCurrentAlign('justifyRight');
    } else {
      setCurrentAlign('justifyLeft'); // Default
    }
  }, [deselectImage]);

  // Fetch blog slugs for internal linking

  // Close alignment dropdown, link dialog, and deselect images when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Don't do anything if clicking on toolbar, dropdown, or link dialog
      if (toolbarRef.current?.contains(event.target) || 
          alignDropdownRef.current?.contains(event.target) ||
          linkDialogRef.current?.contains(event.target) ||
          imageUrlDialogRef.current?.contains(event.target)) {
        return;
      }
      
      if (showAlignDropdown && alignDropdownRef.current && !alignDropdownRef.current.contains(event.target)) {
        setShowAlignDropdown(false);
      }
      
      if (showLinkDialog && linkDialogRef.current && !linkDialogRef.current.contains(event.target)) {
        setShowLinkDialog(false);
      }

      if (showImageUrlDialog && imageUrlDialogRef.current && !imageUrlDialogRef.current.contains(event.target)) {
        setShowImageUrlDialog(false);
      }
      
      // Deselect image if clicking outside editor (but not on toolbar)
      if (selectedImageRef.current && editorRef.current && !editorRef.current.contains(event.target) && !toolbarRef.current?.contains(event.target)) {
        deselectImageRef.current?.();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAlignDropdown, showLinkDialog, showImageUrlDialog, isImageSelected]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (value !== lastEmittedRef.current && el.innerHTML !== value) {
      el.innerHTML = value || '';
      // Deselect any selected image when content is reset
      setTimeout(() => {
        deselectImageRef.current?.();
      }, 0);
      
      // Add click handlers to existing images
      setTimeout(() => {
        const images = el.querySelectorAll('img');
        images.forEach(img => {
          img.style.cursor = 'pointer';
          // Remove existing handlers to avoid duplicates
          img.onclick = null;
          img.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            selectImage(img);
          }, true);
        });
      }, 100);
    }
  }, [value, selectImage]);

  // Track text selection to enable/disable link button
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const checkSelection = () => {
      const sel = document.getSelection();
      if (sel.rangeCount > 0 && el.contains(sel.anchorNode)) {
        const range = sel.getRangeAt(0);
        const selectedText = range.toString().trim();
        // Check if clicking on a link or if text is selected
        let isOnLink = false;
        if (range.commonAncestorContainer.nodeType === 3) {
          isOnLink = range.commonAncestorContainer.parentElement?.tagName === 'A' ||
                     range.commonAncestorContainer.parentElement?.closest('a') !== null;
        } else {
          isOnLink = range.commonAncestorContainer.tagName === 'A' ||
                     range.commonAncestorContainer.closest('a') !== null;
        }
        setHasTextSelection(selectedText.length > 0 || isOnLink);
      } else {
        setHasTextSelection(false);
      }
    };

    const handleClick = (e) => {
      // Small delay to let selection update
      setTimeout(checkSelection, 10);
    };

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

  function emitChange() {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastEmittedRef.current = html;
      onChange(html);
      // Check if selected image still exists
      if (selectedImageRef.current && !editorRef.current.contains(selectedImageRef.current)) {
        deselectImage();
      }
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
    
    // If an image is selected and applying alignment, wrap it in a div with alignment
    const selectedImage = selectedImageRef.current;
    if (selectedImage && editorRef.current?.contains(selectedImage) && (cmd === 'justifyLeft' || cmd === 'justifyCenter' || cmd === 'justifyRight')) {
      const align = cmd === 'justifyLeft' ? 'left' : cmd === 'justifyCenter' ? 'center' : 'right';
      
      // Check if image is already wrapped in a div with alignment
      let wrapper = selectedImage.parentElement;
      if (wrapper && wrapper.tagName === 'DIV' && (wrapper.style.textAlign || wrapper.getAttribute('data-align'))) {
        wrapper.style.textAlign = align;
        wrapper.setAttribute('data-align', align);
        // Update current align state
        setCurrentAlign(cmd);
      } else {
        // Wrap image in a div with alignment
        wrapper = document.createElement('div');
        wrapper.style.textAlign = align;
        wrapper.style.display = 'block';
        wrapper.style.width = '100%';
        wrapper.setAttribute('data-align', align);
        selectedImage.parentNode.insertBefore(wrapper, selectedImage);
        wrapper.appendChild(selectedImage);
        // Update current align state
        setCurrentAlign(cmd);
        // Reselect the image after wrapping
        setTimeout(() => {
          if (selectedImageRef.current && editorRef.current?.contains(selectedImageRef.current)) {
            selectImage(selectedImageRef.current);
          }
        }, 10);
      }
      emitChange();
      return;
    }
    
    document.execCommand(cmd, false, valueArg);
    emitChange();
  }

  function applyTextSize(sizeValue) {
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand('fontSize', false, sizeValue);
    emitChange();
  }

  function applyFontFamily(fontFamily) {
    const el = editorRef.current;
    if (!el || !fontFamily) return;
    restoreSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed || !el.contains(range.commonAncestorContainer)) return;

    const span = document.createElement('span');
    span.style.fontFamily = fontFamily;
    try {
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      selection.removeAllRanges();
      emitChange();
    } catch {
      // ignore invalid selections
    }
  }

  function insertImageAtCursor(src) {
    if (!src) return;
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand('insertImage', false, src);
    emitChange();
    setTimeout(() => {
      const images = editorRef.current?.querySelectorAll('img');
      if (images && images.length > 0) {
        const lastImg = images[images.length - 1];
        lastImg.style.cursor = 'pointer';
        lastImg.style.maxWidth = '100%';
        lastImg.style.height = 'auto';
        lastImg.onclick = null;
        lastImg.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          selectImage(lastImg);
        }, true);
        selectImage(lastImg);
      }
    }, 100);
  }

  function handleImageFile(e) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => insertImageAtCursor(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function handleImageUrlClick() {
    saveSelection();
    const selectedImage = selectedImageRef.current;
    if (selectedImage?.src) {
      setImageUrl(selectedImage.getAttribute('src') || selectedImage.src || '');
    } else {
      setImageUrl('');
    }
    setShowImageUrlDialog(true);
  }

  function insertImageFromUrl() {
    let url = imageUrl.trim();
    if (!url) {
      alert('Please enter an image URL');
      return;
    }
    if (
      !url.startsWith('http://') &&
      !url.startsWith('https://') &&
      !url.startsWith('data:') &&
      !url.startsWith('/')
    ) {
      url = `https://${url}`;
    }

    const selectedImage = selectedImageRef.current;
    if (selectedImage && editorRef.current?.contains(selectedImage)) {
      selectedImage.src = url;
      selectedImage.style.maxWidth = '100%';
      selectedImage.style.height = 'auto';
      emitChange();
      selectImage(selectedImage);
    } else {
      insertImageAtCursor(url);
    }

    setShowImageUrlDialog(false);
    setImageUrl('');
  }


  function resizeImage(delta) {
    const selectedImage = selectedImageRef.current;
    if (!selectedImage || !editorRef.current?.contains(selectedImage)) {
      selectedImageRef.current = null;
      setIsImageSelected(false);
      return;
    }
    // Get current width from style or natural width
    let currentWidth = 300;
    if (selectedImage.style.width) {
      const parsed = parseInt(selectedImage.style.width);
      if (!isNaN(parsed)) {
        currentWidth = parsed;
      } else {
        currentWidth = selectedImage.offsetWidth || selectedImage.naturalWidth || 300;
      }
    } else if (selectedImage.hasAttribute('width')) {
      currentWidth = parseInt(selectedImage.getAttribute('width')) || selectedImage.offsetWidth || 300;
    } else {
      currentWidth = selectedImage.offsetWidth || selectedImage.naturalWidth || 300;
    }
    
    const newWidth = Math.max(50, Math.min(1200, currentWidth + delta));
    selectedImage.style.width = `${newWidth}px`;
    selectedImage.style.height = 'auto';
    selectedImage.removeAttribute('width');
    selectedImage.removeAttribute('height');
    // Keep the image selected
    selectImage(selectedImage);
    emitChange();
  }

  function handleImageClick(e) {
    // Don't deselect if clicking on toolbar or dropdown
    if (toolbarRef.current?.contains(e.target) || alignDropdownRef.current?.contains(e.target)) {
      return;
    }
    
    // Check if click is on an image or inside an image wrapper
    let img = null;
    if (e.target.tagName === 'IMG') {
      img = e.target;
    } else {
      // Check if clicked element is inside an img or has an img child
      const clickedImg = e.target.closest('img');
      if (clickedImg) {
        img = clickedImg;
      }
    }
    
    if (img && editorRef.current?.contains(img)) {
      e.stopPropagation();
      e.preventDefault();
      selectImage(img);
    } else {
      // Only deselect if clicking on non-image content and not on toolbar
      const clickedElement = e.target;
      if (clickedElement.tagName !== 'IMG' && 
          !clickedElement.closest('img') && 
          !clickedElement.closest('button') &&
          !clickedElement.closest('.toolbar-container')) {
        deselectImage();
      }
    }
  }

  function handleLinkClick() {
    if (!hasTextSelection) return; // Don't open dialog if no text selected
    
    restoreSelection();
    const sel = document.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const selectedText = range.toString();
      
      // Check if clicking on an existing link
      let anchor = null;
      if (range.commonAncestorContainer.nodeType === 3) {
        // Text node - check parent
        anchor = range.commonAncestorContainer.parentElement;
      } else {
        anchor = range.commonAncestorContainer;
      }
      
      // Check if we're inside a link
      if (anchor?.tagName === 'A' || anchor?.closest('a')) {
        const linkElement = anchor.tagName === 'A' ? anchor : anchor.closest('a');
        setLinkUrl(linkElement.href || linkElement.getAttribute('href') || '');
        setLinkTitle(linkElement.title || '');
        setLinkText(linkElement.textContent || selectedText || '');
      } else if (selectedText.trim()) {
        // Text is selected but not a link
        setLinkText(selectedText);
        setLinkUrl('');
        setLinkTitle('');
      } else {
        // No text selected
        setLinkUrl('');
        setLinkText('');
        setLinkTitle('');
      }
    } else {
      setLinkUrl('');
      setLinkText('');
      setLinkTitle('');
    }
    setShowLinkDialog(true);
  }

  function insertLink() {
    let url = linkUrl.trim();
    if (!url) {
      alert('Please enter a URL');
      return;
    }
    
    // Ensure external URLs start with http:// or https://
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
      url = 'http://' + url;
    }
    
    restoreSelection();
    editorRef.current?.focus();
    
    const sel = document.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const selectedText = range.toString().trim();
      
      // Check if we're updating an existing link
      let existingLink = null;
      if (range.commonAncestorContainer.nodeType === 3) {
        existingLink = range.commonAncestorContainer.parentElement;
      } else {
        existingLink = range.commonAncestorContainer;
      }
      
      if (existingLink?.tagName === 'A' || existingLink?.closest('a')) {
        // Update existing link
        const linkElement = existingLink.tagName === 'A' ? existingLink : existingLink.closest('a');
        linkElement.href = url;
        if (linkTitle.trim()) {
          linkElement.title = linkTitle.trim();
        } else {
          linkElement.removeAttribute('title');
        }
      } else if (selectedText) {
        // If text is selected, create link with that text (don't show URL)
        document.execCommand('createLink', false, url);
        
        // Find the created link and add title
        setTimeout(() => {
          const links = editorRef.current?.querySelectorAll('a');
          if (links) {
            Array.from(links).reverse().some((link) => {
              if (link.textContent.trim() === selectedText && 
                  (link.href === url || link.getAttribute('href') === url)) {
                if (linkTitle.trim()) {
                  link.title = linkTitle.trim();
                }
                return true;
              }
              return false;
            });
          }
          emitChange();
        }, 10);
      } else {
        // If no text selected, insert link with the link text or URL
        const linkTextToUse = linkText.trim() || url;
        const link = document.createElement('a');
        link.href = url;
        if (linkTitle.trim()) {
          link.title = linkTitle.trim();
        }
        link.textContent = linkTextToUse;
        range.insertNode(link);
        emitChange();
      }
    }
    
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
    setLinkTitle('');
  }

  function removeLink() {
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand('unlink', false);
    emitChange();
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
    setLinkTitle('');
  }

  return (
    <div className={`relative border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1e3a8a] focus-within:border-[#1e3a8a] ${className}`}>
      {/* Toolbar */}
      <div
        ref={toolbarRef}
        className="toolbar-container flex flex-wrap items-center gap-1 p-2 bg-gray-100 border-b border-gray-300"
        onMouseDown={(e) => {
          // Prevent image deselection when clicking toolbar
          e.stopPropagation();
          saveSelection(e);
        }}
        onClick={(e) => {
          // Prevent image deselection when clicking toolbar buttons
          e.stopPropagation();
        }}
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
        <select
          defaultValue=""
          onMouseDown={(e) => {
            e.stopPropagation();
            saveSelection();
          }}
          onChange={(e) => {
            const color = e.target.value;
            if (color) {
              restoreSelection();
              exec('foreColor', color);
            }
            e.target.value = '';
          }}
          className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-700 min-w-[110px]"
          title="Text color (select text first)"
        >
          <option value="">Text color</option>
          {TEXT_COLORS.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
        <select
          defaultValue=""
          onMouseDown={(e) => {
            e.stopPropagation();
            saveSelection();
          }}
          onChange={(e) => {
            const fontFamily = e.target.value;
            if (fontFamily) {
              applyFontFamily(fontFamily);
            }
            e.target.value = '';
          }}
          className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-700 min-w-[140px]"
          title="Font family (select text first)"
        >
          <option value="">Font</option>
          {FONT_FAMILIES.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
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
        {/* Text Alignment Dropdown with Icons */}
        <div ref={alignDropdownRef} className="relative inline-block">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowAlignDropdown(!showAlignDropdown);
            }}
            className="p-2 rounded hover:bg-gray-200 text-gray-700 flex items-center gap-1"
            title="Text/Image alignment"
          >
            {currentAlign === 'justifyLeft' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h8" />
              </svg>
            )}
            {currentAlign === 'justifyCenter' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 12h8M4 18h16" />
              </svg>
            )}
            {currentAlign === 'justifyRight' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M12 18h8" />
              </svg>
            )}
            {/* Dropdown arrow icon */}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showAlignDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 py-1 flex flex-col">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedImageRef.current) {
                    // For images, use custom alignment
                    exec('justifyLeft');
                  } else {
                    restoreSelection();
                    exec('justifyLeft');
                  }
                  setCurrentAlign('justifyLeft');
                  setShowAlignDropdown(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 flex items-center justify-center"
                title="Left align"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h8" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedImageRef.current) {
                    exec('justifyCenter');
                  } else {
                    restoreSelection();
                    exec('justifyCenter');
                  }
                  setCurrentAlign('justifyCenter');
                  setShowAlignDropdown(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 flex items-center justify-center"
                title="Center align"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 12h8M4 18h16" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedImageRef.current) {
                    exec('justifyRight');
                  } else {
                    restoreSelection();
                    exec('justifyRight');
                  }
                  setCurrentAlign('justifyRight');
                  setShowAlignDropdown(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 flex items-center justify-center"
                title="Right align"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M12 18h8" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        {/* Link - Icon only */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleLinkClick();
          }}
          disabled={!hasTextSelection}
          className={`p-2 rounded ${
            hasTextSelection 
              ? 'hover:bg-gray-200 text-gray-700' 
              : 'text-gray-400 cursor-not-allowed opacity-50'
          }`}
          title={hasTextSelection ? "Insert link" : "Select text to create a link"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
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
          title="Upload image from computer"
        >
          🖼️ Image
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleImageUrlClick();
          }}
          className="p-2 rounded hover:bg-gray-200 text-gray-700 flex items-center gap-1 text-xs"
          title="Insert image from URL (Shopify Files, etc.)"
        >
          🔗 Image URL
        </button>
        {/* Image resize controls - only show when image is selected */}
        {isImageSelected && (
          <>
            <span className="w-px h-6 bg-gray-300 mx-1" />
            <span className="text-xs text-gray-500 mr-1">Image:</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resizeImage(-20);
              }}
              className="p-2 rounded hover:bg-gray-200 text-gray-700"
              title="Decrease image size"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resizeImage(20);
              }}
              className="p-2 rounded hover:bg-gray-200 text-gray-700"
              title="Increase image size"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const selectedImage = selectedImageRef.current;
                if (selectedImage) {
                  selectedImage.remove();
                  deselectImage();
                  emitChange();
                }
              }}
              className="p-2 rounded hover:bg-red-100 text-red-600"
              title="Delete image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </>
        )}
      </div>
      {/* Editor — scrollable content area; toolbar stays fixed above */}
      <div className="max-h-[min(420px,50vh)] overflow-y-auto">
        <div
          ref={editorRef}
          contentEditable
          dir={dir}
          className="rich-editor-placeholder min-h-[200px] p-4 text-gray-800 prose prose-sm max-w-none focus:outline-none"
          data-placeholder={placeholder}
          onInput={emitChange}
          onBlur={emitChange}
          onClick={handleImageClick}
          onMouseDown={(e) => {
            // Don't interfere with image clicks
            if (e.target.tagName !== 'IMG') {
              saveSelection();
            }
          }}
          suppressContentEditableWarning
          style={{ outline: 'none' }}
        />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .rich-editor-placeholder[contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
        .rich-editor-placeholder font[size="2"] { font-size: 0.875rem; }
        .rich-editor-placeholder font[size="3"] { font-size: 1rem; }
        .rich-editor-placeholder font[size="4"] { font-size: 1.125rem; }
        .rich-editor-placeholder font[size="5"] { font-size: 1.35rem; }
        .rich-editor-placeholder div[style*="text-align: left"] { text-align: left; }
        .rich-editor-placeholder div[style*="text-align: center"] { text-align: center; }
        .rich-editor-placeholder div[style*="text-align: right"] { text-align: right; }
        .rich-editor-placeholder div[style*="text-align: justify"] { text-align: justify; }
        .rich-editor-placeholder p[style*="text-align: left"] { text-align: left; }
        .rich-editor-placeholder p[style*="text-align: center"] { text-align: center; }
        .rich-editor-placeholder p[style*="text-align: right"] { text-align: right; }
        .rich-editor-placeholder p[style*="text-align: justify"] { text-align: justify; }
        .rich-editor-placeholder a {
          color: #2563eb;
          text-decoration: underline;
          cursor: pointer;
        }
        .rich-editor-placeholder a:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }
        .rich-editor-placeholder img {
          max-width: 100%;
          height: auto;
          cursor: pointer;
          display: block;
          margin: 1rem 0;
        }
        .rich-editor-placeholder img:hover {
          opacity: 0.9;
        }
        .rich-editor-placeholder div[style*="text-align: left"] img {
          margin-left: 0;
          margin-right: auto;
        }
        .rich-editor-placeholder div[style*="text-align: center"] img {
          margin-left: auto;
          margin-right: auto;
        }
        .rich-editor-placeholder div[style*="text-align: right"] img {
          margin-left: auto;
          margin-right: 0;
        }
      `}} />
      
      {/* Link Dialog - Centered on screen */}
      {showLinkDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div ref={linkDialogRef} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 min-w-[400px] max-w-[500px] mx-4">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link to
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="http://"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">http:// is required for external links</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link title
              </label>
              <input
                type="text"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="Used for accessibility and SEO"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Used for accessibility and SEO</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl('');
                  setLinkText('');
                  setLinkTitle('');
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

      {showImageUrlDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div
            ref={imageUrlDialogRef}
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 min-w-[400px] max-w-[520px] mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">
              {isImageSelected ? 'Update image URL' : 'Insert image from URL'}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://cdn.shopify.com/s/files/..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste a Shopify Files URL or any public image link. Upload in Shopify Admin → Settings → Files, copy URL, then paste here.
              </p>
            </div>

            {imageUrl.trim() && (
              <div className="mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
                <p className="text-xs text-gray-600 mb-2 font-medium">Preview:</p>
                <img
                  src={imageUrl.trim()}
                  alt="Preview"
                  className="max-h-40 max-w-full rounded object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = 'block';
                  }}
                />
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowImageUrlDialog(false);
                  setImageUrl('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertImageFromUrl}
                className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e3a8a]/90"
              >
                {isImageSelected ? 'Update image' : 'Insert image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
