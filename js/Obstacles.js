class Obstacles {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = canvas.width - 300;
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
      ctx.drawImage(this.fences, this.x, this.y, 60, this.height);
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