const STATE = {
  "title": "Madden SportsBook",
  "subtitle": "Private Madden League Sportsbook",
  "week": 4,
  "users": [
    {
      "name": "Tuane",
      "pin": "0001",
      "isAdmin": true,
      "start": 1000,
      "wagered": 150,
      "available": 1250,
      "openBets": 1
    },
    {
      "name": "Des",
      "pin": "0002",
      "isAdmin": false,
      "start": 1000,
      "wagered": 300,
      "available": 700,
      "openBets": 3
    },
    {
      "name": "Romeo",
      "pin": "0004",
      "isAdmin": false,
      "start": 1000,
      "wagered": 100,
      "available": 900,
      "openBets": 1
    },
    {
      "name": "Rob",
      "pin": "0003",
      "isAdmin": false,
      "start": 1000,
      "wagered": 150,
      "available": 850,
      "openBets": 3
    },
    {
      "name": "Don",
      "pin": "0005",
      "isAdmin": false,
      "start": 1000,
      "wagered": 70,
      "available": 930,
      "openBets": 2
    }
  ],
  "rules": {
    "startBankroll": 1000,
    "seasonMax": 400,
    "weeklyMax": 500,
    "maxParlayStake": 150,
    "minLegs": 2,
    "maxSeasonLegs": 3,
    "maxWeeklyLegs": 5
  },
  "bets": [
    {
      "id": "BET-005",
      "user": "Tuane",
      "week": 4,
      "type": "Parlay",
      "status": "OPEN",
      "stake": 150,
      "odds": "+705",
      "payout": "$1207.50",
      "legs": [
        "Justin Fields Over 1.5 Passing TD",
        "Kyle Pitts Anytime TD",
        "Panthers Moneyline"
      ]
    },
    {
      "id": "BET-006",
      "user": "Tuane",
      "week": 4,
      "type": "Parlay",
      "status": "OPEN",
      "stake": 50,
      "odds": "+236",
      "payout": "$168.00",
      "legs": [
        "Bills Defense Over 1.5 Sacks",
        "Derrick Henry Over 2.5 Rushing Attempts",
        "Jonas Sanker Over 1.5 Tackles"
      ]
    }
  ],
  "games": [
    {
      "id": "commanders_falcons",
      "title": "Commanders @ Falcons",
      "userLabel": "Romeo \u2022 Falcons",
      "away": "Commanders",
      "home": "Falcons",
      "awayLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png",
      "homeLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
      "theme": [
        "#5A1414",
        "#A71930"
      ],
      "board": {
        "away": {
          "spread": "+4.0",
          "spreadOdds": "-110",
          "ml": "+150",
          "total": "O 47.5",
          "totalOdds": "-110"
        },
        "home": {
          "spread": "-4.0",
          "spreadOdds": "-110",
          "ml": "-170",
          "total": "U 47.5",
          "totalOdds": "-110"
        }
      },
      "tabs": {
        "Game Lines": [
          [
            "Commanders +4.0",
            "-110"
          ],
          [
            "Falcons -4.0",
            "-110"
          ],
          [
            "Commanders ML",
            "+150"
          ],
          [
            "Falcons ML",
            "-170"
          ],
          [
            "Over 47.5",
            "-110"
          ],
          [
            "Under 47.5",
            "-110"
          ]
        ],
        "Passing": [
          [
            "JJ McCarthy Over 229.5 Passing Yards",
            "-112"
          ],
          [
            "JJ McCarthy Over 1.5 Passing TD",
            "-118"
          ],
          [
            "JJ McCarthy Under 0.5 INT",
            "-150"
          ]
        ],
        "Rushing": [
          [
            "Derrick Henry Over 74.5 Rush Yards",
            "-115"
          ],
          [
            "Derrick Henry Over 14.5 Rush Attempts",
            "-112"
          ],
          [
            "Derrick Henry Anytime TD",
            "+110"
          ]
        ],
        "Receiving": [
          [
            "Kayshon Boutte Over 52.5 Receiving Yards",
            "-110"
          ],
          [
            "Ja'Marr Chase Over 79.5 Receiving Yards",
            "-115"
          ],
          [
            "Noah Fant Anytime TD",
            "+240"
          ]
        ],
        "Defense": [
          [
            "Budda Baker Over 4.5 Tackles",
            "-120"
          ],
          [
            "Jessie Bates III To Record INT",
            "+410"
          ],
          [
            "Falcons Defense Over 1.5 Sacks",
            "+110"
          ]
        ]
      }
    },
    {
      "id": "eagles_buccaneers",
      "title": "Eagles @ Buccaneers",
      "userLabel": "Tuane \u2022 Buccaneers",
      "away": "Eagles",
      "home": "Buccaneers",
      "awayLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
      "homeLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png",
      "theme": [
        "#004C54",
        "#D50A0A"
      ],
      "board": {
        "away": {
          "spread": "+2.5",
          "spreadOdds": "-110",
          "ml": "+120",
          "total": "O 50.5",
          "totalOdds": "-110"
        },
        "home": {
          "spread": "-2.5",
          "spreadOdds": "-110",
          "ml": "-140",
          "total": "U 50.5",
          "totalOdds": "-110"
        }
      },
      "tabs": {
        "Game Lines": [
          [
            "Eagles +2.5",
            "-110"
          ],
          [
            "Buccaneers -2.5",
            "-110"
          ],
          [
            "Eagles ML",
            "+120"
          ],
          [
            "Buccaneers ML",
            "-140"
          ],
          [
            "Over 50.5",
            "-110"
          ],
          [
            "Under 50.5",
            "-110"
          ]
        ],
        "Passing": [
          [
            "Trevor Lawrence Over 274.5 Passing Yards",
            "-115"
          ],
          [
            "Trevor Lawrence Over 1.5 Passing TD",
            "-120"
          ],
          [
            "Trevor Lawrence Over 0.5 INT",
            "+125"
          ]
        ],
        "Rushing": [
          [
            "Jonathan Taylor Over 84.5 Rush Yards",
            "-118"
          ],
          [
            "Jonathan Taylor Over 16.5 Rush Attempts",
            "-110"
          ],
          [
            "Jonathan Taylor Anytime TD",
            "+115"
          ]
        ],
        "Receiving": [
          [
            "DK Metcalf Over 74.5 Receiving Yards",
            "-115"
          ],
          [
            "Christian Watson Over 49.5 Receiving Yards",
            "-110"
          ],
          [
            "Tucker Kraft Anytime TD",
            "+280"
          ]
        ],
        "Defense": [
          [
            "Jack Campbell Over 7.5 Tackles",
            "-120"
          ],
          [
            "Buccaneers Defense Over 1.5 Sacks",
            "+110"
          ],
          [
            "Buccaneers Defense To Record INT",
            "+175"
          ]
        ]
      }
    },
    {
      "id": "saints_bills",
      "title": "Saints @ Bills",
      "userLabel": "Don \u2022 Saints / Rob \u2022 Bills",
      "away": "Saints",
      "home": "Bills",
      "awayLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/no.png",
      "homeLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png",
      "theme": [
        "#D3BC8D",
        "#00338D"
      ],
      "board": {
        "away": {
          "spread": "+4.0",
          "spreadOdds": "-110",
          "ml": "+150",
          "total": "O 49.0",
          "totalOdds": "-110"
        },
        "home": {
          "spread": "-4.0",
          "spreadOdds": "-110",
          "ml": "-170",
          "total": "U 49.0",
          "totalOdds": "-110"
        }
      },
      "tabs": {
        "Game Lines": [
          [
            "Saints +4.0",
            "-110"
          ],
          [
            "Bills -4.0",
            "-110"
          ],
          [
            "Saints ML",
            "+150"
          ],
          [
            "Bills ML",
            "-170"
          ],
          [
            "Over 49.0",
            "-110"
          ],
          [
            "Under 49.0",
            "-110"
          ]
        ],
        "Passing": [
          [
            "Lamar Jackson Over 224.5 Passing Yards",
            "-112"
          ],
          [
            "Justin Fields Over 229.5 Passing Yards",
            "-110"
          ],
          [
            "Justin Fields Over 1.5 Passing TD",
            "-115"
          ]
        ],
        "Rushing": [
          [
            "Lamar Jackson Over 49.5 Rush Yards",
            "-112"
          ],
          [
            "Trey Benson Over 69.5 Rush Yards",
            "-118"
          ],
          [
            "Trey Benson Anytime TD",
            "+125"
          ]
        ],
        "Receiving": [
          [
            "Kyle Pitts Over 58.5 Receiving Yards",
            "-112"
          ],
          [
            "Dont'e Thornton Jr Over 44.5 Receiving Yards",
            "-108"
          ],
          [
            "Adonai Mitchell Anytime TD",
            "+210"
          ]
        ],
        "Defense": [
          [
            "Bills Defense Over 1.5 Sacks",
            "+110"
          ],
          [
            "Jonas Sanker Over 4.5 Tackles",
            "-120"
          ],
          [
            "Saints Defense To Record INT",
            "+185"
          ]
        ]
      }
    },
    {
      "id": "jets_dolphins",
      "title": "Jets @ Dolphins",
      "userLabel": "Des \u2022 Jets",
      "away": "Jets",
      "home": "Dolphins",
      "awayLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png",
      "homeLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png",
      "theme": [
        "#125740",
        "#008E97"
      ],
      "board": {
        "away": {
          "spread": "+3.5",
          "spreadOdds": "-110",
          "ml": "+135",
          "total": "O 48.5",
          "totalOdds": "-110"
        },
        "home": {
          "spread": "-3.5",
          "spreadOdds": "-110",
          "ml": "-155",
          "total": "U 48.5",
          "totalOdds": "-110"
        }
      },
      "tabs": {
        "Game Lines": [
          [
            "Jets +3.5",
            "-110"
          ],
          [
            "Dolphins -3.5",
            "-110"
          ],
          [
            "Jets ML",
            "+135"
          ],
          [
            "Dolphins ML",
            "-155"
          ],
          [
            "Over 48.5",
            "-110"
          ],
          [
            "Under 48.5",
            "-110"
          ]
        ],
        "Passing": [
          [
            "Jaxson Dart Over 225.5 Passing Yards",
            "-115"
          ],
          [
            "Jaxson Dart Over 1.5 Passing TD",
            "-120"
          ],
          [
            "Jaxson Dart Over 0.5 INT",
            "+135"
          ]
        ],
        "Rushing": [
          [
            "Cam Skattebo Over 54.5 Rush Yards",
            "-118"
          ],
          [
            "Cam Skattebo Over 13.5 Rush Attempts",
            "-115"
          ],
          [
            "Cam Skattebo Anytime TD",
            "+145"
          ]
        ],
        "Receiving": [
          [
            "Elic Ayomanor Over 69.5 Receiving Yards",
            "-115"
          ],
          [
            "Parker Washington Over 39.5 Receiving Yards",
            "-108"
          ],
          [
            "George Pickens Anytime TD",
            "+190"
          ]
        ],
        "Defense": [
          [
            "Jets Defense Over 1.5 Sacks",
            "+115"
          ],
          [
            "Ja'Whaun Bentley Over 6.5 Tackles",
            "-120"
          ],
          [
            "Nic Scourton To Record A Sack",
            "+140"
          ]
        ]
      }
    }
  ]
};