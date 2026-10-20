/* JAG Brand Template v1.1 — brand.js
   Jesús Ariel González Bonilla · Software Architect · Author
   ──────────────────────────────────────────────────────── */

'use strict';

/* ═══ 1. MODE DATA ════════════════════════════════════ */
const MODES = {
  technical: {
    label:        'Technical Documentation',
    typeLabel:    'Technical Documentation · MGF v1.0.0',
    license:      'MIT',
    licenseUrl:   'https://opensource.org/licenses/MIT',
    licenseTag:   'MIT License',
    footerSuffix: 'jesusarielgb-works · MIT License · 2026',
    jsonLdType:   'TechArticle',
  },
  article: {
    label:        'Article / Essay',
    typeLabel:    'Article · Software Architecture',
    license:      'CC BY 4.0',
    licenseUrl:   'https://creativecommons.org/licenses/by/4.0/',
    licenseTag:   'CC BY 4.0',
    footerSuffix: 'jesusarielgb-works · CC BY 4.0 · 2026',
    jsonLdType:   'Article',
    licenseNote:  '(configurable per article)'
  },
  book: {
    label:        'Book Chapter',
    typeLabel:    'Book · Chapter 1',
    license:      'CC BY 4.0',
    licenseUrl:   'https://creativecommons.org/licenses/by/4.0/',
    licenseTag:   'CC BY 4.0',
    footerSuffix: 'Software Without Borders · CC BY 4.0 · 2026',
    jsonLdType:   'Book',
  },
};

/* ═══ 2. SWITCH MODE ══════════════════════════════════ */
function switchMode(type) {
  if (!MODES[type]) return;
  const mode = MODES[type];

  // Hide all docs, show selected
  document.querySelectorAll('.doc').forEach(d => d.classList.remove('visible'));
  const doc = document.getElementById('doc-' + type);
  if (doc) doc.classList.add('visible');

  // Sidebar buttons
  document.querySelectorAll('.doc-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('btn-' + type);
  if (btn) btn.classList.add('active');

  // Topbar label
  const label = document.getElementById('doc-mode-label');
  if (label) label.textContent = mode.label;

  // License link in <head>
  updateLicenseLink(mode.licenseUrl);

  // Footer license tags
  document.querySelectorAll('.license-tag').forEach(el => {
    el.textContent = mode.licenseTag;
  });
  document.querySelectorAll('.footer-suffix').forEach(el => {
    el.textContent = mode.footerSuffix;
  });

  // JSON-LD
  updateJsonLD(type, mode);
}

/* ═══ 3. LICENSE LINK ═════════════════════════════════ */
function updateLicenseLink(url) {
  let link = document.querySelector('link[rel="license"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'license';
    document.head.appendChild(link);
  }
  link.href = url;
}

/* ═══ 4. JSON-LD ══════════════════════════════════════ */
function updateJsonLD(type, mode) {
  const data = {
    '@context':  'https://schema.org',
    '@type':     mode.jsonLdType,
    'name':      document.querySelector('#doc-' + type + ' .doc-title')?.textContent?.trim() ?? 'Document',
    'author': {
      '@type': 'Person',
      'name':  'Jesús Ariel González Bonilla',
      'url':   'https://github.com/ariel5253'
    },
    'license':      mode.licenseUrl,
    'inLanguage':   'es',
    'datePublished': '2026',
    'publisher': {
      '@type': 'Organization',
      'name':  'jesusarielgb-works',
      'url':   'https://github.com/jesusarielgb-works'
    }
  };

  let script = document.getElementById('jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

/* ═══ 5. COPY STANDALONE HTML ═════════════════════════ */
function copyHTML() {
  const doc = document.querySelector('.doc.visible');
  if (!doc) return;

  const modeId = doc.id.replace('doc-', '');
  const mode   = MODES[modeId] ?? MODES.technical;

  const css = document.querySelector('style') ? document.querySelector('style').textContent : '';
  const fonts = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap';

  const standalone = `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${doc.querySelector('.doc-title')?.textContent?.trim() ?? 'Document'} — Jesús Ariel González Bonilla</title>
  <meta name="author" content="Jesús Ariel González Bonilla">
  <link rel="license" href="${mode.licenseUrl}">
  <link rel="stylesheet" href="${fonts}">
  <style>
    /* Standalone export — JAG Brand Template v1.1 */
    ${css}
    body { background: #fff; }
    .doc { display: flex !important; max-width: 700px; margin: 0 auto; box-shadow: none; }
  </style>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "${mode.jsonLdType}",
    "name": "${doc.querySelector('.doc-title')?.textContent?.trim() ?? ''}",
    "author": { "@type": "Person", "name": "Jesús Ariel González Bonilla" },
    "license": "${mode.licenseUrl}"
  }
  <\/script>
</head>
<body>
${doc.outerHTML}
</body>
</html>`;

  navigator.clipboard.writeText(standalone).then(() => {
    const btn = document.getElementById('btn-copy');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = orig; }, 1800);
  }).catch(() => {
    alert('Copy failed — use Ctrl+A on the page and copy manually.');
  });
}

/* ═══ 6. PRINT PREPARATION ═══════════════════════════ */
window.addEventListener('beforeprint', () => {
  // Force light theme for print
  document.documentElement.dataset.theme = 'light';
  // Expand all docs that are hidden (only visible one will show via CSS)
  document.querySelectorAll('.doc:not(.visible)').forEach(d => {
    d.style.display = 'none';
  });
});

window.addEventListener('afterprint', () => {
  delete document.documentElement.dataset.theme;
  document.querySelectorAll('.doc').forEach(d => {
    d.style.display = '';
  });
});

/* ═══ 7. INIT ═════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Default mode
  switchMode('technical');
});
