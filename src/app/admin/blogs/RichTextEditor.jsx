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

const BUTTON_COLORS = [
  { label: 'Navy', value: '#2E3B78' },
  { label: 'Gold', value: '#FCD64C', text: '#2E3B78' },
  { label: 'Green', value: '#16a34a' },
  { label: 'Red', value: '#dc2626' },
  { label: 'Teal', value: '#0d9488' },
  { label: 'Purple', value: '#9333ea' },
  { label: 'Black', value: '#111827' },
  { label: 'Orange', value: '#ea580c' },
];

const BUTTON_ALIGNS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rgbToHex(color) {
  if (!color) return '';
  const trimmed = String(color).trim();
  if (trimmed.startsWith('#')) {
    if (trimmed.length === 4) {
      return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toLowerCase();
    }
    return trimmed.slice(0, 7).toLowerCase();
  }
  const m = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return '';
  return (
    '#' +
    [m[1], m[2], m[3]]
      .map((x) => Number(x).toString(16).padStart(2, '0'))
      .join('')
  );
}

function findBlogCtaButton(target) {
  if (!target || typeof target.closest !== 'function') return null;
  return target.closest('a.blog-cta-btn') || target.closest('.blog-cta-wrap')?.querySelector('a.blog-cta-btn');
}

export default function RichTextEditor({ value = '', onChange, placeholder, dir, className = '' }) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastEmittedRef = useRef(null);
  const savedRangeRef = useRef(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageUrlDialog, setShowImageUrlDialog] = useState(false);
  const [showButtonDialog, setShowButtonDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [buttonName, setButtonName] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [buttonColor, setButtonColor] = useState('#2E3B78');
  const [buttonTextColor, setButtonTextColor] = useState('#ffffff');
  const [buttonShowIcon, setButtonShowIcon] = useState(true);
  const [buttonIconColor, setButtonIconColor] = useState('#FCD64C');
  const [buttonAlign, setButtonAlign] = useState('center');
  const [isEditingButton, setIsEditingButton] = useState(false);
  const [hasTextSelection, setHasTextSelection] = useState(false);
  const [showAlignDropdown, setShowAlignDropdown] = useState(false);
  const [currentAlign, setCurrentAlign] = useState('justifyLeft');
  const [isImageSelected, setIsImageSelected] = useState(false);
  const selectedImageRef = useRef(null);
  const selectedButtonRef = useRef(null);
  const alignDropdownRef = useRef(null);
  const toolbarRef = useRef(null);
  const linkDialogRef = useRef(null);
  const imageUrlDialogRef = useRef(null);
  const buttonDialogRef = useRef(null);
  const deselectImageRef = useRef(null);
  const deselectButtonRef = useRef(null);

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

  const deselectButton = useCallback(() => {
    const selectedButton = selectedButtonRef.current;
    if (selectedButton) {
      selectedButton.style.outline = '';
      selectedButton.style.outlineOffset = '';
      selectedButton.removeAttribute('data-selected');
      selectedButtonRef.current = null;
    }
    if (editorRef.current) {
      editorRef.current.querySelectorAll('a.blog-cta-btn[data-selected]').forEach((btn) => {
        btn.style.outline = '';
        btn.style.outlineOffset = '';
        btn.removeAttribute('data-selected');
      });
    }
    setIsEditingButton(false);
  }, []);

  // Store the function in a ref so it can be accessed in effects without being in dependency arrays
  useLayoutEffect(() => {
    deselectImageRef.current = deselectImage;
  }, [deselectImage]);

  useLayoutEffect(() => {
    deselectButtonRef.current = deselectButton;
  }, [deselectButton]);

  const selectImage = useCallback((img) => {
    if (!img || !editorRef.current?.contains(img)) return;
    // Deselect previous image
    deselectImage();
    deselectButton();
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
  }, [deselectImage, deselectButton]);

  const openExistingButtonForEdit = useCallback((btn) => {
    if (!btn || !editorRef.current?.contains(btn)) return;
    deselectImage();
    deselectButton();

    selectedButtonRef.current = btn;
    setIsEditingButton(true);
    btn.style.outline = '2px solid #1e3a8a';
    btn.style.outlineOffset = '3px';
    btn.setAttribute('data-selected', 'true');

    const wrap = btn.closest('.blog-cta-wrap');
    const nameSpan = btn.querySelector('span');
    const icon = btn.querySelector('.blog-cta-icon, .fa-arrow-right, i');
    const href = btn.getAttribute('href') || btn.href || '';
    const computed = window.getComputedStyle(btn);
    const bg =
      rgbToHex(btn.style.getPropertyValue('--cta-bg-color')) ||
      rgbToHex(btn.style.backgroundColor) ||
      rgbToHex(computed.backgroundColor) ||
      '#2E3B78';
    const text =
      rgbToHex(btn.style.getPropertyValue('--cta-text-color')) ||
      rgbToHex(btn.style.color) ||
      rgbToHex(nameSpan ? window.getComputedStyle(nameSpan).color : '') ||
      '#ffffff';
    const align = wrap?.style?.textAlign || 'center';

    setButtonName((nameSpan?.textContent || btn.textContent || '').trim());
    setButtonLink(href);
    setButtonColor(bg);
    setButtonTextColor(text);
    setButtonShowIcon(Boolean(icon));
    setButtonIconColor(
      rgbToHex(icon?.style?.getPropertyValue?.('--cta-icon-color')) ||
        rgbToHex(icon?.style?.color) ||
        (icon ? rgbToHex(window.getComputedStyle(icon).color) : '') ||
        '#FCD64C'
    );
    setButtonAlign(['left', 'center', 'right'].includes(align) ? align : 'center');
    setShowButtonDialog(true);
  }, [deselectImage, deselectButton]);

  const openExistingButtonRef = useRef(openExistingButtonForEdit);
  useLayoutEffect(() => {
    openExistingButtonRef.current = openExistingButtonForEdit;
  }, [openExistingButtonForEdit]);

  // Fetch blog slugs for internal linking

  // Close alignment dropdown, link dialog, and deselect images when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Don't do anything if clicking on toolbar, dropdown, or link dialog
      if (toolbarRef.current?.contains(event.target) || 
          alignDropdownRef.current?.contains(event.target) ||
          linkDialogRef.current?.contains(event.target) ||
          imageUrlDialogRef.current?.contains(event.target) ||
          buttonDialogRef.current?.contains(event.target)) {
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

      if (showButtonDialog && buttonDialogRef.current && !buttonDialogRef.current.contains(event.target)) {
        setShowButtonDialog(false);
      }
      
      // Deselect image/button if clicking outside editor (but not on toolbar)
      if (editorRef.current && !editorRef.current.contains(event.target) && !toolbarRef.current?.contains(event.target)) {
        if (selectedImageRef.current) deselectImageRef.current?.();
        if (selectedButtonRef.current && !showButtonDialog) deselectButtonRef.current?.();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAlignDropdown, showLinkDialog, showImageUrlDialog, showButtonDialog, isImageSelected]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (value !== lastEmittedRef.current && el.innerHTML !== value) {
      el.innerHTML = value || '';
      // Deselect any selected image when content is reset
      setTimeout(() => {
        deselectImageRef.current?.();
        deselectButtonRef.current?.();
      }, 0);
      
      // Add click handlers to existing images and CTA buttons
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

        el.querySelectorAll('a.blog-cta-btn').forEach((btn) => {
          btn.style.cursor = 'pointer';
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openExistingButtonRef.current?.(btn);
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

  function handleEditorClick(e) {
    // Don't deselect if clicking on toolbar or dropdown
    if (toolbarRef.current?.contains(e.target) || alignDropdownRef.current?.contains(e.target)) {
      return;
    }

    const ctaBtn = findBlogCtaButton(e.target);
    if (ctaBtn && editorRef.current?.contains(ctaBtn)) {
      e.stopPropagation();
      e.preventDefault();
      openExistingButtonForEdit(ctaBtn);
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
          !clickedElement.closest('.toolbar-container') &&
          !clickedElement.closest('a.blog-cta-btn') &&
          !clickedElement.closest('.blog-cta-wrap')) {
        deselectImage();
        deselectButton();
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

  function openButtonDialog() {
    saveSelection();
    deselectButton();
    selectedButtonRef.current = null;
    setIsEditingButton(false);
    setButtonName('');
    setButtonLink('');
    setButtonColor('#2E3B78');
    setButtonTextColor('#ffffff');
    setButtonShowIcon(true);
    setButtonIconColor('#FCD64C');
    setButtonAlign('center');
    setShowButtonDialog(true);
  }

  function resetButtonDialog() {
    setShowButtonDialog(false);
    setButtonName('');
    setButtonLink('');
    setButtonColor('#2E3B78');
    setButtonTextColor('#ffffff');
    setButtonShowIcon(true);
    setButtonIconColor('#FCD64C');
    setButtonAlign('center');
    deselectButton();
  }

  function buildButtonHtml({ name, url, bg, text, align, showIcon, iconColor }) {
    const safeName = escapeHtml(name);
    const safeUrl = escapeHtml(url);
    const safeColor = escapeHtml(bg || '#2E3B78');
    const safeTextColor = escapeHtml(text || '#ffffff');
    const safeIconColor = escapeHtml(iconColor || '#FCD64C');
    const iconHtml = showIcon
      ? `<i class="fa-solid fa-arrow-right blog-cta-icon" style="--cta-icon-color: ${safeIconColor}; color: ${safeIconColor} !important; font-size: 0.9em; flex-shrink: 0;" aria-hidden="true"></i>`
      : '';
    // CSS variables + !important beat generic .blog-content a { color: blue !important } rules
    return `<div class="blog-cta-wrap" style="text-align: ${align}; margin: 1.25rem 0;"><a class="blog-cta-btn" href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="--cta-bg-color: ${safeColor}; --cta-text-color: ${safeTextColor}; background-color: ${safeColor} !important; color: ${safeTextColor} !important; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 28px; border-radius: 9999px; font-weight: 700; text-decoration: none; line-height: 1.2; box-shadow: 0 4px 14px rgba(0,0,0,0.12);"><span style="color: ${safeTextColor} !important;">${safeName}</span>${iconHtml}</a></div>`;
  }

  function wireCtaButtonClick(btn) {
    if (!btn) return;
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openExistingButtonRef.current?.(btn);
    }, true);
  }

  function insertButton() {
    const name = buttonName.trim();
    let url = buttonLink.trim();
    if (!name) {
      alert('Please enter a button name');
      return;
    }
    if (!url) {
      alert('Please enter a button link');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
      url = 'https://' + url;
    }

    const align = BUTTON_ALIGNS.some((a) => a.value === buttonAlign) ? buttonAlign : 'center';
    const existingBtn = selectedButtonRef.current;
    const html = buildButtonHtml({
      name,
      url,
      bg: buttonColor,
      text: buttonTextColor,
      align,
      showIcon: buttonShowIcon,
      iconColor: buttonIconColor,
    });

    // Update existing button in place
    if (existingBtn && editorRef.current?.contains(existingBtn)) {
      const wrap = existingBtn.closest('.blog-cta-wrap') || existingBtn.parentElement;
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const newWrap = temp.firstChild;
      if (wrap && newWrap) {
        wrap.replaceWith(newWrap);
        const newBtn = newWrap.querySelector?.('a.blog-cta-btn') || (newWrap.classList?.contains('blog-cta-btn') ? newWrap : null);
        wireCtaButtonClick(newBtn);
      }
      emitChange();
      resetButtonDialog();
      return;
    }

    restoreSelection();
    editorRef.current?.focus();

    const insertHtml = `${html}<p><br></p>`;
    const sel = document.getSelection();
    if (sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const temp = document.createElement('div');
      temp.innerHTML = insertHtml;
      const frag = document.createDocumentFragment();
      let node;
      let lastNode = null;
      let insertedBtn = null;
      while ((node = temp.firstChild)) {
        if (!insertedBtn && node.querySelector) {
          insertedBtn = node.querySelector('a.blog-cta-btn');
        }
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      wireCtaButtonClick(insertedBtn);
      if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else if (editorRef.current) {
      editorRef.current.insertAdjacentHTML('beforeend', insertHtml);
      const buttons = editorRef.current.querySelectorAll('a.blog-cta-btn');
      wireCtaButtonClick(buttons[buttons.length - 1]);
    }

    emitChange();
    resetButtonDialog();
  }

  function removeButton() {
    const existingBtn = selectedButtonRef.current;
    if (!existingBtn || !editorRef.current?.contains(existingBtn)) {
      resetButtonDialog();
      return;
    }
    const wrap = existingBtn.closest('.blog-cta-wrap') || existingBtn;
    wrap.remove();
    selectedButtonRef.current = null;
    emitChange();
    resetButtonDialog();
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
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openButtonDialog();
          }}
          className="p-2 rounded hover:bg-gray-200 text-gray-700 flex items-center gap-1 text-xs font-medium"
          title="Insert button — or click an existing button in the content to edit it"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m-8 8h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Button
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
          onClick={handleEditorClick}
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
        .rich-editor-placeholder .blog-cta-wrap {
          margin: 1rem 0;
        }
        .rich-editor-placeholder a.blog-cta-btn {
          background-color: var(--cta-bg-color, #2E3B78) !important;
          color: var(--cta-text-color, #ffffff) !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 9999px !important;
          cursor: pointer;
        }
        .rich-editor-placeholder a.blog-cta-btn:hover,
        .rich-editor-placeholder a.blog-cta-btn:visited {
          background-color: var(--cta-bg-color, #2E3B78) !important;
          color: var(--cta-text-color, #ffffff) !important;
          opacity: 0.9;
          text-decoration: none !important;
        }
        .rich-editor-placeholder a.blog-cta-btn span {
          color: var(--cta-text-color, #ffffff) !important;
        }
        .rich-editor-placeholder a.blog-cta-btn .blog-cta-icon {
          color: var(--cta-icon-color, #FCD64C) !important;
          text-decoration: none !important;
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

      {showButtonDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div
            ref={buttonDialogRef}
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 min-w-[400px] max-w-[520px] mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold mb-4">
              {isEditingButton ? 'Edit Button' : 'Insert Button'}
            </h3>
            {isEditingButton && (
              <p className="text-xs text-gray-500 mb-4">
                Click a button in the content to edit it. Update the fields below, then save.
              </p>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button name
              </label>
              <input
                type="text"
                value={buttonName}
                onChange={(e) => setButtonName(e.target.value)}
                placeholder="e.g. Start Dropshipping"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button link
              </label>
              <input
                type="text"
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
                placeholder="https://www.myzambeel.com/pages/dropshipping-uae-and-ksa"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Visitors will be redirected here when they click the button.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button background color
              </label>
              <div className="flex flex-wrap gap-2">
                {BUTTON_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      setButtonColor(color.value);
                      if (color.text) setButtonTextColor(color.text);
                    }}
                    className={`w-8 h-8 rounded-full border-2 ${
                      buttonColor === color.value ? 'border-gray-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                    aria-label={color.label}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="color"
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                  className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                  title="Custom background color"
                />
                <span className="text-xs text-gray-500 font-mono">{buttonColor}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button text color
              </label>
              <div className="flex flex-wrap gap-2 items-center">
                {[
                  { label: 'White', value: '#ffffff' },
                  { label: 'Navy', value: '#2E3B78' },
                  { label: 'Black', value: '#111827' },
                  { label: 'Gold', value: '#FCD64C' },
                ].map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setButtonTextColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      buttonTextColor === color.value ? 'border-gray-900 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                    aria-label={color.label}
                  />
                ))}
                <input
                  type="color"
                  value={buttonTextColor}
                  onChange={(e) => setButtonTextColor(e.target.value)}
                  className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                  title="Custom text color"
                />
                <span className="text-xs text-gray-500 font-mono">{buttonTextColor}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={buttonShowIcon}
                  onChange={(e) => setButtonShowIcon(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Show arrow icon after text (like service cards)
              </label>
              {buttonShowIcon && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon color
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {[
                      { label: 'Gold', value: '#FCD64C' },
                      { label: 'White', value: '#ffffff' },
                      { label: 'Navy', value: '#2E3B78' },
                      { label: 'Black', value: '#111827' },
                    ].map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setButtonIconColor(color.value)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          buttonIconColor === color.value ? 'border-gray-900 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                        aria-label={color.label}
                      />
                    ))}
                    <input
                      type="color"
                      value={buttonIconColor}
                      onChange={(e) => setButtonIconColor(e.target.value)}
                      className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                      title="Custom icon color"
                    />
                    <span className="text-xs text-gray-500 font-mono">{buttonIconColor}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alignment
              </label>
              <div className="flex gap-2">
                {BUTTON_ALIGNS.map((align) => (
                  <button
                    key={align.value}
                    type="button"
                    onClick={() => setButtonAlign(align.value)}
                    className={`px-3 py-2 text-sm rounded-lg border ${
                      buttonAlign === align.value
                        ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {align.label}
                  </button>
                ))}
              </div>
            </div>

            {buttonName.trim() && (
              <div className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <p className="text-xs text-gray-600 mb-2 font-medium">Preview:</p>
                <div style={{ textAlign: buttonAlign }}>
                  <span
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-bold text-sm shadow-md"
                    style={{
                      backgroundColor: buttonColor,
                      color: buttonTextColor,
                    }}
                  >
                    <span>{buttonName.trim()}</span>
                    {buttonShowIcon && (
                      <i
                        className="fa-solid fa-arrow-right"
                        style={{ color: buttonIconColor, fontSize: '0.9em' }}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end flex-wrap">
              <button
                type="button"
                onClick={resetButtonDialog}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              {isEditingButton && (
                <button
                  type="button"
                  onClick={removeButton}
                  className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50"
                >
                  Remove Button
                </button>
              )}
              <button
                type="button"
                onClick={insertButton}
                className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e3a8a]/90"
              >
                {isEditingButton ? 'Update Button' : 'Insert Button'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
