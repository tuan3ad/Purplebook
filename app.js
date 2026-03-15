
const board = document.getElementById("board");

GAMES.forEach(game=>{
  const card=document.createElement("div");
  card.className="game";

  const title=document.createElement("h2");
  title.textContent=game.title;
  card.appendChild(title);

  const type=document.createElement("div");
  type.className="type";
  type.textContent=game.type+" • "+game.markets.length+" legs";
  card.appendChild(type);

  const grid=document.createElement("div");
  grid.className="markets";

  game.markets.forEach(m=>{
    const b=document.createElement("div");
    b.className="btn";
    b.textContent=m;
    grid.appendChild(b);
  });

  card.appendChild(grid);
  board.appendChild(card);
});
