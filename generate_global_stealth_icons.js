const fs = require('fs');
const path = require('path');

const icons = {
  // Global Ult: Stylized orbital targeting reticle over globe / crosshairs
  'mech-global-ult.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="globalGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Background glow -->
  <circle cx="32" cy="32" r="26" fill="url(#globalGlow)"/>
  <!-- World Globe Grid Lines -->
  <circle cx="32" cy="32" r="22" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
  <ellipse cx="32" cy="32" rx="11" ry="22" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 2"/>
  <line x1="10" y1="32" x2="54" y2="32" stroke="#38bdf8" stroke-width="1.5"/>
  <line x1="32" y1="10" x2="32" y2="54" stroke="#38bdf8" stroke-width="1.5"/>
  <!-- Orbital Crosshair / Global Targeting Rings -->
  <circle cx="32" cy="32" r="16" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
  <circle cx="32" cy="32" r="5" fill="#f43f5e"/>
  <!-- Crosshair Pointer Ticks -->
  <line x1="32" y1="4" x2="32" y2="12" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
  <line x1="32" y1="52" x2="32" y2="60" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
  <line x1="4" y1="32" x2="12" y2="32" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
  <line x1="52" y1="32" x2="60" y2="32" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
  <!-- Center Bullseye Flash -->
  <circle cx="32" cy="32" r="2" fill="#ffffff"/>
</svg>`,

  // Stealth: Stylized ninja cowl / cloaking eye fading into smoke shadows
  'mech-stealth.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="smokeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#3b0764" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="28" fill="url(#smokeGlow)"/>
  <!-- Smoke haze / shadow veil wisps -->
  <path d="M12 40 C18 48 30 52 42 46 C52 42 56 34 50 24" fill="none" stroke="#9333ea" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 3"/>
  <path d="M50 20 C42 12 26 14 16 22 C8 28 8 38 18 44" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 3"/>
  <!-- Cloaked Shadow Eye / Invisibility Gaze -->
  <path d="M14 32 Q32 16 50 32 Q32 48 14 32 Z" fill="#09090b" stroke="#c084fc" stroke-width="2.5"/>
  <!-- Disappearing / Dashed iris indicating optical camouflage -->
  <ellipse cx="32" cy="32" rx="9" ry="9" fill="none" stroke="#e879f9" stroke-width="2.5" stroke-dasharray="6 3"/>
  <!-- Slit pupil glowing from the shadows -->
  <ellipse cx="32" cy="32" rx="3.5" ry="6" fill="#f43f5e"/>
  <circle cx="32" cy="32" r="1.5" fill="#ffffff"/>
</svg>`
};

const iconDir = path.join(__dirname, 'public', 'assets', 'icons');
for (const [file, content] of Object.entries(icons)) {
  fs.writeFileSync(path.join(iconDir, file), content.trim(), 'utf8');
  console.log('Created icon:', file);
}
