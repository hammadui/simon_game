gamepattern=[];
userClickedPattern=[];


var check=false;
var level = 0;

$(document).on("keypress",function(){
  if (check === false){
    $("h1").text("Level "+level);
    nextSequence();
    check=true;
  }
});

$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound (userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamepattern.length){
           setTimeout(function () {
             nextSequence();
           }, 1000);
         }
       }
     else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
}
}

function startOver(){
  level=0;
  userClickedPattern=[];
  gamepattern=[];
  check=false;
}
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber= Math.floor(Math.random()*4);
  var buttonColours =["red", "blue", "green", "yellow"];
  var randomChosenColour = buttonColours[randomNumber];

  gamepattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound (randomChosenColour);
}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  }



function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
