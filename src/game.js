import { Grid } from './Grid.js';
import { GameBoard } from './GameBoard.js';
import { colors } from './Globals.js';
import { Coin } from './Coin.js';
import { CoinTray } from './CoinTray.js';

//canvas

let canvas=document.getElementById("gameScreen");
let ctx=canvas.getContext("2d");

let gameBoard = new GameBoard();
const gameTopMarginPct = 12.5;
const gameLeftMarginPct = 20;
const gameRightMarginPct = gameLeftMarginPct;
const gameBottomMarginPct = 15;
var gameTopMarginPx, gameBottomMarginPx, gameLeftMarginPx, gameRightMarginPx, gameBoardWidth, gameBoardHeight;

var playerCoin;
let firstColor = colors.Red;
var previousColor;

var leftBtn, rightBtn, shootBtn, playerCoinCol;

const ARROW_RIGHT = "ArrowRight";
const ARROW_LEFT = "ArrowLeft";
const ENTER_KEY = "Enter";

//styling canvas with color and position
function canvasStyling(){

    canvas.style.background = '#000000';

}

function msg(txt) {
    console.log(txt);
}

function gameBoardResizing() {

    //calculate the new margins and sizes

    gameTopMarginPx = canvas.height * gameTopMarginPct / 100;
    // gameTopMarginPx = canvas.height/8;
    gameLeftMarginPx = canvas.width * gameLeftMarginPct / 100;
    gameRightMarginPx = gameLeftMarginPx;
    gameBottomMarginPx = canvas.height * gameBottomMarginPct / 100;

    // msg(gameTopMarginPx + "--" + gameBottomMarginPx + "--" + gameLeftMarginPx + "--" + gameRightMarginPx);





    gameBoardWidth = canvas.width - gameLeftMarginPx - gameRightMarginPx;
    gameBoardHeight = canvas.height - gameTopMarginPx - gameBottomMarginPx;

    // msg(gameBoardWidth + "--" + gameBoardHeight);

    // blockSizeWidth = 0.5 * (gameBoardWidth/MAX_COLS);
    // blockSizeHeight = 0.5 * (gameBoardWidth/MAX_COLS);

    // distBetweenCols = gameBoardWidth/MAX_COLS;
    // distBetweenRows = gameBoardHeight/MAX_ROWS;


    //  this will resize the game board and re-draw
    gameBoard.resize(ctx, gameBoardWidth, gameBoardHeight, gameTopMarginPx, gameLeftMarginPx);

}

function setupTextBoxes() {
    //input textboxes
    document.getElementById("player1Name").value="Enter Player 1 Name";
    document.getElementById("player2Name").value="Enter Player 2 Name";
}

function coinTrays(){
    var coinTrayWidth = (gameBoardWidth/2) - 50;
    // let tray1 = new CoinTray(300,100,600,300,colors.Red, 3,7);
    let tray1 = new CoinTray(gameLeftMarginPx,gameBoardHeight+gameTopMarginPx,coinTrayWidth,gameBottomMarginPx,colors.Red, 3,7);
    tray1.draw(ctx);
    tray1.fillAllCoins(ctx , colors.Red);

    // let tray2 = new CoinTray(300,100,600,300,colors.Red, 3,7);
    let tray2 = new CoinTray((gameLeftMarginPx+gameBoardWidth) - coinTrayWidth ,gameBoardHeight+gameTopMarginPx,coinTrayWidth,gameBottomMarginPx,colors.Green, 3,7);
    tray2.draw(ctx);
    tray2.fillAllCoins(ctx , colors.Green);

}

////////////////////// M A I N --- F U N C T I O N A L I T Y //////////////////////
////////////////////// M A I N --- F U N C T I O N A L I T Y //////////////////////
////////////////////// M A I N --- F U N C T I O N A L I T Y //////////////////////

main(); // call the main functionality

function main() {

    setupEventHandlers();

    canvasStyling(); // sets the canvas color
    
    setupTextBoxes();
    
    gameBoardResizing(); // this calculates the various margins and block sizes
    
    coinTrays();

    
    playerCoinCol = 4;
    // coinCol = 4;
    // msg("Coin Pos " + playerCoinCol);

    

    createNewPlayerCoin();
    
    // playerCoin.draw(ctx);

    // let coin2InitX = canvas.width/2;
    // let coin2InitY = gameTopMarginPx/2;
    // coin2 = new Coin(coin2InitX,coin2InitY,40,colors.Green);
    
    // coin2.draw(ctx);


}

function setupEventHandlers() {

    leftBtn = document.getElementById("leftBtn");
    rightBtn = document.getElementById("rightBtn");
    shootBtn = document.getElementById("shootBtn");

    leftBtn.addEventListener("click", leftBtnClicked);
    rightBtn.addEventListener("click", rightBtnClicked);
    shootBtn.addEventListener("click", shootBtnClicked);


}

function leftBtnClicked(){

    if(playerCoinCol == 1){
        disableButton(leftBtn);
    }
    else{
        enableButtons();
        playerCoin.moveLeft(ctx,gameBoard.sqSize,colors.Black);
        playerCoinCol -= 1;
    }
    
}

function rightBtnClicked(){
    
    if(playerCoinCol == 7){
        disableButton(rightBtn);
    }
    else{
        enableButtons();
        playerCoin.moveRight(ctx,gameBoard.sqSize,colors.Black);
        playerCoinCol += 1;
    }

}

function createNewPlayerCoin() {

    playerCoinCol = 4;
    playerCoin = {}; //nullifying the object


    var color;

    if (typeof previousColor == 'undefined') {
        color = firstColor;
    }
    else if(previousColor == colors.Red){
        color = colors.Green;
    }

    else{
        color = colors.Red;
    }

    previousColor = color;


    let playerCoinInitX = canvas.width/2;
    let playerCoinInitY = gameTopMarginPx/2;

    playerCoin = new Coin(playerCoinInitX,playerCoinInitY,20,color);

    playerCoin.draw(ctx);
}

function shootBtnClicked(){
    
    if (gameBoard.dropCoin(playerCoin, /*coin2,*/ ctx, playerCoinCol)) {
        enableButtons();
        createNewPlayerCoin();
    }
    else {
        errorAlert("Try Another Column");
    }
    
}

function disableButton(btn) {
    btn.disabled = true;
}

function enableButton(btn) {
    btn.disabled = false;
}

function enableButtons(){
    leftBtn.disabled = false;
    rightBtn.disabled = false;
}

//helps figure out which key has been pressed
document.addEventListener("keydown",function(event) {
    onkeypressed(event);
})

function onkeypressed(event) {
    
    switch (event.key) {
 
        case ARROW_LEFT:
            leftBtnClicked();
            break;
 
        case ARROW_RIGHT:
            rightBtnClicked();
            break;
        
        case ENTER_KEY:
            shootBtnClicked();

    }
}

function errorAlert(msg) {

    // do something to show the error message
    showErrorMessage(msg);

    playErrorTone();

}

function showErrorMessage(msg) {} // doing nothing for now

function playErrorTone() {} // doing nothing for now