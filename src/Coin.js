export class Coin {

  constructor(x,y,r,color) {

      // console.log("creating new coin + time 6:32");

      this.x = x;
      this.y = y;

      this.r = r;

      this.color = color;

      this.LEFT = -1;
      this.RIGHT = +1;
      this.DOWN = +1;


      // console.log("Coin Constructor");
  }

  resize() {

  }

  draw(ctx) { 

      this.drawFilledCircle(ctx,0, this.color);
  }

  moveLeft(ctx,moveByX,backgroundColor) {
      this.move(ctx, this.LEFT * moveByX,0, backgroundColor)
  }

  moveRight(ctx,moveByX,backgroundColor) {
      this.move(ctx, this.RIGHT * moveByX,0, backgroundColor)
  }

  moveDown(ctx,moveByY,backgroundColor){
      this.move(ctx,0, this.DOWN*moveByY, backgroundColor);

  }

  // shoot(ctx,moveByY,backgroundColor,newCoinColor, x, y){
  //     this.erase(ctx,backgroundColor);
  //     this.y += moveByY;
  //     this.draw(ctx);  
  //     // this.drawFilledCircle(ctx,2,newCoinColor)  

  //     ctx.fillStyle = newCoinColor ; 
  //     ctx.beginPath();
  //     ctx.arc(x, y, this.r + 2,0,Math.PI*2,true);
  //     ctx.closePath();
  //     ctx.fill();

  // }

  move(ctx,moveByX,moveByY,backgroundColor) {
      this.erase(ctx,backgroundColor);
      this.x += moveByX;
      this.y += moveByY;
      this.draw(ctx);    
  }


  reposition(ctx, newX, newY, backgroundColor) {
      let moveByX = newX - this.x;
      let moveByY = newY - this.y;

      this.move(ctx, moveByX, moveByY, backgroundColor)
  }


  erase(ctx,backgroundColor){
      this.drawFilledCircle(ctx,2, backgroundColor);
  }

  drawFilledCircle(ctx,sizeCorrection,color){
      ctx.fillStyle = color; 
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r + sizeCorrection,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fill();
  }



}

