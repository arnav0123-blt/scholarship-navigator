# NSP Tracker

NSP Tracker is an independent, mobile-first scholarship-status prototype built with plain HTML, CSS, and JavaScript. It uses only synthetic demo data and is not affiliated with NSP or any government body.

## Design decisions

- **Fast by default:** no framework, webfonts, image downloads, or network calls. The app is small enough to remain useful on constrained connections.
- **Clear status language:** timeline states, chips, progress rings, and the action/responsibility/next-step scan cards make a complex workflow easy to understand at a glance.
- **Purposeful motion:** lightweight CSS and `motion.js` provide short entrance, progress, checkmark, count-up, and attention animations. `prefers-reduced-motion` disables non-essential movement.
- **Accessible interaction:** system fonts, high-contrast indigo and semantic colors, visible focus rings, labels, keyboard-friendly controls, and touch targets of at least 48px are used throughout.
- **Honest demo:** OTP, document compression/upload, SMS, status progression, and disbursement are simulated locally. State persists in `localStorage` for a repeatable judge demo.

Open `index.html` with any static server. No install step is required.
