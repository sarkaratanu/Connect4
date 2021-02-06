
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
var winnerSound = new sound("winnerSound.mp3")

export function playErrorTone() {
  errorSound.play();
}

export function playWinnerTone(){
  winnerSound.play();
}