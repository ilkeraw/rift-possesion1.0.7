const socket = io();

let myPlayerNum = 0;
let currentPlayer = 1;
let selectedHexId = null;
let boardState = [];
let gameActive = false;

// Navigation Screens
const startScreen = document.getElementById('start-screen');
const optionsScreen = document.getElementById('options-screen');
const gameScreen = document.getElementById('game-screen');

// Mode Selection Buttons
const btnModeSameScreen = document.getElementById('btn-mode-same-screen');
const btnModeOnlineSummoners = document.getElementById('btn-mode-online-summoners');
const btnModeOnlineFriend = document.getElementById('btn-mode-online-friend');
const btnModeSolo = document.getElementById('btn-mode-solo');

// Options Screen Elements
const selectedModeBadge = document.getElementById('selected-mode-badge');
const selectedModeTitle = document.getElementById('selected-mode-title');
const selectedModeSubtitle = document.getElementById('selected-mode-subtitle');
const roomCodeGroup = document.getElementById('room-code-group');
const roomInput = document.getElementById('room-input');
const chainToggle = document.getElementById('chain-toggle');
const lockingToggle = document.getElementById('locking-toggle');
const timerSelect = document.getElementById('timer-select');
const optionsStatus = document.getElementById('options-status');
const optionsBackBtn = document.getElementById('options-back-btn');
const optionsStartBtn = document.getElementById('options-start-btn');
const btnLeaveGame = document.getElementById('btn-leave-game');

// Game Screen Elements
const activeRoomDisplay = document.getElementById('active-room-display');
const hexGrid = document.getElementById('hex-grid');
const selectedDisplay = document.getElementById('selected-criteria-display');
const champInput = document.getElementById('champ-input');
const submitBtn = document.getElementById('submit-btn');
const systemMsg = document.getElementById('system-msg');
const turnAnnounce = document.getElementById('turn-announcement');
const p1Score = document.getElementById('p1-score');
const p2Score = document.getElementById('p2-score');
const p1Title = document.getElementById('p1-title');
const p2Title = document.getElementById('p2-title');
const badgeP1 = document.getElementById('badge-p1');
const badgeP2 = document.getElementById('badge-p2');
const badgeSoloHexes = document.getElementById('badge-solo-hexes');
const badgeSoloPoints = document.getElementById('badge-solo-points');
const soloHexCount = document.getElementById('solo-hex-count');
const soloPoints = document.getElementById('solo-points');
const soloComboLbl = document.getElementById('solo-combo-lbl');
const timerProgress = document.getElementById('timer-progress');
const autocompleteList = document.getElementById('autocomplete-list');

let currentMode = 'same_screen'; // 'same_screen', 'online_summoners', 'online_friend', 'solo'
let championPool = [];
let usedChampions = [];
let currentSuggestions = [];
let activeSuggestionIndex = -1;

const HEX_RADIUS = 41;
function hexToPixel(q, r) {
  const x = HEX_RADIUS * Math.sqrt(3) * (q + r / 2);
  const y = HEX_RADIUS * (3 / 2) * r;
  return { x, y };
}

function createHexPoints(radius) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    points.push(`${radius * Math.cos(angle)},${radius * Math.sin(angle)}`);
  }
  return points.join(' ');
}

// Screen Navigation Helpers
function showScreen(screenEl) {
  [startScreen, optionsScreen, gameScreen].forEach(s => {
    if (s) s.classList.add('hidden');
  });
  if (screenEl) screenEl.classList.remove('hidden');
}

function openOptionsMenu(mode) {
  currentMode = mode;
  optionsStatus.innerText = '';
  optionsStartBtn.disabled = false;

  if (mode === 'same_screen') {
    selectedModeBadge.innerText = 'LOCAL PLAY';
    selectedModeTitle.innerText = 'SAME SCREEN';
    selectedModeSubtitle.innerText = '2 Players take turns on this device';
    if (roomCodeGroup) {
      roomCodeGroup.classList.add('hidden');
      roomCodeGroup.style.display = 'none';
    }
    optionsStartBtn.innerText = 'START SAME SCREEN MATCH';
  } else if (mode === 'online_summoners') {
    selectedModeBadge.innerText = 'MATCHMAKING';
    selectedModeTitle.innerText = 'ONLINE SUMMONERS';
    selectedModeSubtitle.innerText = 'Find an opponent online with these exact game options';
    if (roomCodeGroup) {
      roomCodeGroup.classList.add('hidden');
      roomCodeGroup.style.display = 'none';
    }
    optionsStartBtn.innerText = 'FIND OPPONENT';
  } else if (mode === 'online_friend') {
    selectedModeBadge.innerText = 'PRIVATE DUEL';
    selectedModeTitle.innerText = 'ONLINE WITH A FRIEND';
    selectedModeSubtitle.innerText = 'Enter the same room code and options to duel a friend';
    if (roomCodeGroup) {
      roomCodeGroup.classList.remove('hidden');
      roomCodeGroup.style.display = 'block';
    }
    optionsStartBtn.innerText = 'JOIN / CREATE ROOM';
    setTimeout(() => roomInput.focus(), 100);
  } else if (mode === 'solo') {
    selectedModeBadge.innerText = 'SOLO CHALLENGE';
    selectedModeTitle.innerText = 'SOLO-BOLO';
    selectedModeSubtitle.innerText = 'Capture all 37 hexes. Hex re-captures yield combo points!';
    if (roomCodeGroup) {
      roomCodeGroup.classList.add('hidden');
      roomCodeGroup.style.display = 'none';
    }
    optionsStartBtn.innerText = 'START SOLO-BOLO';
  }

  showScreen(optionsScreen);
}

// Mode Selection Button Handlers
if (btnModeSameScreen) {
  btnModeSameScreen.addEventListener('click', () => openOptionsMenu('same_screen'));
}
if (btnModeOnlineSummoners) {
  btnModeOnlineSummoners.addEventListener('click', () => openOptionsMenu('online_summoners'));
}
if (btnModeOnlineFriend) {
  btnModeOnlineFriend.addEventListener('click', () => openOptionsMenu('online_friend'));
}
if (btnModeSolo) {
  btnModeSolo.addEventListener('click', () => openOptionsMenu('solo'));
}

if (optionsBackBtn) {
  optionsBackBtn.addEventListener('click', () => {
    socket.emit('cancelMatchmaking');
    showScreen(startScreen);
  });
}

if (btnLeaveGame) {
  btnLeaveGame.addEventListener('click', () => {
    if (confirm("Return to main menu? This will exit the current match.")) {
      socket.emit('leaveGame');
      gameActive = false;

      // Reset scoreboard displays
      if (p1Score) p1Score.innerText = '0';
      if (p2Score) p2Score.innerText = '0';
      if (soloHexCount) soloHexCount.innerText = '0/37';
      if (soloPoints) soloPoints.innerText = '0';
      if (soloComboLbl) soloComboLbl.innerText = 'PTS';

      // Reset UI state
      champInput.value = '';
      champInput.disabled = true;
      if (submitBtn) submitBtn.disabled = true;
      selectedHexId = null;
      turnAnnounce.innerText = '';
      systemMsg.innerText = '';

      // Reset options screen for next use
      if (optionsStartBtn) optionsStartBtn.disabled = false;
      if (optionsStatus) { optionsStatus.innerText = ''; optionsStatus.style.color = ''; }

      showScreen(startScreen);
    }
  });
}

function handleStartGameFromOptions() {
  const settings = {
    chainingEnabled: chainToggle.checked,
    championLocking: lockingToggle.checked,
    roundDuration: parseInt(timerSelect.value, 10)
  };

  if (currentMode === 'online_summoners') {
    optionsStatus.innerText = "Searching for an online summoner with matching rules...";
    optionsStatus.style.color = "#38bdf8";
    optionsStartBtn.disabled = true;
    socket.emit('findMatch', { settings });
    return;
  }

  if (currentMode === 'online_friend') {
    const code = roomInput.value.trim().toUpperCase();
    if (!code) {
      optionsStatus.innerText = "Please enter a Room Code to play with a friend!";
      optionsStatus.style.color = "#ef4444";
      roomInput.focus();
      return;
    }
    optionsStatus.innerText = `Connecting to room ${code}...`;
    optionsStatus.style.color = "#38bdf8";
    optionsStartBtn.disabled = true;
    socket.emit('joinRoom', {
      roomCode: code,
      settings,
      mode: 'friend'
    });
    return;
  }

  if (currentMode === 'same_screen') {
    const localRoom = 'LOCAL-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    optionsStartBtn.disabled = true;
    socket.emit('joinRoom', {
      roomCode: localRoom,
      settings,
      mode: 'same_screen'
    });
    return;
  }

  if (currentMode === 'solo') {
    const soloRoom = 'SOLO-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    optionsStartBtn.disabled = true;
    socket.emit('joinRoom', {
      roomCode: soloRoom,
      settings,
      mode: 'solo'
    });
    return;
  }
}

if (optionsStartBtn) {
  optionsStartBtn.addEventListener('click', handleStartGameFromOptions);
}

if (roomInput) {
  roomInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleStartGameFromOptions();
  });
}

function applyControlPermissions() {
  const isP2 = (myPlayerNum === 2 && currentMode !== 'same_screen');
  chainToggle.disabled = isP2;
  lockingToggle.disabled = isP2;
  timerSelect.disabled = isP2;

  document.querySelectorAll('.toggle-card').forEach(card => {
    if (isP2) {
      card.classList.add('readonly');
      card.setAttribute('title', 'Controlled by Player 1 (Host)');
    } else {
      card.classList.remove('readonly');
      card.removeAttribute('title');
    }
  });
}

function showGameScreen(roomCode, mode) {
  showScreen(gameScreen);
  if (activeRoomDisplay && roomCode) {
    activeRoomDisplay.innerText = roomCode.toUpperCase();
  }

  // Adjust scoreboards for Solo-Bolo vs 2-Player modes
  if (mode === 'solo') {
    if (badgeP1) badgeP1.classList.add('hidden');
    if (badgeP2) badgeP2.classList.add('hidden');
    if (badgeSoloHexes) badgeSoloHexes.classList.remove('hidden');
    if (badgeSoloPoints) badgeSoloPoints.classList.remove('hidden');
  } else {
    if (badgeP1) badgeP1.classList.remove('hidden');
    if (badgeP2) badgeP2.classList.remove('hidden');
    if (badgeSoloHexes) badgeSoloHexes.classList.add('hidden');
    if (badgeSoloPoints) badgeSoloPoints.classList.add('hidden');
  }
}

// Socket Matchmaking & Session Handlers
socket.on('matchmakingQueued', ({ message }) => {
  optionsStatus.innerText = message || 'Searching for opponent...';
  optionsStatus.style.color = '#38bdf8';
});

socket.on('matchmakingCancelled', () => {
  optionsStatus.innerText = 'Matchmaking cancelled.';
  optionsStatus.style.color = '#94a3b8';
  optionsStartBtn.disabled = false;
});

socket.on('matchFound', ({ roomCode, playerNum }) => {
  optionsStatus.innerText = `Opponent matched! Connecting to arena...`;
  optionsStatus.style.color = '#4ade80';
});

socket.on('settingsUpdated', ({ chainingEnabled, championLocking, roundDuration, message }) => {
  chainToggle.checked = chainingEnabled;
  lockingToggle.checked = championLocking;
  timerSelect.value = roundDuration;
  if (message) {
    systemMsg.innerText = message;
  } else if (gameActive) {
    const timerText = roundDuration === 0 ? 'Unlimited' : `${roundDuration}s`;
    systemMsg.innerText = `Settings updated! Mode: ${chainingEnabled ? 'Chain ON' : 'Chain OFF'} | Locking: ${championLocking ? 'ON' : 'OFF'} | Timer: ${timerText}`;
  }
});

socket.on('initSession', (data) => {
  myPlayerNum = data.playerNum;
  currentPlayer = data.currentPlayer;
  boardState = data.board;
  chainToggle.checked = data.chainingEnabled;
  lockingToggle.checked = data.championLocking;
  timerSelect.value = data.roundDuration;
  championPool = data.championPool || [];
  usedChampions = data.usedChampions || [];
  if (data.mode) currentMode = data.mode;

  // Reset all scoreboard values for fresh session
  if (p1Score) p1Score.innerText = '0';
  if (p2Score) p2Score.innerText = '0';
  if (soloHexCount) soloHexCount.innerText = '0/37';
  if (soloPoints) soloPoints.innerText = '0';
  if (soloComboLbl) soloComboLbl.innerText = 'PTS';

  // Reset champion input and selection state
  champInput.value = '';
  champInput.disabled = true;
  if (submitBtn) submitBtn.disabled = true;
  selectedHexId = null;
  selectedDisplay.innerHTML = 'Selected: <em>None</em>';
  hideSuggestions();

  applyControlPermissions();

  const code = (activeRoomDisplay && activeRoomDisplay.innerText !== '----') ? activeRoomDisplay.innerText : (data.mode ? data.mode.toUpperCase() : 'GAME');
  showGameScreen(code, currentMode);

  if (currentMode === 'solo') {
    systemMsg.innerText = "Solo-Bolo active! Re-claim hexes with different champions for combo points.";
  } else if (currentMode === 'same_screen') {
    systemMsg.innerText = "Same-Screen active! Blue Side and Red Side share this device.";
  } else {
    const sideName = myPlayerNum === 1 ? 'Blue Side (Host)' : 'Red Side (Guest)';
    systemMsg.innerText = `Connected as ${sideName}. Waiting for opponent...`;
  }
  renderBoard(boardState);
});

socket.on('gameStart', ({ currentPlayer: starter, chainingEnabled, championLocking, roundDuration, mode }) => {
  gameActive = true;
  currentPlayer = starter;
  if (mode) currentMode = mode;

  chainToggle.checked = chainingEnabled;
  lockingToggle.checked = championLocking;
  timerSelect.value = roundDuration;

  applyControlPermissions();
  updateTurnDisplay();
  
  const timerText = roundDuration === 0 ? 'Unlimited' : `${roundDuration}s`;
  if (currentMode === 'solo') {
    systemMsg.innerText = `Solo-Bolo: Capture all 37 hexes! Hex re-claims yield combo points. (Timer: ${timerText})`;
  } else {
    systemMsg.innerText = `Match Started! Mode: ${chainingEnabled ? 'Chain ON' : 'Chain OFF'} | Locking: ${championLocking ? 'ON' : 'OFF'} | Timer: ${timerText}`;
  }
});

// Timer Bar Handler
socket.on('timerUpdate', ({ timeLeft, totalDuration }) => {
  if (totalDuration === 0) {
    timerProgress.classList.add('unlimited');
  } else {
    timerProgress.classList.remove('unlimited');
    timerProgress.style.width = `${(timeLeft / totalDuration) * 100}%`;
  }
});

// 3. Board Rendering
function renderBoard(board) {
  hexGrid.innerHTML = '';
  const pointsStr = createHexPoints(HEX_RADIUS - 2);

  board.forEach(tile => {
    const { x, y } = hexToPixel(tile.q, tile.r);

    let soloTierClass = '';
    if (currentMode === 'solo' && tile.owner === 1 && tile.claimedChampions && tile.claimedChampions.length > 0) {
      const tier = Math.min(Math.max(tile.claimedChampions.length, 1), 5);
      soloTierClass = ` solo-tier-${tier}`;
    }

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `hex-tile owner-${tile.owner}${soloTierClass}`);
    g.setAttribute('id', tile.id);
    g.setAttribute('transform', `translate(${x}, ${y})`);

    const inner = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    inner.setAttribute('class', 'hex-inner');

    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('class', 'hex-polygon');
    poly.setAttribute('points', pointsStr);

    inner.appendChild(poly);

    const cat = tile.criteriaObj.cat;
    const name = tile.criteriaObj.name;

    // Helper to generate SVG icon elements
    function createIconElement(type, size = 26) {
      const iconGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      iconGroup.setAttribute('class', 'hex-icon-group');

      if (type === 'mana') {
        const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttribute('href', 'assets/icons/mana.png');
        img.setAttribute('x', -size / 2);
        img.setAttribute('y', -size / 2);
        img.setAttribute('width', size);
        img.setAttribute('height', size);
        img.setAttribute('class', 'hex-icon-img hex-icon-screen');
        iconGroup.appendChild(img);
      } else if (type === 'manaless') {
        const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttribute('href', 'assets/icons/mana.png');
        img.setAttribute('x', -size / 2);
        img.setAttribute('y', -size / 2);
        img.setAttribute('width', size);
        img.setAttribute('height', size);
        img.setAttribute('class', 'hex-icon-img hex-icon-screen manaless-dim');
        iconGroup.appendChild(img);

        // Red cross-out line indicating absence of mana
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', -size / 2 + 1);
        line.setAttribute('y1', size / 2 - 1);
        line.setAttribute('x2', size / 2 - 1);
        line.setAttribute('y2', -size / 2 + 1);
        line.setAttribute('stroke', '#ef4444');
        line.setAttribute('stroke-width', '2.8');
        line.setAttribute('stroke-linecap', 'round');
        iconGroup.appendChild(line);
      } else if (type === 'energy') {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M2 -13 L-7 0 L-1 0 L-4 13 L8 -1 L1 -1 Z');
        path.setAttribute('fill', '#facc15');
        path.setAttribute('stroke', '#ca8a04');
        path.setAttribute('stroke-width', '1');
        iconGroup.appendChild(path);
      } else if (type.startsWith('role-')) {
        const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttribute('href', `assets/icons/${type}.png`);
        img.setAttribute('x', -size / 2);
        img.setAttribute('y', -size / 2);
        img.setAttribute('width', size);
        img.setAttribute('height', size);
        img.setAttribute('class', 'hex-icon-img');
        iconGroup.appendChild(img);
      } else if (type === 'gender-male') {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', -2);
        circle.setAttribute('cy', 3);
        circle.setAttribute('r', 6);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#60a5fa');
        circle.setAttribute('stroke-width', '2');
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrow.setAttribute('d', 'M2 -1 L9 -8 M4 -8 L9 -8 L9 -3');
        arrow.setAttribute('fill', 'none');
        arrow.setAttribute('stroke', '#60a5fa');
        arrow.setAttribute('stroke-width', '2');
        arrow.setAttribute('stroke-linecap', 'round');
        arrow.setAttribute('stroke-linejoin', 'round');
        iconGroup.appendChild(circle);
        iconGroup.appendChild(arrow);
      } else if (type === 'gender-female') {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', 0);
        circle.setAttribute('cy', -4);
        circle.setAttribute('r', 6);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#f472b6');
        circle.setAttribute('stroke-width', '2');
        const cross = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        cross.setAttribute('d', 'M0 2 L0 10 M-4 6 L4 6');
        cross.setAttribute('fill', 'none');
        cross.setAttribute('stroke', '#f472b6');
        cross.setAttribute('stroke-width', '2');
        cross.setAttribute('stroke-linecap', 'round');
        iconGroup.appendChild(circle);
        iconGroup.appendChild(cross);
      } else if (type === 'gender-indeterminate') {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', 0);
        circle.setAttribute('cy', 0);
        circle.setAttribute('r', 7);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#cbd5e1');
        circle.setAttribute('stroke-width', '2');
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', 0);
        dot.setAttribute('cy', 0);
        dot.setAttribute('r', 2.5);
        dot.setAttribute('fill', '#cbd5e1');
        iconGroup.appendChild(circle);
        iconGroup.appendChild(dot);
      } else if (type === 'range-melee') {
        // Crossed swords icon for melee
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M-9 -9 L9 9 M9 -9 L-9 9 M-9 -5 L-5 -9 M9 -5 L5 -9 M-9 5 L-5 9 M9 5 L5 9');
        path.setAttribute('stroke', '#cbd5e1');
        path.setAttribute('stroke-width', '2.2');
        path.setAttribute('stroke-linecap', 'round');
        iconGroup.appendChild(path);
      } else if (type === 'range-ranged') {
        // Bow and arrow icon for ranged
        const bow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        bow.setAttribute('d', 'M-7 -8 Q-1 0 -7 8 M-7 -8 L-7 8');
        bow.setAttribute('fill', 'none');
        bow.setAttribute('stroke', '#38bdf8');
        bow.setAttribute('stroke-width', '1.8');
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrow.setAttribute('d', 'M-8 0 L7 0 M3 -4 L7 0 L3 4');
        arrow.setAttribute('fill', 'none');
        arrow.setAttribute('stroke', '#38bdf8');
        arrow.setAttribute('stroke-width', '2');
        arrow.setAttribute('stroke-linecap', 'round');
        arrow.setAttribute('stroke-linejoin', 'round');
        iconGroup.appendChild(bow);
        iconGroup.appendChild(arrow);
      } else {
        // Generic game-asset image icon (species-* uses SVG, others use PNG)
        const ext = type.startsWith('species-') ? 'svg' : 'png';
        const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttribute('href', `assets/icons/${type}.${ext}`);
        img.setAttribute('x', -size / 2);
        img.setAttribute('y', -size / 2);
        img.setAttribute('width', size);
        img.setAttribute('height', size);
        img.setAttribute('class', 'hex-icon-img');
        iconGroup.appendChild(img);
      }

      return iconGroup;
    }

    if (cat === 'REGION') {
      const regionSlug = name.toLowerCase().replace(/\s+/g, '-');
      const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      img.setAttribute('class', 'hex-region-crest');
      img.setAttribute('href', `assets/regions/${regionSlug}.png`);
      img.setAttribute('x', -14);
      img.setAttribute('y', -24);
      img.setAttribute('width', 28);
      img.setAttribute('height', 28);
      inner.appendChild(img);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-region-name');
      textName.setAttribute('y', 14);
      textName.textContent = name;
      inner.appendChild(textName);
    } else if (cat === 'YEAR') {
      const parts = name.split(' ');
      const textLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textLine1.setAttribute('class', 'hex-text-year-line1');
      textLine1.setAttribute('y', -4);
      textLine1.textContent = parts[0] || 'Released';

      const textLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textLine2.setAttribute('class', 'hex-text-year-line2');
      textLine2.setAttribute('y', 12);
      textLine2.textContent = parts.slice(1).join(' ');

      inner.appendChild(textLine1);
      inner.appendChild(textLine2);
    } else if (cat === 'RESOURCE') {
      let iconType = 'mana';
      if (name === 'Manaless') iconType = 'manaless';
      else if (name === 'Energy') iconType = 'energy';

      const iconEl = createIconElement(iconType, 26);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      textName.textContent = name;
      inner.appendChild(textName);
    } else if (cat === 'GENDER') {
      let iconType = 'gender-indeterminate';
      if (name === 'Male') iconType = 'gender-male';
      else if (name === 'Female') iconType = 'gender-female';

      const iconEl = createIconElement(iconType, 24);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      textName.textContent = name;
      inner.appendChild(textName);
    } else if (cat === 'ROLE') {
      const roleSlug = name.toLowerCase();
      const iconEl = createIconElement(`role-${roleSlug}`, 26);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      textName.textContent = name;
      inner.appendChild(textName);
    } else if (cat === 'RANGE') {
      const rangeType = name === 'Melee' ? 'range-melee' : 'range-ranged';
      const iconEl = createIconElement(rangeType, 24);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      textName.textContent = name;
      inner.appendChild(textName);
    } else if (cat === 'MECH') {
      const mechSlugMap = {
        'Knockup': 'mech-knockup',
        'Stun': 'mech-stun',
        'Shield': 'mech-shield',
        'Dash': 'mech-dash',
        'Root': 'mech-root',
        'True Damage': 'mech-true-damage',
        'Stealth': 'mech-stealth',
        'Global Ult': 'mech-global-ult'
      };
      const iconType = mechSlugMap[name] || 'mech-knockup';
      const iconEl = createIconElement(iconType, 24);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      textName.textContent = name;
      inner.appendChild(textName);
    } else if (cat === 'SPECIES') {
      const speciesIconMap = {
        'Human':           'species-human',
        'Monster/Beast':   'species-beast',
        'Aspect/Celestial':'species-celestial',
        'Undead/Spirit':   'species-undead',
        'Yordle':          'species-yordle',
        'Vastaya':         'species-vastaya',
        'Golem/Construct': 'species-golem',
        'Darkin':          'species-darkin'
      };
      const iconType = speciesIconMap[name] || 'species-human';
      const iconEl = createIconElement(iconType, 26);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      textName.textContent = name;
      inner.appendChild(textName);
    } else {
      // Fallback for any other category
      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-centered');
      textName.setAttribute('y', 4);
      textName.textContent = name;
      inner.appendChild(textName);
    }

    g.appendChild(inner);

    g.addEventListener('click', () => onHexClick(tile));
    hexGrid.appendChild(g);
  });
}

function onHexClick(tile) {
  if (!gameActive) {
    systemMsg.innerText = "Match has not started yet.";
    return;
  }
  // In same_screen mode, player order alternates locally on the same device
  if (currentMode !== 'same_screen' && currentMode !== 'solo' && myPlayerNum !== currentPlayer) {
    systemMsg.innerText = "It is not your turn!";
    return;
  }
  // In 2-player modes, hex must be neutral; in Solo-Bolo, player can re-claim any hex with another champion!
  if (currentMode !== 'solo' && tile.owner !== 0) {
    systemMsg.innerText = "This hex is already claimed!";
    return;
  }

  document.querySelectorAll('.hex-tile').forEach(el => el.classList.remove('selected'));
  const targetEl = document.getElementById(tile.id);
  if (targetEl) targetEl.classList.add('selected');

  selectedHexId = tile.id;
  selectedDisplay.innerHTML = `Selected: <strong>[${tile.criteriaObj.cat}] ${tile.criteriaObj.name}</strong>`;
  champInput.disabled = false;
  if (submitBtn) submitBtn.disabled = false;
  champInput.value = '';
  hideSuggestions();
  champInput.focus();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getResolvedChampionName(rawInput) {
  const query = (rawInput || '').trim();
  if (!query) return '';

  // 1. Exact match (case-insensitive) - always valid even if short
  const exact = championPool.find(c => c.toLowerCase() === query.toLowerCase());
  if (exact) return exact;

  // Do not resolve partial names until at least 3 characters are typed
  if (query.length < 3) return query;

  // 2. Starts with query
  const starts = championPool.filter(c => c.toLowerCase().startsWith(query.toLowerCase()));
  if (starts.length > 0) {
    if (lockingToggle.checked) {
      const unlocked = starts.find(c => !usedChampions.includes(c));
      if (unlocked) return unlocked;
    }
    return starts[0];
  }

  // 3. Contains query
  const contains = championPool.filter(c => c.toLowerCase().includes(query.toLowerCase()));
  if (contains.length > 0) {
    if (lockingToggle.checked) {
      const unlocked = contains.find(c => !usedChampions.includes(c));
      if (unlocked) return unlocked;
    }
    return contains[0];
  }

  return query;
}

function updateSuggestions() {
  const query = champInput.value.trim().toLowerCase();
  const isInputAllowed = (currentMode === 'same_screen' || currentMode === 'solo' || myPlayerNum === currentPlayer);
  // Require at least 3 characters before displaying autocomplete suggestions
  if (!query || query.length < 3 || !gameActive || !isInputAllowed) {
    hideSuggestions();
    return;
  }

  const starts = [];
  const contains = [];

  championPool.forEach(name => {
    const lower = name.toLowerCase();
    if (lower.startsWith(query)) {
      starts.push(name);
    } else if (lower.includes(query)) {
      contains.push(name);
    }
  });

  const isLocked = (name) => lockingToggle.checked && usedChampions.includes(name);

  starts.sort((a, b) => {
    const aLocked = isLocked(a);
    const bLocked = isLocked(b);
    if (aLocked !== bLocked) return aLocked ? 1 : -1;
    return a.localeCompare(b);
  });

  contains.sort((a, b) => {
    const aLocked = isLocked(a);
    const bLocked = isLocked(b);
    if (aLocked !== bLocked) return aLocked ? 1 : -1;
    return a.localeCompare(b);
  });

  currentSuggestions = [...starts, ...contains].slice(0, 8);
  activeSuggestionIndex = -1;

  if (currentSuggestions.length === 0) {
    hideSuggestions();
    return;
  }

  renderSuggestions(query);
}

function renderSuggestions(query) {
  autocompleteList.innerHTML = '';
  currentSuggestions.forEach((name) => {
    const item = document.createElement('div');
    item.className = 'autocomplete-item';
    if (lockingToggle.checked && usedChampions.includes(name)) {
      item.classList.add('locked');
    }

    const nameSpan = document.createElement('span');
    const lower = name.toLowerCase();
    const matchIdx = lower.indexOf(query);
    if (matchIdx >= 0) {
      const before = name.substring(0, matchIdx);
      const match = name.substring(matchIdx, matchIdx + query.length);
      const after = name.substring(matchIdx + query.length);
      nameSpan.innerHTML = `${escapeHtml(before)}<strong class="match-highlight">${escapeHtml(match)}</strong>${escapeHtml(after)}`;
    } else {
      nameSpan.textContent = name;
    }

    item.appendChild(nameSpan);

    if (lockingToggle.checked && usedChampions.includes(name)) {
      const tag = document.createElement('span');
      tag.className = 'locked-tag';
      tag.textContent = 'Locked';
      item.appendChild(tag);
    }

    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      champInput.value = name;
      hideSuggestions();
      sendMove();
    });

    autocompleteList.appendChild(item);
  });

  autocompleteList.classList.remove('hidden');
}

function hideSuggestions() {
  autocompleteList.classList.add('hidden');
  autocompleteList.innerHTML = '';
  currentSuggestions = [];
  activeSuggestionIndex = -1;
}

function moveActiveSuggestion(delta) {
  if (currentSuggestions.length === 0) return;
  activeSuggestionIndex += delta;
  if (activeSuggestionIndex < 0) activeSuggestionIndex = currentSuggestions.length - 1;
  if (activeSuggestionIndex >= currentSuggestions.length) activeSuggestionIndex = 0;

  const items = autocompleteList.querySelectorAll('.autocomplete-item');
  items.forEach((el, idx) => {
    if (idx === activeSuggestionIndex) {
      el.classList.add('active');
      el.scrollIntoView({ block: 'nearest' });
    } else {
      el.classList.remove('active');
    }
  });
}

champInput.addEventListener('input', updateSuggestions);

champInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    moveActiveSuggestion(1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    moveActiveSuggestion(-1);
  } else if (e.key === 'Tab') {
    if (currentSuggestions.length > 0) {
      e.preventDefault();
      const selected = activeSuggestionIndex >= 0 ? currentSuggestions[activeSuggestionIndex] : currentSuggestions[0];
      champInput.value = selected;
      hideSuggestions();
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (activeSuggestionIndex >= 0 && currentSuggestions[activeSuggestionIndex]) {
      champInput.value = currentSuggestions[activeSuggestionIndex];
    } else {
      champInput.value = getResolvedChampionName(champInput.value);
    }
    hideSuggestions();
    sendMove();
  } else if (e.key === 'Escape') {
    hideSuggestions();
  }
});

champInput.addEventListener('blur', () => {
  setTimeout(() => {
    hideSuggestions();
  }, 150);
});

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    if (activeSuggestionIndex >= 0 && currentSuggestions[activeSuggestionIndex]) {
      champInput.value = currentSuggestions[activeSuggestionIndex];
    } else {
      champInput.value = getResolvedChampionName(champInput.value);
    }
    hideSuggestions();
    sendMove();
  });
}

function sendMove() {
  const resolved = getResolvedChampionName(champInput.value);
  if (!selectedHexId || !resolved) return;
  champInput.value = resolved;
  socket.emit('submitMove', {
    hexId: selectedHexId,
    champName: resolved
  });
}

// 4. Move Success & Capture Cascade Animation
socket.on('moveSuccess', (data) => {
  if (data.champName && !usedChampions.includes(data.champName)) {
    usedChampions.push(data.champName);
  }
  hideSuggestions();
  champInput.value = '';
  champInput.disabled = true;
  if (submitBtn) submitBtn.disabled = true;
  selectedDisplay.innerHTML = 'Selected: <em>None</em>';
  selectedHexId = null;

  if (data.mode === 'solo') {
    if (soloPoints) soloPoints.innerText = data.soloPoints;
    if (soloHexCount) soloHexCount.innerText = `${data.uniqueClaimed}/${data.totalHexes || 37}`;
    if (soloComboLbl) soloComboLbl.innerText = `+${data.pointsEarned} PTS (${data.moveHexCount} HEX)`;
    systemMsg.innerText = `Great! ${data.champName} claimed ${data.moveHexCount} hex(es) (+${data.pointsEarned} pts)!`;
  } else {
    if (p1Score && data.p1Score !== undefined) p1Score.innerText = data.p1Score;
    if (p2Score && data.p2Score !== undefined) p2Score.innerText = data.p2Score;
  }

  applyCaptureStyle(data.primaryHexId, data.playerNum, data.champName, data.hexClaimCounts ? data.hexClaimCounts[data.primaryHexId] : undefined);

  if (data.stolenHexIds && data.stolenHexIds.length > 0) {
    data.stolenHexIds.forEach((hexId, index) => {
      setTimeout(() => {
        applyCaptureStyle(hexId, data.playerNum, data.champName, data.hexClaimCounts ? data.hexClaimCounts[hexId] : undefined);
      }, (index + 1) * 120);
    });
  }
});

function applyCaptureStyle(hexId, playerNum, champName, claimCount) {
  const el = document.getElementById(hexId);
  if (!el) return;

  el.classList.remove('owner-0', 'owner-1', 'owner-2', 'selected');
  el.classList.add(`owner-${playerNum}`, 'anim-capture');

  // Multi-claim blue tone progression for Solo-Bolo mode
  if (currentMode === 'solo' && playerNum === 1) {
    // Remove previous solo tiers
    el.classList.remove('solo-tier-1', 'solo-tier-2', 'solo-tier-3', 'solo-tier-4', 'solo-tier-5');
    
    // Determine claim count
    const tileObj = boardState.find(t => t.id === hexId);
    let count = claimCount;
    if (count === undefined) {
      if (tileObj && tileObj.claimedChampions) {
        if (champName && !tileObj.claimedChampions.includes(champName)) {
          tileObj.claimedChampions.push(champName);
        }
        count = tileObj.claimedChampions.length;
      } else {
        count = 1;
      }
    }
    const tier = Math.min(Math.max(count || 1, 1), 5);
    el.classList.add(`solo-tier-${tier}`);
  }

  // Update in boardState array
  const tileObj = boardState.find(t => t.id === hexId);
  if (tileObj) {
    tileObj.owner = playerNum;
    if (champName) {
      tileObj.claimedBy = champName;
      if (!tileObj.claimedChampions) tileObj.claimedChampions = [];
      if (!tileObj.claimedChampions.includes(champName)) tileObj.claimedChampions.push(champName);
    }
  }

  // Add brief floating champion name that disappears after animation
  const inner = el.querySelector('.hex-inner');
  if (inner && champName) {
    // Remove any previous temporary label if exists
    const existing = inner.querySelector('.hex-claimed-champ');
    if (existing) existing.remove();

    const champLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    champLabel.setAttribute('class', 'hex-claimed-champ');
    champLabel.setAttribute('y', 0);
    champLabel.textContent = champName;
    inner.appendChild(champLabel);

    // Remove element after fadeout completes (2200ms)
    setTimeout(() => {
      champLabel.remove();
    }, 2300);
  }

  setTimeout(() => {
    el.classList.remove('anim-capture');
  }, 500);
}

// 5. Hex Rejection Shake Animation
socket.on('hexVibrate', ({ hexId, reason, playerNum }) => {
  const el = document.getElementById(hexId);
  if (el) {
    el.classList.add('anim-vibrate');
    setTimeout(() => {
      el.classList.remove('anim-vibrate');
    }, 450);
  }

  if (myPlayerNum === playerNum) {
    hideSuggestions();
    champInput.classList.add('error-shake');
    setTimeout(() => {
      champInput.classList.remove('error-shake');
    }, 450);
  }

  systemMsg.innerText = reason;
});

// 6. Turn Lifecycle
socket.on('turnPass', ({ reason, currentPlayer: nextPlayer }) => {
  currentPlayer = nextPlayer;
  updateTurnDisplay();
  if (reason) systemMsg.innerText = reason;

  hideSuggestions();
  document.querySelectorAll('.hex-tile').forEach(el => el.classList.remove('selected'));
  selectedHexId = null;
  selectedDisplay.innerHTML = 'Selected: <em>None</em>';

  champInput.value = '';
  // In same_screen and solo, local player can always take turn
  const isInputAllowed = (currentMode === 'same_screen' || currentMode === 'solo' || myPlayerNum === currentPlayer);
  champInput.disabled = !isInputAllowed;
  if (submitBtn) submitBtn.disabled = !isInputAllowed;
});

function updateTurnDisplay() {
  if (currentMode === 'solo') {
    turnAnnounce.innerText = "SOLO-BOLO CHALLENGE";
    turnAnnounce.style.color = "#facc15";
    return;
  }

  const currentSide = (currentPlayer === 1) ? 'BLUE SIDE' : 'RED SIDE';
  if (currentMode === 'same_screen') {
    turnAnnounce.innerText = `${currentSide}'S TURN (PASS TO PLAYER ${currentPlayer})`;
    turnAnnounce.style.color = (currentPlayer === 1) ? '#38bdf8' : '#f43f5e';
  } else if (myPlayerNum === currentPlayer) {
    turnAnnounce.innerText = `YOUR TURN (${currentSide})`;
    turnAnnounce.style.color = (myPlayerNum === 1) ? '#38bdf8' : '#f43f5e';
  } else {
    turnAnnounce.innerText = `${currentSide}'S TURN`;
    turnAnnounce.style.color = (currentPlayer === 1) ? '#60a5fa' : '#fb7185';
  }
}

socket.on('gameOver', ({ winner, p1Score: finalP1, p2Score: finalP2, mode, soloPoints: finalSolo, message }) => {
  gameActive = false;
  if (mode === 'solo' || currentMode === 'solo') {
    turnAnnounce.innerText = "CHALLENGE COMPLETED!";
    turnAnnounce.style.color = '#facc15';
    systemMsg.innerText = message || `All 37 Hexes Captured! Final Score: ${finalSolo || (soloPoints ? soloPoints.innerText : 0)} Points!`;
  } else {
    const winnerText = winner === 0 ? "GAME OVER: DRAW!" : (winner === 1 ? "BLUE SIDE WINS!" : "RED SIDE WINS!");
    turnAnnounce.innerText = winnerText;
    turnAnnounce.style.color = '#facc15';
    systemMsg.innerText = `Final Score: Blue Side [${finalP1}] - Red Side [${finalP2}]`;
  }
  champInput.disabled = true;
  if (submitBtn) submitBtn.disabled = true;
});

socket.on('playerDisconnected', () => {
  systemMsg.innerText = "Opponent disconnected.";
});

socket.on('errorMsg', (msg) => {
  if (optionsStatus) {
    optionsStatus.innerText = msg;
    optionsStatus.style.color = "#ef4444";
  }
  if (optionsStartBtn) optionsStartBtn.disabled = false;
  if (roomInput) roomInput.disabled = false;
  alert(msg);
});