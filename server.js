const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

// Configure Socket.io with proper CORS for host environments like Render
const io = new Server(server, { 
  cors: { 
    origin: '*', 
    methods: ['GET', 'POST'] 
  } 
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Persistent Leaderboard for Daily Solo Challenge
const DATA_DIR = path.join(__dirname, 'data');
const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
  }
}

function loadLeaderboards() {
  ensureDataDir();
  try {
    if (fs.existsSync(LEADERBOARD_FILE)) {
      const raw = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read leaderboard file:', err);
  }
  return {}; // { "YYYY-MM-DD": [ { nickname, score, timeSeconds, date } ] }
}

function saveLeaderboards(data) {
  ensureDataDir();
  try {
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save leaderboard file:', err);
  }
}

function getDailyDateKey() {
  const now = new Date();
  return now.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

// REST endpoints for daily leaderboard
app.get('/api/leaderboard/daily', (req, res) => {
  const dateKey = req.query.date || getDailyDateKey();
  const allData = loadLeaderboards();
  const entries = allData[dateKey] || [];
  res.json({ date: dateKey, leaderboard: entries });
});

app.post('/api/leaderboard/daily', (req, res) => {
  const { nickname, score, timeSeconds, date } = req.body;
  const dateKey = date || getDailyDateKey();
  const cleanNick = (nickname || 'Summoner').trim().slice(0, 16) || 'Summoner';
  const finalScore = parseInt(score, 10) || 0;
  const finalTime = parseInt(timeSeconds, 10) || 0;

  const allData = loadLeaderboards();
  if (!allData[dateKey]) allData[dateKey] = [];

  allData[dateKey].push({
    nickname: cleanNick,
    score: finalScore,
    timeSeconds: finalTime,
    timestamp: Date.now()
  });

  // Sort descending: highest score first, tiebreaker lowest timeSeconds
  allData[dateKey].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeSeconds - b.timeSeconds;
  });

  // Keep top 100
  allData[dateKey] = allData[dateKey].slice(0, 100);
  saveLeaderboards(allData);

  res.json({ success: true, leaderboard: allData[dateKey] });
});

// 1. COMPREHENSIVE CHAMPION DATASET
const CHAMPIONS = {
  // Dual-range stance/hybrid champions
  "Jayce":          { regions: ["Piltover"], species: "Human", gender: "Male", roles: ["Fighter", "Marksman"], resource: "Mana", ranges: ["Melee", "Ranged"], year: 2012, traits: ["Knockup","Dash"] },
  "Nidalee":        { regions: ["Ixtal"], species: ["Human", "Vastaya"], gender: "Female", roles: ["Assassin", "Mage"], resource: "Mana", ranges: ["Melee", "Ranged"], year: 2009, traits: ["Dash"] },
  "Elise":          { regions: ["Noxus", "Shadow Isles"], species: ["Human", "Monster/Beast"], gender: "Female", roles: ["Mage", "Assassin"], resource: "Mana", ranges: ["Melee", "Ranged"], year: 2012, traits: ["Stun","Untargetable","Dash"] },
  "Gnar":           { regions: ["Freljord", "Bandle City"], species: "Yordle", gender: "Male", roles: ["Fighter", "Tank"], resource: "Manaless", ranges: ["Melee", "Ranged"], year: 2014, traits: ["Knockup","Stun","Dash"] },
  "Kayle":          { regions: ["Demacia", "Targon"], species: ["Human", "Aspect/Celestial"], gender: "Female", roles: ["Fighter", "Mage", "Marksman"], resource: "Mana", ranges: ["Melee", "Ranged"], year: 2009, traits: ["Invulnerable"] },
  "Samira":         { regions: ["Shurima", "Noxus"], species: "Human", gender: "Female", roles: ["Marksman", "Assassin"], resource: "Mana", ranges: ["Melee"], year: 2020, traits: ["Knockup","Dash","True Damage"] },

  // Standard Roster & Custom Additions
  "Aatrox":         { regions: ["Shurima", "Runeterra"], species: "Darkin", gender: "Male", roles: ["Fighter"], resource: "Manaless", ranges: ["Melee"], year: 2013, traits: ["Knockup", "Dash"] },
  "Ahri":           { regions: ["Ionia"], species: "Vastaya", gender: "Female", roles: ["Mage", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["Charm", "Dash", "True Damage"] },
  "Akali":          { regions: ["Ionia"], species: "Human", gender: "Female", roles: ["Assassin"], resource: "Energy", ranges: ["Melee"], year: 2010, traits: ["Stealth", "Dash"] },
  "Akshan":         { regions: ["Shurima"], species: "Human", gender: "Male", roles: ["Marksman", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2021, traits: ["Stealth","Shield","Hook","Dash","Revive"] },
  "Alistar":        { regions: ["Runeterra", "Noxus"], species: "Monster/Beast", gender: "Male", roles: ["Tank", "Support"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Knockup", "Stun", "Dash"] },
  "Ambessa":        { regions: ["Noxus"], species: "Human", gender: "Female", roles: ["Fighter", "Assassin"], resource: "Energy", ranges: ["Melee"], year: 2024, traits: ["Dash","Stun","Knockup","Shield","Suppression"] },
  "Amumu":          { regions: ["Shurima"], species: ["Yordle", "Undead/Spirit"], gender: "Male", roles: ["Tank", "Support"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Stun", "Hook", "Dash", "True Damage"] },
  "Anivia":         { regions: ["Freljord"], species: ["Aspect/Celestial", "Undead/Spirit"], gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stun","Wall","Revive","Knockup"] },
  "Annie":          { regions: ["Noxus", "Runeterra"], species: "Human", gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stun", "Shield"] },
  "Aphelios":       { regions: ["Targon"], species: "Human", gender: "Male", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2019, traits: ["Root","Global Ult","Shield"] },
  "Ashe":           { regions: ["Freljord"], species: "Human", gender: "Female", roles: ["Marksman", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stun", "Global Ult"] },
  "Aurelion Sol":   { regions: ["Targon", "Runeterra"], species: "Aspect/Celestial", gender: "Male", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2016, traits: ["Knockup","Stun","Dash"] },
  "Aurora":         { regions: ["Freljord"], species: "Vastaya", gender: "Female", roles: ["Mage", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2024, traits: ["Stealth","Dash","Untargetable","Knockup"] },
  "Azir":           { regions: ["Shurima"], species: ["Human", "Aspect/Celestial"], gender: "Male", roles: ["Mage", "Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2014, traits: ["Knockup", "Dash", "Wall", "Shield"] },
  "Bard":           { regions: ["Targon", "Runeterra"], species: "Aspect/Celestial", gender: "Indeterminate", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2015, traits: ["Stun","Stasis","Dash"] },
  "Bel'Veth":       { regions: ["Void"], species: "Monster/Beast", gender: "Female", roles: ["Fighter"], resource: "Manaless", ranges: ["Melee"], year: 2022, traits: ["Knockup", "Dash", "True Damage"] },
  "Blitzcrank":     { regions: ["Zaun"], species: "Golem/Construct", gender: "Indeterminate", roles: ["Tank", "Support"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Hook","Knockup","Silence","Shield"] },
  "Brand":          { regions: ["Freljord", "Runeterra"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["Stun"] },
  "Braum":          { regions: ["Freljord"], species: "Human", gender: "Male", roles: ["Support", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2014, traits: ["Stun","Knockup","Dash"] },
  "Briar":          { regions: ["Noxus"], species: ["Golem/Construct", "Undead/Spirit", "Monster/Beast"], gender: "Female", roles: ["Fighter", "Assassin"], resource: "Manaless", ranges: ["Melee"], year: 2023, traits: ["Stun","Fear","Dash","Global Ult","Knockup"] },
  "Caitlyn":        { regions: ["Piltover"], species: "Human", gender: "Female", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["Root", "Global Ult", "Dash"] },
  "Camille":        { regions: ["Piltover"], species: ["Human", "Golem/Construct"], gender: "Female", roles: ["Fighter", "Tank", "Assassin"], resource: "Mana", ranges: ["Melee"], year: 2016, traits: ["True Damage","Stun","Shield","Hook","Dash","Knockup"] },
  "Cassiopeia":     { regions: ["Noxus", "Shurima"], species: ["Human", "Monster/Beast"], gender: "Female", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["Stun", "Poison"] },
  "Cho'Gath":       { regions: ["Void"], species: "Monster/Beast", gender: "Indeterminate", roles: ["Tank", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Knockup", "Silence", "True Damage"] },
  "Corki":          { regions: ["Bandle City", "Piltover"], species: "Yordle", gender: "Male", roles: ["Marksman", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Dash","Knockup","True Damage"] },
  "Darius":         { regions: ["Noxus"], species: "Human", gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2012, traits: ["Hook","True Damage","Bleed","Knockup","Fear"] },
  "Diana":          { regions: ["Targon"], species: ["Human", "Aspect/Celestial"], gender: "Female", roles: ["Fighter", "Assassin", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2012, traits: ["Knockup", "Dash", "Shield"] },
  "Dr. Mundo":      { regions: ["Zaun"], species: ["Human", "Monster/Beast"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Health/Other", ranges: ["Melee"], year: 2009, traits: [] },
  "Draven":         { regions: ["Noxus"], species: "Human", gender: "Male", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2012, traits: ["Knockup", "Global Ult"] },
  "Ekko":           { regions: ["Zaun"], species: "Human", gender: "Male", roles: ["Assassin", "Fighter", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2015, traits: ["Stun", "Dash", "Blink", "Shield"] },
  "Evelynn":        { regions: ["Runeterra"], species: "Undead/Spirit", gender: "Female", roles: ["Assassin", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Stealth","Charm","Dash"] },
  "Ezreal":         { regions: ["Piltover"], species: "Human", gender: "Male", roles: ["Marksman", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["Blink", "Global Ult"] },
  "Fiddlesticks":   { regions: ["Demacia", "Runeterra"], species: "Undead/Spirit", gender: "Indeterminate", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Fear", "Silence", "Blink"] },
  "Fiora":          { regions: ["Demacia"], species: "Human", gender: "Female", roles: ["Fighter", "Assassin"], resource: "Mana", ranges: ["Melee"], year: 2012, traits: ["True Damage", "Stun", "Dash"] },
  "Fizz":           { regions: ["Bilgewater", "Bandle City"], species: "Yordle", gender: "Male", roles: ["Assassin", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Knockup", "Untargetable", "Dash"] },
  "Galio":          { regions: ["Demacia"], species: "Golem/Construct", gender: "Male", roles: ["Tank", "Mage", "Support"], resource: "Mana", ranges: ["Melee"], year: 2010, traits: ["Knockup", "Taunt", "Global Ult", "Shield", "Dash"] },
  "Gangplank":      { regions: ["Bilgewater"], species: "Human", gender: "Male", roles: ["Fighter"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Global Ult", "True Damage"] },
  "Garen":          { regions: ["Demacia"], species: "Human", gender: "Male", roles: ["Fighter", "Tank"], resource: "Manaless", ranges: ["Melee"], year: 2010, traits: ["True Damage", "Silence", "Shield"] },
  "Gragas":         { regions: ["Freljord"], species: "Human", gender: "Male", roles: ["Fighter", "Mage", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2010, traits: ["Knockup", "Stun", "Dash"] },
  "Graves":         { regions: ["Bilgewater"], species: "Human", gender: "Male", roles: ["Marksman", "Fighter"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["Dash","Blind","Knockup"] },
  "Gwen":           { regions: ["Shadow Isles"], species: ["Golem/Construct", "Undead/Spirit", "Human"], gender: "Female", roles: ["Fighter"], resource: "Mana", ranges: ["Melee"], year: 2021, traits: ["True Damage", "Dash", "Untargetable"] },
  "Hecarim":        { regions: ["Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2012, traits: ["Fear","Knockup","Dash"] },
  "Heimerdinger":   { regions: ["Bandle City", "Piltover"], species: "Yordle", gender: "Male", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stun"] },
  "Hwei":           { regions: ["Ionia"], species: "Human", gender: "Male", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2023, traits: ["Fear","Root","Shield","Knockup"] },
  "Illaoi":         { regions: ["Bilgewater"], species: "Human", gender: "Female", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2015, traits: ["Hook","Dash"] },
  "Irelia":         { regions: ["Ionia"], species: "Human", gender: "Female", roles: ["Fighter", "Assassin"], resource: "Mana", ranges: ["Melee"], year: 2010, traits: ["Stun", "Dash"] },
  "Ivern":          { regions: ["Ionia", "Freljord"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2016, traits: ["Root","Shield","Knockup","Dash"] },
  "Janna":          { regions: ["Zaun"], species: ["Aspect/Celestial", "Undead/Spirit"], gender: "Female", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Knockup", "Shield"] },
  "Jarvan IV":      { regions: ["Demacia"], species: "Human", gender: "Male", roles: ["Tank", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Knockup", "Wall", "Shield", "Dash"] },
  "Jax":            { regions: ["Shurima", "Runeterra"], species: "Human", gender: "Male", roles: ["Fighter", "Assassin"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Stun", "Dash"] },
  "Jhin":           { regions: ["Ionia"], species: "Human", gender: "Male", roles: ["Marksman", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2016, traits: ["Root"] },
  "Jinx":           { regions: ["Zaun", "Piltover"], species: "Human", gender: "Female", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2013, traits: ["Global Ult", "Root"] },
  "K'Sante":        { regions: ["Shurima"], species: "Human", gender: "Male", roles: ["Tank", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2022, traits: ["Knockup","Shield","True Damage","Dash","Stun","Root"] },
  "Kai'Sa":         { regions: ["Void", "Shurima"], species: ["Human", "Monster/Beast"], gender: "Female", roles: ["Marksman", "Assassin", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2018, traits: ["Shield", "Dash", "Stealth"] },
  "Kalista":        { regions: ["Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Female", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2014, traits: ["Knockup", "Dash"] },
  "Karma":          { regions: ["Ionia"], species: ["Human", "Undead/Spirit"], gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["Root", "Shield"] },
  "Karthus":        { regions: ["Noxus", "Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Global Ult", "Wall"] },
  "Kassadin":       { regions: ["Shurima", "Void"], species: ["Human", "Monster/Beast"], gender: "Male", roles: ["Assassin", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Blink","Shield"] },
  "Katarina":       { regions: ["Noxus"], species: "Human", gender: "Female", roles: ["Assassin", "Mage"], resource: "Manaless", ranges: ["Melee"], year: 2009, traits: ["Blink"] },
  "Kayn":           { regions: ["Noxus", "Ionia", "Runeterra", "Shurima"], species: ["Human", "Darkin"], gender: "Male", roles: ["Assassin", "Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2017, traits: ["Untargetable", "Dash", "Knockup"] },
  "Kennen":         { regions: ["Bandle City", "Ionia"], species: "Yordle", gender: "Male", roles: ["Mage", "Marksman"], resource: "Energy", ranges: ["Ranged"], year: 2010, traits: ["Stun"] },
  "Kha'Zix":        { regions: ["Void", "Ixtal"], species: "Monster/Beast", gender: "Indeterminate", roles: ["Assassin"], resource: "Mana", ranges: ["Melee"], year: 2012, traits: ["Stealth", "Dash"] },
  "Kindred":        { regions: ["Runeterra"], species: ["Aspect/Celestial", "Undead/Spirit"], gender: "Indeterminate", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2015, traits: ["Invulnerable", "Dash"] },
  "Kled":           { regions: ["Bandle City", "Noxus"], species: "Yordle", gender: "Male", roles: ["Fighter", "Tank"], resource: "Manaless", ranges: ["Melee"], year: 2016, traits: ["Hook","Shield","Dash","Knockup"] },
  "Kog'Maw":        { regions: ["Void"], species: "Monster/Beast", gender: "Indeterminate", roles: ["Marksman", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["True Damage"] },
  "LeBlanc":        { regions: ["Noxus"], species: "Human", gender: "Female", roles: ["Assassin", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["Root", "Blink", "Stealth", "Dash"] },
  "Lee Sin":        { regions: ["Ionia"], species: "Human", gender: "Male", roles: ["Fighter", "Assassin"], resource: "Energy", ranges: ["Melee"], year: 2011, traits: ["Knockup","Shield","Dash","Root"] },
  "Leona":          { regions: ["Targon"], species: ["Human", "Aspect/Celestial"], gender: "Female", roles: ["Tank", "Support"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Stun", "Root", "Dash"] },
  "Lillia":         { regions: ["Ionia"], species: ["Undead/Spirit", "Monster/Beast"], gender: "Female", roles: ["Fighter", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2020, traits: ["Sleep","True Damage","Dash"] },
  "Lissandra":      { regions: ["Freljord"], species: ["Human", "Undead/Spirit"], gender: "Female", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2013, traits: ["Stun", "Root", "Blink"] },
  "Locke":          { regions: ["Piltover", "Zaun"], species: "Human", gender: "Male", roles: ["Marksman", "Assassin", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2025, traits: ["Stealth", "Dash"] },
  "Lucian":         { regions: ["Demacia", "Shadow Isles"], species: "Human", gender: "Male", roles: ["Marksman", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2013, traits: ["Dash"] },
  "Lulu":           { regions: ["Bandle City", "Ionia"], species: "Yordle", gender: "Female", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2012, traits: ["Knockup","Shield","Silence"] },
  "Lux":            { regions: ["Demacia"], species: "Human", gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["Root", "Shield"] },
  "Malphite":       { regions: ["Ixtal", "Shurima"], species: "Golem/Construct", gender: "Indeterminate", roles: ["Tank", "Fighter", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Knockup", "Shield", "Dash"] },
  "Malzahar":       { regions: ["Shurima", "Void"], species: "Human", gender: "Male", roles: ["Mage", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["Suppression","Silence"] },
  "Maokai":         { regions: ["Shadow Isles"], species: ["Undead/Spirit", "Monster/Beast"], gender: "Male", roles: ["Tank", "Mage", "Support"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Root", "Knockup", "Dash"] },
  "Master Yi":      { regions: ["Ionia"], species: "Human", gender: "Male", roles: ["Assassin", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["True Damage", "Untargetable"] },
  "Mel":            { regions: ["Noxus", "Piltover"], species: "Human", gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2025, traits: ["Shield", "Stun"] },
  "Milio":          { regions: ["Ixtal"], species: "Human", gender: "Male", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2023, traits: ["Knockup","Shield"] },
  "Miss Fortune":   { regions: ["Bilgewater"], species: "Human", gender: "Female", roles: ["Marksman", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: [] },
  "Mordekaiser":    { regions: ["Noxus", "Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Fighter", "Mage"], resource: "Shield/Other", ranges: ["Melee"], year: 2010, traits: ["Hook","Shield","Knockup"] },
  "Morgana":        { regions: ["Demacia", "Targon"], species: ["Human", "Aspect/Celestial"], gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Root", "Stun", "Shield"] },
  "Naafiri":        { regions: ["Shurima"], species: ["Darkin", "Monster/Beast"], gender: "Female", roles: ["Assassin", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2023, traits: ["Dash","Shield"] },
  "Nami":           { regions: ["Bilgewater", "Targon"], species: "Vastaya", gender: "Female", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2012, traits: ["Knockup", "Stun"] },
  "Nasus":          { regions: ["Shurima"], species: ["Human", "Aspect/Celestial"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: [] },
  "Nautilus":       { regions: ["Bilgewater"], species: ["Golem/Construct", "Undead/Spirit"], gender: "Male", roles: ["Tank", "Support", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2012, traits: ["Hook","Root","Knockup","Shield","Dash","Stun"] },
  "Neeko":          { regions: ["Ixtal"], species: "Vastaya", gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2018, traits: ["Root", "Stun", "Stealth", "Shield"] },
  "Nilah":          { regions: ["Bilgewater"], species: "Human", gender: "Female", roles: ["Fighter", "Assassin"], resource: "Mana", ranges: ["Melee"], year: 2022, traits: ["Knockup", "Dash", "Shield"] },
  "Nocturne":       { regions: ["Demacia", "Runeterra"], species: "Undead/Spirit", gender: "Indeterminate", roles: ["Assassin", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Fear","Global Ult","Dash","Blind"] },
  "Nunu & Willump": { regions: ["Freljord"], species: ["Human", "Monster/Beast"], gender: "Male", roles: ["Tank", "Fighter", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Knockup","Root","Shield"] },
  "Olaf":           { regions: ["Freljord", "Bilgewater"], species: "Human", gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2010, traits: ["True Damage", "Shield"] },
  "Orianna":        { regions: ["Piltover", "Zaun"], species: ["Human", "Golem/Construct"], gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["Knockup","Shield"] },
  "Ornn":           { regions: ["Freljord"], species: ["Aspect/Celestial", "Undead/Spirit"], gender: "Male", roles: ["Tank", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2017, traits: ["Knockup", "Brittle", "Dash"] },
  "Pantheon":       { regions: ["Targon"], species: ["Human", "Aspect/Celestial"], gender: "Male", roles: ["Fighter", "Assassin", "Support"], resource: "Mana", ranges: ["Melee"], year: 2010, traits: ["Stun", "Global Ult", "Invulnerable", "Dash"] },
  "Poppy":          { regions: ["Bandle City", "Demacia"], species: "Yordle", gender: "Female", roles: ["Tank", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2010, traits: ["Stun", "Knockup", "Shield", "Dash"] },
  "Pyke":           { regions: ["Bilgewater"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Support", "Assassin"], resource: "Mana", ranges: ["Melee"], year: 2018, traits: ["Hook","Stun","Stealth","True Damage","Dash","Knockup"] },
  "Qiyana":         { regions: ["Ixtal"], species: "Human", gender: "Female", roles: ["Assassin", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2019, traits: ["Stun","Root","Stealth","Dash","Knockup"] },
  "Quinn":          { regions: ["Demacia"], species: "Human", gender: "Female", roles: ["Marksman", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2013, traits: ["Blind", "Knockup", "Dash"] },
  "Rakan":          { regions: ["Ionia"], species: "Vastaya", gender: "Male", roles: ["Support"], resource: "Mana", ranges: ["Ranged"], year: 2017, traits: ["Charm", "Knockup", "Shield", "Dash"] },
  "Rammus":         { regions: ["Shurima"], species: "Monster/Beast", gender: "Male", roles: ["Tank", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Taunt","Knockup","Stun"] },
  "Rek'Sai":        { regions: ["Void", "Shurima"], species: "Monster/Beast", gender: "Female", roles: ["Fighter", "Assassin", "Tank"], resource: "Fury/Other", ranges: ["Melee"], year: 2014, traits: ["Knockup","Dash"] },
  "Rell":           { regions: ["Noxus"], species: "Human", gender: "Female", roles: ["Tank", "Support"], resource: "Mana", ranges: ["Melee"], year: 2020, traits: ["Knockup", "Stun", "Shield", "Dash"] },
  "Renata Glasc":   { regions: ["Zaun", "Piltover"], species: "Human", gender: "Female", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2022, traits: ["Root","Berserk","Shield","Hook","Knockup","Stun","Revive","True Damage"] },
  "Renekton":       { regions: ["Shurima"], species: ["Human", "Aspect/Celestial"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Fury/Other", ranges: ["Melee"], year: 2011, traits: ["Stun", "Dash"] },
  "Rengar":         { regions: ["Ixtal", "Shurima"], species: "Vastaya", gender: "Male", roles: ["Assassin", "Fighter"], resource: "Fury/Other", ranges: ["Melee"], year: 2012, traits: ["Root", "Stealth", "Dash"] },
  "Riven":          { regions: ["Noxus", "Ionia"], species: "Human", gender: "Female", roles: ["Fighter", "Assassin"], resource: "Manaless", ranges: ["Melee"], year: 2011, traits: ["Knockup", "Stun", "Shield", "Dash"] },
  "Rumble":         { regions: ["Bandle City", "Shurima"], species: "Yordle", gender: "Male", roles: ["Fighter", "Mage"], resource: "Heat/Other", ranges: ["Melee"], year: 2011, traits: ["Shield"] },
  "Ryze":           { regions: ["Runeterra", "Noxus"], species: "Human", gender: "Male", roles: ["Mage", "Fighter"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Root", "Global Ult"] },
  "Sejuani":        { regions: ["Freljord"], species: "Human", gender: "Female", roles: ["Tank", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2012, traits: ["Stun", "Knockup", "Dash"] },
  "Senna":          { regions: ["Demacia", "Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Female", roles: ["Support", "Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2019, traits: ["Root", "Stealth", "Global Ult", "Shield"] },
  "Seraphine":      { regions: ["Piltover", "Zaun"], species: "Human", gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2020, traits: ["Charm", "Root", "Stun", "Shield"] },
  "Sett":           { regions: ["Ionia", "Noxus"], species: ["Human", "Vastaya"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Grit/Other", ranges: ["Melee"], year: 2020, traits: ["True Damage", "Knockup", "Stun", "Shield", "Hook", "Suppression"] },
  "Shaco":          { regions: ["Runeterra"], species: ["Golem/Construct", "Undead/Spirit"], gender: "Indeterminate", roles: ["Assassin"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Stealth","Fear","Blink","Root"] },
  "Shen":           { regions: ["Ionia"], species: "Human", gender: "Male", roles: ["Tank", "Support"], resource: "Energy", ranges: ["Melee"], year: 2010, traits: ["Global Ult", "Taunt", "Shield", "Dash"] },
  "Shyvana":        { regions: ["Demacia"], species: ["Human", "Monster/Beast"], gender: "Female", roles: ["Fighter", "Tank", "Mage"], resource: "Fury/Other", ranges: ["Melee"], year: 2011, traits: ["Knockup", "Dash"] },
  "Singed":         { regions: ["Zaun", "Piltover", "Noxus"], species: "Human", gender: "Male", roles: ["Tank", "Fighter", "Mage"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Knockup", "Root", "Ground"] },
  "Sion":           { regions: ["Noxus"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Tank", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Knockup", "Stun", "Shield", "Dash"] },
  "Sivir":          { regions: ["Shurima"], species: "Human", gender: "Female", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: [] },
  "Skarner":        { regions: ["Ixtal", "Shurima"], species: "Monster/Beast", gender: "Male", roles: ["Tank", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Suppression", "Stun", "Shield", "Dash"] },
  "Smolder":        { regions: ["Noxus"], species: "Monster/Beast", gender: "Male", roles: ["Marksman", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2024, traits: ["True Damage"] },
  "Sona":           { regions: ["Ionia", "Demacia"], species: "Human", gender: "Female", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["Stun", "Shield"] },
  "Soraka":         { regions: ["Targon", "Ionia"], species: "Aspect/Celestial", gender: "Female", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Silence", "Root", "Global Ult"] },
  "Swain":          { regions: ["Noxus"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Mage", "Fighter", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["Root","Hook","Knockup"] },
  "Sylas":          { regions: ["Demacia", "Freljord"], species: "Human", gender: "Male", roles: ["Mage", "Assassin", "Fighter"], resource: "Mana", ranges: ["Melee"], year: 2019, traits: ["Dash","Hook","Knockup","Stun"] },
  "Syndra":         { regions: ["Ionia"], species: "Human", gender: "Female", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2012, traits: ["Stun", "Knockup", "True Damage"] },
  "Tahm Kench":     { regions: ["Bilgewater", "Runeterra"], species: "Undead/Spirit", gender: "Male", roles: ["Support", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2015, traits: ["Stun","Knockup","Shield","Blink","Suppression"] },
  "Taliyah":        { regions: ["Shurima", "Ionia"], species: "Human", gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2016, traits: ["Knockup","Wall","Dash"] },
  "Talon":          { regions: ["Noxus"], species: "Human", gender: "Male", roles: ["Assassin"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Stealth", "Bleed", "Dash"] },
  "Taric":          { regions: ["Demacia", "Targon"], species: ["Human", "Aspect/Celestial"], gender: "Male", roles: ["Support", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Stun", "Invulnerable", "Shield"] },
  "Teemo":          { regions: ["Bandle City"], species: "Yordle", gender: "Male", roles: ["Marksman", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stealth", "Blind"] },
  "Thresh":         { regions: ["Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Support", "Tank"], resource: "Mana", ranges: ["Ranged"], year: 2013, traits: ["Hook","Knockup","Shield","Dash","Stun"] },
  "Tristana":       { regions: ["Bandle City"], species: "Yordle", gender: "Female", roles: ["Marksman", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Knockup", "Dash"] },
  "Trundle":        { regions: ["Freljord"], species: "Monster/Beast", gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2010, traits: ["Pillar","Knockup"] },
  "Tryndamere":     { regions: ["Freljord"], species: "Human", gender: "Male", roles: ["Fighter", "Assassin"], resource: "Fury/Other", ranges: ["Melee"], year: 2009, traits: ["Invulnerable", "Dash"] },
  "Twisted Fate":   { regions: ["Bilgewater"], species: "Human", gender: "Male", roles: ["Mage", "Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stun", "Global Ult"] },
  "Twitch":         { regions: ["Zaun"], species: "Monster/Beast", gender: "Male", roles: ["Marksman", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stealth", "True Damage"] },
  "Udyr":           { regions: ["Freljord", "Ionia"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Stun", "Shield"] },
  "Urgot":          { regions: ["Noxus", "Zaun"], species: ["Human", "Golem/Construct"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Ranged"], year: 2010, traits: ["Shield","Execute","Dash","Knockup","Suppression","True Damage","Stun","Fear"] },
  "Varus":          { regions: ["Shurima", "Ionia"], species: ["Darkin", "Human"], gender: "Male", roles: ["Marksman", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2012, traits: ["Root", "Blight"] },
  "Vayne":          { regions: ["Demacia"], species: "Human", gender: "Female", roles: ["Marksman", "Assassin"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["True Damage", "Stealth", "Stun", "Dash", "Knockup"] },
  "Veigar":         { regions: ["Bandle City", "Noxus"], species: "Yordle", gender: "Male", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stun"] },
  "Vel'Koz":        { regions: ["Void"], species: "Monster/Beast", gender: "Indeterminate", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2014, traits: ["True Damage","Knockup"] },
  "Vex":            { regions: ["Bandle City", "Shadow Isles"], species: "Yordle", gender: "Female", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2021, traits: ["Fear", "Shield", "Dash"] },
  "Vi":             { regions: ["Zaun", "Piltover"], species: "Human", gender: "Female", roles: ["Fighter", "Assassin"], resource: "Mana", ranges: ["Melee"], year: 2012, traits: ["Knockup", "Shield", "Dash"] },
  "Viego":          { regions: ["Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Assassin", "Fighter"], resource: "Manaless", ranges: ["Melee"], year: 2021, traits: ["Stun","Stealth","Invulnerable","Dash","Knockup"] },
  "Viktor":         { regions: ["Zaun", "Piltover"], species: ["Human", "Golem/Construct"], gender: "Male", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["Stun", "Shield"] },
  "Vladimir":       { regions: ["Noxus", "Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Mage", "Tank", "Fighter"], resource: "Manaless", ranges: ["Ranged"], year: 2010, traits: ["Untargetable"] },
  "Volibear":       { regions: ["Freljord"], species: ["Aspect/Celestial", "Undead/Spirit"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Stun", "Shield", "Disabled Turret", "Dash"] },
  "Warwick":        { regions: ["Zaun"], species: ["Human", "Monster/Beast"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2009, traits: ["Suppression", "Fear", "Dash"] },
  "Wukong":         { regions: ["Ionia"], species: "Vastaya", gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Knockup", "Stealth", "Dash"] },
  "Xayah":          { regions: ["Ionia"], species: "Vastaya", gender: "Female", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2017, traits: ["Root", "Untargetable"] },
  "Xerath":         { regions: ["Shurima"], species: "Aspect/Celestial", gender: "Male", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2011, traits: ["Stun", "Global Ult"] },
  "Xin Zhao":       { regions: ["Ionia", "Noxus", "Demacia"], species: "Human", gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2010, traits: ["Knockup","Dash"] },
  "Yasuo":          { regions: ["Ionia"], species: "Human", gender: "Male", roles: ["Fighter", "Assassin"], resource: "Manaless", ranges: ["Melee"], year: 2013, traits: ["Knockup", "Shield", "Dash", "Wall"] },
  "Yone":           { regions: ["Ionia"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Assassin", "Fighter"], resource: "Manaless", ranges: ["Melee"], year: 2020, traits: ["Knockup","True Damage","Shield","Dash","Blink"] },
  "Yorick":         { regions: ["Shadow Isles"], species: ["Human", "Undead/Spirit"], gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2011, traits: ["Wall","Knockup"] },
  "Yunara":         { regions: ["Ionia"], species: "Human", gender: "Female", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2025, traits: ["Dash", "Untargetable"] },
  "Yuumi":          { regions: ["Bandle City"], species: "Monster/Beast", gender: "Female", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2019, traits: ["Root", "Untargetable", "Shield", "Dash"] },
  "Zaahen":         { regions: ["Ionia", "Shurima", "Runeterra"], species: "Darkin", gender: "Male", roles: ["Fighter", "Tank"], resource: "Mana", ranges: ["Melee"], year: 2024, traits: ["Knockup","Dash","Revive"] },
  "Zac":            { regions: ["Zaun"], species: ["Golem/Construct", "Monster/Beast"], gender: "Indeterminate", roles: ["Tank", "Support", "Fighter"], resource: "Health/Other", ranges: ["Melee"], year: 2013, traits: ["Knockup","Dash","Revive","Root"] },
  "Zed":            { regions: ["Ionia"], species: "Human", gender: "Male", roles: ["Assassin"], resource: "Energy", ranges: ["Melee"], year: 2012, traits: ["Blink","Untargetable","Dash"] },
  "Zeri":           { regions: ["Zaun"], species: "Human", gender: "Female", roles: ["Marksman"], resource: "Mana", ranges: ["Ranged"], year: 2022, traits: ["Dash"] },
  "Ziggs":          { regions: ["Bandle City", "Zaun", "Piltover"], species: "Yordle", gender: "Male", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2012, traits: ["Knockup","Global Ult","Dash"] },
  "Zilean":         { regions: ["Shurima", "Runeterra"], species: "Human", gender: "Male", roles: ["Support", "Mage"], resource: "Mana", ranges: ["Ranged"], year: 2009, traits: ["Stun", "Revive"] },
  "Zoe":            { regions: ["Targon"], species: ["Human", "Aspect/Celestial"], gender: "Female", roles: ["Mage"], resource: "Mana", ranges: ["Ranged"], year: 2017, traits: ["Sleep", "Blink", "True Damage"] },
  "Zyra":           { regions: ["Ixtal", "Shurima"], species: ["Monster/Beast", "Undead/Spirit"], gender: "Female", roles: ["Mage", "Support"], resource: "Mana", ranges: ["Ranged"], year: 2012, traits: ["Root", "Knockup"] }
};

// POPULAR / ICONIC SKIN LINES DATASET
const SKIN_LINES = {
  "HEARTSTEEL": [
    "Ezreal", "Kayn", "Sett", "K'Sante", "Aphelios", "Yone"
  ],
  "K/DA": [
    "Ahri", "Akali", "Evelynn", "Kai'Sa", "Seraphine"
  ],
  "True Damage": [
    "Ekko", "Akali", "Qiyana", "Senna", "Yasuo"
  ],
  "Spirit Blossom": [
    "Ahri", "Akali", "Aphelios", "Ashe", "Bard", "Cassiopeia", "Darius", "Evelynn",
    "Hwei", "Irelia", "Ivern", "Karma", "Kayle", "Kindred", "Lillia", "Lux",
    "Master Yi", "Morgana", "Nidalee", "Riven", "Sett", "Soraka", "Syndra",
    "Teemo", "Thresh", "Tristana", "Varus", "Vayne", "Yasuo", "Yone", "Yorick",
    "Zed", "Zyra"
  ],
  "Blood Moon": [
    "Aatrox", "Akali", "Diana", "Elise", "Evelynn", "Fiddlesticks", "Jhin", "Kalista",
    "Katarina", "Kennen", "Master Yi", "Pyke", "Ryze", "Shen", "Sivir", "Talon",
    "Thresh", "Tryndamere", "Twisted Fate", "Yasuo", "Zed", "Zilean", "Zyra"
  ],
  "Star Guardian": [
    "Ahri", "Akali", "Ekko", "Ezreal", "Fiddlesticks", "Janna", "Jinx", "Kai'Sa",
    "Lulu", "Lux", "Miss Fortune", "Neeko", "Nilah", "Orianna", "Poppy", "Quinn",
    "Rakan", "Rell", "Senna", "Seraphine", "Sona", "Soraka", "Syndra", "Taliyah",
    "Xayah", "Zoe"
  ],
  "PROJECT": [
    "Akali", "Ashe", "Ekko", "Fiora", "Gangplank", "Irelia", "Jax", "Jhin",
    "Jinx", "Katarina", "Leona", "Lucian", "Master Yi", "Mordekaiser", "Naafiri",
    "Pyke", "Quinn", "Renekton", "Sejuani", "Senna", "Sylas", "Varus", "Vayne",
    "Vi", "Warwick", "Yasuo", "Zed"
  ],
  "High Noon": [
    "Aatrox", "Akshan", "Alistar", "Ashe", "Caitlyn", "Cassiopeia", "Darius", "Evelynn",
    "Fiddlesticks", "Gragas", "Hecarim", "Irelia", "Jhin", "Katarina", "Kog'Maw",
    "Leona", "Lucian", "Mordekaiser", "Rell", "Renekton", "Samira", "Senna", "Sion",
    "Skarner", "Tahm Kench", "Talon", "Thresh", "Twisted Fate", "Twitch", "Urgot",
    "Varus", "Viktor", "Yasuo", "Yone", "Yorick"
  ],
  "Coven": [
    "Ahri", "Akali", "Ashe", "Camille", "Cassiopeia", "Elise", "Evelynn", "Janna",
    "LeBlanc", "Lissandra", "Mel", "Morgana", "Nami", "Nilah", "Syndra", "Zyra"
  ],
  "Arcana": [
    "Ahri", "Aurora", "Camille", "Hecarim", "Jhin", "Karthus", "Lucian", "Lulu",
    "Rakan", "Ryze", "Tahm Kench", "Xayah", "Xerath", "Zilean"
  ],
  "Dark Star": [
    "Anivia", "Ashe", "Bel'Veth", "Cho'Gath", "Diana", "Hecarim", "Illaoi", "Jarvan IV",
    "Jhin", "Karma", "Kassadin", "Kha'Zix", "Lissandra", "Lulu", "Lux", "Malphite",
    "Master Yi", "Mordekaiser", "Nami", "Nautilus", "Nidalee", "Nunu & Willump",
    "Orianna", "Rakan", "Shaco", "Sion", "Skarner", "Sylas", "Thresh", "Varus",
    "Vladimir", "Xayah", "Xin Zhao", "Zoe"
  ],
  "Battle Academia": [
    "Briar", "Caitlyn", "Ezreal", "Garen", "Graves", "Jayce", "Katarina", "Leona",
    "Lux", "Qiyana", "Rakan", "Samira", "Wukong", "Xayah", "Yone", "Yuumi"
  ],
  "Empyrean": [
    "Akali", "Brand", "Jax", "Jhin", "K'Sante", "Kayle", "Lux", "Malzahar",
    "Nocturne", "Pyke", "Varus", "Vex", "Zac", "Zed"
  ],
  "Porcelain": [
    "Amumu", "Aurelion Sol", "Darius", "Ezreal", "Graves", "Irelia", "Kindred",
    "Lissandra", "Lux", "Miss Fortune", "Morgana"
  ],
  "Pool Party": [
    "Braum", "Caitlyn", "Dr. Mundo", "Draven", "Fiora", "Gangplank", "Graves",
    "Heimerdinger", "Jarvan IV", "Lee Sin", "Leona", "Lulu", "Malphite", "Miss Fortune",
    "Orianna", "Rek'Sai", "Renekton", "Sett", "Singed", "Syndra", "Taliyah", "Taric",
    "Twitch", "Zac", "Ziggs", "Zoe"
  ],
  "Elderwood": [
    "Alistar", "Azir", "Bard", "Gnar", "Hecarim", "Karthus", "LeBlanc", "Ornn",
    "Rakan", "Rek'Sai", "Soraka", "Taric", "Veigar", "Wukong", "Xayah"
  ],
  "Dragonslayer": [
    "Braum", "Diana", "Jarvan IV", "Kayle", "Olaf", "Pantheon", "Trundle", "Twitch",
    "Vayne", "Xin Zhao"
  ],
  "Sentinel / Ruined": [
    "Akshan", "Diana", "Draven", "Gangplank", "Graves", "Irelia", "Karma", "Miss Fortune",
    "Olaf", "Pantheon", "Pyke", "Rengar", "Riven", "Shyvana", "Thresh", "Vayne", "Viego"
  ],
  "Anima Squad": [
    "Aatrox", "Aurora", "Bel'Veth", "Briar", "Illaoi", "Jinx", "Leona", "Miss Fortune",
    "Rek'Sai", "Riven", "Seraphine", "Sylas", "Vayne", "Xayah", "Yasuo", "Yuumi"
  ],
  "Battlecast": [
    "Caitlyn", "Cho'Gath", "Illaoi", "Jayce", "Kog'Maw", "Nasus", "Singed", "Skarner",
    "Urgot", "Vel'Koz", "Viktor", "Xerath", "Yorick", "Zac"
  ],
  "Winterblessed": [
    "Annie", "Camille", "Diana", "Hecarim", "Hwei", "Lucian", "Mel", "Senna",
    "Shaco", "Swain", "Sylas", "Thresh", "Warwick", "Zilean", "Zoe"
  ],
  "Fright Night": [
    "Annie", "Draven", "Nautilus", "Nunu & Willump", "Pyke", "Renata Glasc", "Shaco",
    "Trundle", "Urgot", "Veigar", "Zeri"
  ],
  "Arcade": [
    "Ahri", "Blitzcrank", "Brand", "Corki", "Ezreal", "Hecarim", "Kai'Sa", "Lucian",
    "Malzahar", "Miss Fortune", "Qiyana", "Riven", "Sona", "Veigar", "Yasuo", "Ziggs"
  ],
  "Cafe Cuties": [
    "Annie", "Bard", "Gwen", "Jinx", "Lulu", "Poppy", "Rumble", "Sivir", "Soraka", "Vladimir"
  ],
  "Inkshadow": [
    "Aurelion Sol", "Kai'Sa", "Master Yi", "Udyr", "Volibear", "Yasuo", "Yone"
  ],
  "Debonair": [
    "Brand", "Draven", "Ezreal", "Galio", "Jayce", "LeBlanc", "Leona", "Malzahar",
    "Master Yi", "Vi", "Zed"
  ],
  "Astronaut": [
    "Bard", "Corki", "Fizz", "Gnar", "Ivern", "Kennen", "Maokai", "Nautilus",
    "Poppy", "Rammus", "Singed", "Teemo", "Veigar", "Xerath"
  ]
};

// 2. CRITERIA POOL WITH WEIGHTS
const CRITERIA_METADATA = [
  // REGION (Quota: 8)
  { name: "Ionia", cat: "REGION", color: "#38bdf8", weight: 22 },
  { name: "Noxus", cat: "REGION", color: "#38bdf8", weight: 18 },
  { name: "Piltover", cat: "REGION", color: "#38bdf8", weight: 14 },
  { name: "Zaun", cat: "REGION", color: "#38bdf8", weight: 16 },
  { name: "Demacia", cat: "REGION", color: "#38bdf8", weight: 16 },
  { name: "Freljord", cat: "REGION", color: "#38bdf8", weight: 15 },
  { name: "Shurima", cat: "REGION", color: "#38bdf8", weight: 16 },
  { name: "Shadow Isles", cat: "REGION", color: "#38bdf8", weight: 12 },
  { name: "Bilgewater", cat: "REGION", color: "#38bdf8", weight: 13 },
  { name: "Bandle City", cat: "REGION", color: "#38bdf8", weight: 12 },
  { name: "Targon", cat: "REGION", color: "#38bdf8", weight: 9 },
  { name: "Void", cat: "REGION", color: "#38bdf8", weight: 9 },
  { name: "Ixtal", cat: "REGION", color: "#38bdf8", weight: 8 },

  // SKIN (Quota: 4) - Popular and canonical skin sets
  { name: "Spirit Blossom", cat: "SKIN", color: "#ec4899", weight: 22 },
  { name: "PROJECT", cat: "SKIN", color: "#ec4899", weight: 20 },
  { name: "High Noon", cat: "SKIN", color: "#ec4899", weight: 20 },
  { name: "Star Guardian", cat: "SKIN", color: "#ec4899", weight: 19 },
  { name: "Blood Moon", cat: "SKIN", color: "#ec4899", weight: 18 },
  { name: "Pool Party", cat: "SKIN", color: "#ec4899", weight: 17 },
  { name: "Dark Star", cat: "SKIN", color: "#ec4899", weight: 16 },
  { name: "Coven", cat: "SKIN", color: "#ec4899", weight: 15 },
  { name: "Battle Academia", cat: "SKIN", color: "#ec4899", weight: 14 },
  { name: "HEARTSTEEL", cat: "SKIN", color: "#ec4899", weight: 13 },
  { name: "K/DA", cat: "SKIN", color: "#ec4899", weight: 13 },
  { name: "True Damage", cat: "SKIN", color: "#ec4899", weight: 12 },
  { name: "Arcana", cat: "SKIN", color: "#ec4899", weight: 12 },
  { name: "Anima Squad", cat: "SKIN", color: "#ec4899", weight: 12 },
  { name: "Empyrean", cat: "SKIN", color: "#ec4899", weight: 12 },
  { name: "Elderwood", cat: "SKIN", color: "#ec4899", weight: 11 },
  { name: "Winterblessed", cat: "SKIN", color: "#ec4899", weight: 11 },
  { name: "Arcade", cat: "SKIN", color: "#ec4899", weight: 11 },
  { name: "Porcelain", cat: "SKIN", color: "#ec4899", weight: 10 },
  { name: "Sentinel / Ruined", cat: "SKIN", color: "#ec4899", weight: 10 },
  { name: "Battlecast", cat: "SKIN", color: "#ec4899", weight: 10 },
  { name: "Dragonslayer", cat: "SKIN", color: "#ec4899", weight: 9 },
  { name: "Fright Night", cat: "SKIN", color: "#ec4899", weight: 9 },
  { name: "Astronaut", cat: "SKIN", color: "#ec4899", weight: 9 },
  { name: "Debonair", cat: "SKIN", color: "#ec4899", weight: 8 },
  { name: "Cafe Cuties", cat: "SKIN", color: "#ec4899", weight: 8 },
  { name: "Inkshadow", cat: "SKIN", color: "#ec4899", weight: 8 },

  // SPECIES (Quota: 4)
  { name: "Human", cat: "SPECIES", color: "#a855f7", weight: 30 },
  { name: "Monster/Beast", cat: "SPECIES", color: "#a855f7", weight: 18 },
  { name: "Aspect/Celestial", cat: "SPECIES", color: "#a855f7", weight: 14 },
  { name: "Undead/Spirit", cat: "SPECIES", color: "#a855f7", weight: 14 },
  { name: "Yordle", cat: "SPECIES", color: "#a855f7", weight: 12 },
  { name: "Vastaya", cat: "SPECIES", color: "#a855f7", weight: 10 },
  { name: "Golem/Construct", cat: "SPECIES", color: "#a855f7", weight: 7 },
  { name: "Darkin", cat: "SPECIES", color: "#a855f7", weight: 5 },

  // GENDER (Quota: 2)
  { name: "Male", cat: "GENDER", color: "#ec4899", weight: 25 },
  { name: "Female", cat: "GENDER", color: "#ec4899", weight: 25 },
  { name: "Indeterminate", cat: "GENDER", color: "#ec4899", weight: 10 },

  // YEAR (Quota: 3)
  { name: "Released 2009-2013", cat: "YEAR", color: "#facc15", weight: 35 },
  { name: "Released 2014-2018", cat: "YEAR", color: "#facc15", weight: 25 },
  { name: "Released 2019-2023", cat: "YEAR", color: "#facc15", weight: 25 },
  { name: "Released 2023+", cat: "YEAR", color: "#facc15", weight: 10 },

  // ROLE (Quota: 5)
  { name: "Fighter", cat: "ROLE", color: "#f97316", weight: 20 },
  { name: "Mage", cat: "ROLE", color: "#f97316", weight: 20 },
  { name: "Tank", cat: "ROLE", color: "#f97316", weight: 18 },
  { name: "Marksman", cat: "ROLE", color: "#f97316", weight: 18 },
  { name: "Assassin", cat: "ROLE", color: "#f97316", weight: 18 },
  { name: "Support", cat: "ROLE", color: "#f97316", weight: 18 },

  // RESOURCE (Quota: 3)
  { name: "Mana", cat: "RESOURCE", color: "#4ade80", weight: 30 },
  { name: "Manaless", cat: "RESOURCE", color: "#4ade80", weight: 20 },
  { name: "Energy", cat: "RESOURCE", color: "#4ade80", weight: 12 },

  // RANGE (Quota: 2)
  { name: "Melee", cat: "RANGE", color: "#e2e8f0", weight: 20 },
  { name: "Ranged", cat: "RANGE", color: "#e2e8f0", weight: 20 },

  // MECH (Quota: 5)
  { name: "Knockup", cat: "MECH", color: "#c084fc", weight: 20 },
  { name: "Stun", cat: "MECH", color: "#c084fc", weight: 20 },
  { name: "Shield", cat: "MECH", color: "#c084fc", weight: 20 },
  { name: "Dash", cat: "MECH", color: "#c084fc", weight: 20 },
  { name: "Root", cat: "MECH", color: "#c084fc", weight: 18 },
  { name: "True Damage", cat: "MECH", color: "#c084fc", weight: 16 },
  { name: "Stealth", cat: "MECH", color: "#c084fc", weight: 14 },
  { name: "Global Ult", cat: "MECH", color: "#c084fc", weight: 12 },
  { name: "Fear", cat: "MECH", color: "#c084fc", weight: 14 },
  { name: "Silence", cat: "MECH", color: "#c084fc", weight: 12 },
  { name: "Charm", cat: "MECH", color: "#c084fc", weight: 10 },
  { name: "Suppression", cat: "MECH", color: "#c084fc", weight: 10 },
  { name: "Taunt", cat: "MECH", color: "#c084fc", weight: 9 },
  { name: "Blind", cat: "MECH", color: "#c084fc", weight: 9 },
  { name: "Revive", cat: "MECH", color: "#c084fc", weight: 8 }
];

// Balanced Quota Distribution (Sum = 37 hexes exactly)
// User requirement: Gender: 1, Range: 1, Resource: 2; other categories adjusted accordingly
const CATEGORY_QUOTAS = {
  REGION: 9,
  ROLE: 6,
  SKIN: 6,
  MECH: 6,
  SPECIES: 4,
  YEAR: 4,
  RESOURCE: 2,
  GENDER: 1,
  RANGE: 1
};

const AXIAL_DIRECTIONS = [
  { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
  { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }
];

function createSeededRng(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  let a = h >>> 0;
  return function mulberry32() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeightedUnique(pool, count, customRng = Math.random) {
  const selected = [];
  const available = [...pool];

  for (let k = 0; k < count && available.length > 0; k++) {
    const totalWeight = available.reduce((sum, item) => sum + item.weight, 0);
    let rand = customRng() * totalWeight;

    for (let i = 0; i < available.length; i++) {
      rand -= available[i].weight;
      if (rand <= 0) {
        selected.push(available[i]);
        available.splice(i, 1);
        break;
      }
    }
  }

  return selected;
}

function selectBalancedCriteria(customRng = Math.random) {
  const chosenCriteria = [];
  for (const [category, quota] of Object.entries(CATEGORY_QUOTAS)) {
    const categoryPool = CRITERIA_METADATA.filter(c => c.cat === category);
    chosenCriteria.push(...pickWeightedUnique(categoryPool, quota, customRng));
  }
  return chosenCriteria.sort(() => 0.5 - customRng());
}

function matchesCriteria(champName, crit) {
  const c = CHAMPIONS[champName];
  if (!c) return false;

  // Skin Set Match
  if (SKIN_LINES[crit] && SKIN_LINES[crit].includes(champName)) {
    return true;
  }

  if (Array.isArray(c.regions) && c.regions.includes(crit)) return true;
  if (c.region === crit) return true;

  if (Array.isArray(c.ranges) && c.ranges.includes(crit)) return true;
  if (c.range === crit) return true;

  if (Array.isArray(c.roles) && c.roles.includes(crit)) return true;
  if (c.role === crit) return true;

  if (Array.isArray(c.species) && c.species.includes(crit)) return true;
  if (c.species === crit) return true;
  if (c.gender === crit) return true;
  if (c.traits && c.traits.includes(crit)) return true;

  if (crit === "Manaless") {
    if (c.resource === "Manaless" || (c.resource && c.resource.includes("/Other"))) return true;
  } else if (c.resource === crit) {
    return true;
  }

  if (crit === "Released 2009-2013" && (c.year >= 2009 && c.year <= 2013)) return true;
  if (crit === "Released 2014-2018" && (c.year >= 2014 && c.year <= 2018)) return true;
  if (crit === "Released 2019-2023" && (c.year >= 2019 && c.year <= 2023)) return true;
  if (crit === "Released 2023+" && c.year > 2023) return true;

  return false;
}

function generateBoard(seed = null) {
  const customRng = seed ? createSeededRng(seed) : Math.random;

  // Regular 6-fold symmetric hexagonal pattern: 4-5-6-7-6-5-4 (37 hexes)
  // Ensures every hex has maximal and uniform strategic opportunity
  const rowSpecs = [
    { r: -3, count: 4, qMin: 0 },
    { r: -2, count: 5, qMin: -1 },
    { r: -1, count: 6, qMin: -2 },
    { r:  0, count: 7, qMin: -3 },
    { r:  1, count: 6, qMin: -3 },
    { r:  2, count: 5, qMin: -3 },
    { r:  3, count: 4, qMin: -3 }
  ];

  const coords = [];
  rowSpecs.forEach(row => {
    for (let i = 0; i < row.count; i++) {
      const q = row.qMin + i;
      const r = row.r;
      const dist = Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r));
      coords.push({ q, r, dist });
    }
  });

  // Precompute neighbor indices for each coordinate to evaluate physical topology
  coords.forEach((c, idx) => {
    c.neighborIndices = [];
    AXIAL_DIRECTIONS.forEach(d => {
      const nIdx = coords.findIndex(o => o.q === c.q + d.q && o.r === c.r + d.r);
      if (nIdx !== -1) c.neighborIndices.push(nIdx);
    });
  });

  const selectedCriteria = selectBalancedCriteria(customRng);

  // Multi-objective strategic cost evaluator:
  // 1. Clashes (Zero Tolerance): No adjacent tiles share the same category
  // 2. Equal Opportunity / Degree Balance: Categories distributed evenly across interior and perimeter tiles
  // 3. Row Diversity: Criteria categories spread uniformly across all 7 rows (4-5-6-7-6-5-4)
  // 4. Bilateral & Vertical Symmetry: Blue Side vs Red Side and North vs South territory parity
  function evalStrategicLayout(assignment) {
    let penalty = 0;

    // 1. Physical adjacency clash penalty
    for (let i = 0; i < coords.length; i++) {
      const cat = assignment[i].cat;
      for (const nIdx of coords[i].neighborIndices) {
        if (nIdx > i && assignment[nIdx].cat === cat) {
          penalty += 800;
        }
      }
    }

    // 2. Equal Connectivity / Degree Opportunity:
    const degByCat = {};
    for (let i = 0; i < coords.length; i++) {
      const cat = assignment[i].cat;
      if (!degByCat[cat]) degByCat[cat] = [];
      degByCat[cat].push(coords[i].neighborIndices.length);
    }
    const targetAvgDegree = 4.97; // 37 tiles average connectivity
    Object.values(degByCat).forEach(degs => {
      const avg = degs.reduce((a, b) => a + b, 0) / degs.length;
      penalty += Math.abs(avg - targetAvgDegree) * 30;
    });

    // 3. Row category diversity (avoid duplicate categories in a row)
    rowSpecs.forEach(row => {
      const rowCats = {};
      for (let i = 0; i < coords.length; i++) {
        if (coords[i].r === row.r) {
          const cat = assignment[i].cat;
          rowCats[cat] = (rowCats[cat] || 0) + 1;
        }
      }
      Object.values(rowCats).forEach(cnt => {
        if (cnt > 1) penalty += (cnt - 1) * 50;
      });
    });

    // 4. Blue Side (x < 0) vs Red Side (x > 0) territory symmetry
    const blueSideCats = {};
    const redSideCats = {};
    for (let i = 0; i < coords.length; i++) {
      const x = coords[i].q + coords[i].r / 2;
      if (x < -0.1) blueSideCats[assignment[i].cat] = (blueSideCats[assignment[i].cat] || 0) + 1;
      else if (x > 0.1) redSideCats[assignment[i].cat] = (redSideCats[assignment[i].cat] || 0) + 1;
    }

    // 5. North (r < 0) vs South (r > 0) top-to-bottom balance
    const northSideCats = {};
    const southSideCats = {};
    for (let i = 0; i < coords.length; i++) {
      if (coords[i].r < 0) northSideCats[assignment[i].cat] = (northSideCats[assignment[i].cat] || 0) + 1;
      else if (coords[i].r > 0) southSideCats[assignment[i].cat] = (southSideCats[assignment[i].cat] || 0) + 1;
    }

    const allCats = Object.keys(CATEGORY_QUOTAS);
    for (const cat of allCats) {
      const bCount = blueSideCats[cat] || 0;
      const rCount = redSideCats[cat] || 0;
      penalty += Math.abs(bCount - rCount) * 20;

      const nCount = northSideCats[cat] || 0;
      const sCount = southSideCats[cat] || 0;
      penalty += Math.abs(nCount - sCount) * 15;
    }

    return penalty;
  }

  // Simulated annealing optimization to find an optimal strategic layout
  let bestAssignment = [...selectedCriteria];
  let bestScore = evalStrategicLayout(bestAssignment);

  for (let step = 0; step < 2500 && bestScore > 10; step++) {
    const i = Math.floor(customRng() * bestAssignment.length);
    const j = Math.floor(customRng() * bestAssignment.length);
    if (bestAssignment[i].cat === bestAssignment[j].cat) continue;

    const tmp = bestAssignment[i];
    bestAssignment[i] = bestAssignment[j];
    bestAssignment[j] = tmp;

    const newScore = evalStrategicLayout(bestAssignment);
    if (newScore <= bestScore) {
      bestScore = newScore;
    } else {
      bestAssignment[j] = bestAssignment[i];
      bestAssignment[i] = tmp;
    }
  }

  return coords.map((c, i) => ({
    id: `hex_${c.q}_${c.r}`,
    q: c.q,
    r: c.r,
    owner: 0,
    criteriaObj: bestAssignment[i]
  }));
}

function findConnectedChain(room, targetHex, champName, playerNum) {
  const visited = new Set();
  const queue = [targetHex];
  visited.add(targetHex.id);

  const claimedHexIds = [];

  while (queue.length > 0) {
    const current = queue.shift();

    const physicalNeighbors = room.board.filter(b =>
      AXIAL_DIRECTIONS.some(d => (current.q + d.q === b.q) && (current.r + d.r === b.r))
    );

    for (const neighbor of physicalNeighbors) {
      if (visited.has(neighbor.id)) continue;

      if (matchesCriteria(champName, neighbor.criteriaObj.name)) {
        visited.add(neighbor.id);
        queue.push(neighbor);

        if (neighbor.owner !== playerNum || room.mode === 'solo' || room.mode === 'daily_solo') {
          neighbor.owner = playerNum;
          claimedHexIds.push(neighbor.id);
        }
      }
    }
  }

  return claimedHexIds;
}

// Calculate the optimal / best champions given the current board and chaining rule
function calculateOptimalChampions(board, chainingEnabled) {
  const results = [];
  const hexMap = new Map();
  board.forEach(h => hexMap.set(h.id, h));

  // Pre-find neighbors for all hexes
  const neighborMap = new Map();
  board.forEach(h => {
    const neighbors = board.filter(b =>
      AXIAL_DIRECTIONS.some(d => (h.q + d.q === b.q) && (h.r + d.r === b.r))
    );
    neighborMap.set(h.id, neighbors);
  });

  for (const champName of Object.keys(CHAMPIONS)) {
    // Find all hexes matching this champion
    const matchingHexes = board.filter(h => matchesCriteria(champName, h.criteriaObj.name));
    const matchingSet = new Set(matchingHexes.map(h => h.id));
    const matchCount = matchingHexes.length;

    if (matchCount === 0) continue;

    let maxSingleMoveClaim = 0;
    let bestHexForMove = null;

    if (chainingEnabled) {
      // Find connected components among matching hexes
      const visited = new Set();
      for (const h of matchingHexes) {
        if (visited.has(h.id)) continue;
        let componentSize = 0;
        const q = [h];
        visited.add(h.id);
        while (q.length > 0) {
          const curr = q.shift();
          componentSize++;
          const nbrs = neighborMap.get(curr.id) || [];
          for (const n of nbrs) {
            if (matchingSet.has(n.id) && !visited.has(n.id)) {
              visited.add(n.id);
              q.push(n);
            }
          }
        }
        if (componentSize > maxSingleMoveClaim) {
          maxSingleMoveClaim = componentSize;
          bestHexForMove = h.criteriaObj.name;
        }
      }
    } else {
      // Hex chaining OFF: 1 target hex + its immediate adjacent matching neighbors
      for (const h of matchingHexes) {
        const nbrs = neighborMap.get(h.id) || [];
        const adjMatches = nbrs.filter(n => matchingSet.has(n.id)).length;
        const moveClaim = 1 + adjMatches;
        if (moveClaim > maxSingleMoveClaim) {
          maxSingleMoveClaim = moveClaim;
          bestHexForMove = h.criteriaObj.name;
        }
      }
    }

    results.push({
      name: champName,
      maxSingleMoveClaim,
      totalBoardMatches: matchCount,
      bestHexCriteria: bestHexForMove,
      matchingHexCriteria: matchingHexes.map(h => h.criteriaObj.name)
    });
  }

  // Sort descending: highest single-move claim first, tiebreak by total matches on board, then alphabetically
  results.sort((a, b) => {
    if (b.maxSingleMoveClaim !== a.maxSingleMoveClaim) {
      return b.maxSingleMoveClaim - a.maxSingleMoveClaim;
    }
    if (b.totalBoardMatches !== a.totalBoardMatches) {
      return b.totalBoardMatches - a.totalBoardMatches;
    }
    return a.name.localeCompare(b.name);
  });

  return results;
}

// 3. ROOM & MATCHMAKING ENGINE
const rooms = new Map();
// Matchmaking queues mapped by settings key: `${chaining}_${locking}_${duration}`
const matchmakingQueues = new Map();
// Global map: socket.id → roomCode (solves closure scoping for matchmaking)
const socketRoomMap = new Map();

function getMatchmakingKey(settings = {}) {
  const chaining = Boolean(settings.chainingEnabled);
  const locking = settings.championLocking !== undefined ? Boolean(settings.championLocking) : true;
  const parsedDuration = parseInt(settings.roundDuration, 10);
  const duration = [30, 60, 0].includes(parsedDuration) ? parsedDuration : 30;
  return `${chaining ? 1 : 0}_${locking ? 1 : 0}_${duration}`;
}

function createRoom(code, initialSettings = {}) {
  const mode = initialSettings.mode || 'friend'; // 'same_screen', 'online_summoners', 'friend', 'solo', 'daily_solo'
  const isDaily = mode === 'daily_solo' || Boolean(initialSettings.isDaily);

  // Daily Solo Challenge has fixed rules: 2m 30s (150s), Champion Locking: ON, Hex Chaining: ON
  let chainingEnabled = initialSettings.chainingEnabled !== undefined ? Boolean(initialSettings.chainingEnabled) : false;
  let championLocking = initialSettings.championLocking !== undefined ? Boolean(initialSettings.championLocking) : true;
  const parsedDuration = parseInt(initialSettings.roundDuration, 10);
  let roundDuration = [30, 60, 0].includes(parsedDuration) ? parsedDuration : 30;

  if (isDaily) {
    chainingEnabled = true;
    championLocking = true;
    roundDuration = 150; // 2 minutes and 30 seconds
  }

  const boardSeed = isDaily ? getDailyDateKey() : null;

  return {
    code,
    mode,
    isDaily,
    players: {},
    spectators: {},
    board: generateBoard(boardSeed),
    currentPlayer: 1, // 1: Blue, 2: Red
    usedChampions: [],
    timer: null,
    timeLeft: roundDuration,
    roundDuration,
    gameStarted: false,
    chainingEnabled,
    championLocking,
    turnStartTime: Date.now(),
    // End game rematch & statistics state
    rematchVotes: new Set(),
    stats: {
      moves: [], // { playerNum, champName, primaryHexId, stolenHexIds: [], retakenCount: 0 }
      playerStats: {
        1: { hexesOccupied: 0, championsPlayed: [], hexesRetaken: 0, largestChain: 0, timeouts: 0, totalTimeSpent: 0 },
        2: { hexesOccupied: 0, championsPlayed: [], hexesRetaken: 0, largestChain: 0, timeouts: 0, totalTimeSpent: 0 }
      }
    },
    // Solo-Bolo specific state
    soloStats: {
      totalPoints: 0,
      uniqueClaimedCount: 0,
      mistakeCount: 0
    }
  };
}

function startTurnTimer(room) {
  if (room.timer) clearInterval(room.timer);

  const prevTurnStartTime = room.turnStartTime || Date.now();
  const elapsedOnTurn = Math.max(0, Math.round((Date.now() - prevTurnStartTime) / 1000));
  if (room.stats && room.stats.playerStats[room.currentPlayer]) {
    room.stats.playerStats[room.currentPlayer].totalTimeSpent += elapsedOnTurn;
  }
  room.turnStartTime = Date.now();

  // Unlimited Mode: roundDuration === 0
  // Players have unlimited time, but a timer counts up the elapsed seconds on their turn!
  if (room.roundDuration === 0) {
    room.elapsedTime = 0;
    io.to(room.code).emit('timerUpdate', {
      timeLeft: 0,
      totalDuration: 0,
      elapsedTime: 0
    });

    room.timer = setInterval(() => {
      room.elapsedTime = (room.elapsedTime || 0) + 1;
      io.to(room.code).emit('timerUpdate', {
        timeLeft: 0,
        totalDuration: 0,
        elapsedTime: room.elapsedTime
      });
    }, 1000);
    return;
  }

  room.timeLeft = room.roundDuration;
  io.to(room.code).emit('timerUpdate', {
    timeLeft: room.timeLeft,
    totalDuration: room.roundDuration,
    elapsedTime: 0
  });

  room.timer = setInterval(() => {
    room.timeLeft--;
    io.to(room.code).emit('timerUpdate', {
      timeLeft: room.timeLeft,
      totalDuration: room.roundDuration,
      elapsedTime: room.roundDuration - room.timeLeft
    });

    if (room.timeLeft <= 0) {
      clearInterval(room.timer);
      if (room.mode === 'daily_solo') {
        // In Daily Solo Challenge, the entire match duration is 2 minutes and 30 seconds!
        // When the clock expires, the daily run concludes and registers score.
        if (room.stats) {
          const lastTurnElapsed = Math.max(0, Math.round((Date.now() - (room.turnStartTime || Date.now())) / 1000));
          room.stats.playerStats[1].totalTimeSpent += lastTurnElapsed;
          room.stats.playerStats[1].hexesOccupied = room.soloStats.uniqueClaimedCount || 0;
        }
        const optimalChampions = calculateOptimalChampions(room.board, room.chainingEnabled);
        io.to(room.code).emit('gameOver', {
          winner: 1,
          mode: 'daily_solo',
          soloPoints: room.soloStats.totalPoints,
          message: `TIME'S UP! (2m 30s) FINAL SCORE: ${room.soloStats.totalPoints} POINTS!`,
          chainingEnabled: room.chainingEnabled,
          championLocking: room.championLocking,
          stats: room.stats,
          optimalChampions
        });
        return;
      }

      if (room.mode === 'solo') {
        io.to(room.code).emit('turnPass', {
          reason: `Timer expired! Turn reset.`,
          currentPlayer: 1
        });
        startTurnTimer(room);
        return;
      }

      const timedOutPlayer = room.currentPlayer;
      if (room.stats && room.stats.playerStats[timedOutPlayer]) {
        room.stats.playerStats[timedOutPlayer].timeouts++;
      }
      room.currentPlayer = room.currentPlayer === 1 ? 2 : 1;
      io.to(room.code).emit('turnPass', {
        reason: `Player ${timedOutPlayer} ran out of time! Turn passed.`,
        currentPlayer: room.currentPlayer
      });
      startTurnTimer(room);
    }
  }, 1000);
}

io.on('connection', (socket) => {
  // userRoomCode is now backed by the global socketRoomMap so that
  // matchmaking can set the room code for BOTH sockets (not just the current one).
  function getUserRoomCode() { return socketRoomMap.get(socket.id) || null; }
  function setUserRoomCode(code) {
    if (code) socketRoomMap.set(socket.id, code);
    else socketRoomMap.delete(socket.id);
  }
  let inMatchmakingKey = null;

  function removeFromMatchmaking() {
    if (inMatchmakingKey && matchmakingQueues.has(inMatchmakingKey)) {
      const q = matchmakingQueues.get(inMatchmakingKey);
      const filtered = q.filter(entry => entry.socket.id !== socket.id);
      if (filtered.length > 0) {
        matchmakingQueues.set(inMatchmakingKey, filtered);
      } else {
        matchmakingQueues.delete(inMatchmakingKey);
      }
      inMatchmakingKey = null;
    }
  }

  // 1. Online Summoners Matchmaking
  socket.on('findMatch', ({ settings }) => {
    removeFromMatchmaking();
    const mmKey = getMatchmakingKey(settings);
    inMatchmakingKey = mmKey;

    let queue = matchmakingQueues.get(mmKey) || [];
    // Clean up disconnected sockets
    queue = queue.filter(item => item.socket.connected);

    if (queue.length > 0) {
      // Found opponent!
      const opponent = queue.shift();
      matchmakingQueues.set(mmKey, queue);
      inMatchmakingKey = null;

      const randomCode = 'MM-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      const room = createRoom(randomCode, { ...settings, mode: 'online_summoners' });
      rooms.set(randomCode, room);

      // Player 1: Opponent
      opponent.socket.join(randomCode);
      room.players[opponent.socket.id] = { playerNum: 1 };
      socketRoomMap.set(opponent.socket.id, randomCode); // Set room for Player 1 globally!
      opponent.socket.emit('matchFound', { roomCode: randomCode, playerNum: 1 });

      // Player 2: Current socket
      socket.join(randomCode);
      room.players[socket.id] = { playerNum: 2 };
      setUserRoomCode(randomCode);
      socket.emit('matchFound', { roomCode: randomCode, playerNum: 2 });

      // Start the match for both
      room.gameStarted = true;
      [opponent.socket, socket].forEach(s => {
        const pNum = room.players[s.id].playerNum;
        s.emit('initSession', {
          roomCode: randomCode,
          playerNum: pNum,
          board: room.board,
          currentPlayer: room.currentPlayer,
          usedChampions: room.usedChampions,
          championPool: Object.keys(CHAMPIONS),
          chainingEnabled: room.chainingEnabled,
          championLocking: room.championLocking,
          roundDuration: room.roundDuration,
          mode: room.mode
        });
      });

      io.to(randomCode).emit('gameStart', {
        currentPlayer: room.currentPlayer,
        chainingEnabled: room.chainingEnabled,
        championLocking: room.championLocking,
        roundDuration: room.roundDuration,
        mode: room.mode
      });
      startTurnTimer(room);
    } else {
      // Add to queue and wait
      queue.push({ socket, settings });
      matchmakingQueues.set(mmKey, queue);
      socket.emit('matchmakingQueued', { message: 'Searching for an opponent with matching rules...' });
    }
  });

  socket.on('cancelMatchmaking', () => {
    removeFromMatchmaking();
    socket.emit('matchmakingCancelled');
  });

  // 2. Direct / Friend / Same Screen / Solo Room Join
  socket.on('joinRoom', ({ roomCode, settings, mode }) => {
    removeFromMatchmaking();
    const code = (roomCode || '').trim().toUpperCase();
    if (!code) return;

    let room = rooms.get(code);
    if (!room) {
      room = createRoom(code, { ...settings, mode });
      rooms.set(code, room);
    }

    const currentCount = Object.keys(room.players).length;

    // Solo, Daily-Solo, or Same-Screen single client check
    if (mode === 'solo' || mode === 'daily_solo' || mode === 'same_screen') {
      room.mode = mode;
      room.players[socket.id] = { playerNum: 1 };
      setUserRoomCode(code);
      socket.join(code);

      if (settings && mode !== 'daily_solo') {
        if (settings.chainingEnabled !== undefined) room.chainingEnabled = Boolean(settings.chainingEnabled);
        if (settings.championLocking !== undefined) room.championLocking = Boolean(settings.championLocking);
        const dur = parseInt(settings.roundDuration, 10);
        if ([30, 60, 0].includes(dur)) room.roundDuration = dur;
      }

      room.gameStarted = true;
      socket.emit('initSession', {
        roomCode: code,
        playerNum: 1,
        board: room.board,
        currentPlayer: 1,
        usedChampions: room.usedChampions,
        championPool: Object.keys(CHAMPIONS),
        chainingEnabled: room.chainingEnabled,
        championLocking: room.championLocking,
        roundDuration: room.roundDuration,
        mode: room.mode,
        isDaily: room.isDaily
      });

      socket.emit('gameStart', {
        currentPlayer: 1,
        chainingEnabled: room.chainingEnabled,
        championLocking: room.championLocking,
        roundDuration: room.roundDuration,
        mode: room.mode,
        isDaily: room.isDaily
      });
      startTurnTimer(room);
      return;
    }

    // Friend / Custom Room: 1st player is P1, 2nd player is P2, 3rd+ players join as SPECTATORS!
    if (!room.spectators) room.spectators = {};

    let playerNum = 0;
    let isSpectator = false;

    if (room.players[socket.id]) {
      playerNum = room.players[socket.id].playerNum;
    } else if (room.spectators[socket.id]) {
      isSpectator = true;
      playerNum = 0;
    } else if (currentCount < 2) {
      playerNum = currentCount === 0 ? 1 : 2;
      room.players[socket.id] = { playerNum };
    } else {
      // 3rd or later summoner: join as Spectator
      isSpectator = true;
      playerNum = 0;
      room.spectators[socket.id] = { spectator: true };
    }

    setUserRoomCode(code);
    socket.join(code);

    if (playerNum === 1 && settings) {
      if (settings.chainingEnabled !== undefined) room.chainingEnabled = Boolean(settings.chainingEnabled);
      if (settings.championLocking !== undefined) room.championLocking = Boolean(settings.championLocking);
      const dur = parseInt(settings.roundDuration, 10);
      if ([30, 60, 0].includes(dur)) room.roundDuration = dur;
    }

    socket.emit('initSession', {
      roomCode: code,
      playerNum,
      isSpectator,
      board: room.board,
      currentPlayer: room.currentPlayer,
      usedChampions: room.usedChampions,
      championPool: Object.keys(CHAMPIONS),
      chainingEnabled: room.chainingEnabled,
      championLocking: room.championLocking,
      roundDuration: room.roundDuration,
      mode: room.mode,
      gameStarted: room.gameStarted || false
    });

    // If a spectator joins an already running game, notify them immediately
    if (isSpectator && room.gameStarted) {
      socket.emit('gameStart', {
        currentPlayer: room.currentPlayer,
        chainingEnabled: room.chainingEnabled,
        championLocking: room.championLocking,
        roundDuration: room.roundDuration,
        mode: room.mode
      });
    }

    const activePlayers = Object.values(room.players);
    if (activePlayers.length === 2 && !room.gameStarted) {
      room.gameStarted = true;
      io.to(code).emit('gameStart', {
        currentPlayer: room.currentPlayer,
        chainingEnabled: room.chainingEnabled,
        championLocking: room.championLocking,
        roundDuration: room.roundDuration,
        mode: room.mode
      });
      startTurnTimer(room);
    }
  });

  socket.on('toggleChaining', ({ enabled }) => {
    const room = rooms.get(getUserRoomCode());
    if (!room) return;
    const player = room.players[socket.id];
    if (!player || player.playerNum !== 1) return;

    room.chainingEnabled = Boolean(enabled);
    io.to(room.code).emit('settingsUpdated', {
      chainingEnabled: room.chainingEnabled,
      championLocking: room.championLocking,
      roundDuration: room.roundDuration,
      message: `Host set Hex Chaining: ${room.chainingEnabled ? 'ON' : 'OFF'}`
    });
  });

  socket.on('toggleChampionLocking', ({ enabled }) => {
    const room = rooms.get(getUserRoomCode());
    if (!room) return;
    const player = room.players[socket.id];
    if (!player || player.playerNum !== 1) return;

    room.championLocking = Boolean(enabled);
    io.to(room.code).emit('settingsUpdated', {
      chainingEnabled: room.chainingEnabled,
      championLocking: room.championLocking,
      roundDuration: room.roundDuration,
      message: `Host set Champion Locking: ${room.championLocking ? 'ON' : 'OFF'}`
    });
  });

  socket.on('setRoundDuration', ({ duration }) => {
    const room = rooms.get(getUserRoomCode());
    if (!room) return;
    const player = room.players[socket.id];
    if (!player || player.playerNum !== 1) return;

    const parsed = parseInt(duration, 10);
    if ([30, 60, 0].includes(parsed)) {
      room.roundDuration = parsed;
      io.to(room.code).emit('settingsUpdated', {
        chainingEnabled: room.chainingEnabled,
        championLocking: room.championLocking,
        roundDuration: room.roundDuration,
        message: `Host set Turn Timer: ${parsed === 0 ? 'Unlimited' : parsed + 's'}`
      });
      if (room.gameStarted) {
        startTurnTimer(room);
      }
    }
  });

  socket.on('submitMove', ({ hexId, champName }) => {
    const room = rooms.get(getUserRoomCode());
    if (!room) return;

    const player = room.players[socket.id];
    if (!player) return;

    // In online 2-player modes, the socket must belong to the currentPlayer.
    // In same_screen and solo, one socket operates the session so turns alternate freely!
    if (room.mode !== 'same_screen' && room.mode !== 'solo' && room.mode !== 'daily_solo') {
      if (player.playerNum !== room.currentPlayer) {
        socket.emit('errorMsg', "It is not your turn!");
        return;
      }
    }

    const targetHex = room.board.find(h => h.id === hexId);
    if (!targetHex) {
      socket.emit('errorMsg', "Target hex not found!");
      return;
    }

    const isSolo = (room.mode === 'solo' || room.mode === 'daily_solo');

    // In 2-player modes, target must be neutral (owner === 0).
    // In Solo-Bolo, target can be claimed multiple times with different champions!
    if (!isSolo && targetHex.owner !== 0) {
      socket.emit('errorMsg', "Target must be an unclaimed, neutral hex!");
      return;
    }

    let rawInput = (champName || '').trim();
    if (rawInput.toLowerCase() === 'rhaast') {
      rawInput = 'Kayn';
    }
    let validKey = Object.keys(CHAMPIONS).find(k => k.toLowerCase() === rawInput.toLowerCase());

    // Resolve partial / prefix champion names (e.g. "voli" -> "Volibear", requires >= 3 chars)
    if (!validKey && rawInput.length >= 3) {
      const lower = rawInput.toLowerCase();
      const starts = Object.keys(CHAMPIONS).filter(k => k.toLowerCase().startsWith(lower));
      if (starts.length > 0) {
        if (room.championLocking) {
          const unlocked = starts.find(k => !room.usedChampions.includes(k));
          validKey = unlocked || starts[0];
        } else {
          validKey = starts[0];
        }
      } else {
        const contains = Object.keys(CHAMPIONS).filter(k => k.toLowerCase().includes(lower));
        if (contains.length > 0) {
          if (room.championLocking) {
            const unlocked = contains.find(k => !room.usedChampions.includes(k));
            validKey = unlocked || contains[0];
          } else {
            validKey = contains[0];
          }
        }
      }
    }

    function handleMistake(reason) {
      let penaltyInfo = null;
      if (isSolo) {
        room.soloStats.mistakeCount = (room.soloStats.mistakeCount || 0) + 1;
        const count = room.soloStats.mistakeCount;
        const penalty = (count * (count + 1)) / 2;
        room.soloStats.totalPoints = (room.soloStats.totalPoints || 0) - penalty;
        penaltyInfo = {
          mistakeCount: count,
          penaltyPoints: penalty,
          totalPoints: room.soloStats.totalPoints
        };
      }

      io.to(room.code).emit('hexVibrate', {
        hexId: targetHex.id,
        reason,
        playerNum: room.currentPlayer,
        penalty: penaltyInfo
      });
      if (isSolo) {
        // Solo mode keeps player on their turn
        startTurnTimer(room);
      } else {
        passTurn(room, reason);
      }
    }

    if (!validKey) {
      handleMistake(`Invalid champion! ${isSolo ? 'Try again.' : 'Turn passes.'}`);
      return;
    }

    if (isSolo && targetHex.claimedChampions && targetHex.claimedChampions.includes(validKey)) {
      handleMistake(`${validKey} was already played on this hex! Use another champion.`);
      return;
    }

    if (room.championLocking && room.usedChampions.includes(validKey)) {
      handleMistake(`Champion was already locked! ${isSolo ? 'Try another.' : 'Turn passes.'}`);
      return;
    }

    if (!matchesCriteria(validKey, targetHex.criteriaObj.name)) {
      handleMistake(`Criteria mismatch! ${isSolo ? 'Try again.' : 'Turn passes.'}`);
      return;
    }

    if (room.championLocking) {
      room.usedChampions.push(validKey);
    }
    targetHex.owner = room.currentPlayer;
    targetHex.claimedBy = validKey;
    if (!targetHex.claimedChampions) targetHex.claimedChampions = [];
    if (!targetHex.claimedChampions.includes(validKey)) {
      targetHex.claimedChampions.push(validKey);
    }

    let stolenHexIds = [];

    if (room.chainingEnabled) {
      stolenHexIds = findConnectedChain(room, targetHex, validKey, room.currentPlayer);
      stolenHexIds.forEach(id => {
        const hex = room.board.find(h => h.id === id);
        if (hex) {
          hex.claimedBy = validKey;
          if (!hex.claimedChampions) hex.claimedChampions = [];
          if (!hex.claimedChampions.includes(validKey)) hex.claimedChampions.push(validKey);
        }
      });
    } else {
      const neighbors = room.board.filter(b =>
        AXIAL_DIRECTIONS.some(d => (targetHex.q + d.q === b.q) && (targetHex.r + d.r === b.r))
      );
      neighbors.forEach(n => {
        if (matchesCriteria(validKey, n.criteriaObj.name) && (n.owner !== room.currentPlayer || isSolo)) {
          n.owner = room.currentPlayer;
          n.claimedBy = validKey;
          if (!n.claimedChampions) n.claimedChampions = [];
          if (!n.claimedChampions.includes(validKey)) n.claimedChampions.push(validKey);
          stolenHexIds.push(n.id);
        }
      });
    }

    if (isSolo) {
      // Solo-Bolo points calculation:
      // Triangular number formula: N hexes captured in this move gives N * (N + 1) / 2 points!
      // (1 hex = 1 pt, 2 hexes = 3 pts, 3 hexes = 6 pts, 4 hexes = 10 pts, ...)
      const moveHexCount = 1 + stolenHexIds.length;
      const pointsEarned = (moveHexCount * (moveHexCount + 1)) / 2;
      room.soloStats.totalPoints += pointsEarned;

      const uniqueClaimed = room.board.filter(h => h.owner !== 0).length;
      room.soloStats.uniqueClaimedCount = uniqueClaimed;

      // Track solo stats
      if (room.stats && room.stats.playerStats[1]) {
        const p1Stats = room.stats.playerStats[1];
        if (!p1Stats.championsPlayed.includes(validKey)) {
          p1Stats.championsPlayed.push(validKey);
        }
        if (moveHexCount > p1Stats.largestChain) {
          p1Stats.largestChain = moveHexCount;
        }
        if (stolenHexIds.length > 0) {
          p1Stats.hexesRetaken += stolenHexIds.length;
        }
        room.stats.moves.push({
          playerNum: 1,
          champName: validKey,
          primaryHexId: targetHex.id,
          stolenHexIds: [...stolenHexIds],
          totalClaimed: moveHexCount,
          pointsEarned
        });
      }

      // Build map of hexId -> claimCount for solo visual progression
      const hexClaimCounts = {};
      room.board.forEach(h => {
        if (h.claimedChampions && h.claimedChampions.length > 0) {
          hexClaimCounts[h.id] = h.claimedChampions.length;
        }
      });

      io.to(room.code).emit('moveSuccess', {
        primaryHexId: targetHex.id,
        stolenHexIds,
        playerNum: 1,
        champName: validKey,
        mode: 'solo',
        soloPoints: room.soloStats.totalPoints,
        pointsEarned,
        moveHexCount,
        uniqueClaimed,
        totalHexes: room.board.length,
        chained: room.chainingEnabled,
        hexClaimCounts
      });

      // Solo game ends when all 37 hexes have been captured at least once
      if (uniqueClaimed >= room.board.length) {
        if (room.timer) clearInterval(room.timer);

        // Finalize occupied hex counts and elapsed time in stats
        if (room.stats) {
          const lastTurnElapsed = Math.max(0, Math.round((Date.now() - (room.turnStartTime || Date.now())) / 1000));
          room.stats.playerStats[1].totalTimeSpent += lastTurnElapsed;
          room.stats.playerStats[1].hexesOccupied = uniqueClaimed;
        }

        const optimalChampions = calculateOptimalChampions(room.board, room.chainingEnabled);

        io.to(room.code).emit('gameOver', {
          winner: 1,
          mode: room.mode,
          soloPoints: room.soloStats.totalPoints,
          message: `CONGRATULATIONS! ALL 37 HEXES CAPTURED! FINAL SCORE: ${room.soloStats.totalPoints} POINTS!`,
          chainingEnabled: room.chainingEnabled,
          championLocking: room.championLocking,
          stats: room.stats,
          optimalChampions
        });
        return;
      }

      if (room.mode !== 'daily_solo') {
        startTurnTimer(room);
      }
      return;
    }

    // Standard 2-Player modes (Same Screen, Online Summoners, Online With a Friend)
    const unowned = room.board.filter(h => h.owner === 0).length;
    const p1Count = room.board.filter(h => h.owner === 1).length;
    const p2Count = room.board.filter(h => h.owner === 2).length;

    // Track statistics for 2-player modes
    if (room.stats && room.stats.playerStats[room.currentPlayer]) {
      const pStats = room.stats.playerStats[room.currentPlayer];
      pStats.championsPlayed.push(validKey);
      
      const totalMoveHexes = 1 + stolenHexIds.length;
      if (totalMoveHexes > pStats.largestChain) {
        pStats.largestChain = totalMoveHexes;
      }
      if (stolenHexIds.length > 0) {
        pStats.hexesRetaken += stolenHexIds.length;
      }

      room.stats.moves.push({
        playerNum: room.currentPlayer,
        champName: validKey,
        primaryHexId: targetHex.id,
        stolenHexIds: [...stolenHexIds],
        totalClaimed: totalMoveHexes
      });
    }

    io.to(room.code).emit('moveSuccess', {
      primaryHexId: targetHex.id,
      stolenHexIds,
      playerNum: room.currentPlayer,
      champName: validKey,
      p1Score: p1Count,
      p2Score: p2Count,
      unowned,
      mode: room.mode,
      chained: room.chainingEnabled
    });

    if (unowned === 0) {
      if (room.timer) clearInterval(room.timer);
      let winner = 0;
      if (p1Count > p2Count) winner = 1;
      else if (p2Count > p1Count) winner = 2;

      // Finalize occupied hex counts and elapsed time in stats
      if (room.stats) {
        const lastTurnElapsed = Math.max(0, Math.round((Date.now() - (room.turnStartTime || Date.now())) / 1000));
        if (room.stats.playerStats[room.currentPlayer]) {
          room.stats.playerStats[room.currentPlayer].totalTimeSpent += lastTurnElapsed;
        }
        room.stats.playerStats[1].hexesOccupied = p1Count;
        room.stats.playerStats[2].hexesOccupied = p2Count;
      }

      // Pre-calculate optimal champions for this final board
      const optimalChampions = calculateOptimalChampions(room.board, room.chainingEnabled);

      io.to(room.code).emit('gameOver', {
        winner,
        p1Score: p1Count,
        p2Score: p2Count,
        mode: room.mode,
        chainingEnabled: room.chainingEnabled,
        championLocking: room.championLocking,
        stats: room.stats,
        optimalChampions
      });
      return;
    }

    room.currentPlayer = room.currentPlayer === 1 ? 2 : 1;
    io.to(room.code).emit('turnPass', {
      reason: `${validKey} claimed ${1 + stolenHexIds.length} hex(es)!`,
      currentPlayer: room.currentPlayer
    });
    startTurnTimer(room);
  });

  function passTurn(room, reason) {
    room.currentPlayer = room.currentPlayer === 1 ? 2 : 1;
    io.to(room.code).emit('turnPass', {
      reason,
      currentPlayer: room.currentPlayer
    });
    startTurnTimer(room);
  }

  // Rematch request handler for Online Summoners and Online With a Friend
  socket.on('requestRematch', () => {
    const roomCode = getUserRoomCode();
    if (!roomCode || !rooms.has(roomCode)) return;
    const room = rooms.get(roomCode);
    const playerInfo = room.players[socket.id];
    if (!playerInfo) return;

    if (!room.rematchVotes) room.rematchVotes = new Set();
    room.rematchVotes.add(playerInfo.playerNum);

    const activePlayerNums = Object.values(room.players).map(p => p.playerNum);
    const totalPlayers = activePlayerNums.length;
    const votesCount = room.rematchVotes.size;

    // Broadcast current vote status to both players
    io.to(room.code).emit('rematchStatusUpdate', {
      votedPlayerNums: Array.from(room.rematchVotes),
      needed: totalPlayers,
      voterNum: playerInfo.playerNum
    });

    const isSingleClient = room.mode === 'solo' || room.mode === 'daily_solo' || room.mode === 'same_screen';
    const requiredVotes = isSingleClient ? 1 : 2;

    // Check if rematch conditions met
    if (votesCount >= requiredVotes) {
      if (room.timer) clearInterval(room.timer);

      // Reset match state with fresh board (or daily seed)
      const boardSeed = room.isDaily ? getDailyDateKey() : null;
      room.board = generateBoard(boardSeed);
      room.currentPlayer = 1;
      room.usedChampions = [];
      room.rematchVotes = new Set();
      room.turnStartTime = Date.now();
      room.soloStats = {
        totalPoints: 0,
        uniqueClaimedCount: 0,
        mistakeCount: 0
      };
      room.stats = {
        moves: [],
        playerStats: {
          1: { hexesOccupied: 0, championsPlayed: [], hexesRetaken: 0, largestChain: 0, timeouts: 0, totalTimeSpent: 0 },
          2: { hexesOccupied: 0, championsPlayed: [], hexesRetaken: 0, largestChain: 0, timeouts: 0, totalTimeSpent: 0 }
        }
      };
      room.gameStarted = true;

      // Re-initialize session for player(s) and spectator(s)
      const allSockets = { ...room.players, ...(room.spectators || {}) };
      Object.entries(allSockets).forEach(([pSocketId, pData]) => {
        const isSpec = Boolean(pData.spectator);
        io.to(pSocketId).emit('initSession', {
          roomCode: room.code,
          playerNum: isSpec ? 0 : pData.playerNum,
          isSpectator: isSpec,
          board: room.board,
          currentPlayer: room.currentPlayer,
          usedChampions: room.usedChampions,
          championPool: Object.keys(CHAMPIONS),
          chainingEnabled: room.chainingEnabled,
          championLocking: room.championLocking,
          roundDuration: room.roundDuration,
          mode: room.mode,
          isDaily: room.isDaily
        });
      });

      io.to(room.code).emit('gameStart', {
        currentPlayer: room.currentPlayer,
        chainingEnabled: room.chainingEnabled,
        championLocking: room.championLocking,
        roundDuration: room.roundDuration,
        mode: room.mode
      });
      startTurnTimer(room);
    }
  });

  socket.on('leaveGame', () => {
    removeFromMatchmaking();
    const roomCode = getUserRoomCode();
    if (roomCode && rooms.has(roomCode)) {
      const room = rooms.get(roomCode);
      delete room.players[socket.id];
      if (room.spectators) delete room.spectators[socket.id];
      socket.leave(roomCode);
      const totalInRoom = Object.keys(room.players).length + Object.keys(room.spectators || {}).length;
      if (totalInRoom === 0) {
        if (room.timer) clearInterval(room.timer);
        rooms.delete(roomCode);
      } else {
        io.to(roomCode).emit('playerDisconnected');
      }
      setUserRoomCode(null);
    }
  });

  socket.on('disconnect', () => {
    removeFromMatchmaking();
    const roomCode = getUserRoomCode();
    if (roomCode && rooms.has(roomCode)) {
      const room = rooms.get(roomCode);
      delete room.players[socket.id];
      if (room.spectators) delete room.spectators[socket.id];
      const totalInRoom = Object.keys(room.players).length + Object.keys(room.spectators || {}).length;
      if (totalInRoom === 0) {
        if (room.timer) clearInterval(room.timer);
        rooms.delete(roomCode);
      } else {
        io.to(roomCode).emit('playerDisconnected');
      }
    }
    socketRoomMap.delete(socket.id); // Clean up global map on disconnect
  });
});

// Render binding fix: 0.0.0.0 host binding + process.env.PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Rift Possession running on port ${PORT}`);
});