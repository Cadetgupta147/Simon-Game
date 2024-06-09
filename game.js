
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var level = 0;
var toggle = true; 

$(document).on("keydown",function(){
  
  if(toggle){
    nextSequence();
    toggle = false;
    }
    
});
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern.length = 0;
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  
}

$(".btn").on("click",function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour)
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  },100);
}

function checkAnswer(currentLevel){
  for(var i = 0; i <= currentLevel; i++){
    if(userClickedPattern[i] != gamePattern[i]){
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over")
        }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}

function startOver(){
  toggle = true;
  level = 0;
  gamePattern.length = 0;
}

