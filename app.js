const STORAGE_KEY = "purple_book_state_v3";
const ADMIN_PIN = "7651";

const baseWeekly = [
  { id:"WK4-1", week:4, team:"Jets", user:"Des", matchup:"Jets @ Panthers", category:"Passing", target:"Jaxson Dart", label:"Over 249.5 Passing Yards", line:"249.5", odds:"-125", disallowUsers:["Des"] },
  { id:"WK4-2", week:4, team:"Jets", user:"Des", matchup:"Jets @ Panthers", category:"Passing", target:"Jaxson Dart", label:"Over 2.5 Passing TD", line:"2.5", odds:"+115", disallowUsers:["Des"] },
  { id:"WK4-3", week:4, team:"Jets", user:"Des", matchup:"Jets @ Panthers", category:"Rushing", target:"Cam Skattebo", label:"Over 59.5 Rushing Yards", line:"59.5", odds:"-120", disallowUsers:["Des"] },
  { id:"WK4-4", week:4, team:"Bills", user:"Rob", matchup:"Bills vs Patriots", category:"Passing", target:"Justin Fields", label:"Over 1.5 Passing TD", line:"1.5", odds:"-120", disallowUsers:["Rob"] },
  { id:"WK4-5", week:4, team:"Bills", user:"Rob", matchup:"Bills vs Patriots", category:"Rushing", target:"Trey Benson", label:"Under 13.5 Rushing Attempts", line:"13.5", odds:"-115", disallowUsers:["Rob"] },
  { id:"WK4-6", week:4, team:"Bills", user:"Rob", matchup:"Bills vs Patriots", category:"Receiving", target:"Kyle Pitts", label:"Anytime TD", line:"ATTD", odds:"+145", disallowUsers:["Rob"] },
  { id:"WK4-7", week:4, team:"Bills", user:"Rob", matchup:"Bills vs Patriots", category:"Defense", target:"Bills Defense", label:"Over 1.5 Sacks", line:"1.5", odds:"+105", disallowUsers:["Rob"] },
  { id:"WK4-8", week:4, team:"Saints", user:"Don", matchup:"Saints @ Falcons", category:"Team", target:"Panthers", label:"Panthers Moneyline", line:"ML", odds:"-110", disallowUsers:[] },
  { id:"WK4-9", week:4, team:"Saints", user:"Don", matchup:"Saints @ Falcons", category:"Rushing", target:"Derrick Henry", label:"Over 2.5 Rushing Attempts", line:"2.5", odds:"-260", disallowUsers:["Don"] },
  { id:"WK4-10", week:4, team:"Saints", user:"Don", matchup:"Saints @ Falcons", category:"Defense", target:"Jonas Sanker", label:"Over 1.5 Tackles", line:"1.5", odds:"-210", disallowUsers:["Don"] },
  { id:"WK4-11", week:4, team:"Falcons", user:"Romeo", matchup:"Saints @ Falcons", category:"Team", target:"Falcons", label:"Moneyline", line:"ML", odds:"+125", disallowUsers:["Romeo"] },
  { id:"WK4-12", week:4, team:"Falcons", user:"Romeo", matchup:"Saints @ Falcons", category:"Defense", target:"Falcons Defense", label:"Over 1.5 Sacks", line:"1.5", odds:"+115", disallowUsers:["Romeo"] },
  { id:"WK4-13", week:4, team:"Falcons", user:"Romeo", matchup:"Saints @ Falcons", category:"Defense", target:"Jonas Sanker", label:"Over 3.5 Tackles", line:"3.5", odds:"+110", disallowUsers:["Romeo"] }
];
const baseSeason = [
  { id:"SEA-1", week:"Season", team:"Jets", user:"Des", matchup:"Season Markets", category:"Season", target:"Jets", label:"Make Playoffs", line:"Yes", odds:"-190", disallowUsers:["Des"] },
  { id:"SEA-2", week:"Season", team:"Buccaneers", user:"Tuane", matchup:"Season Markets", category:"Season", target:"Buccaneers", label:"Make Playoffs", line:"Yes", odds:"-165", disallowUsers:["Tuane"] },
  { id:"SEA-3", week:"Season", team:"Saints", user:"Don", matchup:"Season Markets", category:"Season", target:"Saints", label:"Under 12.5 Wins", line:"12.5", odds:"-115", disallowUsers:["Don"] }
];
const initialState = {
  currentWeek: 4,
  users: [
    { name:"Tuane", team:"Buccaneers", role:"commissioner", displayName:"Tuane", pinSet:false, pin:"", bankroll:1000, wins:0, losses:0, pushes:0, voids:0, totalWagered:0, totalProfit:0 },
    { name:"Des", team:"Jets", role:"user", displayName:"Des", pinSet:false, pin:"", bankroll:1000, wins:0, losses:0, pushes:0, voids:0, totalWagered:0, totalProfit:0 },
    { name:"Rob", team:"Bills", role:"user", displayName:"Rob", pinSet:false, pin:"", bankroll:1000, wins:0, losses:0, pushes:0, voids:0, totalWagered:0, totalProfit:0 },
    { name:"Romeo", team:"Falcons", role:"user", displayName:"Romeo", pinSet:false, pin:"", bankroll:1000, wins:0, losses:0, pushes:0, voids:0, totalWagered:0, totalProfit:0 },
    { name:"Don", team:"Saints", role:"user", displayName:"Don", pinSet:false, pin:"", bankroll:1000, wins:0, losses:0, pushes:0, voids:0, totalWagered:0, totalProfit:0 }
  ],
  weeklyMarkets: structuredClone(baseWeekly),
  seasonMarkets: structuredClone(baseSeason),
  bets: [
    { id:"BET-001", user:"Tuane", week:1, type:"Parlay", legs:["Jets ML","Cardinals ML","Jaxson Dart Over Passing Yards"], odds:"+420", stake:100, payout:520, status:"Won", createdAt:"Week 1", notes:"Only confirmed winning bet so far." },
    { id:"BET-002", user:"Tuane", week:1, type:"Parlay", legs:["Lamar Jackson Over INT","Jaxson Dart Under INT","Trey Benson Under Rushing Yards"], odds:"+560", stake:150, payout:0, status:"Lost", createdAt:"Week 1", notes:"Lost." },
    { id:"BET-003", user:"Don", week:1, type:"Parlay", legs:["Week 1 Don Slip"], odds:"+0", stake:20, payout:20, status:"Void", createdAt:"Week 1", notes:"Week 1 voided." },
    { id:"BET-004", user:"Don", week:2, type:"League Ruling", legs:["Forced Week 2 Loss"], odds:"+0", stake:0, payout:0, status:"Lost", createdAt:"Week 2", notes:"Cheat ruling." },
    { id:"BET-005", user:"Tuane", week:4, type:"Parlay", legs:["Justin Fields Over 1.5 Passing TD","Kyle Pitts Anytime TD","Panthers Moneyline"], odds:"+705", stake:150, payout:1207.50, status:"Pending", createdAt:"Week 4", notes:"Locked in before app build." },
    { id:"BET-006", user:"Tuane", week:4, type:"Parlay", legs:["Bills Over 1.5 Sacks","Derrick Henry Over 2.5 Rushing Attempts","Jonas Sanker Over 1.5 Tackles"], odds:"+236", stake:50, payout:168.00, status:"Pending", createdAt:"Week 4", notes:"Locked in before app build." }
  ],
  rules: [
    "Each user starts with $1000 bankroll.",
    "Users cannot bet on their own team for weekly bets.",
    "Pending bets are private; users only see their own slips.",
    "Weekly parlays max 5 legs, max $350 stake, min $10 stake.",
    "Season parlays max 4 legs, max $400 stake, min $10 stake.",
    "Season bets lock after the end of Week 3.",
    "2-point conversions do not count as touchdowns.",
    "Official Madden stats settle props.",
    "Admin can manually mark Win / Loss / Void / Push.",
    "Week 1 Don bets voided. Week 2 Don forced loss by league ruling."
  ]
};

let state = loadState();
let currentUser = null;
let currentPage = "homePage";
let currentMode = "weekly";
let currentFilter = "all";
let slip = [];

function loadState(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(initialState); } catch(e){ return structuredClone(initialState); } }
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function $(id){ return document.getElementById(id); }
function userByName(name){ return state.users.find(u => u.name === name); }
function parseOdds(odds){ return Number(String(odds).replace("+","")); }
function formatMoney(n){ return `$${Number(n).toFixed(2)}`; }
function combineOdds(legs){
  if(!legs.length) return null;
  let dec = 1;
  for(const leg of legs){
    const odds = String(leg.odds);
    const n = parseOdds(odds);
    dec *= odds.startsWith("+") ? (1 + n/100) : (1 + 100/Math.abs(n));
  }
  const am = dec >= 2 ? Math.round((dec - 1) * 100) : Math.round(-100 / (dec - 1));
  return am >= 0 ? `+${am}` : `${am}`;
}
function payout(stake, odds){
  const n = parseOdds(odds);
  return odds.startsWith("+") ? +(stake + (stake * n / 100)).toFixed(2) : +(stake + (stake * 100 / Math.abs(n))).toFixed(2);
}
function recalcUsers(){
  state.users.forEach(u => {
    u.bankroll = 1000; u.totalWagered = 0; u.totalProfit = 0; u.wins = 0; u.losses = 0; u.pushes = 0; u.voids = 0;
    state.bets.filter(b => b.user === u.name).forEach(b => {
      u.totalWagered += Number(b.stake || 0);
      u.bankroll -= Number(b.stake || 0);
      if(b.status === "Won"){ u.bankroll += Number(b.payout || 0); u.totalProfit += Number(b.payout || 0) - Number(b.stake || 0); u.wins++; }
      if(b.status === "Lost"){ u.totalProfit -= Number(b.stake || 0); u.losses++; }
      if(b.status === "Void"){ u.bankroll += Number(b.stake || 0); u.voids++; }
      if(b.status === "Push"){ u.bankroll += Number(b.stake || 0); u.pushes++; }
    });
  });
}
function statusClass(status){ return {Pending:"pending", Won:"won", Lost:"lost", Void:"void", Push:"push"}[status] || "pending"; }

function renderAuth(){
  const options = state.users.map(u => `<option value="${u.name}">${u.displayName} — ${u.team}</option>`).join("");
  $("authScreen").innerHTML = `
    <div class="auth-card">
      <div class="auth-brand">
        <div class="brand-mark">PB</div>
        <div><div class="brand-title">Purple Book</div><div class="brand-sub">Private Madden League Sportsbook</div></div>
      </div>
      <div class="auth-title">Select your name</div>
      <p class="auth-sub">First login sets your own numeric PIN.</p>
      <div class="field-grid">
        <label class="field-label">User<select id="authUser">${options}</select></label>
        <div id="dynamicAuth"></div>
        <button id="authBtn" class="primary-btn wide">Continue</button>
      </div>
    </div>`;
  const userSelect = $("authUser");
  function paint(){
    const user = userByName(userSelect.value);
    $("dynamicAuth").innerHTML = user.pinSet ? `
      <label class="field-label">Enter PIN
        <input id="loginPin" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="••••" />
      </label>` : `
      <div class="pin-row">
        <label class="field-label">Create PIN
          <input id="createPin" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="••••" />
        </label>
        <label class="field-label">Confirm PIN
          <input id="confirmPin" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="••••" />
        </label>
      </div>
      <div class="tiny-note">Number keypad only like a passcode field.</div>`;
  }
  paint();
  userSelect.onchange = paint;
  $("authBtn").onclick = () => {
    const user = userByName(userSelect.value);
    if(user.pinSet){
      if($("loginPin").value.trim() !== user.pin) return alert("Wrong PIN.");
      currentUser = user.name; openMain();
    } else {
      const a = $("createPin").value.trim(), b = $("confirmPin").value.trim();
      if(!/^\d{4,6}$/.test(a)) return alert("PIN must be 4 to 6 numbers.");
      if(a !== b) return alert("PINs do not match.");
      user.pin = a; user.pinSet = true; saveState(); currentUser = user.name; openMain();
    }
  };
}
function openMain(){
  $("authScreen").classList.add("hidden"); $("authScreen").classList.remove("active");
  $("mainScreen").classList.remove("hidden"); $("mainScreen").classList.add("active");
  renderApp();
}
function logout(){ currentUser = null; $("mainScreen").classList.add("hidden"); $("mainScreen").classList.remove("active"); $("authScreen").classList.remove("hidden"); $("authScreen").classList.add("active"); renderAuth(); }
function markets(){ return currentMode === "weekly" ? state.weeklyMarkets : state.seasonMarkets; }
function canUseMarket(m){ return currentMode !== "weekly" || !(m.disallowUsers || []).includes(currentUser); }

function renderApp(){
  recalcUsers(); saveState();
  $("weekChip").textContent = `Week ${state.currentWeek}`;
  document.querySelectorAll(".nav-btn").forEach(btn => btn.onclick = () => openPage(btn.dataset.page));
  $("logoutBtn").onclick = logout;
  $("adminNavBtn").onclick = () => openPage("adminPage");
  $("clearSlipBtn").onclick = () => { slip = []; renderSlip(); renderSportsbook(); };
  $("submitSlipBtn").onclick = submitSlip;
  renderHome(); renderSportsbook(); renderMyBets(); renderLeaderboard(); renderResults(); renderRules(); renderSlip();
  openPage(currentPage);
}
function openPage(id){
  currentPage = id;
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  $(id).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.page === id));
  if(id === "adminPage") renderAdmin();
}
function renderHome(){
  const me = userByName(currentUser);
  const openBets = state.bets.filter(b => b.user === currentUser && b.status === "Pending").length;
  const leaders = [...state.users].sort((a,b)=>b.bankroll-a.bankroll);
  $("homePage").innerHTML = `
    <div class="section-card">
      <div class="section-title">Welcome back, ${me.displayName}</div>
      <p class="section-sub">${me.team} • FanDuel-style layout with a purple luxury finish.</p>
      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-label">Bankroll</div><div class="kpi-value">${formatMoney(me.bankroll)}</div></div>
        <div class="kpi"><div class="kpi-label">Open Bets</div><div class="kpi-value">${openBets}</div></div>
        <div class="kpi"><div class="kpi-label">Wagered</div><div class="kpi-value">${formatMoney(me.totalWagered)}</div></div>
        <div class="kpi"><div class="kpi-label">Profit</div><div class="kpi-value">${formatMoney(me.totalProfit)}</div></div>
      </div>
    </div>
    <div class="card-grid">
      <div class="quick-card"><h3>Many legs</h3><p>Continuous sportsbook pages full of weekly and season props.</p></div>
      <div class="quick-card"><h3>Private slips</h3><p>Users only see their own pending bets.</p></div>
      <div class="quick-card"><h3>Command workflow</h3><p>You send screenshots, ChatGPT sends JSON commands, Admin pastes them in.</p></div>
      <div class="quick-card"><h3>Manual settling</h3><p>Admin can push Win / Loss / Void / Push for every parlay.</p></div>
    </div>
    <div class="section-card">
      <div class="section-title">Leaderboard preview</div>
      <div class="table-wrap"><table><thead><tr><th>Rank</th><th>User</th><th>Team</th><th>Bankroll</th></tr></thead><tbody>
      ${leaders.map((u,i)=>`<tr><td>#${i+1}</td><td>${u.displayName}</td><td>${u.team}</td><td>${formatMoney(u.bankroll)}</td></tr>`).join("")}
      </tbody></table></div>
    </div>`;
}
function renderSportsbook(){
  const all = markets();
  const teams = [...new Set(all.map(m => m.team))];
  const filtered = all.filter(m => (currentFilter === "all" || m.team === currentFilter));
  $("sportsbookPage").innerHTML = `
    <div class="section-card">
      <div class="section-title">Sportsbook</div>
      <p class="section-sub">Tap odds to add them to the bet slip.</p>
      <div class="filters">
        <button id="weeklyBtn" class="filter-pill ${currentMode === "weekly" ? "active" : ""}">Weekly</button>
        <button id="seasonBtn" class="filter-pill ${currentMode === "season" ? "active" : ""}">Season</button>
      </div>
      <div class="filters">
        <button class="filter-pill ${currentFilter === "all" ? "active" : ""}" data-team="all">All</button>
        ${teams.map(t => `<button class="filter-pill ${currentFilter === t ? "active" : ""}" data-team="${t}">${t}</button>`).join("")}
      </div>
      ${currentMode === "weekly" ? `<div class="notice">Your own team is disabled for weekly betting.</div>` : ""}
    </div>
    <div class="section-card">
      <div class="section-title">${currentMode === "weekly" ? `Week ${state.currentWeek} board` : "Season board"}</div>
      <div class="market-group">
        <div class="market-title">${filtered.length} available legs</div>
        <div class="market-sub">Scroll and tap like a real sportsbook board.</div>
        <div class="market-legs">
          ${filtered.map(m => `
            <button class="odds-btn ${slip.some(x => x.id === m.id) ? "selected" : ""} ${canUseMarket(m) ? "" : "disabled"}" data-id="${m.id}" ${canUseMarket(m) ? "" : "disabled"}>
              <span class="target">${m.target}</span>
              <span class="meta">${m.matchup} • ${m.team} • ${m.category}</span>
              <span class="meta">${m.label}</span>
              <span class="price">${m.odds}</span>
            </button>`).join("")}
        </div>
      </div>
    </div>`;
  $("weeklyBtn").onclick = () => { currentMode = "weekly"; currentFilter = "all"; renderSportsbook(); };
  $("seasonBtn").onclick = () => { currentMode = "season"; currentFilter = "all"; renderSportsbook(); };
  document.querySelectorAll("[data-team]").forEach(btn => btn.onclick = () => { currentFilter = btn.dataset.team; renderSportsbook(); });
  document.querySelectorAll(".odds-btn[data-id]").forEach(btn => btn.onclick = () => toggleLeg(btn.dataset.id));
}
function toggleLeg(id){
  const leg = markets().find(m => m.id === id);
  if(!leg) return;
  const idx = slip.findIndex(x => x.id === id);
  if(idx >= 0) slip.splice(idx,1); else slip.push(leg);
  renderSlip(); renderSportsbook();
}
function renderSlip(){
  $("slipCount").textContent = `${slip.length} picks`;
  $("slipBody").innerHTML = slip.length ? slip.map(s => `
    <div class="slip-item">
      <div class="slip-item-top">
        <div><h4>${s.target}</h4><p>${s.label}</p><p>${s.matchup}</p></div>
        <button class="remove-btn" data-remove="${s.id}">✕</button>
      </div>
      <div class="price">${s.odds}</div>
    </div>`).join("") : `<div class="muted">Tap odds to add legs.</div>`;
  document.querySelectorAll("[data-remove]").forEach(btn => btn.onclick = () => { slip = slip.filter(s => s.id !== btn.dataset.remove); renderSlip(); renderSportsbook(); });
  const stake = Number($("stakeInput").value || 0);
  const odds = combineOdds(slip);
  $("slipOdds").textContent = odds || "—";
  $("slipPayout").textContent = odds && stake >= 10 ? formatMoney(payout(stake, odds)) : "$0.00";
  $("stakeInput").oninput = renderSlip;
}
function submitSlip(){
  if(!slip.length) return alert("Add at least one leg.");
  const stake = Number($("stakeInput").value || 0);
  if(stake < 10) return alert("Minimum stake is $10.");
  const isSeason = currentMode === "season";
  const maxStake = isSeason ? 400 : (slip.length > 1 ? 350 : 150);
  const maxLegs = isSeason ? 4 : 5;
  if(stake > maxStake) return alert(`Max stake is $${maxStake}.`);
  if(slip.length > maxLegs) return alert(`Max ${maxLegs} legs for this bet.`);
  const odds = combineOdds(slip);
  state.bets.push({
    id:`BET-${String(state.bets.length+1).padStart(3,"0")}`,
    user:currentUser,
    week:isSeason ? "Season" : state.currentWeek,
    type:slip.length > 1 ? (isSeason ? "Season Parlay" : "Parlay") : "Single",
    legs:slip.map(s => `${s.target} — ${s.label}`),
    odds,
    stake,
    payout:payout(stake, odds),
    status:"Pending",
    createdAt:isSeason ? "Season" : `Week ${state.currentWeek}`,
    notes:""
  });
  slip = []; $("stakeInput").value = "10"; renderApp(); openPage("myBetsPage"); alert("Bet placed.");
}
function renderMyBets(){
  const bets = state.bets.filter(b => b.user === currentUser).slice().reverse();
  $("myBetsPage").innerHTML = `
    <div class="section-card"><div class="section-title">My Bets</div><div class="table-wrap"><table>
      <thead><tr><th>ID</th><th>Week</th><th>Type</th><th>Legs</th><th>Odds</th><th>Stake</th><th>Payout</th><th>Status</th></tr></thead>
      <tbody>${bets.map(b => `<tr><td>${b.id}</td><td>${b.week}</td><td>${b.type}</td><td>${b.legs.join("<br>")}</td><td>${b.odds}</td><td>${formatMoney(b.stake)}</td><td>${formatMoney(b.payout || 0)}</td><td><span class="badge ${statusClass(b.status)}"><span class="status-dot"></span>${b.status}</span></td></tr>`).join("")}</tbody>
    </table></div></div>`;
}
function renderLeaderboard(){
  const users = [...state.users].sort((a,b)=>b.bankroll-a.bankroll);
  $("leaderboardPage").innerHTML = `
    <div class="section-card"><div class="section-title">Leaderboard</div><div class="table-wrap"><table>
      <thead><tr><th>Rank</th><th>User</th><th>Team</th><th>Bankroll</th><th>P/L</th><th>Wagered</th><th>W-L-P-V</th></tr></thead>
      <tbody>${users.map((u,i)=>`<tr><td>#${i+1}</td><td>${u.displayName}</td><td>${u.team}</td><td>${formatMoney(u.bankroll)}</td><td>${formatMoney(u.totalProfit)}</td><td>${formatMoney(u.totalWagered)}</td><td>${u.wins}-${u.losses}-${u.pushes}-${u.voids}</td></tr>`).join("")}</tbody>
    </table></div></div>`;
}
function renderResults(){
  const done = state.bets.filter(b => b.status !== "Pending").slice().reverse();
  $("resultsPage").innerHTML = `
    <div class="section-card"><div class="section-title">Results</div>
    ${done.map(b => `<div class="result-card"><div class="inline-actions" style="justify-content:space-between;align-items:center"><strong>${b.id} • ${b.user}</strong><span class="badge ${statusClass(b.status)}"><span class="status-dot"></span>${b.status}</span></div><div class="muted">${b.type} • ${b.week} • ${formatMoney(b.stake)} at ${b.odds}</div><div style="margin-top:8px">${b.legs.join(" • ")}</div>${b.notes ? `<div class="tiny-note">${b.notes}</div>` : ""}</div>`).join("")}
    </div>`;
}
function renderRules(){
  $("rulesPage").innerHTML = `<div class="section-card"><div class="section-title">Rules</div>${state.rules.map(r => `<div class="code-sample">${r}</div>`).join("")}</div>`;
}
function settleBet(id, status, notes=""){
  const bet = state.bets.find(b => b.id === id);
  if(!bet) return;
  bet.status = status;
  if(notes) bet.notes = notes;
  recalcUsers(); saveState(); renderApp(); openPage("adminPage"); if($("adminInner") && !$("adminInner").classList.contains("hidden")) renderAdminInner();
}
function renderAdmin(){
  $("adminPage").innerHTML = `
    <div class="section-card">
      <div class="section-title">Admin</div>
      <p class="section-sub">Commissioner only. Use PIN 7651.</p>
      <label class="field-label">Admin PIN<input id="adminPinInput" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="••••"></label>
      <button id="unlockAdmin" class="primary-btn">Unlock Admin</button>
      <div id="adminInner" class="hidden"></div>
    </div>`;
  $("unlockAdmin").onclick = () => {
    if($("adminPinInput").value.trim() !== ADMIN_PIN) return alert("Wrong admin PIN.");
    $("adminInner").classList.remove("hidden");
    renderAdminInner();
  };
}
function renderAdminInner(){
  const pending = state.bets.filter(b => b.status === "Pending").slice().reverse();
  $("adminInner").innerHTML = `
    <div class="admin-grid" style="margin-top:14px">
      <div class="section-card">
        <div class="section-title">Pending bets</div>
        ${pending.length ? pending.map(b => `<div class="result-card"><div class="inline-actions" style="justify-content:space-between;align-items:center"><strong>${b.id} • ${b.user}</strong><span class="badge pending"><span class="status-dot"></span>Pending</span></div><div class="muted">${b.type} • ${b.week} • ${formatMoney(b.stake)} at ${b.odds}</div><div style="margin-top:8px">${b.legs.join(" • ")}</div><div class="inline-actions" style="margin-top:12px"><button class="settle-btn win-btn" data-settle="${b.id}|Won">Win</button><button class="settle-btn loss-btn" data-settle="${b.id}|Lost">Loss</button><button class="settle-btn void-btn" data-settle="${b.id}|Void">Void</button><button class="settle-btn push-btn" data-settle="${b.id}|Push">Push</button></div></div>`).join("") : `<div class="muted">No pending bets.</div>`}
      </div>
      <div class="section-card">
        <div class="section-title">Command center</div>
        <p class="section-sub">Paste JSON from ChatGPT here to generate weekly or season legs and settle results.</p>
        <label class="field-label">Commands<textarea id="commandBox">{
  "commands": [
    {"action":"setWeek","week":4},
    {"action":"addWeeklyMarkets","markets":[]}
  ]
}</textarea></label>
        <div class="inline-actions"><button id="runCommands" class="primary-btn">Run Commands</button><button id="exportState" class="secondary-btn">Export State</button><button id="resetMarkets" class="secondary-btn">Reset Markets</button></div>
        <label class="field-label" style="margin-top:12px">Output<textarea id="outputBox" placeholder="Output shows here"></textarea></label>
        <div class="command-examples">
          <div class="code-sample">{ "action":"addWeeklyMarkets", "markets":[{"id":"WK5-1","week":5,"team":"Jets","user":"Des","matchup":"Jets @ Bills","category":"Passing","target":"Jaxson Dart","label":"Over 279.5 Passing Yards","line":"279.5","odds":"-115","disallowUsers":["Des"]}] }</div>
          <div class="code-sample">{ "action":"settleBet", "betId":"BET-005", "status":"Won", "notes":"Confirmed by screenshots." }</div>
        </div>
      </div>
    </div>`;
  document.querySelectorAll("[data-settle]").forEach(btn => btn.onclick = () => { const [id,status] = btn.dataset.settle.split("|"); settleBet(id, status, "Manual admin settle."); });
  $("runCommands").onclick = runCommands;
  $("exportState").onclick = () => { $("outputBox").value = JSON.stringify(state, null, 2); };
  $("resetMarkets").onclick = () => { state.weeklyMarkets = structuredClone(baseWeekly); state.seasonMarkets = structuredClone(baseSeason); saveState(); renderApp(); openPage("adminPage"); $("outputBox").value = "Base markets restored."; };
}
function runCommands(){
  let payload;
  try { payload = JSON.parse($("commandBox").value); } catch(e){ return alert("Invalid JSON."); }
  const commands = payload.commands || [];
  for(const cmd of commands){
    if(cmd.action === "setWeek") state.currentWeek = Number(cmd.week);
    else if(cmd.action === "replaceWeeklyMarkets") state.weeklyMarkets = cmd.markets || [];
    else if(cmd.action === "addWeeklyMarkets") state.weeklyMarkets.push(...(cmd.markets || []));
    else if(cmd.action === "replaceSeasonMarkets") state.seasonMarkets = cmd.markets || [];
    else if(cmd.action === "addSeasonMarkets") state.seasonMarkets.push(...(cmd.markets || []));
    else if(cmd.action === "settleBet"){ const bet = state.bets.find(b => b.id === cmd.betId); if(bet){ bet.status = cmd.status; if(cmd.notes) bet.notes = cmd.notes; } }
    else if(cmd.action === "addBet"){ state.bets.push(cmd.bet); }
    else if(cmd.action === "replaceState"){ state = cmd.state; }
  }
  recalcUsers(); saveState(); renderApp(); openPage("adminPage"); $("outputBox").value = "Commands applied."; renderAdminInner();
}
renderAuth();
