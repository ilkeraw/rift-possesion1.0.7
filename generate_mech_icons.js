const fs = require('fs');
const path = require('path');

const svgIcons = {
  // True Damage: authentic shattered geometric diamond / blade symbol in glowing neon cyan & white
  'mech-true-damage.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="tdGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#38bdf8" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="28" fill="url(#tdGlow)"/>
  <path d="M32 6 L38 24 L52 24 L41 33 L45 50 L32 40 L19 50 L23 33 L12 24 L26 24 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M32 14 L36 28 L46 28 L38 35 L41 46 L32 39 L23 46 L26 35 L18 28 L28 28 Z" fill="#38bdf8"/>
  <polygon points="32,18 34,26 42,26 36,31 38,40 32,35 26,40 28,31 22,26 30,26" fill="#ffffff"/>
</svg>`,

  // Fear: Terrifying spectral screaming mask / skull with haunting hollow eyes
  'mech-fear.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <filter id="fearGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#a855f7"/>
    </filter>
  </defs>
  <g filter="url(#fearGlow)">
    <path d="M32 4 C18 4 10 16 10 32 C10 44 16 58 20 60 C24 55 26 48 32 48 C38 48 40 55 44 60 C48 58 54 44 54 32 C54 16 46 4 32 4 Z" fill="#1e1b4b" stroke="#c084fc" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="23" cy="26" rx="5" ry="8" fill="#e879f9" transform="rotate(-12 23 26)"/>
    <ellipse cx="41" cy="26" rx="5" ry="8" fill="#e879f9" transform="rotate(12 41 26)"/>
    <circle cx="24" cy="27" r="2.5" fill="#ffffff"/>
    <circle cx="40" cy="27" r="2.5" fill="#ffffff"/>
    <path d="M26 38 C26 34 38 34 38 38 C39 46 37 52 32 52 C27 52 25 46 26 38 Z" fill="#e879f9" stroke="#a855f7" stroke-width="1.5"/>
    <ellipse cx="32" cy="43" rx="3" ry="5" fill="#09090b"/>
  </g>
</svg>`,

  // Silence: Silenced speech bubble crossed out
  'mech-silence.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="26" fill="#18181b" stroke="#93c5fd" stroke-width="2.5"/>
  <path d="M20 20 C15 20 14 24 14 28 C14 36 22 38 24 38 L22 45 L30 40 L44 40 C48 40 50 36 50 28 C50 22 46 20 40 20 Z" fill="none" stroke="#60a5fa" stroke-width="2.8" stroke-linejoin="round"/>
  <line x1="14" y1="50" x2="50" y2="14" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
</svg>`,

  // Charm: Enchanting radiant winged heart
  'mech-charm.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="charmGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f472b6"/>
      <stop offset="100%" stop-color="#db2777"/>
    </radialGradient>
  </defs>
  <path d="M20 32 C12 28 6 18 10 12 C16 12 22 20 22 28 Z" fill="#fbcfe8" opacity="0.8"/>
  <path d="M44 32 C52 28 58 18 54 12 C48 12 42 20 42 28 Z" fill="#fbcfe8" opacity="0.8"/>
  <path d="M32 54 C26 48 12 36 12 24 C12 16 18 11 25 11 C29 11 31 13 32 16 C33 13 35 11 39 11 C46 11 52 16 52 24 C52 36 38 48 32 54 Z" fill="url(#charmGlow)" stroke="#fdf2f8" stroke-width="2.5"/>
  <polygon points="32,22 34,26 39,27 35,30 36,35 32,32 28,35 29,30 25,27 30,26" fill="#ffffff"/>
</svg>`,

  // Taunt: Enraged Spartan war helmet with glowing aggressive glare
  'mech-taunt.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <path d="M30 6 C28 14 26 22 18 26 C26 22 34 16 38 6 Z" fill="#f97316"/>
  <path d="M32 4 C32 14 36 22 46 26 C38 22 36 14 34 4 Z" fill="#ea580c"/>
  <path d="M20 22 C20 14 44 14 44 22 L46 36 L40 40 L40 54 L36 50 L32 56 L28 50 L24 54 L24 40 L18 36 Z" fill="#334155" stroke="#fb923c" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M22 32 L42 32 M32 30 L32 48" stroke="#f97316" stroke-width="3.5" stroke-linecap="round"/>
</svg>`,

  // Suppression: Heavy interlocking iron chains and padlock
  'mech-suppression.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <path d="M10 18 C10 14 16 10 22 14 L42 34 C48 38 42 46 36 44 L16 24 C12 20 10 20 10 18 Z" fill="none" stroke="#94a3b8" stroke-width="3.5"/>
  <path d="M54 18 C54 14 48 10 42 14 L22 34 C16 38 22 46 28 44 L48 24 C52 20 54 20 54 18 Z" fill="none" stroke="#cbd5e1" stroke-width="3.5"/>
  <rect x="22" y="28" width="20" height="18" rx="3" fill="#475569" stroke="#e2e8f0" stroke-width="2"/>
  <path d="M26 28 L26 21 C26 17 38 17 38 21 L38 28" fill="none" stroke="#f8fafc" stroke-width="3" stroke-linecap="round"/>
  <circle cx="32" cy="36" r="2.5" fill="#facc15"/>
  <line x1="32" y1="37" x2="32" y2="41" stroke="#facc15" stroke-width="2"/>
</svg>`,

  // Blind: Eye closed with horizontal slash
  'mech-blind.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <path d="M10 32 C18 18 46 18 54 32 C46 46 18 46 10 32 Z" fill="none" stroke="#64748b" stroke-width="3"/>
  <line x1="8" y1="8" x2="56" y2="56" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
  <circle cx="32" cy="32" r="6" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
</svg>`
};

const iconDir = path.join(__dirname, 'public', 'assets', 'icons');
for (const [file, content] of Object.entries(svgIcons)) {
  fs.writeFileSync(path.join(iconDir, file), content.trim(), 'utf8');
  console.log('Created icon:', file);
}
