// import { globals,globalsSelfReferencing } from  './Globals.js';


export class Grid {
 
    //attributes = size,position,shape,color
    //behavior = draw
 
    // creates a block, given the row number, col number, and colour
    constructor(x,y,sizeWidth,sizeHeight,color) {
 
        // using the passed parameters

        this.xPos = x;
        this.yPos = y;

        this.sizeWidth = sizeWidth;
        this.sizeHeight = sizeHeight;

        this.color = color;
 
        // const blockSizeWidth = globalsSelfReferencing.blockSizeWidth;
        // const blockSizeHeight = globals.CANVAS_SIZE_HEIGHT/globals.NUMBER_OF_ROWS;
        // const blockSizeHeight = blockSizeWidth;

        // this.blockSizeWidth = blockSizeWidth;
        // this.blockSizeHeight = blockSizeHeight;

        // this.grids = new Array(42);

    }

    // changeColor(color) {

    //     this.blockColor = color;

    // }

    // gridToPixel(rowGrid,colGrid){

    //     var col = colGrid - 1;
    //     var row = rowGrid - 1;
    //     var positionObject = new Position(col*BLOCK_SIZE , row*BLOCK_SIZE);

    //     return positionObject;

    // }


    draw(ctx){
 
        // noStroke();
        // ctx.clearRect(0,0,ctx.width,ctx.height);
        ctx.fillStyle = this.color;
        // fill(this.blockColor);
        
        // var position = this.gridToPixel(this.row,this.col);
        
        // rect(position.x,position.y,this.blockSize,this.blockSize,this.curve);
        ctx.fillRect(this.xPos, this.yPos, this.sizeWidth, this.sizeHeight,this.color);

    }
    
    // setDirection(direction) {

    //     this.direction = direction;
    
    // }
    
    // //makes block move based on set/current direction
    // moveBlock(){
 
    //     switch(this.direction){

    //         case DIRECTIONS.UP:

    //             this.row = this.row -1;

    //             break;
 
    //         case DIRECTIONS.DOWN:

    //             this.row = this.row + 1;

    //             break;

    //         case DIRECTIONS.LEFT:

    //             this.col = this.col - 1;

    //             break;
            
    //         case DIRECTIONS.RIGHT:

    //             this.col = this.col + 1;

    //     }
        
    // }

    // //this gives the block a new position
    // newPos(newRow,newCol){

    //     this.row = newRow;
    //     this.col = newCol;

    // }
 

}