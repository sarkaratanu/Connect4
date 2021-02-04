import { Coin } from "./Coin.js";
import { colors } from './Globals.js';

export class CoinTray {

    constructor(x,y,width,height,color, rows, cols){

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.color = color;

        this.rows = rows;
        this.cols = cols;

        this.totalCoins = this.rows * this.cols;

        this.coins = new Array(this.totalCoins);

        this.totalCols = this.cols;

    }

    draw(ctx){

        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

    }

    fillAllCoins(ctx , coinColor) {
        // console.log("time 6:31");
        // need to determine the size of each this.coins
        // for that, you need to determine the size of each square
        // for that, you need to divide the coin tray into a rows x cols grid

        let sqSizeBasedOnWidth = this.width / this.cols;
        let sqSizeBasedOnHeight = this.height / this.rows;

        var squareSize;

        if (sqSizeBasedOnWidth > sqSizeBasedOnHeight) { // this means we need to base our square on Height (smaller of the two)

            squareSize = sqSizeBasedOnHeight;
        }
        else {
            squareSize = sqSizeBasedOnWidth;
        }

        // draw the squares
        for (var row=0;row<this.rows;row++) {

            for (var col=0;col<this.cols;col++) {

                // console.log("entering col " + col);
                let x = this.x+col*squareSize;
                let y = this.y+row*squareSize;

                // console.log(x + " -- " + y);
                ctx.strokeStyle = colors.White;
                ctx.strokeRect(x, y, squareSize, squareSize);

                this.coins[col+row*this.totalCols] = new Coin(x+squareSize/2, y+squareSize/2, 0.8*squareSize/2, coinColor);
                this.coins[col+row*this.totalCols].draw(ctx);
                
                // console.log("exiting col " + col);
                // ArrayPos = Col + Row * TotalColumns

            }
        }


    }

    erase(ctx, x, y){

        



        
    }



}