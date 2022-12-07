const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.querySelector('#gameover-screen').style.display = 'none';

// start buttom color
function generateRandomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function changeColor() {
  let startButton = document.getElementsByClassName("start-button");
  for (i=0; i<startButton.length; i++) {
      startButton[i].style.backgroundColor = generateRandomColor();
  }
}

setInterval(changeColor, 300)
//------------------------

const gameScreen = new Image();
gameScreen.src = "../images/dirt-background.jpeg"

const partyScreen = new Image();
partyScreen.src = "Berghain-game/images/party-background.jpg"



let counter = 0;
let frames = 0;
let myObstacles = [];
let intervalId;

// CLASS
class Obstacles {
  constructor(width, height, color, x, y) {
    this.width = 60;
    this.height = height;
    this.color = color;
    this.x = canvas.width - 200;
    this.y = y;
    
    this.speedX = 0;
    this.speedY = 0;

    const fences = new Image();
    fences.addEventListener('load', () => {

    this.fences = fences;   
    });
    fences.src = "images/fences.png";
  }
  draw() {
    ctx.drawImage(this.fences, this.x, this.y, this.width, this.height);
  }
  update() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {

    return !(
    this.bottom() < obstacle.top() ||
    this.top() > obstacle.bottom() ||
    this.right() < obstacle.left() +5 ||
    this.left() > obstacle.right() -5
  );
}
}

class Building {
  constructor() {
    this.x = canvas.width - 145;
    this.y = -50;
 
    const theBuilding = new Image();
    theBuilding.addEventListener('load', () => {

    this.theBuilding = theBuilding;   
    });
    theBuilding.src = "images/Berghain-gameScreen.png";
  }
  draw() {
    ctx.drawImage(this.theBuilding, this.x, this.y, 200, 600);
  }
}


class Player {
  constructor() {
    this.x = canvas.width - 500//(canvas.width - 5);
    this.y = 250;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 70;
    this.height = 120;
  
    const avatar = new Image();
    avatar.addEventListener('load', () => {

    this.avatar = avatar;   
    });
    avatar.src = "images/avatar1.png";
  }
  draw() {
    ctx.drawImage(this.avatar, this.x, this.y, this.width, this.height);
  }
  
  
  moveUp() {
    this.y -= 20;
  }
  moveDown() {
    this.y += 20;
  }
  moveRight() {
    this.x += 5;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  right() {
    return this.x + this.width;
  }  
  left() {
    return this.x
  }  

//   crashWith(obstacle) {
//     console.log("condition 1", !this.bottom() < obstacle.top())
//     console.log("condition 2", !this.top() > obstacle.bottom())
//     console.log("condition 3", !this.right() < obstacle.left())
//     console.log("condition 4", !this.left() > obstacle.right())
//     return !(
//       this.bottom() < obstacle.top() || 
//       this.top() > obstacle.bottom() || 
//       this.right() < obstacle.left() +5 || 
//       this.left() > obstacle.right());
// }
}

// FUNCTIONS

function startGame() {
  drawGameScreen();
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
  ctx.drawImage(partyScreen, 0, 0, canvas.width, canvas.height);
  //canvas.style = 'opacity: 0.3;';
  function partyBackground() {
    let colorCh = document.getElementById("color-overlay")
    colorCh.style.backgroundColor = generateRandomColor();
    
  }
  partyBackground();
  setInterval(partyBackground, 500);
  //document.querySelector('#game-screen').style.display = 'none';
  //theBuilding.remove;
  
  

}

function gameOver() {
  document.querySelector('#game-screen').style.display = 'none';
  document.querySelector('#gameover-screen').style = 'justify-content: center;';

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
  
  

}
function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
    myObstacles[i].draw()
  }

  frames += 1;
  if (frames % 180 === 0) {
    let x = canvas.width;
    let y = canvas.height; // added
    let minHeight = 80;
    let maxHeight = 400;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let minGap = 130;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Obstacles(5, height, "gray", x, 0));
    myObstacles.push(new Obstacles(5, y - height - gap, "gray", x, height + gap)
      // new Obstacles(10, x - height - gap, "blue", x, height + gap)
      
    );
  }
}

function checkGameOver() {
  const crashed = myObstacles.some(function (obstacle) {// check if one of the obstacles has crashed with the player
    return crashWith(obstacle);
  });

  if(crashed) {
    stop();
    gameOver();
    //drawPartyScreen();
    //console.log(myObstacles[0], myObstacles[1]);
    //alert("game over")
    //alert("collision detected")
    console.log("game over");
  }
}

function crashWith(obstacle) {

    return !(
    playerAvatar.bottom() < obstacle.top() ||
    playerAvatar.top() > obstacle.bottom() ||
    playerAvatar.right() < obstacle.left() +5 ||
    playerAvatar.left() > obstacle.right() -5
  );
}




const playerAvatar = new Player();
const theBuilding = new Building();


// WINDOW

window.onload = () => {
  document.getElementById('start-button'). onclick = () => {
    //console.log(button)
   // button.addEventListener('click', () => {
      startGame();
      intervalId = setInterval(updateGame, 20);
    };

    document.getElementById('restart-button'). onclick = () => {
      //console.log(button)
     // button.addEventListener('click', () => {
        clearInterval(intervalId);
        myObstacles = [];
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
  }
  
});

