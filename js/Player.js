class Player {
    constructor() {
      this.x = canvas.width - (canvas.width + 5);
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
    moveLeft() {
      this.x -= 5;
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
  
    // frontDoor() {
    //   if (this.x > 1020) {
    //     stop();
    //     checkPartyIn();
    //     //console.log("party IN");
    //   }
    // }
  }