import fs from 'fs';
import katex from 'katex';

const html = fs.readFileSync('public/slides.html', 'utf8');

// Find all katex-display spans and replace with pre-rendered HTML
const marker = '<span class="katex-display">';
let count = 0;
let result = '';
let pos = 0;

while (true) {
  const startIdx = html.indexOf(marker, pos);
  if (startIdx === -1) {
    result += html.slice(pos);
    break;
  }

  result += html.slice(pos, startIdx);

  const endIdx = html.indexOf('</span>', startIdx);
  if (endIdx === -1) {
    result += html.slice(startIdx);
    break;
  }

  const full = html.slice(startIdx, endIdx + 7);
  const latexStart = marker.length + 2;
  const latexEnd = full.length - 7 - 2;
  let latex = full.slice(latexStart, latexEnd);

  count++;
  const rendered = katex.renderToString(latex, {
    displayMode: true,
    throwOnError: false,
  });
  // Replace the whole katex-display span with pre-rendered content
  result += `<span class="katex-display" data-raw="${latex.replace(/"/g, '&#34;')}">${rendered}</span>`;

  pos = endIdx + 7;
}

console.log(`Pre-rendered ${count} formulas`);

// Remove KaTeX CDN
result = result.replace(/<link[^>]*katex[^>]*>/g, '');
result = result.replace(/<script[^>]*katex[^>]*><\/script>/g, '');
result = result.replace(/<script[^>]*auto-render[^>]*><\/script>/g, '');

// Remove renderMathInElement block
result = result.replace(/if \(typeof renderMathInElement[^}]+}\);[\s\n]*}\s*<\/script>/m, '');

// Add minimal frontmatter so Astro treats this as a page
const frontmatter = `---
---
`;

fs.writeFileSync('src/pages/slides.astro', frontmatter + result);
console.log('Written to src/pages/slides.astro with minimal frontmatter');
