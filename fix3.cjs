const fs = require('fs');
let s = fs.readFileSync('app.js', 'utf8');
const bad = "A\u2212\u2019</button>";
if (s.includes(bad)) { s = s.replace(bad, 'A\u2212</button>'); console.log('A- fixed'); }
else console.log('not found');
fs.writeFileSync('app.js', s, 'utf8');
