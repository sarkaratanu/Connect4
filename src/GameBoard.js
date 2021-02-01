import { colors } from './Globals.js';
import { Coin } from './Coin.js';
export class GameBoard {

    constructor() {

        this.MAX_ROWS = 6;
        this.MAX_COLS = 7;
        this.pad;

        this.slotCounters = new Array(this.MAX_COLS);



        for(var i= 0; i<this.slotCounters.length; i++){
            this.slotCounters[i] = this.MAX_ROWS;
        }

    }


    calculateSlotDimensions() {

        this.sqSize = this.height / this.MAX_ROWS;
        this.pad = (this.width - (this.MAX_COLS * this.sqSize))/2;
        // console.log(this.pad);
    }
    resize(ctx, width, height, top, left) {

        this.width = width;
        this.height = height;

        this.calculateSlotDimensions();

        this.top = top;
        this.left = left;

        // this.distBetweenCols = this.width / this.MAX_COLS;

        this.distBetweenRows = this.height/this.MAX_ROWS;


        this.draw(ctx);
    }

    draw(ctx) {

        this.drawGridLines(ctx)
    }


    drawGridLines(ctx) {

        // this.drawGameBoardOutline(ctx , this.pad);
        this.drawHorizontalLines(ctx , this.pad);
        this.drawVerticalLines(ctx , this.pad);
        
    }
    
    
    drawGameBoardOutline(ctx) {
    
        ctx.strokeStyle = colors.White;
    
        ctx.strokeRect(this.left, this.top, this.width, this.height);
    
    }
    
    drawVerticalLines(ctx , pad) {
    
        var lineX = this.left + this.pad;
    
        // draw vertical lines
        for(var i = 0 ; i < this.MAX_COLS+1 ; i++){ 
    
            //line color and width
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
    
            
            // y += 50;
            ctx.beginPath();
            ctx.moveTo(lineX , this.top);
            ctx.lineTo(lineX , this.height + this.top);
            ctx.stroke();
            // console.log(x);
            lineX += this.sqSize;
            
        }
    }
    
    dropCoin(coin,ctx,col){

        let i = col-1;

        if(this.slotCounters[i] == 0){
            return (false);
        }
        else {
            coin.moveDown(ctx,this.slotCounters[i] * this.sqSize, colors.Black);
            this.slotCounters[i]--;    
            return (true);
        }
        
        
    }


    drawHorizontalLines(ctx , pad) {
        
        var lineY = this.top;
    
        // draw horizontal lines
        for(var j = 0 ; j < this.MAX_ROWS+1 ; j++){  
    
    
            //line color and width
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            
            
    
            // console.log(this.pad);
            ctx.beginPath();
            ctx.moveTo(this.left + this.pad , lineY);
            ctx.lineTo(this.left+this.width-this.pad , lineY);
            ctx.stroke();

            lineY += this.distBetweenRows;
        }
    }


}

