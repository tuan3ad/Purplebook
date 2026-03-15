
let bankrolls={
Tuane:300,
Des:300,
Rob:300,
Romeo:300,
Don:300
}

function openPlayer(name){
document.getElementById("playerScreen").classList.remove("hidden")
document.getElementById("playerName").innerText=name
}

function closePlayer(){
document.getElementById("playerScreen").classList.add("hidden")
}

document.querySelectorAll("button").forEach(btn=>{
btn.addEventListener("click",()=>{
console.log("Bet added:",btn.innerText)
})
})
