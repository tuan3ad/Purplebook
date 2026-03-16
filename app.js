import { STATE } from "./state.js";

const app = document.getElementById("app");

const APP = {
  state: structuredClone(STATE),
  ui: {
    currentView: "auth",
    currentGameId: null,
    createalayGameId: null,
    createalayMarket: null,
    createalayLegId: null,
    gameFilter: "open"
  }
};

const PIN_KEY = "purplebook_pins_v2";

function getPins() {
  try {
    return JSON.parse(localStorage.getItem(PIN_KEY) || "{}");
  } catch {
    return {};
  }
}

function savePins(pins) {
  localStorage.setItem(PIN_KEY, JSON.stringify(pins));
}

function money(n) {
  return `$${Number(n).toFixed(0)}`;
}

function getCurrentUser() {
  return APP.state.users.find(u => u.id === APP.state.currentUser) || null;
}

function isAdmin() {
  return !!getCurrentUser()?.admin;
}

function getGame(gameId) {
  return APP.state.games.find(g => g.id === gameId);
}

function getPropsForGame(gameId) {
  return APP.state.props.filter(p => p.gameId === gameId);
}

function getBetsForUser(name) {
  return APP.state.bets.filter(b => b.user === name);
}

function safeOddsDisplay(odds) {
  if (typeof odds === "string") return odds;
  return odds > 0 ? `+${odds}` : `${odds}`;
}

function americanToDecimal(odds) {
  const n = Number(odds);
  if (Number.isNaN(n)) return 1;
  if (n > 0) return 1 + (n / 100);
  return 1 + (100 / Math.abs(n));
}

function combinedAmericanOdds(legs) {
  if (!legs.length) return "+0";
  const decimal = legs.reduce((acc, leg) => acc * americanToDecimal(leg.odds), 1);
  const american = decimal >= 2
    ? Math.round((decimal - 1) * 100)
    : Math.round(-100 / (decimal - 1));
  return american > 0 ? `+${american}` : `${american}`;
}

function calculatePayout(stake, oddsString) {
  const odds = Number(oddsString);
  if (!stake || Number.isNaN(odds)) return 0;
  if (odds > 0) return stake + (stake * odds / 100);
  return stake + (stake * 100 / Math.abs(odds));
}

function toast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.classList.add("hidden");
  }, 2200);
}

function setView(view) {
  APP.ui.currentView = view;
  document.querySelectorAll(".view").forEach(el => {
    el.classList.add("hidden");
  });

  const target = document.getElementById(`view-${view}`);
  if (target) target.classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
}

function renderAppShell() {
  app.innerHTML = `
    <div id="app-bg">
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>
      <div class="bg-vignette"></div>
    </div>

    <div id="app-shell">
      <header class="topbar glass">
        <div class="brand-wrap">
          <div class="brand-mark">PB</div>
          <div class="brand-text">
            <h1>${APP.state.app.name}</h1>
            <p>${APP.state.app.subtitle}</p>
          </div>
        </div>

        <div class="chip-row">
          <div class="chip">${APP.state.app.sportsbookName} • Week ${APP.state.app.week}</div>
          <button id="topCreatealayBtn" class="pill-btn" type="button">Createalay</button>
          <button id="topBetsBtn" class="pill-btn" type="button">Bet Slip</button>
          <button id="topAdminBtn" class="pill-btn admin-only hidden" type="button">Admin</button>
          <button id="logoutBtn" class="pill-btn hidden" type="button">Logout</button>
        </div>
      </header>

      <aside class="sidebar glass">
        <div class="sidebar-section">
          <h2>Navigation</h2>
          <button class="nav-btn active" data-view="home" type="button">Home</button>
          <button class="nav-btn" data-view="games" type="button">Games</button>
          <button class="nav-btn" data-view="myBets" type="button">My Bets</button>
          <button class="nav-btn" data-view="bankroll" type="button">Bankroll</button>
          <button class="nav-btn" data-view="leaderboard" type="button">Leaderboard</button>
          <button class="nav-btn" data-view="createalay" type="button">Createalay</button>
          <button class="nav-btn admin-only hidden" data-view="admin" type="button">Command Center</button>
        </div>

        <div class="sidebar-section">
          <h2>Week 4 Locked Games</h2>
          <div id="sidebarGames" class="stack"></div>
        </div>

        <div class="sidebar-section">
          <h2>League Rules</h2>
          <ul class="rules-list">
            <li>$1000 starting bankroll</li>
            <li>Season max: $400</li>
            <li>Weekly max: $500</li>
            <li>$150 max per parlay</li>
            <li>Min 2 legs</li>
            <li>Season max 3 legs</li>
            <li>Weekly max 5 legs</li>
            <li>No season parlays after Week 3</li>
          </ul>
        </div>
      </aside>

      <main class="main-content">
        <section id="view-auth" class="view">
          <div class="hero glass pad">
            <div class="eyebrow">Private Madden League</div>
            <h2>${APP.state.app.sportsbookName}</h2>
            <p class="mt-8 subtle">
              FanDuel-style board, same game parlay, separate Createalay, locked bankroll rules, and command center.
            </p>
          </div>
          <div id="authStage" class="card pad mt-20"></div>
        </section>

        <section id="view-home" class="view hidden">
          <div class="hero glass">
            <div class="eyebrow">Welcome Back</div>
            <h2 id="homeUserName">User</h2>
            <p id="homeUserSub" class="mt-8 subtle">Locked in for Week 4.</p>
          </div>

          <div class="stats-grid mt-20">
            <div class="stat-box">
              <div class="k">Bankroll</div>
              <div class="v" id="homeBankroll">$0</div>
            </div>
            <div class="stat-box">
              <div class="k">Open Bets</div>
              <div class="v" id="homeOpenBets">0</div>
            </div>
            <div class="stat-box">
              <div class="k">Weekly Limit Left</div>
              <div class="v" id="homeWeeklyLeft">$0</div>
            </div>
            <div class="stat-box">
              <div class="k">Season Status</div>
              <div class="v">${APP.state.rules.seasonParlaysAllowed ? "Open" : "Closed"}</div>
            </div>
          </div>

          <div class="card pad mt-20">
            <div class="section-head">
              <div>
                <h3>Week 4 Games</h3>
                <div class="subtle">Only the 4 locked matchups</div>
              </div>
            </div>
            <div id="homeGames" class="stack"></div>
          </div>

          <div class="card pad mt-20">
            <div class="section-head">
              <div>
                <h3>Trending Props</h3>
              </div>
            </div>
            <div id="trendingProps" class="chip-row"></div>
          </div>
        </section>

        <section id="view-games" class="view hidden">
          <div class="card pad">
            <div class="section-head">
              <div>
                <h3>Week 4 Board</h3>
                <div class="subtle">FanDuel-style table layout for each game</div>
              </div>
              <div class="chip-row">
                <button id="filterOpenBtn" class="btn secondary" type="button">Open</button>
                <button id="filterClosedBtn" class="btn secondary" type="button">Closed</button>
                <button id="filterAllBtn" class="btn secondary" type="button">All</button>
              </div>
            </div>
            <div id="gamesBoard" class="stack"></div>
          </div>
        </section>

        <section id="view-myBets" class="view hidden">
          <div class="card pad">
            <div class="section-head">
              <div><h3>My Bets</h3></div>
            </div>
            <div id="myBetsList" class="stack"></div>
          </div>
        </section>

        <section id="view-bankroll" class="view hidden">
          <div class="card pad">
            <div class="section-head">
              <div><h3>League Bankroll</h3></div>
            </div>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Start</th>
                    <th>Wagered</th>
                    <th>Available</th>
                    <th>Open Bets</th>
                  </tr>
                </thead>
                <tbody id="bankrollBody"></tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="view-leaderboard" class="view hidden">
          <div class="card pad">
            <div class="section-head">
              <div><h3>League Leaderboard</h3></div>
            </div>
            <div id="leaderboardList" class="stack"></div>
          </div>
        </section>

        <section id="view-createalay" class="view hidden">
          <div class="card pad">
            <div class="section-head">
              <div>
                <h3>Createalay</h3>
                <div class="subtle">Buttons only. No text entry.</div>
              </div>
            </div>

            <div class="stack">
              <div>
                <h4 class="section-title">1. Pick Game</h4>
                <div id="createalayGames" class="btn-grid"></div>
              </div>

              <div>
                <h4 class="section-title">2. Pick Market</h4>
                <div id="createalayMarkets" class="btn-grid"></div>
              </div>

              <div>
                <h4 class="section-title">3. Pick Leg</h4>
                <div id="createalayLegs" class="btn-grid"></div>
              </div>

              <div>
                <h4 class="section-title">4. Output</h4>
                <div id="createalayOutput" class="list-item">
                  <p>Select a game, market, and leg.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="view-admin" class="view hidden admin-only">
          <div class="card pad">
            <div class="section-head">
              <div>
                <h3>Command Center</h3>
                <div class="subtle">Admin only for Tuane</div>
              </div>
            </div>

            <div class="stack">
              <div class="card pad">
                <h4 class="section-title">Paste Update Board</h4>
                <textarea id="commandInput" class="textarea" placeholder='Paste command JSON here...'></textarea>
                <div class="chip-row mt-12">
                  <button id="applyCommandBtn" class="btn primary" type="button">Apply Update</button>
                  <button id="clearCommandBtn" class="btn secondary" type="button">Clear</button>
                </div>
              </div>

              <div class="card pad">
                <h4 class="section-title">Grade Bet</h4>
                <select id="adminBetSelect" class="select"></select>
                <div class="btn-grid mt-12">
                  <button id="gradeWinBtn" class="btn good" type="button">Win</button>
                  <button id="gradeLossBtn" class="btn bad" type="button">Loss</button>
                  <button id="gradePushBtn" class="btn warn" type="button">Push</button>
                  <button id="gradeVoidBtn" class="btn ghost" type="button">Void</button>
                </div>
              </div>

              <div class="card pad">
                <h4 class="section-title">Game Controls</h4>
                <div id="adminGamesList" class="stack"></div>
              </div>

              <div class="card pad">
                <h4 class="section-title">Command Log</h4>
                <div id="commandLog" class="stack"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div class="bet-slip hidden" id="betSlipPanel">
        <div class="bet-slip-inner">
          <div class="section-head">
            <div><h3>Bet Slip</h3></div>
            <button id="closeSlipBtn" class="btn secondary" type="button">Close</button>
          </div>

          <div id="betSlipLegs" class="stack empty-state">No legs added yet.</div>

          <div class="mt-16">
            <label class="label">Bet Type</label>
            <select id="betTypeSelect" class="select">
              <option value="weekly">Weekly</option>
              <option value="season">Season</option>
              <option value="sgp">Same Game Parlay</option>
            </select>
          </div>

          <div class="mt-12">
            <label class="label">Stake</label>
            <input id="stakeInput" class="input" type="number" min="0" step="1" placeholder="0" />
          </div>

          <div class="card pad mt-16">
            <div class="kv">
              <span>Combined Odds</span>
              <strong id="slipOdds">+0</strong>
            </div>
            <div class="kv">
              <span>Potential Payout</span>
              <strong id="slipPayout">$0</strong>
            </div>
          </div>

          <div class="btn-grid mt-16">
            <button id="clearSlipBtn" class="btn secondary" type="button">Clear Slip</button>
            <button id="placeBetBtn" class="btn primary" type="button">Place Bet</button>
          </div>
        </div>
      </div>

      <div id="gameModal" class="hidden">
        <div class="card pad" style="max-width:1100px;margin:20px auto;">
          <div class="section-head">
            <div>
              <div class="eyebrow">Game Board</div>
              <h3 id="modalTitle">Game</h3>
            </div>
            <button id="closeModalBtn" class="btn secondary" type="button">Close</button>
          </div>

          <div class="fanduel-board">
            <div class="fd-header">
              <div>Matchup</div>
              <div>Spread</div>
              <div>Moneyline</div>
              <div>Total</div>
            </div>
            <div id="modalMainLines"></div>
          </div>

          <div class="mt-20">
            <div class="section-head">
              <div>
                <h4>Same Game Parlay</h4>
                <div class="subtle">Add legs from this game only</div>
              </div>
            </div>
            <div id="modalProps" class="stack"></div>
          </div>
        </div>
      </div>

      <div id="toast" class="toast hidden"></div>
    </div>
  `;

  bindShell();
  renderSidebarGames();
  renderAuth();
}

function bindShell() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      if (view === "admin" && !isAdmin()) return;
      setView(view);
    });
  });

  document.getElementById("topCreatealayBtn").addEventListener("click", () => setView("createalay"));
  document.getElementById("topBetsBtn").addEventListener("click", () => toggleSlip(true));
  document.getElementById("topAdminBtn").addEventListener("click", () => {
    if (isAdmin()) setView("admin");
  });
  document.getElementById("logoutBtn").addEventListener("click", logout);

  document.getElementById("filterOpenBtn").addEventListener("click", () => {
    APP.ui.gameFilter = "open";
    renderGamesBoard();
  });
  document.getElementById("filterClosedBtn").addEventListener("click", () => {
    APP.ui.gameFilter = "closed";
    renderGamesBoard();
  });
  document.getElementById("filterAllBtn").addEventListener("click", () => {
    APP.ui.gameFilter = "all";
    renderGamesBoard();
  });

  document.getElementById("closeSlipBtn").addEventListener("click", () => toggleSlip(false));
  document.getElementById("clearSlipBtn").addEventListener("click", clearSlip);
  document.getElementById("placeBetBtn").addEventListener("click", placeBet);
  document.getElementById("stakeInput").addEventListener("input", renderSlip);

  document.getElementById("closeModalBtn").addEventListener("click", closeModal);

  document.getElementById("applyCommandBtn").addEventListener("click", applyCommandBoard);
  document.getElementById("clearCommandBtn").addEventListener("click", () => {
    document.getElementById("commandInput").value = "";
  });

  document.getElementById("gradeWinBtn").addEventListener("click", () => gradeBet("win"));
  document.getElementById("gradeLossBtn").addEventListener("click", () => gradeBet("loss"));
  document.getElementById("gradePushBtn").addEventListener("click", () => gradeBet("push"));
  document.getElementById("gradeVoidBtn").addEventListener("click", () => gradeBet("void"));
}

function renderSidebarGames() {
  const wrap = document.getElementById("sidebarGames");
  wrap.innerHTML = "";
  APP.state.games.forEach(game => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
      <h4>${game.away} @ ${game.home}</h4>
      <p>${game.status.toUpperCase()}</p>
    `;
    wrap.appendChild(item);
  });
}

function renderAuth() {
  setView("auth");
  const authStage = document.getElementById("authStage");
  authStage.innerHTML = `
    <h3 class="section-title">Choose Your Name</h3>
    <p class="subtle">Create a PIN the first time. Enter it after that.</p>
    <div id="userButtons" class="btn-grid mt-16"></div>
  `;

  const userButtons = document.getElementById("userButtons");
  APP.state.users.forEach(user => {
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = user.name;
    btn.addEventListener("click", () => {
      const pins = getPins();
      if (pins[user.id]) {
        renderPinEntry(user);
      } else {
        renderPinCreate(user);
      }
    });
    userButtons.appendChild(btn);
  });
}

function renderPinCreate(user) {
  const authStage = document.getElementById("authStage");
  authStage.innerHTML = `
    <h3 class="section-title">Create PIN</h3>
    <p class="subtle">${user.name}, create then confirm your 4-digit PIN.</p>
    <div class="stack mt-16">
      <input id="pin1" class="input" maxlength="4" placeholder="Create PIN" />
      <input id="pin2" class="input" maxlength="4" placeholder="Confirm PIN" />
      <div class="btn-grid">
        <button id="backUsersBtn" class="btn secondary" type="button">Back</button>
        <button id="confirmPinCreateBtn" class="btn primary" type="button">Confirm</button>
      </div>
    </div>
  `;

  document.getElementById("backUsersBtn").addEventListener("click", renderAuth);
  document.getElementById("confirmPinCreateBtn").addEventListener("click", () => {
    const pin1 = document.getElementById("pin1").value.trim();
    const pin2 = document.getElementById("pin2").value.trim();
    if (!/^\d{4}$/.test(pin1)) {
      toast("PIN must be 4 digits");
      return;
    }
    if (pin1 !== pin2) {
      toast("PINs do not match");
      return;
    }
    const pins = getPins();
    pins[user.id] = pin1;
    savePins(pins);
    login(user.id);
  });
}

function renderPinEntry(user) {
  const authStage = document.getElementById("authStage");
  authStage.innerHTML = `
    <h3 class="section-title">Enter PIN</h3>
    <p class="subtle">${user.name}, enter your PIN.</p>
    <div class="stack mt-16">
      <input id="pinEntry" class="input" maxlength="4" placeholder="Enter PIN" />
      <div class="btn-grid">
        <button id="backUsersBtn" class="btn secondary" type="button">Back</button>
        <button id="confirmPinEntryBtn" class="btn primary" type="button">Enter</button>
      </div>
    </div>
  `;

  document.getElementById("backUsersBtn").addEventListener("click", renderAuth);
  document.getElementById("confirmPinEntryBtn").addEventListener("click", () => {
    const entered = document.getElementById("pinEntry").value.trim();
    const pins = getPins();
    if (pins[user.id] !== entered) {
      toast("Wrong PIN");
      return;
    }
    login(user.id);
  });
}

function login(userId) {
  APP.state.currentUser = userId;
  const user = getCurrentUser();

  document.getElementById("logoutBtn").classList.remove("hidden");
  document.querySelectorAll(".admin-only").forEach(el => {
    if (user.admin) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
  document.getElementById("topAdminBtn").classList.toggle("hidden", !user.admin);

  renderHome();
  renderGamesBoard();
  renderMyBets();
  renderBankroll();
  renderLeaderboard();
  renderCreatealay();
  renderAdmin();
  setView("home");
}

function logout() {
  APP.state.currentUser = null;
  APP.state.betSlip.legs = [];
  APP.state.betSlip.stake = 0;
  APP.ui.currentGameId = null;
  APP.ui.createalayGameId = null;
  APP.ui.createalayMarket = null;
  APP.ui.createalayLegId = null;
  document.getElementById("logoutBtn").classList.add("hidden");
  document.querySelectorAll(".admin-only").forEach(el => el.classList.add("hidden"));
  renderAuth();
}

function renderHome() {
  const user = getCurrentUser();
  if (!user) return;

  document.getElementById("homeUserName").textContent = user.name;
  document.getElementById("homeBankroll").textContent = money(user.bankroll);
  document.getElementById("homeOpenBets").textContent = String(user.openBets);
  document.getElementById("homeWeeklyLeft").textContent = money(APP.state.rules.maxWeekly - user.wagered);

  const homeGames = document.getElementById("homeGames");
  homeGames.innerHTML = "";
  APP.state.games.forEach(game => {
    homeGames.appendChild(buildGameCard(game));
  });

  const trendingProps = document.getElementById("trendingProps");
  trendingProps.innerHTML = "";
  APP.state.props.slice(0, 8).forEach(prop => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = `${prop.player} • ${prop.market}`;
    trendingProps.appendChild(chip);
  });
}

function buildGameCard(game) {
  const wrap = document.createElement("div");
  wrap.className = "card pad";

  wrap.innerHTML = `
    <div class="section-head">
      <div>
        <h3>${game.away} @ ${game.home}</h3>
        <div class="subtle">Status: ${game.status.toUpperCase()}</div>
      </div>
      <div class="chip">${game.userGame ? "Tracked" : "Other"}</div>
    </div>

    <div class="fanduel-board mt-12">
      <div class="fd-header">
        <div>Matchup</div>
        <div>Spread</div>
        <div>Moneyline</div>
        <div>Total</div>
      </div>
      <div class="fd-row">
        <div>${game.away}</div>
        <div>${game.lines.spreadAway}</div>
        <div>${game.lines.mlAway}</div>
        <div>O ${game.lines.totalOver}</div>
      </div>
      <div class="fd-row">
        <div>${game.home}</div>
        <div>${game.lines.spreadHome}</div>
        <div>${game.lines.mlHome}</div>
        <div>U ${game.lines.totalUnder}</div>
      </div>
    </div>

    <div class="chip-row mt-12">
      <button class="btn primary" type="button">Open Game</button>
      <button class="btn secondary" type="button">Createalay</button>
    </div>
  `;

  const [openBtn, createalayBtn] = wrap.querySelectorAll("button");
  openBtn.addEventListener("click", () => openModal(game.id));
  createalayBtn.addEventListener("click", () => {
    APP.ui.createalayGameId = game.id;
    APP.ui.createalayMarket = null;
    APP.ui.createalayLegId = null;
    renderCreatealay();
    setView("createalay");
  });

  return wrap;
}

function renderGamesBoard() {
  const wrap = document.getElementById("gamesBoard");
  wrap.innerHTML = "";

  let games = [...APP.state.games];
  if (APP.ui.gameFilter === "open") {
    games = games.filter(g => g.status === "open");
  } else if (APP.ui.gameFilter === "closed") {
    games = games.filter(g => g.status === "closed");
  }

  games.forEach(game => {
    wrap.appendChild(buildGameCard(game));
  });
}

function openModal(gameId) {
  APP.ui.currentGameId = gameId;
  const game = getGame(gameId);
  const props = getPropsForGame(gameId);

  document.getElementById("modalTitle").textContent = `${game.away} @ ${game.home}`;

  const linesWrap = document.getElementById("modalMainLines");
  linesWrap.innerHTML = `
    <div class="fd-row">
      <div>${game.away}</div>
      <div><button class="btn secondary modal-line-btn" data-label="${game.away} ${game.lines.spreadAway}" data-odds="${game.lines.spreadAway}">${game.lines.spreadAway}</button></div>
      <div><button class="btn secondary modal-line-btn" data-label="${game.away} ML ${game.lines.mlAway}" data-odds="${game.lines.mlAway}">${game.lines.mlAway}</button></div>
      <div><button class="btn secondary modal-line-btn" data-label="Over ${game.lines.totalOver}" data-odds="-110">O ${game.lines.totalOver}</button></div>
    </div>
    <div class="fd-row">
      <div>${game.home}</div>
      <div><button class="btn secondary modal-line-btn" data-label="${game.home} ${game.lines.spreadHome}" data-odds="${game.lines.spreadHome}">${game.lines.spreadHome}</button></div>
      <div><button class="btn secondary modal-line-btn" data-label="${game.home} ML ${game.lines.mlHome}" data-odds="${game.lines.mlHome}">${game.lines.mlHome}</button></div>
      <div><button class="btn secondary modal-line-btn" data-label="Under ${game.lines.totalUnder}" data-odds="-110">U ${game.lines.totalUnder}</button></div>
    </div>
  `;

  linesWrap.querySelectorAll(".modal-line-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      addLeg({
        id: `line-${btn.dataset.label}`,
        label: btn.dataset.label,
        odds: btn.dataset.odds
      });
    });
  });

  const modalProps = document.getElementById("modalProps");
  modalProps.innerHTML = "";

  props.forEach(prop => {
    const row = document.createElement("div");
    row.className = "list-item";
    row.innerHTML = `
      <h4>${prop.label}</h4>
      <p>${safeOddsDisplay(prop.odds)}</p>
    `;
    row.addEventListener("click", () => {
      addLeg({
        id: prop.id,
        label: prop.label,
        odds: prop.odds
      });
    });
    modalProps.appendChild(row);
  });

  document.getElementById("gameModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("gameModal").classList.add("hidden");
}

function renderMyBets() {
  const user = getCurrentUser();
  const wrap = document.getElementById("myBetsList");
  wrap.innerHTML = "";

  if (!user) return;

  const bets = getBetsForUser(user.name);
  if (!bets.length) {
    wrap.innerHTML = `<div class="empty-state">No bets yet.</div>`;
    return;
  }

  bets.forEach(bet => {
    const card = document.createElement("div");
    card.className = "card pad";
    card.innerHTML = `
      <div class="section-head">
        <div>
          <h4>${bet.id}</h4>
          <div class="subtle">${bet.type}</div>
        </div>
        <div class="pill ${bet.status}">${bet.status}</div>
      </div>
      <div class="stats-grid mt-12">
        <div class="stat-box">
          <div class="k">Stake</div>
          <div class="v">${money(bet.stake)}</div>
        </div>
        <div class="stat-box">
          <div class="k">Odds</div>
          <div class="v">${bet.odds}</div>
        </div>
      </div>
      <div class="stack mt-16">
        ${bet.legs.map(leg => `<div class="bet-leg"><div class="bet-leg-title">${leg}</div></div>`).join("")}
      </div>
    `;
    wrap.appendChild(card);
  });
}

function renderBankroll() {
  const body = document.getElementById("bankrollBody");
  body.innerHTML = "";
  APP.state.users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${money(user.start)}</td>
      <td>${money(user.wagered)}</td>
      <td>${money(user.bankroll)}</td>
      <td>${user.openBets}</td>
    `;
    body.appendChild(row);
  });
}

function renderLeaderboard() {
  const wrap = document.getElementById("leaderboardList");
  wrap.innerHTML = "";
  const users = [...APP.state.users].sort((a, b) => b.bankroll - a.bankroll);
  users.forEach((user, index) => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
      <h4>#${index + 1} ${user.name}</h4>
      <p>${user.team} • ${money(user.bankroll)}</p>
    `;
    wrap.appendChild(item);
  });
}

function renderCreatealay() {
  const gamesWrap = document.getElementById("createalayGames");
  const marketsWrap = document.getElementById("createalayMarkets");
  const legsWrap = document.getElementById("createalayLegs");
  const output = document.getElementById("createalayOutput");

  gamesWrap.innerHTML = "";
  marketsWrap.innerHTML = "";
  legsWrap.innerHTML = "";

  APP.state.games.forEach(game => {
    const btn = document.createElement("button");
    btn.className = "btn secondary";
    btn.textContent = `${game.away} @ ${game.home}${game.status === "closed" ? " (Closed)" : ""}`;
    btn.disabled = game.status === "closed";
    btn.addEventListener("click", () => {
      APP.ui.createalayGameId = game.id;
      APP.ui.createalayMarket = null;
      APP.ui.createalayLegId = null;
      renderCreatealay();
    });
    gamesWrap.appendChild(btn);
  });

  if (!APP.ui.createalayGameId) {
    output.innerHTML = `<p>Select a game first.</p>`;
    return;
  }

  const props = getPropsForGame(APP.ui.createalayGameId);
  const markets = [...new Set(props.map(p => p.market))];

  markets.forEach(market => {
    const btn = document.createElement("button");
    btn.className = "btn secondary";
    btn.textContent = market;
    btn.addEventListener("click", () => {
      APP.ui.createalayMarket = market;
      APP.ui.createalayLegId = null;
      renderCreatealay();
    });
    marketsWrap.appendChild(btn);
  });

  if (!APP.ui.createalayMarket) {
    output.innerHTML = `<p>Select a market.</p>`;
    return;
  }

  const legs = props.filter(p => p.market === APP.ui.createalayMarket);
  legs.forEach(leg => {
    const btn = document.createElement("button");
    btn.className = "btn secondary";
    btn.textContent = `${leg.player} • ${leg.line ?? ""} • ${safeOddsDisplay(leg.odds)}`.trim();
    btn.addEventListener("click", () => {
      APP.ui.createalayLegId = leg.id;
      output.innerHTML = `
        <h4>${leg.label}</h4>
        <p class="mt-8">Suggested Odds: ${safeOddsDisplay(leg.odds)}</p>
        <div class="mt-12">
          <button id="addCreatealayBtn" class="btn primary" type="button">Add To Slip</button>
        </div>
      `;
      document.getElementById("addCreatealayBtn").addEventListener("click", () => {
        addLeg({
          id: leg.id,
          label: leg.label,
          odds: leg.odds
        });
        toast("Createalay leg added");
      });
    });
    legsWrap.appendChild(btn);
  });

  if (!APP.ui.createalayLegId) {
    output.innerHTML = `<p>Select a leg.</p>`;
  }
}

function toggleSlip(show) {
  document.getElementById("betSlipPanel").classList.toggle("hidden", !show);
  renderSlip();
}

function addLeg(leg) {
  if (APP.state.betSlip.legs.some(l => l.id === leg.id)) {
    toast("Leg already added");
    return;
  }
  APP.state.betSlip.legs.push(leg);
  renderSlip();
  toggleSlip(true);
}

function clearSlip() {
  APP.state.betSlip.legs = [];
  APP.state.betSlip.stake = 0;
  document.getElementById("stakeInput").value = "";
  renderSlip();
}

function renderSlip() {
  const wrap = document.getElementById("betSlipLegs");
  const stakeInput = document.getElementById("stakeInput");
  const betType = document.getElementById("betTypeSelect").value;
  const stake = Number(stakeInput.value || 0);

  APP.state.betSlip.betType = betType;
  APP.state.betSlip.stake = stake;

  wrap.innerHTML = "";

  if (!APP.state.betSlip.legs.length) {
    wrap.className = "stack empty-state";
    wrap.textContent = "No legs added yet.";
  } else {
    wrap.className = "stack";
    APP.state.betSlip.legs.forEach(leg => {
      const item = document.createElement("div");
      item.className = "bet-leg";
      item.innerHTML = `
        <div class="bet-leg-title">${leg.label}</div>
        <div class="bet-leg-copy">${safeOddsDisplay(leg.odds)}</div>
      `;
      wrap.appendChild(item);
    });
  }

  const combined = combinedAmericanOdds(APP.state.betSlip.legs);
  document.getElementById("slipOdds").textContent = combined;
  document.getElementById("slipPayout").textContent = money(calculatePayout(stake, Number(combined)));
}

function placeBet() {
  const user = getCurrentUser();
  if (!user) return;

  const legs = APP.state.betSlip.legs;
  const stake = APP.state.betSlip.stake;
  const betType = APP.state.betSlip.betType;

  if (legs.length < APP.state.rules.minLegs) {
    toast("Need at least 2 legs");
    return;
  }

  if (betType === "season" && !APP.state.rules.seasonParlaysAllowed) {
    toast("Season parlays are closed");
    return;
  }

  const maxLegs = betType === "season"
    ? APP.state.rules.maxSeasonLegs
    : APP.state.rules.maxWeeklyLegs;

  if (legs.length > maxLegs) {
    toast(`Too many legs for ${betType}`);
    return;
  }

  if (!stake || stake > APP.state.rules.maxParlay) {
    toast("Invalid stake");
    return;
  }

  if (stake > user.bankroll) {
    toast("Not enough bankroll");
    return;
  }

  const combined = combinedAmericanOdds(legs);
  const payout = calculatePayout(stake, Number(combined));

  APP.state.bets.push({
    id: `BET-${String(APP.state.bets.length + 1).padStart(3, "0")}`,
    user: user.name,
    type: betType === "sgp" ? "Same Game Parlay" : `${betType[0].toUpperCase()}${betType.slice(1)} Parlay`,
    stake,
    status: "open",
    odds: combined,
    payout,
    legs: legs.map(l => l.label)
  });

  user.bankroll -= stake;
  user.wagered += stake;
  user.openBets += 1;

  APP.state.betSlip.legs = [];
  APP.state.betSlip.stake = 0;
  document.getElementById("stakeInput").value = "";

  renderHome();
  renderMyBets();
  renderBankroll();
  renderLeaderboard();
  renderSlip();
  toast("Bet placed");
}

function renderAdmin() {
  if (!isAdmin()) return;

  const betSelect = document.getElementById("adminBetSelect");
  betSelect.innerHTML = "";
  APP.state.bets.forEach(bet => {
    const opt = document.createElement("option");
    opt.value = bet.id;
    opt.textContent = `${bet.id} • ${bet.user} • ${bet.status}`;
    betSelect.appendChild(opt);
  });

  const gamesWrap = document.getElementById("adminGamesList");
  gamesWrap.innerHTML = "";
  APP.state.games.forEach(game => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
      <h4>${game.away} @ ${game.home}</h4>
      <p>Status: ${game.status}</p>
    `;

    const row = document.createElement("div");
    row.className = "chip-row mt-12";

    const openBtn = document.createElement("button");
    openBtn.className = "btn good";
    openBtn.textContent = "Open";
    openBtn.addEventListener("click", () => {
      game.status = "open";
      renderGamesBoard();
      renderCreatealay();
      renderAdmin();
      logCommand(`Opened ${game.away} @ ${game.home}`);
    });

    const closeBtn = document.createElement("button");
    closeBtn.className = "btn bad";
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", () => {
      game.status = "closed";
      renderGamesBoard();
      renderCreatealay();
      renderAdmin();
      logCommand(`Closed ${game.away} @ ${game.home}`);
    });

    row.appendChild(openBtn);
    row.appendChild(closeBtn);
    item.appendChild(row);
    gamesWrap.appendChild(item);
  });

  renderCommandLog();
}

function gradeBet(result) {
  if (!isAdmin()) return;
  const select = document.getElementById("adminBetSelect");
  const bet = APP.state.bets.find(b => b.id === select.value);
  if (!bet) return;

  const user = APP.state.users.find(u => u.name === bet.user);
  bet.status = result;

  if (user) {
    if (result === "win") {
      user.bankroll += bet.payout;
    } else if (result === "push" || result === "void") {
      user.bankroll += bet.stake;
    }
    user.openBets = Math.max(0, user.openBets - 1);
  }

  renderHome();
  renderMyBets();
  renderBankroll();
  renderLeaderboard();
  renderAdmin();
  logCommand(`Marked ${bet.id} as ${result.toUpperCase()}`);
  toast(`${bet.id} marked ${result}`);
}

function applyCommandBoard() {
  if (!isAdmin()) return;
  const raw = document.getElementById("commandInput").value.trim();
  if (!raw) {
    toast("Paste a command first");
    return;
  }

  let cmd;
  try {
    cmd = JSON.parse(raw);
  } catch {
    toast("Invalid JSON");
    return;
  }

  if (cmd.type === "updateBankroll") {
    const user = APP.state.users.find(u => u.name === cmd.user);
    if (user && typeof cmd.amount === "number") {
      user.bankroll = cmd.amount;
      logCommand(`Updated bankroll for ${cmd.user} to ${cmd.amount}`);
    }
  }

  if (cmd.type === "closeGame") {
    const game = getGame(cmd.gameId);
    if (game) {
      game.status = "closed";
      logCommand(`Closed ${game.away} @ ${game.home}`);
    }
  }

  if (cmd.type === "openGame") {
    const game = getGame(cmd.gameId);
    if (game) {
      game.status = "open";
      logCommand(`Opened ${game.away} @ ${game.home}`);
    }
  }

  if (cmd.type === "addProp" && cmd.prop) {
    APP.state.props.push(cmd.prop);
    logCommand(`Added prop ${cmd.prop.label}`);
  }

  if (cmd.type === "removeProp" && cmd.propId) {
    APP.state.props = APP.state.props.filter(p => p.id !== cmd.propId);
    logCommand(`Removed prop ${cmd.propId}`);
  }

  document.getElementById("commandInput").value = "";
  renderGamesBoard();
  renderCreatealay();
  renderBankroll();
  renderHome();
  renderAdmin();
  toast("Command applied");
}

function logCommand(message) {
  APP.state.commandCenter.log.unshift({
    id: Date.now(),
    message
  });
  renderCommandLog();
}

function renderCommandLog() {
  const wrap = document.getElementById("commandLog");
  wrap.innerHTML = "";
  if (!APP.state.commandCenter.log.length) {
    wrap.innerHTML = `<div class="empty-state">No command log yet.</div>`;
    return;
  }

  APP.state.commandCenter.log.slice(0, 10).forEach(item => {
    const row = document.createElement("div");
    row.className = "list-item";
    row.innerHTML = `<h4>${item.message}</h4>`;
    wrap.appendChild(row);
  });
}

function init() {
  renderAppShell();
  renderAuth();
}

init();
