let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null; //null porque aun no sabemos el resultado.
let segundoResultado = null;
let movimientos = null;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicil = 60;
let tiempoRegresivoId = null;


let game = document.querySelector('.game');
let failed = document.querySelector('.failed');
let gameAnimeWords = document.querySelector('.game-anime_words');



let winAudio = new Audio("sound/win.wav");
let loseAudio = new Audio("sound/lose.wav");
let clickAudio = new Audio("sound/click.wav");
let rightAudio = new Audio("sound/right.wav");
let wrongAudio = new Audio("sound/wrong.wav");

//Apuntando documentos HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//Generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});

//funciones
function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Timer: ${timer} s`;
    if (timer === 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
      loseAudio.play();
      game.style.display = "none";
      failed.style.display = "grid";
    }
  }, 800);
}
//section changes to game from failed
let finallyCardBtn = document.querySelector('.failed_btn');
finallyCardBtn.addEventListener('click',(e)=>{
  console.log(finallyCardBtn);
    failed.style.display = "none";
    game.style.display = 'grid';
})

//esta funcion nos va a mostrar todos los numeros dentro de las tarjetas luego las bloqueara
function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetasBloqueada = document.getElementById(i);
    tarjetasBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`;
    tarjetasBloqueada.disabled = true;
  }
}


//Function prinsipal
function destapar(id) {
  if (temporizador === false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  if (tarjetasDestapadas === 1) {
    //Mostrar primer numero
    tarjeta1 = document.getElementById(id); //hacemos un llamado al
    primerResultado = numeros[id]; //usaras esta variable para luego poder comparar las tarjetas
    tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`; //innerHTML estamos imprimiendo en valor en el HTML
    clickAudio.play();

    //deshabilitar primer boton
    tarjeta1.disabled = true; //se desabilita el boton para que no lo puedas presionar dos veses
  } else if (tarjetasDestapadas == 2) {
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="">`;

    //desabilitar segundo boton
    tarjeta2.disabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Shift: ${movimientos}`;

    if (primerResultado === segundoResultado) {
      gameAnimeWords.innerHTML = "Excellent";//palbras de deagonila
      //encerrar contador tarjetas destapadas
      tarjetasDestapadas = 0;

      //Aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Correct: ${aciertos}`;
      rightAudio.play();

      if (aciertos === 8) {
        winAudio.play();
        let winner = document.querySelector('.winner');
        game.style.display = 'none';
        winner.style.display = 'grid';
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Correct:${aciertos}`;
        mostrarTiempo.innerHTML = `Timer:${timerInicil - timer} s`;
        mostrarMovimientos.innerHTML = `Shift:${movimientos}`;
        gameAnimeWords.innerHTML = "Congratulations you won!";
      }
    } else {
      wrongAudio.play();
      //mostrar momentaniamente valor y volverlo a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = " "; //' ' logramos el efecto de que se vea mas opaca la tarjeta
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false; //se borra la targeta y cambia el numero
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
        gameAnimeWords.innerHTML = "Good Luck for the next";
      }, 800);
    }
  }
}
//Restart Game-Card
restartBtn = document.querySelector('.game-btn-restart');
restartBtn.addEventListener('click',(e)=>{
  gameAnimeWords.innerHTML = "Good Luck!";
    //RestartTimer
  if (temporizador === true){
    clearInterval(tiempoRegresivoId);
    temporizador = false;
    timer = 60;
    mostrarTiempo.innerHTML = `Timer: ${timer} s`;
    //Restartshift
    movimientos = 0;
    mostrarMovimientos.innerHTML = `Shift: ${movimientos}`;
    //RestartCorrect
    aciertos = 0;
    mostrarAciertos.innerHTML = `Correct: ${aciertos}`;
  }
    //Restartcard
    tarjetasDestapadas = 0;
    primerResultado = null; 
    segundoResultado = null;
      var cards = document.querySelectorAll('.game-box');
      cards.forEach(function(li){
        li.innerHTML = "";
        li.disabled = false;
      })
      numeros = numeros.sort(() => {
        return Math.random() - 0.5;
      });
});
