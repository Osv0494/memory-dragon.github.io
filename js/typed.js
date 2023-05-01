const typewriter = document.getElementById('typewriter');

function writeLetters(text = "", timer = "", label = "") {
  let arrayCharacters = text.split("");
  label.innerHTML = "";
  let cont = 0;
  let writer = setInterval(function () {
    label.innerHTML += arrayCharacters[cont];
    cont++;
    if (cont === arrayCharacters.length) {
      clearInterval(writer);
    }
  }, timer);
}
writeLetters(
  "Hello welcome Test your memory!",
  150,
  typewriter
);
//section changes: start,game,finally
function sectionChanges(section,close){
    section.style.display = 'grid';
    close.style.display = 'none';
    };
//section changes to game
let sectionStart = document.querySelector('.presentation');
let sectionGame = document.querySelector('.game');
let sectionFinally = document.querySelector('.finally');
let gameBtn = document.querySelector('.start-game_btn');
gameBtn.addEventListener('click',(e)=>{
    sectionChanges(sectionGame,sectionStart)
});
//section changes to finally
const finallyBtn = document.querySelector('.game-btn-finish');
finallyBtn.addEventListener('click',(evnt)=>{
    sectionChanges(sectionFinally,sectionGame);
})
//section changes to game from winner
let winner = document.querySelector('.winner');
let winnerBtn = document.querySelector('.winner-btn');
winnerBtn.addEventListener('click',(e)=>{
    winner.style.display = 'none';
    sectionGame.style.display = 'grid';
})

