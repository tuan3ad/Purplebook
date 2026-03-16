// ---------- APP STATE ----------

export const STATE = {
  app: {
    name: "Purplebook",
    sportsbookName: "Madden SportsBook",
    subtitle: "Private Madden League Sportsbook",
    week: 4,
    seasonWeekLock: 3
  },

  rules: {
    startingBankroll: 1000,
    maxSeason: 400,
    maxWeekly: 500,
    maxParlay: 150,
    minLegs: 2,
    maxSeasonLegs: 3,
    maxWeeklyLegs: 5,
    seasonParlaysAllowed: false
  },

  currentUser: null,

  users: [
    {
      id: "tuane",
      name: "Tuane",
      team: "Buccaneers",
      bankroll: 1250,
      start: 1000,
      wagered: 150,
      openBets: 1,
      admin: true
    },
    {
      id: "des",
      name: "Des",
      team: "Jets",
      bankroll: 700,
      start: 1000,
      wagered: 300,
      openBets: 3,
      admin: false
    },
    {
      id: "romeo",
      name: "Romeo",
      team: "Falcons",
      bankroll: 900,
      start: 1000,
      wagered: 100,
      openBets: 1,
      admin: false
    },
    {
      id: "rob",
      name: "Rob",
      team: "Bills",
      bankroll: 850,
      start: 1000,
      wagered: 150,
      openBets: 3,
      admin: false
    },
    {
      id: "don",
      name: "Don",
      team: "Saints",
      bankroll: 930,
      start: 1000,
      wagered: 70,
      openBets: 2,
      admin: false
    }
  ],

  games: [
    {
      id: "game1",
      away: "Eagles",
      home: "Buccaneers",
      awayUser: null,
      homeUser: "Tuane",
      userGame: true,
      status: "open",
      lines: {
        spreadAway: "+2.5",
        spreadHome: "-2.5",
        mlAway: "+120",
        mlHome: "-140",
        totalOver: "50.5",
        totalUnder: "50.5"
      }
    },
    {
      id: "game2",
      away: "Saints",
      home: "Bills",
      awayUser: "Don",
      homeUser: "Rob",
      userGame: true,
      status: "open",
      lines: {
        spreadAway: "+4.0",
        spreadHome: "-4.0",
        mlAway: "+150",
        mlHome: "-170",
        totalOver: "49.0",
        totalUnder: "49.0"
      }
    },
    {
      id: "game3",
      away: "Jets",
      home: "Dolphins",
      awayUser: "Des",
      homeUser: null,
      userGame: true,
      status: "open",
      lines: {
        spreadAway: "+3.5",
        spreadHome: "-3.5",
        mlAway: "+135",
        mlHome: "-155",
        totalOver: "48.5",
        totalUnder: "48.5"
      }
    },
    {
      id: "game4",
      away: "Commanders",
      home: "Falcons",
      awayUser: null,
      homeUser: "Romeo",
      userGame: true,
      status: "closed",
      lines: {
        spreadAway: "+4.0",
        spreadHome: "-4.0",
        mlAway: "+150",
        mlHome: "-170",
        totalOver: "47.5",
        totalUnder: "47.5"
      }
    }
  ],

  // Full screenshot-driven player pool, grouped by game/team
  playerPools: {
    game1: {
      awayTeam: "Eagles",
      homeTeam: "Buccaneers",

      passingPlayers: [
        "Trevor Lawrence"
      ],

      rushingPlayers: [
        "Jonathan Taylor",
        "Aaron Jones"
      ],

      receivingPlayers: [
        "DK Metcalf",
        "Christian Watson",
        "Tucker Kraft"
      ],

      defensePlayers: [
        "Bryce Huff",
        "Riley Moss",
        "Jack Campbell",
        "Patrick Surtain II",
        "Greg Newsome II"
      ]
    },

    game2: {
      awayTeam: "Saints",
      homeTeam: "Bills",

      passingPlayers: [
        "Lamar Jackson",
        "Justin Fields"
      ],

      rushingPlayers: [
        "Quinshon Judkins",
        "Trey Benson",
        "Derrick Henry"
      ],

      receivingPlayers: [
        "Laviska Shenault Jr",
        "Tee Higgins",
        "Sam LaPorta",
        "Kyle Pitts",
        "Dont'e Thornton Jr",
        "Adonai Mitchell"
      ],

      defensePlayers: [
        "Kyle Dugger",
        "Foyesade Oluokun",
        "Greg Rousseau",
        "Jonas Sanker",
        "Devin Lloyd",
        "Matt Williams"
      ]
    },

    game3: {
      awayTeam: "Jets",
      homeTeam: "Dolphins",

      passingPlayers: [
        "Jaxson Dart"
      ],

      rushingPlayers: [
        "Cam Skattebo"
      ],

      receivingPlayers: [
        "Elic Ayomanor",
        "Parker Washington",
        "George Pickens",
        "Darnell Washington"
      ],

      defensePlayers: [
        "Tyleik Williams",
        "Micah Parsons",
        "Nolan Scourton",
        "BJ Ojulari",
        "Murphy II",
        "Kamari Lassiter",
        "Tykee Smith",
        "Nick Cross",
        "Jordan Battle",
        "Ja'Whaun Bentley"
      ]
    },

    game4: {
      awayTeam: "Commanders",
      homeTeam: "Falcons",

      passingPlayers: [
        "JJ McCarthy"
      ],

      rushingPlayers: [
        "Keaton Mitchell",
        "Derrick Henry"
      ],

      receivingPlayers: [
        "Ja'Marr Chase",
        "Kayshon Boutte",
        "Noah Fant"
      ],

      defensePlayers: [
        "Patrick Queen",
        "Arden Key",
        "Jessie Bates III",
        "Budda Baker"
      ]
    }
  },

  // Market buttons for Createalay + props + SGP
  marketGroups: {
    passing: [
      "Passing Yards",
      "Passing TDs",
      "Completions",
      "Attempts",
      "Longest Completion",
      "Interceptions"
    ],
    rushing: [
      "Rushing Yards",
      "Rushing Attempts",
      "Longest Rush",
      "Rushing TD"
    ],
    receiving: [
      "Receiving Yards",
      "Receptions",
      "Longest Reception",
      "Receiving TD",
      "Anytime TD"
    ],
    defense: [
      "Tackles",
      "Solo Tackles",
      "Assists",
      "TFL",
      "Sacks",
      "Interceptions",
      "Pass Deflections"
    ],
    team: [
      "Moneyline",
      "Spread",
      "Game Total",
      "Team Total",
      "Turnovers",
      "Sacks",
      "Interceptions"
    ]
  },

  // Createalay is buttons only
  createalay: {
    mode: "buttons-only",
    sides: ["Over", "Under"],
    anytimeSides: ["Yes"],
    defaultLines: {
      "Passing Yards": [199.5, 224.5, 249.5, 274.5, 299.5, 324.5],
      "Passing TDs": [0.5, 1.5, 2.5, 3.5],
      "Completions": [14.5, 18.5, 22.5, 26.5],
      "Attempts": [24.5, 28.5, 32.5, 36.5],
      "Longest Completion": [24.5, 29.5, 34.5, 39.5],
      "Interceptions": [0.5, 1.5],

      "Rushing Yards": [39.5, 54.5, 69.5, 84.5, 99.5],
      "Rushing Attempts": [9.5, 12.5, 15.5, 18.5],
      "Longest Rush": [12.5, 16.5, 20.5, 24.5],
      "Rushing TD": [0.5],

      "Receiving Yards": [34.5, 49.5, 64.5, 79.5, 94.5, 109.5],
      "Receptions": [2.5, 3.5, 4.5, 5.5, 6.5],
      "Longest Reception": [14.5, 19.5, 24.5, 29.5],
      "Receiving TD": [0.5],
      "Anytime TD": [0.5],

      "Tackles": [3.5, 4.5, 5.5, 6.5, 7.5, 8.5],
      "Solo Tackles": [2.5, 3.5, 4.5, 5.5],
      "Assists": [1.5, 2.5, 3.5],
      "TFL": [0.5, 1.5],
      "Sacks": [0.5, 1.5],
      "Pass Deflections": [0.5, 1.5],
      "Interceptions Defense": [0.5]
    }
  },

  // Bigger prop pool so you have a lot of selectable legs
  props: [
    // GAME 1 EAGLES @ BUCCANEERS
    { id: "g1_p1", gameId: "game1", player: "Trevor Lawrence", market: "Passing Yards", line: 274.5, side: "Over", odds: -115 },
    { id: "g1_p2", gameId: "game1", player: "Trevor Lawrence", market: "Passing TDs", line: 1.5, side: "Over", odds: -120 },
    { id: "g1_p3", gameId: "game1", player: "Trevor Lawrence", market: "Interceptions", line: 0.5, side: "Over", odds: +125 },
    { id: "g1_p4", gameId: "game1", player: "Jonathan Taylor", market: "Rushing Yards", line: 84.5, side: "Over", odds: -118 },
    { id: "g1_p5", gameId: "game1", player: "Jonathan Taylor", market: "Rushing Attempts", line: 15.5, side: "Over", odds: -112 },
    { id: "g1_p6", gameId: "game1", player: "Jonathan Taylor", market: "Anytime TD", line: 0.5, side: "Yes", odds: +115 },
    { id: "g1_p7", gameId: "game1", player: "DK Metcalf", market: "Receiving Yards", line: 74.5, side: "Over", odds: -115 },
    { id: "g1_p8", gameId: "game1", player: "DK Metcalf", market: "Receptions", line: 5.5, side: "Over", odds: +120 },
    { id: "g1_p9", gameId: "game1", player: "DK Metcalf", market: "Anytime TD", line: 0.5, side: "Yes", odds: +135 },
    { id: "g1_p10", gameId: "game1", player: "Christian Watson", market: "Receiving Yards", line: 49.5, side: "Over", odds: -110 },
    { id: "g1_p11", gameId: "game1", player: "Christian Watson", market: "Receptions", line: 3.5, side: "Over", odds: -105 },
    { id: "g1_p12", gameId: "game1", player: "Tucker Kraft", market: "Receiving Yards", line: 34.5, side: "Over", odds: -105 },
    { id: "g1_p13", gameId: "game1", player: "Tucker Kraft", market: "Anytime TD", line: 0.5, side: "Yes", odds: +280 },
    { id: "g1_p14", gameId: "game1", player: "Jack Campbell", market: "Tackles", line: 7.5, side: "Over", odds: -120 },
    { id: "g1_p15", gameId: "game1", player: "Bryce Huff", market: "Sacks", line: 0.5, side: "Over", odds: +150 },
    { id: "g1_p16", gameId: "game1", player: "Riley Moss", market: "Interceptions Defense", line: 0.5, side: "Over", odds: +220 },

    // GAME 2 SAINTS @ BILLS
    { id: "g2_p1", gameId: "game2", player: "Lamar Jackson", market: "Passing Yards", line: 265.5, side: "Over", odds: -112 },
    { id: "g2_p2", gameId: "game2", player: "Lamar Jackson", market: "Passing TDs", line: 2.5, side: "Over", odds: +135 },
    { id: "g2_p3", gameId: "game2", player: "Lamar Jackson", market: "Interceptions", line: 0.5, side: "Over", odds: +120 },
    { id: "g2_p4", gameId: "game2", player: "Lamar Jackson", market: "Rushing Yards", line: 52.5, side: "Over", odds: -110 },
    { id: "g2_p5", gameId: "game2", player: "Lamar Jackson", market: "Anytime TD", line: 0.5, side: "Yes", odds: +175 },

    { id: "g2_p6", gameId: "game2", player: "Quinshon Judkins", market: "Rushing Yards", line: 88.5, side: "Over", odds: -118 },
    { id: "g2_p7", gameId: "game2", player: "Quinshon Judkins", market: "Anytime TD", line: 0.5, side: "Yes", odds: +125 },
    { id: "g2_p8", gameId: "game2", player: "Laviska Shenault Jr", market: "Receiving Yards", line: 82.5, side: "Over", odds: -110 },
    { id: "g2_p9", gameId: "game2", player: "Laviska Shenault Jr", market: "Receptions", line: 5.5, side: "Over", odds: -110 },
    { id: "g2_p10", gameId: "game2", player: "Laviska Shenault Jr", market: "Anytime TD", line: 0.5, side: "Yes", odds: +145 },
    { id: "g2_p11", gameId: "game2", player: "Tee Higgins", market: "Receiving Yards", line: 75.5, side: "Over", odds: -110 },
    { id: "g2_p12", gameId: "game2", player: "Sam LaPorta", market: "Anytime TD", line: 0.5, side: "Yes", odds: +190 },
    { id: "g2_p13", gameId: "game2", player: "Kyle Dugger", market: "Tackles", line: 7.5, side: "Over", odds: -122 },
    { id: "g2_p14", gameId: "game2", player: "Foyesade Oluokun", market: "Interceptions Defense", line: 0.5, side: "Over", odds: +400 },
    { id: "g2_p15", gameId: "game2", player: "Greg Rousseau", market: "Sacks", line: 0.5, side: "Over", odds: +150 },

    { id: "g2_p16", gameId: "game2", player: "Justin Fields", market: "Passing Yards", line: 312.5, side: "Over", odds: -110 },
    { id: "g2_p17", gameId: "game2", player: "Justin Fields", market: "Passing TDs", line: 2.5, side: "Over", odds: +120 },
    { id: "g2_p18", gameId: "game2", player: "Justin Fields", market: "Interceptions", line: 1.5, side: "Over", odds: +125 },
    { id: "g2_p19", gameId: "game2", player: "Trey Benson", market: "Rushing Yards", line: 88.5, side: "Over", odds: -115 },
    { id: "g2_p20", gameId: "game2", player: "Kyle Pitts", market: "Receiving Yards", line: 82.5, side: "Over", odds: -112 },
    { id: "g2_p21", gameId: "game2", player: "Kyle Pitts", market: "Anytime TD", line: 0.5, side: "Yes", odds: +145 },
    { id: "g2_p22", gameId: "game2", player: "Dont'e Thornton Jr", market: "Receiving Yards", line: 44.5, side: "Over", odds: -108 },
    { id: "g2_p23", gameId: "game2", player: "Adonai Mitchell", market: "Anytime TD", line: 0.5, side: "Yes", odds: +210 },
    { id: "g2_p24", gameId: "game2", player: "Jonas Sanker", market: "Tackles", line: 4.5, side: "Over", odds: -120 },
    { id: "g2_p25", gameId: "game2", player: "Devin Lloyd", market: "Sacks", line: 0.5, side: "Over", odds: +170 },

    // GAME 3 JETS @ DOLPHINS
    { id: "g3_p1", gameId: "game3", player: "Jaxson Dart", market: "Passing Yards", line: 302.5, side: "Over", odds: -112 },
    { id: "g3_p2", gameId: "game3", player: "Jaxson Dart", market: "Passing TDs", line: 2.5, side: "Over", odds: +120 },
    { id: "g3_p3", gameId: "game3", player: "Jaxson Dart", market: "Interceptions", line: 0.5, side: "Over", odds: +135 },
    { id: "g3_p4", gameId: "game3", player: "Cam Skattebo", market: "Rushing Yards", line: 78.5, side: "Over", odds: -118 },
    { id: "g3_p5", gameId: "game3", player: "Cam Skattebo", market: "Rushing Attempts", line: 13.5, side: "Over", odds: -115 },
    { id: "g3_p6", gameId: "game3", player: "Cam Skattebo", market: "Anytime TD", line: 0.5, side: "Yes", odds: +145 },
    { id: "g3_p7", gameId: "game3", player: "Elic Ayomanor", market: "Receiving Yards", line: 88.5, side: "Over", odds: -115 },
    { id: "g3_p8", gameId: "game3", player: "Elic Ayomanor", market: "Anytime TD", line: 0.5, side: "Yes", odds: +150 },
    { id: "g3_p9", gameId: "game3", player: "Parker Washington", market: "Receiving Yards", line: 39.5, side: "Over", odds: -108 },
    { id: "g3_p10", gameId: "game3", player: "George Pickens", market: "Receiving Yards", line: 49.5, side: "Over", odds: -112 },
    { id: "g3_p11", gameId: "game3", player: "Darnell Washington", market: "Receiving Yards", line: 44.5, side: "Over", odds: -110 },

    { id: "g3_p12", gameId: "game3", player: "Nick Cross", market: "Tackles", line: 7.5, side: "Over", odds: -120 },
    { id: "g3_p13", gameId: "game3", player: "Kamari Lassiter", market: "Interceptions Defense", line: 0.5, side: "Over", odds: +220 },
    { id: "g3_p14", gameId: "game3", player: "Tykee Smith", market: "Interceptions Defense", line: 0.5, side: "Over", odds: +260 },
    { id: "g3_p15", gameId: "game3", player: "Tyleik Williams", market: "Sacks", line: 0.5, side: "Over", odds: +145 },
    { id: "g3_p16", gameId: "game3", player: "Micah Parsons", market: "Sacks", line: 0.5, side: "Over", odds: +115 },
    { id: "g3_p17", gameId: "game3", player: "Nolan Scourton", market: "Sacks", line: 0.5, side: "Over", odds: +155 },
    { id: "g3_p18", gameId: "game3", player: "Jordan Battle", market: "Tackles", line: 6.0, side: "Over", odds: -115 },
    { id: "g3_p19", gameId: "game3", player: "Ja'Whaun Bentley", market: "Tackles", line: 6.5, side: "Over", odds: -120 },

    // GAME 4 COMMANDERS @ FALCONS (closed but still stored)
    { id: "g4_p1", gameId: "game4", player: "JJ McCarthy", market: "Passing Yards", line: 312.5, side: "Over", odds: -112 },
    { id: "g4_p2", gameId: "game4", player: "JJ McCarthy", market: "Passing TDs", line: 2.5, side: "Over", odds: +135 },
    { id: "g4_p3", gameId: "game4", player: "JJ McCarthy", market: "Interceptions", line: 1.5, side: "Over", odds: -140 },
    { id: "g4_p4", gameId: "game4", player: "Keaton Mitchell", market: "Rushing Yards", line: 32.5, side: "Over", odds: -110 },
    { id: "g4_p5", gameId: "game4", player: "Ja'Marr Chase", market: "Receiving Yards", line: 104.5, side: "Over", odds: -110 },
    { id: "g4_p6", gameId: "game4", player: "Ja'Marr Chase", market: "Receptions", line: 6.5, side: "Over", odds: -110 },
    { id: "g4_p7", gameId: "game4", player: "Ja'Marr Chase", market: "Anytime TD", line: 0.5, side: "Yes", odds: -120 },
    { id: "g4_p8", gameId: "game4", player: "Kayshon Boutte", market: "Receiving Yards", line: 49.5, side: "Over", odds: -110 },
    { id: "g4_p9", gameId: "game4", player: "Patrick Queen", market: "Tackles", line: 8.5, side: "Over", odds: -120 },
    { id: "g4_p10", gameId: "game4", player: "Arden Key", market: "Sacks", line: 0.5, side: "Over", odds: +170 },
    { id: "g4_p11", gameId: "game4", player: "Jessie Bates III", market: "Interceptions Defense", line: 0.5, side: "Over", odds: +220 },
    { id: "g4_p12", gameId: "game4", player: "Budda Baker", market: "Tackles", line: 4.5, side: "Over", odds: -115 }
  ],

  createalaySelection: {
    gameId: null,
    market: null,
    leg: null
  },

  betSlip: {
    legs: [],
    betType: "weekly",
    stake: 0
  },

  bets: [
    {
      id: "BET-005",
      user: "Tuane",
      type: "Weekly Parlay",
      stake: 150,
      status: "open",
      odds: "+705",
      payout: 1207.5,
      legs: [
        "Justin Fields Over 1.5 Passing TD",
        "Kyle Pitts Anytime TD",
        "Panthers Moneyline"
      ]
    },
    {
      id: "BET-006",
      user: "Tuane",
      type: "Weekly Parlay",
      stake: 50,
      status: "open",
      odds: "+236",
      payout: 168,
      legs: [
        "Bills Defense Over 1.5 Sacks",
        "Derrick Henry Over 2.5 Rushing Attempts",
        "Jonas Sanker Over 1.5 Tackles"
      ]
    }
  ],

  commandCenter: {
    log: [],
    selectedBetId: null
  }
};
