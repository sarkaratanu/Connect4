import { colors , gameColors } from './Globals.js';
import { Coin } from './Coin.js';
import { Slot } from './Slot.js';
import { playVictoryTone , playErrorTone , playDropSound , playCoinMovingSound } from './Sounds.js';
export class GameBoard {

    constructor(ctx) {

        this.MAX_ROWS = 6;
        this.MAX_COLS = 7;
        this.pad;

        this.firstTime = true;

        this.winnerFound = false;
        this.playerColor;
        this.COINS_TO_WIN = 4;


        this.slotCounters = new Array(this.MAX_COLS);
        this.columns = new Array(this.MAX_COLS);

        for(var i= 0; i<this.slotCounters.length; i++){
            this.slotCounters[i] = this.MAX_ROWS;
        }

    }

    checkIfWinnerFound() {
        return(this.winnerFound);
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


        let column = this.columns[col];
        var row,rowForSlotFilled;

        var slotFound = false;
        const backgroundColor = gameColors.gameBackgroundColor;

        for(row=this.MAX_ROWS-1; row>=0 &&  !slotFound; row--){

            let slot=column[row];

            if (slot.isEmpty()) {
                // fill this slot with the given coin
                slot.fill(ctx, coin, backgroundColor);
                playDropSound();
                slotFound = true;
                rowForSlotFilled = row;
            }
            else {
                // empty slot not found, check the one above in the for loop
            }

            // rowForWinner = row;
        }
        // this.detectWinner(col,row);

        if(slotFound){
            this.detectWinner(col,rowForSlotFilled);
        }
        return (slotFound);

            
            
            // if(this.detectWinner(col,row)){


            // }
            // else{}
            // this.detectWinner();
    

        

        // this.detectWinner(col,row);

        



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

    detectWinner(col,row){
        
        console.log("---------col is " + col + " row is " + row + "---------");

        let currColor = this.columns[col][row].coin.color;

        let leftCount = this.scanLeft(col,row,currColor);
        let rightCount = this.scanRight(col,row,currColor);

        let aboveCount = this.scanAbove(col,row,currColor);
        let belowCount = this.scanBelow(col,row,currColor);
        
        let aboveDiagonalCountRight = this.scanAboveDiagonalRight(col,row,currColor);
        let belowDiagonalCountLeft = this.scanBelowDiagonalLeft(col,row,currColor);
        
        let aboveDiagonalCountLeft = this.scanAboveDiagonalLeft(col,row,currColor);
        let belowDiagonalCountRight = this.scanBelowDiagonalRight(col,row,currColor);
    
        this.winnerFound = 
                                this.checkIfEnoughCoins(leftCount, rightCount) || 
                                this.checkIfEnoughCoins(aboveCount, belowCount) ||
                                this.checkIfEnoughCoins(aboveDiagonalCountLeft, belowDiagonalCountRight) ||
                                this.checkIfEnoughCoins(aboveDiagonalCountRight, belowDiagonalCountLeft);

        return (this.matchFound);


    }

    checkIfEnoughCoins(sideACount, sideBCount) {
        return((sideACount + sideBCount) == this.COINS_TO_WIN - 1);
    }

    scanLeft(col, row, currColor) {

        let matchCounter=0;
        let keepScanning=true;        

        while(keepScanning && col>0) {

            col--;
            let leftSlot = this.columns[col][row];

            if (leftSlot.isEmpty()) {
                keepScanning=false;
            }
            else { // left slot is not empty
                if (leftSlot.coin.color == currColor) {
                    matchCounter++;
                    this.playerColor = currColor;
                    // this.playerColor = leftSlot.coin.color;
                }
                else { // a different color was found, so stop scanning
                    keepScanning=false;
                    this.playerColor = leftSlot.coin.color;
                }
            }
        }
        
        return(matchCounter);

    }

    scanRight(col, row, currColor) {

        let matchCounter=0;
        let keepScanning=true;
        
        

        while(keepScanning && col<this.MAX_COLS-1) {

            col++;
            let rightSlot = this.columns[col][row];

            if (rightSlot.isEmpty()) {
                keepScanning=false;
            }
            else { // left slot is not empty
                if (rightSlot.coin.color == currColor) {
                    matchCounter++;
                    this.playerColor = currColor;
                }
                else { // a different color was found, so stop scanning
                    keepScanning=false;
                    this.playerColor = rightSlot.coin.color;
                }
            }
        }
        
        return(matchCounter);

    }

    scanAbove(col, row, currColor) {

        let matchCounter=0;
        let keepScanning=true;
        
        

        while(keepScanning && row>0) {

            row--;
            let aboveSlot = this.columns[col][row];

            if (aboveSlot.isEmpty()) {
                keepScanning=false;
            }
            else { // left slot is not empty
                if (aboveSlot.coin.color == currColor) {
                    matchCounter++;
                    this.playerColor = currColor;
                }
                else { // a different color was found, so stop scanning
                    keepScanning=false;
                    this.playerColor = aboveSlot.coin.color;
                }
            }
        }
        
        return(matchCounter);

    }

    scanBelow(col, row, currColor) {
        // console.log("entered");

        let matchCounter=0;
        let keepScanning=true;
        
        

        while(keepScanning && row<this.MAX_ROWS-1) {

            row++;
            let belowSlot = this.columns[col][row];

            if(row < this.MAX_ROWS){
                if (belowSlot.isEmpty()) {
                    keepScanning=false;
                }
                else { // left slot is not empty
                    if (belowSlot.coin.color == currColor) {
                        matchCounter++;
                        this.playerColor = currColor;
                    }
                    else { // a different color was found, so stop scanning
                        keepScanning=false;
                        this.playerColor = belowSlot.coin.color;
                    }
                }
            }
            
        }
        
        return(matchCounter);

    }


    scanAboveDiagonalLeft(col, row, currColor) {

        let matchCounter=0;
        let keepScanning=true;
        
        

        while(keepScanning && row>0 && col>0) {

            row--;
            col--;
            let aboveSlotDiagonal = this.columns[col][row];

            if (aboveSlotDiagonal.isEmpty()) {
                keepScanning=false;
            }
            else { // left slot is not empty
                if (aboveSlotDiagonal.coin.color == currColor) {
                    matchCounter++;
                    this.playerColor = currColor;
                }
                else { // a different color was found, so stop scanning
                    keepScanning=false;
                    this.playerColor = aboveSlotDiagonal.coin.color;
                }
            }
        }
        
        return(matchCounter);

    }

    
    scanAboveDiagonalRight(col, row, currColor) {

        let matchCounter=0;
        let keepScanning=true;
        
        

        while(keepScanning && row>0 && col<this.MAX_COLS-1) {

            row--;
            col++;
            let aboveSlotDiagonal = this.columns[col][row];

            if (aboveSlotDiagonal.isEmpty()) {
                keepScanning=false;
            }
            else { // left slot is not empty
                if (aboveSlotDiagonal.coin.color == currColor) {
                    matchCounter++;
                    this.playerColor = currColor;
                }
                else { // a different color was found, so stop scanning
                    keepScanning=false;
                    this.playerColor = aboveSlotDiagonal.coin.color;
                }
            }
        }
        
        return(matchCounter);

    }


    
    scanBelowDiagonalLeft(col, row, currColor) {

        let matchCounter=0;
        let keepScanning=true;
        
        // while(keepScanning && row<this.MAX_ROWS-1 && col>=0) {
        while(keepScanning && col>0 && row<this.MAX_ROWS-1) {

            console.log("col is " + col + " row is " + row);
            // if(row < this.MAX_ROWS){
            //     row++;
            // }
            row++;
            col--;
            let belowSlotDiagonal = this.columns[col][row];

            if (belowSlotDiagonal.isEmpty()) {
                keepScanning=false;
            }
            else { // left slot is not empty
                if (belowSlotDiagonal.coin.color == currColor) {
                    matchCounter++;
                    this.playerColor = currColor;
                }
                else { // a different color was found, so stop scanning
                    keepScanning=false;
                    this.playerColor = belowSlotDiagonal.coin.color;
                }
            }
        }
        
        return(matchCounter);

    }

    
    scanBelowDiagonalRight(col, row, currColor) {

        let matchCounter=0;
        let keepScanning=true;
        
        // while(keepScanning && row<this.MAX_ROWS-1 && col>=0) {
        while(keepScanning && row<this.MAX_ROWS-1 && col<this.MAX_COLS-1) {

            console.log("col is " + col + " row is " + row);
            // if(row > this.MAX_ROWS-1){
            //     // row=this.MAX_ROWS-1;
            //     row--;
            // }
            
            row++;
            col++;
            let belowSlotDiagonal = this.columns[col][row];

            if (belowSlotDiagonal.isEmpty()) {
                keepScanning=false;
            }
            else { // left slot is not empty
                if (belowSlotDiagonal.coin.color == currColor) {
                    matchCounter++;
                    this.playerColor = currColor;
                }
                else { // a different color was found, so stop scanning
                    keepScanning=false;
                    this.playerColor = belowSlotDiagonal.coin.color;
                }
            }
        }
        
        return(matchCounter);

    }


    
}

