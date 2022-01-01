var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0 ;
var started = true ;
var highscore = 0 ;

//Event Listner for Clicking on Tiles
$(".btn").click(function(){
                        var userChosenColour = this.getAttribute("id");
                        userClickedPattern.push(userChosenColour);
                        playAudio(userChosenColour);
                        animatePress(userChosenColour);
                        checkAnswer(userClickedPattern.length - 1);
                        // userClickedPattern = [];
                        }
                );
// Event Listner for keyboard press
$("body").keydown(function(){
            if(started){
            nextSequence();
            started = false ;
            }
        } 
    )
//Event Listner for clicking on restart button
$("#level-title-h2").click(function() {
        $("#level-title-h2").hide();
        nextSequence();
});

/* <i class="fas fa-redo fa-2x"></i> */


//Method to run next sequence after user action
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playAudio(randomChosenColour);
    level++ ;
    $("#level-title").text("Level " + level);
    calculateHighScore(level) ;
    
}

//Function to add animation
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {  $("#" + currentColour).removeClass("pressed");  }, 100);
}

//Function to play audio 
function playAudio(currentColour) {
    var audio = new Audio("sounds/" + currentColour + ".mp3");
    audio.play();
}

//Function to check if user click is correct
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }
    else{
        playAudio("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() { $("body").removeClass("game-over"); },  200);
        startOver();
        $("#level-title-h2").show().text("Restart").prepend("<i class='fas fa-redo'></i> ");
    }
}

//Function to reset chnages after restart
function startOver(){
    level = 0 ;
    gamePattern = [];
    userClickedPattern = [];
    started = true;
}

//Function to calulate highscore and show it
function calculateHighScore(level){
    if(highscore <= level){
        highscore = level;
        $("#level-title-h3").text("High Score: " + highscore);
    }
    else{
        $("#level-title-h3").text("High Score: " + highscore);
    }
}