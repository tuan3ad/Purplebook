
const STORAGE_KEY = 'finaldraft_sportsbook_v1';
const DEFAULT_STATE = {"appName": "FinalDraft", "adminPin": "7651", "currentWeek": 3, "users": [{"name": "Tuane", "team": "Buccaneers", "pin": "", "pinSet": false, "bankroll": 1170, "role": "commissioner"}, {"name": "Des", "team": "Jets", "pin": "", "pinSet": false, "bankroll": 700, "role": "user"}, {"name": "Rob", "team": "Bills", "pin": "", "pinSet": false, "bankroll": 850, "role": "user"}, {"name": "Romeo", "team": "Falcons", "pin": "", "pinSet": false, "bankroll": 900, "role": "user"}, {"name": "Don", "team": "Saints", "pin": "", "pinSet": false, "bankroll": 950, "role": "user"}], "bets": [{"id": "BET-001", "user": "Tuane", "week": 1, "type": "Parlay", "status": "Won", "stake": 100, "odds": "+420", "payout": 520, "legs": ["Jets ML", "Cardinals ML", "Jaxson Dart Over Passing Yards"]}, {"id": "BET-002", "user": "Tuane", "week": 1, "type": "Parlay", "status": "Lost", "stake": 150, "odds": "+560", "payout": 0, "legs": ["Lamar Jackson Over INT", "Jaxson Dart Under INT", "Trey Benson Under Rushing Yards"]}, {"id": "BET-005", "user": "Tuane", "week": 4, "type": "Parlay", "status": "Pending", "stake": 150, "odds": "+705", "payout": 1207.5, "legs": ["Justin Fields Over 1.5 Passing TD", "Kyle Pitts Anytime TD", "Panthers ML"]}, {"id": "BET-006", "user": "Tuane", "week": 4, "type": "Parlay", "status": "Pending", "stake": 50, "odds": "+236", "payout": 168, "legs": ["Bills Defense Over 1.5 Sacks", "Derrick Henry Over 2.5 Rushing Attempts", "Jonas Sanker Over 1.5 Tackles"]}], "games": [{"id": "G-NYJ-TB", "type": "user", "away": "Jets", "home": "Buccaneers", "awayOwner": "Des", "homeOwner": "Tuane", "time": "Sun 4:25 PM", "markets": {"spread": ["Jets +2.5", "-108", "Buccaneers -2.5", "-112"], "money": ["Jets ML", "+120", "Buccaneers ML", "-142"], "total": ["Over 49.5", "-110", "Under 49.5", "-110"]}, "props": [{"player": "Jaxson Dart", "team": "Jets", "owner": "Des", "group": "QB Props", "legs": [["Over 224.5 Passing Yards", "-120"], ["Over 1.5 Passing TD", "+110"], ["Over 0.5 INT", "-135"], ["Over 34.5 Rush Yards", "-102"]]}, {"player": "Cam Skattebo", "team": "Jets", "owner": "Des", "group": "RB Props", "legs": [["Over 53.5 Rush Yards", "-115"], ["Over 12.5 Attempts", "-120"], ["Anytime TD", "+145"], ["Over 1.5 Receptions", "+110"]]}, {"player": "Elic Ayomanor", "team": "Jets", "owner": "Des", "group": "WR Props", "legs": [["Over 64.5 Receiving Yards", "-118"], ["Over 4.5 Receptions", "-105"], ["Anytime TD", "+165"], ["75+ Receiving Yards", "+145"]]}, {"player": "Trevor Lawrence", "team": "Buccaneers", "owner": "Tuane", "group": "QB Props", "legs": [["Over 274.5 Passing Yards", "-125"], ["Over 1.5 Passing TD", "-145"], ["Over 0.5 INT", "+125"], ["300+ Passing Yards", "+145"]]}, {"player": "Jonathan Taylor", "team": "Buccaneers", "owner": "Tuane", "group": "RB Props", "legs": [["Over 79.5 Rush Yards", "-118"], ["Over 13.5 Attempts", "-112"], ["Anytime TD", "-150"], ["100+ Rush Yards", "+165"]]}, {"player": "DK Metcalf", "team": "Buccaneers", "owner": "Tuane", "group": "WR Props", "legs": [["Over 74.5 Receiving Yards", "-120"], ["Over 4.5 Receptions", "-115"], ["Anytime TD", "+105"], ["100+ Receiving Yards", "+180"]]}, {"player": "Jack Campbell", "team": "Buccaneers", "owner": "Tuane", "group": "Defense Props", "legs": [["Over 7.5 Tackles", "-120"], ["Over 9.5 Tackles", "+135"], ["10+ Tackles", "+145"], ["Any Sack", "+700"]]}]}, {"id": "G-ATL-CAR", "type": "user", "away": "Falcons", "home": "Panthers", "awayOwner": "Romeo", "homeOwner": "", "time": "Sun 8:20 PM", "markets": {"spread": ["Falcons +3.5", "-110", "Panthers -3.5", "-110"], "money": ["Falcons ML", "+145", "Panthers ML", "-172"], "total": ["Over 47.5", "-108", "Under 47.5", "-112"]}, "props": [{"player": "J.J. McCarthy", "team": "Falcons", "owner": "Romeo", "group": "QB Props", "legs": [["Over 189.5 Passing Yards", "-115"], ["Over 0.5 INT", "-150"], ["Over 1.5 Passing TD", "+135"], ["Over 14.5 Rush Yards", "+100"]]}, {"player": "Derrick Henry", "team": "Falcons", "owner": "Romeo", "group": "RB Props", "legs": [["Over 11.5 Attempts", "-135"], ["Over 54.5 Rush Yards", "-118"], ["Anytime TD", "+125"], ["Over 2.5 Rush Attempts", "-350"]]}, {"player": "Kayshon Boutte", "team": "Falcons", "owner": "Romeo", "group": "WR Props", "legs": [["Over 49.5 Receiving Yards", "-112"], ["Over 3.5 Receptions", "-118"], ["Anytime TD", "+175"], ["60+ Receiving Yards", "+115"]]}, {"player": "Cody Barton", "team": "Falcons", "owner": "Romeo", "group": "Defense Props", "legs": [["Over 6.5 Tackles", "-120"], ["Over 8.5 Tackles", "+135"], ["Any Sack", "+650"], ["Any INT", "+750"]]}]}, {"id": "G-MIA-BUF", "type": "cpu", "away": "Dolphins", "home": "Bills", "awayOwner": "", "homeOwner": "Rob", "time": "Sun 1:00 PM", "markets": {"spread": ["Dolphins +5.5", "-108", "Bills -5.5", "-112"], "money": ["Dolphins ML", "+185", "Bills ML", "-225"], "total": ["Over 51.5", "-110", "Under 51.5", "-110"]}, "props": [{"player": "Justin Fields", "team": "Bills", "owner": "Rob", "group": "QB Props", "legs": [["Over 224.5 Passing Yards", "-118"], ["Over 1.5 Passing TD", "-128"], ["Over 0.5 INT", "+105"], ["250+ Passing Yards", "+145"]]}, {"player": "Trey Benson", "team": "Bills", "owner": "Rob", "group": "RB Props", "legs": [["Over 74.5 Rush Yards", "-120"], ["Over 13.5 Attempts", "-110"], ["Anytime TD", "+120"], ["100+ Rush Yards", "+175"]]}, {"player": "Kyle Pitts", "team": "Bills", "owner": "Rob", "group": "WR Props", "legs": [["Over 58.5 Receiving Yards", "-118"], ["Over 4.5 Receptions", "-112"], ["Anytime TD", "+135"], ["75+ Receiving Yards", "+155"]]}, {"player": "Adonai Mitchell", "team": "Bills", "owner": "Rob", "group": "WR Props", "legs": [["Over 49.5 Receiving Yards", "-105"], ["Over 3.5 Receptions", "+100"], ["Anytime TD", "+210"], ["60+ Receiving Yards", "+130"]]}, {"player": "Jonas Sanker", "team": "Bills", "owner": "Rob", "group": "Defense Props", "legs": [["Over 4.5 Tackles", "-125"], ["Any INT", "+420"], ["Over 0.5 Pass Deflections", "+210"], ["6+ Tackles", "+145"]]}, {"player": "Devin Lloyd", "team": "Bills", "owner": "Rob", "group": "Defense Props", "legs": [["Over 0.5 Sack", "+130"], ["Over 5.5 Tackles", "-110"], ["Over 7.5 Tackles", "+165"], ["Any TFL", "+120"]]}]}, {"id": "G-NO-SEA", "type": "cpu", "away": "Saints", "home": "Seahawks", "awayOwner": "Don", "homeOwner": "", "time": "Sun 4:05 PM", "markets": {"spread": ["Saints +2.5", "-110", "Seahawks -2.5", "-110"], "money": ["Saints ML", "+118", "Seahawks ML", "-138"], "total": ["Over 46.5", "-108", "Under 46.5", "-112"]}, "props": [{"player": "Lamar Jackson", "team": "Saints", "owner": "Don", "group": "QB Props", "legs": [["Over 224.5 Passing Yards", "-118"], ["Over 1.5 Passing TD", "-125"], ["Over 44.5 Rush Yards", "-112"], ["Over 0.5 INT", "+115"]]}, {"player": "Laviska Shenault Jr.", "team": "Saints", "owner": "Don", "group": "WR Props", "legs": [["Over 59.5 Receiving Yards", "-110"], ["Over 4.5 Receptions", "-105"], ["Anytime TD", "+150"], ["75+ Receiving Yards", "+165"]]}, {"player": "Quinshon Judkins", "team": "Saints", "owner": "Don", "group": "RB Props", "legs": [["Over 51.5 Rush Yards", "-118"], ["Over 11.5 Attempts", "-125"], ["Anytime TD", "+160"], ["Over 2.5 Receptions", "+145"]]}, {"player": "Saints Defense", "team": "Saints", "owner": "Don", "group": "Defense Props", "legs": [["Over 1.5 Sacks", "+125"], ["Any INT", "+185"], ["Over 5.5 Team Tackles For Loss", "+135"], ["Defensive TD", "+900"]]}]}, {"id": "G-KC-NYG", "type": "cpu", "away": "Chiefs", "home": "Giants", "awayOwner": "", "homeOwner": "", "time": "Sun 1:00 PM", "markets": {"spread": ["Chiefs -6.5", "-110", "Giants +6.5", "-110"], "money": ["Chiefs ML", "-270", "Giants ML", "+220"], "total": ["Over 47.5", "-110", "Under 47.5", "-110"]}, "props": []}, {"id": "G-DAL-CHI", "type": "cpu", "away": "Cowboys", "home": "Bears", "awayOwner": "", "homeOwner": "", "time": "Sun 1:00 PM", "markets": {"spread": ["Cowboys -4.5", "-112", "Bears +4.5", "-108"], "money": ["Cowboys ML", "-185", "Bears ML", "+155"], "total": ["Over 44.5", "-108", "Under 44.5", "-112"]}, "props": []}], "futures": [{"group": "Playoff Futures", "items": [["Jets Make Playoffs", "-180"], ["Buccaneers Make Playoffs", "-240"], ["Bills Make Playoffs", "-195"], ["Saints Miss Playoffs", "+135"], ["Falcons Under 12.5 Wins", "-120"]]}, {"group": "Season Leaders", "items": [["Trevor Lawrence Most Pass Yards", "+220"], ["Justin Fields Most Pass TD", "+350"], ["Jaxson Dart Most Pass TD", "+280"], ["Jonathan Taylor Rush Leader", "+260"], ["DK Metcalf Rec Yards Leader", "+175"]]}]};
let state = loadState();
let currentUser = null;
let currentPage = 'homePage';
let sportsbookMode = 'all';
let betSlip = [];

function loadState(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(DEFAULT_STATE); }
  catch(e){ return structuredClone(DEFAULT_STATE); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function money(v){ return '$' + Number(v).toFixed(2); }
function me(){ return state.users.find(u => u.name === currentUser); }
function americanToDecimal(odds){
  const n = Number(String(odds).replace('+',''));
  return String(odds).startsWith('+') ? 1 + (n/100) : 1 + (100/Math.abs(n));
}
function combineOdds(items){
  if(!items.length) return null;
  let dec = 1;
  items.forEach(i => dec *= americanToDecimal(i.odds));
  const amer = dec >= 2 ? Math.round((dec - 1) * 100) : Math.round(-100 / (dec - 1));
  return amer > 0 ? '+' + amer : String(amer);
}
function payout(stake, odds){
  const n = Number(String(odds).replace('+',''));
  return String(odds).startsWith('+') ? stake + (stake * n / 100) : stake + (stake * 100 / Math.abs(n));
}

function renderAuth(){
  const root = document.getElementById('authRoot');
  root.innerHTML = `
    <div class="authWrap">
      <div class="authCard">
        <div class="authHead">
          <div class="logo">FD</div>
          <div><h2>FinalDraft</h2><p>Select your name. First login creates your PIN.</p></div>
        </div>
        <label>User
          <select id="userSelect">
            ${state.users.map(u => `<option value="${u.name}">${u.name} — ${u.team}</option>`).join('')}
          </select>
        </label>
        <div id="pinFields"></div>
        <button id="authBtn" class="primary">Continue</button>
      </div>
    </div>
  `;
  const select = document.getElementById('userSelect');
  const pinFields = document.getElementById('pinFields');
  const drawFields = () => {
    const user = state.users.find(u => u.name === select.value);
    pinFields.innerHTML = user.pinSet ? `
      <label>Enter PIN
        <input id="loginPin" class="pinInput" inputmode="numeric" maxlength="6" type="password" placeholder="••••">
      </label>
    ` : `
      <label>Create PIN
        <input id="createPin" class="pinInput" inputmode="numeric" maxlength="6" type="password" placeholder="••••">
      </label>
      <label>Confirm PIN
        <input id="confirmPin" class="pinInput" inputmode="numeric" maxlength="6" type="password" placeholder="••••">
      </label>
    `;
  };
  select.onchange = drawFields;
  drawFields();

  document.getElementById('authBtn').onclick = () => {
    const user = state.users.find(u => u.name === select.value);
    if (user.pinSet) {
      const pin = document.getElementById('loginPin').value.trim();
      if (pin !== user.pin) { alert('Wrong PIN'); return; }
    } else {
      const a = document.getElementById('createPin').value.trim();
      const b = document.getElementById('confirmPin').value.trim();
      if (!/^\d{4,6}$/.test(a)) { alert('PIN must be 4 to 6 digits'); return; }
      if (a !== b) { alert('PINs do not match'); return; }
      user.pin = a; user.pinSet = true; saveState();
    }
    currentUser = user.name;
    document.getElementById('authRoot').classList.add('hidden');
    document.getElementById('appRoot').classList.remove('hidden');
    renderApp();
  };
}

function openPage(id){
  currentPage = id;
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.querySelectorAll('.navBtn').forEach(btn => btn.classList.toggle('active', btn.dataset.page === id));
}

function renderHome(){
  const user = me();
  const openBets = state.bets.filter(b => b.user === currentUser && b.status === 'Pending').length;
  const won = state.bets.filter(b => b.user === currentUser && b.status === 'Won').length;
  const lost = state.bets.filter(b => b.user === currentUser && b.status === 'Lost').length;
  document.getElementById('homePage').innerHTML = `
    <div class="card">
      <div class="sectionTitle">Welcome back, ${user.name}</div>
      <div class="muted">${user.team} • ${state.games.length} listed games • sportsbook final build</div>
      <div class="kpiGrid">
        <div class="kpi"><div class="n">Bankroll</div><div class="v">${money(user.bankroll)}</div></div>
        <div class="kpi"><div class="n">Open Bets</div><div class="v">${openBets}</div></div>
        <div class="kpi"><div class="n">Wins</div><div class="v">${won}</div></div>
        <div class="kpi"><div class="n">Losses</div><div class="v">${lost}</div></div>
      </div>
      <div class="slimNote">User vs CPU gets a bigger board. User vs user stays featured and cleaner.</div>
    </div>
    <div class="card">
      <div class="sectionTitle">Weekly Board</div>
      <div class="totalCount">${state.games.length} games loaded • roughly 150+ starter legs loaded in this build</div>
      <hr class="sep">
      <div class="muted">Use the Sportsbook tab to browse all lines, player props, defense props, and futures.</div>
    </div>
  `;
}

function legObj(label, odds, gameId, owner, gameType){
  return { id: gameId + '|' + label, label, odds, gameId, owner, gameType };
}
function isBlocked(owner, gameType){
  return gameType === 'user' && owner && owner === currentUser;
}

function renderSportsbook(){
  const root = document.getElementById('sportsbookPage');
  const games = state.games.filter(g => sportsbookMode === 'all' ? true : g.type === sportsbookMode);
  root.innerHTML = `
    <div class="card">
      <div class="sectionTitle">Sportsbook</div>
      <div class="muted">FinalDraft board • cleaner mobile layout • more legs</div>
      <div class="tabs" style="margin-top:12px">
        <button class="${sportsbookMode==='all'?'active':''}" id="modeAll">All Games</button>
        <button class="${sportsbookMode==='cpu'?'active':''}" id="modeCpu">User vs CPU</button>
        <button class="${sportsbookMode==='user'?'active':''}" id="modeUser">User vs User</button>
        <button id="modeFutures">Futures</button>
      </div>
      <div class="slimNote">User vs user picks on your own team are locked to avoid betting on yourself in weekly games.</div>
    </div>
    <div id="sportsbookGames"></div>
    <div id="futuresWrap" class="hidden"></div>
  `;
  document.getElementById('modeAll').onclick = () => { sportsbookMode = 'all'; renderSportsbook(); };
  document.getElementById('modeCpu').onclick = () => { sportsbookMode = 'cpu'; renderSportsbook(); };
  document.getElementById('modeUser').onclick = () => { sportsbookMode = 'user'; renderSportsbook(); };
  document.getElementById('modeFutures').onclick = () => {
    document.getElementById('sportsbookGames').classList.add('hidden');
    const f = document.getElementById('futuresWrap');
    f.classList.remove('hidden');
    f.innerHTML = state.futures.map(group => `
      <div class="card">
        <div class="sectionTitle">${group.group}</div>
        <div class="oddsGrid" style="margin-top:12px">
          ${group.items.map(item => `
            <button class="oddBtn futurePick" data-leg='${JSON.stringify(legObj(item[0], item[1], 'FUTURES', '', 'cpu'))}'>
              <span class="oddTop">${item[0]}</span>
              <span class="oddBottom">${item[1]}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
    bindPickButtons();
  };

  const wrap = document.getElementById('sportsbookGames');
  wrap.innerHTML = games.map(game => {
    const m = game.markets;
    return `
      <div class="gameCard">
        <div class="gameHead">
          <div>
            <div class="gameTitle">${game.away} @ ${game.home}</div>
            <div class="gameMeta">${game.time} • ${game.type === 'user' ? 'User vs User' : 'User vs CPU'}</div>
          </div>
          <div class="gameType ${game.type}">${game.type === 'user' ? 'Featured Board' : 'Full Board'}</div>
        </div>

        <div class="marketSection">
          <div class="marketHeader"><h3>Game Lines</h3></div>
          <div class="oddsGrid">
            <button class="oddBtn pickBtn" data-leg='${JSON.stringify(legObj(m.spread[0], m.spread[1], game.id, '', game.type))}'><span class="oddTop">${m.spread[0]}</span><span class="oddBottom">${m.spread[1]}</span></button>
            <button class="oddBtn pickBtn" data-leg='${JSON.stringify(legObj(m.spread[2], m.spread[3], game.id, '', game.type))}'><span class="oddTop">${m.spread[2]}</span><span class="oddBottom">${m.spread[3]}</span></button>
            <button class="oddBtn pickBtn" data-leg='${JSON.stringify(legObj(m.money[0], m.money[1], game.id, '', game.type))}'><span class="oddTop">${m.money[0]}</span><span class="oddBottom">${m.money[1]}</span></button>
            <button class="oddBtn pickBtn" data-leg='${JSON.stringify(legObj(m.money[2], m.money[3], game.id, '', game.type))}'><span class="oddTop">${m.money[2]}</span><span class="oddBottom">${m.money[3]}</span></button>
            <button class="oddBtn pickBtn" data-leg='${JSON.stringify(legObj(m.total[0], m.total[1], game.id, '', game.type))}'><span class="oddTop">${m.total[0]}</span><span class="oddBottom">${m.total[1]}</span></button>
            <button class="oddBtn pickBtn" data-leg='${JSON.stringify(legObj(m.total[2], m.total[3], game.id, '', game.type))}'><span class="oddTop">${m.total[2]}</span><span class="oddBottom">${m.total[3]}</span></button>
          </div>
        </div>

        ${game.props.length ? game.props.map(prop => `
          <div class="marketSection">
            <div class="propCard">
              <div class="propTop">
                <div>
                  <div class="propName">${prop.player}</div>
                  <div class="propMeta">${prop.team} • ${prop.group}</div>
                </div>
                <div class="ownerTag">${prop.owner || 'CPU'}</div>
              </div>
              <div class="oddsGrid">
                ${prop.legs.map(leg => {
                  const payload = legObj(prop.player + ' ' + leg[0], leg[1], game.id, prop.owner, game.type);
                  const disabled = isBlocked(prop.owner, game.type) ? 'disabled' : '';
                  return `<button class="oddBtn pickBtn ${disabled ? 'disabled' : ''}" ${disabled} data-leg='${JSON.stringify(payload)}'><span class="oddTop">${leg[0]}</span><span class="oddBottom">${leg[1]}</span></button>`;
                }).join('')}
              </div>
            </div>
          </div>
        `).join('') : ''}
      </div>
    `;
  }).join('');
  bindPickButtons();
}

function bindPickButtons(){
  document.querySelectorAll('.pickBtn,.futurePick').forEach(btn => {
    const payload = JSON.parse(btn.dataset.leg);
    if (betSlip.some(x => x.id === payload.id)) btn.classList.add('selected');
    btn.onclick = () => {
      const idx = betSlip.findIndex(x => x.id === payload.id);
      if (idx >= 0) betSlip.splice(idx, 1); else betSlip.push(payload);
      renderSportsbook(); renderBetSlip();
    };
  });
}

function renderBetSlip(){
  const root = document.getElementById('betslipPage');
  const odds = combineOdds(betSlip);
  const currentStake = Number(document.getElementById('stakeInput')?.value || 20);
  root.innerHTML = `
    <div class="card">
      <div class="sectionTitle">Bet Slip</div>
      <div class="muted">${betSlip.length} pick(s) selected</div>
    </div>
    ${betSlip.length ? betSlip.map(item => `
      <div class="betCard">
        <div class="betCardTop">
          <div><div class="betId">${item.label}</div><div class="muted">${item.gameId}</div></div>
          <button class="pill removeLeg" data-id="${item.id}">Remove</button>
        </div>
        <div class="betMetaGrid">
          <div class="betMetaBox"><div class="n">Odds</div><div class="v">${item.odds}</div></div>
          <div class="betMetaBox"><div class="n">Type</div><div class="v">${item.gameType.toUpperCase()}</div></div>
          <div class="betMetaBox"><div class="n">Owner</div><div class="v">${item.owner || 'OPEN'}</div></div>
        </div>
      </div>
    `).join('') : `<div class="card"><div class="muted">No picks yet. Go tap some legs in Sportsbook.</div></div>`}
    <div class="card">
      <label>Stake
        <input id="stakeInput" type="number" min="10" step="10" value="${currentStake}">
      </label>
      <div class="betMetaGrid">
        <div class="betMetaBox"><div class="n">Picks</div><div class="v">${betSlip.length}</div></div>
        <div class="betMetaBox"><div class="n">Combined Odds</div><div class="v">${odds || '—'}</div></div>
        <div class="betMetaBox"><div class="n">Projected Payout</div><div class="v">${odds ? money(payout(currentStake, odds)) : '$0.00'}</div></div>
      </div>
      <div style="height:12px"></div>
      <button id="placeBetBtn" class="primary">Place Bet</button>
    </div>
  `;
  document.querySelectorAll('.removeLeg').forEach(btn => {
    btn.onclick = () => { betSlip = betSlip.filter(x => x.id !== btn.dataset.id); renderBetSlip(); renderSportsbook(); };
  });
  document.getElementById('stakeInput')?.addEventListener('input', renderBetSlip);
  document.getElementById('placeBetBtn').onclick = () => {
    if (!betSlip.length) { alert('Add picks first'); return; }
    const stake = Number(document.getElementById('stakeInput').value || 0);
    if (stake < 10) { alert('Minimum stake is $10'); return; }
    if (stake > me().bankroll) { alert('Not enough bankroll'); return; }
    const combined = combineOdds(betSlip);
    const newBet = {
      id: 'BET-' + String(state.bets.length + 1).padStart(3, '0'),
      user: currentUser, week: state.currentWeek, type: betSlip.length > 1 ? 'Parlay' : 'Single',
      status: 'Pending', stake, odds: combined, payout: Number(payout(stake, combined).toFixed(2)),
      legs: betSlip.map(x => x.label)
    };
    state.bets.unshift(newBet);
    me().bankroll -= stake;
    betSlip = [];
    saveState();
    renderApp();
    openPage('mybetsPage');
  };
}

function betCardHtml(bet, admin=false){
  return `
    <div class="betCard">
      <div class="betCardTop">
        <div><div class="betId">${bet.id}</div><div class="muted">${bet.user} • Week ${bet.week} • ${bet.type}</div></div>
        <div class="status ${bet.status}">${bet.status}</div>
      </div>
      <ul class="betLegs">${bet.legs.map(l => `<li>${l}</li>`).join('')}</ul>
      <div class="betMetaGrid">
        <div class="betMetaBox"><div class="n">Odds</div><div class="v">${bet.odds}</div></div>
        <div class="betMetaBox"><div class="n">Stake</div><div class="v">${money(bet.stake)}</div></div>
        <div class="betMetaBox"><div class="n">Payout</div><div class="v">${money(bet.payout)}</div></div>
      </div>
      ${admin && bet.status === 'Pending' ? `
        <div class="settleGrid">
          <button class="settleBtn winBtn settle" data-id="${bet.id}" data-status="Won">Win</button>
          <button class="settleBtn lossBtn settle" data-id="${bet.id}" data-status="Lost">Loss</button>
          <button class="settleBtn voidBtn settle" data-id="${bet.id}" data-status="Void">Void</button>
          <button class="settleBtn pushBtn settle" data-id="${bet.id}" data-status="Push">Push</button>
        </div>` : ''}
    </div>
  `;
}

function renderMyBets(){
  const bets = state.bets.filter(b => b.user === currentUser);
  document.getElementById('mybetsPage').innerHTML = `
    <div class="card"><div class="sectionTitle">My Bets</div><div class="muted">Cleaner cards instead of a cramped table.</div></div>
    ${bets.map(b => betCardHtml(b, false)).join('') || `<div class="card"><div class="muted">No bets yet.</div></div>`}
  `;
}
function renderBoard(){
  const users = [...state.users].sort((a,b) => b.bankroll - a.bankroll);
  document.getElementById('boardPage').innerHTML = `
    <div class="card"><div class="sectionTitle">Leaderboard</div><div class="muted">Bankroll ranking</div></div>
    ${users.map((u,i) => `<div class="boardRow"><div class="rank">${i+1}</div><div><div style="font-weight:900;font-size:18px">${u.name}</div><div class="muted">${u.team}</div></div><div style="font-weight:900;font-size:22px">${money(u.bankroll)}</div></div>`).join('')}
  `;
}
function settleBet(id, status){
  const bet = state.bets.find(b => b.id === id);
  if (!bet || bet.status !== 'Pending') return;
  const user = state.users.find(u => u.name === bet.user);
  if (status === 'Won') user.bankroll += bet.payout;
  if (status === 'Void' || status === 'Push') user.bankroll += bet.stake;
  bet.status = status;
  saveState(); renderApp(); openPage('adminPage');
}
function renderAdmin(){
  const root = document.getElementById('adminPage');
  if (me().role !== 'commissioner'){
    root.innerHTML = `<div class="card"><div class="sectionTitle">Admin</div><div class="muted">Commissioner only.</div></div>`;
    return;
  }
  root.innerHTML = `
    <div class="card">
      <div class="sectionTitle">Admin</div>
      <div class="muted">Use your admin PIN to unlock grading and commands.</div>
      <label>Admin PIN<input id="adminPinInput" class="pinInput" inputmode="numeric" maxlength="6" type="password" placeholder="••••"></label>
      <button id="unlockAdminBtn" class="primary">Unlock Admin</button>
    </div>
    <div id="adminUnlocked" class="hidden"></div>
  `;
  document.getElementById('unlockAdminBtn').onclick = () => {
    const pin = document.getElementById('adminPinInput').value.trim();
    if (pin !== state.adminPin){ alert('Wrong admin PIN'); return; }
    const unlocked = document.getElementById('adminUnlocked');
    unlocked.classList.remove('hidden');
    unlocked.innerHTML = `
      <div class="card"><div class="sectionTitle">Pending Bets</div><div class="muted">Grade wins, losses, voids, or pushes.</div></div>
      ${state.bets.filter(b => b.status === 'Pending').map(b => betCardHtml(b, true)).join('') || `<div class="card"><div class="muted">No pending bets.</div></div>`}
      <div class="card">
        <div class="sectionTitle">Command Center</div>
        <div class="muted">Paste weekly JSON updates here later.</div>
        <label>Commands<textarea id="commandBox" rows="9">{\"commands\":[{\"action\":\"setWeek\",\"week\":4}]}</textarea></label>
        <button id="runCommandsBtn" class="secondary">Run Commands</button>
      </div>
    `;
    document.querySelectorAll('.settle').forEach(btn => {
      btn.onclick = () => settleBet(btn.dataset.id, btn.dataset.status);
    });
    document.getElementById('runCommandsBtn').onclick = () => {
      try{
        const parsed = JSON.parse(document.getElementById('commandBox').value);
        (parsed.commands || []).forEach(cmd => { if (cmd.action === 'setWeek') state.currentWeek = Number(cmd.week); });
        saveState(); alert('Commands applied'); renderApp(); openPage('adminPage');
      } catch(e){ alert('Invalid JSON'); }
    };
  };
}
function renderApp(){
  document.getElementById('appTitle').textContent = state.appName;
  document.getElementById('weekBtn').textContent = 'Week ' + state.currentWeek;
  document.getElementById('adminTabBtn').style.display = me().role === 'commissioner' ? 'inline-block' : 'none';
  document.getElementById('logoutBtn').onclick = () => {
    currentUser = null;
    document.getElementById('appRoot').classList.add('hidden');
    document.getElementById('authRoot').classList.remove('hidden');
    renderAuth();
  };
  document.getElementById('adminTabBtn').onclick = () => openPage('adminPage');
  document.querySelectorAll('.navBtn').forEach(btn => btn.onclick = () => openPage(btn.dataset.page));
  renderHome(); renderSportsbook(); renderBetSlip(); renderMyBets(); renderBoard(); renderAdmin(); openPage(currentPage);
}
renderAuth();
