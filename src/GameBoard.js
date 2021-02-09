import { colors , gameColors } from './Globals.js';
import { Coin } from './Coin.js';
import { Slot } from './Slot.js';
export class GameBoard {

    constructor(ctx) {

        this.MAX_ROWS = 6;
        this.MAX_COLS = 7;
        this.pad;

        this.firstTime = true;


        this.slotCounters = new Array(this.MAX_COLS);
        this.columns = new Array(this.MAX_COLS);




        for(var i= 0; i<this.slotCounters.length; i++){
            this.slotCounters[i] = this.MAX_ROWS;
        }

    }


    calculateSlotDimensions() {

        this.sqSize = this.height / this.MAX_ROWS;
        this.pad = (this.width - (this.MAX_COLS * this.sqSize))/2; // 
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


        // this.draw(ctx);

        if (this.firstTime) {
            // console.log("entered if");
            this.createSlotsFirstTime(ctx);
            this.firstTime = false;
            // console.log(this.firstTime);
        }
        else {
            // console.log("entered else");
            this.resizeSlots();
        }



    }

    createSlotsFirstTime(ctx) {



        for(var col=0; col < this.MAX_COLS; col++){

            var slotLeft = this.left + this.pad + (this.sqSize * col);

            this.columns[col] = new Array(this.MAX_ROWS);

            for(var row=0; row < this.MAX_ROWS; row++){

                var slotTop = this.top + (this.sqSize * row);

                this.columns[col][row] = new Slot(slotTop,slotLeft,this.sqSize,'#000000');


                this.columns[col][row].draw(ctx);


            }
        }

        // console.log("Create Slots " + this.columns);

    }
    resizeSlots() {}

    draw(ctx) {

        // this.drawGridLines(ctx)
    }


    // drawGridLines(ctx) {

    //     // this.drawGameBoardOutline(ctx , this.pad);
    //     this.drawHorizontalLines(ctx , this.pad);
    //     this.drawVerticalLines(ctx , this.pad);

    // }


    // drawGameBoardOutline(ctx) {

    //     ctx.strokeStyle = gameColors.gridColor;

    //     ctx.strokeRect(this.left, this.top, this.width, this.height);

    // }

    // drawVerticalLines(ctx , pad) {

    //     var lineX = this.left + this.pad;

    //     // draw vertical lines
    //     for(var i = 0 ; i < this.MAX_COLS+1 ; i++){ 

    //         //line color and width
    //         ctx.strokeStyle = "#fff";
    //         ctx.lineWidth = 1;


    //         // y += 50;
    //         ctx.beginPath();
    //         ctx.moveTo(lineX , this.top);
    //         ctx.lineTo(lineX , this.height + this.top);
    //         ctx.stroke();
    //         // console.log(x);
    //         lineX += this.sqSize;

    //     }
    // }

    // dropCoin(coin,ctx,col){

    //     let i = col-1;

    //     if(this.slotCounters[i] == 0){
    //         return (false);
    //     }
    //     else {
    //         coin.moveDown(ctx,this.slotCounters[i] * this.sqSize, gameColors.gameBackgroundColor);
    //         this.slotCounters[i]--;    
    //         return (true);
    //     }


    // }

    drop(coin,ctx,col){

        col--; 

        //given the column, start checking from the bottom slot 
        //if bottom slot is full, check the slot above
        //keep doing till an empty slot is found
        //if all slots are full in that column, return false
        //if empty slot is found, fill it with the given coin


        // console.log("Shoot Column >>" + col);

        if (false) {

            console.log(this.columns[0][0]);
            this.columns[3][3].drawFunky(ctx);

            console.log(this.columns[3][3].isEmpty());


        }
        else {

            let column = this.columns[col];

            var slotFound = false;
            const backgroundColor = gameColors.gameBackgroundColor;

            for(var row=this.MAX_ROWS-1; row>=0 &&  !slotFound; row--){

                let slot=column[row];

                if (slot.isEmpty()) {
                    // fill this slot with the given coin
                    slot.fill(ctx, coin, backgroundColor);
                    slotFound = true;
                }
                else {
                    // empty slot not found, check the one above in the for loop
                }
            }

            return (slotFound);

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

