import fs from 'fs';
import katex from 'katex';

const path = process.argv[2] || 'public/slides.html';
let html = fs.readFileSync(path, 'utf8');

const marker = '<span class="katex-display">';
let count = 0;
let pos = 0;

while (true) {
  const startIdx = html.indexOf(marker, pos);
  if (startIdx === -1) break;

  const endIdx = html.indexOf('</span>', startIdx);
  if (endIdx === -1) break;

  const full = html.slice(startIdx, endIdx + 7);
  const latexStart = marker.length + 2;
  const latexEnd = full.length - 7 - 2;
  let latex = full.slice(latexStart, latexEnd);

  const rendered = katex.renderToString(latex, {
    displayMode: true,
    throwOnError: false,
  });

  const replacement = `<span class="katex-display">${rendered}</span>`;
  html = html.slice(0, startIdx) + replacement + html.slice(endIdx + 7);
  pos = startIdx + replacement.length;
  count++;
}

if (count === 0) {
  console.log('No formulas found to pre-render');
  process.exit(0);
}

// Remove KaTeX CDN
html = html.replace(/<link[^>]*katex[^>]*>/g, '');
html = html.replace(/<script[^>]*katex[^>]*><\/script>/g, '');
html = html.replace(/<script[^>]*auto-render[^>]*><\/script>/g, '');

// Remove renderMathInElement block
html = html.replace(/if \(typeof renderMathInElement[^}]+}\);[\s\n]*}\s*<\/script>/m, '');

// Check for residual KaTeX CDN refs
const katexJs = html.includes('katex.min.js') || html.includes('auto-render');
if (katexJs) {
  console.error('[ERROR] KaTeX CDN still present after pre-render');
  process.exit(1);
}

fs.writeFileSync(path, html);
console.log(`Pre-rendered ${count} formulas, KaTeX CDN removed, written to ${path}`);
