// Builds the design-system screens into ./designs/*.html
// Shared head = fonts + Material Symbols + Tailwind CDN + brand config + clay utilities
const fs = require('fs');
const path = require('path');

const HEAD = `<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>{TITLE}</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
tailwind.config={darkMode:"class",theme:{extend:{
colors:{"surface-tint":"#494bd6","surface-bright":"#f8f9ff","surface-container-lowest":"#ffffff","on-secondary":"#ffffff","surface-variant":"#d5e3fc","surface":"#f8f9ff","on-primary":"#ffffff","on-secondary-fixed":"#2a1700","tertiary-fixed":"#6ffbbe","surface-container-low":"#eff4ff","secondary":"#855300","secondary-container":"#fea619","on-error":"#ffffff","error-container":"#ffdad6","on-surface":"#0d1c2e","tertiary-fixed-dim":"#4edea3","on-tertiary":"#ffffff","on-secondary-fixed-variant":"#653e00","surface-dim":"#ccdbf3","background":"#f8f9ff","on-tertiary-fixed":"#002113","on-tertiary-container":"#000703","inverse-surface":"#233144","primary-fixed-dim":"#c0c1ff","primary-fixed":"#e1e0ff","outline":"#767586","on-tertiary-fixed-variant":"#005236","outline-variant":"#c7c4d7","tertiary":"#006c49","on-primary-fixed-variant":"#2f2ebe","secondary-fixed":"#ffddb8","on-surface-variant":"#464554","surface-container":"#e6eeff","on-primary-fixed":"#07006c","inverse-on-surface":"#eaf1ff","on-secondary-container":"#684000","surface-container-highest":"#d5e3fc","on-background":"#0d1c2e","error":"#ba1a1a","on-error-container":"#93000a","secondary-fixed-dim":"#ffb95f","tertiary-container":"#00885d","primary-container":"#6063ee","surface-container-high":"#dce9ff","inverse-primary":"#c0c1ff","on-primary-container":"#fffbff"},
borderRadius:{DEFAULT:"1rem",lg:"2rem",xl:"3rem",full:"9999px"},
spacing:{"gutter":"16px","container-margin-mobile":"20px","touch-target-min":"48px","container-margin-desktop":"40px","unit":"8px"},
fontFamily:{"label-bold":["Plus Jakarta Sans"],"display-lg":["Plus Jakarta Sans"],"title-md":["Plus Jakarta Sans"],"body-md":["Plus Jakarta Sans"],"body-lg":["Plus Jakarta Sans"],"headline-lg-mobile":["Plus Jakarta Sans"],"headline-lg":["Plus Jakarta Sans"]},
fontSize:{"label-bold":["14px",{lineHeight:"20px",fontWeight:"700"}],"display-lg":["40px",{lineHeight:"48px",letterSpacing:"-0.02em",fontWeight:"800"}],"title-md":["20px",{lineHeight:"28px",fontWeight:"600"}],"body-md":["16px",{lineHeight:"24px",fontWeight:"400"}],"body-lg":["18px",{lineHeight:"28px",fontWeight:"400"}],"headline-lg-mobile":["28px",{lineHeight:"36px",fontWeight:"700"}],"headline-lg":["32px",{lineHeight:"40px",letterSpacing:"-0.01em",fontWeight:"700"}]}
}}};
</script>
<style>
{CLAY}
</style>
<style>body{min-height:max(884px,100dvh)}</style>
</head>`;

const CLAY = `
.clay-surface{background:linear-gradient(145deg,#ffffff,#f8f9ff);box-shadow:inset 4px 4px 8px #ffffff,inset -4px -4px 8px #d5e3fc,8px 8px 16px rgba(70,72,212,.05),-8px -8px 16px rgba(255,255,255,.8)}
.clay-card{background:linear-gradient(145deg,#ffffff,#f8f9ff);box-shadow:inset 2px 2px 5px rgba(255,255,255,.8),inset -2px -2px 5px rgba(213,227,252,.5),8px 8px 16px rgba(13,28,46,.05),-8px -8px 16px rgba(255,255,255,.8)}
.clay-card.selected{background-color:#fff;border:2px solid #4648d4;box-shadow:inset 6px 6px 12px #d5e3fc,inset -6px -6px 12px #fff}
.clay-btn-primary,.clay-button-primary,.clay-btn{background:linear-gradient(145deg,#6063ee,#4648d4);color:#fff;box-shadow:inset 2px 2px 5px rgba(255,255,255,.4),inset -2px -2px 5px rgba(0,0,0,.1),6px 6px 12px rgba(70,72,212,.2),-6px -6px 12px rgba(255,255,255,.8);transition:all .2s ease}
.clay-btn-primary:active,.clay-button-primary:active,.clay-btn:active:not(:disabled){box-shadow:inset 4px 4px 8px rgba(0,0,0,.2),inset -4px -4px 8px rgba(255,255,255,.2);transform:scale(.98)}
.clay-btn:disabled{background:#c7c4d7;box-shadow:none;cursor:not-allowed;color:#767586}
.clay-btn-secondary{background-color:#f8f9ff;border:2px solid #c7c4d7;box-shadow:inset 2px 2px 4px rgba(255,255,255,.8),inset -2px -2px 4px #d5e3fc,0 4px 8px rgba(0,0,0,.05)}
.clay-btn-secondary:active{box-shadow:inset 4px 4px 8px #d5e3fc,inset -4px -4px 8px rgba(255,255,255,.8);transform:translateY(2px)}
.clay-input{box-shadow:inset 4px 4px 8px rgba(0,0,0,.05),inset -4px -4px 8px rgba(255,255,255,.8);border:none;background-color:#f8f9ff}
.clay-input:focus{outline:none;box-shadow:inset 6px 6px 12px rgba(73,75,214,.1),inset -6px -6px 12px rgba(255,255,255,.9)}
.clay-upload-area{background:#f8f9ff;border:2px dashed #c7c4d7;box-shadow:inset 4px 4px 8px rgba(213,227,252,.5),inset -4px -4px 8px rgba(255,255,255,.8)}
.clay-upload-area:hover{border-color:#6063ee;background:#eff4ff}
.clay-badge{box-shadow:inset 2px 2px 4px rgba(255,255,255,.4),inset -2px -2px 4px rgba(0,0,0,.1)}
.radio-chip-input:checked+.radio-chip-label{background-color:#6063ee;color:#fffbff;box-shadow:inset 2px 2px 5px rgba(0,0,0,.1);border-color:transparent}
.step-indicator-active{background-color:#fea619;box-shadow:0 0 15px #fea619;color:#0d1c2e}
.step-indicator-inactive{background-color:#d5e3fc;color:#464554;box-shadow:inset 2px 2px 4px rgba(0,0,0,.1)}
.timeline-line{position:absolute;left:15px;top:32px;bottom:-16px;width:2px;background-color:#d5e3fc;z-index:0}
.step-circle{position:relative;z-index:1;box-shadow:inset 2px 2px 4px #fff,inset -2px -2px 4px #d5e3fc,2px 2px 6px rgba(73,75,214,.15)}
.step-active-glow{box-shadow:0 0 15px rgba(73,75,214,.4)}
`;

const page = (title, body) => HEAD.replace('{TITLE}', title).replace('{CLAY}', CLAY) + '\n' + body + '\n</body></html>\n';

const designs = {
  'home.html': { title: 'National Scholarship Portal - Home', body: HOME_BODY },
  'eligibility.html': { title: 'NSP - Eligibility Checker', body: ELIG_BODY },
  'application-form.html': { title: 'NSP - Application Form Step 2', body: FORM_BODY },
  'documents.html': { title: 'Upload Your Documents - NSP', body: DOCS_BODY },
  'status.html': { title: 'Track Your Application - NSP', body: STATUS_BODY },
  'success.html': { title: 'Application Submitted - Scholarship Portal', body: SUCCESS_BODY },
};

fs.mkdirSync('designs', { recursive: true });
for (const [file, { title, body }] of Object.entries(designs)) {
  fs.writeFileSync(path.join('designs', file), page(title, body));
  console.log('wrote designs/' + file);
}

const HOME_BODY = `
<body class="font-body-md min-h-screen flex flex-col pb-24 md:pb-0">
<header class="w-full top-0 sticky z-40 bg-surface shadow-[inset_4px_4px_8px_#ffffff,inset_-4px_-4px_8px_#d5e3fc]">
<div class="flex justify-between items-center px-gutter py-unit w-full max-w-7xl mx-auto min-h-[64px]">
<div class="flex items-center gap-4">
<button class="w-12 h-12 flex items-center justify-center rounded-full hover:opacity-80 transition-opacity active:scale-95 duration-200"><span class="material-symbols-outlined text-primary text-[24px]">arrow_back</span></button>
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary font-extrabold tracking-tight">Scholarship Portal</h1>
</div>
<nav class="hidden md:flex items-center gap-2">
<a class="px-4 py-2 flex items-center justify-center bg-primary-container text-on-primary-container rounded-xl font-bold shadow-[4px_4px_10px_rgba(73,75,214,0.2)]" href="#"><span class="font-label-bold text-label-bold">Home</span></a>
<a class="px-4 py-2 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors rounded-xl" href="#"><span class="font-label-bold text-label-bold">Apply</span></a>
<a class="px-4 py-2 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors rounded-xl" href="#"><span class="font-label-bold text-label-bold">Status</span></a>
<a class="px-4 py-2 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors rounded-xl" href="#"><span class="font-label-bold text-label-bold">Profile</span></a>
</nav>
<button class="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-variant hover:opacity-80 transition-opacity active:scale-95"><img alt="Student Profile Photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAY-V3BAKI0idcnZmOR0Lzh2s9Bf3vAElLWM7fhFyoNMxL9WffpdUj1pZKg0pEUko6SHL7if_tO5WQLYojutHrqAb-vLng2rJK7NbzbaUN84ucWqY1vZ_mYA0sAral6AxgTaxTQn8KPX5qeSpaDvGy7fgv0oQ0Ihe_VMurx-oezDo00tuaowmKowV-pGZ6q3qdNV_8ByEufSd-RdUrSM-dSBZ9wQW5I5Z6KphoYJWJIyfsfmVE8V4"/></button>
</div>
</header>
<main class="flex-grow flex flex-col items-center w-full px-container-margin-mobile md:px-container-margin-desktop py-8 max-w-7xl mx-auto space-y-12">
<section class="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
<div class="flex-1 flex flex-col items-start space-y-6">
<h2 class="font-display-lg text-display-lg text-on-surface">Unlock Your Future with NSP</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-lg">Discover and apply for scholarships designed for Indian students. Modern, simple, and 100% accessible.</p>
<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
<button class="clay-button-primary min-h-touch-target-min px-8 rounded-full flex items-center justify-center gap-2 text-on-primary font-label-bold text-label-bold"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">search</span>Check Eligibility</button>
<button class="min-h-touch-target-min px-8 rounded-full flex items-center justify-center gap-2 text-primary font-label-bold text-label-bold border-2 border-outline-variant hover:bg-surface-container-low transition-colors active:scale-95"><span class="material-symbols-outlined">description</span>Start Application</button>
</div>
</div>
<div class="flex-1 w-full max-w-md aspect-square rounded-3xl clay-surface overflow-hidden flex items-center justify-center p-4"><img alt="Education Illustration" class="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ePEGFOvBR056iyViJwCtDoU4c7MOvB0ijNl2ifjhDsXMnYgtDauI8y-s-E-yKQ9BWCLO3kgn9Y6FEkuBdPir9bN7sdnyXq6mxTOLprUndMwCr34ZTeWZcHmSVwWHY7mmkJ03NuqO11NcsOzpU6D1ireoXmlgKuRlpXsmDYfKfzq-qSE1Qll67s9fIfqSAE8sUfelROfpynPjdejWHAPdv1icNlTL3BX0yFf91og73aV_0tt6lcs"/></div>
</section>
<section class="w-full flex flex-col space-y-8 pt-8 border-t border-surface-variant/50">
<h3 class="font-title-md text-title-md text-on-surface text-center w-full">How it works</h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
<div class="clay-surface rounded-2xl p-6 flex flex-col items-center text-center space-y-4"><div class="w-16 h-16 rounded-full bg-primary-container text-primary flex items-center justify-center mb-2"><span class="material-symbols-outlined text-[32px]">search</span></div><h4 class="font-label-bold text-label-bold text-on-surface">Check</h4><p class="font-body-md text-body-md text-on-surface-variant">Find scholarships that match your academic profile.</p></div>
<div class="clay-surface rounded-2xl p-6 flex flex-col items-center text-center space-y-4"><div class="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-2"><span class="material-symbols-outlined text-[32px]">edit</span></div><h4 class="font-label-bold text-label-bold text-on-surface">Apply</h4><p class="font-body-md text-body-md text-on-surface-variant">Submit your application with our guided forms.</p></div>
<div class="clay-surface rounded-2xl p-6 flex flex-col items-center text-center space-y-4"><div class="w-16 h-16 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-2"><span class="material-symbols-outlined text-[32px]">location_on</span></div><h4 class="font-label-bold text-label-bold text-on-surface">Track</h4><p class="font-body-md text-body-md text-on-surface-variant">Monitor your status until disbursement.</p></div>
</div>
</section>
</main>
<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 bg-surface-container-low shadow-[0_-4px_20px_rgba(73,75,214,0.1)] z-50 rounded-t-lg">
<button class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-2 shadow-[4px_4px_10px_rgba(73,75,214,0.2)] active:scale-90 transition-transform duration-150"><span class="material-symbols-outlined mb-1" style="font-variation-settings:'FILL' 1;">home</span><span class="font-label-bold text-label-bold text-[12px]">Home</span></button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-variant transition-colors rounded-xl active:scale-90 duration-150"><span class="material-symbols-outlined mb-1">edit_document</span><span class="font-label-bold text-label-bold text-[12px]">Apply</span></button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-variant transition-colors rounded-xl active:scale-90 duration-150"><span class="material-symbols-outlined mb-1">find_replace</span><span class="font-label-bold text-label-bold text-[12px]">Status</span></button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-variant transition-colors rounded-xl active:scale-90 duration-150"><span class="material-symbols-outlined mb-1">person</span><span class="font-label-bold text-label-bold text-[12px]">Profile</span></button>
</nav>
`;

const ELIG_BODY = `
<body class="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden">
<header class="w-full top-0 sticky bg-surface flex justify-between items-center px-gutter py-unit shadow-[inset_4px_4px_8px_#ffffff,inset_-4px_-4px_8px_#d5e3fc] z-50">
<button class="w-touch-target-min h-touch-target-min flex items-center justify-center text-primary active:scale-95 transition-transform duration-200 hover:opacity-80 rounded-full"><span class="material-symbols-outlined">arrow_back</span></button>
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary truncate max-w-[60%] text-center">See what you qualify for</h1>
<div class="w-touch-target-min h-touch-target-min rounded-full overflow-hidden border-2 border-surface-variant cursor-pointer"><img alt="Student Profile Photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8hLJHNCfJUSUTmsDZ-vN7uHqkALUkLknG22uvtFxzgxyvwOf81Js3xv6hsB18wCGTsJal23jBr0wWWLe7OUcB2rKGuKPTkVoFVce7frq0_fZeiKUlW5JPUjSOV_dkD0sNnRL6PeSFK5NWwiivyxnILt4kIbZeyXLnhe44azugGdCJG1GU4XWhKE98CDGFX6AphBFUuGU35OVgyUEnlqh0c3vpb5x2nJ5hueYxkYr7_l4WrukPRBo"/></div>
</header>
<main class="flex-grow flex flex-col items-center justify-start pt-8 pb-32 px-gutter md:px-container-margin-desktop w-full max-w-4xl mx-auto">
<div class="w-full flex items-center justify-center mb-12 gap-4">
<div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full flex items-center justify-center font-label-bold text-label-bold step-indicator-active">1</div><div class="h-3 w-16 bg-surface-variant rounded-full overflow-hidden shadow-inner hidden sm:block"><div class="h-full bg-secondary-container w-1/2"></div></div></div>
<div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full flex items-center justify-center font-label-bold text-label-bold step-indicator-inactive">2</div><div class="h-3 w-16 bg-surface-variant rounded-full shadow-inner hidden sm:block"></div></div>
<div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full flex items-center justify-center font-label-bold text-label-bold step-indicator-inactive">3</div></div>
</div>
<div class="text-center mb-10 w-full">
<p class="font-label-bold text-label-bold text-primary mb-2 uppercase tracking-wide">Step 1 of 3</p>
<h2 class="font-display-lg text-display-lg text-on-surface mb-4">Tell us about your studies.</h2>
<p class="font-title-md text-title-md text-on-surface-variant max-w-2xl mx-auto">What is your current level of education?</p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mb-12" id="education-options">
<button class="clay-card w-full p-6 flex flex-col items-center justify-center gap-4 min-h-[140px] text-center group option-btn relative" data-value="undergraduate"><div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-fixed transition-colors"><span class="material-symbols-outlined text-[32px] text-primary">school</span></div><span class="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">Undergraduate</span><div class="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center radio-dot"><div class="w-3 h-3 rounded-full bg-primary opacity-0 transition-opacity inner-dot"></div></div></button>
<button class="clay-card w-full p-6 flex flex-col items-center justify-center gap-4 min-h-[140px] text-center group option-btn relative" data-value="postgraduate"><div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-fixed transition-colors"><span class="material-symbols-outlined text-[32px] text-primary">menu_book</span></div><span class="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">Postgraduate</span><div class="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center radio-dot"><div class="w-3 h-3 rounded-full bg-primary opacity-0 transition-opacity inner-dot"></div></div></button>
<button class="clay-card w-full p-6 flex flex-col items-center justify-center gap-4 min-h-[140px] text-center group option-btn relative" data-value="phd"><div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-fixed transition-colors"><span class="material-symbols-outlined text-[32px] text-primary">science</span></div><span class="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">PhD / Research</span><div class="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center radio-dot"><div class="w-3 h-3 rounded-full bg-primary opacity-0 transition-opacity inner-dot"></div></div></button>
<button class="clay-card w-full p-6 flex flex-col items-center justify-center gap-4 min-h-[140px] text-center group option-btn relative" data-value="other"><div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-fixed transition-colors"><span class="material-symbols-outlined text-[32px] text-primary">more_horiz</span></div><span class="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">Other</span><div class="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center radio-dot"><div class="w-3 h-3 rounded-full bg-primary opacity-0 transition-opacity inner-dot"></div></div></button>
</div>
<div class="w-full max-w-3xl flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-auto">
<button class="w-full sm:w-auto h-[56px] px-8 font-title-md text-title-md flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors min-w-[120px]">Back</button>
<button class="clay-btn-primary w-full sm:w-auto h-[56px] px-10 font-title-md text-title-md flex items-center justify-center gap-2 min-w-[200px]" disabled id="next-btn" style="opacity:.5"><span>Next</span><span class="material-symbols-outlined">arrow_forward</span></button>
</div>
</main>
<script>
document.addEventListener('DOMContentLoaded',()=>{
const buttons=document.querySelectorAll('.option-btn');const nextBtn=document.getElementById('next-btn');
buttons.forEach(btn=>{btn.addEventListener('click',()=>{
buttons.forEach(b=>{b.classList.remove('selected');const d=b.querySelector('.inner-dot');if(d)d.style.opacity='0';});
btn.classList.add('selected');const d=btn.querySelector('.inner-dot');if(d)d.style.opacity='1';
nextBtn.removeAttribute('disabled');nextBtn.style.opacity='1';});});});
</script>
`;

const FORM_BODY = `
<body class="bg-background text-on-surface font-body-md min-h-screen flex flex-col antialiased">
<header class="w-full top-0 sticky bg-surface z-50 shadow-[inset_4px_4px_8px_#ffffff,inset_-4px_-4px_8px_#d5e3fc]">
<div class="flex justify-between items-center px-gutter py-unit w-full max-w-4xl mx-auto">
<button aria-label="Go back" class="w-[48px] h-[48px] flex items-center justify-center text-primary hover:opacity-80 active:scale-95 transition-all duration-200 rounded-full"><span class="material-symbols-outlined">arrow_back</span></button>
<h1 class="font-title-md text-title-md text-primary font-bold">Scholarship Portal</h1>
<div class="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-primary-container shadow-sm"><img alt="Student Profile Photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKxKywdMXVDL1vBi-VL6QsEh97sx-2-ToHk0jdCP8hOIjAj9iY4-MUug9-zVWgnQqQNQM9VgjontuwJWCqEywxvrHKGG9O9t7Hz_VIwo0TyKuJe_wjNo0yEFWxhYl3hsTHlvuOxMoQ-d3ulD4XdCCNQKckisj9_UcIittELMrhrLOIEzP9_q5aRY7jQFw4_FR4NFOrKvjGSBEUe0YtQK2w-WNQrnPgwwpdKGGbt340h136Xp6kWIo"/></div>
</div>
</header>
<main class="flex-grow flex flex-col items-center px-gutter py-container-margin-mobile md:py-container-margin-desktop w-full max-w-2xl mx-auto">
<div class="w-full mb-8">
<div class="flex justify-between items-center mb-2"><span class="font-label-bold text-label-bold text-primary">Step 2 of 4</span><span class="font-label-bold text-label-bold text-on-surface-variant">Personal Details</span></div>
<div class="h-[12px] w-full bg-surface-container rounded-full overflow-hidden shadow-inner"><div class="h-full bg-secondary-container rounded-full w-[50%] shadow-[0_2px_4px_rgba(254,166,25,0.4)] transition-all duration-500"></div></div>
<p class="font-body-md text-body-md text-on-surface-variant mt-3 text-center md:text-left">We use these details to find the best scholarships for your region.</p>
</div>
<form class="clay-card rounded-[24px] p-6 w-full space-y-6">
<div class="flex flex-col space-y-2">
<label class="font-label-bold text-label-bold text-on-surface" for="fullName">Full Name (as per Aadhaar)</label>
<div class="relative"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">badge</span><input class="clay-input w-full h-[56px] rounded pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant" id="fullName" placeholder="e.g. Aarav Sharma" required type="text"/></div>
</div>
<div class="flex flex-col space-y-2">
<label class="font-label-bold text-label-bold text-on-surface" for="dob">Date of Birth</label>
<div class="relative"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">calendar_month</span><input class="clay-input w-full h-[56px] rounded pl-12 pr-4 font-body-md text-body-md text-outline" id="dob" required type="date"/></div>
</div>
<div class="flex flex-col space-y-2">
<label class="font-label-bold text-label-bold text-on-surface">Gender</label>
<div class="flex flex-wrap gap-3">
<label class="relative flex-1 min-w-[100px] h-[48px] cursor-pointer"><input class="radio-chip-input sr-only" name="gender" required type="radio" value="male"/><div class="radio-chip-label h-full flex items-center justify-center rounded-lg border-2 border-outline-variant text-on-surface-variant font-label-bold text-label-bold transition-colors">Male</div></label>
<label class="relative flex-1 min-w-[100px] h-[48px] cursor-pointer"><input class="radio-chip-input sr-only" name="gender" type="radio" value="female"/><div class="radio-chip-label h-full flex items-center justify-center rounded-lg border-2 border-outline-variant text-on-surface-variant font-label-bold text-label-bold transition-colors">Female</div></label>
<label class="relative flex-1 min-w-[100px] h-[48px] cursor-pointer"><input class="radio-chip-input sr-only" name="gender" type="radio" value="other"/><div class="radio-chip-label h-full flex items-center justify-center rounded-lg border-2 border-outline-variant text-on-surface-variant font-label-bold text-label-bold transition-colors">Other</div></label>
</div>
</div>
<div class="flex flex-col space-y-2">
<label class="font-label-bold text-label-bold text-on-surface" for="state">Domicile State</label>
<div class="relative"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span><select class="clay-input w-full h-[56px] rounded pl-12 pr-10 font-body-md text-body-md text-on-surface appearance-none" id="state" required><option disabled selected value="">Select your state</option><option value="maharashtra">Maharashtra</option><option value="karnataka">Karnataka</option><option value="delhi">Delhi</option><option value="tamil_nadu">Tamil Nadu</option></select><span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span></div>
</div>
</form>
<div class="w-full flex flex-col md:flex-row gap-4 mt-8">
<button class="w-full md:w-1/3 h-[56px] rounded-full border-2 border-outline text-on-surface font-label-bold text-label-bold hover:bg-surface-container-low transition-colors flex items-center justify-center min-h-[48px]" type="button">Previous Step</button>
<button class="clay-button-primary w-full md:w-2/3 h-[56px] rounded-full font-label-bold text-label-bold flex items-center justify-center gap-2 min-h-[48px]" type="button">Save &amp; Continue<span class="material-symbols-outlined">arrow_forward</span></button>
</div>
</main>
`;

const DOCS_BODY = `
<body class="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
<header class="w-full top-0 sticky bg-surface z-50 shadow-[inset_4px_4px_8px_#ffffff,inset_-4px_-4px_8px_#d5e3fc]">
<div class="flex justify-between items-center px-gutter py-unit w-full max-w-4xl mx-auto">
<button aria-label="Go back" class="w-[48px] h-[48px] flex items-center justify-center text-primary hover:opacity-80 active:scale-95 transition-all duration-200 rounded-full"><span class="material-symbols-outlined">arrow_back</span></button>
<h1 class="font-title-md text-title-md text-primary font-bold">Upload Your Documents</h1>
<div class="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-primary-container shadow-sm"><img alt="Student Profile Photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKxKywdMXVDL1vBi-VL6QsEh97sx-2-ToHk0jdCP8hOIjAj9iY4-MUug9-zVWgnQqQNQM9VgjontuwJWCqEywxvrHKGG9O9t7Hz_VIwo0TyKuJe_wjNo0yEFWxhYl3hsTHlvuOxMoQ-d3ulD4XdCCNQKckisj9_UcIittELMrhrLOIEzP9_q5aRY7jQFw4_FR4NFOrKvjGSBEUe0YtQK2w-WNQrnPgwwpdKGGbt340h136Xp6kWIo"/></div>
</div>
</header>
<main class="flex-grow flex flex-col items-center px-gutter py-container-margin-mobile md:py-container-margin-desktop w-full max-w-2xl mx-auto space-y-8">
<div class="w-full mb-2">
<div class="flex justify-between items-center mb-2"><span class="font-label-bold text-label-bold text-primary">Step 3 of 4</span><span class="font-label-bold text-label-bold text-on-surface-variant">Documents</span></div>
<div class="h-[12px] w-full bg-surface-container rounded-full overflow-hidden shadow-inner"><div class="h-full bg-secondary-container rounded-full w-[75%] shadow-[0_2px_4px_rgba(254,166,25,0.4)]"></div></div>
<p class="font-body-md text-body-md text-on-surface-variant mt-3">Please upload clear scans (PDF or JPG, max 2MB each).</p>
</div>
<div class="clay-card rounded-[24px] p-6 w-full space-y-8">
<div class="flex flex-col space-y-3">
<div class="flex items-center gap-3"><span class="material-symbols-outlined text-primary">badge</span><span class="font-title-md text-title-md text-on-surface">Aadhaar Card</span><span class="ml-auto font-label-bold text-label-bold text-error">*</span></div>
<label class="clay-upload-area rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors min-h-[140px]">
<span class="material-symbols-outlined text-[40px] text-outline">cloud_upload</span>
<span class="font-body-md text-body-md text-on-surface-variant text-center">Drag &amp; drop file here, or <span class="text-primary underline">browse</span></span>
<input accept=".pdf,.jpg,.jpeg,.png" class="sr-only" type="file"/>
</label>
</div>
<div class="flex flex-col space-y-3">
<div class="flex items-center gap-3"><span class="material-symbols-outlined text-primary">receipt_long</span><span class="font-title-md text-title-md text-on-surface">Income Certificate</span></div>
<label class="clay-upload-area rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors min-h-[140px]">
<span class="material-symbols-outlined text-[40px] text-outline">cloud_upload</span>
<span class="font-body-md text-body-md text-on-surface-variant text-center">Drag &amp; drop file here, or <span class="text-primary underline">browse</span></span>
<input accept=".pdf,.jpg,.jpeg,.png" class="sr-only" type="file"/>
</label>
</div>
<div class="flex flex-col space-y-3">
<div class="flex items-center gap-3"><span class="material-symbols-outlined text-primary">school</span><span class="font-title-md text-title-md text-on-surface">Previous Marksheets</span></div>
<label class="clay-upload-area rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors min-h-[140px]">
<span class="material-symbols-outlined text-[40px] text-outline">cloud_upload</span>
<span class="font-body-md text-body-md text-on-surface-variant text-center">Drag &amp; drop file here, or <span class="text-primary underline">browse</span></span>
<input accept=".pdf,.jpg,.jpeg,.png" class="sr-only" type="file"/>
</label>
</div>
</div>
<div class="w-full flex flex-col md:flex-row gap-4 mt-4">
<button class="w-full md:w-1/3 h-[56px] rounded-full border-2 border-outline text-on-surface font-label-bold text-label-bold hover:bg-surface-container-low transition-colors flex items-center justify-center min-h-[48px]" type="button">Save Draft</button>
<button class="clay-button-primary w-full md:w-2/3 h-[56px] rounded-full font-label-bold text-label-bold flex items-center justify-center gap-2 min-h-[48px]" type="button">Continue to Review<span class="material-symbols-outlined">arrow_forward</span></button>
</div>
</main>
`;

const STATUS_BODY = `
<body class="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
<header class="w-full top-0 sticky bg-surface z-50 shadow-[inset_4px_4px_8px_#ffffff,inset_-4px_-4px_8px_#d5e3fc]">
<div class="flex justify-between items-center px-gutter py-unit w-full max-w-4xl mx-auto">
<button aria-label="Go back" class="w-[48px] h-[48px] flex items-center justify-center text-primary hover:opacity-80 active:scale-95 transition-all duration-200 rounded-full"><span class="material-symbols-outlined">arrow_back</span></button>
<h1 class="font-title-md text-title-md text-primary font-bold">Application Status</h1>
<div class="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-primary-container shadow-sm"><img alt="Student Profile Photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKxKywdMXVDL1vBi-VL6QsEh97sx-2-ToHk0jdCP8hOIjAj9iY4-MUug9-zVWgnQqQNQM9VgjontuwJWCqEywxvrHKGG9O9t7Hz_VIwo0TyKuJe_wjNo0yEFWxhYl3hsTHlvuOxMoQ-d3ulD4XdCCNQKckisj9_UcIittELMrhrLOIEzP9_q5aRY7jQFw4_FR4NFOrKvjGSBEUe0YtQK2w-WNQrnPgwwpdKGGbt340h136Xp6kWIo"/></div>
</div>
</header>
<main class="flex-grow flex flex-col items-center px-gutter py-container-margin-mobile md:py-container-margin-desktop w-full max-w-3xl mx-auto space-y-8">
<div class="clay-card rounded-[24px] p-6 w-full flex flex-col sm:flex-row items-center gap-6">
<div class="w-[80px] h-[80px] rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[40px]">school</span></div>
<div class="text-center sm:text-left"><h2 class="font-title-lg text-title-lg text-on-surface mb-1">National Merit Scholarship 2025</h2><p class="font-body-md text-body-md text-on-surface-variant">Application ID: NSP-2025-88412</p></div>
<span class="ml-auto bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-full font-label-bold text-label-bold shadow-sm">In Review</span>
</div>
<section class="clay-card rounded-[24px] p-6 w-full">
<h3 class="font-title-md text-title-md text-on-surface mb-8">Progress Timeline</h3>
<ol class="relative border-l-2 border-outline-variant ml-6 space-y-10">
<li class="ml-8 relative"><div class="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-success ring-4 ring-surface"></div><div class="bg-success-container/30 p-4 rounded-xl"><p class="font-label-bold text-label-bold text-on-surface mb-1">Submitted</p><p class="font-body-md text-body-md text-on-surface-variant">Your application was received on Oct 12, 2025.</p></div></li>
<li class="ml-8 relative"><div class="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-success ring-4 ring-surface"></div><div class="bg-success-container/30 p-4 rounded-xl"><p class="font-label-bold text-label-bold text-on-surface mb-1">Verification</p><p class="font-body-md text-body-md text-on-surface-variant">Documents verified successfully on Oct 15, 2025.</p></div></li>
<li class="ml-8 relative"><div class="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-warning ring-4 ring-surface animate-pulse"></div><div class="bg-warning-container/20 p-4 rounded-xl"><p class="font-label-bold text-label-bold text-on-surface mb-1">Under Review</p><p class="font-body-md text-body-md text-on-surface-variant">The selection committee is currently evaluating your profile.</p></div></li>
<li class="ml-8 relative opacity-50"><div class="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-outline-variant ring-4 ring-surface"></div><div class="p-4 rounded-xl"><p class="font-label-bold text-label-bold text-on-surface mb-1">Approval &amp; Disbursement</p><p class="font-body-md text-body-md text-on-surface-variant">Funds will be transferred directly to your bank account.</p></div></li>
</ol>
</section>
<div class="w-full clay-card rounded-[24px] p-6 flex items-start gap-4">
<span class="material-symbols-outlined text-error text-[28px]">info</span>
<p class="font-body-md text-body-md text-on-surface-variant">If your application remains "In Review" for more than 30 days, please contact the helpdesk with your Application ID.</p>
</div>
<button class="w-full h-[56px] rounded-full border-2 border-outline text-on-surface font-label-bold text-label-bold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 min-h-[48px] mt-2" type="button"><span class="material-symbols-outlined">download</span>Download Acknowledgement Slip</button>
</main>
`;

const SUCCESS_BODY = `
<body class="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
<main class="flex-grow flex flex-col items-center justify-center px-gutter py-12 w-full max-w-xl mx-auto text-center space-y-8">
<div class="w-24 h-24 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center step-active-glow"><span class="material-symbols-outlined text-[48px]" style="font-variation-settings:'FILL' 1;">check_circle</span></div>
<div class="space-y-3"><h1 class="font-display-lg text-display-lg text-on-surface">Application Submitted!</h1><p class="font-title-md text-title-md text-on-surface-variant">Your application for the National Merit Scholarship 2025 has been received.</p></div>
<div class="clay-card rounded-[24px] p-6 w-full"><p class="font-label-bold text-label-bold text-on-surface mb-2">Application ID</p><p class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-wide">NSP-2025-88412</p><p class="font-body-md text-body-md text-on-surface-variant mt-2">Save this ID to track your application status.</p></div>
<div class="w-full flex flex-col sm:flex-row gap-4">
<button class="clay-button-primary w-full sm:w-2/3 h-[56px] rounded-full font-label-bold text-label-bold flex items-center justify-center gap-2 min-h-[48px]" type="button">Track Application<span class="material-symbols-outlined">arrow_forward</span></button>
<button class="w-full sm:w-1/3 h-[56px] rounded-full border-2 border-outline text-on-surface font-label-bold text-label-bold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 min-h-[48px]" type="button"><span class="material-symbols-outlined">download</span>Slip</button>
</div>
</main>
`;
