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
    },
    {
      "id": "FUT-001",
      "user": "Tuane",
      "week": "Season",
      "type": "Season Parlay",
      "status": "OPEN",
      "stake": 150,
      "odds": "+650",
      "payout": "$1125.00",
      "legs": [
        "JJ McCarthy Over 19.5 Interceptions",
        "Saints Miss Playoffs",
        "Buccaneers Win Division"
      ]
    },
    {
      "id": "FUT-002",
      "user": "Tuane",
      "week": "Season",
      "type": "Season Parlay",
      "status": "OPEN",
      "stake": 150,
      "odds": "+700",
      "payout": "$1200.00",
      "legs": [
        "Jets Win Division",
        "Jaxson Dart Under 15 Interceptions",
        "Falcons Under 10 Wins"
      ]
    }
  ],
  "games": [
    {
      "id": "jets_dolphins",
      "title": "Jets @ Dolphins",
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
          "spread": "+3.5\n-110",
          "ml": "+135",
          "total": "O 48.5\n-110"
        },
        "home": {
          "spread": "-3.5\n-110",
          "ml": "-155",
          "total": "U 48.5\n-110"
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
          ],
          [
            "Jets Team Total Over 23.5",
            "-110"
          ],
          [
            "Jets Team Total Under 23.5",
            "-110"
          ],
          [
            "Dolphins Team Total Over 24.5",
            "-110"
          ],
          [
            "Dolphins Team Total Under 24.5",
            "-110"
          ],
          [
            "Alternate Jets +7.5",
            "-220"
          ],
          [
            "Alternate Dolphins -7.5",
            "+180"
          ]
        ],
        "Passing": [
          [
            "Jaxson Dart Over 225.5 Passing Yards",
            "-115"
          ],
          [
            "Jaxson Dart Under 225.5 Passing Yards",
            "-105"
          ],
          [
            "Jaxson Dart Over 250.5 Passing Yards",
            "+120"
          ],
          [
            "Jaxson Dart Under 250.5 Passing Yards",
            "-145"
          ],
          [
            "Jaxson Dart Over 1.5 Passing TD",
            "-120"
          ],
          [
            "Jaxson Dart Under 1.5 Passing TD",
            "+100"
          ],
          [
            "Jaxson Dart Over 2.5 Passing TD",
            "+240"
          ],
          [
            "Jaxson Dart Over 0.5 INT",
            "+135"
          ],
          [
            "Jaxson Dart Under 0.5 INT",
            "-175"
          ],
          [
            "Jaxson Dart Longest Completion Over 34.5",
            "-110"
          ],
          [
            "Jaxson Dart Over 19.5 Completions",
            "-110"
          ],
          [
            "Jaxson Dart Over 29.5 Attempts",
            "-115"
          ]
        ],
        "Rushing": [
          [
            "Cam Skattebo Over 54.5 Rush Yards",
            "-118"
          ],
          [
            "Cam Skattebo Under 54.5 Rush Yards",
            "-102"
          ],
          [
            "Cam Skattebo Over 13.5 Rush Attempts",
            "-115"
          ],
          [
            "Cam Skattebo Under 13.5 Rush Attempts",
            "-105"
          ],
          [
            "Cam Skattebo Anytime TD",
            "+145"
          ],
          [
            "Cam Skattebo Longest Rush Over 17.5",
            "-105"
          ],
          [
            "Jaxson Dart Over 24.5 Rush Yards",
            "-110"
          ],
          [
            "Jaxson Dart Over 39.5 Rush Yards",
            "+145"
          ]
        ],
        "Receiving": [
          [
            "Elic Ayomanor Over 69.5 Receiving Yards",
            "-115"
          ],
          [
            "Elic Ayomanor Under 69.5 Receiving Yards",
            "-105"
          ],
          [
            "Elic Ayomanor Over 4.5 Receptions",
            "-110"
          ],
          [
            "Elic Ayomanor Anytime TD",
            "+175"
          ],
          [
            "Darnell Washington Over 44.5 Receiving Yards",
            "-110"
          ],
          [
            "Darnell Washington Anytime TD",
            "+260"
          ],
          [
            "Parker Washington Over 39.5 Receiving Yards",
            "-108"
          ],
          [
            "Parker Washington Anytime TD",
            "+185"
          ],
          [
            "George Pickens Over 49.5 Receiving Yards",
            "-112"
          ],
          [
            "George Pickens Anytime TD",
            "+190"
          ]
        ],
        "Defense": [
          [
            "Ja'Whaun Bentley Over 6.5 Tackles",
            "-120"
          ],
          [
            "Ja'Whaun Bentley Over 8.5 Tackles",
            "+145"
          ],
          [
            "Nic Scourton To Record A Sack",
            "+140"
          ],
          [
            "Jets Defense Over 1.5 Sacks",
            "+115"
          ],
          [
            "Jets Defense To Record INT",
            "+185"
          ],
          [
            "Jets Defense Defensive TD",
            "+900"
          ]
        ]
      }
    },
    {
      "id": "bucs_eagles",
      "title": "Buccaneers @ Eagles",
      "away": "Buccaneers",
      "home": "Eagles",
      "awayLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png",
      "homeLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
      "theme": [
        "#D50A0A",
        "#004C54"
      ],
      "board": {
        "away": {
          "spread": "+2.5\n-110",
          "ml": "+120",
          "total": "O 50.5\n-110"
        },
        "home": {
          "spread": "-2.5\n-110",
          "ml": "-140",
          "total": "U 50.5\n-110"
        }
      },
      "tabs": {
        "Game Lines": [
          [
            "Buccaneers +2.5",
            "-110"
          ],
          [
            "Eagles -2.5",
            "-110"
          ],
          [
            "Buccaneers ML",
            "+120"
          ],
          [
            "Eagles ML",
            "-140"
          ],
          [
            "Over 50.5",
            "-110"
          ],
          [
            "Under 50.5",
            "-110"
          ],
          [
            "Buccaneers Team Total Over 26.5",
            "-112"
          ],
          [
            "Buccaneers Team Total Under 26.5",
            "-108"
          ],
          [
            "Eagles Team Total Over 23.5",
            "-110"
          ],
          [
            "Eagles Team Total Under 23.5",
            "-110"
          ],
          [
            "Alternate Buccaneers +7.5",
            "-220"
          ],
          [
            "Alternate Eagles -7.5",
            "+180"
          ]
        ],
        "Passing": [
          [
            "Trevor Lawrence Over 274.5 Passing Yards",
            "-115"
          ],
          [
            "Trevor Lawrence Under 274.5 Passing Yards",
            "-105"
          ],
          [
            "Trevor Lawrence Over 299.5 Passing Yards",
            "+145"
          ],
          [
            "Trevor Lawrence Over 1.5 Passing TD",
            "-120"
          ],
          [
            "Trevor Lawrence Under 1.5 Passing TD",
            "+100"
          ],
          [
            "Trevor Lawrence Over 2.5 Passing TD",
            "+240"
          ],
          [
            "Trevor Lawrence Over 0.5 INT",
            "+125"
          ],
          [
            "Trevor Lawrence Under 0.5 INT",
            "-155"
          ],
          [
            "Trevor Lawrence Longest Completion Over 36.5",
            "-110"
          ],
          [
            "Trevor Lawrence Over 21.5 Completions",
            "-110"
          ],
          [
            "Trevor Lawrence Over 31.5 Attempts",
            "-115"
          ]
        ],
        "Rushing": [
          [
            "Jonathan Taylor Over 84.5 Rush Yards",
            "-118"
          ],
          [
            "Jonathan Taylor Under 84.5 Rush Yards",
            "-102"
          ],
          [
            "Jonathan Taylor Over 15.5 Rush Attempts",
            "-112"
          ],
          [
            "Jonathan Taylor Under 15.5 Rush Attempts",
            "-108"
          ],
          [
            "Jonathan Taylor Anytime TD",
            "+115"
          ],
          [
            "Jonathan Taylor 2+ TD",
            "+475"
          ],
          [
            "Jonathan Taylor Longest Rush Over 18.5",
            "-105"
          ],
          [
            "Trevor Lawrence Over 19.5 Rush Yards",
            "+135"
          ],
          [
            "Aaron Jones Over 34.5 Rush Yards",
            "-108"
          ]
        ],
        "Receiving": [
          [
            "DK Metcalf Over 74.5 Receiving Yards",
            "-115"
          ],
          [
            "DK Metcalf Under 74.5 Receiving Yards",
            "-105"
          ],
          [
            "DK Metcalf Over 5.5 Receptions",
            "+120"
          ],
          [
            "DK Metcalf Anytime TD",
            "+135"
          ],
          [
            "DK Metcalf 2+ TD",
            "+650"
          ],
          [
            "Christian Watson Over 49.5 Receiving Yards",
            "-110"
          ],
          [
            "Christian Watson Over 3.5 Receptions",
            "-105"
          ],
          [
            "Christian Watson Anytime TD",
            "+190"
          ],
          [
            "Tucker Kraft Over 34.5 Receiving Yards",
            "-105"
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
            "Jack Campbell Over 9.5 Tackles",
            "+145"
          ],
          [
            "Patrick Surtain II To Record INT",
            "+420"
          ],
          [
            "Greg Newsome II To Record INT",
            "+480"
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
          "spread": "+4.0\n-110",
          "ml": "+150",
          "total": "O 49.0\n-110"
        },
        "home": {
          "spread": "-4.0\n-110",
          "ml": "-170",
          "total": "U 49.0\n-110"
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
          ],
          [
            "Saints Team Total Over 21.5",
            "-110"
          ],
          [
            "Saints Team Total Under 21.5",
            "-110"
          ],
          [
            "Bills Team Total Over 26.5",
            "-112"
          ],
          [
            "Bills Team Total Under 26.5",
            "-108"
          ]
        ],
        "Passing": [
          [
            "Lamar Jackson Over 224.5 Passing Yards",
            "-112"
          ],
          [
            "Lamar Jackson Under 224.5 Passing Yards",
            "-108"
          ],
          [
            "Lamar Jackson Over 1.5 Passing TD",
            "-118"
          ],
          [
            "Lamar Jackson Under 1.5 Passing TD",
            "+102"
          ],
          [
            "Lamar Jackson Over 0.5 INT",
            "+120"
          ],
          [
            "Lamar Jackson Under 0.5 INT",
            "-150"
          ],
          [
            "Justin Fields Over 229.5 Passing Yards",
            "-110"
          ],
          [
            "Justin Fields Under 229.5 Passing Yards",
            "-110"
          ],
          [
            "Justin Fields Over 1.5 Passing TD",
            "-115"
          ],
          [
            "Justin Fields Under 1.5 Passing TD",
            "-105"
          ],
          [
            "Justin Fields Over 0.5 INT",
            "+135"
          ],
          [
            "Justin Fields Under 0.5 INT",
            "-170"
          ]
        ],
        "Rushing": [
          [
            "Lamar Jackson Over 49.5 Rush Yards",
            "-112"
          ],
          [
            "Lamar Jackson Under 49.5 Rush Yards",
            "-108"
          ],
          [
            "Lamar Jackson Anytime TD",
            "+175"
          ],
          [
            "Justin Fields Over 34.5 Rush Yards",
            "-110"
          ],
          [
            "Justin Fields Anytime TD",
            "+220"
          ],
          [
            "Trey Benson Over 69.5 Rush Yards",
            "-118"
          ],
          [
            "Trey Benson Under 69.5 Rush Yards",
            "-102"
          ],
          [
            "Trey Benson Over 13.5 Rush Attempts",
            "-115"
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
            "Kyle Pitts Under 58.5 Receiving Yards",
            "-108"
          ],
          [
            "Kyle Pitts Over 4.5 Receptions",
            "-110"
          ],
          [
            "Kyle Pitts Anytime TD",
            "+145"
          ],
          [
            "Dont'e Thornton Jr Over 44.5 Receiving Yards",
            "-108"
          ],
          [
            "Dont'e Thornton Jr Anytime TD",
            "+240"
          ],
          [
            "Adonai Mitchell Over 39.5 Receiving Yards",
            "-110"
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
            "Bills Defense To Record INT",
            "+180"
          ],
          [
            "Jonas Sanker Over 4.5 Tackles",
            "-120"
          ],
          [
            "Jonas Sanker Over 6.5 Tackles",
            "+150"
          ],
          [
            "Saints Defense Over 1.5 Sacks",
            "+115"
          ],
          [
            "Saints Defense To Record INT",
            "+185"
          ]
        ]
      }
    },
    {
      "id": "falcons_cpu",
      "title": "Falcons vs CPU",
      "away": "Falcons",
      "home": "CPU",
      "awayLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
      "homeLogo": "",
      "theme": [
        "#A71930",
        "#4B5563"
      ],
      "board": {
        "away": {
          "spread": "-4.0\n-110",
          "ml": "-200",
          "total": "O 45.0\n-110"
        },
        "home": {
          "spread": "+4.0\n-110",
          "ml": "+180",
          "total": "U 45.0\n-110"
        }
      },
      "tabs": {
        "Game Lines": [
          [
            "Falcons -4.0",
            "-110"
          ],
          [
            "CPU +4.0",
            "-110"
          ],
          [
            "Falcons ML",
            "-200"
          ],
          [
            "CPU ML",
            "+180"
          ],
          [
            "Over 45.0",
            "-110"
          ],
          [
            "Under 45.0",
            "-110"
          ],
          [
            "Falcons Team Total Over 24.5",
            "-110"
          ],
          [
            "Falcons Team Total Under 24.5",
            "-110"
          ]
        ],
        "Passing": [
          [
            "JJ McCarthy Over 219.5 Passing Yards",
            "-112"
          ],
          [
            "JJ McCarthy Under 219.5 Passing Yards",
            "-108"
          ],
          [
            "JJ McCarthy Over 1.5 Passing TD",
            "-120"
          ],
          [
            "JJ McCarthy Under 1.5 Passing TD",
            "+100"
          ],
          [
            "JJ McCarthy Over 0.5 INT",
            "+125"
          ],
          [
            "JJ McCarthy Under 0.5 INT",
            "-155"
          ]
        ],
        "Rushing": [
          [
            "Derrick Henry Over 69.5 Rush Yards",
            "-118"
          ],
          [
            "Derrick Henry Under 69.5 Rush Yards",
            "-102"
          ],
          [
            "Derrick Henry Over 14.5 Rush Attempts",
            "-115"
          ],
          [
            "Derrick Henry Anytime TD",
            "+110"
          ],
          [
            "Derrick Henry 2+ TD",
            "+440"
          ],
          [
            "JJ McCarthy Over 19.5 Rush Yards",
            "+130"
          ]
        ],
        "Receiving": [
          [
            "Kayshon Boutte Over 49.5 Receiving Yards",
            "-110"
          ],
          [
            "Kayshon Boutte Under 49.5 Receiving Yards",
            "-110"
          ],
          [
            "Kayshon Boutte Over 3.5 Receptions",
            "-108"
          ],
          [
            "Kayshon Boutte Anytime TD",
            "+190"
          ]
        ],
        "Defense": [
          [
            "Cody Barton Over 6.5 Tackles",
            "-120"
          ],
          [
            "Cody Barton Over 8.5 Tackles",
            "+145"
          ],
          [
            "Falcons Defense Over 1.5 Sacks",
            "+110"
          ],
          [
            "Falcons Defense To Record INT",
            "+180"
          ]
        ]
      }
    }
  ]
};