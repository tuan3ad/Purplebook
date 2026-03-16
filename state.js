// Global state for Madden SportsBook

window.APP_STATE = {
  app: {
    name: "Purplebook",
    subtitle: "Private Madden League Sportsbook",
    currentWeek: 4
  },

  rules: {
    startingBankroll: 1000,
    seasonMaxExposure: 400,
    weeklyMaxExposure: 500,
    maxParlayStake: 150,
    minLegs: 2,
    maxSeasonLegs: 3,
    maxWeeklyLegs: 5,
    allowSeasonParlays: false
  },

  users: [
    { name: "Tuane", team: "Buccaneers", bankroll: 1250, isAdmin: true },
    { name: "Des", team: "Jets", bankroll: 700 },
    { name: "Romeo", team: "Falcons", bankroll: 900 },
    { name: "Rob", team: "Bills", bankroll: 850 },
    { name: "Don", team: "Saints", bankroll: 930 }
  ],

  games: [
    {
      id: "g1",
      away: "Commanders",
      home: "Falcons",
      status: "CLOSED"
    },
    {
      id: "g2",
      away: "Eagles",
      home: "Buccaneers",
      status: "OPEN"
    },
    {
      id: "g3",
      away: "Saints",
      home: "Bills",
      status: "OPEN"
    },
    {
      id: "g4",
      away: "Jets",
      home: "Dolphins",
      status: "OPEN"
    }
  ],

  bets: []
};
