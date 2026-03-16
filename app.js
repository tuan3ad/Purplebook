
const STORAGE_KEY = "madden_sportsbook_absolute_final";
const PINS_KEY = "madden_sportsbook_absolute_final_pins";

let db = null;
let sessionUser = null;
let currentPage = "login";
let currentGameId = null;
let currentPropTab = "Game Lines";
let createState = { player:null, category:null, side:null, line:null };
let slip = [];

const app = document.getElementById("app");

function deepClone(obj){ return JSON.parse(JSON.stringify(obj)); }

async function boot(){
  const saved = localStorage.getItem(STORAGE_KEY);
  if(saved){
    db = JSON.parse(saved);
  } else {
    const res = await fetch("data.json");
    db = await res.json();
    persist();
  }
  render();
}
function persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); }

function getPins(){
  try { return JSON.parse(localStorage.getItem(PINS_KEY) || "{}"); } catch { return {}; }
}
function setPin(name, pin){
  const pins = getPins();
  pins[name] = pin;
  localStorage.setItem(PINS_KEY, JSON.stringify(pins));
}
function getUser(name){ return db.users.find(u => u.name === name); }
function money(n){ return `$${Number(n).toFixed(0)}`; }

function render(){
  if(!sessionUser){ renderLogin(); return; }
  const isAdmin = sessionUser.isAdmin;
  app.innerHTML = `
    <div class="app-shell">
      <div class="topbar">
        <div class="brand">
          <h1>${db.app.name}</h1>
          <div class="sub">${db.app.subtitle} • Week ${db.app.currentWeek}</div>
        </div>
        <div class="bankroll-box">
          <div class="label">${sessionUser.name} Bankroll</div>
          <div class="value">${money(sessionUser.bankroll)}</div>
        </div>
      </div>

      <div class="quick-stats">
        <div class="stat-card"><div class="k">Weekly Exposure</div><div class="v">${money(sessionUser.weeklyExposure)}</div></div>
        <div class="stat-card"><div class="k">Season Exposure</div><div class="v">${money(sessionUser.seasonExposure)}</div></div>
        <div class="stat-card"><div class="k">Open Bets</div><div class="v">${sessionUser.openBets}</div></div>
        <div class="stat-card"><div class="k">Season Parlays</div><div class="v">${db.app.currentWeek > db.app.seasonCutoffWeek ? "Closed" : "Open"}</div></div>
      </div>

      ${renderPage()}
    </div>

    <div class="nav ${isAdmin ? 'nav-6' : 'nav-5'}">
      ${navBtn("home","Home")}
      ${navBtn("games","Games")}
      ${navBtn("createalay","CREATEALAY")}
      ${navBtn("bets","Bets")}
      ${navBtn("bankroll","Bankroll")}
      ${isAdmin ? navBtn("admin","Admin") : ""}
    </div>
  `;
  bindNav();
}
function navBtn(id, label){
  return `<button class="${currentPage===id?'active':''}" data-nav="${id}">${label}</button>`;
}
function bindNav(){
  document.querySelectorAll("[data-nav]").forEach(btn=>{
    btn.onclick = ()=> {
      currentPage = btn.dataset.nav;
      if(currentPage !== "game") currentPropTab = "Game Lines";
      render();
    };
  });
}

function renderLogin(){
  const pins = getPins();
  const users = db.users.map(u=>u.name);
  app.innerHTML = `
    <div class="app-shell">
      <div class="topbar">
        <div class="brand">
          <h1>${db.app.name}</h1>
          <div class="sub">${db.app.subtitle}</div>
        </div>
      </div>
      <div class="panel" style="max-width:520px;margin:50px auto 0">
        <h2>Choose Your Name</h2>
        <p class="note">Create a PIN the first time. Returning users just enter it.</p>
        <div class="form-grid" style="margin-top:14px">
          ${users.map(name=>`<button class="choice-btn" onclick="beginLogin('${name}')">${name}</button>`).join("")}
        </div>
      </div>
    </div>
  `;
  window.beginLogin = (name)=>{
    const hasPin = !!pins[name];
    app.innerHTML = `
      <div class="app-shell">
        <div class="topbar">
          <div class="brand">
            <h1>${db.app.name}</h1>
            <div class="sub">${db.app.subtitle}</div>
          </div>
        </div>
        <div class="panel" style="max-width:520px;margin:50px auto 0">
          <h2>${name}</h2>
          <p class="note">${hasPin ? "Enter your PIN." : "Create your 4-digit PIN, then confirm it."}</p>
          ${hasPin ? `
            <input id="pinEntry" maxlength="4" placeholder="Enter 4-digit PIN"/>
            <div class="top-actions" style="margin-top:12px">
              <button class="btn" onclick="finishLogin('${name}')">Enter</button>
              <button class="btn" onclick="renderLogin()">Back</button>
            </div>
          ` : `
            <input id="pinCreate" maxlength="4" placeholder="Create 4-digit PIN"/>
            <input id="pinConfirm" maxlength="4" placeholder="Confirm 4-digit PIN" style="margin-top:10px"/>
            <div class="top-actions" style="margin-top:12px">
              <button class="btn" onclick="createPinAndLogin('${name}')">Confirm</button>
              <button class="btn" onclick="renderLogin()">Back</button>
            </div>
          `}
        </div>
      </div>
    `;
  };
  window.finishLogin = (name)=>{
    const entered = document.getElementById("pinEntry").value.trim();
    const pinsNow = getPins();
    if(entered !== pinsNow[name]){ alert("Wrong PIN"); return; }
    sessionUser = getUser(name);
    currentPage = "home";
    render();
  };
  window.createPinAndLogin = (name)=>{
    const p1 = document.getElementById("pinCreate").value.trim();
    const p2 = document.getElementById("pinConfirm").value.trim();
    if(!/^\d{4}$/.test(p1)){ alert("Enter a 4-digit PIN"); return; }
    if(p1 !== p2){ alert("PINs do not match"); return; }
    setPin(name, p1);
    sessionUser = getUser(name);
    currentPage = "home";
    render();
  };
}

function renderPage(){
  switch(currentPage){
    case "home": return renderHome();
    case "games": return renderGames();
    case "game": return renderGame();
    case "createalay": return renderCreateALay();
    case "bets": return renderBets();
    case "bankroll": return renderBankroll();
    case "admin": return renderAdmin();
    default: return renderHome();
  }
}

function renderHome(){
  return `
    <div class="page">
      <div class="section-head">
        <div>
          <h2>Dashboard</h2>
          <div class="desc">Everything locked in for Week ${db.app.currentWeek}.</div>
        </div>
      </div>
      <div class="games-grid">
        ${db.games.map(g=>gameCard(g, true)).join("")}
      </div>
    </div>
  `;
}
function gameCard(g, withOpen){
  return `
    <div class="card game-card">
      <div class="game-theme" style="background:linear-gradient(90deg,${g.theme[0]},${g.theme[1]})"></div>
      <div class="game-body">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <div class="matchup">${g.away} @ ${g.home}</div>
            <div class="user-tag">${g.userLabel}</div>
          </div>
          <div class="badge ${g.status}">${g.status}</div>
        </div>
        <div class="note">${g.note}</div>
        <div class="lines-grid">
          <div></div>
          <div class="hdr">Spread</div>
          <div class="hdr">ML</div>
          <div class="hdr">Total</div>

          <div class="team-row">${g.away}</div>
          ${oddsBtn(`${g.away} ${g.lines.awaySpread}`, g.lines.awaySpread, g.lines.awaySpreadOdds)}
          ${oddsBtn(`${g.away} ML ${g.lines.awayML}`, g.lines.awayML, "")}
          ${oddsBtn(`Over ${g.lines.over}`, `O ${g.lines.over}`, g.lines.overOdds)}

          <div class="team-row">${g.home}</div>
          ${oddsBtn(`${g.home} ${g.lines.homeSpread}`, g.lines.homeSpread, g.lines.homeSpreadOdds)}
          ${oddsBtn(`${g.home} ML ${g.lines.homeML}`, g.lines.homeML, "")}
          ${oddsBtn(`Under ${g.lines.under}`, `U ${g.lines.under}`, g.lines.underOdds)}
        </div>
        ${withOpen ? `<div class="top-actions" style="margin-top:14px">
          <button class="btn" onclick="openGame('${g.id}')">Open Game</button>
          <button class="btn" onclick="openCreateALay('${g.id}')">Open CREATEALAY</button>
        </div>` : ""}
      </div>
    </div>
  `;
}
function oddsBtn(label, main, sub){
  const selected = slip.some(s=>s.label===label);
  return `<button class="odds-btn ${selected?'selected':''}" onclick="addSlipLeg(${escapeForJs(label)}, ${escapeForJs(main)}, ${escapeForJs(sub||'')})">
    <span class="odds-main">${main}</span>
    ${sub ? `<span class="odds-sub">${sub}</span>` : ""}
  </button>`;
}
function escapeForJs(s){ return JSON.stringify(s); }

window.openGame = (gameId)=>{
  currentGameId = gameId;
  currentPage = "game";
  currentPropTab = "Game Lines";
  render();
};
window.openCreateALay = (gameId)=>{
  currentGameId = gameId;
  currentPage = "createalay";
  createState = { player:null, category:null, side:null, line:null };
  render();
};

function renderGames(){
  return `
    <div class="page">
      <div class="section-head">
        <div><h2>Games</h2><div class="desc">Only the 4 tracked Week 4 games.</div></div>
      </div>
      <div class="games-grid">
        ${db.games.map(g=>gameCard(g, true)).join("")}
      </div>
    </div>
  `;
}

function renderGame(){
  const game = db.games.find(g=>g.id===currentGameId) || db.games[0];
  const props = db.props.filter(p=>p.gameId===game.id && p.active);
  const grouped = {
    "Game Lines": [],
    "Passing": props.filter(p=>p.category==="Passing" || p.category==="Passing TD" || p.category==="Interceptions"),
    "Rushing": props.filter(p=>p.category==="Rushing"),
    "Receiving": props.filter(p=>p.category==="Receiving" || p.category==="Receptions" || p.category==="Anytime TD"),
    "Defense": props.filter(p=>p.category==="Tackles" || p.category==="Sacks" || p.category==="Interception"),
    "SGP": props.filter(p=>p.sgpAllowed)
  };
  return `
    <div class="page">
      <div class="section-head">
        <div>
          <h2>${game.away} @ ${game.home}</h2>
          <div class="desc">${game.userLabel}</div>
        </div>
        <div class="top-actions">
          <button class="btn" onclick="currentPage='games';render()">Back to Games</button>
          <button class="btn" onclick="openCreateALay('${game.id}')">Open CREATEALAY</button>
        </div>
      </div>

      <div class="tabs">
        ${["Game Lines","Passing","Rushing","Receiving","Defense","SGP"].map(tab=>`<button class="${currentPropTab===tab?'active':''}" onclick="setPropTab('${tab}')">${tab}</button>`).join("")}
      </div>

      <div class="two-col">
        <div class="panel">
          ${currentPropTab==="Game Lines" ? renderGameLines(game) : renderPropRows(grouped[currentPropTab] || [])}
        </div>
        <div class="panel bet-slip">
          <h3>Bet Slip</h3>
          ${renderSlipInner()}
        </div>
      </div>
    </div>
  `;
}
window.setPropTab = (tab)=>{ currentPropTab = tab; render(); };

function renderGameLines(game){
  return `
    <div class="prop-row"><div class="meta"><strong>${game.away} Spread</strong><span class="small">${game.awaySpread || ""}</span></div>${oddsBtn(`${game.away} ${game.lines.awaySpread}`, game.lines.awaySpread, game.lines.awaySpreadOdds)}</div>
    <div class="prop-row"><div class="meta"><strong>${game.home} Spread</strong></div>${oddsBtn(`${game.home} ${game.lines.homeSpread}`, game.lines.homeSpread, game.lines.homeSpreadOdds)}</div>
    <div class="prop-row"><div class="meta"><strong>${game.away} Moneyline</strong></div>${oddsBtn(`${game.away} ML ${game.lines.awayML}`, game.lines.awayML, "")}</div>
    <div class="prop-row"><div class="meta"><strong>${game.home} Moneyline</strong></div>${oddsBtn(`${game.home} ML ${game.lines.homeML}`, game.lines.homeML, "")}</div>
    <div class="prop-row"><div class="meta"><strong>Total Over ${game.lines.over}</strong></div>${oddsBtn(`Over ${game.lines.over}`, `O ${game.lines.over}`, game.lines.overOdds)}</div>
    <div class="prop-row"><div class="meta"><strong>Total Under ${game.lines.under}</strong></div>${oddsBtn(`Under ${game.lines.under}`, `U ${game.lines.under}`, game.lines.underOdds)}</div>
  `;
}
function renderPropRows(props){
  if(!props.length) return `<div class="note">No props available in this section.</div>`;
  return props.map(p=>`
    <div class="prop-row">
      <div class="meta">
        <strong>${p.player}</strong>
        <span>${p.stat} ${p.line || ""}</span>
        <span class="small">${p.category}</span>
      </div>
      ${oddsBtn(`${p.player} ${p.stat} ${p.line||''} ${p.odds}`.trim(), p.odds, "")}
    </div>
  `).join("");
}

window.addSlipLeg = (label, main, sub)=>{
  if(slip.some(s=>s.label===label)){ return; }
  slip.push({ label, display: main, sub: sub||"" });
  render();
};

function combinedAmericanOdds(legs){
  if(legs.length < 2) return "Need 2+ legs";
  const decimal = legs.reduce((acc, leg)=>{
    const o = Number(String(leg.display).replace("+",""));
    const dec = o > 0 ? 1 + (o / 100) : 1 + (100 / Math.abs(o));
    return acc * dec;
  }, 1);
  const american = decimal >= 2 ? Math.round((decimal - 1) * 100) : Math.round(-100 / (decimal - 1));
  return american > 0 ? `+${american}` : `${american}`;
}
function renderSlipInner(){
  if(!slip.length) return `<div class="note">No legs yet. Tap odds to add.</div>`;
  return `
    ${slip.map((leg, idx)=>`
      <div class="bet-row">
        <div class="meta">
          <strong>${leg.label}</strong>
          <span class="small">${leg.display}</span>
        </div>
        <button class="tiny-btn" onclick="removeSlipLeg(${idx})">Remove</button>
      </div>
    `).join("")}
    <div class="kv"><span>Combined Odds</span><strong>${combinedAmericanOdds(slip)}</strong></div>
    <div class="kv"><span>Min Legs</span><strong>${db.rules.minLegs}</strong></div>
    <div class="kv"><span>Max Stake</span><strong>$${db.rules.maxParlayStake}</strong></div>
  `;
}
window.removeSlipLeg = (idx)=>{ slip.splice(idx,1); render(); };

function renderCreateALay(){
  const game = db.games.find(g=>g.id===currentGameId) || db.games.find(g=>g.status==="OPEN") || db.games[0];
  const isClosed = game.status === "CLOSED";
  const players = game.createALay.players;
  const categoryKeys = Object.keys(game.createALay.categories);
  const cat = createState.category ? game.createALay.categories[createState.category] : null;
  return `
    <div class="page">
      <div class="section-head">
        <div>
          <h2>CREATEALAY</h2>
          <div class="desc">Buttons only. No typing.</div>
        </div>
      </div>

      <div class="card">
        <h3>Game</h3>
        <div class="create-grid" style="margin-top:12px">
          ${db.games.map(g=>`<button class="choice-btn ${game.id===g.id?'selected':''}" onclick="chooseCreateGame('${g.id}')">${g.away} @ ${g.home}<br><span class="small">${g.status}</span></button>`).join("")}
        </div>
      </div>

      <div class="card">
        <h3>Selected Game</h3>
        <div class="matchup" style="margin-top:10px">${game.away} @ ${game.home}</div>
        <div class="user-tag">${game.userLabel}</div>
        ${isClosed ? `<div class="note" style="margin-top:10px;color:#f5b7b7">Game closed. CREATEALAY disabled for this matchup.</div>` : ""}
      </div>

      <div class="two-col">
        <div>
          <div class="card">
            <h3>1. Choose Player</h3>
            <div class="create-grid" style="margin-top:12px">
              ${players.map(p=>`<button class="choice-btn ${createState.player===p?'selected':''}" onclick="chooseCreatePlayer('${p.replace(/'/g,"\\'")}')" ${isClosed?'disabled':''}>${p}</button>`).join("")}
            </div>
          </div>

          <div class="card">
            <h3>2. Choose Category</h3>
            <div class="create-grid" style="margin-top:12px">
              ${categoryKeys.map(c=>`<button class="choice-btn ${createState.category===c?'selected':''}" onclick="chooseCreateCategory('${c}')" ${isClosed?'disabled':''}>${c}</button>`).join("")}
            </div>
          </div>

          <div class="card">
            <h3>3. Choose Side</h3>
            <div class="create-grid" style="margin-top:12px">
              ${(cat ? cat.sides : []).map(side=>`<button class="choice-btn ${createState.side===side?'selected':''}" onclick="chooseCreateSide('${side}')" ${isClosed?'disabled':''}>${side}</button>`).join("") || `<div class="note">Choose a category first.</div>`}
            </div>
          </div>

          <div class="card">
            <h3>4. Choose Line</h3>
            <div class="create-grid" style="margin-top:12px">
              ${(cat && cat.lines.length ? cat.lines : []).map(line=>`<button class="choice-btn ${createState.line===line?'selected':''}" onclick="chooseCreateLine('${line}')" ${isClosed?'disabled':''}>${line}</button>`).join("") || `<div class="note">${cat && cat.lines.length===0 ? "This prop uses no line." : "Choose a category first."}</div>`}
            </div>
          </div>
        </div>

        <div>
          <div class="card">
            <h3>CREATEALAY Slip</h3>
            ${renderCreateSummary(game, isClosed)}
          </div>
        </div>
      </div>
    </div>
  `;
}
window.chooseCreateGame = (id)=>{ currentGameId = id; createState = { player:null, category:null, side:null, line:null }; render(); };
window.chooseCreatePlayer = (p)=>{ createState.player = p; render(); };
window.chooseCreateCategory = (c)=>{ createState.category = c; createState.side = null; createState.line = null; render(); };
window.chooseCreateSide = (s)=>{ createState.side = s; render(); };
window.chooseCreateLine = (l)=>{ createState.line = l; render(); };

function estimateOdds(){
  // Buttons only odds estimate based on category / side / line
  let base = -110;
  const c = createState.category || "";
  if(c.includes("Anytime")) base = 145;
  if(c.includes("Interception")) base = 220;
  if(c.includes("Sacks")) base = 165;
  if(c.includes("Tackles")) base = -120;
  if(c.includes("Passing TD")) base = 125;
  if(c.includes("Receptions")) base = 105;
  if(createState.side === "Under") base = base < 0 ? base + 5 : base - 10;
  return base > 0 ? `+${base}` : `${base}`;
}
function renderCreateSummary(game, isClosed){
  const complete = createState.player && createState.category && createState.side && (createState.line || game.createALay.categories[createState.category]?.lines?.length===0);
  if(isClosed) return `<div class="note">Closed game. No custom leg can be created.</div>`;
  if(!complete){
    return `<div class="note">Choose player, category, side, and line (if needed).</div>`;
  }
  const lineText = createState.line ? ` ${createState.line}` : "";
  const label = `${createState.player} ${createState.side} ${createState.category}${lineText}`;
  const odds = estimateOdds();
  return `
    <div class="bet-row">
      <div class="meta">
        <strong>${label}</strong>
        <span class="small">${game.away} @ ${game.home}</span>
      </div>
      <div><strong>${odds}</strong></div>
    </div>
    <div class="top-actions">
      <button class="btn" onclick="addCreateLeg()">Add To Bet Slip</button>
      <button class="btn" onclick="resetCreate()">Reset</button>
    </div>
    <div class="note">Buttons only CREATEALAY is locked in.</div>
  `;
}
window.addCreateLeg = ()=>{
  const lineText = createState.line ? ` ${createState.line}` : "";
  const label = `${createState.player} ${createState.side} ${createState.category}${lineText}`;
  const odds = estimateOdds();
  if(!slip.some(s=>s.label===label)){
    slip.push({ label, display: odds, sub: "CREATEALAY" });
  }
  render();
};
window.resetCreate = ()=>{ createState = { player:null, category:null, side:null, line:null }; render(); };

function renderBets(){
  const mine = db.bets.filter(b=>b.user===sessionUser.name);
  return `
    <div class="page">
      <div class="section-head">
        <div><h2>My Bets</h2><div class="desc">Open, settled, and tracked slips.</div></div>
      </div>
      ${mine.map(b=>`
        <div class="card">
          <div class="section-head">
            <div><h3>${b.id}</h3><div class="desc">${b.type} • Week ${b.week}</div></div>
            <div class="badge ${b.status}">${b.status}</div>
          </div>
          <div class="note">Stake ${money(b.stake)} • Odds ${b.odds} • Payout ${money(b.payout)}</div>
          <div style="margin-top:10px">${b.legs.map(l=>`<div class="bet-row"><div class="meta"><strong>${l}</strong></div></div>`).join("")}</div>
        </div>
      `).join("") || `<div class="card">No bets yet.</div>`}
    </div>
  `;
}

function renderBankroll(){
  return `
    <div class="page">
      <div class="section-head">
        <div><h2>League Bankroll</h2><div class="desc">Locked rules and current balances.</div></div>
      </div>
      <div class="panel">
        ${db.users.map(u=>`
          <div class="user-row">
            <div class="meta">
              <strong>${u.name}</strong>
              <span class="small">${u.team} • Start ${money(u.start)}</span>
            </div>
            <div class="meta" style="text-align:right">
              <strong>${money(u.bankroll)}</strong>
              <span class="small">Weekly ${money(u.weeklyExposure)} • Season ${money(u.seasonExposure)}</span>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="panel" style="margin-top:14px">
        <h3>Rules</h3>
        <div class="kv"><span>Starting Bankroll</span><strong>${money(db.rules.startingBankroll)}</strong></div>
        <div class="kv"><span>Season Max</span><strong>${money(db.rules.seasonMaxExposure)}</strong></div>
        <div class="kv"><span>Weekly Max</span><strong>${money(db.rules.weeklyMaxExposure)}</strong></div>
        <div class="kv"><span>Max Per Parlay</span><strong>${money(db.rules.maxParlayStake)}</strong></div>
        <div class="kv"><span>Min Legs</span><strong>${db.rules.minLegs}</strong></div>
        <div class="kv"><span>Season Max Legs</span><strong>${db.rules.maxSeasonLegs}</strong></div>
        <div class="kv"><span>Weekly Max Legs</span><strong>${db.rules.maxWeeklyLegs}</strong></div>
        <div class="kv"><span>Season Parlays</span><strong>${db.app.currentWeek > db.app.seasonCutoffWeek ? "Closed after Week 3" : "Open"}</strong></div>
      </div>
    </div>
  `;
}

function renderAdmin(){
  if(!sessionUser.isAdmin){
    currentPage = "home";
    return renderHome();
  }
  return `
    <div class="page">
      <div class="section-head">
        <div><h2>Command Center</h2><div class="desc">Edit almost everything without a new zip.</div></div>
      </div>

      <div class="admin-grid">
        <div class="panel">
          <h3>Quick Add Prop</h3>
          <div class="form-grid" style="margin-top:12px">
            <select id="ccGame">${db.games.map(g=>`<option value="${g.id}">${g.away} @ ${g.home}</option>`).join("")}</select>
            <input id="ccPlayer" placeholder="Player"/>
            <select id="ccCategory">
              <option>Passing</option><option>Passing TD</option><option>Interceptions</option>
              <option>Rushing</option><option>Receiving</option><option>Receptions</option>
              <option>Tackles</option><option>Sacks</option><option>Anytime TD</option><option>Interception</option>
            </select>
            <input id="ccStat" placeholder="Stat label"/>
            <input id="ccLine" placeholder="Line (optional)"/>
            <input id="ccOdds" placeholder="Odds"/>
          </div>
          <div class="top-actions" style="margin-top:12px">
            <button class="btn" onclick="ccAddProp()">Add Prop</button>
          </div>
        </div>

        <div class="panel">
          <h3>Quick Update Bankroll</h3>
          <div class="form-grid" style="margin-top:12px">
            <select id="ccUser">${db.users.map(u=>`<option>${u.name}</option>`).join("")}</select>
            <input id="ccBankroll" placeholder="New bankroll"/>
            <input id="ccWeekly" placeholder="Weekly exposure"/>
            <input id="ccSeason" placeholder="Season exposure"/>
          </div>
          <div class="top-actions" style="margin-top:12px">
            <button class="btn" onclick="ccUpdateBankroll()">Update</button>
          </div>
        </div>

        <div class="panel">
          <h3>Settlement Center</h3>
          <select id="ccBet">${db.bets.map(b=>`<option value="${b.id}">${b.id} • ${b.user}</option>`).join("")}</select>
          <div class="top-actions" style="margin-top:12px">
            <button class="btn" onclick="settleBet('WIN')">Win</button>
            <button class="btn" onclick="settleBet('LOSS')">Loss</button>
            <button class="btn" onclick="settleBet('PUSH')">Push</button>
            <button class="btn" onclick="settleBet('VOID')">Void</button>
          </div>
        </div>

        <div class="panel">
          <h3>Patch Box</h3>
          <textarea id="patchBox" placeholder='Paste a patch here...'></textarea>
          <div class="top-actions" style="margin-top:12px">
            <button class="btn" onclick="applyPatch()">Apply Patch</button>
            <button class="btn" onclick="fillExamplePatch()">Load Example</button>
            <button class="btn" onclick="exportState()">Export State</button>
          </div>
          <div class="note">Supports bulkUpdate, setBankroll, addProp, removeProp, settleBet, setGameStatus, setWeek, updateRules.</div>
        </div>
      </div>

      <div class="panel" style="margin-top:14px">
        <h3>Current Games</h3>
        ${db.games.map(g=>`
          <div class="bet-row">
            <div class="meta">
              <strong>${g.away} @ ${g.home}</strong>
              <span class="small">${g.id} • ${g.status}</span>
            </div>
            <div class="top-actions">
              <button class="tiny-btn" onclick="setGameStatus('${g.id}','OPEN')">Open</button>
              <button class="tiny-btn" onclick="setGameStatus('${g.id}','CLOSED')">Close</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

window.ccAddProp = ()=>{
  const gameId = document.getElementById("ccGame").value;
  const player = document.getElementById("ccPlayer").value.trim();
  const category = document.getElementById("ccCategory").value;
  const stat = document.getElementById("ccStat").value.trim();
  const line = document.getElementById("ccLine").value.trim();
  const odds = document.getElementById("ccOdds").value.trim();
  if(!player || !stat || !odds){ alert("Fill player, stat, and odds."); return; }
  db.props.push({
    id: "prop_" + Date.now(),
    gameId, player, team:"", category, stat, line, odds, sgpAllowed:true, active:true
  });
  persist();
  render();
  alert("Prop added.");
};
window.ccUpdateBankroll = ()=>{
  const user = getUser(document.getElementById("ccUser").value);
  const bankroll = document.getElementById("ccBankroll").value.trim();
  const weekly = document.getElementById("ccWeekly").value.trim();
  const season = document.getElementById("ccSeason").value.trim();
  if(bankroll) user.bankroll = Number(bankroll);
  if(weekly) user.weeklyExposure = Number(weekly);
  if(season) user.seasonExposure = Number(season);
  sessionUser = getUser(sessionUser.name);
  persist();
  render();
  alert("Bankroll updated.");
};
window.setGameStatus = (gameId, status)=>{
  const g = db.games.find(x=>x.id===gameId);
  if(!g) return;
  g.status = status;
  persist();
  render();
};

window.settleBet = (result)=>{
  const betId = document.getElementById("ccBet").value;
  const bet = db.bets.find(b=>b.id===betId);
  if(!bet) return;
  bet.status = result;
  const user = getUser(bet.user);
  if(result === "WIN"){
    user.bankroll += Number(bet.payout);
  } else if(result === "PUSH" || result === "VOID"){
    user.bankroll += Number(bet.stake);
  }
  sessionUser = getUser(sessionUser.name);
  persist();
  render();
  alert(`Bet ${betId} marked ${result}.`);
};

window.fillExamplePatch = ()=>{
  document.getElementById("patchBox").value = JSON.stringify({
    type:"bulkUpdate",
    week:4,
    games:[{"id":"g4","status":"OPEN"}],
    props:[{
      action:"add",
      gameId:"g3",
      id:"prop_new_1",
      player:"Trey Benson",
      team:"Bills",
      category:"Rushing",
      stat:"Rushing Attempts Over",
      line:"14.5",
      odds":"+110",
      sgpAllowed:True,
      active:True
    }],
    bankrolls:[{"user":"Tuane","bankroll":1250}]
  }, null, 2).replace("True","true");
};

window.applyPatch = ()=>{
  const raw = document.getElementById("patchBox").value.trim();
  if(!raw){ alert("Paste a patch first."); return; }
  try{
    const patch = JSON.parse(raw);
    if(patch.type === "bulkUpdate"){
      if(typeof patch.week === "number") db.app.currentWeek = patch.week;
      if(Array.isArray(patch.games)){
        patch.games.forEach(pg=>{
          const g = db.games.find(x=>x.id===pg.id);
          if(g) Object.assign(g, pg);
        });
      }
      if(Array.isArray(patch.props)){
        patch.props.forEach(pp=>{
          if(pp.action === "add"){
            const copy = deepClone(pp);
            delete copy.action;
            db.props.push(copy);
          } else if(pp.action === "remove"){
            db.props = db.props.filter(x=>x.id !== pp.id);
          } else if(pp.action === "update"){
            const target = db.props.find(x=>x.id===pp.id);
            if(target) Object.assign(target, pp);
          }
        });
      }
      if(Array.isArray(patch.bankrolls)){
        patch.bankrolls.forEach(pb=>{
          const u = getUser(pb.user);
          if(u) Object.assign(u, pb);
        });
      }
    } else if(patch.type === "setBankroll"){
      const u = getUser(patch.user);
      if(u){
        if(patch.bankroll !== undefined) u.bankroll = Number(patch.bankroll);
        if(patch.weeklyExposure !== undefined) u.weeklyExposure = Number(patch.weeklyExposure);
        if(patch.seasonExposure !== undefined) u.seasonExposure = Number(patch.seasonExposure);
      }
    } else if(patch.type === "addProp"){
      db.props.push(patch.prop);
    } else if(patch.type === "removeProp"){
      db.props = db.props.filter(x=>x.id !== patch.id);
    } else if(patch.type === "settleBet"){
      const bet = db.bets.find(b=>b.id===patch.betId);
      if(bet){
        bet.status = patch.result;
      }
    } else if(patch.type === "setGameStatus"){
      const g = db.games.find(x=>x.id===patch.gameId);
      if(g) g.status = patch.status;
    } else if(patch.type === "setWeek"){
      db.app.currentWeek = Number(patch.week);
    } else if(patch.type === "updateRules"){
      Object.assign(db.rules, patch.rules || {});
    }
    sessionUser = getUser(sessionUser.name);
    persist();
    render();
    alert("Patch applied.");
  } catch(e){
    alert("Bad patch JSON.");
  }
};
window.exportState = ()=>{
  const blob = new Blob([JSON.stringify(db, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "madden-sportsbook-state.json";
  a.click();
};

document.addEventListener("click", (e)=>{
  if(e.target && e.target.dataset && e.target.dataset.logout === "1"){
    sessionUser = null; currentPage = "login"; render();
  }
});

boot();
