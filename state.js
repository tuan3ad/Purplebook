// ---------- APP STATE ----------

export const STATE = {

  app: {
    name: "Purplebook",
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
    maxWeeklyLegs: 5
  },

  users: [

    {
      id: "tuane",
      name: "Tuane",
      team: "Buccaneers",
      bankroll: 1250,
      admin: true
    },

    {
      id: "des",
      name: "Des",
      team: "Jets",
      bankroll: 1000,
      admin: false
    },

    {
      id: "rob",
      name: "Rob",
      team: "Bills",
      bankroll: 1000,
      admin: false
    },

    {
      id: "romeo",
      name: "Romeo",
      team: "Falcons",
      bankroll: 1000,
      admin: false
    },

    {
      id: "don",
      name: "Don",
      team: "Saints",
      bankroll: 1000,
      admin: false
    }

  ],

  // ---------- WEEK 4 GAMES ----------

  games: [

    {
      id: "game1",
      away: "Eagles",
      home: "Buccaneers",
      userGame: true,
      status: "open"
    },

    {
      id: "game2",
      away: "Saints",
      home: "Bills",
      userGame: true,
      status: "open"
    },

    {
      id: "game3",
      away: "Jets",
      home: "Dolphins",
      userGame: true,
      status: "open"
    },

    {
      id: "game4",
      away: "Commanders",
      home: "Falcons",
      userGame: true,
      status: "closed"
    }

  ],

  // ---------- PLAYER POOLS FROM SCREENSHOTS ----------

  players: {

    buccaneers: [
      "Trevor Lawrence",
      "Jonathan Taylor",
      "DK Metcalf"
    ],

    bills: [
      "Justin Fields",
      "Trey Benson",
      "Kyle Pitts"
    ],

    saints: [
      "Lamar Jackson",
      "Derrick Henry"
    ],

    jets: [
      "Jaxson Dart"
    ],

    falcons: [
      "JJ McCarthy"
    ]

  },

  // ---------- PROP MARKETS ----------

  markets: [

    "Passing Yards",
    "Passing TDs",
    "Interceptions",

    "Rushing Yards",
    "Rushing Attempts",
    "Rushing TD",

    "Receiving Yards",
    "Receptions",
    "Anytime TD",

    "Sacks",
    "Tackles",
    "Interceptions Defense",

    "Moneyline",
    "Spread",
    "Game Total"

  ],

  // ---------- BET SLIP ----------

  betSlip: {
    legs: [],
    type: "weekly",
    stake: 0
  },

  bets: []

}
