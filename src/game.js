// import { Grid } from './Grid.js';
import { GameBoard } from './GameBoard.js';
import { colors } from './Globals.js';
import { Coin } from './Coin.js';
import { CoinTray } from './CoinTray.js';
import { Slot } from './Slot.js';

//canvas

let canvas=document.getElementById("gameScreen");
let ctx=canvas.getContext("2d");

let gameBoard = new GameBoard(ctx);
const gameTopMarginPct = 12.5;
const gameLeftMarginPct = 20;
const gameRightMarginPct = gameLeftMarginPct;
const gameBottomMarginPct = 15;
var gameTopMarginPx, gameBottomMarginPx, gameLeftMarginPx, gameRightMarginPx, gameBoardWidth, gameBoardHeight;

var playerCoin;
let firstColor = colors.Red;
var previousColor, color;

var leftBtn, rightBtn, shootBtn, playerCoinCol;
// var closeWinnerBox;
// var closeColsBox;  
var youWonMessage,colErrorMessage;

const ARROW_RIGHT = "ArrowRight";
const ARROW_LEFT = "ArrowLeft";
const ENTER_KEY = "Enter";

var tray1,tray2;

//styling canvas with color and position
function canvasStyling(){

    // ctx.canvas.width  = window.innerWidth * 0.75;
    // ctx.canvas.height = window.innerHeight * 0.85;

    canvas.style.background = '#000000';

}

function msg(txt) {
    console.log(txt);
}

function gameBoardResizing() {

    //calculate the new margins and sizes

    gameTopMarginPx = ctx.canvas.height * gameTopMarginPct / 100;
    // gameTopMarginPx = canvas.height/8;
    gameLeftMarginPx = ctx.canvas.width * gameLeftMarginPct / 100;
    gameRightMarginPx = gameLeftMarginPx;
    gameBottomMarginPx = ctx.canvas.height * gameBottomMarginPct / 100;

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
    tray1 = new CoinTray(gameLeftMarginPx,gameBoardHeight+gameTopMarginPx,coinTrayWidth,gameBottomMarginPx,colors.Red, 3,7);
    // tray1 = new CoinTray(gameLeftMarginPx, gameTopMarginPx+gameBoardHeight,coinTrayWidth,gameBottomMarginPx,colors.Red,6,7);
    tray1.draw(ctx);
    tray1.fillAllCoins(ctx , colors.Red);

    // let tray2 = new CoinTray(300,100,600,300,colors.Red, 3,7);
    tray2 = new CoinTray((gameLeftMarginPx+gameBoardWidth) - coinTrayWidth ,gameBoardHeight+gameTopMarginPx,coinTrayWidth,gameBottomMarginPx,colors.Green, 3,7);
    tray2.draw(ctx);
    tray2.fillAllCoins(ctx , colors.Green);

}

////////////////////// M A I N --- F U N C T I O N A L I T Y //////////////////////
////////////////////// M A I N --- F U N C T I O N A L I T Y //////////////////////
////////////////////// M A I N --- F U N C T I O N A L I T Y //////////////////////

main(); // call the main functionality
// var tray1InitLength = tray1.coins.length;
// var tray2InitLength = tray2.coins.length;


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

    // msg(tray1InitLength);
    // msg(tray2InitLength);

    playerCoinCol = 4;
    playerCoin = {}; //nullifying the object


    // var color;

    if (typeof previousColor == 'undefined') {
        color = firstColor;
    }
    else if(previousColor == colors.Red){
        color = colors.Green;
        // tray1.coins.draw()
        tray1.coins.pop();
        msg("New Tray 1 length is " + tray1.coins.length);
    }

    else{
        color = colors.Red;
        tray2.coins.pop();
        msg("New Tray 2 length is " + tray2.coins.length);
    }
    

    previousColor = color;


    let playerCoinInitX = canvas.width/2;
    let playerCoinInitY = gameTopMarginPx/2;

    playerCoin = new Coin(playerCoinInitX,playerCoinInitY,20,color);

    playerCoin.draw(ctx);

}

function shootBtnClicked(){
    


    if (gameBoard.drop(playerCoin, ctx, playerCoinCol)) {
        enableButtons();
        createNewPlayerCoin();
        // showColErrorMesage();
        // showYouWonMessage();

    }
    else {
        errorAlert("Try Another Column");
        showColErrorMesage();
        // showYouWonMessage();
    }
}

function disableButton(btn) {
    playErrorTone();
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

function showErrorMessage(msg) {
    console.log(msg);
} // doing nothing for now

function playErrorTone() {
    errorSound.play();
} // doing nothing for now

function sound(src) {

    this.sound = document.createElement("audio");

    this.sound.src = src;

    this.sound.setAttribute("preload", "auto");

    this.sound.setAttribute("controls", "none");

    this.sound.style.display = "none";

    document.body.appendChild(this.sound);

    this.play = function(){

        this.sound.play();

    }

    this.stop = function(){

        this.sound.pause();

    }    

}

var errorSound = new sound("errorSound.mp3");

function showYouWonMessage(){

    youWonMessage = document.getElementById("youWonMessage");
    youWonMessage.style.display = "block";    
}

function hideYouWonMessage() {
    youWonMessage = document.getElementById("youWonMessage");
    youWonMessage.style.display = "none";

}

function closeYouWonMessage() {
    hideYouWonMessage();
}

function showColErrorMesage(){
    colErrorMessage = document.getElementById("colErrorMessage");
    colErrorMessage.style.display = "block";    
}

function hideColErrorMessage() {
    colErrorMessage = document.getElementById("colErrorMessage");
    colErrorMessage.style.display = "none";

}

function closeColErrorMessage() {
    hideColErrorMessage();
}


function setupEventHandlers() {

    leftBtn = document.getElementById("leftBtn");
    rightBtn = document.getElementById("rightBtn");
    shootBtn = document.getElementById("shootBtn");
    // span = document.getElementById("myModal").getElementById("modalContent").getElementById("spanButton");

 
    youWonMessage = document.getElementsByClassName("closeYouWonMessage")[0];
    colErrorMessage = document.getElementsByClassName("closeColErrorMessage")[0];

    
    leftBtn.addEventListener("click", leftBtnClicked);
    rightBtn.addEventListener("click", rightBtnClicked);
    shootBtn.addEventListener("click", shootBtnClicked);
    colErrorMessage.addEventListener("click", closeColErrorMessage);
    youWonMessage.addEventListener("click", closeYouWonMessage);


}

