// Purplebook main app

const app = document.getElementById("app");

function init() {
  renderHome();
}

function renderHome() {
  const users = window.APP_STATE.users;
  const games = window.APP_STATE.week4Games;

  app.innerHTML = `
  <div class="screen">

    <div class="topbar">
      <div class="brand-wrap">
        <div class="brand-badge">PB</div>
        <div class="brand-copy">
          <h1>${window.APP_STATE.app.name}</h1>
          <p>${window.APP_STATE.app.subtitle} • ${window.APP_STATE.app.weekLabel}</p>
        </div>
      </div>
    </div>

    <div class="card pad">
      <h2 class="section-title">Choose Your Name</h2>
      <div class="btn-grid">
        ${users.map(u => `
          <button class="btn primary" onclick="selectUser('${u.id}')">
            ${u.displayName}
          </button>
        `).join("")}
      </div>
    </div>

  </div>
  `;
}

function selectUser(id) {

  const user = window.APP_STATE.users.find(u => u.id === id);

  app.innerHTML = `
  <div class="screen">

    <div class="hero">
      <h2>Welcome ${user.displayName}</h2>
      <p>Bankroll: $${user.bankroll}</p>
    </div>

    <div class="card pad mt-20">
      <h3 class="section-title">Week 4 Games</h3>

      <div class="stack">

      ${window.APP_STATE.week4Games.map(g => `
        <div class="list-item">

          <h4>${g.away} @ ${g.home}</h4>
          <p>Status: ${g.status}</p>

        </div>
      `).join("")}

      </div>
    </div>

  </div>
  `;
}

init();
