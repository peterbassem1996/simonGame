var a = new Audio("sounds/red.mp3");
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function(){
  if(!started){
    nextSequence();
  }
  started = true;
});

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  setTimeout(function(){
    animatePress(userChosenColor);
  }, 100);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern[gamePattern.length] = randomChosenColor;
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level " + ++level);
}

function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color){
  $("#" + color).toggleClass("pressed");
}

function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
   console.log("success");
   if(currentLevel === gamePattern.length - 1){
     setTimeout(nextSequence, 500);
   }
 }
 else{
   console.log("wrong");
   var audio = new Audio("sounds/wrong.mp3");
   audio.play();
   $("body").toggleClass("game-over");
   $("#level-title").text("Game Over, Press Any Key To Restart");
   setTimeout(function(){
     $("body").toggleClass("game-over");
   }, 200);
   startOver();
 }
}

function startOver(){
  started = false;
  gamePattern = [];
  level = 0;
}