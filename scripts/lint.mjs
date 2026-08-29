/* Static checks: JS syntax, CSS brace balance, banned icon libraries, emoji glyphs. */
import { readFileSync, readdirSync } from 'fs';
import { execFileSync } from 'child_process';
import { fail, problems } from './shared.mjs';

// 1. JS syntax
for (const f of ['app.js', 'motion.js']) {
  try { execFileSync('node', ['--check', f], { stdio: 'pipe' }); }
  catch (e) { fail(`${f}: syntax error\n${e.stderr}`); }
}

// 2. CSS brace balance
for (const f of ['styles.css', 'theme.css', 'portal.css']) {
  const css = readFileSync(f, 'utf8');
  const open = (css.match(/{/g) || []).length;
  const close = (css.match(/}/g) || []).length;
  if (open !== close) fail(`${f}: unbalanced braces (${open} open / ${close} close)`);
}

// 3. No generic icon libraries introduced
for (const f of ['index.html', 'styles.css', 'theme.css', 'portal.css', 'app.js']) {
  const src = readFileSync(f, 'utf8');
  if (/lucide|heroicons|font-?awesome|material[- ]?icons/i.test(src)) fail(`${f}: generic icon library reference found`);
}

// 4. No emoji in rendered markup
const app = readFileSync('app.js', 'utf8');
const emoji = app.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu);
if (emoji) fail(`emoji glyphs still present in app.js: ${[...new Set(emoji)].join(' ')}`);

console.log(problems.length ? problems.join('\n') : 'lint: all checks passed');
process.exit(problems.length ? 1 : 0);
