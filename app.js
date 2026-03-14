const STORAGE_KEY = "purple_book_v1_locked";
const ADMIN_PIN = "7651";

const DEFAULT_STATE = {
  currentWeek: 4,
  users: [
    {name:"Tuane",displayName:"Tuane",team:"Buccaneers",role:"commissioner",pinSet:false,pin:"",bankroll:1170,wins:1,losses:1,pushes:0,voids:0,totalWagered:450,totalProfit:270},
    {name:"Don",displayName:"Don",team:"Saints",role:"user",pinSet:false,pin:"",bankroll:950,wins:0,losses:1,pushes:0,voids:1,totalWagered:70,totalProfit:0},
    {name:"Romeo",displayName:"Romeo",team:"Falcons",role:"user",pinSet:false,pin:"",bankroll:900,wins:0,losses:1,pushes:0,voids:0,totalWagered:100,totalProfit:-100},
    {name:"Rob",displayName:"Rob",team:"Bills",role:"user",pinSet:false,pin:"",bankroll:850,wins:0,losses:3,pushes:0,voids:0,totalWagered:150,totalProfit:-150},
    {name:"Des",displayName:"Des",team:"Jets",role:"user",pinSet:false,pin:"",bankroll:700,wins:0,losses:0,pushes:0,voids:0,totalWagered:300,totalProfit:0}
  ],
  weeklyMarkets: [
    {id:"W4-001",team:"Jets",owner:"Des",matchup:"Jets @ Panthers",category:"Passing",target:"Jaxson Dart",label:"Over 249.5 Passing Yards",odds:"-125"},
    {id:"W4-002",team:"Jets",owner:"Des",matchup:"Jets @ Panthers",category:"Passing",target:"Jaxson Dart",label:"Over 2.5 Passing TD",odds:"+115"},
    {id:"W4-003",team:"Jets",owner:"Des",matchup:"Jets @ Panthers",category:"Rushing",target:"Cam Skattebo",label:"Over 59.5 Rushing Yards",odds:"-120"},
    {id:"W4-004",team:"Bills",owner:"Rob",matchup:"Bills vs Panthers",category:"Passing",target:"Justin Fields",label:"Over 1.5 Passing TD",odds:"-120"},
    {id:"W4-005",team:"Bills",owner:"Rob",matchup:"Bills vs Panthers",category:"Rushing",target:"Trey Benson",label:"Under 13.5 Rushing Attempts",odds:"-115"},
    {id:"W4-006",team:"Bills",owner:"Rob",matchup:"Bills vs Panthers",category:"Receiving",target:"Kyle Pitts",label:"Anytime TD",odds:"+145"},
    {id:"W4-007",team:"Bills",owner:"Rob",matchup:"Bills vs Panthers",category:"Defense",target:"Bills Defense",label:"Over 1.5 Sacks",odds:"+105"},
    {id:"W4-008",team:"Saints",owner:"Don",matchup:"Saints @ Falcons",category:"Rushing",target:"Derrick Henry",label:"Over 2.5 Rushing Attempts",odds:"-260"},
    {id:"W4-009",team:"Saints",owner:"Don",matchup:"Saints @ Falcons",category:"Defense",target:"Jonas Sanker",label:"Over 1.5 Tackles",odds:"-210"},
    {id:"W4-010",team:"League",owner:"",matchup:"Panthers vs Jets",category:"Team",target:"Panthers",label:"Moneyline",odds:"-110"},
    {id:"W4-011",team:"Falcons",owner:"Romeo",matchup:"Saints @ Falcons",category:"Team",target:"Falcons",label:"Moneyline",odds:"+125"},
    {id:"W4-012",team:"Falcons",owner:"Romeo",matchup:"Saints @ Falcons",category:"Defense",target:"Falcons Defense",label:"Over 1.5 Sacks",odds:"+115"}
  ],
  seasonMarkets: [
    {id:"S-001",team:"Jets",owner:"Des",matchup:"Season Futures",category:"Season",target:"Jets",label:"Make Playoffs",odds:"-190"},
    {id:"S-002",team:"Buccaneers",owner:"Tuane",matchup:"Season Futures",category:"Season",target:"Buccaneers",label:"Make Playoffs",odds:"-165"},
    {id:"S-003",team:"Saints",owner:"Don",matchup:"Season Futures",category:"Season",target:"Saints",label:"Under 12.5 Wins",odds:"-115"}
  ],
  bets: [
    {id:"BET-001",user:"Tuane",week:1,type:"Parlay",legs:["Jets ML","Cardinals ML","Jaxson Dart Over Passing Yards"],odds:"+420",stake:100,payout:520,status:"Won",notes:"Confirmed hit"},
    {id:"BET-002",user:"Tuane",week:1,type:"Parlay",legs:["Lamar Jackson Over INT","Jaxson Dart Under INT","Trey Benson Under Rushing Yards"],odds:"+560",stake:150,payout:0,status:"Lost",notes:"Confirmed loss"},
    {id:"BET-003",user:"Don",week:1,type:"Parlay",legs:["Week 1 Don slip"],odds:"+0",stake:20,payout:20,status:"Void",notes:"Week 1 void"},
    {id:"BET-004",user:"Don",week:2,type:"League Ruling",legs:["Forced week 2 loss"],odds:"+0",stake:0,payout:0,status:"Lost",notes:"Cheat ruling"},
    {id:"BET-005",user:"Tuane",week:4,type:"Parlay",legs:["Justin Fields Over 1.5 Passing TD","Kyle Pitts Anytime TD","Panthers Moneyline"],odds:"+705",stake:150,payout:1207.50,status:"Pending",notes:"Locked in"},
    {id:"BET-006",user:"Tuane",week:4,type:"Parlay",legs:["Bills Defense Over 1.5 Sacks","Derrick Henry Over 2.5 Rushing Attempts","Jonas Sanker Over 1.5 Tackles"],odds:"+236",stake:50,payout:168,status:"Pending",notes:"Locked in"}
  ],
  rules: [
    "Pregame betting only.",
    "Users cannot bet on their own team for weekly bets.",
    "Weekly parlays: max 5 legs, max $350 stake, min $10.",
    "Season parlays: max 4 legs, max $400 stake, min $10.",
    "Season bets lock after the end of Week 3.",
    "2-point conversions do not count as touchdowns.",
    "Official Madden stats settle props.",
    "Admin can mark Win / Loss / Void / Push.",
    "Users only see their own pending bets.",
    "Workflow: screenshots -> ChatGPT JSON -> Admin command center."
  ]
};

let state = loadState();
let currentUser = null;
let currentPage = "home";
let marketMode = "weekly";
let teamFilter = "all";
let slip = [];

function loadState(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(DEFAULT_STATE); }
  catch(e){ return structuredClone(DEFAULT_STATE); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function $(id){ return document.getElementById(id); }
function userByName(name){ return state.users.find(u => u.name === name); }
function oddsToNum(odds){ return Number(String(odds).replace("+","") || 0); }
function formatMoney(n){ return `$${Number(n).toFixed(2)}`; }
function statusClass(status){ return {Pending:"pending",Won:"won",Lost:"lost",Void:"void",Push:"push"}[status] || "pending"; }
function combineOdds(legs){
  if(!legs.length) return null;
  let dec = 1;
  for(const leg of legs){
    const o = String(leg.odds);
    const n = oddsToNum(o);
    dec *= o.startsWith("+") ? (1 + n/100) : (1 + 100/Math.abs(n));
  }
  const american = dec >= 2 ? Math.round((dec - 1) * 100) : Math.round(-100 / (dec - 1));
  return american >= 0 ? `+${american}` : `${american}`;
}
function payout(stake, odds){
  const o = String(odds);
  const n = oddsToNum(o);
  return o.startsWith("+") ? +(stake + stake * n / 100).toFixed(2) : +(stake + stake * 100 / Math.abs(n)).toFixed(2);
}
function renderAuth(){
  const options = state.users.map(u => `<option value="${u.name}">${u.displayName} — ${u.team}</option>`).join("");
  $("authScreen").innerHTML = `
    <div class="auth-card">
      <div class="auth-brand">
        <div class="brand-badge">PB</div>
        <div>
          <div class="auth-title">Purple Book V1</div>
          <p class="auth-sub">Select your name. First login creates your own PIN.</p>
        </div>
      </div>
      <label class="label">User<select id="authUser">${options}</select></label>
      <div id="authDynamic"></div>
      <button id="authBtn" class="primary wide">Continue</button>
    </div>`;
  const sel = $("authUser");
  function paint(){
    const u = userByName(sel.value);
    $("authDynamic").innerHTML = u.pinSet ? `
      <label class="label">Enter PIN
        <input id="loginPin" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" placeholder="••••">
      </label>` : `
      <div class="pin-grid">
        <label class="label">Create PIN
          <input id="createPin" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" placeholder="••••">
        </label>
        <label class="label">Confirm PIN
          <input id="confirmPin" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" placeholder="••••">
        </label>
      </div>`;
  }
  paint();
  sel.onchange = paint;
  $("authBtn").onclick = () => {
    const u = userByName(sel.value);
    if(u.pinSet){
      if($("loginPin").value.trim() !== u.pin) return alert("Wrong PIN.");
      currentUser = u.name;
      openApp();
    } else {
      const a = $("createPin").value.trim();
      const b = $("confirmPin").value.trim();
      if(!/^\d{4,6}$/.test(a)) return alert("PIN must be 4 to 6 digits.");
      if(a !== b) return alert("PINs do not match.");
      u.pinSet = true; u.pin = a; saveState();
      currentUser = u.name;
      openApp();
    }
  };
}
function openApp(){
  $("authScreen").classList.add("hidden");
  $("appScreen").classList.remove("hidden");
  renderApp();
}
function logout(){
  currentUser = null;
  $("appScreen").classList.add("hidden");
  $("authScreen").classList.remove("hidden");
  renderAuth();
}
function renderApp(){
  const me = userByName(currentUser);
  $("weekPill").textContent = `Week ${state.currentWeek}`;
  $("adminLink").style.display = me.role === "commissioner" ? "inline-flex" : "none";
  $("adminLink").onclick = () => openPage("admin");
  $("logoutBtn").onclick = logout;
  document.querySelectorAll(".nav-btn").forEach(btn => btn.onclick = () => openPage(btn.dataset.page));
  $("clearSlipBtn").onclick = () => { slip = []; renderSlip(); renderSportsbook(); };
  $("placeBetBtn").onclick = placeBet;
  renderHome(); renderSportsbook(); renderMyBets(); renderLeaderboard(); renderResults(); renderRules(); renderSlip();
  openPage(currentPage);
}
function openPage(id){
  currentPage = id;
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  $(id).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.page === id));
  if(id === "admin") renderAdmin();
}
function renderHome(){
  const me = userByName(currentUser);
  const open = state.bets.filter(b => b.user === currentUser && b.status === "Pending").length;
  const leaders = [...state.users].sort((a,b) => b.bankroll - a.bankroll);
  $("home").innerHTML = `
    <div class="card">
      <h2>Welcome back, ${me.displayName}</h2>
      <p class="muted">${me.team} • Pregame only • FanDuel-style purple board</p>
      <div class="kpis">
        <div class="kpi"><div class="t">Bankroll</div><div class="v">${formatMoney(me.bankroll)}</div></div>
        <div class="kpi"><div class="t">Open Bets</div><div class="v">${open}</div></div>
        <div class="kpi"><div class="t">Wagered</div><div class="v">${formatMoney(me.totalWagered)}</div></div>
        <div class="kpi"><div class="t">Profit</div><div class="v">${formatMoney(me.totalProfit)}</div></div>
      </div>
    </div>
    <div class="grid2">
      <div class="mini"><h3>Large prop board</h3><p class="muted">Continuous pages full of weekly and season legs.</p></div>
      <div class="mini"><h3>Screenshot workflow</h3><p class="muted">You send screenshots, then paste my JSON commands into admin.</p></div>
      <div class="mini"><h3>Private slips</h3><p class="muted">Each user only sees their own pending bets.</p></div>
      <div class="mini"><h3>Admin controls</h3><p class="muted">Manual Win / Loss / Void / Push whenever needed.</p></div>
    </div>
    <div class="card">
      <h3>Leaderboard preview</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Rank</th><th>User</th><th>Team</th><th>Bankroll</th></tr></thead>
        <tbody>
          ${leaders.map((u,i)=>`<tr><td>#${i+1}</td><td>${u.displayName}</td><td>${u.team}</td><td>${formatMoney(u.bankroll)}</td></tr>`).join("")}
        </tbody>
      </table></div>
    </div>`;
}
function currentMarkets(){ return marketMode === "weekly" ? state.weeklyMarkets : state.seasonMarkets; }
function legAllowed(m){ return marketMode !== "weekly" || m.owner !== currentUser; }
function renderSportsbook(){
  const all = currentMarkets();
  const teams = [...new Set(all.map(m => m.team))];
  const filtered = all.filter(m => teamFilter === "all" || m.team === teamFilter);
  $("sportsbook").innerHTML = `
    <div class="card">
      <h2>Sportsbook</h2>
      <p class="muted">Tap odds to add picks to the slip.</p>
      <div class="filters">
        <button class="filter ${marketMode==="weekly"?"active":""}" id="weeklyMode">Weekly</button>
        <button class="filter ${marketMode==="season"?"active":""}" id="seasonMode">Season</button>
      </div>
      <div class="filters">
        <button class="filter ${teamFilter==="all"?"active":""}" data-filter="all">All</button>
        ${teams.map(t=>`<button class="filter ${teamFilter===t?"active":""}" data-filter="${t}">${t}</button>`).join("")}
      </div>
      ${marketMode==="weekly" ? `<div class="notice">Your own team is blocked for weekly bets.</div>` : ""}
    </div>
    <div class="card">
      <h3>${marketMode==="weekly" ? `Week ${state.currentWeek} board` : "Season futures"}</h3>
      <div class="market-grid">
        ${filtered.map(m => `
          <button class="market ${slip.some(x=>x.id===m.id)?"selected":""} ${legAllowed(m)?"":"disabled"}" data-market="${m.id}" ${legAllowed(m)?"":"disabled"}>
            <span class="target">${m.target}</span>
            <span class="meta">${m.matchup} • ${m.team} • ${m.category}</span>
            <span class="meta">${m.label}</span>
            <span class="price">${m.odds}</span>
          </button>`).join("")}
      </div>
    </div>`;
  $("weeklyMode").onclick = ()=>{marketMode="weekly"; teamFilter="all"; renderSportsbook();};
  $("seasonMode").onclick = ()=>{marketMode="season"; teamFilter="all"; renderSportsbook();};
  document.querySelectorAll("[data-filter]").forEach(btn => btn.onclick = ()=>{teamFilter=btn.dataset.filter; renderSportsbook();});
  document.querySelectorAll("[data-market]").forEach(btn => btn.onclick = ()=>toggleLeg(btn.dataset.market));
}
function toggleLeg(id){
  const markets = currentMarkets();
  const leg = markets.find(m => m.id === id);
  if(!leg) return;
  const idx = slip.findIndex(x => x.id === id);
  if(idx >= 0) slip.splice(idx,1); else slip.push(leg);
  renderSlip(); renderSportsbook();
}
function renderSlip(){
  $("slipMeta").textContent = `${slip.length} picks`;
  $("slipBody").innerHTML = slip.length ? slip.map(leg => `
    <div class="slip-item">
      <div class="slip-item-top">
        <div><strong>${leg.target}</strong><div class="tiny">${leg.label}</div><div class="tiny">${leg.matchup}</div></div>
        <button class="remove" data-remove="${leg.id}">✕</button>
      </div>
      <div class="price">${leg.odds}</div>
    </div>`).join("") : `<div class="muted">No picks yet.</div>`;
  document.querySelectorAll("[data-remove]").forEach(btn => btn.onclick = ()=>{ slip = slip.filter(x => x.id !== btn.dataset.remove); renderSlip(); renderSportsbook(); });
  const stake = Number($("stakeInput").value || 0);
  const odds = combineOdds(slip);
  $("slipOdds").textContent = odds || "—";
  $("slipPayout").textContent = odds && stake >= 10 ? formatMoney(payout(stake, odds)) : "$0.00";
  $("stakeInput").oninput = renderSlip;
}
function placeBet(){
  if(!slip.length) return alert("Add at least one leg.");
  const stake = Number($("stakeInput").value || 0);
  if(stake < 10) return alert("Minimum stake is $10.");
  const isSeason = marketMode === "season";
  const maxLegs = isSeason ? 4 : 5;
  const maxStake = isSeason ? 400 : (slip.length > 1 ? 350 : 150);
  if(slip.length > maxLegs) return alert(`Maximum ${maxLegs} legs.`);
  if(stake > maxStake) return alert(`Max stake is $${maxStake}.`);
  const odds = combineOdds(slip);
  const bet = {
    id:`BET-${String(state.bets.length+1).padStart(3,"0")}`,
    user: currentUser,
    week: isSeason ? "Season" : state.currentWeek,
    type: slip.length > 1 ? (isSeason ? "Season Parlay" : "Parlay") : "Single",
    legs: slip.map(l => `${l.target} — ${l.label}`),
    odds,
    stake,
    payout: payout(stake, odds),
    status:"Pending",
    notes:""
  };
  state.bets.push(bet);
  const me = userByName(currentUser);
  me.bankroll -= stake;
  me.totalWagered += stake;
  saveState();
  slip = [];
  $("stakeInput").value = "10";
  renderApp();
  openPage("mybets");
  alert("Bet placed.");
}
function renderMyBets(){
  const bets = state.bets.filter(b => b.user === currentUser).slice().reverse();
  $("mybets").innerHTML = `
    <div class="card">
      <h2>My Bets</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>ID</th><th>Week</th><th>Type</th><th>Legs</th><th>Odds</th><th>Stake</th><th>Payout</th><th>Status</th></tr></thead>
        <tbody>
          ${bets.map(b=>`<tr><td>${b.id}</td><td>${b.week}</td><td>${b.type}</td><td>${b.legs.join("<br>")}</td><td>${b.odds}</td><td>${formatMoney(b.stake)}</td><td>${formatMoney(b.payout)}</td><td><span class="badge ${statusClass(b.status)}">${b.status}</span></td></tr>`).join("")}
        </tbody>
      </table></div>
    </div>`;
}
function renderLeaderboard(){
  const users = [...state.users].sort((a,b)=>b.bankroll-a.bankroll);
  $("leaderboard").innerHTML = `
    <div class="card">
      <h2>Leaderboard</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Rank</th><th>User</th><th>Team</th><th>Bankroll</th><th>P/L</th><th>Wagered</th><th>Record</th></tr></thead>
        <tbody>
          ${users.map((u,i)=>`<tr><td>#${i+1}</td><td>${u.displayName}</td><td>${u.team}</td><td>${formatMoney(u.bankroll)}</td><td>${formatMoney(u.totalProfit)}</td><td>${formatMoney(u.totalWagered)}</td><td>${u.wins}-${u.losses}-${u.pushes}-${u.voids}</td></tr>`).join("")}
        </tbody>
      </table></div>
    </div>`;
}
function renderResults(){
  const done = state.bets.filter(b => b.status !== "Pending").slice().reverse();
  $("results").innerHTML = `
    <div class="card">
      <h2>Results</h2>
      ${done.length ? done.map(b => `
        <div class="mini" style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
            <strong>${b.id} • ${b.user}</strong>
            <span class="badge ${statusClass(b.status)}">${b.status}</span>
          </div>
          <div class="tiny">${b.type} • Week ${b.week}</div>
          <div style="margin-top:8px">${b.legs.join(" • ")}</div>
        </div>`).join("") : `<p class="muted">No settled bets yet.</p>`}
    </div>`;
}
function renderRules(){
  $("rules").innerHTML = `<div class="card"><h2>Rules</h2>${state.rules.map(r=>`<div class="mini" style="margin-bottom:10px">${r}</div>`).join("")}</div>`;
}
function settleBet(id,status){
  const bet = state.bets.find(b => b.id === id);
  if(!bet || bet.status !== "Pending") return;
  const user = userByName(bet.user);
  if(status === "Won"){
    user.bankroll += bet.payout;
    user.totalProfit += bet.payout - bet.stake;
    user.wins += 1;
  } else if(status === "Lost"){
    user.totalProfit -= bet.stake;
    user.losses += 1;
  } else if(status === "Void"){
    user.bankroll += bet.stake;
    user.voids += 1;
  } else if(status === "Push"){
    user.bankroll += bet.stake;
    user.pushes += 1;
  }
  bet.status = status;
  saveState();
  renderApp();
  openPage("admin");
}
function renderAdmin(){
  const me = userByName(currentUser);
  if(!me || me.role !== "commissioner"){
    $("admin").innerHTML = `<div class="card"><h2>Admin</h2><p class="muted">Commissioner only.</p></div>`;
    return;
  }
  $("admin").innerHTML = `
    <div class="card">
      <h2>Admin</h2>
      <p class="muted">Commissioner command center</p>
      <label class="label">Admin PIN
        <input id="adminPinCheck" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" placeholder="••••">
      </label>
      <button id="unlockAdminBtn" class="primary">Unlock</button>
      <div id="adminInner" class="hidden"></div>
    </div>`;
  $("unlockAdminBtn").onclick = ()=>{
    if($("adminPinCheck").value.trim() !== ADMIN_PIN) return alert("Wrong admin PIN.");
    $("adminInner").classList.remove("hidden");
    renderAdminInner();
  };
}
function renderAdminInner(){
  const pending = state.bets.filter(b => b.status === "Pending").slice().reverse();
  $("adminInner").innerHTML = `
    <div class="grid2" style="margin-top:14px">
      <div class="card">
        <h3>Settle pending bets</h3>
        ${pending.length ? pending.map(b => `
          <div class="mini" style="margin-bottom:10px">
            <strong>${b.id} • ${b.user}</strong>
            <div class="tiny">${b.type} • ${formatMoney(b.stake)} • ${b.odds}</div>
            <div style="margin-top:8px">${b.legs.join(" • ")}</div>
            <div class="actions" style="margin-top:10px">
              <button class="action-btn win-btn" data-settle="${b.id}|Won">Win</button>
              <button class="action-btn loss-btn" data-settle="${b.id}|Lost">Loss</button>
              <button class="action-btn void-btn" data-settle="${b.id}|Void">Void</button>
              <button class="action-btn push-btn" data-settle="${b.id}|Push">Push</button>
            </div>
          </div>`).join("") : `<p class="muted">No pending bets.</p>`}
      </div>
      <div class="card">
        <h3>Command Center</h3>
        <p class="muted">Paste JSON commands from ChatGPT here.</p>
        <label class="label">Commands
          <textarea id="commandBox">{
  "commands": [
    {"action":"setWeek","week":5},
    {"action":"addWeeklyMarkets","markets":[]}
  ]
}</textarea>
        </label>
        <div class="actions">
          <button id="runCommandsBtn" class="primary">Run Commands</button>
          <button id="exportStateBtn" class="secondary">Export State</button>
        </div>
        <label class="label" style="margin-top:12px">Output
          <textarea id="commandOutput" placeholder="Output appears here"></textarea>
        </label>
      </div>
    </div>`;
  document.querySelectorAll("[data-settle]").forEach(btn => btn.onclick = ()=>{ const [id,status]=btn.dataset.settle.split("|"); settleBet(id,status); });
  $("runCommandsBtn").onclick = runCommands;
  $("exportStateBtn").onclick = ()=>{ $("commandOutput").value = JSON.stringify(state,null,2); };
}
function runCommands(){
  let data;
  try { data = JSON.parse($("commandBox").value); }
  catch(e){ return alert("Invalid JSON."); }
  const commands = data.commands || [];
  for(const cmd of commands){
    if(cmd.action === "setWeek") state.currentWeek = Number(cmd.week);
    if(cmd.action === "replaceWeeklyMarkets") state.weeklyMarkets = cmd.markets || [];
    if(cmd.action === "addWeeklyMarkets") state.weeklyMarkets.push(...(cmd.markets || []));
    if(cmd.action === "replaceSeasonMarkets") state.seasonMarkets = cmd.markets || [];
    if(cmd.action === "addSeasonMarkets") state.seasonMarkets.push(...(cmd.markets || []));
    if(cmd.action === "settleBet") settleBet(cmd.betId, cmd.status);
  }
  saveState();
  renderApp();
  openPage("admin");
  if($("commandOutput")) $("commandOutput").value = "Commands applied.";
}
renderAuth();
