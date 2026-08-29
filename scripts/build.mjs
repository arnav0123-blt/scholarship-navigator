/* Build: copies the static site into dist/ for deployment. */
import { mkdirSync, copyFileSync, rmSync } from 'fs';
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
for (const f of ['index.html', 'app.js', 'motion.js', 'styles.css', 'theme.css', 'portal.css']) {
  copyFileSync(f, `dist/${f}`);
}
console.log('build: dist/ written');
