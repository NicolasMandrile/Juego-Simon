
var gameSequence = [];
var playerSequence = [];
var level = 0;
var score = 0;
const colors = ['red', 'green', 'blue', 'yellow'];

function startGame() {
  gameSequence = [];
  playerSequence = [];
  level = 0;
  score = 0;
  document.getElementById('score').innerText = `Puntaje: ${score}`;
  document.getElementById('level').innerText = `Nivel: ${level}`;
  document.getElementById('start').disabled = true;
  for(let i = 0; i < 20; i++) {
    gameSequence.push(colors[Math.floor(Math.random() * 4)]);
  }
  displaySequence();
}

document.getElementById('start').addEventListener('click', startGame);

function displaySequence() {
  for(let i = 0; i <= level; i++) {
    setTimeout(function() {
      flashButton(gameSequence[i]);
    }, i * 1000);
  }
}

function flashButton(color) {
  let button = document.getElementById(color);
  button.classList.add('pressed');
  setTimeout(function() {
    button.classList.remove('pressed');
  }, 500);
}

var buttons = document.getElementsByClassName('game-button');

for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(e) {
    e.target.classList.add('pressed');
    setTimeout(function() {
      e.target.classList.remove('pressed');
    }, 500);
    playerSequence.push(e.target.id);
    if(playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
      alert('¡Has perdido! Haz clic en Comenzar para jugar de nuevo.');
      document.getElementById('start').disabled = false;
      return;
    }
    score++; // Se añade un punto por cada botón correcto
    document.getElementById('score').innerText = `Puntaje: ${score}`;
    if(playerSequence.length === gameSequence.length) {
      alert('¡Felicidades, has ganado! Haz clic en Comenzar para jugar de nuevo.');
      document.getElementById('start').disabled = false;
      return;
    }
    if(playerSequence.length === level + 1) {
      level++;
      playerSequence = [];
      setTimeout(function() {
        displaySequence();
      }, 1000);
    }
    document.getElementById('level').innerText = `Nivel: ${level}`;
  });
}