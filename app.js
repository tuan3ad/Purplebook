let db = null;
let selectedGameId = null;
let betSlip = [];

fetch("data.json")
  .then((r) => r.json())
  .then((data) => {
    db = data;
    renderAll();
  });

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    showPage(btn.dataset.page);
  });
});

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

function renderAll() {
  renderBankroll();
  renderGames();
  renderBetSlip();
  renderBets();
  renderLeaderboard();
  renderProps();
}

function renderBankroll() {
  const tuane = db.users.find((u) => u.name === "Tuane");
  document.getElementById("bankrollDisplay").textContent = `$${tuane.bankroll}`;
}

function renderGames() {
  const wrap = document.getElementById("gamesList");
  wrap.innerHTML = "";
  db.games.forEach((game) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="game-top">
        <span class="game-id">${game.id}</span>
        <span class="status-chip">${game.type}</span>
      </div>
      <div class="matchup">${game.away} @ ${game.home}</div>
      <div class="sub">${game.note}</div>
      <button onclick="openGame('${game.id}')">Open Props</button>
    `;
    wrap.appendChild(el);
  });
}

function openGame(gameId) {
  selectedGameId = gameId;
  const game = db.games.find((g) => g.id === gameId);
  document.getElementById("selectedGameBanner").textContent = `${game.away} @ ${game.home}`;
  renderProps();
  showPage("parlay");
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
  document.querySelector('[data-page="parlay"]').classList.add("active");
}

function renderProps() {
  const wrap = document.getElementById("propList");
  if (!wrap) return;
  wrap.innerHTML = "";
  const props = db.props.filter((p) => p.gameId === selectedGameId);
  if (!selectedGameId) {
    wrap.innerHTML = '<div class="card">Pick a game first from the Games page.</div>';
    return;
  }
  if (!props.length) {
    wrap.innerHTML = '<div class="card">No props yet for this game.</div>';
    return;
  }

  props.forEach((prop) => {
    const el = document.createElement("div");
    el.className = "prop-row";
    el.innerHTML = `
      <div class="prop-meta">
        <strong>${prop.player}</strong>
        <span>${prop.stat} ${prop.line}</span>
        <span class="meta-small">${prop.id}</span>
      </div>
      <button onclick="addLeg('${prop.id}')">${prop.odds}</button>
    `;
    wrap.appendChild(el);
  });
}

function addLeg(propId) {
  const prop = db.props.find((p) => p.id === propId);
  if (!prop) return;
  betSlip.push(prop);
  renderBetSlip();
}

function removeLeg(index) {
  betSlip.splice(index, 1);
  renderBetSlip();
}

function americanToDecimal(odds) {
  const n = Number(String(odds).replace("+", ""));
  if (n > 0) return 1 + (n / 100);
  return 1 + (100 / Math.abs(n));
}

function combinedAmericanOdds(legs) {
  if (!legs.length) return "—";
  const decimal = legs.reduce((acc, leg) => acc * americanToDecimal(leg.odds), 1);
  const american = decimal >= 2
    ? Math.round((decimal - 1) * 100)
    : Math.round(-100 / (decimal - 1));
  return american > 0 ? `+${american}` : `${american}`;
}

function renderBetSlip() {
  const wrap = document.getElementById("betSlip");
  wrap.innerHTML = "";

  if (!betSlip.length) {
    wrap.innerHTML = '<div class="card">No legs added yet.</div>';
    return;
  }

  betSlip.forEach((leg, index) => {
    const el = document.createElement("div");
    el.className = "bet-row";
    el.innerHTML = `
      <div class="bet-meta">
        <strong>${leg.player}</strong>
        <span>${leg.stat} ${leg.line}</span>
        <span class="meta-small">${leg.odds}</span>
      </div>
      <button onclick="removeLeg(${index})">Remove</button>
    `;
    wrap.appendChild(el);
  });

  const total = document.createElement("div");
  total.className = "card";
  total.innerHTML = `
    <strong>Combined Odds: ${combinedAmericanOdds(betSlip)}</strong>
    <div class="sub" style="margin-top:8px;">Demo SGP builder locked in.</div>
  `;
  wrap.appendChild(total);
}

function renderBets() {
  const wrap = document.getElementById("betsList");
  wrap.innerHTML = "";
  db.openBets.forEach((bet) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="game-top">
        <strong>${bet.id}</strong>
        <span class="status-chip">${bet.status}</span>
      </div>
      <div class="sub">${bet.user} • Stake $${bet.stake} • Odds ${bet.odds}</div>
      <div>${bet.legs.join("<br>")}</div>
    `;
    wrap.appendChild(el);
  });
}

function renderLeaderboard() {
  const wrap = document.getElementById("leaderboardList");
  wrap.innerHTML = "";
  db.users.forEach((user) => {
    const el = document.createElement("div");
    el.className = "leader-row";
    el.innerHTML = `
      <div class="prop-meta">
        <strong>${user.name}</strong>
        <span class="meta-small">Start ${user.start}</span>
      </div>
      <strong>$${user.bankroll}</strong>
    `;
    wrap.appendChild(el);
  });
}

function addProp() {
  const gameId = document.getElementById("gameId").value.trim();
  const player = document.getElementById("player").value.trim();
  const stat = document.getElementById("stat").value.trim();
  const line = document.getElementById("line").value.trim();
  const odds = document.getElementById("odds").value.trim();

  if (!gameId || !player || !stat || !line || !odds) {
    alert("Fill out every prop field.");
    return;
  }

  db.props.push({
    id: "p" + Date.now(),
    gameId,
    player,
    stat,
    line,
    odds
  });

  alert("Prop added.");
  renderProps();
}

function updateBankroll() {
  const userName = document.getElementById("userName").value.trim().toLowerCase();
  const newBankroll = Number(document.getElementById("newBankroll").value.trim());

  const user = db.users.find((u) => u.name.toLowerCase() === userName);
  if (!user || Number.isNaN(newBankroll)) {
    alert("Check the name and bankroll.");
    return;
  }

  user.bankroll = newBankroll;
  renderBankroll();
  renderLeaderboard();
  alert("Bankroll updated.");
}

function settleBet(result) {
  const betId = document.getElementById("betId").value.trim();
  const bet = db.openBets.find((b) => b.id === betId);
  if (!bet) {
    alert("Bet not found.");
    return;
  }
  bet.status = result.toUpperCase();
  renderBets();
  alert(`Bet ${betId} marked ${result}.`);
}
