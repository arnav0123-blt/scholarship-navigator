import { readFileSync, writeFileSync } from 'fs';
let s = readFileSync('app.js', 'utf8');
// Repair double-encoded UTF-8: sequences of [C2-F4 range chars][80-BF range chars]
const isLead = c => c >= 0xC2 && c <= 0xF4;
const isCont = c => c >= 0x80 && c <= 0xBF;
let out = '';
for (let i = 0; i < s.length;) {
  const c = s.codePointAt(i);
  const w = c > 0xFFFF ? 2 : 1;
  if (isLead(c)) {
    // collect following continuation-range chars
    let j = i + 1, seq = [c];
    while (j < s.length && isCont(s.codePointAt(j))) { seq.push(s.codePointAt(j)); j++; }
    try {
      const bytes = Buffer.from(seq);
      const text = bytes.toString('utf8');
      const round = Buffer.from(text, 'utf8');
      if (round.equals(bytes)) { out += text; i = j; continue; }
    } catch { }
  }
  out += s[i];
  i++;
}
writeFileSync('app.js', out, 'utf8');
console.log('repaired. sample:', out.slice(out.indexOf('let tabs'), out.indexOf('let tabs') + 120));
