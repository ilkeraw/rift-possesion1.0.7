const fs = require('fs');
const path = require('path');

const skinSvgs = {
  // HEARTSTEEL: edgy studded metallic diamond heart with wings
  'skin-heartsteel.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="hsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff0055"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <!-- Cyberpunk sharp wings -->
  <polygon points="12,28 4,16 18,22" fill="#ec4899"/>
  <polygon points="52,28 60,16 46,22" fill="#ec4899"/>
  <!-- Sharp faceted steel heart -->
  <polygon points="32,56 14,32 18,16 28,14 32,20 36,14 46,16 50,32" fill="url(#hsGrad)" stroke="#f43f5e" stroke-width="2.5"/>
  <polygon points="32,20 28,14 18,16 24,28 32,32" fill="#fb7185" opacity="0.6"/>
  <polygon points="32,20 36,14 46,16 40,28 32,32" fill="#fda4af" opacity="0.8"/>
  <polygon points="32,32 24,28 14,32 32,56" fill="#be123c"/>
  <polygon points="32,32 40,28 50,32 32,56" fill="#881337"/>
</svg>`,

  // K/DA: sleek crystalline geometric facet crown
  'skin-kda.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="kdaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="50%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
  <!-- Prismatic diamond facet crown -->
  <polygon points="32,8 10,24 16,52 32,60 48,52 54,24" fill="none" stroke="url(#kdaGrad)" stroke-width="3"/>
  <polygon points="32,16 18,28 22,46 32,52 42,46 46,28" fill="url(#kdaGrad)" opacity="0.4"/>
  <polygon points="32,16 18,28 32,36 46,28" fill="#e0e7ff"/>
  <polygon points="18,28 22,46 32,36" fill="#a855f7"/>
  <polygon points="46,28 42,46 32,36" fill="#38bdf8"/>
  <polygon points="22,46 32,52 42,46 32,36" fill="#f43f5e"/>
</svg>`,

  // True Damage: bold geometric diagonal DJ turntable & diamond blade
  'skin-true-damage.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="26" fill="#0f172a" stroke="#22d3ee" stroke-width="3"/>
  <circle cx="32" cy="32" r="18" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="8 4"/>
  <!-- Sharp T / D stylized monogram -->
  <polygon points="18,20 46,20 42,26 35,26 35,46 29,46 29,26 22,26" fill="#ffffff"/>
  <polygon points="38,26 48,26 50,34 46,42 38,42" fill="#22d3ee" opacity="0.8"/>
</svg>`,

  // Spirit Blossom: blooming cherry blossom crest with kanmei/akana petals
  'skin-spirit-blossom.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="sbGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f472b6"/>
      <stop offset="100%" stop-color="#9333ea"/>
    </radialGradient>
  </defs>
  <!-- 5 Petals of Ionian Cherry Blossom -->
  <g fill="url(#sbGrad)" stroke="#fdf2f8" stroke-width="1.5">
    <path d="M32 32 C26 18 20 8 32 4 C44 8 38 18 32 32 Z"/>
    <path d="M32 32 C46 26 56 20 60 32 C56 44 46 38 32 32 Z"/>
    <path d="M32 32 C38 46 44 56 32 60 C20 56 26 46 32 32 Z"/>
    <path d="M32 32 C18 38 8 44 4 32 C8 20 18 26 32 32 Z"/>
    <circle cx="32" cy="32" r="6" fill="#facc15" stroke="#eab308" stroke-width="1"/>
  </g>
</svg>`,

  // Blood Moon: crimson horned oni demon mask / eclipse
  'skin-blood-moon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Blood Moon sphere -->
  <circle cx="32" cy="32" r="26" fill="#450a0a" stroke="#dc2626" stroke-width="3"/>
  <circle cx="28" cy="28" r="22" fill="#991b1b"/>
  <!-- Oni horns and mask marking -->
  <path d="M14 18 Q20 8 26 12 Q24 20 20 24 Z" fill="#ffffff" stroke="#dc2626" stroke-width="1"/>
  <path d="M50 18 Q44 8 38 12 Q40 20 44 24 Z" fill="#ffffff" stroke="#dc2626" stroke-width="1"/>
  <!-- Mask face -->
  <path d="M22 26 L42 26 L38 48 L32 54 L26 48 Z" fill="#ffffff"/>
  <polygon points="26,32 30,34 26,36" fill="#991b1b"/>
  <polygon points="38,32 34,34 38,36" fill="#991b1b"/>
  <polygon points="32,40 28,46 36,46" fill="#dc2626"/>
</svg>`,

  // Star Guardian: gleaming four-pointed celestial star & gold wings
  'skin-star-guardian.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="sgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fbcfe8"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </radialGradient>
  </defs>
  <!-- Golden side wing ornaments -->
  <path d="M12 36 C6 30 8 20 18 24 C14 28 14 34 12 36 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
  <path d="M52 36 C58 30 56 20 46 24 C50 28 50 34 52 36 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
  <!-- 4-pointed radiant Star Guardian emblem -->
  <polygon points="32,4 36,26 58,32 36,38 32,60 28,38 6,32 28,26" fill="url(#sgGrad)" stroke="#facc15" stroke-width="2.5"/>
  <polygon points="32,14 34,28 48,32 34,36 32,50 30,36 16,32 30,28" fill="#ffffff"/>
</svg>`,

  // PROJECT: sharp cybernetic triangular neon orange/red visor HUD
  'skin-project.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Outer metallic cyber hexagon -->
  <polygon points="32,6 54,18 54,46 32,58 10,46 10,18" fill="#0f172a" stroke="#f97316" stroke-width="3"/>
  <!-- Inner cyber triangular core -->
  <polygon points="32,14 50,44 14,44" fill="none" stroke="#ef4444" stroke-width="2.8"/>
  <polygon points="32,24 42,41 22,41" fill="#f97316"/>
  <!-- Center neon dot -->
  <circle cx="32" cy="34" r="3" fill="#ffffff"/>
</svg>`,

  // High Noon: demonic brimstone steer skull with flaming horns
  'skin-high-noon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="hnFire" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="60%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#451a03"/>
    </radialGradient>
  </defs>
  <!-- Longhorn horns -->
  <path d="M12 16 Q8 4 2 8 Q12 18 24 24 Z" fill="#f97316" stroke="#ea580c" stroke-width="1.5"/>
  <path d="M52 16 Q56 4 62 8 Q52 18 40 24 Z" fill="#f97316" stroke="#ea580c" stroke-width="1.5"/>
  <!-- Steer Skull -->
  <path d="M22 22 L42 22 L40 38 L36 54 L28 54 L24 38 Z" fill="url(#hnFire)" stroke="#fed7aa" stroke-width="2"/>
  <!-- Eye sockets burning -->
  <circle cx="28" cy="32" r="3" fill="#ffffff"/>
  <circle cx="36" cy="32" r="3" fill="#ffffff"/>
</svg>`,

  // Coven: sinister horned eclipse raven skull
  'skin-coven.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="26" fill="#18181b" stroke="#7e22ce" stroke-width="2.5"/>
  <!-- Antlers / Horns of the Old Gods -->
  <path d="M20 22 C14 10 8 14 12 6 C16 10 22 14 26 22 Z" fill="#e9d5ff"/>
  <path d="M44 22 C50 10 56 14 52 6 C48 10 42 14 38 22 Z" fill="#e9d5ff"/>
  <!-- Mask with glowing crimson eye -->
  <polygon points="32,18 40,32 32,54 24,32" fill="#581c87" stroke="#c084fc" stroke-width="2"/>
  <circle cx="32" cy="32" r="3.5" fill="#ef4444"/>
</svg>`,

  // Arcana: mystical tarot deck card with golden sun & eye of fate
  'skin-arcana.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Tarot card -->
  <rect x="16" y="8" width="32" height="48" rx="4" fill="#831843" stroke="#facc15" stroke-width="2.5"/>
  <circle cx="32" cy="32" r="10" fill="none" stroke="#facc15" stroke-width="2"/>
  <!-- Eye of Providence -->
  <path d="M24 32 Q32 24 40 32 Q32 40 24 32 Z" fill="#be185d" stroke="#fde047" stroke-width="1.5"/>
  <circle cx="32" cy="32" r="2.5" fill="#ffffff"/>
</svg>`,

  // Dark Star: gravitational black hole event horizon
  'skin-dark-star.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="dsAccretion" cx="50%" cy="50%" r="50%">
      <stop offset="40%" stop-color="#000000"/>
      <stop offset="65%" stop-color="#9333ea"/>
      <stop offset="85%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="32" cy="32" rx="28" ry="14" fill="none" stroke="#c084fc" stroke-width="3" transform="rotate(-25 32 32)"/>
  <circle cx="32" cy="32" r="24" fill="url(#dsAccretion)"/>
  <circle cx="32" cy="32" r="12" fill="#000000" stroke="#f472b6" stroke-width="2"/>
</svg>`,

  // Battle Academia: scholastic golden crest with lightning chevron
  'skin-battle-academia.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <polygon points="32,6 52,18 46,48 32,58 18,48 12,18" fill="#1e3a8a" stroke="#facc15" stroke-width="3"/>
  <path d="M32 14 L42 22 L38 44 L32 50 L26 44 L22 22 Z" fill="#dc2626"/>
  <!-- Lightning bolt -->
  <polygon points="34,18 24,32 32,32 30,44 40,30 32,30" fill="#facc15"/>
</svg>`,

  // Empyrean: neon spectrum prism crown
  'skin-empyrean.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <polygon points="32,8 54,20 54,44 32,56 10,44 10,20" fill="#030712" stroke="#22c55e" stroke-width="2.5"/>
  <path d="M16 32 Q32 12 48 32 Q32 52 16 32 Z" fill="none" stroke="#ec4899" stroke-width="3"/>
  <circle cx="32" cy="32" r="6" fill="#38bdf8"/>
</svg>`,

  // Porcelain: ornate blue and white ceramic lotus
  'skin-porcelain.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="26" fill="#f8fafc" stroke="#2563eb" stroke-width="3"/>
  <path d="M32 12 C24 24 24 36 32 48 C40 36 40 24 32 12 Z" fill="#3b82f6"/>
  <path d="M16 28 C28 28 36 34 48 32 C36 42 28 38 16 28 Z" fill="#60a5fa" opacity="0.8"/>
  <circle cx="32" cy="32" r="4" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
</svg>`,

  // Pool Party: sun, tropical palm, and bright beach umbrella
  'skin-pool-party.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Beach umbrella dome -->
  <path d="M10 36 Q32 10 54 36 Z" fill="#38bdf8"/>
  <path d="M10 36 Q22 20 32 36 Q42 20 54 36 Z" fill="#facc15"/>
  <line x1="32" y1="20" x2="32" y2="56" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
  <!-- Sun rays -->
  <circle cx="48" cy="16" r="6" fill="#f97316"/>
</svg>`,

  // Elderwood: ancient forest spirit branch and glowing rune leaf
  'skin-elderwood.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <path d="M32 6 C16 16 12 36 32 58 C52 36 48 16 32 6 Z" fill="#14532d" stroke="#4ade80" stroke-width="2.5"/>
  <!-- Glowing leaf veins -->
  <line x1="32" y1="12" x2="32" y2="50" stroke="#86efac" stroke-width="2"/>
  <line x1="32" y1="24" x2="22" y2="18" stroke="#86efac" stroke-width="1.8"/>
  <line x1="32" y1="28" x2="42" y2="22" stroke="#86efac" stroke-width="1.8"/>
  <line x1="32" y1="36" x2="22" y2="30" stroke="#86efac" stroke-width="1.8"/>
  <line x1="32" y1="40" x2="42" y2="34" stroke="#86efac" stroke-width="1.8"/>
</svg>`,

  // Dragonslayer: horned dragon head crest with ember scales
  'skin-dragonslayer.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <polygon points="32,6 48,16 56,36 42,42 32,58 22,42 8,36 16,16" fill="#7f1d1d" stroke="#f97316" stroke-width="2.8"/>
  <polygon points="32,16 42,26 36,44 32,50 28,44 22,26" fill="#b91c1c"/>
  <polygon points="32,24 38,32 32,42 26,32" fill="#ea580c"/>
  <circle cx="26" cy="30" r="2" fill="#facc15"/>
  <circle cx="38" cy="30" r="2" fill="#facc15"/>
</svg>`,

  // Sentinel / Ruined: twin blade of Ruination & Sentinel light
  'skin-sentinel-ruined.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Sentinel light (left) -->
  <path d="M32 6 L18 26 L28 28 L14 56 L32 40 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
  <!-- Ruined mist (right) -->
  <path d="M32 6 L46 26 L36 28 L50 56 L32 40 Z" fill="#2dd4bf" stroke="#0f766e" stroke-width="1.5"/>
  <!-- Center sword hilt -->
  <line x1="32" y1="4" x2="32" y2="60" stroke="#ffffff" stroke-width="2.5"/>
</svg>`,

  // Anima Squad: futuristic bunny / cyber beast ears
  'skin-anima-squad.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Cyber rabbit ears -->
  <path d="M22 36 L16 10 C16 6 24 6 26 12 L28 34 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
  <path d="M42 36 L48 10 C48 6 40 6 38 12 L36 34 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
  <!-- Headgear visor -->
  <polygon points="18,36 46,36 42,54 22,54" fill="#0f172a" stroke="#ec4899" stroke-width="2.5"/>
  <line x1="22" y1="44" x2="42" y2="44" stroke="#f472b6" stroke-width="3"/>
</svg>`,

  // Battlecast: industrial red glowing sensor eye with steel casing
  'skin-battlecast.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="26" fill="#18181b" stroke="#52525b" stroke-width="3.5"/>
  <!-- Outer rivets -->
  <circle cx="32" cy="10" r="2" fill="#a1a1aa"/>
  <circle cx="54" cy="32" r="2" fill="#a1a1aa"/>
  <circle cx="32" cy="54" r="2" fill="#a1a1aa"/>
  <circle cx="10" cy="32" r="2" fill="#a1a1aa"/>
  <!-- Central malevolent red optic sensor -->
  <circle cx="32" cy="32" r="14" fill="#7f1d1d" stroke="#ef4444" stroke-width="2.5"/>
  <circle cx="32" cy="32" r="7" fill="#ef4444"/>
  <circle cx="32" cy="32" r="3" fill="#fef08a"/>
</svg>`,

  // Winterblessed: intricate frosted snowflake prism
  'skin-winterblessed.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Snowflake branches -->
  <g stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round">
    <line x1="32" y1="8" x2="32" y2="56"/>
    <line x1="8" y1="32" x2="56" y2="32"/>
    <line x1="14" y1="14" x2="50" y2="50"/>
    <line x1="14" y1="50" x2="50" y2="14"/>
  </g>
  <circle cx="32" cy="32" r="6" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
</svg>`,

  // Fright Night: Tim Burton gothic jagged jack-o-lantern grin
  'skin-fright-night.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Jagged pumpkin -->
  <circle cx="32" cy="34" r="24" fill="#78350f" stroke="#f97316" stroke-width="3"/>
  <path d="M30 6 L34 6 L32 14 Z" fill="#15803d" stroke="#166534" stroke-width="2"/>
  <!-- Spooky eyes -->
  <polygon points="22,24 28,30 20,30" fill="#facc15"/>
  <polygon points="42,24 44,30 36,30" fill="#facc15"/>
  <!-- Jagged mouth -->
  <path d="M16 40 L20 44 L24 40 L28 46 L32 40 L36 46 L40 40 L44 44 L48 40" fill="none" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
</svg>`,

  // Arcade: retro 8-bit arcade joystick & buttons
  'skin-arcade.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect x="8" y="16" width="48" height="34" rx="6" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2.5"/>
  <!-- D-pad -->
  <rect x="14" y="28" width="14" height="6" fill="#18181b"/>
  <rect x="18" y="24" width="6" height="14" fill="#18181b"/>
  <!-- Arcade buttons -->
  <circle cx="40" cy="34" r="3.5" fill="#ef4444"/>
  <circle cx="48" cy="28" r="3.5" fill="#facc15"/>
</svg>`,

  // Cafe Cuties: adorable warm tea/coffee cup with heart steam
  'skin-cafe-cuties.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Cup -->
  <path d="M14 26 L50 26 L46 50 C46 54 42 56 32 56 C22 56 18 54 18 50 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2.5"/>
  <path d="M50 30 C56 30 58 38 50 42" fill="none" stroke="#ea580c" stroke-width="2.5"/>
  <!-- Heart steam -->
  <path d="M32 18 C30 14 24 10 28 6 C32 6 32 10 32 14 C32 10 32 6 36 6 C40 10 34 14 32 18 Z" fill="#f43f5e"/>
</svg>`,

  // Inkshadow: calligraphic sumi-e black ink brush swirl
  'skin-inkshadow.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="26" fill="#f8fafc" stroke="#09090b" stroke-width="3"/>
  <!-- Ink stroke enso ring -->
  <path d="M32 10 C18 10 10 20 10 32 C10 44 20 54 32 54 C46 54 54 42 54 28" fill="none" stroke="#09090b" stroke-width="6" stroke-linecap="round"/>
  <!-- Splatter dots -->
  <circle cx="44" cy="18" r="2.5" fill="#09090b"/>
  <circle cx="48" cy="22" r="1.5" fill="#09090b"/>
</svg>`,

  // Debonair: high-society tuxedo bowtie and rose lapel
  'skin-debonair.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Tuxedo lapel V -->
  <polygon points="12,14 32,54 52,14 42,14 32,36 22,14" fill="#052e16" stroke="#10b981" stroke-width="2"/>
  <!-- Emerald bowtie -->
  <polygon points="20,20 32,24 44,20 44,28 32,24 20,28" fill="#10b981" stroke="#34d399" stroke-width="1.5"/>
  <circle cx="32" cy="24" r="2.5" fill="#facc15"/>
</svg>`,

  // Astronaut: bubble visor space helmet with antenna
  'skin-astronaut.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Antenna -->
  <line x1="32" y1="6" x2="32" y2="14" stroke="#94a3b8" stroke-width="2.5"/>
  <circle cx="32" cy="6" r="3" fill="#ef4444"/>
  <!-- Helmet -->
  <circle cx="32" cy="34" r="22" fill="#f1f5f9" stroke="#64748b" stroke-width="2.5"/>
  <!-- Visor reflective gold dome -->
  <ellipse cx="32" cy="34" rx="16" ry="12" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
  <ellipse cx="28" cy="30" rx="6" ry="3" fill="#ffffff" opacity="0.6"/>
</svg>`
};

const skinDir = path.join(__dirname, 'public', 'assets', 'skins');
for (const [file, content] of Object.entries(skinSvgs)) {
  fs.writeFileSync(path.join(skinDir, file), content.trim(), 'utf8');
  console.log('Created skin icon:', file);
}
