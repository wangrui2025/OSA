document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  // Theme toggle
  const themeBtn = target.closest('#theme-toggle');
  if (themeBtn) {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0a0a0a' : '#fafaf9');
    return;
  }

  // Copy button
  const copyBtn = target.closest('button[data-copy-target]') as HTMLButtonElement | null;
  if (copyBtn) {
    const targetId = copyBtn.getAttribute('data-copy-target');
    const label = copyBtn.getAttribute('data-copy-label') || 'Copy';
    const successLabel = copyBtn.getAttribute('data-copy-success') || 'Copied!';
    const el = document.getElementById(targetId || '');
    if (!el) return;

    const text = el.innerText;
    const showSuccess = () => {
      const icon = copyBtn.querySelector('.copy-icon');
      const textSpan = copyBtn.querySelector('span');
      if (icon) icon.setAttribute('name', 'lucide:check');
      if (textSpan) textSpan.textContent = successLabel;
      setTimeout(() => {
        if (icon) icon.setAttribute('name', 'lucide:copy');
        if (textSpan) textSpan.textContent = label;
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showSuccess).catch(() => {});
    }
  }
});
