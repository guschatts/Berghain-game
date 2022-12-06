const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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




const gameScreen = new Image();
gameScreen.src = "/images/dirt-background.jpeg"

let counter = 0;
let frames = 0;
const myObstacles = [];
let intervalId;

// CLASS
class obstacles {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    // new speed properties
    this.speedX = 0;
    this.speedY = 0;

    const fences = new Image();
    fences.addEventListener('load', () => {

    this.fences = fences;   
    });
    fences.src = "/images/fences.png";
  }
  draw() {
    ctx.drawImage(this.fences, this.x, this.y, 100, 200);
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
}

class building {
  constructor() {
    this.x = 1355;
    this.y = -50;
 
    const theBuilding = new Image();
    theBuilding.addEventListener('load', () => {

    this.theBuilding = theBuilding;   
    });
    theBuilding.src = "/images/Berghain-gameScreen.png";
  }
  draw() {
    ctx.drawImage(this.theBuilding, this.x, this.y, 200, 600);
  }
}


class player {
  constructor() {
    this.x = 5;
    this.y = 250;
    this.speedX = 0;
    this.speedY = 0;
 
  
    const avatar = new Image();
    avatar.addEventListener('load', () => {

    this.avatar = avatar;   
    });
    avatar.src = "/images/avatar1.png";
  }
  draw() {
    ctx.drawImage(this.avatar, this.x, this.y, 70, 120);
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

  crashWith(obstacle) {
    console.log("condition 1", !this.bottom() < obstacle.top())
    console.log("condition 2", !this.top() > obstacle.bottom())
    console.log("condition 3", !this.right() < obstacle.left())
    console.log("condition 4", !this.left() > obstacle.right())
    return !(
      this.bottom() < obstacle.top() || 
      this.top() > obstacle.bottom() || 
      this.right() < obstacle.left() +500 || 
      this.left() > obstacle.right());
}
}

// FUNCTIONS
function startGame() {
  drawBackground();
  playerAvatar.draw();
  theBuilding.draw()
}

function drawBackground () {
  
  ctx.drawImage(gameScreen, 0, 0, canvas.width, canvas.height);
  document.querySelector('.game-intro').style.display = 'none'; // document.querySelector(".game-intro").remove();
  document.querySelector('#game-screen').style = 'display: flex; justify-content: center;';
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.Width, canvas.height);
  drawBackground();
  theBuilding.draw();
  playerAvatar.draw();
  updateObstacles();
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
    let minHeight = 80;
    let maxHeight = 400;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let minGap = 130;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new obstacles(10, height, "grey", x, 0));
    myObstacles.push(
      new obstacles(10, x - height - gap, "grey", x, height + gap)
    );
  }
}

// function crashWith(obstacle) {

//     return !(
//     playerAvatar.bottom() < obstacle.top() ||
//     playerAvatar.top() > obstacle.bottom() ||
//     playerAvatar.right() < obstacle.left() +5 ||
//     playerAvatar.left() > obstacle.right() -5
//   );
// }

function checkGameOver() {
  // const crashed = myObstacles.some(function(obstacle) {
  //   return crashWith(obstacle);
  // });
  const crashed = myObstacles.some(function (obstacle) {// check if one of the obstacles has crashed with the player
    return playerAvatar.crashWith(obstacle);
  });

  if(crashed) {
    //stop();
    console.log(myObstacles[0], myObstacles[1]);
    alert("game over")
    console.log("game over");
  }
}

function stop() {
  clearInterval(intervalId);
}

const playerAvatar = new player();
const theBuilding = new building();
// WINDOWS

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
    intervalId = setInterval(updateGame, 20);
    
    
  };
};         

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