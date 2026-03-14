
const bankrolls = {
  "Tuane": 1170,
  "Don": 950,
  "Romeo": 900,
  "Rob": 850,
  "Des": 700
};

const container = document.getElementById("bankrolls");

Object.entries(bankrolls).forEach(([name,balance])=>{
  const card=document.createElement("div");
  card.className="card";
  card.innerHTML=`<h2>${name}</h2><p>Bankroll: $${balance}</p>`;
  container.appendChild(card);
});
