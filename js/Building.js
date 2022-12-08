class Building {
    constructor() {
      this.x = canvas.width - 145;
      this.y = -50;
      this.width = 200;
      this.height = 600;
   
      const theBuilding = new Image();
      theBuilding.addEventListener('load', () => {
  
      this.theBuilding = theBuilding;   
      });
      theBuilding.src = "images/Berghain-gameScreen.png";
    }
    draw() {
      ctx.drawImage(this.theBuilding, this.x, this.y, this.width, this.height);
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
      return this.x +20
    }  
  }