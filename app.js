/* All records below are fictional demo data. Nothing is sent to a server. */
const schemes = [
  { id: 'post-matric', name: 'Post-Matric Progress Grant', level: 'Undergraduate', state: 'Uttar Pradesh', category: 'SC', income: 'Under ₹2.5L', type: 'Merit + means', amount: '₹5,750', why: 'For first-year students from low-income families.' },
  { id: 'future-women', name: 'Future Women Scholars', level: 'Undergraduate', state: 'All India', category: 'All', income: 'Under ₹4L', type: 'Merit', amount: '₹10,000', why: 'For women pursuing their first degree.' },
  { id: 'science-spark', name: 'Science Spark Fellowship', level: 'Postgraduate', state: 'All India', category: 'All', income: 'Any income', type: 'Merit', amount: '₹25,000', why: 'For science and technology students.' },
  { id: 'minority-achieve', name: 'Minority Achievement Award', level: 'Undergraduate', state: 'All India', category: 'Minority', income: 'Under ₹3L', type: 'Merit + means', amount: '₹8,000', why: 'Support for eligible minority community students.' },
  { id: 'up-digital', name: 'UP Digital Learning Support', level: 'School', state: 'Uttar Pradesh', category: 'All', income: 'Under ₹2.5L', type: 'Need based', amount: '₹4,000', why: 'For students continuing secondary education.' },
  { id: 'ability-forward', name: 'Ability Forward Scholarship', level: 'Undergraduate', state: 'All India', category: 'All', income: 'Under ₹5L', type: 'Disability support', amount: '₹12,000', why: 'For students with a benchmark disability.' },
  { id: 'arts-pathway', name: 'Arts Pathway Bursary', level: 'Undergraduate', state: 'All India', category: 'All', income: 'Under ₹4L', type: 'Need based', amount: '₹7,500', why: 'For arts, humanities and commerce learners.' },
  { id: 'district-talent', name: 'District Talent Continuation Fund', level: 'School', state: 'Uttar Pradesh', category: 'OBC', income: 'Under ₹2.5L', type: 'Merit + means', amount: '₹5,000', why: 'For eligible high-performing students.' }
];
const institutes = [['Sitapur Government Degree College', 'Uttar Pradesh', 'Sitapur'], ['Awadh Commerce College', 'Uttar Pradesh', 'Lucknow'], ["Shakti Women's College", 'Uttar Pradesh', 'Kanpur Nagar'], ['Central Arts Institute', 'Madhya Pradesh', 'Bhopal'], ['Coastal Science College', 'Tamil Nadu', 'Chennai'], ['Riverbend Polytechnic', 'Bihar', 'Patna']];
const appStates = { defect: { label: 'Document needs attention', chip: 'Action needed', meaning: 'Your income certificate image was not clear enough to verify.', action: 'Retake and submit a clearer photo.', owner: 'You', next: 'Institute verification resumes after resubmission.', step: 2 }, institute: { label: 'Institute verification', chip: 'In review', meaning: 'Your college is checking your submitted application.', action: 'Nothing right now.', owner: 'College scholarship office', next: 'Application moves to state review.', step: 2 }, state: { label: 'State / Ministry review', chip: 'In review', meaning: 'The application is being checked at the scheme level.', action: 'Nothing right now.', owner: 'Scholarship authority', next: 'An approved application is sanctioned.', step: 3 }, sanctioned: { label: 'Sanctioned', chip: 'Approved', meaning: 'Your application is approved for the demo scholarship.', action: 'Keep your payment details current.', owner: 'Scholarship authority', next: 'Payment will be initiated.', step: 4 }, paid: { label: 'Payment credited', chip: 'Completed', meaning: 'The fictional scholarship payment was marked as credited.', action: 'No action required.', owner: 'Bank and payment partner', next: 'Your application journey is complete.', step: 5 } };
const faqs = [['Is this the official scholarship portal?', 'No. Scholarship Navigator is an independent demo prototype using fictional data.'], ['Why is my application waiting?', 'A status can wait while the responsible office checks documents. The tracker explains who is responsible.'], ['Can I upload real documents here?', 'No. This demo only shows the selected file name and does not upload or store files.'], ['Where do I verify deadlines?', 'Always confirm final deadlines and eligibility at the official NSP source.']];
const docs = ['Identity / Aadhaar reference', 'Income certificate', 'Caste certificate (where applicable)', 'Latest marksheet', 'Fee receipt', 'Bank details', 'Institute verification'];
const notifications = [['Deadline approaching', 'Post-Matric Progress Grant correction window closes in 5 days.', '2h ago', 'warn'], ['Document action needed', 'Income certificate image was not clear. Please retake and upload.', 'Yesterday', 'danger'], ['Institute verified', 'Awadh Commerce College marked your enrollment as verified.', '3d ago', 'good'], ['New scheme match', 'Science Spark Fellowship may fit your Postgraduate plan.', '1w ago', 'info'], ['Payment update', 'Sanction order received for ₹5,750. Payment is being processed.', '1w ago', 'good']];
const deadlines = [['Post-Matric Progress Grant', 'Correction window closes', '2026-01-18', 'warn'], ['Future Women Scholars', 'Application deadline', '2026-02-02', ''], ['Science Spark Fellowship', 'Application opens', '2026-03-01', ''], ['Minority Achievement Award', 'Document verification ends', '2026-01-30', 'warn'], ['UP Digital Learning Support', 'Renewal window opens', '2026-04-10', '']];
const profileData = { name: 'Meena Kumari', ref: 'UP2025018234', level: 'Undergraduate · Year 1', college: 'Awadh Commerce College, Lucknow', category: 'SC', income: '₹1,80,000 per year', disability: 'No', bank: '••••4821 · Verified', aadhaar: 'XXXX XXXX 8821 (demo)' };
let state = { tab: 'landing', lang: localStorage.getItem('sn-lang') || 'en', size: 0, saved: JSON.parse(localStorage.getItem('sn-saved') || '[]'), appState: 'defect', docs: JSON.parse(localStorage.getItem('sn-docs') || '[]'), track: 'institute', pay: 'processing', faq: null, grievance: false, eligible: null, detail: null, readNotifs: [], notifFilter: 'all', settings: { reminders: true, status: true, schemes: false, lang: localStorage.getItem('sn-lang') || 'en' } };
const app = document.querySelector('#app'); const save = () => { localStorage.setItem('sn-saved', JSON.stringify(state.saved)); localStorage.setItem('sn-docs', JSON.stringify(state.docs)); localStorage.setItem('sn-lang', state.lang) };
const labels = { en: { dash: 'Dashboard', dashboard: 'Dashboard', find: 'Find', eligibility: 'Eligibility', tracker: 'Tracker', documents: 'Documents', payment: 'Payment', help: 'Help', institutes: 'Institutes', deadlines: 'Deadlines', notifications: 'Alerts', profile: 'Profile', insights: 'Insights', settings: 'Settings', welcome: 'Namaste, Meena', demo: 'Scholarship Navigator — Demo Prototype' }, hi: { dash: 'डैशबोर्ड', dashboard: 'डैशबोर्ड', find: 'खोजें', eligibility: 'पात्रता', tracker: 'ट्रैकर', documents: 'दस्तावेज़', payment: 'भुगतान', help: 'सहायता', institutes: 'संस्थान', deadlines: 'समय-सीमा', notifications: 'सूचनाएँ', profile: 'प्रोफ़ाइल', insights: 'विश्लेषण', settings: 'सेटिंग्स', welcome: 'नमस्ते, मीना', demo: 'स्कॉलरशिप नेविगेटर — डेमो प्रोटोटाइप' } }; const L = () => labels[state.lang];
/* Hindi translation map: every user-visible string is looked up through T(). */
const terms = { 'School': 'विद्यालय', 'Undergraduate': 'स्नातक', 'Postgraduate': 'परास्नातक', 'Uttar Pradesh': 'उत्तर प्रदेश', 'All India': 'अखिल भारतीय', 'Madhya Pradesh': 'मध्य प्रदेश', 'Tamil Nadu': 'तमिलनाडु', 'Bihar': 'बिहार', 'SC': 'अनुसूचित जाति', 'OBC': 'अन्य पिछड़ा वर्ग', 'Minority': 'अल्पसंख्यक', 'All': 'सभी', 'General': 'सामान्य', 'Merit': 'मेरिट', 'Merit + means': 'मेरिट + आय आधारित', 'Need based': 'आवश्यकता आधारित', 'Disability support': 'दिव्यांग सहायता', 'Under ₹2.5L': '₹2.5 लाख से कम', 'Under ₹3L': '₹3 लाख से कम', 'Under ₹4L': '₹4 लाख से कम', 'Under ₹5L': '₹5 लाख से कम', 'Any income': 'कोई भी आय', 'No': 'नहीं', 'Yes': 'हाँ', 'You': 'आप', 'Verified': 'सत्यापित' };
const hi = {
  'Post-Matric Progress Grant': 'पोस्ट-मैट्रिक प्रगति अनुदान',
  'Future Women Scholars': 'भविष्य की महिला विद्वान योजना',
  'Science Spark Fellowship': 'विज्ञान स्पार्क फेलोशिप',
  'Minority Achievement Award': 'अल्पसंख्यक उपलब्धि पुरस्कार',
  'UP Digital Learning Support': 'यूपी डिजिटल शिक्षा सहायता',
  'Ability Forward Scholarship': 'समर्थ आगे छात्रवृत्ति',
  'Arts Pathway Bursary': 'कला पथ छात्रवृत्ति',
  'District Talent Continuation Fund': 'जिला प्रतिभा निरंतरता कोष',
  'For first-year students from low-income families.': 'कम आय वाले परिवारों के प्रथम वर्ष के छात्रों के लिए।',
  'For women pursuing their first degree.': 'प्रथम डिग्री कर रही महिलाओं के लिए।',
  'For science and technology students.': 'विज्ञान और प्रौद्योगिकी के छात्रों के लिए।',
  'Support for eligible minority community students.': 'पात्र अल्पसंख्यक समुदाय के छात्रों के लिए सहायता।',
  'For students continuing secondary education.': 'माध्यमिक शिक्षा जारी रखने वाले छात्रों के लिए।',
  'For students with a benchmark disability.': 'बेंचमार्क दिव्यांगता वाले छात्रों के लिए।',
  'For arts, humanities and commerce learners.': 'कला, मानविकी और वाणिज्य के विद्यार्थियों के लिए।',
  'For eligible high-performing students.': 'पात्र उच्च-प्रदर्शन वाले छात्रों के लिए।',
  'Document needs attention': 'दस्तावेज़ पर ध्यान देना आवश्यक है', 'Action needed': 'कार्रवाई आवश्यक', 'In review': 'समीक्षा में', 'Approved': 'स्वीकृत', 'Completed': 'पूर्ण',
  'Your income certificate image was not clear enough to verify.': 'आपके आय प्रमाणपत्र की छवि सत्यापन के लिए पर्याप्त स्पष्ट नहीं थी।',
  'Retake and submit a clearer photo.': 'एक स्पष्ट फ़ोटो फिर से लेकर जमा करें।',
  'Institute verification resumes after resubmission.': 'पुनः जमा करने के बाद संस्थान सत्यापन फिर शुरू होगा।',
  'Institute verification': 'संस्थान सत्यापन',
  'Your college is checking your submitted application.': 'आपका कॉलेज आपके जमा किए गए आवेदन की जाँच कर रहा है।',
  'Nothing right now.': 'इस समय कुछ नहीं।',
  'College scholarship office': 'कॉलेज छात्रवृत्ति कार्यालय',
  'Application moves to state review.': 'आवेदन राज्य समीक्षा में जाएगा।',
  'State / Ministry review': 'राज्य / मंत्रालय समीक्षा',
  'The application is being checked at the scheme level.': 'आवेदन की योजना स्तर पर जाँच हो रही है।',
  'Scholarship authority': 'छात्रवृत्ति प्राधिकरण',
  'An approved application is sanctioned.': 'स्वीकृत आवेदन का स्वीकरण होता है।',
  'Sanctioned': 'स्वीकृत',
  'Your application is approved for the demo scholarship.': 'आपका आवेदन डेमो छात्रवृत्ति के लिए स्वीकृत है।',
  'Keep your payment details current.': 'अपने भुगतान विवरण अद्यतन रखें।',
  'Payment will be initiated.': 'भुगतान शुरू किया जाएगा।',
  'Payment credited': 'भुगतान जमा हुआ',
  'The fictional scholarship payment was marked as credited.': 'काल्पनिक छात्रवृत्ति भुगतान को जमा चिह्नित किया गया।',
  'No action required.': 'कोई कार्रवाई आवश्यक नहीं।',
  'Bank and payment partner': 'बैंक और भुगतान साझेदार',
  'Your application journey is complete.': 'आपकी आवेदन यात्रा पूरी हुई।'
};

/* ---------- translation helper: falls back through hi map, terms, then English ---------- */
const T = s => state.lang === 'hi' ? (hi[s] ?? terms[s] ?? s) : s;
const dfmt = d => new Date(d + 'T00:00:00').toLocaleDateString(state.lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const dark = () => localStorage.getItem('sn-dark') === '1';

const tabs = ['dashboard', 'find', 'eligibility', 'tracker', 'documents', 'payment', 'deadlines', 'notifications', 'profile', 'insights', 'settings', 'institutes', 'help'];
const timeline = [
  { name: 'Application submitted', note: 'Referral number issued.' },
  { name: 'Document check', note: 'Certificates and marksheets reviewed.' },
  { name: 'Institute verification', note: 'College confirms enrollment.' },
  { name: 'State / Ministry review', note: 'Scheme-level approval.' },
  { name: 'Payment credited', note: 'Amount sent to your bank.' }
];

/* ---------- toast ---------- */
let toastTimer = null;
function toast(msg) {
  let el = document.querySelector('#toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ---------- views ---------- */
function landingView() {
  const stages = Object.values(appStates);
  return `<div class="landing">
    <div class="landing-head">
      <span class="brand-mark">Scholarship Navigator</span>
      <button class="text-link" data-action="lang">${state.lang === 'en' ? 'हिन्दी' : 'English'}</button>
    </div>
    <section class="landing-hero">
      <span class="eyebrow">${T('Independent demo prototype')}</span>
      <h1>${T('Follow your scholarship, <em>stage by stage</em>.')}</h1>
      <p class="lede">${T('A clear status timeline shows what is happening with your application, who is responsible, and what to do next. Fictional data only.')}</p>
      <button class="button" data-tab="dashboard">${T('Track my application')}</button>
    </section>
    <section class="path-visual">
      <p class="path-caption">${T('The application path')}</p>
      <ol>
        ${stages.map((s, i) => `<li><span class="path-no">0${i + 1}</span><b>${T(s.label)}</b><span class="path-rule"><i></i></span><span class="path-state">${i === 0 ? T('Current stage') : T('Later')}</span></li>`).join('')}
      </ol>
    </section>
    <p class="landing-foot">${T('Demo prototype. Not an official portal. All schemes, people and amounts are fictional.')}</p>
  </div>`;
}

function sheetHTML() {
  if (!state.detail) return '';
  const s = schemes.find(x => x.id === state.detail);
  if (!s) return '';
  const saved = state.saved.includes(s.id);
  return `<div class="overlay" data-action="close-overlay">
    <section class="sheet card" role="dialog" aria-modal="true" aria-label="${T(s.name)}">
      <button class="close-btn" data-action="close-sheet">${T('Close')}</button>
      <span class="status-chip ${s.type === 'Merit' ? '' : 'warning'}">${T(s.type)}</span>
      <h2>${T(s.name)}</h2>
      <p>${T(s.why)}</p>
      <div class="status-answers">
        <div><b>${T('Level')}</b><span>${T(s.level)}</span></div>
        <div><b>${T('State')}</b><span>${T(s.state)}</span></div>
        <div><b>${T('Category')}</b><span>${T(s.category)}</span></div>
        <div><b>${T('Income')}</b><span>${T(s.income)}</span></div>
      </div>
      <div class="scheme-meta"><b>${s.amount}</b><small>${T('per year, fictional')}</small></div>
      <div class="inline-actions">
        <button data-action="save-scheme" data-id="${s.id}">${saved ? T('Saved') : T('Save')}</button>
        <button data-action="apply" data-id="${s.id}">${T('Start application')}</button>
      </div>
      <p class="official-reminder">${T('Always confirm details at the official NSP source before applying.')}</p>
    </section>
  </div>`;
}

function dashboardView() {
  const st = appStates[state.appState];
  return `<section class="dash-greeting"><h1>${T(L().welcome)}</h1><p>${T(L().demo)}</p></section>
  <section class="status-hero card" data-tab="tracker" role="button" tabindex="0" aria-label="${T('Open tracker')}">
    <div class="status-hero-top"><span class="q-label">${T('Where is my application?')}</span><span class="status-chip ${state.appState === 'defect' ? 'warning' : state.appState === 'paid' ? 'good' : ''}">${T(st.chip)}</span></div>
    <h2>${T(st.label)}</h2>
    <p>${T(st.meaning)}</p>
    <div class="status-answers">
      <div><b>${T('What to do now')}</b><span class="${state.appState === 'defect' ? 'urgent' : ''}">${T(st.action)}</span></div>
      <div><b>${T('Who is responsible')}</b><span>${T(st.owner)}</span></div>
      <div><b>${T('What happens next')}</b><span>${T(st.next)}</span></div>
    </div>
  </section>
  ${state.appState === 'defect' ? `<div class="alert"><b>${T('Action needed:')}</b><span>${T(st.action)}</span></div>` : ''}
  <div class="section-title">${T('Quick actions')}</div>
  <div class="quick-grid">
    <button data-tab="find">${T('Find schemes')}<small>${T('Browse fictional scholarships')}</small></button>
    <button data-tab="deadlines">${T('Deadlines')}<small>${T('Upcoming dates')}</small></button>
    <button data-tab="documents">${T('Documents')}<small>${T('Checklist status')}</small></button>
  </div>`;
}

let findQuery = '';
function findView() {
  const q = findQuery.toLowerCase();
  const list = schemes.filter(s => !q || (s.name + ' ' + s.why).toLowerCase().includes(q));
  return `<h1>${T(L().find)}</h1><p class="view-sub">${T('Fictional schemes shown for demonstration.')}</p>
  <div class="filters card">
    <label class="ref">${T('Search schemes')}<input type="search" data-filter="find" value="${findQuery}" placeholder="${T('Type a name or keyword')}"></label>
  </div>
  ${state.saved.length ? `<p class="saved-line">${state.saved.length} ${T('saved')} · <button data-action="clear-saved">${T('Clear saved')}</button></p>` : ''}
  <div class="scheme-list">
    ${list.length ? list.map(s => `<article class="scheme card">
      <span class="status-chip">${T(s.type)}</span>
      <h2>${T(s.name)}</h2>
      <p>${T(s.why)}</p>
      <div class="scheme-meta"><b>${s.amount}</b><small>${T(s.level)} · ${T(s.state)}</small></div>
      <div class="inline-actions">
        <button data-action="details" data-id="${s.id}">${T('View details')}</button>
        <button data-action="save-scheme" data-id="${s.id}">${state.saved.includes(s.id) ? T('Saved') : T('Save')}</button>
      </div>
    </article>`).join('') : `<p class="empty">${T('No schemes match your search.')}</p>`}
  </div>`;
}

function eligibilityView() {
  const e = state.eligible;
  return `<h1>${T(L().eligibility)}</h1><p class="view-sub">${T('Answer three questions to see fictional matches.')}</p>
  <form class="form-grid card" id="elig-form">
    <label class="ref">${T('Level of study')}
      <select name="level"><option value="">${T('Select')}</option>${['School', 'Undergraduate', 'Postgraduate'].map(l => `<option>${l}</option>`).join('')}</select></label>
    <label class="ref">${T('Domicile state')}
      <select name="dstate"><option value="">${T('Select')}</option>${['All India', 'Uttar Pradesh', 'Madhya Pradesh', 'Tamil Nadu', 'Bihar'].map(l => `<option>${l}</option>`).join('')}</select></label>
    <label class="ref">${T('Category')}
      <select name="cat"><option value="">${T('Select')}</option>${['All', 'SC', 'OBC', 'Minority', 'General'].map(l => `<option>${l}</option>`).join('')}</select></label>
    <label class="ref">${T('Family income')}
      <select name="inc"><option value="">${T('Select')}</option>${['Any income', 'Under ₹2.5L', 'Under ₹3L', 'Under ₹4L', 'Under ₹5L'].map(l => `<option>${l}</option>`).join('')}</select></label>
    <button class="button" type="submit">${T('Check eligibility')}</button>
  </form>
  ${e ? `<div class="matches"><div class="section-title">${e.length} ${T('matches')}</div>
    ${e.length ? e.map(s => `<article class="card"><span class="status-chip good">${T('Eligible (demo)')}</span><h3>${T(s.name)}</h3><p>${T(s.why)}</p><small>${T(s.level)} · ${T(s.category)} · ${s.amount}</small><div class="inline-actions" style="margin-top:12px"><button data-action="details" data-id="${s.id}">${T('View details')}</button><button data-action="save-scheme" data-id="${s.id}">${state.saved.includes(s.id) ? T('Saved') : T('Save')}</button></div></article>`).join('') : `<p class="empty">${T('No fictional match. Try different answers.')}</p>`}</div>` : ''}`;
}

function trackerView() {
  const st = appStates[state.appState];
  const step = st.step;
  return `<h1>${T(L().tracker)}</h1>
  <p class="ref"><b>${T('Referral no.')}</b> ${profileData.ref}</p>
  <section class="track-card card">
    <div class="status-hero-top"><span class="q-label">${T('Current status')}</span><span class="status-chip ${state.appState === 'defect' ? 'warning' : state.appState === 'paid' ? 'good' : ''}">${T(st.chip)}</span></div>
    <h2>${T(st.label)}</h2>
    <div class="meaning-grid">
      <article><b>${T('What this means')}</b><span>${T(st.meaning)}</span></article>
      <article><b>${T('Action')}</b><span>${T(st.action)}</span></article>
      <article><b>${T('Responsibility')}</b><span>${T(st.owner)}</span></article>
      <article><b>${T('Next step')}</b><span>${T(st.next)}</span></article>
    </div>
  </section>
  <div class="section-title">${T('Timeline')}</div>
  <ol class="app-timeline">
    ${timeline.map((t, i) => {
      const n = i + 1;
      const cls = n < step ? 'done' : n === step ? 'current' : '';
      return `<li class="${cls}"><i class="stage-dot">${n < step ? '&#10003;' : n}</i><span><span class="stage-no">${T('Stage')} ${n}/5</span><span class="stage-name">${T(t.name)}</span><span class="stage-note">${T(t.note)}</span></span></li>`;
    }).join('')}
  </ol>
  <div class="inline-actions" style="margin-top:20px">
    ${state.appState === 'defect' ? `<button class="button" data-action="resubmit">${T('Simulate resubmission')}</button>` : ''}
    ${step > 1 && step < 5 ? `<button data-action="advance">${T('Advance status (demo)')}</button>` : ''}
    ${state.appState === 'paid' ? `<span class="success-note">${T('Journey complete.')}</span>` : ''}
  </div>`;
}

function documentsView() {
  const done = state.docs.length;
  return `<h1>${T(L().documents)}</h1><p class="view-sub">${T('Tick each item when it is ready. Demo only — no files are uploaded or stored.')}</p>
  <div class="doc-list">
    ${docs.map(d => `<label class="doc-item card"><input type="checkbox" data-doc="${d}" ${state.docs.includes(d) ? 'checked' : ''}><span><b>${state.docs.includes(d) ? T('Ready') : T('Pending')}</b><strong>${T(d)}</strong><small>${T('Tap to mark as ready')}</small></span></label>`).join('')}
  </div>
  <p class="saved-line">${done}/${docs.length} ${T('items ready')}</p>
  <input type="file" class="hidden" aria-hidden="true" tabindex="-1">
  <button class="button capture-fab" data-action="capture">${T('Capture document (demo)')}</button>`;
}

function paymentView() {
  const paid = state.pay === 'paid';
  const steps = [['Amount sanctioned', true], ['PFMS processing', !paid], ['Credited to bank ••••4821', paid]];
  return `<h1>${T(L().payment)}</h1><p class="view-sub">${T('Simulated disbursement. No real money moves.')}</p>
  <section class="payment-card card">
    <span class="q-label">${T('Sanctioned amount')}</span>
    <strong data-count="5750">₹5,750</strong>
    <code>REF ${profileData.ref} · ${T('Post-Matric Progress Grant')}</code>
    <p>${paid ? T('The fictional scholarship payment was marked as credited.') : T('Payment is being processed by the demo pipeline.')}</p>
    <div class="payment-steps">
      ${steps.map(([s, d], i) => `<div class="${d ? 'done' : ''}"><i>${d ? '&#10003;' : i + 1}</i><span>${T(s)}</span></div>`).join('')}
    </div>
    ${!paid ? `<button class="button" style="margin-top:14px" data-action="pay-now">${T('Simulate payment credit')}</button>` : `<span class="success-note">${T('Payment complete.')}</span>`}
  </section>`;
}

function helpView() {
  return `<h1>${T(L().help)}</h1><p class="view-sub">${T('Answers about this demo prototype.')}</p>
  <div class="faq">
    ${faqs.map((f, i) => `<article class="card"><button aria-expanded="${state.faq === i}" data-action="faq" data-id="${i}"><span>${T(f[0])}</span><span aria-hidden="true">+</span></button>${state.faq === i ? `<p>${T(f[1])}</p>` : ''}</article>`).join('')}
  </div>
  <section class="grievance card">
    <h2>${T('Raise an issue')}</h2>
    <p>${T('Demo only — nothing is submitted anywhere.')}</p>
    ${state.grievance ? `<p class="success-note">${T('Thank you. Your demo grievance was noted locally.')}</p>` : `
    <form id="griev-form"><label>${T('Describe your issue')}<textarea name="msg" required placeholder="${T('Example: my verification has been pending for 3 weeks')}"></textarea></label><button class="button danger" type="submit">${T('Submit grievance')}</button></form>`}
  </section>
  <p class="official-reminder">${T('For real grievances use the official NSP portal contact channels.')}</p>`;
}

function institutesView() {
  return `<h1>${T(L().institutes)}</h1><p class="view-sub">${T('Fictional institutions for demonstration.')}</p>
  <div class="institute-list">
    ${institutes.map(([name, st, city]) => `<article class="institute card"><b>${name}</b><span>${T(st)} · ${city}</span><span class="status-chip good">${T('Verified (demo)')}</span></article>`).join('')}
  </div>`;
}

function deadlinesView() {
  const now = new Date();
  return `<h1>${T(L().deadlines)}</h1><p class="view-sub">${T('Confirm all dates at the official NSP source.')}</p>
  <div class="deadline-list">
    ${deadlines.map(([name, sub, date, tone]) => {
      const past = new Date(date + 'T00:00:00') < now;
      const d = new Date(date + 'T00:00:00');
      return `<article class="deadline card ${past ? 'past' : ''} ${tone ? '' : ''}">
        <span class="date-box"><b>${d.getDate()}</b><span>${d.toLocaleDateString('en-IN', { month: 'short' })}</span></span>
        <div><b>${T(name)}</b><small>${T(sub)} · ${dfmt(date)}</small></div>
        ${tone ? `<span class="status-chip warning">${T('Near')}</span>` : ''}
      </article>`;
    }).join('')}
  </div>`;
}

function notificationsView() {
  const filters = [['all', 'All'], ['warn', 'Warning'], ['danger', 'Urgent'], ['good', 'Good news'], ['info', 'Updates']];
  const list = notifications.map((n, i) => [...n, i]);
  const shown = list.filter(n => state.notifFilter === 'all' || n[3] === state.notifFilter);
  return `<h1>${T(L().notifications)}</h1>
  <div class="notif-filters">${filters.map(([v, l]) => `<button data-notif-filter="${v}" class="${state.notifFilter === v ? 'active' : ''}">${T(l)}</button>`).join('')}</div>
  <div class="notif-list">
    ${shown.map(([title, body, when, tone, i]) => {
      const read = state.readNotifs.includes(i);
      return `<article class="notif card ${tone} ${read ? 'read' : ''}"><button class="notif-dot" aria-label="${T('Mark as read')}" data-notif="${i}"></button><div><b>${T(title)}</b><p>${T(body)}</p><small>${when}</small></div></article>`;
    }).join('')}
  </div>`;
}

function profileView() {
  const rows = [['Reference no.', profileData.ref], ['Level', profileData.level], ['College', profileData.college], ['Category', profileData.category], ['Income', profileData.income], ['Disability', profileData.disability], ['Bank', profileData.bank], ['Aadhaar', profileData.aadhaar]];
  return `<h1>${T(L().profile)}</h1>
  <section class="profile-card card"><span class="avatar">MK</span><div><h2>${profileData.name}</h2><small>${T('Demo profile, fictional person')}</small></div></section>
  <div class="detail-grid">${rows.map(([k, v]) => `<article><b>${T(k)}</b><span>${v.includes('Verified') ? v.replace('Verified', T('Verified')) : T(v) === v ? v : T(v)}</span></article>`).join('')}</div>
  <p class="official-reminder">${T('All personal data in this demo is fictional and stored only in your browser.')}</p>`;
}

function insightsView() {
  const bars = [['Documents ready', (state.docs.length / docs.length) * 100, `${state.docs.length}/${docs.length}`], ['Journey progress', (appStates[state.appState].step / 5) * 100, `${appStates[state.appState].step}/5`], ['Schemes saved', (state.saved.length / schemes.length) * 100, `${state.saved.length}/${schemes.length}`]];
  return `<h1>${T(L().insights)}</h1><p class="view-sub">${T('A local summary of your demo progress.')}</p>
  <div class="stat-grid">
    <article class="stat card" style="background:var(--green-soft)"><b>${state.saved.length}</b><span>${T('Saved schemes')}</span></article>
    <article class="stat card" style="background:var(--terra-soft)"><b>${state.readNotifs.length}/${notifications.length}</b><span>${T('Alerts read')}</span></article>
  </div>
  <div class="section-title">${T('Progress')}</div>
  <div class="bars">${bars.map(([l, v, n]) => `<div class="bar-row"><span>${T(l)}</span><span class="bar-track"><i class="bar-fill" style="width:${Math.min(100, v)}%"></i></span><span>${n}</span></div>`).join('')}</div>`;
}

function settingsView() {
  const s = state.settings;
  const rows = [['reminders', 'Deadline reminders', 'Show alerts before dates'], ['status', 'Status updates', 'Notify when the stage changes'], ['schemes', 'New scheme matches', 'Suggest fictional schemes']];
  return `<h1>${T(L().settings)}</h1>
  <section class="settings-list card">
    ${rows.map(([k, t, d]) => `<div class="setting-row"><div><b>${T(t)}</b><small>${T(d)}</small></div><input type="checkbox" aria-label="${T(t)}" data-setting="${k}" ${s[k] ? 'checked' : ''}></div>`).join('')}
    <div class="setting-row"><div><b>${T('Language')}</b><small>${T('English or Hindi')}</small></div><button data-action="lang">${state.lang === 'en' ? 'हिन्दी' : 'English'}</button></div>
    <div class="setting-row"><div><b>${T('Text size')}</b><small>${T('Larger or smaller text')}</small></div><button data-action="size">${state.size === 0 ? 'A' : state.size === 1 ? 'A−' : 'A+'}</button></div>
    <div class="setting-row"><div><b>${T('Dark mode')}</b><small>${T('Easier on the eyes at night')}</small></div><input type="checkbox" aria-label="${T('Dark mode')}" data-setting="dark" ${dark() ? 'checked' : ''}></div>
  </section>
  <section class="danger-zone card">
    <b>${T('Reset demo data')}</b>
    <p>${T('Clears saved schemes, documents, language and preferences from this browser.')}</p>
    <button class="button danger" data-action="reset">${T('Clear all demo data')}</button>
  </section>`;
}

const views = { dashboard: dashboardView, find: findView, eligibility: eligibilityView, tracker: trackerView, documents: documentsView, payment: paymentView, help: helpView, institutes: institutesView, deadlines: deadlinesView, notifications: notificationsView, profile: profileView, insights: insightsView, settings: settingsView };

/* ---------- render shell ---------- */
function render() {
  document.documentElement.lang = state.lang;
  document.body.classList.toggle('dark', dark() && state.tab !== 'landing');
  state.settings.lang = state.lang;
  if (state.tab === 'landing') { app.innerHTML = landingView() + `<div id="toast" role="status"></div>`; return; }
  const view = (views[state.tab] || dashboardView)();
  const sizeCls = state.size === 1 ? 'size-1' : state.size === -1 ? 'size--1' : '';
  app.innerHTML = `<div class="portal ${dark() ? 'dark' : ''} ${sizeCls}">
    <div class="shell">
      <header class="portal-head">
        <div class="portal-brand"><span>${T('Scholarship Navigator')}</span><small>${T('Demo Prototype')}</small></div>
        <div class="utility">
          <button data-action="size" aria-label="${T('Text size')}">${state.size === 0 ? 'A' : state.size === 1 ? 'A−' : 'A+'}</button>
          <button data-action="lang" aria-label="${T('Language')}">${state.lang === 'en' ? 'हिन्दी' : 'EN'}</button>
          <button data-action="dark" aria-label="${T('Dark mode')}">${dark() ? T('Light') : T('Dark')}</button>
        </div>
      </header>
      <nav class="tabs" aria-label="${T('Sections')}">${tabs.map(t => `<button data-tab="${t}" class="${state.tab === t ? 'active' : ''}">${T(L()[t])}</button>`).join('')}</nav>
      <main class="portal-main">${view}</main>
      <footer>${T('Scholarship Navigator — independent demo. Fictional data only.')} <button class="text-link" data-tab="landing">${T('Exit to cover page')}</button></footer>
    </div>
    ${sheetHTML()}
    <div id="toast" role="status"></div>
  </div>`;
  const counter = document.querySelector('[data-count]');
  if (counter && window.NspMotion) NspMotion.count(counter, 5750);
  if (window.NspMotion) NspMotion.reveal(app);
}

/* ---------- actions ---------- */
function applyEligibility(f) {
  const { level, dstate, cat, inc } = f;
  if (!level || !cat) { toast(T('Choose a level and category first.')); return; }
  state.eligible = schemes.filter(s =>
    s.level === level &&
    (s.state === 'All India' || s.state === dstate || dstate === 'All India' || !dstate) &&
    (s.category === 'All' || s.category === cat) &&
    (s.income === 'Any income' || !inc || s.income === inc)
  );
  toast(T(`${state.eligible.length} fictional matches found.`));
}

function resetData() {
  ['sn-saved', 'sn-docs', 'sn-lang', 'sn-dark'].forEach(k => localStorage.removeItem(k));
  Object.assign(state, { tab: 'landing', lang: 'en', saved: [], docs: [], appState: 'defect', pay: 'processing', faq: null, grievance: false, eligible: null, detail: null, readNotifs: [], notifFilter: 'all', settings: { reminders: true, status: true, schemes: false, lang: 'en' } });
  render();
}

app.addEventListener('click', e => {
  const el = e.target.closest('[data-tab],[data-action],[data-notif],[data-notif-filter]');
  if (!el) return;
  if (el.dataset.tab) {
    state.tab = el.dataset.tab; state.detail = null;
    if (el.dataset.tab === 'landing') render();
    else if (!views[el.dataset.tab]) render();
    else render();
    window.scrollTo(0, 0);
    return;
  }
  const a = el.dataset.action;
  if (a === 'lang') { state.lang = state.lang === 'en' ? 'hi' : 'en'; save(); render(); }
  else if (a === 'dark') { localStorage.setItem('sn-dark', dark() ? '0' : '1'); render(); }
  else if (a === 'size') { state.size = state.size === 1 ? -1 : state.size === -1 ? 0 : 1; render(); }
  else if (a === 'details') { state.detail = el.dataset.id; render(); }
  else if (a === 'close-sheet' || (a === 'close-overlay' && e.target === el)) { state.detail = null; render(); }
  else if (a === 'save-scheme') {
    const id = el.dataset.id;
    const i = state.saved.indexOf(id);
    if (i >= 0) { state.saved.splice(i, 1); toast(T('Removed from saved.')); }
    else { state.saved.push(id); toast(T('Scheme saved.')); }
    save(); render();
  }
  else if (a === 'clear-saved') { state.saved = []; save(); render(); }
  else if (a === 'apply') { state.detail = null; state.tab = 'tracker'; render(); toast(T('Demo: application flow opened in tracker.')); }
  else if (a === 'faq') { state.faq = state.faq === Number(el.dataset.id) ? null : Number(el.dataset.id); render(); }
  else if (a === 'capture') { const d = docs.find(x => !state.docs.includes(x)); if (d) { state.docs.push(d); save(); render(); toast(T('Document marked ready (demo).')); } else toast(T('All documents are already ready.')); }
  else if (a === 'pay-now') { state.pay = 'paid'; state.appState = 'paid'; render(); toast(T('Demo payment marked as credited.')); }
  else if (a === 'resubmit') { state.appState = 'institute'; render(); toast(T('Document resubmitted (demo).')); }
  else if (a === 'advance') { const order = ['defect', 'institute', 'state', 'sanctioned', 'paid']; state.appState = order[Math.min(order.length - 1, order.indexOf(state.appState) + 1)]; if (state.appState === 'paid') state.pay = 'paid'; render(); toast(T('Status advanced (demo).')); }
  else if (a === 'reset') { resetData(); toast(T('Demo data cleared.')); }
  else if (el.dataset.notif !== undefined) {
    const i = Number(el.dataset.notif);
    state.readNotifs = state.readNotifs.includes(i) ? state.readNotifs.filter(x => x !== i) : [...state.readNotifs, i];
    render();
  }
  else if (el.dataset.notifFilter) { state.notifFilter = el.dataset.notifFilter; render(); }
});

/* keyboard: Escape closes sheet; status hero opens tracker */
document.addEventListener('keydown', e => { if (e.key === 'Escape' && state.detail) { state.detail = null; render(); } });
app.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.status-hero')) { e.preventDefault(); state.tab = 'tracker'; render(); }
});

/* inputs */
app.addEventListener('input', e => {
  if (e.target.dataset.filter === 'find') { findQuery = e.target.value; const main = document.querySelector('.portal-main'); const y = window.scrollY; main.innerHTML = findView(); window.scrollTo(0, y); const input = main.querySelector('[data-filter=find]'); input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
});
app.addEventListener('change', e => {
  if (e.target.dataset.doc) {
    const d = e.target.dataset.doc;
    state.docs = e.target.checked ? [...state.docs, d] : state.docs.filter(x => x !== d);
    save(); render();
  }
  if (e.target.dataset.setting) {
    const k = e.target.dataset.setting;
    if (k === 'dark') { localStorage.setItem('sn-dark', e.target.checked ? '1' : '0'); render(); }
    else { state.settings[k] = e.target.checked; toast(T('Preference saved (demo).')); }
  }
});

/* forms */
app.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.id === 'elig-form') { const f = Object.fromEntries(new FormData(e.target)); applyEligibility(f); render(); if (state.eligible) document.querySelector('.matches')?.scrollIntoView({ behavior: 'smooth' }); }
  if (e.target.id === 'griev-form') { state.grievance = true; render(); toast(T('Demo grievance noted.')); }
});

render();
