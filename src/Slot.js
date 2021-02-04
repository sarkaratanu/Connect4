export class Slot{

  constructor(top,left,size,bgColor){

    this.top = top;
    this.left = left;
    this.size = size;
    this.bgColor = bgColor;

    this.empty = true;

    // console.log("Inside Slot Constructor top, left, size " + this.top + " " + this.left + " " +  this.size );
  }

  isEmpty() {
    return (this.empty);
  }

  resize() {
    // do something
  }

  // drawWithDimensions(ctx,top,left,sqSize){

  //   ctx.strokeStyle = '#FFFFFF';
  //   ctx.strokeRect(top,left,sqSize,sqSize);
  //   // console.log("Inside Slot Draw top, left, size " + top + " " + left + " " +  sqSize );

  // }

  drawFunky(ctx) {
    ctx.strokeStyle = '#0F4411';
    ctx.strokeRect(this.left,this.top,this.size,this.size);
  }

  draw(ctx){

    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeRect(this.left,this.top,this.size,this.size);

    // console.log(this);
    

  }
  fill(ctx, coin, backgroundColor){

    this.empty = false;
    this.coin = coin;

    let newCenterX = this.left + (this.size/2);
    let newCenterY = this.top + (this.size/2);

    this.coin.reposition(ctx, newCenterX, newCenterY, backgroundColor);

  }

  highlight(ctx,color){

  }

  unhighlight(ctx){

  }




}