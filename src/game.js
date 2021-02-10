// import { Grid } from './Grid.js';
import { GameBoard } from './GameBoard.js';
import { colors , gameColors } from './Globals.js';
import { Coin } from './Coin.js';
import { CoinTray } from './CoinTray.js';
import { Slot } from './Slot.js';
// import { playVictoryTone, playErrorTone } from './Sounds.js';
var squareSize = 52.857142857142854;
let canvas=document.getElementById("gameScreen");
let ctx=canvas.getContext("2d");

let gameBoard = new GameBoard(ctx);
const gameTopMarginPct = 12.5;
const gameLeftMarginPct = 20;
const gameRightMarginPct = gameLeftMarginPct;
const gameBottomMarginPct = 15;
var gameTopMarginPx, gameBottomMarginPx, gameLeftMarginPx, gameRightMarginPx, gameBoardWidth, gameBoardHeight;

var playerCoin;
let firstColor = gameColors.player1Color;
var previousColor, color;

var leftBtn, rightBtn, shootBtn, playerCoinCol;
// var closeWinnerBox;
// var closeColsBox;  
var youWonMessage,colErrorMessage;

const ARROW_RIGHT = "ArrowRight";
const ARROW_LEFT = "ArrowLeft";
const ENTER_KEY = "Enter";

var tray1,tray2;

var popUpBox,popUpBoxMessage;

var isKeyDisabled = false;

var winner;
var Player1, Player2;

var leftArrow,rightArrow,shootButton;

const messages = {

    deafult : " ----->>>>> Click " +  "'x'" + " to resume playing",
    colError : "Try another column, this one's already full",
    winner : " Congrats! " + winner + " has won!!!",
    tooFarLeft : "Can't go left anymore, there's no more space",
    tooFarRight : "Can't go right anymore, there's no more space",

}

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
    Player1 = document.getElementById("player1Name");
    Player1.value = "Enter Player 1 Name";
    
    Player2 = document.getElementById("player2Name");
    Player2.value="Enter Player 2 Name";
}

function coinTrays(){
    var coinTrayWidth = (gameBoardWidth/2) - 50;
    // let tray1 = new CoinTray(300,100,600,300,gameColors.player1Color, 3,7);
    // tray1 = new CoinTray(gameLeftMarginPx+gameBoard.pad,gameBoardHeight+gameTopMarginPx,coinTrayWidth,gameBottomMarginPx,gameColors.player1Color, 3,7);
    tray1 = new CoinTray(0,gameTopMarginPx,coinTrayWidth,canvas.height,gameColors.player1Color,3,7);
    // new CoinTray()
    // tray1 = new CoinTray(gameLeftMarginPx, gameTopMarginPx+gameBoardHeight,coinTrayWidth,gameBottomMarginPx,gameColors.player1Color,6,7);
    tray1.draw(ctx);
    tray1.fillAllCoins(ctx , gameColors.player1Color);

    // let tray2 = new CoinTray(300,100,600,300,gameColors.player1Color, 3,7);
    // tray2 = new CoinTray((gameLeftMarginPx+gameBoardWidth) - coinTrayWidth ,gameBoardHeight+gameTopMarginPx,coinTrayWidth,gameBottomMarginPx,gameColors.player2Color, 3,7);
    // tray2 = new CoinTray((gameLeftMarginPx+gameBoard.pad+(gameBoard.sqSize*4)) ,gameBoardHeight+gameTopMarginPx,coinTrayWidth,gameBottomMarginPx,gameColors.player2Color, 3,7);
    // tray2 = new CoinTray((gameLeftMarginPx+gameBoard.pad+(gameBoard.sqSize*4)) ,gameBoardHeight+gameTopMarginPx,coinTrayWidth,gameBottomMarginPx,gameColors.player2Color, 3,7);
    tray2 = new CoinTray(canvas.width-coinTrayWidth,gameTopMarginPx,coinTrayWidth,canvas.height,gameColors.player2Color,3,7);
    tray2.draw(ctx);
    tray2.fillAllCoins(ctx , gameColors.player2Color);

}

function setupEventHandlers() {

    // leftBtn = document.getElementById("leftBtn");
    // rightBtn = document.getElementById("rightBtn");
    // shootBtn = document.getElementById("shootBtn");
    // span = document.getElementById("myModal").getElementById("modalContent").getElementById("spanButton");


    // youWonMessage = document.getElementsByClassName("closeYouWonMessage")[0];
    // colErrorMessage = document.getElementsByClassName("closeColErrorMessage")[0];

    // leftArrow = 
    leftArrow = document.getElementById("leftArrow");
    leftArrow.addEventListener("click",leftArrowClicked);

    rightArrow = document.getElementById("rightArrow");
    rightArrow.addEventListener("click",rightArrowClicked);

    shootButton = document.getElementById("shootButton");
    shootButton.addEventListener("click",shootButtonClicked);

    // leftBtn.addEventListener("click", leftBtnClicked);
    // rightBtn.addEventListener("click", rightBtnClicked);
    // shootBtn.addEventListener("click", shootBtnClicked);
    // colErrorMessage.addEventListener("click", closeColErrorMessage);
    // youWonMessage.addEventListener("click", closeYouWonMessage);

    popUpBox = document.getElementsByClassName("closepopUpBox")[0];
    popUpBox.addEventListener("click", closepopUpBox);


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
    // coin2 = new Coin(coin2InitX,coin2InitY,40,gameColors.player2Color);

    // coin2.draw(ctx);


}
var x = 6.5;
var y = 2.5;
function createNewPlayerCoin() {

    // msg(tray1InitLength);
    // msg(tray2InitLength);

    playerCoinCol = 4;
    playerCoin = {}; //nullifying the object


    // var color;

    if (typeof previousColor == 'undefined') {
        color = firstColor;
    }
    else if(previousColor == gameColors.player1Color){
        color = gameColors.player2Color;
        // tray1.coins.draw()
        
        
        // ctx.fillStyle = gameColors.gameBackgroundColor; 
        // ctx.beginPath();
        // // ctx.arc(100, 100, 20,0,Math.PI*2,true);
        // // this.y+row*squareSize
        
        // ctx.arc (x*squareSize, gameTopMarginPx+(2.5*squareSize), 0.9*squareSize/2,0,Math.PI*2,true);
        // // ctx.arc(6.5*squareSize, gameTopMarginPx+(1.5*squareSize), 0.9*squareSize/2,0,Math.PI*2,true);
        // ctx.closePath();
        // ctx.fill();
        // tray1.coins.pop();
        // msg("New Tray 1 length is " + tray1.coins.length);
        // x--;
    }

    else{
        color = gameColors.player1Color;
        tray2.coins.pop();
        msg("New Tray 2 length is " + tray2.coins.length);
    }


    previousColor = color;


    let playerCoinInitX = canvas.width/2;
    let playerCoinInitY = gameTopMarginPx/2;

    playerCoin = new Coin(playerCoinInitX,playerCoinInitY,20,color);

    playerCoin.draw(ctx);

}


//helps figure out which key has been pressed
document.addEventListener("keydown",function(event) {
    onkeypressed(event);
})


function onkeypressed(event) {

    if(!(isKeyDisabled)){
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
    
}

// function showYouWonMessage(){

//     // winnerSound.play();
//     playWinnerTone();
//     youWonMessage = document.getElementById("youWonMessage");
//     youWonMessage.style.display = "block";    
// }

// function hideYouWonMessage() {
//     youWonMessage = document.getElementById("youWonMessage");
//     youWonMessage.style.display = "none";

// }

// function closeYouWonMessage() {
//     hideYouWonMessage();
// }

// function showColErrorMesage(){
//     playErrorTone();
//     colErrorMessage = document.getElementById("colErrorMessage");
//     colErrorMessageLine = document.getElementById("colErrorMessageLine");
//     colErrorMessageLine.innerHTML="We are testing";
//     colErrorMessage.style.display = "block";    
// }

// function hideColErrorMessage() {
//     colErrorMessage = document.getElementById("colErrorMessage");
//     colErrorMessage.style.display = "none";
//     // createNewPlayerCoin();
// }

// function closeColErrorMessage() {
//     hideColErrorMessage();
// }

function showpopUpBox(message){
    disableMoving();
    popUpBox = document.getElementById("popUpBox");
    popUpBoxMessage = document.getElementById("popUpBoxMessage");
    popUpBoxMessage.innerHTML=message;
    popUpBox.style.display = "block";    
}

function closepopUpBox(){
    popUpBox = document.getElementById("popUpBox");
    popUpBox.style.display = "none";
    enableMoving();
}

function enableMoving(){
    enableButtons();
    enableKeys();
}

function disableMoving(){
    disableKeys();
    disableButtons();
}

function enableKeys(){
    isKeyDisabled = false;
}

function disableKeys(){
    isKeyDisabled = true;
}

function enableButton(btn) {
    btn.disabled = false;
}

function disableButton(btn) {
    playErrorTone();
    btn.disabled = true;
}

function enableButtons(){
    // enableButton(leftBtn);
    enableButton(leftArrow);
    // enableButton(rightBtn);
    enableButton(rightArrow);
}

function disableButtons(){
    // disableButton(leftBtn);
    disableButton(leftArrow);
    // disableButton(rightBtn);
    disableButton(rightArrow);
}

function shootBtnClicked(){

    if (gameBoard.drop(playerCoin, ctx, playerCoinCol)) {
        enableButtons();
        createNewPlayerCoin();
        // showColErrorMesage();
        // showYouWonMessage();
        // var player = "Abhinn";
        // showpopUpBox("Congrats! " + player + " Won");
        // showpopUpBox(messages.winner);
        // playVictoryTone();

    }
    else {
        // errorAlert("Try Another Column");
        // showColErrorMesage();
        // var testerLine = "Try another column, this one's full";
        playErrorTone();
        showpopUpBox(messages.colError + messages.deafult);
        // showYouWonMessage();
    }
}

function rightBtnClicked(){

    if(playerCoinCol == 7){
        // disableButton(rightBtn);
        disableButton(rightArrow);
        showpopUpBox(messages.tooFarRight + messages.deafult);
    }
    else{
        enableButtons();
        playerCoin.moveRight(ctx,gameBoard.sqSize,gameColors.gameBackgroundColor);
        playerCoinCol += 1;
    }

}

function leftBtnClicked(){

    if(playerCoinCol == 1){
        // disableButton(leftBtn);
        disableButton(leftArrow);

        showpopUpBox(messages.tooFarLeft + messages.deafult);
    }
    else{
        enableButtons();
        playerCoin.moveLeft(ctx,gameBoard.sqSize,gameColors.gameBackgroundColor);
        playerCoinCol -= 1;
    }

}

 // doing nothing for now
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
  var victorySound = new sound("victorySound.mp3")
  
  function playErrorTone() {
    errorSound.play();
  }
  
  function playVictoryTone(){
    victorySound.play();
  }

  function leftArrowClicked(){
      console.log("Testing img function");
      leftBtnClicked();
  }
  
  function rightArrowClicked(){
    console.log("Testing img function");
    rightBtnClicked();
}
function shootButtonClicked(){
    shootBtnClicked();
}