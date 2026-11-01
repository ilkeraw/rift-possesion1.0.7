const fs = require('fs');
const https = require('https');
const path = require('path');

const content = fs.readFileSync('server.js', 'utf8');
const champMatch = content.match(/const CHAMPIONS = {([\s\S]*?)};\r?\n\r?\n\/\/ POPULAR/);
const champs = Object.keys(eval('({' + champMatch[1] + '})'));

const DDRAGON_KEYS = {
  'Wukong': 'MonkeyKing',
  'Renata Glasc': 'Renata',
  'Nunu & Willump': 'Nunu',
  'LeBlanc': 'Leblanc',
  'Kha\'Zix': 'Khazix',
  'Cho\'Gath': 'Chogath',
  'Vel\'Koz': 'Velkoz',
  'Kai\'Sa': 'Kaisa',
  'Bel\'Veth': 'Belveth',
  'K\'Sante': 'KSante'
};

function getDDragonKey(name) {
  if (DDRAGON_KEYS[name]) return DDRAGON_KEYS[name];
  return name.replace(/[^a-zA-Z0-9]/g, '');
}

const outDir = path.join(__dirname, 'public', 'assets', 'champions');

async function downloadChamp(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const targetFile = path.join(outDir, `${slug}.png`);
  if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 500) {
    return; // Already downloaded
  }

  const key = getDDragonKey(name);
  const url = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${key}.png`;

  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(targetFile);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve({ name, success: true });
        });
      } else {
        console.warn(`Failed ${name} (${key}): Status ${res.statusCode}`);
        resolve({ name, success: false });
      }
    });
    req.on('error', (e) => {
      console.warn(`Error ${name}: ${e.message}`);
      resolve({ name, success: false });
    });
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ name, success: false });
    });
  });
}

async function main() {
  console.log(`Starting download for ${champs.length} champions...`);
  const concurrency = 10;
  for (let i = 0; i < champs.length; i += concurrency) {
    const batch = champs.slice(i, i + concurrency);
    await Promise.all(batch.map(downloadChamp));
  }
  const downloaded = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
  console.log(`Download finished! Cached locally: ${downloaded.length} champions in public/assets/champions`);
}

main();
