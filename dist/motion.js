/* Lightweight motion utilities for the static prototype. */
window.NspMotion = {
  reduced: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  reveal(root = document) {
    if (this.reduced()) return;
    root.querySelectorAll('[data-enter]').forEach((node, index) => {
      node.style.animationDelay = `${index * 40}ms`;
      node.classList.add('enter');
    });
  },
  count(node, target) {
    if (!node || this.reduced()) { if (node) node.textContent = `₹${target.toLocaleString('en-IN')}`; return; }
    const start = performance.now(), duration = 800;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      node.textContent = `₹${value.toLocaleString('en-IN')}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
};
