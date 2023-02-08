var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickedPattern = [];
var chosenColor;
var started = false;
var level = 0;
$(document).keydown(function (e) {
    if (started == false) {
        started = true;
        pattern();
    }
});
function pattern() {
    var randnum = Math.random();
    randnum = randnum * 4;
    randnum = Math.floor(randnum);
    $("#level-title").text("Level " + level);
    level++;
    chosenColor = buttonColors[randnum];
    gamePattern.push(chosenColor);

    $("#" + chosenColor)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playsound(chosenColor);
}

$(".btn").click(function () {
    var userColor = $(this).attr("id");
    clickedPattern.push(userColor);

    animatePress(userColor);
    playsound(userColor);
    Restart(clickedPattern.length - 1);
});

function playsound(key) {
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}
function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}
function Restart(k) {
    console.log(gamePattern);
    console.log(clickedPattern);

    if (gamePattern[k] != clickedPattern[k]) {
        gamePattern = [];
        clickedPattern = [];
        started = false;
        $("#level-title").text("Game Over");
        level = 0;
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        setTimeout(function () {
            $("#level-title").text("Press A Key To Start");
        }, 1000);
        return;
    }
    var n = gamePattern.length;
    if (k === n - 1) {
        clickedPattern = [];
        setTimeout(function () {
            pattern();
        }, 1000);
    }
}
