const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.querySelector('#gameover-screen').style.display = 'none';
document.querySelector('#party-screen').style.display = 'none';


// start buttom color
function generateRandomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function changeColor() {
  let startButton = document.getElementsByClassName("start-button");
  let restartButton = document.getElementsByClassName("restart-button");
  for (i=0; i<startButton.length; i++) {
      startButton[i].style.backgroundColor = generateRandomColor();
  }
  for (i=0; i<restartButton.length; i++) {
    restartButton[i].style.backgroundColor = generateRandomColor();
  }
}

setInterval(changeColor, 300)
//------------------------

const gameScreen = new Image();
gameScreen.src = "./images/dirt-background.jpeg"

const partyScreen = new Image();
partyScreen.src = "./images/party-background.jpg"

const gameoverScreen = new Image();
gameoverScreen.src = "./images/berghain-not.today.jpg"

const soundGameOver = new Audio("./sounds/birthofahero.mp3");
const soundParty = new Audio("./sounds/dance.mp3");


let counter = 0;
let frames = 0;
let myObstacles = [];
let intervalId;
let currentPlayer

// FUNCTIONS

function startGame() {
  drawGameScreen();
  myObstacles = [];
  frames = 0
  playerAvatar.draw();
  theBuilding.draw()
}

function stop() {
  clearInterval(intervalId);
}

function drawGameScreen () {
  
  ctx.drawImage(gameScreen, 0, 0, canvas.width, canvas.height);
  document.querySelector('.game-intro').style.display = 'none';
  document.querySelector('#gameover-screen').style.display = 'none'; // document.querySelector(".game-intro").remove();
  document.querySelector('#game-screen').style = 'display: flex; justify-content: center;'; 
}

function drawPartyScreen() {
  document.querySelector('#party-screen').style ='justify-content: center;';
  ctx.drawImage(partyScreen, 0, 0, canvas.width, canvas.height);
  ctx.font = '18px arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Time: ${time}min`, canvas.width -150, 35);
  soundParty.currentTime = 0;
  soundParty.volume = 0.6;
  soundParty.play();
  
  // function partyBackground() {
  //   let overlay = document.getElementsByClassName("canvas");
  // for (i=0; i<overlay.length; i++) {
  //   overlay[i].style.backgroundColor = generateRandomColor();
  // }
  // ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
  // }
  
  // setInterval(partyBackground, 500);
  //document.querySelector('#game-screen').style.display = 'none';
  
}

function gameOver() {
  //document.querySelector('#game-screen').style.display = 'none';
  document.querySelector('#gameover-screen').style = 'justify-content: center;';
  ctx.drawImage(gameoverScreen, 0, 0, canvas.width, canvas.height);
  ctx.font = '18px arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Time: ${time}min`, canvas.width -150, 35);
  soundGameOver.currentTime = 0;
  soundGameOver.volume = 0.2;
  soundGameOver.play();
}

function updateTimer() {
  time = Math.floor(frames/10); // 1 sec -->12
  ctx.font = '18px arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Time: ${time}min`, canvas.width -150, 35);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.Width, canvas.height);
  drawGameScreen();
  theBuilding.draw();
  playerAvatar.draw();
  updateObstacles();
  updateTimer();
  checkGameOver();
  //playerAvatar.frontDoor();
}
function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
    myObstacles[i].draw()
  }

  frames += 1;
  if (frames % 140 === 0) {
    let x = canvas.width;
    let y = canvas.height; // added
    let minHeight = 80;
    let maxHeight = 400;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let minGap = 160;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Obstacles(5, height, "gray", x, 0));
    myObstacles.push(new Obstacles(5, y - height - gap, "gray", x, height + gap)
      // new Obstacles(10, x - height - gap, "blue", x, height + gap)
      
    );
  }
}

function checkPartyIn() {
  stop();
  if (time % 5 == 0) {
    gameOver()
  }
  else {
    drawPartyScreen()
  }

}


function checkGameOver() {
  const crashed = myObstacles.some(function (obstacle) {// check if one of the obstacles has crashed with the player
    return crashWith(obstacle);
  });

  const frontDoor = crashWith(theBuilding)
  if (frontDoor) {
    checkPartyIn();
  }

  if(crashed) {
    stop();
    gameOver();
    //alert("collision detected")
    console.log("game over");
  }
}

function crashWith(obstacle) {

    return !(
    playerAvatar.bottom() < obstacle.top() +20||
    playerAvatar.top() > obstacle.bottom() -20||
    playerAvatar.right() < obstacle.left() +10||
    playerAvatar.left() > obstacle.right() -10
  );
}

const playerAvatar = new Player();
const theBuilding = new Building();

// WINDOW

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
      startGame();
      intervalId = setInterval(updateGame, 20);
    };

    document.getElementById('restart-button').onclick = () => {
        clearInterval(intervalId);
        playerAvatar.x = canvas.width - (canvas.width + 5);
        playerAvatar.y = 250;
        soundGameOver.pause();
        soundParty.pause();
        startGame();
        setTimeout(() => intervalId = setInterval(updateGame, 20), 100);
      };
  }         

//EVENT LISTENER
document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 38:
      playerAvatar.moveUp();
      console.log('up', playerAvatar);
      break;
    case 40:
      playerAvatar.moveDown();
      console.log('down', playerAvatar);
      break;
    case 39:
      playerAvatar.moveRight();
      console.log('right', playerAvatar);
      break;
      // case 37:
      // playerAvatar.moveLeft();
      // console.log('left', playerAvatar);
      // break;
  }
  
});

