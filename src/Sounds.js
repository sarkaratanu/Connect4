
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
var victorySound = new sound("victorySound.mp3");
var dropSound = new sound("dropSound.mp3");

export function playErrorTone() {
  errorSound.play();
}

export function playVictoryTone(){
  victorySound.play();
}

export function playDropSound(){
  dropSound.play();
}
