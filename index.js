buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var x = false;
var level = 0;


$(document).keydown(function() {
  if (!x) {

    $("#level-title").html("Level" + level);
    nextSequence();
    x = true;

  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);

});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");
  },100);
  $("h1").html("Game Over, Press any key to restart");
    startOver()
  }

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 200);


}


function nextSequence() {

  userClickedPattern = [];
  level = level + 1;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}
function startOver(){
  level=0;
  gamePattern=[];
  x=false;

}
