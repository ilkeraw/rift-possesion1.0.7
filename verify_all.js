const fs = require('fs');

const serverCode = fs.readFileSync('server.js', 'utf8');
const mechs = ['Fear', 'Silence', 'Charm', 'Taunt', 'Suppression', 'Blind', 'Revive'];
mechs.forEach(m => {
  console.log('Mech in server.js:', m, serverCode.includes('"' + m + '"'));
});

const skinFiles = fs.readdirSync('public/assets/skins');
console.log('Skin files count:', skinFiles.length);

const mechFiles = [
  'mech-true-damage.svg', 'mech-fear.svg', 'mech-silence.svg', 
  'mech-charm.svg', 'mech-taunt.svg', 'mech-suppression.svg', 
  'mech-blind.svg', 'mech-revive.svg'
];
mechFiles.forEach(f => {
  console.log('Mech file:', f, fs.existsSync('public/assets/icons/' + f));
});
