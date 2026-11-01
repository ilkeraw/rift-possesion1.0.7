const socket = io();

// ==========================================================================
// Internationalization (i18n) - English, Turkish, Korean
// ==========================================================================
const TRANSLATIONS = {
  en: {
    // Start Screen / Main Menu
    lobbyBadge: "LOL GRID STRATEGY",
    lobbyTitle: "RIFT POSSESSION",
    lobbySubtitle: "Claim hex criteria with League of Legends champions",
    howToPlayBtn: "HOW TO PLAY & RULES",
    modeSameScreenTitle: "Same Screen",
    modeSameScreenDesc: "2 Players take turns on this single device",
    modeOnlineSummonersTitle: "Online Summoners",
    modeOnlineSummonersDesc: "Matchmake with an online opponent with matching options",
    modeOnlineFriendTitle: "Online With a Friend",
    modeOnlineFriendDesc: "Create or enter a custom Room Code to duel",
    modeSoloTitle: "Solo-Bolo",
    modeSoloDesc: "Single player high score challenge. Re-claim hexes for combo points!",
    modeDailySoloTitle: "Daily Solo Challenge",
    modeDailySoloDesc: "Identical daily hex board worldwide! Compete for the top leaderboard.",

    // Options Screen
    badgeLocalPlay: "LOCAL PLAY",
    badgeMatchmaking: "MATCHMAKING",
    badgePrivateDuel: "PRIVATE DUEL",
    badgeSoloChallenge: "SOLO CHALLENGE",
    badgeDailyChallenge: "DAILY CHALLENGE",
    modeOnlineSummonersSub: "Find an opponent online with these exact game options",
    modeOnlineFriendSub: "Enter the same room code and options to duel a friend",
    modeSoloSub: "Capture all 37 hexes. Hex re-captures yield combo points!",
    modeDailySoloSub: "Today's worldwide grid! Complete all 37 hexes to register on the leaderboard.",
    btnStartSameScreen: "START SAME SCREEN MATCH",
    btnFindOpponent: "FIND OPPONENT",
    btnJoinCreateRoom: "JOIN / CREATE ROOM",
    btnStartSoloBolo: "START SOLO-BOLO",
    btnStartDailySolo: "START DAILY CHALLENGE",
    btnCreateFriendLobby: "CREATE & WAIT FOR FRIEND",
    btnJoinFriendGame: "JOIN MATCH",
    roomCodeLabel: "Room Code",
    roomCodePlaceholder: "ENTER ROOM CODE (e.g. DUEL7)",
    roomCodeHint: "Both players must write the same room code and pick the same settings.",
    nicknameLabel: "Summoner Nickname",
    nicknamePlaceholder: "ENTER NICKNAME (e.g. Faker)",
    nicknameHint: "Your name will be immortalized on the daily leaderboard upon clearing the Rift!",
    dailyLeaderboardBadge: "DAILY RANKINGS",
    dailyLeaderboardTitle: "TODAY'S RIFT LEGENDS",
    colRank: "#",
    colSummoner: "SUMMONER",
    colScore: "SCORE",
    colTime: "TIME",
    leaderboardEmpty: "No scores recorded yet today. Be the first to conquer the Rift!",
    leaderboardResetNote: "Resets daily at 00:00 UTC with an identical grid worldwide.",
    endgameBtnLeaderboard: "Daily Leaderboard",
    endgameLeaderboardSub: "View today's top worldwide solo rankings",
    spectatorStatus: "SPECTATING MATCH (VIEW-ONLY)",
    tabCreateRoom: "CREATE ROOM",
    tabJoinRoom: "JOIN WITH CODE",
    generatedRoomCodeLabel: "Your Room Code",
    createRoomHint: "A unique room code has been automatically generated for you. Start the lobby to invite your friend!",
    waitingBadge: "MATCH LOBBY",
    waitingTitle: "SUMMONING RIVAL",
    waitingSubtitle: "Share your room code or direct link with a friend to begin",
    waitingRoomCodeLabel: "ROOM CODE",
    btnCopyCode: "Copy Code",
    btnShareInviteLink: "SHARE INVITE LINK",
    waitingPlayerStatus: "Waiting for Player 2 to join... (1/2)",
    waitingCancelBtn: "← LEAVE LOBBY",
    inviteLinkCopiedToast: "Invite link copied to clipboard!",
    codeCopiedToast: "Room code copied to clipboard!",
    matchRulesHeading: "Match Rules",
    hexChainingTitle: "Hex Chaining",
    hexChainingDesc: "Continuous path propagation across matches",
    champLockingTitle: "Champion Locking",
    champLockingDesc: "Locked champions cannot be reused",
    turnTimerTitle: "Turn Timer",
    turnTimerDesc: "Time allowed per turn",
    timer30s: "30 Seconds",
    timer60s: "1 Minute",
    timerUnlimited: "Unlimited",
    timer2m30s: "2m 30s (Fixed)",
    dailySoloRulesFixed: "Chaining: ON | Locking: ON | Match Time: 2m 30s (Standardized Worldwide)",
    dailyPlayedAlready: "You have already completed today's Daily Solo Challenge! Check the leaderboard or return tomorrow.",
    dailyOnceWarning: "Notice: Daily Challenge can only be attempted once per day per device.",
    backBtn: "← BACK",
    startGameBtn: "START GAME",

    // How to Play Modal
    guideBadge: "SUMMONER'S MANUAL",
    guideTitle: "HOW TO PLAY RIFT POSSESSION",
    guideSubtitle: "Master the 37-hex grid with strategic champion knowledge",
    guideStep1Title: "Objective & The Hex Grid",
    guideStep1Text: "The board consists of 37 hexagonal tiles arranged in a radius-3 grid. Each hex has a specific category criterion (Region, Role, Skin Set, Mechanic, Species, Release Year, Resource, Range, or Gender). Your goal is to capture more tiles than your rival!",
    guideStep2Title: "How a Turn Works",
    guideRule1Title: "Select a Hex:",
    guideRule1Desc: "Click an eligible tile on the grid.",
    guideRule2Title: "Name a Valid Champion:",
    guideRule2Desc: "Type any League champion that satisfies that tile's requirement (e.g., Ionia, True Damage, Spirit Blossom, Yordle) and hit Enter or submit.",
    guideRule3Title: "Hex Claimed:",
    guideRule3Desc: "The tile is painted in your team's color with the champion's portrait!",
    guideStep3Title: "Special Match Rules (Toggles)",
    guideRuleChainingBadge: "HEX CHAINING",
    guideRuleChainingDesc: "When ON, after your opening turn you must claim a hex that is adjacent (touching) to your existing claimed territory. When OFF, you can pick any tile on the entire board.",
    guideRuleLockingBadge: "CHAMPION LOCKING",
    guideRuleLockingDesc: "When ON, once a champion is successfully used anywhere, it is locked and cannot be used again by either player for the rest of the game.",
    guideStep4Title: "Game Modes",
    guideModeSameScreenTitle: "Same Screen:",
    guideModeSameScreenDesc: "Pass-and-play duel on 1 device.",
    guideModeOnlineSummonersTitle: "Online Summoners:",
    guideModeOnlineSummonersDesc: "Automatic matchmaking with real players online.",
    guideModeOnlineFriendTitle: "Online With a Friend:",
    guideModeOnlineFriendDesc: "Enter a custom Room Code to duel a buddy.",
    guideModeSoloTitle: "Solo-Bolo:",
    guideModeSoloDesc: "Re-claim tiles to stack escalating combo points and set the ultimate high score!",
    dontShowAgain: "Don't show automatically next time",
    enterTheRiftBtn: "ENTER THE RIFT",

    // In-Game Menu Modal
    menuBadge: "GAME MENU",
    menuTitle: "MATCH PAUSED",
    menuSubtitle: "Choose an action",
    menuResumeMain: "Return to the Game",
    menuResumeSub: "Resume current match and continue playing",
    menuRestartMain: "Restart",
    menuRestartSub: "Restart match with a new board and current rules",
    menuExitMain: "Return to the Menu",
    menuExitSub: "Leave this arena and return to mode selection",

    // Statistics Modal
    statsBadge: "POST-MATCH REPORT",
    statsTitle: "MATCH STATISTICS",
    statsSubtitle: "Comparative performance & tactical analytics",
    statsSectionChamps: "CHAMPIONS DRAFTED & PLAYED",
    statsSectionHighlights: "TACTICAL HIGHLIGHTS",
    closeReturnBtn: "CLOSE & RETURN",
    statsSoloSummaryHeader: "👑 SOLO-BOLO PERFORMANCE SUMMARY",
    statFinalScore: "Final Score",
    statBoardProgress: "Board Progress",
    statClaimedFull: "Hexes Claimed (100%)",
    statTotalTimeElapsed: "Total Time Elapsed",
    statTotalTimeUsed: "Total Time Used",
    statUniqueChamps: "Unique Champions Played",
    statLargestCombo: "Largest Multi-Hex Combo",
    statAvgPointsMove: "Average Points Per Move",
    statHexesOccupied: "Hexes Occupied",
    statChampsDrafted: "Champions Drafted",
    statTerritoryRetaken: "Territory Retaken",
    statLargestChain: "Largest Combo / Chain",
    statTimeoutsIncurred: "Timeouts Incurred",
    statSummonerRoster: "Summoner Champion Roster",
    statChampsUsed: "Champions Used",
    statPool: "Pool",
    statPlayer1Blue: "PLAYER 1 (BLUE)",
    statPlayer2Red: "PLAYER 2 (RED)",
    statBlueSide: "🔵 BLUE SIDE",
    statRedSide: "🔴 RED SIDE",
    statHexWord: "hex(es)",
    statHexInOneTurn: "hexes in one turn",
    statPtsWord: "pts",
    hlRiftConquerorTitle: "Rift Conqueror",
    hlRiftConquerorDesc: "Captured all 37 hexes to amass a colossal {pts} points!",
    hlComboMasterTitle: "Combo Master",
    hlComboMasterDesc: "Chained {chain} hexes in a single decisive play!",
    hlPacePrecisionTitle: "Pace & Precision",
    hlPacePrecisionDesc: "Completed the entire challenge in {time}.",
    hlLolKnowledgeTitle: "LoL Knowledge Depth",
    hlLolKnowledgeDesc: "Leveraged {count} distinct champion criteria matches.",
    hlSpeedDemonTitle: "Speed Demon: {side}",
    hlSpeedDemonDesc: "Completed turns faster with {time1} total thinking time vs {time2}.",
    hlHexReclaimerTitle: "Hex Reclaimer: {side}",
    hlHexReclaimerDesc: "Stole back {retaken} occupied territory from opponent!",
    hlEvenTurfWarTitle: "Even Turf War",
    hlEvenTurfWarDesc: "Both sides stole {retaken} hexes each in fierce counterplay!",
    hlChainMaestroTitle: "Chain Maestro: {side}",
    hlChainMaestroDesc: "Executed a massive {chain}-hex strike in a single move!",
    hlEqualPrecisionTitle: "Equal Precision",
    hlEqualPrecisionDesc: "Both players matched peak moves of {chain} hexes!",
    hlRosterScholarTitle: "Roster Scholar: {side}",
    hlRosterScholarDesc: "Deployed a broader roster of {count} distinct champions.",
    hlClockDisciplineTitle: "Flawless Clock Control",
    hlClockDisciplineDesc: "Zero timeouts occurred from either summoner across the match!",
    hlDisciplinedSummonerTitle: "Disciplined Summoner: {side}",
    hlDisciplinedSummonerDesc: "Maintained clock discipline and suffered fewer timeouts.",

    // Post-Match / Endgame Modal & Best Champions Modal
    headerBtnMatchOptions: "MATCH OPTIONS",
    endgameVictory: "VICTORY",
    endgameDefeat: "DEFEAT",
    endgameDraw: "DRAW",
    endgameBlueSideWins: "BLUE SIDE WINS",
    endgameRedSideWins: "RED SIDE WINS",
    endgameChallengeCompleted: "CHALLENGE COMPLETED",
    endgameMatchCompleted: "MATCH COMPLETED",
    endgameDuelFinished: "DUEL FINISHED",
    endgameRiftCleared: "RIFT CLEARED!",
    endgameChooseNextStep: "Choose your next step",
    endgameSoloSubtitle: "Solo-Bolo challenge finished. Inspect your score & analytics.",
    endgameSameScreenSubtitle: "Same-Screen match concluded.",
    endgameHexesLabel: "HEXES",
    endgameTotalSoloPoints: "TOTAL SOLO POINTS",
    endgameHexesClaimed: "HEXES CLAIMED",
    endgameBtnRematch: "Rematch",
    endgameRematchSub: "Play again with current rules (Both players must accept)",
    endgameRematchSubSolo: "Start a fresh Solo-Bolo run on a new board",
    endgameRematchSubSameScreen: "Play another match with these settings",
    endgameRematchRequestedWait: "Rematch requested! Waiting for opponent...",
    endgameRematchYouVoted: "You voted for a rematch. Waiting for opponent... ({votes}/{needed})",
    endgameRematchOpponentWants: "Opponent wants a rematch! Click \"Rematch\" to start! ({votes}/{needed})",
    endgameBtnBestChamps: "Best Champions",
    endgameBestChampsSub: "Ranked optimal champions for this exact board & rules",
    endgameBestChampsSubRules: "Ranked optimal champions for this exact board (Hex Chaining: {chaining})",
    endgameBtnStatistics: "Statistics",
    endgameStatisticsSub: "Hex control, champion pool, retakes, and tactical data",
    endgameBtnReview: "Review",
    endgameReviewSub: "Inspect the map, tiles, and captured territory freely",
    endgameBtnShare: "Share Results",
    endgameShareSub: "Copy your match results & board score to share",
    endgameShareCopied: "Results copied to clipboard!",
    sharedResultModalBadge: "MATCH OUTCOME",
    sharedResultModalTitle: "RIFT POSSESSION",
    sharedResultSoloTitle: "SOLO-BOLO CHALLENGE",
    sharedResultDailyTitle: "DAILY SOLO CHALLENGE",
    sharedResultDuelTitle: "RIFT DUEL",
    sharedResultScoreLabel: "Score: {score} Points",
    sharedResultCleared: "37/37 Hexes Cleared",
    sharedResultWinnerBlue: "BLUE SIDE VICTORY",
    sharedResultWinnerRed: "RED SIDE VICTORY",
    sharedResultDraw: "STALEMATE DRAW",
    sharedResultPlayNow: "PLAY RIFT POSSESSION",
    endgameBtnMenu: "Back to the Menu",
    endgameMenuSub: "Exit session and return to game modes",
    footerFollowHeading: "FOLLOW US FOR MORE GAMES",
    footerPrivacy: "Privacy",
    footerContact: "Contact",
    footerLegal: "All logos and brands are property of their respective owners and are used for identification purposes only",

    // Best Champions Modal
    bestChampsBadge: "TACTICAL INTEL",
    bestChampsTitle: "OPTIMAL CHAMPIONS",
    bestChampsRulesNote: "Ranked for this match's board layout with Hex Chaining {chaining}.",
    bestChampsChainingOn: "ENABLED (Continuous Propagation)",
    bestChampsChainingOff: "DISABLED (Adjacent Neighbors Only)",
    bestChampsSearchPlaceholder: "Search champion name...",
    bestChampsShowingCount: "Showing {count} of {total} champions",
    bestChampsNoMatches: "No matching champions found.",
    bestChampsMaxSingleMove: "Max Single Move",
    bestChampsHexSingle: "Hex",
    bestChampsHexPlural: "Hexes",
    bestChampsBestPlacement: "Best placement: {crit} | Total tiles matched: {count}",
    bestChampsMatchesBoard: "Matches {count} tile(s) on board",

    // Category Type Names
    cat_REGION: "Region",
    cat_ROLE: "Role",
    cat_SKIN: "Skin Set",
    cat_SPECIES: "Species",
    cat_MECH: "Mechanic",
    cat_RESOURCE: "Resource",
    cat_RANGE: "Range",
    cat_GENDER: "Gender",
    cat_YEAR: "Release Year",

    // Category Tags & UI
    skinTag: "Skins",
    selectedPrefix: "Selected: ",
    selectedNone: "None",

    // Criteria Names (Values)
    crit: {
      // Regions
      "Ionia": "Ionia",
      "Noxus": "Noxus",
      "Piltover": "Piltover",
      "Zaun": "Zaun",
      "Demacia": "Demacia",
      "Freljord": "Freljord",
      "Shurima": "Shurima",
      "Shadow Isles": "Shadow Isles",
      "Bilgewater": "Bilgewater",
      "Bandle City": "Bandle City",
      "Targon": "Targon",
      "Void": "Void",
      "Ixtal": "Ixtal",
      "Runeterra": "Runeterra",

      // Roles
      "Fighter": "Fighter",
      "Mage": "Mage",
      "Tank": "Tank",
      "Marksman": "Marksman",
      "Assassin": "Assassin",
      "Support": "Support",

      // Resources
      "Mana": "Mana",
      "Manaless": "Manaless",
      "Energy": "Energy",

      // Range
      "Melee": "Melee",
      "Ranged": "Ranged",

      // Gender
      "Male": "Male",
      "Female": "Female",
      "Indeterminate": "Other / Other",

      // Species
      "Human": "Human",
      "Monster/Beast": "Monster/Beast",
      "Aspect/Celestial": "Aspect/Celestial",
      "Undead/Spirit": "Undead/Spirit",
      "Yordle": "Yordle",
      "Vastaya": "Vastaya",
      "Golem/Construct": "Golem/Construct",
      "Darkin": "Darkin",

      // Mechanics
      "Knockup": "Knockup",
      "Stun": "Stun",
      "Shield": "Shield",
      "Dash": "Dash",
      "Root": "Root",
      "True Damage": "True Damage",
      "Stealth": "Stealth",
      "Global Ult": "Global Ult",
      "Fear": "Fear",
      "Silence": "Silence",
      "Charm": "Charm",
      "Suppression": "Suppression",
      "Taunt": "Taunt",
      "Blind": "Blind",
      "Revive": "Revive",

      // Years
      "Released 2009-2013": "Released 2009-2013",
      "Released 2014-2018": "Released 2014-2018",
      "Released 2019-2023": "Released 2019-2023",
      "Released 2023+": "Released 2023+",

      // Skin Lines
      "Spirit Blossom": "Spirit Blossom",
      "PROJECT": "PROJECT",
      "High Noon": "High Noon",
      "Star Guardian": "Star Guardian",
      "Blood Moon": "Blood Moon",
      "Pool Party": "Pool Party",
      "Dark Star": "Dark Star",
      "Coven": "Coven",
      "Battle Academia": "Battle Academia",
      "HEARTSTEEL": "HEARTSTEEL",
      "K/DA": "K/DA",
      "True Damage": "True Damage",
      "Arcana": "Arcana",
      "Anima Squad": "Anima Squad",
      "Empyrean": "Empyrean",
      "Elderwood": "Elderwood",
      "Winterblessed": "Winterblessed",
      "Arcade": "Arcade",
      "Porcelain": "Porcelain",
      "Sentinel / Ruined": "Sentinel / Ruined",
      "Battlecast": "Battlecast",
      "Dragonslayer": "Dragonslayer",
      "Fright Night": "Fright Night",
      "Astronaut": "Astronaut",
      "Debonair": "Debonair",
      "Cafe Cuties": "Cafe Cuties",
      "Inkshadow": "Inkshadow"
    }
  },
  tr: {
    // Start Screen / Main Menu
    lobbyBadge: "LOL IZGARA STRATEJİSİ",
    lobbyTitle: "RIFT POSSESSION",
    lobbySubtitle: "League of Legends şampiyonlarıyla hex kriterlerini ele geçir",
    howToPlayBtn: "NASIL OYNANIR & KURALLAR",
    modeSameScreenTitle: "Aynı Ekran",
    modeSameScreenDesc: "2 Oyuncu bu cihazda sırayla oynar",
    modeOnlineSummonersTitle: "Çevrimiçi Sihirdarlar",
    modeOnlineSummonersDesc: "Eşleşen ayarlarla çevrimiçi bir rakip bul",
    modeOnlineFriendTitle: "Arkadaşla Oyna",
    modeOnlineFriendDesc: "Düello yapmak için özel Oda Kodu oluştur veya gir",
    modeSoloTitle: "Tek Başına (Solo-Bolo)",
    modeSoloDesc: "Tek kişilik yüksek skor mücadelesi. Kombo puanları için hex'leri tekrar ele geçir!",
    modeDailySoloTitle: "Günün Solo Mücadelesi",
    modeDailySoloDesc: "Tüm dünyada her gün aynı hex ızgarası! Liderlik tablosu için yarış.",

    // Options Screen
    badgeLocalPlay: "YEREL OYUN",
    badgeMatchmaking: "EŞLEŞTİRME",
    badgePrivateDuel: "ÖZEL DÜELLO",
    badgeSoloChallenge: "SOLO MÜCADELE",
    badgeDailyChallenge: "GÜNLÜK MÜCADELE",
    modeOnlineSummonersSub: "Bu ayarlarla çevrimiçi bir rakip bul",
    modeOnlineFriendSub: "Arkadaşınla düello yapmak için aynı oda kodu ve ayarları girin",
    modeSoloSub: "37 hex'in tamamını ele geçir. Hex'leri tekrar almak kombo puanı kazandırır!",
    modeDailySoloSub: "Bugünün ortak haritası! 37 hex'i tamamlayıp liderlik tablosuna adını yazdır.",
    btnStartSameScreen: "AYNI EKRANDA BAŞLA",
    btnFindOpponent: "RAKİP BUL",
    btnJoinCreateRoom: "ODAYA KATIL / OLUŞTUR",
    btnStartSoloBolo: "SOLO-BOLO BAŞLAT",
    btnStartDailySolo: "GÜNLÜK MÜCADELEYİ BAŞLAT",
    btnCreateFriendLobby: "ODA OLUŞTUR & ARKADAŞINI BEKLE",
    btnJoinFriendGame: "MAÇA KATIL",
    roomCodeLabel: "Oda Kodu",
    roomCodePlaceholder: "ODA KODU GİRİN (örn. DUEL7)",
    roomCodeHint: "Arkadaşınızın sizinle paylaştığı oda kodunu girerek maça katılın veya izleyin.",
    nicknameLabel: "Sihirdar Adı",
    nicknamePlaceholder: "SİHİRDAR ADI (örn. Faker)",
    nicknameHint: "Vadideki 37 hex'i tamamladığında adın günlük liderlik tablosuna kaydedilir!",
    dailyLeaderboardBadge: "GÜNLÜK SIRALAMA",
    dailyLeaderboardTitle: "GÜNÜN VADİ EFSANELERİ",
    colRank: "#",
    colSummoner: "SİHİRDAR",
    colScore: "SKOR",
    colTime: "SÜRE",
    leaderboardEmpty: "Bugün henüz kaydedilmiş bir skor yok. Vadiyi fetheden ilk sihirdar sen ol!",
    leaderboardResetNote: "Her gün 00:00 UTC'de tüm dünyada aynı yeni haritayla sıfırlanır.",
    endgameBtnLeaderboard: "Günlük Liderlik",
    endgameLeaderboardSub: "Bugünün en yüksek skorlu sihirdarlarını görüntüle",
    spectatorStatus: "MAÇ İZLENİYOR (YALNIZCA İZLEYİCİ)",
    tabCreateRoom: "ODA OLUŞTUR",
    tabJoinRoom: "KODLA KATIL",
    generatedRoomCodeLabel: "Oda Kodunuz",
    createRoomHint: "Sizin için benzersiz bir oda kodu oluşturuldu. Arkadaşınızı davet etmek için lobiyi başlatın!",
    waitingBadge: "MAÇ LOBİSİ",
    waitingTitle: "RAKİP BEKLENİYOR",
    waitingSubtitle: "Başlamak için oda kodunu veya davet bağlantısını arkadaşınla paylaş",
    waitingRoomCodeLabel: "ODA KODU",
    btnCopyCode: "Kodu Kopyala",
    btnShareInviteLink: "DAVET LİNKİNİ PAYLAŞ",
    waitingPlayerStatus: "2. oyuncunun katılması bekleniyor... (1/2)",
    waitingCancelBtn: "← LOBİDEN AYRIL",
    inviteLinkCopiedToast: "Davet bağlantısı panoya kopyalandı!",
    codeCopiedToast: "Oda kodu panoya kopyalandı!",
    matchRulesHeading: "Maç Kuralları",
    hexChainingTitle: "Hex Zincirleme",
    hexChainingDesc: "Hamleler sadece sahip olunan hex'lerin komşularına yapılabilir",
    champLockingTitle: "Şampiyon Kilitleme",
    champLockingDesc: "Kullanılan şampiyonlar bir daha kullanılamaz",
    turnTimerTitle: "Tur Süresi",
    turnTimerDesc: "Her tur için verilen süre",
    timer30s: "30 Saniye",
    timer60s: "1 Dakika",
    timerUnlimited: "Sınırsız",
    timer2m30s: "2dk 30sn (Sabit)",
    dailySoloRulesFixed: "Zincirleme: AÇIK | Kilitleme: AÇIK | Toplam Süre: 2dk 30sn (Küresel Standart)",
    dailyPlayedAlready: "Bugünkü Günlük Solo Mücadelesini zaten tamamladın! Skor tablosunu incele veya yarın tekrar dene.",
    dailyOnceWarning: "Bilgi: Günlük mücadele cihaz başına günde yalnızca 1 defa oynanabilir.",
    backBtn: "← GERİ",
    startGameBtn: "OYUNU BAŞLAT",

    // How to Play Modal
    guideBadge: "SİHİRDAR REHBERİ",
    guideTitle: "RIFT POSSESSION NASIL OYNANIR",
    guideSubtitle: "Stratejik şampiyon bilginle 37 hex'lik haritaya hükmet",
    guideStep1Title: "Amaç & Hex Izgarası",
    guideStep1Text: "Oyun tahtası, 3 yarıçaplı bir ızgarada düzenlenmiş 37 altıgen kareden oluşur. Her hex belirli bir kategori kriterine sahiptir (Bölge, Rol, Kostüm Serisi, Mekanik, Tür, Çıkış Yılı, Kaynak, Menzil veya Cinsiyet). Amacın rakibinden daha fazla hex ele geçirmektir!",
    guideStep2Title: "Tur Nasıl Oynanır",
    guideRule1Title: "Hex Seç:",
    guideRule1Desc: "Izgara üzerinde uygun bir kareye tıkla.",
    guideRule2Title: "Geçerli Bir Şampiyon Yaz:",
    guideRule2Desc: "O karenin koşulunu karşılayan bir League şampiyonunun adını yaz (örn. Ionia, True Damage, Spirit Blossom, Yordle) ve Gönder'e bas.",
    guideRule3Title: "Hex Ele Geçirildi:",
    guideRule3Desc: "Kare, takımının rengine boyanır ve şampiyonun görseli yerleşir!",
    guideStep3Title: "Özel Maç Kuralları (Ayarlar)",
    guideRuleChainingBadge: "HEX ZİNCİRLEME",
    guideRuleChainingDesc: "AÇIK olduğunda, ilk turdan sonra sadece önceden ele geçirdiğin karelere komşu (bitişik) bir hex seçebilirsin. KAPALI olduğunda tüm tahtadan serbestçe seçim yapabilirsin.",
    guideRuleLockingBadge: "ŞAMPİYON KİLİTLEME",
    guideRuleLockingDesc: "AÇIK olduğunda, bir şampiyon başarılı şekilde kullanıldığında kilitlenir ve maç boyunca hiçbir oyuncu tarafından tekrar seçilemez.",
    guideStep4Title: "Oyun Modları",
    guideModeSameScreenTitle: "Aynı Ekran:",
    guideModeSameScreenDesc: "Tek bir cihazda sırayla oynanan düello.",
    guideModeOnlineSummonersTitle: "Çevrimiçi Sihirdarlar:",
    guideModeOnlineSummonersDesc: "Çevrimiçi gerçek oyuncularla otomatik eşleşme.",
    guideModeOnlineFriendTitle: "Arkadaşla Oyna:",
    guideModeOnlineFriendDesc: "Özel Oda Kodu girerek arkadaşınla düello yap.",
    guideModeSoloTitle: "Tek Başına (Solo-Bolo):",
    guideModeSoloDesc: "Kareleri tekrar tekrar ele geçirerek kombo puanı topla ve en yüksek rekoru kır!",
    dontShowAgain: "Bir daha otomatik gösterme",
    enterTheRiftBtn: "VADİYE GİR",

    // In-Game Menu Modal
    menuBadge: "OYUN MENÜSÜ",
    menuTitle: "OYUN DURDURULDU",
    menuSubtitle: "Bir eylem seçin",
    menuResumeMain: "Oyuna Dön",
    menuResumeSub: "Mevcut maça geri dön ve oynamaya devam et",
    menuRestartMain: "Yeniden Başlat",
    menuRestartSub: "Yeni bir tahta ve mevcut kurallarla maçı baştan başlat",
    menuExitMain: "Menüye Dön",
    menuExitSub: "Bu arenadan ayrıl ve mod seçimine dön",

    // Statistics Modal
    statsBadge: "MAÇ SONU RAPORU",
    statsTitle: "MAÇ İSTATİSTİKLERİ",
    statsSubtitle: "Karşılaştırmalı performans ve taktiksel analizler",
    statsSectionChamps: "SEÇİLEN VE OYNANAN ŞAMPİYONLAR",
    statsSectionHighlights: "TAKTİKSEL ÖNE ÇIKANLAR",
    closeReturnBtn: "KAPAT VE DÖN",
    statsSoloSummaryHeader: "👑 SOLO-BOLO PERFORMANS ÖZETİ",
    statFinalScore: "Son Skor",
    statBoardProgress: "Tahta İlerlemesi",
    statClaimedFull: "Hex Ele Geçirildi (%100)",
    statTotalTimeElapsed: "Geçen Toplam Süre",
    statTotalTimeUsed: "Kullanılan Toplam Süre",
    statUniqueChamps: "Oynanan Farklı Şampiyon",
    statLargestCombo: "En Büyük Çoklu Hex Kombosu",
    statAvgPointsMove: "Hamle Başına Ortalama Puan",
    statHexesOccupied: "Sahip Olunan Hex Sayısı",
    statChampsDrafted: "Kullanılan Şampiyon Sayısı",
    statTerritoryRetaken: "Geri Alınan Bölge",
    statLargestChain: "En Büyük Kombo / Zincir",
    statTimeoutsIncurred: "Süre Aşımı Sayısı",
    statSummonerRoster: "Sihirdar Şampiyon Havuzu",
    statChampsUsed: "Kullanılan Şampiyon",
    statPool: "Havuzu",
    statPlayer1Blue: "OYUNCU 1 (MAVİ)",
    statPlayer2Red: "OYUNCU 2 (KIRMIZI)",
    statBlueSide: "🔵 MAVİ TARAF",
    statRedSide: "🔴 KIRMIZI TARAF",
    statHexWord: "hex",
    statHexInOneTurn: "tek turda hex",
    statPtsWord: "puan",
    hlRiftConquerorTitle: "Vadi Fatihi",
    hlRiftConquerorDesc: "37 hex'in tamamını ele geçirerek tam {pts} puan topladı!",
    hlComboMasterTitle: "Kombo Ustası",
    hlComboMasterDesc: "Tek bir hamlede {chain} hex'i peş peşe zincirledi!",
    hlPacePrecisionTitle: "Hız ve İsabet",
    hlPacePrecisionDesc: "Mücadelenin tamamını {time} sürede başarıyla bitirdi.",
    hlLolKnowledgeTitle: "Derin LoL Bilgisi",
    hlLolKnowledgeDesc: "{count} farklı şampiyon kriteri eşleşmesinden faydalandı.",
    hlSpeedDemonTitle: "Hız Şeytanı: {side}",
    hlSpeedDemonDesc: "{time2} yerine toplam {time1} düşünme süresiyle hamlelerini daha hızlı tamamladı.",
    hlHexReclaimerTitle: "Bölge Geri Alıcısı: {side}",
    hlHexReclaimerDesc: "Rakibinden {retaken} hex'lik bölgeyi geri çaldı!",
    hlEvenTurfWarTitle: "Dengeli Bölge Savaşı",
    hlEvenTurfWarDesc: "Her iki taraf da çetin bir mücadeleyle {retaken}'şer hex çaldı!",
    hlChainMaestroTitle: "Zincir Maestrosu: {side}",
    hlChainMaestroDesc: "Tek bir hamlede devasa {chain} hex'lik vuruş gerçekleştirdi!",
    hlEqualPrecisionTitle: "Eşit Ustalık",
    hlEqualPrecisionDesc: "İki oyuncu da en yüksek {chain} hex'lik hamle başarısına ulaştı!",
    hlRosterScholarTitle: "Şampiyon Alimi: {side}",
    hlRosterScholarDesc: "{count} farklı şampiyondan oluşan daha geniş bir havuz kullandı.",
    hlClockDisciplineTitle: "Kusursuz Süre Disiplini",
    hlClockDisciplineDesc: "Maç boyunca her iki sihirdar da hiç süre aşımına uğramadı!",
    hlDisciplinedSummonerTitle: "Disiplinli Sihirdar: {side}",
    hlDisciplinedSummonerDesc: "Süre disiplinini koruyarak daha az süre aşımı yaşadı.",

    // Post-Match / Endgame Modal & Best Champions Modal
    headerBtnMatchOptions: "MAÇ SEÇENEKLERİ",
    endgameVictory: "ZAFER",
    endgameDefeat: "BOZGUN",
    endgameDraw: "BERABERE",
    endgameBlueSideWins: "MAVİ TARAF KAZANDI",
    endgameRedSideWins: "KIRMIZI TARAF KAZANDI",
    endgameChallengeCompleted: "MÜCADELE TAMAMLANDI",
    endgameMatchCompleted: "MAÇ TAMAMLANDI",
    endgameDuelFinished: "DÜELLO BİTTİ",
    endgameRiftCleared: "VADİ TEMİZLENDİ!",
    endgameChooseNextStep: "Bir sonraki adımı seçin",
    endgameSoloSubtitle: "Solo-Bolo mücadelesi bitti. Skorunu ve analizlerini incele.",
    endgameSameScreenSubtitle: "Aynı Ekran maçı sonuçlandı.",
    endgameHexesLabel: "HEX",
    endgameTotalSoloPoints: "TOPLAM SOLO PUANI",
    endgameHexesClaimed: "ELE GEÇİRİLEN HEX",
    endgameBtnRematch: "Rövanş",
    endgameRematchSub: "Mevcut kurallarla tekrar oyna (Her iki oyuncu da onaylamalıdır)",
    endgameRematchSubSolo: "Yeni bir tahtada taze bir Solo-Bolo koşusu başlat",
    endgameRematchSubSameScreen: "Bu ayarlarla bir maç daha yap",
    endgameRematchRequestedWait: "Rövanş istendi! Rakip bekleniyor...",
    endgameRematchYouVoted: "Rövanş oyu verdin. Rakip bekleniyor... ({votes}/{needed})",
    endgameRematchOpponentWants: "Rakip rövanş istiyor! Başlamak için \"Rövanş\"a bas! ({votes}/{needed})",
    endgameBtnBestChamps: "En İyi Şampiyonlar",
    endgameBestChampsSub: "Bu tahta düzeni ve kurallar için en ideal şampiyonlar",
    endgameBestChampsSubRules: "Bu tahta için en ideal şampiyonlar (Hex Zincirleme: {chaining})",
    endgameBtnStatistics: "İstatistikler",
    endgameStatisticsSub: "Hex kontrolü, şampiyon havuzu, geri almalar ve taktiksel veriler",
    endgameBtnReview: "İncele",
    endgameReviewSub: "Haritayı, karoları ve ele geçirilen bölgeleri serbestçe incele",
    endgameBtnShare: "Sonuçları Paylaş",
    endgameShareSub: "Maç sonucunu ve hex skorunu kopyala",
    endgameShareCopied: "Sonuçlar panoya kopyalandı!",
    sharedResultModalBadge: "MAÇ SONUCU",
    sharedResultModalTitle: "RIFT POSSESSION",
    sharedResultSoloTitle: "SOLO-BOLO MÜCADELESİ",
    sharedResultDailyTitle: "GÜNLÜK SOLO MÜCADELE",
    sharedResultDuelTitle: "VADİ DÜELLOSU",
    sharedResultScoreLabel: "Skor: {score} Puan",
    sharedResultCleared: "37/37 Hex Tamamlandı",
    sharedResultWinnerBlue: "MAVİ TAKIM KAZANDI",
    sharedResultWinnerRed: "KIRMIZI TAKIM KAZANDI",
    sharedResultDraw: "BERABERE",
    sharedResultPlayNow: "RIFT POSSESSION OYNA",
    endgameBtnMenu: "Menüye Dön",
    endgameMenuSub: "Oturumdan çık ve oyun modları ekranına dön",
    footerFollowHeading: "DAHA FAZLA OYUN İÇİN BİZİ TAKİP EDİN",
    footerPrivacy: "Gizlilik",
    footerContact: "İletişim",
    footerLegal: "Tüm logolar ve markalar ilgili sahiplerinin mülkiyetindedir ve yalnızca tanımlama amacıyla kullanılır",

    // Best Champions Modal
    bestChampsBadge: "TAKTİKSEL İSTİHBARAT",
    bestChampsTitle: "EN İDEAL ŞAMPİYONLAR",
    bestChampsRulesNote: "Bu maçın tahta düzeni ve Hex Zincirleme kuralı {chaining} baz alınarak hesaplandı.",
    bestChampsChainingOn: "AÇIK (Kesintisiz İlerleme)",
    bestChampsChainingOff: "KAPALI (Yalnızca Bitişik Komşular)",
    bestChampsSearchPlaceholder: "Şampiyon adı ara...",
    bestChampsShowingCount: "{total} şampiyon içinden {count} tanesi gösteriliyor",
    bestChampsNoMatches: "Eşleşen şampiyon bulunamadı.",
    bestChampsMaxSingleMove: "Tek Hamlede Maksimum",
    bestChampsHexSingle: "Hex",
    bestChampsHexPlural: "Hex",
    bestChampsBestPlacement: "En iyi yerleşim: {crit} | Tahtada toplam eşleşme: {count}",
    bestChampsMatchesBoard: "Tahtada {count} karo ile eşleşiyor",

    // Category Type Names
    cat_REGION: "Bölge",
    cat_ROLE: "Rol",
    cat_SKIN: "Kostüm Serisi",
    cat_SPECIES: "Tür",
    cat_MECH: "Mekanik",
    cat_RESOURCE: "Kaynak",
    cat_RANGE: "Menzil",
    cat_GENDER: "Cinsiyet",
    cat_YEAR: "Çıkış Yılı",

    // Category Tags & UI
    skinTag: "Kostüm",
    selectedPrefix: "Seçilen: ",
    selectedNone: "Yok",

    // Criteria Names (Values)
    crit: {
      // Regions
      "Ionia": "Ionia",
      "Noxus": "Noxus",
      "Piltover": "Piltover",
      "Zaun": "Zaun",
      "Demacia": "Demacia",
      "Freljord": "Freljord",
      "Shurima": "Shurima",
      "Shadow Isles": "Gölge Adalar",
      "Bilgewater": "Bilgewater",
      "Bandle City": "Bandle Şehri",
      "Targon": "Targon",
      "Void": "Hiçlik",
      "Ixtal": "Ixtal",
      "Runeterra": "Runeterra",

      // Roles
      "Fighter": "Dövüşçü",
      "Mage": "Büyücü",
      "Tank": "Tank",
      "Marksman": "Nişancı",
      "Assassin": "Suikastçı",
      "Support": "Destek",

      // Resources
      "Mana": "Mana",
      "Manaless": "Manasız",
      "Energy": "Enerji",

      // Range
      "Melee": "Yakın Dövüş",
      "Ranged": "Menzilli",

      // Gender
      "Male": "Erkek",
      "Female": "Kadın",
      "Indeterminate": "Diğer",

      // Species
      "Human": "İnsan",
      "Monster/Beast": "Canavar / Yaratık",
      "Aspect/Celestial": "Suret / Kozmik",
      "Undead/Spirit": "Hortlak / Ruh",
      "Yordle": "Yordle",
      "Vastaya": "Vastaya",
      "Golem/Construct": "Golem / Yapay",
      "Darkin": "Darkin",

      // Mechanics
      "Knockup": "Havaya Savurma",
      "Stun": "Sersemletme",
      "Shield": "Kalkan",
      "Dash": "Atılma",
      "Root": "Sabitleme",
      "True Damage": "Gerçek Hasar",
      "Stealth": "Görünmezlik",
      "Global Ult": "Küresel Ulti",
      "Fear": "Korkutma",
      "Silence": "Susturma",
      "Charm": "Ayartma",
      "Suppression": "Sindirme",
      "Taunt": "Kışkırtma",
      "Blind": "Kör Etme",
      "Revive": "Dirilme",

      // Years
      "Released 2009-2013": "2009-2013 Çıkışlı",
      "Released 2014-2018": "2014-2018 Çıkışlı",
      "Released 2019-2023": "2019-2023 Çıkışlı",
      "Released 2023+": "2023+ Çıkışlı",

      // Skin Lines
      "Spirit Blossom": "Ruh Çiçeği",
      "PROJECT": "PROJE",
      "High Noon": "Vahşi Batılı",
      "Star Guardian": "Yıldız Muhafızı",
      "Blood Moon": "Kanlı Ay",
      "Pool Party": "Havuz Partisi",
      "Dark Star": "Sonsuz Karanlık",
      "Coven": "Cadılar Meclisi",
      "Battle Academia": "Savaş Akademisi",
      "HEARTSTEEL": "HEARTSTEEL",
      "K/DA": "K/DA",
      "True Damage": "True Damage",
      "Arcana": "Arkana",
      "Anima Squad": "Anima Müfrezesi",
      "Empyrean": "Gök Kubbe",
      "Elderwood": "Ağaçata",
      "Winterblessed": "Kışın Kutsanmışları",
      "Arcade": "Jeton Düşmanı",
      "Porcelain": "Porselen",
      "Sentinel / Ruined": "Işık Muhafızı / Mahvolmuş",
      "Battlecast": "Savaş Makinesi",
      "Dragonslayer": "Ejderkatili",
      "Fright Night": "Korku Gecesi",
      "Astronaut": "Astronot",
      "Debonair": "Centilmen",
      "Cafe Cuties": "Pastane Güzelleri",
      "Inkshadow": "Mürekkepgölge"
    }
  },
  ko: {
    // Start Screen / Main Menu
    lobbyBadge: "LOL 그리드 전략 게임",
    lobbyTitle: "RIFT POSSESSION",
    lobbySubtitle: "리그 오브 레전드 챔피언으로 헥스 조건을 점령하세요",
    howToPlayBtn: "게임 방법 & 규칙",
    modeSameScreenTitle: "동일 화면",
    modeSameScreenDesc: "한 기기에서 2명의 플레이어가 번갈아 진행합니다",
    modeOnlineSummonersTitle: "온라인 소환사",
    modeOnlineSummonersDesc: "동일한 설정의 온라인 상대와 자동 매칭합니다",
    modeOnlineFriendTitle: "친구와 함께",
    modeOnlineFriendDesc: "사용자 지정 방 코드를 입력하여 친구와 대결합니다",
    modeSoloTitle: "솔로 플레이 (Solo-Bolo)",
    modeSoloDesc: "싱글 플레이어 최고 점수 도전. 콤보 점수를 위해 타일을 다시 점령하세요!",
    modeDailySoloTitle: "일일 솔로 챌린지",
    modeDailySoloDesc: "전 세계 플레이어에게 매일 동일한 헥스 보드가 제공됩니다! 리더보드에 도전하세요.",

    // Options Screen
    badgeLocalPlay: "로컬 대전",
    badgeMatchmaking: "온라인 매칭",
    badgePrivateDuel: "비공개 듀얼",
    badgeSoloChallenge: "솔로 챌린지",
    badgeDailyChallenge: "일일 챌린지",
    modeOnlineSummonersSub: "선택한 설정으로 온라인 상대를 찾습니다",
    modeOnlineFriendSub: "친구와 대결하려면 동일한 방 코드와 규칙을 입력하세요",
    modeSoloSub: "37개 헥스를 모두 점령하세요. 재점령 시 콤보 포인트가 누적됩니다!",
    modeDailySoloSub: "오늘의 글로벌 보드! 37개 타일을 모두 점령하고 리더보드에 등록하세요.",
    btnStartSameScreen: "동일 화면 매치 시작",
    btnFindOpponent: "상대 찾기",
    btnJoinCreateRoom: "방 참여 / 생성",
    btnStartSoloBolo: "솔로 플레이 시작",
    btnStartDailySolo: "일일 챌린지 시작",
    btnCreateFriendLobby: "방 만들기 & 친구 대기",
    btnJoinFriendGame: "대결 참여",
    roomCodeLabel: "방 코드",
    roomCodePlaceholder: "방 코드 입력 (예: DUEL7)",
    roomCodeHint: "친구가 공유한 방 코드를 입력하여 경기에 참여하거나 관전하세요.",
    nicknameLabel: "소환사 닉네임",
    nicknamePlaceholder: "닉네임 입력 (예: Faker)",
    nicknameHint: "37개 헥스를 클리어하면 일일 리더보드에 닉네임이 영구 기록됩니다!",
    dailyLeaderboardBadge: "일일 랭킹",
    dailyLeaderboardTitle: "오늘의 협곡 전설",
    colRank: "#",
    colSummoner: "소환사",
    colScore: "점수",
    colTime: "시간",
    leaderboardEmpty: "오늘 아직 등록된 기록이 없습니다. 협곡을 가장 먼저 정복해 보세요!",
    leaderboardResetNote: "매일 자정(00:00 UTC)에 전 세계 공통 신규 맵으로 갱신됩니다.",
    endgameBtnLeaderboard: "일일 순위표",
    endgameLeaderboardSub: "오늘의 전 세계 상위 랭킹 확인하기",
    spectatorStatus: "경기 관전 중 (관전 모드)",
    tabCreateRoom: "방 만들기",
    tabJoinRoom: "코드로 참여",
    generatedRoomCodeLabel: "생성된 방 코드",
    createRoomHint: "고유한 방 코드가 자동으로 생성되었습니다. 대기실을 열어 친구를 초대하세요!",
    waitingBadge: "매치 대기실",
    waitingTitle: "라이벌 소환 중",
    waitingSubtitle: "경기를 시작하려면 방 코드나 직접 초대 링크를 친구에게 공유하세요",
    waitingRoomCodeLabel: "방 코드",
    btnCopyCode: "코드 복사",
    btnShareInviteLink: "초대 링크 공유",
    waitingPlayerStatus: "2번째 플레이어 참가 대기 중... (1/2)",
    waitingCancelBtn: "← 로비 나가기",
    inviteLinkCopiedToast: "초대 링크가 클립보드에 복사되었습니다!",
    codeCopiedToast: "방 코드가 클립보드에 복사되었습니다!",
    matchRulesHeading: "경기 규칙",
    hexChainingTitle: "헥스 연결 (체이닝)",
    hexChainingDesc: "이미 점령한 자신의 타일과 인접한 타일만 선택 가능",
    champLockingTitle: "챔피언 잠금",
    champLockingDesc: "이미 사용된 챔피언은 다시 사용할 수 없습니다",
    turnTimerTitle: "턴 제한 시간",
    turnTimerDesc: "한 턴당 주어지는 시간",
    timer30s: "30초",
    timer60s: "1분",
    timerUnlimited: "무제한",
    timer2m30s: "2분 30초 (고정)",
    dailySoloRulesFixed: "체이닝: 켜짐 | 잠금: 켜짐 | 총 제한시간: 2분 30초 (전세계 표준)",
    dailyPlayedAlready: "오늘의 일일 솔로 챌린지를 이미 완료하셨습니다! 순위표를 확인하거나 내일 다시 도전하세요.",
    dailyOnceWarning: "안내: 일일 챌린지는 기기당 하루에 1회만 참여 가능합니다.",
    backBtn: "← 뒤로 가기",
    startGameBtn: "게임 시작",

    // How to Play Modal
    guideBadge: "소환사 설명서",
    guideTitle: "RIFT POSSESSION 플레이 방법",
    guideSubtitle: "전략적인 챔피언 지식으로 37개 헥스 그리드를 정복하세요",
    guideStep1Title: "목표 & 헥스 그리드",
    guideStep1Text: "보드는 반경 3 그리드로 배열된 37개의 육각형 타일로 구성됩니다. 각 헥스는 특정 범주 조건(지역, 역할군, 스킨 시리즈, 스킬 메커니즘, 종족, 출시 연도, 자원, 사거리, 성별)을 가집니다. 상대보다 더 많은 타일을 점령하는 것이 목표입니다!",
    guideStep2Title: "턴 진행 방식",
    guideRule1Title: "헥스 선택:",
    guideRule1Desc: "그리드에서 선택 가능한 타일을 클릭합니다.",
    guideRule2Title: "유효한 챔피언 입력:",
    guideRule2Desc: "해당 타일의 조건을 만족하는 리그 오브 레전드 챔피언 이름을 입력하고 엔터 또는 제출을 누릅니다.",
    guideRule3Title: "헥스 점령 완료:",
    guideRule3Desc: "타일이 팀 색상으로 칠해지고 챔피언의 초상화가 표시됩니다!",
    guideStep3Title: "특수 매치 규칙 (토글)",
    guideRuleChainingBadge: "헥스 연결 (체이닝)",
    guideRuleChainingDesc: "활성화(ON) 시, 첫 턴 이후에는 기존에 점령한 타일과 맞닿아 있는(인접한) 헥스만 선택할 수 있습니다. 비활성화(OFF) 시 전체 보드에서 자유롭게 선택 가능합니다.",
    guideRuleLockingBadge: "챔피언 잠금",
    guideRuleLockingDesc: "활성화(ON) 시, 챔피언이 한 번 사용되면 잠금 처리되어 경기 동안 양 플레이어 모두 다시 사용할 수 없습니다.",
    guideStep4Title: "게임 모드",
    guideModeSameScreenTitle: "동일 화면:",
    guideModeSameScreenDesc: "1대의 기기에서 번갈아 두는 로컬 듀얼 모드.",
    guideModeOnlineSummonersTitle: "온라인 소환사:",
    guideModeOnlineSummonersDesc: "온라인 실제 플레이어와 자동 매칭 모드.",
    guideModeOnlineFriendTitle: "친구와 함께:",
    guideModeOnlineFriendDesc: "사용자 지정 방 코드를 통해 친구와 1:1 대결 모드.",
    guideModeSoloTitle: "솔로 플레이 (Solo-Bolo):",
    guideModeSoloDesc: "타일을 재점령하여 콤보 점수를 쌓고 최고 기록에 도전하세요!",
    dontShowAgain: "다음번에 자동으로 표시하지 않기",
    enterTheRiftBtn: "협곡 입장",

    // In-Game Menu Modal
    menuBadge: "게임 메뉴",
    menuTitle: "일시 정지됨",
    menuSubtitle: "원하는 작업을 선택하세요",
    menuResumeMain: "게임으로 돌아가기",
    menuResumeSub: "현재 경기를 계속 진행합니다",
    menuRestartMain: "재시작",
    menuRestartSub: "현재 규칙을 유지한 채 새 보드로 재시작합니다",
    menuExitMain: "메뉴로 돌아가기",
    menuExitSub: "경기를 종료하고 모드 선택 화면으로 돌아갑니다",

    // Statistics Modal
    statsBadge: "경기 결과 보고서",
    statsTitle: "경기 통계",
    statsSubtitle: "상세 성과 및 전술 분석",
    statsSectionChamps: "기용 및 플레이된 챔피언",
    statsSectionHighlights: "전술 하이라이트",
    closeReturnBtn: "닫기 및 돌아가기",
    statsSoloSummaryHeader: "👑 솔로 플레이 성과 요약",
    statFinalScore: "최종 점수",
    statBoardProgress: "보드 점령 진행도",
    statClaimedFull: "헥스 점령 완료 (100%)",
    statTotalTimeElapsed: "총 소요 시간",
    statTotalTimeUsed: "총 사용 시간",
    statUniqueChamps: "기용된 고유 챔피언 수",
    statLargestCombo: "최대 연속 헥스 콤보",
    statAvgPointsMove: "턴당 평균 획득 점수",
    statHexesOccupied: "점령한 헥스 수",
    statChampsDrafted: "기용한 챔피언 수",
    statTerritoryRetaken: "탈환한 헥스 영토",
    statLargestChain: "최대 콤보 / 체인",
    statTimeoutsIncurred: "시간 초과 횟수",
    statSummonerRoster: "소환사 챔피언 로스터",
    statChampsUsed: "사용한 챔피언",
    statPool: "풀",
    statPlayer1Blue: "플레이어 1 (블루)",
    statPlayer2Red: "플레이어 2 (레드)",
    statBlueSide: "🔵 블루 진영",
    statRedSide: "🔴 레드 진영",
    statHexWord: "개",
    statHexInOneTurn: "개 (한 턴)",
    statPtsWord: "점",
    hlRiftConquerorTitle: "협곡의 정복자",
    hlRiftConquerorDesc: "37개 헥스를 모두 점령하여 총 {pts}점을 획득했습니다!",
    hlComboMasterTitle: "콤보 마스터",
    hlComboMasterDesc: "한 번의 결정적인 플레이로 {chain}개 헥스를 연속 점령했습니다!",
    hlPacePrecisionTitle: "속도와 정밀함",
    hlPacePrecisionDesc: "전체 챌린지를 {time} 만에 완주했습니다.",
    hlLolKnowledgeTitle: "깊이 있는 LoL 지식",
    hlLolKnowledgeDesc: "{count}명의 서로 다른 챔피언 조건 매칭을 성공적으로 활용했습니다.",
    hlSpeedDemonTitle: "스피드 데몬: {side}",
    hlSpeedDemonDesc: "{time2}보다 빠른 {time1} 총 생각 시간으로 턴을 신속하게 완료했습니다.",
    hlHexReclaimerTitle: "영토 탈환자: {side}",
    hlHexReclaimerDesc: "상대방으로부터 {retaken}개의 점령 타일을 다시 빼앗았습니다!",
    hlEvenTurfWarTitle: "치열한 쟁탈전",
    hlEvenTurfWarDesc: "양 플레이어 모두 각각 {retaken}개 헥스를 서로 탈환하며 치열한 접전을 펼쳤습니다!",
    hlChainMaestroTitle: "체인 마에스트로: {side}",
    hlChainMaestroDesc: "단 한 번의 수로 {chain}개 헥스를 단숨에 장악했습니다!",
    hlEqualPrecisionTitle: "동등한 기량",
    hlEqualPrecisionDesc: "두 플레이어 모두 최대 {chain}개 헥스 콤보를 달성했습니다!",
    hlRosterScholarTitle: "챔피언 석학: {side}",
    hlRosterScholarDesc: "{count}명의 다양한 챔피언을 기용하여 폭넓은 지식을 선보였습니다.",
    hlClockDisciplineTitle: "완벽한 시간 관리",
    hlClockDisciplineDesc: "경기 내내 양 플레이어 모두 단 한 번의 시간 초과도 없었습니다!",
    hlDisciplinedSummonerTitle: "노련한 소환사: {side}",
    hlDisciplinedSummonerDesc: "침착하게 턴 시간을 관리하여 더 적은 시간 초과를 기록했습니다.",

    // Post-Match / Endgame Modal & Best Champions Modal
    headerBtnMatchOptions: "매치 옵션",
    endgameVictory: "승리",
    endgameDefeat: "패배",
    endgameDraw: "무승부",
    endgameBlueSideWins: "블루 팀 승리",
    endgameRedSideWins: "레드 팀 승리",
    endgameChallengeCompleted: "도전 완료",
    endgameMatchCompleted: "경기 완료",
    endgameDuelFinished: "결투 종료",
    endgameRiftCleared: "협곡 정복 완료!",
    endgameChooseNextStep: "다음 작업을 선택하세요",
    endgameSoloSubtitle: "솔로 플레이 챌린지가 끝났습니다. 최종 점수와 분석을 확인하세요.",
    endgameSameScreenSubtitle: "동일 화면 매치가 종료되었습니다.",
    endgameHexesLabel: "개 헥스",
    endgameTotalSoloPoints: "총 솔로 점수",
    endgameHexesClaimed: "점령한 헥스",
    endgameBtnRematch: "재경기",
    endgameRematchSub: "현재 규칙으로 다시 플레이합니다 (양쪽 모두 수락 필요)",
    endgameRematchSubSolo: "새로운 보드에서 솔로 플레이를 다시 시작합니다",
    endgameRematchSubSameScreen: "현재 설정으로 한 경기 더 진행합니다",
    endgameRematchRequestedWait: "재경기를 요청했습니다! 상대방을 기다리는 중...",
    endgameRematchYouVoted: "재경기에 투표했습니다. 상대방을 기다리는 중... ({votes}/{needed})",
    endgameRematchOpponentWants: "상대방이 재경기를 원합니다! \"재경기\"를 눌러 시작하세요! ({votes}/{needed})",
    endgameBtnBestChamps: "최적 챔피언",
    endgameBestChampsSub: "현재 보드와 규칙에 가장 적합한 순위별 챔피언 목록",
    endgameBestChampsSubRules: "현재 보드에 가장 적합한 최적 챔피언 (헥스 연결: {chaining})",
    endgameBtnStatistics: "경기 통계",
    endgameStatisticsSub: "영토 장악, 챔피언 풀, 탈환 수 및 세부 전술 데이터",
    endgameBtnReview: "경기 복기",
    endgameReviewSub: "전체 맵과 타일, 점령된 영토를 자유롭게 둘러봅니다",
    endgameBtnShare: "결과 공유",
    endgameShareSub: "경기 결과 및 점수를 클립보드에 복사",
    endgameShareCopied: "결과가 클립보드에 복사되었습니다!",
    sharedResultModalBadge: "경기 결과",
    sharedResultModalTitle: "RIFT POSSESSION",
    sharedResultSoloTitle: "솔로-볼로 챌린지",
    sharedResultDailyTitle: "일일 솔로 챌린지",
    sharedResultDuelTitle: "협곡 결투",
    sharedResultScoreLabel: "점수: {score}점",
    sharedResultCleared: "37개 헥스 클리어",
    sharedResultWinnerBlue: "블루 진영 승리",
    sharedResultWinnerRed: "레드 진영 승리",
    sharedResultDraw: "무승부",
    sharedResultPlayNow: "RIFT POSSESSION 플레이하기",
    endgameBtnMenu: "메뉴로 돌아가기",
    endgameMenuSub: "경기를 종료하고 게임 모드 선택 화면으로 이동합니다",
    footerFollowHeading: "더 많은 게임을 위해 팔로우하세요",
    footerPrivacy: "개인정보처리방침",
    footerContact: "문의하기",
    footerLegal: "모든 로고와 브랜드는 해당 소유자의 자산이며 식별 목적으로만 사용됩니다",

    // Best Champions Modal
    bestChampsBadge: "전술 정보",
    bestChampsTitle: "최적 챔피언",
    bestChampsRulesNote: "현재 경기 보드 배치와 헥스 연결({chaining}) 규칙을 바탕으로 분석되었습니다.",
    bestChampsChainingOn: "활성화 (연속 전파)",
    bestChampsChainingOff: "비활성화 (인접 타일만)",
    bestChampsSearchPlaceholder: "챔피언 이름 검색...",
    bestChampsShowingCount: "전체 {total}명 중 {count}명 표시 중",
    bestChampsNoMatches: "일치하는 챔피언이 없습니다.",
    bestChampsMaxSingleMove: "단일 턴 최대",
    bestChampsHexSingle: "개 헥스",
    bestChampsHexPlural: "개 헥스",
    bestChampsBestPlacement: "최적 위치: {crit} | 보드 내 일치 타일: {count}개",
    bestChampsMatchesBoard: "보드 내 {count}개 타일과 일치",

    // Category Type Names
    cat_REGION: "지역",
    cat_ROLE: "역할군",
    cat_SKIN: "스킨 시리즈",
    cat_SPECIES: "종족",
    cat_MECH: "스킬 메커니즘",
    cat_RESOURCE: "자원",
    cat_RANGE: "사거리",
    cat_GENDER: "성별",
    cat_YEAR: "출시 연도",

    // Category Tags & UI
    skinTag: "스킨",
    selectedPrefix: "선택됨: ",
    selectedNone: "선택 안 됨",

    // Criteria Names (Values)
    crit: {
      // Regions
      "Ionia": "아이오니아",
      "Noxus": "녹서스",
      "Piltover": "필트오버",
      "Zaun": "자운",
      "Demacia": "데마시아",
      "Freljord": "프렐요드",
      "Shurima": "슈리마",
      "Shadow Isles": "그림자 제도",
      "Bilgewater": "빌지워터",
      "Bandle City": "밴들시티",
      "Targon": "타곤",
      "Void": "공허",
      "Ixtal": "이쉬탈",
      "Runeterra": "룬테라",

      // Roles
      "Fighter": "전사",
      "Mage": "마법사",
      "Tank": "탱커",
      "Marksman": "원거리 딜러",
      "Assassin": "암살자",
      "Support": "서포터",

      // Resources
      "Mana": "마나",
      "Manaless": "노 코스트",
      "Energy": "기력",

      // Range
      "Melee": "근거리",
      "Ranged": "원거리",

      // Gender
      "Male": "남성",
      "Female": "여성",
      "Indeterminate": "기타",

      // Species
      "Human": "인간",
      "Monster/Beast": "괴물 / 야수",
      "Aspect/Celestial": "성위 / 천상계",
      "Undead/Spirit": "언데드 / 영혼",
      "Yordle": "요들",
      "Vastaya": "바스타야",
      "Golem/Construct": "골렘 / 인공물",
      "Darkin": "다르킨",

      // Mechanics
      "Knockup": "에어본",
      "Stun": "기절",
      "Shield": "보호막",
      "Dash": "돌진",
      "Root": "속박",
      "True Damage": "고정 피해",
      "Stealth": "은신",
      "Global Ult": "글로벌 궁극기",
      "Fear": "공포",
      "Silence": "침묵",
      "Charm": "매혹",
      "Suppression": "제압",
      "Taunt": "도발",
      "Blind": "실명",
      "Revive": "부활",

      // Years
      "Released 2009-2013": "출시 2009-2013",
      "Released 2014-2018": "출시 2014-2018",
      "Released 2019-2023": "출시 2019-2023",
      "Released 2023+": "출시 2023+",

      // Skin Lines
      "Spirit Blossom": "영혼의 꽃",
      "PROJECT": "프로젝트",
      "High Noon": "하이 눈",
      "Star Guardian": "별 수호자",
      "Blood Moon": "불의 축제",
      "Pool Party": "수영장 파티",
      "Dark Star": "암흑의 별",
      "Coven": "악의 여단",
      "Battle Academia": "전투사관학교",
      "HEARTSTEEL": "HEARTSTEEL",
      "K/DA": "K/DA",
      "True Damage": "True Damage",
      "Arcana": "아르카나",
      "Anima Squad": "동물특공대",
      "Empyrean": "창공",
      "Elderwood": "나무정령",
      "Winterblessed": "겨울의 축복",
      "Arcade": "아케이드",
      "Porcelain": "도자기",
      "Sentinel / Ruined": "빛의 감시자 / 몰락한",
      "Battlecast": "전투 기계",
      "Dragonslayer": "용 사냥꾼",
      "Fright Night": "공포의 밤",
      "Astronaut": "우주비행사",
      "Debonair": "연미복",
      "Cafe Cuties": "달콤한 카페",
      "Inkshadow": "먹그림자"
    }
  }
};

let currentLanguage = 'en';

function getTranslatedCategory(cat) {
  const lang = currentLanguage || 'en';
  const key = `cat_${cat}`;
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || 
         (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || cat;
}

function getTranslatedCriterion(name) {
  const lang = currentLanguage || 'en';
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang].crit && TRANSLATIONS[lang].crit[name]) || 
         (TRANSLATIONS['en'] && TRANSLATIONS['en'].crit && TRANSLATIONS['en'].crit[name]) || name;
}

function updateSelectedDisplay() {
  if (!selectedDisplay) return;
  const lang = currentLanguage || 'en';
  const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';
  const prefix = t('selectedPrefix') || 'Selected: ';

  if (!selectedHexId) {
    selectedDisplay.innerHTML = `${prefix}<em>${t('selectedNone') || 'None'}</em>`;
    return;
  }

  const tile = boardState.find(t => t.id === selectedHexId);
  if (!tile || !tile.criteriaObj) {
    selectedDisplay.innerHTML = `${prefix}<em>${t('selectedNone') || 'None'}</em>`;
    return;
  }

  const catLabel = getTranslatedCategory(tile.criteriaObj.cat);
  const critLabel = getTranslatedCriterion(tile.criteriaObj.name);
  selectedDisplay.innerHTML = `${prefix}<strong>[${catLabel}] ${critLabel}</strong>`;
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  currentLanguage = lang;

  try {
    localStorage.setItem('rift_lang', lang);
  } catch (e) {
    // Ignore localStorage errors
  }

  const langSelect = document.getElementById('lang-select');
  if (langSelect && langSelect.value !== lang) {
    langSelect.value = lang;
  }

  // Apply translations to all DOM elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // Apply translations to placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });

  // Re-render board with updated categories if board exists
  if (boardState && boardState.length > 0) {
    renderBoard(boardState);
  }

  // Re-render selected hex criteria label in current language
  updateSelectedDisplay();

  // Re-render statistics modal in current language if currently open or cached
  if (statisticsModal && !statisticsModal.classList.contains('hidden')) {
    renderMatchStatistics();
  }

  // Re-render best champions modal in current language if currently open
  if (bestChampsModal && !bestChampsModal.classList.contains('hidden')) {
    renderBestChampionsList(bestChampsSearch ? bestChampsSearch.value : '');
  }

  // Re-render endgame options modal if currently open
  if (endgameModal && !endgameModal.classList.contains('hidden') && lastGameOverData) {
    openEndgameModal(lastGameOverData);
  } else if (lastRematchStatus) {
    updateRematchUI(lastRematchStatus);
  }

  // Update dynamic options screen text if options screen is visible
  if (optionsScreen && !optionsScreen.classList.contains('hidden')) {
    openOptionsMenu(currentMode);
  }
}

let myPlayerNum = 0;
let currentPlayer = 1;
let selectedHexId = null;
let boardState = [];
let gameActive = false;

// Navigation Screens
const startScreen = document.getElementById('start-screen');
const optionsScreen = document.getElementById('options-screen');
const gameScreen = document.getElementById('game-screen');
const friendWaitingScreen = document.getElementById('friend-waiting-screen');

// Friend Mode Elements (Options & Lobby)
const tabCreateRoom = document.getElementById('tab-create-room');
const tabJoinRoom = document.getElementById('tab-join-room');
const panelCreateRoom = document.getElementById('panel-create-room');
const panelJoinRoom = document.getElementById('panel-join-room');
const generatedRoomCodeInput = document.getElementById('generated-room-code');
const btnRegenCode = document.getElementById('btn-regen-code');
const waitingDisplayCode = document.getElementById('waiting-display-code');
const btnCopyRoomCode = document.getElementById('btn-copy-room-code');
const btnShareInviteLink = document.getElementById('btn-share-invite-link');
const shareCopyToast = document.getElementById('share-copy-toast');
const waitingRulesSummary = document.getElementById('waiting-rules-summary');
const waitingCancelBtn = document.getElementById('waiting-cancel-btn');
let friendActiveTab = 'create'; // 'create' or 'join'

// Mode Selection Buttons
const btnModeSameScreen = document.getElementById('btn-mode-same-screen');
const btnModeOnlineSummoners = document.getElementById('btn-mode-online-summoners');
const btnModeOnlineFriend = document.getElementById('btn-mode-online-friend');
const btnModeSolo = document.getElementById('btn-mode-solo');
const btnModeDailySolo = document.getElementById('btn-mode-daily-solo');

// Options Screen & Daily Leaderboard Elements
const optionsScreenLayout = document.getElementById('options-screen-layout');
const nicknameGroup = document.getElementById('nickname-group');
const playerNicknameInput = document.getElementById('player-nickname-input');
const dailyLeaderboardSidebar = document.getElementById('daily-leaderboard-sidebar');
const leaderboardRowsList = document.getElementById('leaderboard-rows-list');
const leaderboardCurrentDate = document.getElementById('leaderboard-current-date');

// Leaderboard Modal Elements
const leaderboardModal = document.getElementById('leaderboard-modal');
const modalLeaderboardRows = document.getElementById('modal-leaderboard-rows');
const modalLeaderboardDate = document.getElementById('modal-leaderboard-date');
const btnCloseLeaderboard = document.getElementById('btn-close-leaderboard');
const btnEndgameLeaderboard = document.getElementById('btn-endgame-leaderboard');

let isSpectatorMode = false;
let sessionStartTime = 0;

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
const timerNumeric = document.getElementById('timer-numeric');
const autocompleteList = document.getElementById('autocomplete-list');

// End Game Modals and Reopen Controls
const btnReopenEndgame = document.getElementById('btn-reopen-endgame');
const endgameModal = document.getElementById('endgame-modal');
const endgameBadge = document.getElementById('endgame-badge');
const endgameTitle = document.getElementById('endgame-title');
const endgameSubtitle = document.getElementById('endgame-subtitle');
const endgameP1Score = document.getElementById('endgame-p1-score');
const endgameP2Score = document.getElementById('endgame-p2-score');
const endgameP1Title = document.getElementById('endgame-p1-title');
const endgameP2Title = document.getElementById('endgame-p2-title');
const endgameScoreSummary = document.getElementById('endgame-score-summary');
const endgameVsDivider = document.getElementById('endgame-vs-divider');
const endgameP2Summary = document.getElementById('endgame-p2-summary');
const endgameSoloSummary = document.getElementById('endgame-solo-summary');
const endgameSoloScore = document.getElementById('endgame-solo-score');
const endgameSoloHexes = document.getElementById('endgame-solo-hexes');
const rematchStatusBanner = document.getElementById('rematch-status-banner');
const rematchStatusText = document.getElementById('rematch-status-text');
const rematchSubLabel = document.getElementById('rematch-sub-label');
const bestChampsSubLabel = document.getElementById('best-champs-sub-label');
const btnEndgameRematch = document.getElementById('btn-endgame-rematch');
const btnEndgameBestChamps = document.getElementById('btn-endgame-best-champs');
const btnEndgameStatistics = document.getElementById('btn-endgame-statistics');
const btnEndgameReview = document.getElementById('btn-endgame-review');
const btnEndgameShare = document.getElementById('btn-endgame-share');
const endgameShareSub = document.getElementById('endgame-share-sub');
const btnEndgameMenu = document.getElementById('btn-endgame-menu');

// Best Champions Modal Elements
const bestChampsModal = document.getElementById('best-champs-modal');
const bestChampsRulesNote = document.getElementById('best-champs-rules-note');
const bestChampsSearch = document.getElementById('best-champs-search');
const bestChampsCount = document.getElementById('best-champs-count');
const bestChampsList = document.getElementById('best-champs-list');
const btnCloseBestChamps = document.getElementById('btn-close-best-champs');

// Statistics Modal Elements
const statisticsModal = document.getElementById('statistics-modal');
const statsOverviewGrid = document.getElementById('stats-overview-grid');
const statsChampsComparison = document.getElementById('stats-champs-comparison');
const statsHighlights = document.getElementById('stats-highlights');
const btnCloseStatistics = document.getElementById('btn-close-statistics');

// How to Play Modal Elements
const howToPlayModal = document.getElementById('how-to-play-modal');
const btnHowToPlay = document.getElementById('btn-how-to-play');
const btnCloseHowToPlay = document.getElementById('btn-close-how-to-play');
const chkDontShowAgain = document.getElementById('chk-dont-show-again');

// In-Game Pause / Menu Modal Elements
const gameMenuModal = document.getElementById('game-menu-modal');
const btnMenuResume = document.getElementById('btn-menu-resume');
const btnMenuRestart = document.getElementById('btn-menu-restart');
const btnMenuExit = document.getElementById('btn-menu-exit');
const menuRestartSub = document.getElementById('menu-restart-sub');
const menuRestartBadge = document.getElementById('menu-restart-badge');

// Shared Game Result Modal Elements
const sharedResultModal = document.getElementById('shared-result-modal');
const sharedResultBadge = document.getElementById('shared-result-badge');
const sharedResultTitle = document.getElementById('shared-result-title');
const sharedResultSubtitle = document.getElementById('shared-result-subtitle');
const sharedHeroIcon = document.getElementById('shared-hero-icon');
const sharedHeroHeadline = document.getElementById('shared-hero-headline');
const sharedHeroDetails = document.getElementById('shared-hero-details');
const sharedResultTags = document.getElementById('shared-result-tags');
const btnSharedPlayNow = document.getElementById('btn-shared-play-now');
const btnCloseSharedResult = document.getElementById('btn-close-shared-result');

let currentMode = 'same_screen'; // 'same_screen', 'online_summoners', 'online_friend', 'solo'
let championPool = [];
let usedChampions = [];
let currentSuggestions = [];
let activeSuggestionIndex = -1;

// Cached end game data
let lastGameOverData = null;
let lastOptimalChampions = [];

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

function generateRandomRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'RIFT';
  for (let i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

let activeFriendRoomCode = '';

// Screen Navigation Helpers
function showScreen(screenEl) {
  [startScreen, optionsScreen, gameScreen, friendWaitingScreen].forEach(s => {
    if (s) s.classList.add('hidden');
  });
  if (screenEl) screenEl.classList.remove('hidden');
}

function updateFriendTabs(tab) {
  friendActiveTab = tab;
  const lang = currentLanguage || 'en';
  const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

  if (tab === 'create') {
    if (tabCreateRoom) tabCreateRoom.classList.add('active');
    if (tabJoinRoom) tabJoinRoom.classList.remove('active');
    if (panelCreateRoom) panelCreateRoom.classList.remove('hidden');
    if (panelJoinRoom) panelJoinRoom.classList.add('hidden');
    if (optionsStartBtn) optionsStartBtn.innerText = t('btnCreateFriendLobby');
  } else {
    if (tabCreateRoom) tabCreateRoom.classList.remove('active');
    if (tabJoinRoom) tabJoinRoom.classList.add('active');
    if (panelCreateRoom) panelCreateRoom.classList.add('hidden');
    if (panelJoinRoom) panelJoinRoom.classList.remove('hidden');
    if (optionsStartBtn) optionsStartBtn.innerText = t('btnJoinFriendGame');
    if (roomInput) setTimeout(() => roomInput.focus(), 80);
  }
}

if (tabCreateRoom) {
  tabCreateRoom.addEventListener('click', () => updateFriendTabs('create'));
}
if (tabJoinRoom) {
  tabJoinRoom.addEventListener('click', () => updateFriendTabs('join'));
}
if (btnRegenCode) {
  btnRegenCode.addEventListener('click', () => {
    activeFriendRoomCode = generateRandomRoomCode();
    if (generatedRoomCodeInput) generatedRoomCodeInput.value = activeFriendRoomCode;
  });
}

function openOptionsMenu(mode) {
  currentMode = mode;
  myPlayerNum = 0; // Reset player role so previous guest/P2 status does not lock options
  optionsStatus.innerText = '';
  optionsStartBtn.disabled = false;

  // Re-enable options controls and remove readonly state
  chainToggle.disabled = false;
  lockingToggle.disabled = false;
  timerSelect.disabled = false;
  document.querySelectorAll('.toggle-card').forEach(card => {
    card.classList.remove('readonly');
    card.removeAttribute('title');
  });

  const lang = currentLanguage || 'en';
  const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

  // Default visibility resets
  if (nicknameGroup) nicknameGroup.classList.add('hidden');
  if (dailyLeaderboardSidebar) dailyLeaderboardSidebar.classList.add('hidden');
  if (optionsScreenLayout) optionsScreenLayout.classList.remove('with-sidebar');

  if (mode === 'same_screen') {
    selectedModeBadge.innerText = t('badgeLocalPlay');
    selectedModeTitle.innerText = t('modeSameScreenTitle');
    selectedModeSubtitle.innerText = t('modeSameScreenDesc');
    if (roomCodeGroup) {
      roomCodeGroup.classList.add('hidden');
      roomCodeGroup.style.display = 'none';
    }
    optionsStartBtn.innerText = t('btnStartSameScreen');
  } else if (mode === 'online_summoners') {
    selectedModeBadge.innerText = t('badgeMatchmaking');
    selectedModeTitle.innerText = t('modeOnlineSummonersTitle');
    selectedModeSubtitle.innerText = t('modeOnlineSummonersSub');
    if (roomCodeGroup) {
      roomCodeGroup.classList.add('hidden');
      roomCodeGroup.style.display = 'none';
    }
    optionsStartBtn.innerText = t('btnFindOpponent');
  } else if (mode === 'online_friend') {
    selectedModeBadge.innerText = t('badgePrivateDuel');
    selectedModeTitle.innerText = t('modeOnlineFriendTitle');
    selectedModeSubtitle.innerText = t('modeOnlineFriendSub');
    if (roomCodeGroup) {
      roomCodeGroup.classList.remove('hidden');
      roomCodeGroup.style.display = 'block';
    }
    if (!activeFriendRoomCode) {
      activeFriendRoomCode = generateRandomRoomCode();
    }
    if (generatedRoomCodeInput) {
      generatedRoomCodeInput.value = activeFriendRoomCode;
    }
    updateFriendTabs(friendActiveTab);
  } else if (mode === 'solo') {
    selectedModeBadge.innerText = t('badgeSoloChallenge');
    selectedModeTitle.innerText = t('modeSoloTitle');
    selectedModeSubtitle.innerText = t('modeSoloSub');
    if (roomCodeGroup) {
      roomCodeGroup.classList.add('hidden');
      roomCodeGroup.style.display = 'none';
    }
    optionsStartBtn.innerText = t('btnStartSoloBolo');
  } else if (mode === 'daily_solo') {
    selectedModeBadge.innerText = t('badgeDailyChallenge');
    selectedModeTitle.innerText = t('modeDailySoloTitle');
    selectedModeSubtitle.innerText = t('modeDailySoloSub');
    if (roomCodeGroup) {
      roomCodeGroup.classList.add('hidden');
      roomCodeGroup.style.display = 'none';
    }
    if (nicknameGroup) {
      nicknameGroup.classList.remove('hidden');
      try {
        const savedNick = localStorage.getItem('rift_summoner_nickname');
        if (savedNick && playerNicknameInput) playerNicknameInput.value = savedNick;
      } catch (e) {}
    }
    if (dailyLeaderboardSidebar) {
      dailyLeaderboardSidebar.classList.remove('hidden');
      loadAndRenderLeaderboard(leaderboardRowsList);
    }
    if (optionsScreenLayout) {
      optionsScreenLayout.classList.add('with-sidebar');
    }

    // Fixed rules for Daily Solo Challenge:
    // 2m 30s match timer, Champion Locking ON, Hex Chaining ON
    chainToggle.checked = true;
    lockingToggle.checked = true;
    chainToggle.disabled = true;
    lockingToggle.disabled = true;
    timerSelect.disabled = true;

    // Check if daily timer select option exists, if not add it
    let dailyOption = timerSelect.querySelector('option[value="150"]');
    if (!dailyOption) {
      dailyOption = document.createElement('option');
      dailyOption.value = "150";
      dailyOption.innerText = t('timer2m30s') || "2m 30s (Fixed)";
      timerSelect.appendChild(dailyOption);
    }
    timerSelect.value = "150";

    document.querySelectorAll('.toggle-card').forEach(card => {
      card.classList.add('readonly');
      card.setAttribute('title', t('dailySoloRulesFixed'));
    });

    // Check if player has already completed today's daily solo run on this device
    const todayDateKey = new Date().toISOString().slice(0, 10);
    const hasPlayedToday = localStorage.getItem(`rift_daily_completed_${todayDateKey}`);
    if (hasPlayedToday) {
      optionsStartBtn.disabled = true;
      optionsStatus.innerText = `⚠️ ${t('dailyPlayedAlready')}`;
      optionsStatus.style.color = "#facc15";
    } else {
      optionsStartBtn.innerText = t('btnStartDailySolo');
      optionsStatus.innerText = `⏳ ${t('dailyOnceWarning')}`;
      optionsStatus.style.color = "#94a3b8";
    }
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
if (btnModeDailySolo) {
  btnModeDailySolo.addEventListener('click', () => openOptionsMenu('daily_solo'));
}

if (optionsBackBtn) {
  optionsBackBtn.addEventListener('click', () => {
    socket.emit('cancelMatchmaking');
    showScreen(startScreen);
  });
}

if (btnLeaveGame) {
  btnLeaveGame.addEventListener('click', () => {
    openGameMenuModal();
  });
}

function openGameMenuModal() {
  if (gameMenuModal) {
    if (menuRestartSub) {
      if (currentMode === 'solo' || currentMode === 'same_screen') {
        menuRestartSub.innerText = "Restart match immediately with a fresh board";
      } else {
        menuRestartSub.innerText = "Vote to restart match with current opponent";
      }
    }
    gameMenuModal.classList.remove('hidden');
  }
}

function closeGameMenuModal() {
  if (gameMenuModal) {
    gameMenuModal.classList.add('hidden');
  }
}

// 1. Return to the Game
if (btnMenuResume) {
  btnMenuResume.addEventListener('click', () => {
    closeGameMenuModal();
  });
}

// 2. Restart Match
if (btnMenuRestart) {
  btnMenuRestart.addEventListener('click', () => {
    closeGameMenuModal();
    if (currentMode === 'solo' || currentMode === 'same_screen') {
      systemMsg.innerText = "Restarting match with fresh board...";
    } else {
      systemMsg.innerText = "You voted to restart the match. Waiting for opponent...";
    }
    socket.emit('requestRematch');
  });
}

// 3. Return to the Menu
if (btnMenuExit) {
  btnMenuExit.addEventListener('click', () => {
    closeGameMenuModal();
    socket.emit('leaveGame');
    gameActive = false;

    // Reset modals
    if (endgameModal) endgameModal.classList.add('hidden');
    if (bestChampsModal) bestChampsModal.classList.add('hidden');
    if (statisticsModal) statisticsModal.classList.add('hidden');
    if (btnReopenEndgame) btnReopenEndgame.classList.add('hidden');

    // Reset scoreboard displays
    if (p1Score) p1Score.innerText = '0';
    if (p2Score) p2Score.innerText = '0';
    if (soloHexCount) soloHexCount.innerText = '0/37';
    if (soloPoints) soloPoints.innerText = '0';
    if (soloComboLbl) soloComboLbl.innerText = 'PTS';

    // Reset UI state
    if (activeRoomDisplay) activeRoomDisplay.innerText = '----';
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
  });
}

// Close when clicking modal backdrop
if (gameMenuModal) {
  gameMenuModal.addEventListener('click', (e) => {
    if (e.target === gameMenuModal) {
      closeGameMenuModal();
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
    let code = '';
    if (friendActiveTab === 'create') {
      code = (generatedRoomCodeInput.value || activeFriendRoomCode).trim().toUpperCase();
      if (!code) {
        code = generateRandomRoomCode();
        activeFriendRoomCode = code;
        if (generatedRoomCodeInput) generatedRoomCodeInput.value = code;
      }
    } else {
      code = roomInput.value.trim().toUpperCase();
      if (!code) {
        optionsStatus.innerText = "Please enter a Room Code to join your friend!";
        optionsStatus.style.color = "#ef4444";
        roomInput.focus();
        return;
      }
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

  if (currentMode === 'daily_solo') {
    const todayDateKey = new Date().toISOString().slice(0, 10);
    const hasPlayedToday = localStorage.getItem(`rift_daily_completed_${todayDateKey}`);
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

    if (hasPlayedToday) {
      optionsStartBtn.disabled = true;
      optionsStatus.innerText = `⚠️ ${t('dailyPlayedAlready')}`;
      optionsStatus.style.color = "#facc15";
      return;
    }

    const nick = (playerNicknameInput && playerNicknameInput.value.trim()) || 'Summoner';
    try {
      localStorage.setItem('rift_summoner_nickname', nick);
    } catch (e) {}

    const dailyRoom = 'DAILY-' + todayDateKey + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    optionsStartBtn.disabled = true;
    socket.emit('joinRoom', {
      roomCode: dailyRoom,
      settings: {
        chainingEnabled: true,
        championLocking: true,
        roundDuration: 150
      },
      mode: 'daily_solo'
    });
    return;
  }
}

// Daily Leaderboard Fetch & Render
async function fetchDailyLeaderboard(dateStr = '') {
  try {
    const query = dateStr ? `?date=${encodeURIComponent(dateStr)}` : '';
    const res = await fetch(`/api/leaderboard/daily${query}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error('Failed to fetch daily leaderboard:', err);
  }
  return { date: '', leaderboard: [] };
}

async function loadAndRenderLeaderboard(targetContainer) {
  if (!targetContainer) return;
  targetContainer.innerHTML = '<div class="leaderboard-empty">Loading scores...</div>';
  const data = await fetchDailyLeaderboard();
  renderLeaderboardRows(targetContainer, data.leaderboard || []);
  if (leaderboardCurrentDate) {
    leaderboardCurrentDate.innerText = data.date || 'TODAY';
  }
  if (modalLeaderboardDate) {
    modalLeaderboardDate.innerText = (data.date || 'TODAY') + ' • TOP WORLDWIDE PLAYERS';
  }
}

function formatLeaderboardTime(seconds) {
  if (!seconds || seconds <= 0) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function renderLeaderboardRows(container, rows) {
  if (!container) return;
  if (!rows || rows.length === 0) {
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';
    container.innerHTML = `<div class="leaderboard-empty">${t('leaderboardEmpty')}</div>`;
    return;
  }

  container.innerHTML = rows.map((entry, idx) => {
    const rank = idx + 1;
    let rankBadge = `${rank}`;
    if (rank === 1) rankBadge = '🥇 1';
    else if (rank === 2) rankBadge = '🥈 2';
    else if (rank === 3) rankBadge = '🥉 3';

    return `
      <div class="leaderboard-row rank-${rank}">
        <span class="col-rank">${rankBadge}</span>
        <span class="col-summoner" title="${escapeHtml(entry.nickname || 'Summoner')}">${escapeHtml(entry.nickname || 'Summoner')}</span>
        <span class="col-score">${entry.score} pts</span>
        <span class="col-time">${formatLeaderboardTime(entry.timeSeconds)}</span>
      </div>
    `;
  }).join('');
}

function openLeaderboardModal() {
  if (leaderboardModal) {
    leaderboardModal.classList.remove('hidden');
    loadAndRenderLeaderboard(modalLeaderboardRows);
  }
}

function closeLeaderboardModal() {
  if (leaderboardModal) {
    leaderboardModal.classList.add('hidden');
  }
}

if (btnCloseLeaderboard) {
  btnCloseLeaderboard.addEventListener('click', closeLeaderboardModal);
}
if (leaderboardModal) {
  leaderboardModal.addEventListener('click', (e) => {
    if (e.target === leaderboardModal) closeLeaderboardModal();
  });
}
if (btnEndgameLeaderboard) {
  btnEndgameLeaderboard.addEventListener('click', openLeaderboardModal);
}

// Intermediate Friend Waiting Room / Lobby Handlers
function showFriendWaitingScreen(roomCode, settings) {
  showScreen(friendWaitingScreen);
  if (waitingDisplayCode) {
    waitingDisplayCode.innerText = roomCode;
  }
  if (waitingRulesSummary && settings) {
    const timerText = settings.roundDuration === 0 ? 'Unlimited' : `${settings.roundDuration}s`;
    waitingRulesSummary.innerText = `Rules: Chaining: ${settings.chainingEnabled ? 'ON' : 'OFF'} | Locking: ${settings.championLocking ? 'ON' : 'OFF'} | Timer: ${timerText}`;
  }
  if (shareCopyToast) {
    shareCopyToast.classList.add('hidden');
  }
}

function getDirectJoinUrl(roomCode) {
  const url = new URL(window.location.href);
  url.searchParams.set('room', roomCode);
  return url.toString();
}

if (btnCopyRoomCode) {
  btnCopyRoomCode.addEventListener('click', () => {
    const code = (waitingDisplayCode && waitingDisplayCode.innerText) || activeFriendRoomCode;
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        if (shareCopyToast) {
          const lang = currentLanguage || 'en';
          const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';
          shareCopyToast.innerText = t('codeCopiedToast') || "Room code copied to clipboard!";
          shareCopyToast.classList.remove('hidden');
          setTimeout(() => shareCopyToast.classList.add('hidden'), 2500);
        }
      });
    }
  });
}

if (btnShareInviteLink) {
  btnShareInviteLink.addEventListener('click', () => {
    const code = (waitingDisplayCode && waitingDisplayCode.innerText) || activeFriendRoomCode;
    const directUrl = getDirectJoinUrl(code);
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

    if (navigator.share) {
      navigator.share({
        title: 'Duel me in Rift Possession!',
        text: `Join my Rift Possession match using Room Code: ${code}`,
        url: directUrl
      }).catch(() => {
        // Fallback to clipboard if share cancelled/unsupported
        copyInviteLinkToClipboard(directUrl, t);
      });
    } else {
      copyInviteLinkToClipboard(directUrl, t);
    }
  });
}

function copyInviteLinkToClipboard(directUrl, t) {
  navigator.clipboard.writeText(directUrl).then(() => {
    if (shareCopyToast) {
      shareCopyToast.innerText = t('inviteLinkCopiedToast') || "Invite link copied to clipboard!";
      shareCopyToast.classList.remove('hidden');
      setTimeout(() => shareCopyToast.classList.add('hidden'), 3000);
    }
  });
}

if (waitingCancelBtn) {
  waitingCancelBtn.addEventListener('click', () => {
    socket.emit('leaveGame');
    showScreen(startScreen);
  });
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
  if (mode === 'solo' || mode === 'daily_solo') {
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
  isSpectatorMode = Boolean(data.isSpectator);
  currentPlayer = data.currentPlayer;
  boardState = data.board;
  chainToggle.checked = data.chainingEnabled;
  lockingToggle.checked = data.championLocking;
  timerSelect.value = data.roundDuration;
  championPool = data.championPool || [];
  usedChampions = data.usedChampions || [];
  if (data.mode) currentMode = data.mode;
  sessionStartTime = Date.now();

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
  updateSelectedDisplay();
  hideSuggestions();

  // Hide end game modals and reset rematch button
  if (endgameModal) endgameModal.classList.add('hidden');
  if (bestChampsModal) bestChampsModal.classList.add('hidden');
  if (statisticsModal) statisticsModal.classList.add('hidden');
  if (gameMenuModal) gameMenuModal.classList.add('hidden');
  if (menuRestartBadge) menuRestartBadge.classList.add('hidden');
  if (btnReopenEndgame) btnReopenEndgame.classList.add('hidden');
  if (rematchStatusBanner) rematchStatusBanner.classList.add('hidden');
  if (btnEndgameRematch) {
    btnEndgameRematch.disabled = false;
    if (rematchSubLabel) rematchSubLabel.innerText = "Play again with current rules (Both players must accept)";
  }

  applyControlPermissions();

  const code = data.roomCode || (data.mode ? data.mode.toUpperCase() : 'GAME');

  // If this is Online with a Friend and Player 2 has NOT joined yet (game not started), only show waiting screen to Host (Player 1)
  if (currentMode === 'friend' && myPlayerNum === 1 && !data.gameStarted) {
    showFriendWaitingScreen(code, {
      chainingEnabled: data.chainingEnabled,
      championLocking: data.championLocking,
      roundDuration: data.roundDuration
    });
    return;
  }

  showGameScreen(code, currentMode);

  if (isSpectatorMode) {
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';
    systemMsg.innerText = `👁️ ${t('spectatorStatus') || "Spectating match (View-Only)"}`;
  } else if (currentMode === 'daily_solo') {
    systemMsg.innerText = "Daily Solo Challenge active! Capture all 37 hexes to register your score on the leaderboard.";
  } else if (currentMode === 'solo') {
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

  // Ensure friend waiting screen is hidden and game screen is shown
  const activeCode = (activeRoomDisplay && activeRoomDisplay.innerText !== '----') ? activeRoomDisplay.innerText : activeFriendRoomCode;
  showGameScreen(activeCode, currentMode);
  renderBoard(boardState);

  chainToggle.checked = chainingEnabled;
  lockingToggle.checked = championLocking;
  timerSelect.value = roundDuration;

  applyControlPermissions();
  updateTurnDisplay();
  
  const timerText = roundDuration === 0 ? 'Unlimited' : `${roundDuration}s`;
  if (isSpectatorMode) {
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';
    systemMsg.innerText = `👁️ ${t('spectatorStatus') || "Spectating match (View-Only)"}`;
  } else if (currentMode === 'daily_solo') {
    systemMsg.innerText = `Daily Challenge active! Capture all 37 hexes! (Timer: ${timerText})`;
  } else if (currentMode === 'solo') {
    systemMsg.innerText = `Solo-Bolo: Capture all 37 hexes! Hex re-claims yield combo points. (Timer: ${timerText})`;
  } else {
    systemMsg.innerText = `Match Started! Mode: ${chainingEnabled ? 'Chain ON' : 'Chain OFF'} | Locking: ${championLocking ? 'ON' : 'OFF'} | Timer: ${timerText}`;
  }
});

// Timer Bar & Numeric Display Handler
socket.on('timerUpdate', ({ timeLeft, totalDuration, elapsedTime }) => {
  if (totalDuration === 0) {
    // Unlimited Mode: players have unlimited time, timer counts up elapsed time!
    timerProgress.classList.add('unlimited');
    if (timerNumeric) {
      timerNumeric.classList.add('unlimited');
      timerNumeric.classList.remove('danger');
      const elapsed = elapsedTime !== undefined ? elapsedTime : 0;
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      timerNumeric.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  } else {
    timerProgress.classList.remove('unlimited');
    timerProgress.style.width = `${(timeLeft / totalDuration) * 100}%`;
    if (timerNumeric) {
      timerNumeric.classList.remove('unlimited');
      if (timeLeft <= 10) {
        timerNumeric.classList.add('danger');
      } else {
        timerNumeric.classList.remove('danger');
      }
      if (totalDuration > 60) {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerNumeric.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      } else {
        timerNumeric.innerText = `${timeLeft}s`;
      }
    }
  }
});

// 3. Board Rendering
function renderBoard(board) {
  hexGrid.innerHTML = '';
  const pointsStr = createHexPoints(HEX_RADIUS - 2);

  board.forEach(tile => {
    const { x, y } = hexToPixel(tile.q, tile.r);

    let soloTierClass = '';
    if ((currentMode === 'solo' || currentMode === 'daily_solo') && tile.owner === 1 && tile.claimedChampions && tile.claimedChampions.length > 0) {
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
    const translatedName = getTranslatedCriterion(name);
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

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
      } else if (type === 'skin-sparkle') {
        // Sparkle / Star icon for Skin Sets
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        star.setAttribute('d', 'M0 -9 L2.5 -2.5 L9 0 L2.5 2.5 L0 9 L-2.5 2.5 L-9 0 L-2.5 -2.5 Z');
        star.setAttribute('fill', '#f472b6');
        star.setAttribute('stroke', '#fda4af');
        star.setAttribute('stroke-width', '1');
        const spark1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        spark1.setAttribute('cx', '7');
        spark1.setAttribute('cy', '-6');
        spark1.setAttribute('r', '1.4');
        spark1.setAttribute('fill', '#fef08a');
        const spark2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        spark2.setAttribute('cx', '-7');
        spark2.setAttribute('cy', '6');
        spark2.setAttribute('r', '1.4');
        spark2.setAttribute('fill', '#fef08a');
        iconGroup.appendChild(star);
        iconGroup.appendChild(spark1);
        iconGroup.appendChild(spark2);
      } else {
        // Generic game-asset image icon (species-*, custom mech-*, skin-* use SVG, legacy use PNG)
        const isSvg = type.startsWith('species-') || 
                      type.startsWith('skin-') || 
                      ['mech-true-damage', 'mech-fear', 'mech-silence', 'mech-charm', 'mech-taunt', 'mech-suppression', 'mech-blind', 'mech-revive', 'mech-global-ult', 'mech-stealth'].includes(type);
        const folder = type.startsWith('skin-') ? 'skins' : 'icons';
        const ext = isSvg ? 'svg' : 'png';
        const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttribute('href', `assets/${folder}/${type}.${ext}`);
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
      if (translatedName.length > 9) {
        textName.setAttribute('style', 'font-size: 8.5px;');
      }
      textName.textContent = translatedName;
      inner.appendChild(textName);
    } else if (cat === 'YEAR') {
      const parts = translatedName.split(' ');
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
      if (translatedName.length > 10) {
        textName.setAttribute('style', 'font-size: 8.5px;');
      }
      textName.textContent = translatedName;
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
      textName.textContent = translatedName;
      inner.appendChild(textName);
    } else if (cat === 'ROLE') {
      const roleSlug = name.toLowerCase();
      const iconEl = createIconElement(`role-${roleSlug}`, 26);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      if (translatedName.length > 9) {
        textName.setAttribute('style', 'font-size: 8.5px;');
      }
      textName.textContent = translatedName;
      inner.appendChild(textName);
    } else if (cat === 'RANGE') {
      const rangeType = name === 'Melee' ? 'range-melee' : 'range-ranged';
      const iconEl = createIconElement(rangeType, 24);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      if (translatedName.length > 9) {
        textName.setAttribute('style', 'font-size: 8.5px;');
      }
      textName.textContent = translatedName;
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
        'Global Ult': 'mech-global-ult',
        'Fear': 'mech-fear',
        'Silence': 'mech-silence',
        'Charm': 'mech-charm',
        'Taunt': 'mech-taunt',
        'Suppression': 'mech-suppression',
        'Blind': 'mech-blind',
        'Revive': 'mech-revive'
      };
      const iconType = mechSlugMap[name] || 'mech-knockup';
      const iconEl = createIconElement(iconType, 24);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub');
      textName.setAttribute('y', 15);
      if (translatedName.length > 10) {
        textName.setAttribute('style', 'font-size: 8px;');
      } else if (translatedName.length > 7) {
        textName.setAttribute('style', 'font-size: 8.5px;');
      }
      textName.textContent = translatedName;
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
      if (translatedName.length > 12) {
        textName.setAttribute('style', 'font-size: 7.5px;');
      } else if (translatedName.length > 8) {
        textName.setAttribute('style', 'font-size: 8.5px;');
      }
      textName.textContent = translatedName;
      inner.appendChild(textName);
    } else if (cat === 'SKIN') {
      let slugName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (slugName === 'k-da') slugName = 'kda';
      const skinSlug = 'skin-' + slugName;
      const iconEl = createIconElement(skinSlug, 25);
      iconEl.setAttribute('transform', 'translate(0, -11)');
      inner.appendChild(iconEl);

      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-sub hex-skin-name');
      textName.setAttribute('y', 13);
      if (translatedName.length > 12) {
        textName.setAttribute('style', 'font-size: 7.5px;');
      } else if (translatedName.length > 9) {
        textName.setAttribute('style', 'font-size: 8.2px;');
      }
      textName.textContent = translatedName;
      inner.appendChild(textName);

      const textSkinTag = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textSkinTag.setAttribute('class', 'hex-skin-tag');
      textSkinTag.setAttribute('y', 23);
      textSkinTag.textContent = t('skinTag') || 'Skins';
      inner.appendChild(textSkinTag);
    } else {
      // Fallback for any other category
      const textName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textName.setAttribute('class', 'hex-text-name hex-text-centered');
      textName.setAttribute('y', 4);
      if (translatedName.length > 10) {
        textName.setAttribute('style', 'font-size: 8.5px;');
      }
      textName.textContent = translatedName;
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
  if (isSpectatorMode) {
    systemMsg.innerText = "You are spectating this match (View-Only).";
    return;
  }
  // In same_screen mode, player order alternates locally on the same device
  if (currentMode !== 'same_screen' && currentMode !== 'solo' && currentMode !== 'daily_solo' && myPlayerNum !== currentPlayer) {
    systemMsg.innerText = "It is not your turn!";
    return;
  }
  // When a hex is captured in 2-player modes, it is not open to writing a champion name; only unclaimed hexes are suitable
  if (currentMode !== 'solo' && currentMode !== 'daily_solo' && tile.owner !== 0) {
    systemMsg.innerText = "This hex is already claimed!";
    return;
  }

  document.querySelectorAll('.hex-tile').forEach(el => el.classList.remove('selected'));
  const targetEl = document.getElementById(tile.id);
  if (targetEl) targetEl.classList.add('selected');

  selectedHexId = tile.id;
  updateSelectedDisplay();
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
  let query = (rawInput || '').trim();
  if (!query) return '';
  if (query.toLowerCase() === 'rhaast') query = 'Kayn';

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
  const isInputAllowed = (currentMode === 'same_screen' || currentMode === 'solo' || currentMode === 'daily_solo' || myPlayerNum === currentPlayer);
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
  selectedHexId = null;
  updateSelectedDisplay();

  if (data.mode === 'solo' || currentMode === 'daily_solo') {
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

function getChampionIconUrl(name) {
  if (!name) return '';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `assets/champions/${slug}.png`;
}

function applyCaptureStyle(hexId, playerNum, champName, claimCount) {
  const el = document.getElementById(hexId);
  if (!el) return;

  el.classList.remove('owner-0', 'owner-1', 'owner-2', 'selected');
  el.classList.add(`owner-${playerNum}`, 'anim-capture');

  // Multi-claim blue tone progression for Solo-Bolo & Daily Solo mode
  if ((currentMode === 'solo' || currentMode === 'daily_solo') && playerNum === 1) {
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

  // Add brief floating champion name and picture that disappear after animation
  const inner = el.querySelector('.hex-inner');
  if (inner && champName) {
    // Remove any previous temporary popup if exists
    const existing = inner.querySelector('.hex-capture-badge');
    if (existing) existing.remove();

    const badgeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    badgeGroup.setAttribute('class', 'hex-capture-badge');

    // Champion portrait image directly below name
    const imgSize = 24;
    const champImg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    champImg.setAttribute('href', getChampionIconUrl(champName));
    champImg.setAttribute('x', -imgSize / 2);
    champImg.setAttribute('y', 0);
    champImg.setAttribute('width', imgSize);
    champImg.setAttribute('height', imgSize);
    champImg.setAttribute('class', 'hex-claimed-img');

    // Border ring for portrait
    const imgBorder = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    imgBorder.setAttribute('x', -imgSize / 2 - 1);
    imgBorder.setAttribute('y', -1);
    imgBorder.setAttribute('width', imgSize + 2);
    imgBorder.setAttribute('height', imgSize + 2);
    imgBorder.setAttribute('rx', 4);
    imgBorder.setAttribute('class', 'hex-claimed-border');

    // Champion name positioned above the picture
    const champLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    champLabel.setAttribute('class', 'hex-claimed-champ');
    champLabel.setAttribute('y', -4);
    champLabel.textContent = champName;

    badgeGroup.appendChild(imgBorder);
    badgeGroup.appendChild(champImg);
    badgeGroup.appendChild(champLabel);
    inner.appendChild(badgeGroup);

    // Remove element after fadeout completes (2200ms)
    setTimeout(() => {
      badgeGroup.remove();
    }, 2300);
  }

  setTimeout(() => {
    el.classList.remove('anim-capture');
  }, 500);
}

// 5. Hex Rejection Shake Animation
socket.on('hexVibrate', ({ hexId, reason, playerNum, penalty }) => {
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

  if ((currentMode === 'solo' || currentMode === 'daily_solo') && penalty) {
    if (soloPoints) soloPoints.innerText = penalty.totalPoints;
    if (soloComboLbl) soloComboLbl.innerText = `-${penalty.penaltyPoints} PTS (Mistake #${penalty.mistakeCount})`;
    systemMsg.innerText = `${reason} (Penalty: -${penalty.penaltyPoints} pts)`;
  } else {
    systemMsg.innerText = reason;
  }
});

// 6. Turn Lifecycle
socket.on('turnPass', ({ reason, currentPlayer: nextPlayer }) => {
  currentPlayer = nextPlayer;
  updateTurnDisplay();
  if (reason) systemMsg.innerText = reason;

  hideSuggestions();
  document.querySelectorAll('.hex-tile').forEach(el => el.classList.remove('selected'));
  selectedHexId = null;
  updateSelectedDisplay();

  champInput.value = '';
  // In same_screen, solo, and daily_solo (unless spectator), local player can take turn
  const isInputAllowed = !isSpectatorMode && (currentMode === 'same_screen' || currentMode === 'solo' || currentMode === 'daily_solo' || myPlayerNum === currentPlayer);
  champInput.disabled = !isInputAllowed;
  if (submitBtn) submitBtn.disabled = !isInputAllowed;
});

function updateTurnDisplay() {
  if (isSpectatorMode) {
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';
    turnAnnounce.innerText = t('spectatorStatus') || "SPECTATING MATCH";
    turnAnnounce.style.color = "#c084fc";
    return;
  }

  if (currentMode === 'daily_solo') {
    turnAnnounce.innerText = "DAILY SOLO CHALLENGE";
    turnAnnounce.style.color = "#facc15";
    return;
  }

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

socket.on('gameOver', (data) => {
  gameActive = false;
  lastGameOverData = data;
  lastOptimalChampions = data.optimalChampions || [];

  const { winner, p1Score: finalP1, p2Score: finalP2, mode, soloPoints: finalSolo, message, chainingEnabled, stats } = data;
  const activeGameMode = mode || currentMode;

  if (activeGameMode === 'solo' || activeGameMode === 'daily_solo') {
    turnAnnounce.innerText = "CHALLENGE COMPLETED!";
    turnAnnounce.style.color = '#facc15';
    const finalScore = finalSolo || (soloPoints ? parseInt(soloPoints.innerText, 10) : 0);
    systemMsg.innerText = message || `All 37 Hexes Captured! Final Score: ${finalScore} Points!`;

    // If Daily Solo Challenge, submit score to the daily leaderboard and mark daily completion
    if (activeGameMode === 'daily_solo') {
      const todayDateKey = new Date().toISOString().slice(0, 10);
      try {
        localStorage.setItem(`rift_daily_completed_${todayDateKey}`, JSON.stringify({
          score: finalScore,
          timestamp: Date.now()
        }));
      } catch (e) {}

      const nick = (playerNicknameInput && playerNicknameInput.value.trim()) || 
                   localStorage.getItem('rift_summoner_nickname') || 
                   'Summoner';
      const timeSpent = sessionStartTime ? Math.round((Date.now() - sessionStartTime) / 1000) : 0;
      fetch('/api/leaderboard/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nick,
          score: finalScore,
          timeSeconds: timeSpent,
          date: todayDateKey
        })
      }).then(() => {
        // Refresh leaderboard caches in sidebar and modal
        if (dailyLeaderboardSidebar && !dailyLeaderboardSidebar.classList.contains('hidden')) {
          loadAndRenderLeaderboard(leaderboardRowsList);
        }
      }).catch(err => console.error('Failed to submit daily score:', err));
    }
  } else {
    const winnerText = winner === 0 ? "GAME OVER: DRAW!" : (winner === 1 ? "BLUE SIDE WINS!" : "RED SIDE WINS!");
    turnAnnounce.innerText = winnerText;
    turnAnnounce.style.color = '#facc15';
    systemMsg.innerText = `Final Score: Blue Side [${finalP1}] - Red Side [${finalP2}]`;
  }

  champInput.disabled = true;
  if (submitBtn) submitBtn.disabled = true;

  // Open the End Game Options screen for ALL game modes (Online Summoners, Friend, Same Screen, Solo-Bolo)
  // With 1-second delay so players can see the final board capture & announcement first
  setTimeout(() => {
    openEndgameModal(data);
  }, 1000);
});

let lastRematchStatus = null;

function openEndgameModal(data) {
  if (!endgameModal) return;

  const mode = data.mode || currentMode;
  const isSolo = (mode === 'solo' || mode === 'daily_solo');
  const isSameScreen = mode === 'same_screen';
  const lang = currentLanguage || 'en';
  const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

  if (isSolo) {
    // Solo-Bolo mode presentation
    if (endgameBadge) {
      endgameBadge.innerText = t('endgameChallengeCompleted');
      endgameBadge.style.color = "#facc15";
    }
    if (endgameTitle) endgameTitle.innerText = t('endgameRiftCleared');
    if (endgameSubtitle) endgameSubtitle.innerText = t('endgameSoloSubtitle');

    if (endgameScoreSummary) endgameScoreSummary.classList.add('hidden');
    if (endgameSoloSummary) {
      endgameSoloSummary.classList.remove('hidden');
      if (endgameSoloScore) endgameSoloScore.innerText = data.soloPoints || (soloPoints ? soloPoints.innerText : 0);
      if (endgameSoloHexes) endgameSoloHexes.innerText = "37/37";
    }

    if (btnEndgameRematch) {
      if (mode === 'daily_solo') {
        btnEndgameRematch.disabled = true;
        if (rematchSubLabel) rematchSubLabel.innerText = t('dailyPlayedAlready') || "Daily mode can only be played once per day";
      } else {
        btnEndgameRematch.disabled = false;
        if (rematchSubLabel) rematchSubLabel.innerText = t('endgameRematchSubSolo');
      }
    }
  } else {
    // 2-Player modes (Online Summoners, Friend, Same Screen)
    if (endgameScoreSummary) endgameScoreSummary.classList.remove('hidden');
    if (endgameSoloSummary) endgameSoloSummary.classList.add('hidden');

    const winner = data.winner;
    const p1 = data.p1Score !== undefined ? data.p1Score : (p1Score ? p1Score.innerText : 0);
    const p2 = data.p2Score !== undefined ? data.p2Score : (p2Score ? p2Score.innerText : 0);

    if (endgameP1Score) endgameP1Score.innerText = p1;
    if (endgameP2Score) endgameP2Score.innerText = p2;

    if (isSameScreen) {
      if (endgameTitle) endgameTitle.innerText = t('endgameDuelFinished');
      if (endgameSubtitle) endgameSubtitle.innerText = t('endgameSameScreenSubtitle');
      if (endgameBadge) {
        endgameBadge.innerText = winner === 0 ? t('endgameDraw') : (winner === 1 ? t('endgameBlueSideWins') : t('endgameRedSideWins'));
        endgameBadge.style.color = winner === 1 ? "#38bdf8" : (winner === 2 ? "#f43f5e" : "#facc15");
      }
      if (btnEndgameRematch) {
        btnEndgameRematch.disabled = false;
        if (rematchSubLabel) rematchSubLabel.innerText = t('endgameRematchSubSameScreen');
      }
    } else {
      if (endgameTitle) endgameTitle.innerText = t('endgameMatchCompleted');
      if (endgameSubtitle) endgameSubtitle.innerText = t('endgameChooseNextStep');
      if (winner === myPlayerNum) {
        endgameBadge.innerText = t('endgameVictory');
        endgameBadge.style.color = "#4ade80";
      } else if (winner === 0) {
        endgameBadge.innerText = t('endgameDraw');
        endgameBadge.style.color = "#facc15";
      } else {
        endgameBadge.innerText = t('endgameDefeat');
        endgameBadge.style.color = "#f43f5e";
      }
      if (btnEndgameRematch) {
        btnEndgameRematch.disabled = false;
        if (rematchSubLabel) rematchSubLabel.innerText = t('endgameRematchSub');
      }
    }
  }

  // Update rule note on best champions
  const chainingActive = data.chainingEnabled !== undefined ? data.chainingEnabled : chainToggle.checked;
  const chainStateWord = chainingActive ? 'ON' : 'OFF';
  if (bestChampsSubLabel) {
    bestChampsSubLabel.innerText = t('endgameBestChampsSubRules').replace('{chaining}', chainStateWord);
  }
  if (bestChampsRulesNote) {
    const chainDesc = chainingActive ? t('bestChampsChainingOn') : t('bestChampsChainingOff');
    bestChampsRulesNote.innerText = t('bestChampsRulesNote').replace('{chaining}', chainDesc);
  }

  if (lastRematchStatus) {
    updateRematchUI(lastRematchStatus);
  } else if (rematchStatusBanner) {
    rematchStatusBanner.classList.add('hidden');
  }

  // Show modal and enable the persistent "MATCH OPTIONS" reopen button in header
  endgameModal.classList.remove('hidden');
  if (btnReopenEndgame) btnReopenEndgame.classList.remove('hidden');

  // If this was Daily Solo Challenge, automatically present the Daily Leaderboard modal to show final rankings
  if (mode === 'daily_solo') {
    setTimeout(() => {
      openLeaderboardModal();
    }, 700);
  }
}

// Reopen End Game Options Screen Button (top right header)
if (btnReopenEndgame) {
  btnReopenEndgame.addEventListener('click', () => {
    if (lastGameOverData) {
      endgameModal.classList.remove('hidden');
    }
  });
}

function updateRematchUI(status) {
  if (!status) return;
  lastRematchStatus = status;
  const { votedPlayerNums, needed } = status;
  const hasVoted = votedPlayerNums.includes(myPlayerNum);
  const votesCount = votedPlayerNums.length;
  const lang = currentLanguage || 'en';
  const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

  // 1. Post-game Rematch banner & button sub-label
  if (rematchStatusBanner) {
    rematchStatusBanner.classList.remove('hidden');
    if (hasVoted) {
      if (rematchStatusText) {
        rematchStatusText.innerText = t('endgameRematchYouVoted')
          .replace('{votes}', votesCount)
          .replace('{needed}', needed);
      }
      if (btnEndgameRematch) btnEndgameRematch.disabled = true;
      if (rematchSubLabel) rematchSubLabel.innerText = t('endgameRematchRequestedWait');
    } else {
      if (rematchStatusText) {
        rematchStatusText.innerText = t('endgameRematchOpponentWants')
          .replace('{votes}', votesCount)
          .replace('{needed}', needed);
      }
    }
  }

  // 2. In-game Menu restart badge & live system announcement
  if (gameActive && needed > 1) {
    if (!hasVoted && votesCount > 0) {
      if (menuRestartBadge) menuRestartBadge.classList.remove('hidden');
      systemMsg.innerText = "Opponent wants to restart the game! Open MENU to accept.";
    } else if (hasVoted && votesCount < needed) {
      if (menuRestartBadge) menuRestartBadge.classList.add('hidden');
      systemMsg.innerText = `Restart vote registered. Waiting for opponent... (${votesCount}/${needed})`;
    } else {
      if (menuRestartBadge) menuRestartBadge.classList.add('hidden');
    }
  }
}

// 1. Rematch Option Action
if (btnEndgameRematch) {
  btnEndgameRematch.addEventListener('click', () => {
    socket.emit('requestRematch');
    btnEndgameRematch.disabled = true;
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';
    if (rematchSubLabel) rematchSubLabel.innerText = t('endgameRematchRequestedWait');
    if (rematchStatusBanner) {
      rematchStatusBanner.classList.remove('hidden');
      if (rematchStatusText) {
        rematchStatusText.innerText = t('endgameRematchYouVoted').replace('{votes}', 1).replace('{needed}', 2);
      }
    }
  });
}

// Listen for rematch status updates from server
socket.on('rematchStatusUpdate', (status) => {
  updateRematchUI(status);
});

// 2. Best Champions Option Action
if (btnEndgameBestChamps) {
  btnEndgameBestChamps.addEventListener('click', () => {
    renderBestChampionsList();
    bestChampsModal.classList.remove('hidden');
  });
}

if (btnCloseBestChamps) {
  btnCloseBestChamps.addEventListener('click', () => {
    bestChampsModal.classList.add('hidden');
  });
}

function renderBestChampionsList(filterQuery = '') {
  if (!bestChampsList) return;
  bestChampsList.innerHTML = '';

  const lang = currentLanguage || 'en';
  const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

  const query = (filterQuery || '').trim().toLowerCase();
  const listToRender = (lastOptimalChampions || []).filter(c => 
    !query || c.name.toLowerCase().includes(query)
  );

  if (bestChampsCount) {
    bestChampsCount.innerText = t('bestChampsShowingCount')
      .replace('{count}', listToRender.length)
      .replace('{total}', (lastOptimalChampions || []).length);
  }

  if (listToRender.length === 0) {
    const emptyRow = document.createElement('div');
    emptyRow.style.padding = '20px';
    emptyRow.style.textAlign = 'center';
    emptyRow.style.color = '#94a3b8';
    emptyRow.innerText = t('bestChampsNoMatches');
    bestChampsList.appendChild(emptyRow);
    return;
  }

  listToRender.forEach((champ, idx) => {
    const row = document.createElement('div');
    row.className = 'best-champ-row';

    const rankDiv = document.createElement('div');
    rankDiv.className = 'best-champ-rank';
    rankDiv.innerText = `#${idx + 1}`;

    const imgEl = document.createElement('img');
    imgEl.className = 'best-champ-avatar';
    imgEl.src = getChampionIconUrl(champ.name);
    imgEl.alt = champ.name;
    imgEl.onerror = () => { imgEl.style.display = 'none'; };

    const infoDiv = document.createElement('div');
    infoDiv.className = 'best-champ-info';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'best-champ-name';
    nameSpan.innerText = champ.name;

    const critSpan = document.createElement('span');
    critSpan.className = 'best-champ-criteria';
    const localizedBestHex = champ.bestHexCriteria ? getTranslatedCriterion(champ.bestHexCriteria) : '';
    const criteriaSummary = champ.bestHexCriteria 
      ? t('bestChampsBestPlacement').replace('{crit}', localizedBestHex).replace('{count}', champ.totalBoardMatches)
      : t('bestChampsMatchesBoard').replace('{count}', champ.totalBoardMatches);
    critSpan.innerText = criteriaSummary;

    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(critSpan);

    const badgeDiv = document.createElement('div');
    badgeDiv.className = 'best-champ-stats-badge';

    const claimSpan = document.createElement('span');
    claimSpan.className = 'claim-potential';
    const hexWord = champ.maxSingleMoveClaim === 1 ? t('bestChampsHexSingle') : t('bestChampsHexPlural');
    claimSpan.innerText = `${champ.maxSingleMoveClaim} ${hexWord}`;

    const labelSpan = document.createElement('span');
    labelSpan.className = 'match-count';
    labelSpan.innerText = t('bestChampsMaxSingleMove');

    badgeDiv.appendChild(claimSpan);
    badgeDiv.appendChild(labelSpan);

    row.appendChild(rankDiv);
    row.appendChild(imgEl);
    row.appendChild(infoDiv);
    row.appendChild(badgeDiv);

    bestChampsList.appendChild(row);
  });
}

if (bestChampsSearch) {
  bestChampsSearch.addEventListener('input', (e) => {
    renderBestChampionsList(e.target.value);
  });
}

// 3. Statistics Option Action
if (btnEndgameStatistics) {
  btnEndgameStatistics.addEventListener('click', () => {
    renderMatchStatistics();
    statisticsModal.classList.remove('hidden');
  });
}

if (btnCloseStatistics) {
  btnCloseStatistics.addEventListener('click', () => {
    statisticsModal.classList.add('hidden');
  });
}

function formatTime(seconds) {
  const s = Math.max(0, Math.round(seconds || 0));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
}

function renderMatchStatistics() {
  const mode = (lastGameOverData && lastGameOverData.mode) ? lastGameOverData.mode : currentMode;
  const isSolo = mode === 'solo' || mode === 'daily_solo';
  const lang = currentLanguage || 'en';
  const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

  const stats = (lastGameOverData && lastGameOverData.stats) ? lastGameOverData.stats : {
    moves: [],
    playerStats: {
      1: { hexesOccupied: p1Score ? parseInt(p1Score.innerText) : 0, championsPlayed: [], hexesRetaken: 0, largestChain: 0, timeouts: 0, totalTimeSpent: 0 },
      2: { hexesOccupied: p2Score ? parseInt(p2Score.innerText) : 0, championsPlayed: [], hexesRetaken: 0, largestChain: 0, timeouts: 0, totalTimeSpent: 0 }
    }
  };

  const p1 = stats.playerStats[1] || { hexesOccupied: 0, championsPlayed: [], hexesRetaken: 0, largestChain: 0, timeouts: 0, totalTimeSpent: 0 };
  const p2 = stats.playerStats[2] || { hexesOccupied: 0, championsPlayed: [], hexesRetaken: 0, largestChain: 0, timeouts: 0, totalTimeSpent: 0 };

  const totalHexes = 37;
  const p1Territory = Math.round((p1.hexesOccupied / totalHexes) * 100);
  const p2Territory = Math.round((p2.hexesOccupied / totalHexes) * 100);

  // Helper to build champion badge chips with portraits
  function buildChampionChips(champsList) {
    if (!champsList || champsList.length === 0) return `<em>${t('selectedNone') || 'None'}</em>`;
    return `
      <div class="champs-tag-list">
        ${champsList.map(name => `
          <div class="champ-stat-tag">
            <img class="champ-stat-avatar" src="${getChampionIconUrl(name)}" alt="${name}" onerror="this.style.display='none'">
            <span>${name}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (isSolo) {
    // Solo-Bolo Statistics Display
    const finalPts = (lastGameOverData && lastGameOverData.soloPoints) ? lastGameOverData.soloPoints : (soloPoints ? soloPoints.innerText : 0);
    const avgPtsPerMove = p1.championsPlayed.length > 0 ? (finalPts / p1.championsPlayed.length).toFixed(1) : 0;

    if (statsOverviewGrid) {
      statsOverviewGrid.innerHTML = `
        <div class="side-stats-card solo-stats-card" style="grid-column: 1 / -1; border-top: 3px solid #facc15;">
          <div class="side-stats-header" style="color: #facc15;">${t('statsSoloSummaryHeader') || '👑 SOLO-BOLO PERFORMANCE SUMMARY'}</div>
          <div class="stat-item"><span class="stat-label">${t('statFinalScore') || 'Final Score'}</span><span class="stat-value" style="color: #fde047; font-size: 1.1rem;">${finalPts} ${t('statPtsWord') || 'PTS'}</span></div>
          <div class="stat-item"><span class="stat-label">${t('statBoardProgress') || 'Board Progress'}</span><span class="stat-value">${p1.hexesOccupied}/37 ${t('statClaimedFull') || 'Hexes Claimed (100%)'}</span></div>
          <div class="stat-item"><span class="stat-label">${t('statTotalTimeElapsed') || 'Total Time Elapsed'}</span><span class="stat-value" style="color: #38bdf8;">${formatTime(p1.totalTimeSpent)}</span></div>
          <div class="stat-item"><span class="stat-label">${t('statUniqueChamps') || 'Unique Champions Played'}</span><span class="stat-value">${p1.championsPlayed.length}</span></div>
          <div class="stat-item"><span class="stat-label">${t('statLargestCombo') || 'Largest Multi-Hex Combo'}</span><span class="stat-value">${p1.largestChain} ${t('statHexInOneTurn') || 'hexes in one turn'}</span></div>
          <div class="stat-item"><span class="stat-label">${t('statAvgPointsMove') || 'Average Points Per Move'}</span><span class="stat-value">${avgPtsPerMove} ${t('statPtsWord') || 'pts'}</span></div>
        </div>
      `;
    }

    if (statsChampsComparison) {
      statsChampsComparison.innerHTML = `
        <div class="champs-played-box" style="grid-column: 1 / -1;">
          <strong style="color: #facc15; display: block; margin-bottom: 6px;">${t('statSummonerRoster') || 'Summoner Champion Roster'} (${p1.championsPlayed.length} ${t('statChampsUsed') || 'Champions Used'}):</strong>
          ${buildChampionChips(p1.championsPlayed)}
        </div>
      `;
    }

    if (statsHighlights) {
      const highlights = [];
      highlights.push({
        icon: '🏆',
        title: t('hlRiftConquerorTitle') || 'Rift Conqueror',
        desc: (t('hlRiftConquerorDesc') || 'Captured all 37 hexes to amass a colossal {pts} points!').replace('{pts}', finalPts)
      });
      if (p1.largestChain > 1) {
        highlights.push({
          icon: '⚡',
          title: t('hlComboMasterTitle') || 'Combo Master',
          desc: (t('hlComboMasterDesc') || 'Chained {chain} hexes in a single decisive play!').replace('{chain}', p1.largestChain)
        });
      }
      highlights.push({
        icon: '⏱️',
        title: t('hlPacePrecisionTitle') || 'Pace & Precision',
        desc: (t('hlPacePrecisionDesc') || 'Completed the entire challenge in {time}.').replace('{time}', formatTime(p1.totalTimeSpent))
      });
      highlights.push({
        icon: '📚',
        title: t('hlLolKnowledgeTitle') || 'LoL Knowledge Depth',
        desc: (t('hlLolKnowledgeDesc') || 'Leveraged {count} distinct champion criteria matches.').replace('{count}', p1.championsPlayed.length)
      });

      statsHighlights.innerHTML = highlights.map(h => `
        <div class="highlight-badge">
          <span class="highlight-icon">${h.icon}</span>
          <div class="highlight-content">
            <span class="highlight-title">${h.title}</span>
            <span class="highlight-desc">${h.desc}</span>
          </div>
        </div>
      `).join('');
    }
    return;
  }

  // 2-Player modes (Online Summoners, Friend, Same Screen)
  const isSameScreen = mode === 'same_screen';
  const p1TitleText = isSameScreen ? (t('statPlayer1Blue') || 'PLAYER 1 (BLUE)') : (t('statBlueSide') || '🔵 BLUE SIDE');
  const p2TitleText = isSameScreen ? (t('statPlayer2Red') || 'PLAYER 2 (RED)') : (t('statRedSide') || '🔴 RED SIDE');
  const hexUnit = t('statHexWord') || 'hex(es)';

  // Render overview cards with Total Time Spent
  if (statsOverviewGrid) {
    statsOverviewGrid.innerHTML = `
      <div class="side-stats-card blue-side">
        <div class="side-stats-header">${p1TitleText}</div>
        <div class="stat-item"><span class="stat-label">${t('statHexesOccupied') || 'Hexes Occupied'}</span><span class="stat-value">${p1.hexesOccupied} (${p1Territory}%)</span></div>
        <div class="stat-item"><span class="stat-label">${t('statTotalTimeUsed') || 'Total Time Used'}</span><span class="stat-value" style="color: #38bdf8;">${formatTime(p1.totalTimeSpent)}</span></div>
        <div class="stat-item"><span class="stat-label">${t('statChampsDrafted') || 'Champions Drafted'}</span><span class="stat-value">${p1.championsPlayed.length}</span></div>
        <div class="stat-item"><span class="stat-label">${t('statTerritoryRetaken') || 'Territory Retaken'}</span><span class="stat-value">${p1.hexesRetaken} ${hexUnit}</span></div>
        <div class="stat-item"><span class="stat-label">${t('statLargestChain') || 'Largest Combo / Chain'}</span><span class="stat-value">${p1.largestChain} ${hexUnit}</span></div>
        <div class="stat-item"><span class="stat-label">${t('statTimeoutsIncurred') || 'Timeouts Incurred'}</span><span class="stat-value">${p1.timeouts || 0}</span></div>
      </div>
      <div class="side-stats-card red-side">
        <div class="side-stats-header">${p2TitleText}</div>
        <div class="stat-item"><span class="stat-label">${t('statHexesOccupied') || 'Hexes Occupied'}</span><span class="stat-value">${p2.hexesOccupied} (${p2Territory}%)</span></div>
        <div class="stat-item"><span class="stat-label">${t('statTotalTimeUsed') || 'Total Time Used'}</span><span class="stat-value" style="color: #f43f5e;">${formatTime(p2.totalTimeSpent)}</span></div>
        <div class="stat-item"><span class="stat-label">${t('statChampsDrafted') || 'Champions Drafted'}</span><span class="stat-value">${p2.championsPlayed.length}</span></div>
        <div class="stat-item"><span class="stat-label">${t('statTerritoryRetaken') || 'Territory Retaken'}</span><span class="stat-value">${p2.hexesRetaken} ${hexUnit}</span></div>
        <div class="stat-item"><span class="stat-label">${t('statLargestChain') || 'Largest Combo / Chain'}</span><span class="stat-value">${p2.largestChain} ${hexUnit}</span></div>
        <div class="stat-item"><span class="stat-label">${t('statTimeoutsIncurred') || 'Timeouts Incurred'}</span><span class="stat-value">${p2.timeouts || 0}</span></div>
      </div>
    `;
  }

  // Render written champions comparison with portraits
  if (statsChampsComparison) {
    statsChampsComparison.innerHTML = `
      <div class="champs-played-box">
        <strong style="color: #38bdf8; display: block; margin-bottom: 6px;">${p1TitleText} ${t('statPool') || 'Pool'} (${p1.championsPlayed.length}):</strong>
        ${buildChampionChips(p1.championsPlayed)}
      </div>
      <div class="champs-played-box">
        <strong style="color: #f43f5e; display: block; margin-bottom: 6px;">${p2TitleText} ${t('statPool') || 'Pool'} (${p2.championsPlayed.length}):</strong>
        ${buildChampionChips(p2.championsPlayed)}
      </div>
    `;
  }

  // Render creative tactical highlights & awards
  if (statsHighlights) {
    const highlights = [];

    // Speed / Time Efficiency award
    if (p1.totalTimeSpent > 0 && p2.totalTimeSpent > 0) {
      if (p1.totalTimeSpent < p2.totalTimeSpent) {
        highlights.push({
          icon: '⚡',
          title: (t('hlSpeedDemonTitle') || 'Speed Demon: {side}').replace('{side}', p1TitleText),
          desc: (t('hlSpeedDemonDesc') || 'Completed turns faster with {time1} total thinking time vs {time2}.')
            .replace('{time1}', formatTime(p1.totalTimeSpent))
            .replace('{time2}', formatTime(p2.totalTimeSpent))
        });
      } else if (p2.totalTimeSpent < p1.totalTimeSpent) {
        highlights.push({
          icon: '⚡',
          title: (t('hlSpeedDemonTitle') || 'Speed Demon: {side}').replace('{side}', p2TitleText),
          desc: (t('hlSpeedDemonDesc') || 'Completed turns faster with {time1} total thinking time vs {time2}.')
            .replace('{time1}', formatTime(p2.totalTimeSpent))
            .replace('{time2}', formatTime(p1.totalTimeSpent))
        });
      }
    }

    // Most aggressive reclaimer award
    if (p1.hexesRetaken > p2.hexesRetaken) {
      highlights.push({
        icon: '⚔️',
        title: (t('hlHexReclaimerTitle') || 'Hex Reclaimer: {side}').replace('{side}', p1TitleText),
        desc: (t('hlHexReclaimerDesc') || 'Stole back {retaken} occupied territory from opponent!').replace('{retaken}', p1.hexesRetaken)
      });
    } else if (p2.hexesRetaken > p1.hexesRetaken) {
      highlights.push({
        icon: '⚔️',
        title: (t('hlHexReclaimerTitle') || 'Hex Reclaimer: {side}').replace('{side}', p2TitleText),
        desc: (t('hlHexReclaimerDesc') || 'Stole back {retaken} occupied territory from opponent!').replace('{retaken}', p2.hexesRetaken)
      });
    } else if (p1.hexesRetaken > 0) {
      highlights.push({
        icon: '⚔️',
        title: t('hlEvenTurfWarTitle') || 'Even Turf War',
        desc: (t('hlEvenTurfWarDesc') || 'Both sides stole {retaken} hexes each in fierce counterplay!').replace('{retaken}', p1.hexesRetaken)
      });
    }

    // Largest chain master award
    if (p1.largestChain > p2.largestChain) {
      highlights.push({
        icon: '🌟',
        title: (t('hlChainMaestroTitle') || 'Chain Maestro: {side}').replace('{side}', p1TitleText),
        desc: (t('hlChainMaestroDesc') || 'Executed a massive {chain}-hex strike in a single move!').replace('{chain}', p1.largestChain)
      });
    } else if (p2.largestChain > p1.largestChain) {
      highlights.push({
        icon: '🌟',
        title: (t('hlChainMaestroTitle') || 'Chain Maestro: {side}').replace('{side}', p2TitleText),
        desc: (t('hlChainMaestroDesc') || 'Executed a massive {chain}-hex strike in a single move!').replace('{chain}', p2.largestChain)
      });
    } else if (p1.largestChain > 1) {
      highlights.push({
        icon: '🌟',
        title: t('hlEqualPrecisionTitle') || 'Equal Precision',
        desc: (t('hlEqualPrecisionDesc') || 'Both players matched peak moves of {chain} hexes!').replace('{chain}', p1.largestChain)
      });
    }

    // Lore / Diversity Master award
    if (p1.championsPlayed.length > p2.championsPlayed.length) {
      highlights.push({
        icon: '📜',
        title: (t('hlRosterScholarTitle') || 'Roster Scholar: {side}').replace('{side}', p1TitleText),
        desc: (t('hlRosterScholarDesc') || 'Deployed a broader roster of {count} distinct champions.').replace('{count}', p1.championsPlayed.length)
      });
    } else if (p2.championsPlayed.length > p1.championsPlayed.length) {
      highlights.push({
        icon: '📜',
        title: (t('hlRosterScholarTitle') || 'Roster Scholar: {side}').replace('{side}', p2TitleText),
        desc: (t('hlRosterScholarDesc') || 'Deployed a broader roster of {count} distinct champions.').replace('{count}', p2.championsPlayed.length)
      });
    }

    // Clock Discipline
    const p1Timeouts = p1.timeouts || 0;
    const p2Timeouts = p2.timeouts || 0;
    if (p1Timeouts === 0 && p2Timeouts === 0) {
      highlights.push({
        icon: '⏱️',
        title: t('hlClockDisciplineTitle') || 'Flawless Clock Control',
        desc: t('hlClockDisciplineDesc') || 'Zero timeouts occurred from either summoner across the match!'
      });
    } else if (p1Timeouts < p2Timeouts) {
      highlights.push({
        icon: '⏱️',
        title: (t('hlDisciplinedSummonerTitle') || 'Disciplined Summoner: {side}').replace('{side}', p1TitleText),
        desc: t('hlDisciplinedSummonerDesc') || 'Maintained clock discipline and suffered fewer timeouts.'
      });
    } else if (p2Timeouts < p1Timeouts) {
      highlights.push({
        icon: '⏱️',
        title: (t('hlDisciplinedSummonerTitle') || 'Disciplined Summoner: {side}').replace('{side}', p2TitleText),
        desc: t('hlDisciplinedSummonerDesc') || 'Maintained clock discipline and suffered fewer timeouts.'
      });
    }

    statsHighlights.innerHTML = highlights.map(h => `
      <div class="highlight-badge">
        <span class="highlight-icon">${h.icon}</span>
        <div class="highlight-content">
          <span class="highlight-title">${h.title}</span>
          <span class="highlight-desc">${h.desc}</span>
        </div>
      </div>
    `).join('');
  }
}

// 4. Review Option Action
if (btnEndgameReview) {
  btnEndgameReview.addEventListener('click', () => {
    // Hide modal so players can inspect board, territory, claims, and scores freely
    endgameModal.classList.add('hidden');
    systemMsg.innerText = "Review Mode: Inspect the board and territory. Click 'MATCH OPTIONS' in the top right to reopen the menu.";
  });
}

// 5. Share Results Action
if (btnEndgameShare) {
  btnEndgameShare.addEventListener('click', async () => {
    const lang = currentLanguage || 'en';
    const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';
    
    // Construct match summary and direct outcome link for sharing
    let shareText = '';
    let directResultUrl = window.location.origin;
    const isSolo = (lastGameOverData && (lastGameOverData.mode === 'solo' || lastGameOverData.mode === 'daily_solo')) || currentMode === 'solo' || currentMode === 'daily_solo';
    
    if (isSolo) {
      const isDaily = (lastGameOverData && lastGameOverData.mode === 'daily_solo') || currentMode === 'daily_solo';
      const modeKey = isDaily ? 'daily_solo' : 'solo';
      const modeLabel = isDaily ? (t('sharedResultDailyTitle') || 'Daily Solo Challenge') : (t('sharedResultSoloTitle') || 'Solo-Bolo Challenge');
      const score = (lastGameOverData && lastGameOverData.soloPoints) ? lastGameOverData.soloPoints : (soloPoints ? soloPoints.innerText : 0);
      const urlParams = new URLSearchParams();
      urlParams.set('result', '1');
      urlParams.set('mode', modeKey);
      urlParams.set('score', String(score));
      directResultUrl = `${window.location.origin}/?${urlParams.toString()}`;

      shareText = `⚔️ RIFT POSSESSION (${modeLabel})\n👑 Score: ${score} Points | 37/37 Hexes Cleared!\n🔗 View Result & Play: ${directResultUrl}`;
    } else {
      const p1 = (lastGameOverData && lastGameOverData.p1Score !== undefined) ? lastGameOverData.p1Score : (p1Score ? p1Score.innerText : 0);
      const p2 = (lastGameOverData && lastGameOverData.p2Score !== undefined) ? lastGameOverData.p2Score : (p2Score ? p2Score.innerText : 0);
      const winner = (lastGameOverData && lastGameOverData.winner !== undefined) ? lastGameOverData.winner : (p1 > p2 ? 1 : (p2 > p1 ? 2 : 0));
      const outcome = winner === 0 ? '🤝 DRAW' : (winner === 1 ? '🔵 BLUE SIDE WINS' : '🔴 RED SIDE WINS');

      const urlParams = new URLSearchParams();
      urlParams.set('result', '1');
      urlParams.set('mode', 'duel');
      urlParams.set('winner', String(winner));
      urlParams.set('p1', String(p1));
      urlParams.set('p2', String(p2));
      directResultUrl = `${window.location.origin}/?${urlParams.toString()}`;

      shareText = `⚔️ RIFT POSSESSION Match Results\n🏆 Outcome: ${outcome}\n🔵 Blue Side: ${p1} Hexes vs 🔴 Red Side: ${p2} Hexes\n🔗 View Outcome & Duel: ${directResultUrl}`;
    }

    let shared = false;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rift Possession Results',
          text: shareText,
          url: directResultUrl
        });
        shared = true;
      } catch (err) {
        // Fallback to clipboard if user dismissed or cancelled share sheet
      }
    }

    if (!shared) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => {
          showShareNotification(t('endgameShareCopied'));
        }).catch(() => {
          fallbackCopyText(shareText, t('endgameShareCopied'));
        });
      } else {
        fallbackCopyText(shareText, t('endgameShareCopied'));
      }
    }
  });
}

function showShareNotification(msg) {
  if (endgameShareSub) {
    const originalText = endgameShareSub.innerText;
    endgameShareSub.innerText = `✅ ${msg}`;
    endgameShareSub.style.color = '#4ade80';
    setTimeout(() => {
      endgameShareSub.innerText = originalText;
      endgameShareSub.style.color = '';
    }, 2800);
  }
}

function fallbackCopyText(text, successMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showShareNotification(successMsg);
  } catch (err) {}
  document.body.removeChild(ta);
}

// 6. Back to Menu Option Action
if (btnEndgameMenu) {
  btnEndgameMenu.addEventListener('click', () => {
    socket.emit('leaveGame');
    gameActive = false;

    // Reset modals
    if (endgameModal) endgameModal.classList.add('hidden');
    if (bestChampsModal) bestChampsModal.classList.add('hidden');
    if (statisticsModal) statisticsModal.classList.add('hidden');
    if (btnReopenEndgame) btnReopenEndgame.classList.add('hidden');

    // Reset scoreboards
    if (p1Score) p1Score.innerText = '0';
    if (p2Score) p2Score.innerText = '0';
    if (soloHexCount) soloHexCount.innerText = '0/37';
    if (soloPoints) soloPoints.innerText = '0';
    if (soloComboLbl) soloComboLbl.innerText = 'PTS';

    // Reset UI state
    if (activeRoomDisplay) activeRoomDisplay.innerText = '----';
    champInput.value = '';
    champInput.disabled = true;
    if (submitBtn) submitBtn.disabled = true;
    selectedHexId = null;
    turnAnnounce.innerText = '';
    systemMsg.innerText = '';

    // Direct player into game modes menu (start screen)
    showScreen(startScreen);
  });
}

socket.on('playerDisconnected', () => {
  systemMsg.innerText = "Opponent disconnected.";
  if (rematchStatusBanner) {
    rematchStatusBanner.classList.remove('hidden');
    if (rematchStatusText) rematchStatusText.innerText = "Opponent has left or disconnected from the match.";
  }
  if (btnEndgameRematch) btnEndgameRematch.disabled = true;
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

// ==========================================================================
// How to Play / Guide Modal Handler
// ==========================================================================
function openHowToPlayModal() {
  if (howToPlayModal) {
    howToPlayModal.classList.remove('hidden');
  }
}

function closeHowToPlayModal() {
  if (howToPlayModal) {
    howToPlayModal.classList.add('hidden');
  }
  if (chkDontShowAgain && chkDontShowAgain.checked) {
    try {
      localStorage.setItem('rift_how_to_play_dismissed', 'true');
    } catch (e) {
      // Ignore localStorage restrictions if any
    }
  }
}

if (btnHowToPlay) {
  btnHowToPlay.addEventListener('click', () => {
    openHowToPlayModal();
  });
}

if (btnCloseHowToPlay) {
  btnCloseHowToPlay.addEventListener('click', () => {
    closeHowToPlayModal();
  });
}

// Close when clicking modal backdrop
if (howToPlayModal) {
  howToPlayModal.addEventListener('click', (e) => {
    if (e.target === howToPlayModal) {
      closeHowToPlayModal();
    }
  });
}

// ==========================================================================
// Language Selector Initialization
// ==========================================================================
const langSelect = document.getElementById('lang-select');
if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
}

function openSharedResultModal(params) {
  if (!sharedResultModal) return;
  const lang = currentLanguage || 'en';
  const t = (k) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][k]) || '';

  const mode = params.get('mode') || 'duel';
  const isSolo = mode === 'solo' || mode === 'daily_solo';

  if (isSolo) {
    const isDaily = mode === 'daily_solo';
    const score = params.get('score') || '0';
    if (sharedResultBadge) sharedResultBadge.innerText = t('sharedResultModalBadge') || 'MATCH OUTCOME';
    if (sharedResultTitle) sharedResultTitle.innerText = isDaily ? (t('sharedResultDailyTitle') || 'DAILY SOLO CHALLENGE') : (t('sharedResultSoloTitle') || 'SOLO-BOLO CHALLENGE');
    if (sharedResultSubtitle) sharedResultSubtitle.innerText = isDaily ? "Today's Worldwide Challenge Result" : "Single Player High Score Run";
    if (sharedHeroIcon) sharedHeroIcon.innerText = '👑';
    if (sharedHeroHeadline) {
      sharedHeroHeadline.innerText = `${score} PTS`;
      sharedHeroHeadline.style.color = '#fde047';
    }
    if (sharedHeroDetails) sharedHeroDetails.innerText = t('sharedResultCleared') || '37/37 Hexes Cleared';
    if (sharedResultTags) {
      sharedResultTags.innerHTML = `
        <span class="shared-tag-pill">${isDaily ? 'DAILY GRID' : 'SOLO-BOLO'}</span>
        <span class="shared-tag-pill">SCORE: ${score}</span>
        <span class="shared-tag-pill">37 HEXES</span>
      `;
    }
  } else {
    const winner = parseInt(params.get('winner'), 10) || 0;
    const p1 = params.get('p1') || '0';
    const p2 = params.get('p2') || '0';

    if (sharedResultBadge) sharedResultBadge.innerText = t('sharedResultModalBadge') || 'MATCH OUTCOME';
    if (sharedResultTitle) sharedResultTitle.innerText = t('sharedResultDuelTitle') || 'RIFT DUEL';
    if (sharedResultSubtitle) sharedResultSubtitle.innerText = "2-Player Match Outcome";

    if (winner === 1) {
      if (sharedHeroIcon) sharedHeroIcon.innerText = '🔵';
      if (sharedHeroHeadline) {
        sharedHeroHeadline.innerText = t('sharedResultWinnerBlue') || 'BLUE SIDE VICTORY';
        sharedHeroHeadline.style.color = '#38bdf8';
      }
    } else if (winner === 2) {
      if (sharedHeroIcon) sharedHeroIcon.innerText = '🔴';
      if (sharedHeroHeadline) {
        sharedHeroHeadline.innerText = t('sharedResultWinnerRed') || 'RED SIDE VICTORY';
        sharedHeroHeadline.style.color = '#f43f5e';
      }
    } else {
      if (sharedHeroIcon) sharedHeroIcon.innerText = '🤝';
      if (sharedHeroHeadline) {
        sharedHeroHeadline.innerText = t('sharedResultDraw') || 'STALEMATE DRAW';
        sharedHeroHeadline.style.color = '#facc15';
      }
    }

    if (sharedHeroDetails) {
      sharedHeroDetails.innerText = `Blue Side: ${p1} Hexes  vs  Red Side: ${p2} Hexes`;
    }

    if (sharedResultTags) {
      sharedResultTags.innerHTML = `
        <span class="shared-tag-pill">BLUE: ${p1} HEXES</span>
        <span class="shared-tag-pill">RED: ${p2} HEXES</span>
      `;
    }
  }

  sharedResultModal.classList.remove('hidden');
}

function closeSharedResultModal() {
  if (sharedResultModal) sharedResultModal.classList.add('hidden');
}

if (btnCloseSharedResult) {
  btnCloseSharedResult.addEventListener('click', closeSharedResultModal);
}

if (btnSharedPlayNow) {
  btnSharedPlayNow.addEventListener('click', () => {
    closeSharedResultModal();
    // Scroll or focus on mode selection
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (sharedResultModal) {
  sharedResultModal.addEventListener('click', (e) => {
    if (e.target === sharedResultModal) closeSharedResultModal();
  });
}

// Auto-display modal and initialize language when a player arrives at the mode selection screen
window.addEventListener('DOMContentLoaded', () => {
  // Initialize saved or default language
  let savedLang = 'en';
  try {
    savedLang = localStorage.getItem('rift_lang') || 'en';
  } catch (e) {
    savedLang = 'en';
  }
  setLanguage(savedLang);

  let dismissed = false;
  try {
    dismissed = localStorage.getItem('rift_how_to_play_dismissed') === 'true';
  } catch (e) {
    dismissed = false;
  }

  if (dismissed) {
    if (howToPlayModal) howToPlayModal.classList.add('hidden');
    if (chkDontShowAgain) chkDontShowAgain.checked = true;
  } else {
    // Show pop-up explaining how to play
    openHowToPlayModal();
  }

  // Check URL parameters for direct friend room join link (e.g. ?room=RIFT84) or shared game result (?result=1)
  try {
    const urlParams = new URLSearchParams(window.location.search);

    // 1. Direct Shared Game Result Link
    if (urlParams.get('result') === '1') {
      openSharedResultModal(urlParams);
    }

    // 2. Direct Room Join Link
    const roomParam = urlParams.get('room');
    if (roomParam) {
      const cleanCode = roomParam.trim().toUpperCase();
      if (cleanCode) {
        if (roomInput) roomInput.value = cleanCode;
        openOptionsMenu('online_friend');
        updateFriendTabs('join');
        if (optionsStatus) {
          optionsStatus.innerText = `Invited to Room: ${cleanCode}. Click JOIN MATCH to start!`;
          optionsStatus.style.color = '#38bdf8';
        }
      }
    }
  } catch (err) {
    console.error('Failed to parse URL query params:', err);
  }
});