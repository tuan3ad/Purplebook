// Purplebook / Madden SportsBook
// Central editable state file

window.APP_STATE = {
  app: {
    name: "Purplebook",
    subtitle: "Private Madden League Sportsbook",
    weekLabel: "Week 4",
    theme: "madden"
  },

  rules: {
    startingBankroll: 1000,
    seasonMaxExposure: 400,
    weeklyMaxExposure: 500,
    maxParlayStake: 150,
    minLegs: 2,
    maxSeasonLegs: 3,
    maxWeeklyLegs: 5,
    seasonParlaysCloseAfterWeek: 3,
    createalayMode: "buttons-only"
  },

  users: [
    { id: "tuane", displayName: "Tuane", team: "Buccaneers", bankroll: 1250, isAdmin: true },
    { id: "des", displayName: "Des", team: "Jets", bankroll: 700, isAdmin: false },
    { id: "romeo", displayName: "Romeo", team: "Falcons", bankroll: 900, isAdmin: false },
    { id: "rob", displayName: "Rob", team: "Bills", bankroll: 850, isAdmin: false },
    { id: "don", displayName: "Don", team: "Saints", bankroll: 930, isAdmin: false }
  ],

  week4Games: [
    {
      id: "wk4-eagles-buccaneers",
      week: 4,
      type: "user-vs-user",
      away: "Eagles",
      home: "Buccaneers",
      ownerAway: null,
      ownerHome: "Tuane",
      status: "open"
    },
    {
      id: "wk4-saints-bills",
      week: 4,
      type: "user-vs-user",
      away: "Saints",
      home: "Bills",
      ownerAway: "Don",
      ownerHome: "Rob",
      status: "open"
    },
    {
      id: "wk4-jets-dolphins",
      week: 4,
      type: "user-vs-cpu",
      away: "Jets",
      home: "Dolphins",
      ownerAway: "Des",
      ownerHome: null,
      status: "open"
    },
    {
      id: "wk4-commanders-falcons",
      week: 4,
      type: "user-vs-user",
      away: "Commanders",
      home: "Falcons",
      ownerAway: null,
      ownerHome: "Romeo",
      status: "closed",
      note: "Romeo already played this game"
    }
  ],

  props: {
    bills: {
      passing: [
        { id: "buf-fields-pass-td", label: "Justin Fields Passing TD", line: 1.5, direction: "over", odds: -120 },
        { id: "buf-fields-pass-yds", label: "Justin Fields Passing Yards", line: 276.5, direction: "over", odds: -110 }
      ],
      rushing: [
        { id: "buf-benson-rush-yds", label: "Trey Benson Rushing Yards", line: 82.5, direction: "over", odds: -115 }
      ],
      receiving: [
        { id: "buf-pitts-anytime", label: "Kyle Pitts Anytime TD", line: 0.5, direction: "over", odds: +125 },
        { id: "buf-thornton-rec-yds", label: "Dont'e Thornton Jr Receiving Yards", line: 61.5, direction: "over", odds: -110 }
      ],
      defense: [
        { id: "buf-sanker-tackles", label: "Jonas Sanker Tackles", line: 5.5, direction: "over", odds: -125 },
        { id: "buf-lloyd-sacks", label: "Devin Lloyd Sacks", line: 0.25, direction: "over", odds: +160 }
      ]
    },

    buccaneers: {
      passing: [
        { id: "tb-lawrence-pass-td", label: "Trevor Lawrence Passing TD", line: 1.5, direction: "over", odds: -130 }
      ],
      rushing: [
        { id: "tb-taylor-rush-yds", label: "Jonathan Taylor Rushing Yards", line: 88.5, direction: "over", odds: -115 }
      ],
      receiving: [
        { id: "tb-metcalf-rec-yds", label: "D.K. Metcalf Receiving Yards", line: 96.5, direction: "over", odds: -110 }
      ],
      defense: [
        { id: "tb-huff-sacks", label: "Bryce Huff Sacks", line: 0.5, direction: "over", odds: +120 },
        { id: "tb-campbell-int", label: "Jack Campbell Interception", line: 0.5, direction: "over", odds: +350 }
      ]
    },

    falcons: {
      passing: [
        { id: "atl-mccarthy-int", label: "J.J. McCarthy Interceptions", line: 1.5, direction: "over", odds: -140 }
      ],
      rushing: [
        { id: "atl-keaton-rush-yds", label: "Keaton Mitchell Rushing Yards", line: 49.5, direction: "over", odds: -115 }
      ],
      receiving: [
        { id: "atl-chase-rec-yds", label: "Ja'Marr Chase Receiving Yards", line: 118.5, direction: "over", odds: -110 },
        { id: "atl-chase-anytime", label: "Ja'Marr Chase Anytime TD", line: 0.5, direction: "over", odds: -125 }
      ],
      defense: [
        { id: "atl-bates-int", label: "Jessie Bates III Interception", line: 0.5, direction: "over", odds: +275 },
        { id: "atl-key-sacks", label: "Arden Key Sacks", line: 0.5, direction: "over", odds: +145 },
        { id: "atl-queen-tackles", label: "Patrick Queen Tackles", line: 7.5, direction: "over", odds: -120 }
      ]
    },

    jets: {
      passing: [
        { id: "nyj-dart-pass-td", label: "Jaxson Dart Passing TD", line: 1.5, direction: "over", odds: -125 }
      ],
      rushing: [
        { id: "nyj-skattebo-rush-yds", label: "Cam Skattebo Rushing Yards", line: 74.5, direction: "over", odds: -115 }
      ],
      receiving: [
        { id: "nyj-ayomanor-rec-yds", label: "Elic Ayomanor Receiving Yards", line: 72.5, direction: "over", odds: -110 },
        { id: "nyj-pwash-td", label: "Parker Washington Anytime TD", line: 0.5, direction: "over", odds: +150 }
      ],
      defense: [
        { id: "nyj-cross-tackles", label: "Nick Cross Tackles", line: 6.5, direction: "over", odds: -120 },
        { id: "nyj-lassiter-int", label: "Kamari Lassiter Interception", line: 0.5, direction: "over", odds: +325 },
        { id: "nyj-tywilliams-sacks", label: "Tyleik Williams Sacks", line: 0.5, direction: "over", odds: +145 }
      ]
    },

    saints: {
      passing: [
        { id: "no-lamar-pass-yds", label: "Lamar Jackson Passing Yards", line: 238.5, direction: "over", odds: -110 }
      ],
      rushing: [
        { id: "no-judkins-rush-yds", label: "Quinshon Judkins Rushing Yards", line: 78.5, direction: "over", odds: -115 }
      ],
      receiving: [
        { id: "no-shenault-rec", label: "Laviska Shenault Jr Receptions", line: 5.5, direction: "over", odds: -110 },
        { id: "no-higgins-rec-yds", label: "Tee Higgins Receiving Yards", line: 63.5, direction: "over", odds: -110 }
      ],
      defense: [
        { id: "no-dugger-solo", label: "Kyle Dugger Solo Tackles", line: 5.5, direction: "over", odds: -125 },
        { id: "no-oloukun-int", label: "Foyesade Oluokun Interception", line: 0.5, direction: "over", odds: +400 },
        { id: "no-rousseau-sacks", label: "Greg Rousseau Sacks", line: 0.5, direction: "over", odds: +150 }
      ]
    }
  },

  createalay: {
    enabled: true,
    buttonsOnly: true,
    sameGameParlayEnabled: true
  },

  openBets: [],

  commandCenter: {
    enabled: true,
    notes: [
      "Paste command snippets here later.",
      "Use this file as the base truth for users, bankrolls, games, and props."
    ]
  }
};
