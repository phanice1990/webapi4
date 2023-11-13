var highScores = document.querySelector("#scores");
var scoreContainer = document.querySelector("#resultsDiv");
var clearButton = document.querySelector("#clear");
var backButton = document.querySelector("#back");

backButton.addEventListener("click", function () {
    window.location.replace("index.html");
});

clearButton.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var storeScores = localStorage.getItem("storeScores");
storeScores = JSON.parse(storeScores);


if (storeScores !== null) {
    for (var i = 0; i < storeScores.length; i++) {
        var addScore = document.createElement("li");
        addScore.setAttribute("id", "scoreLi");
        addScore.textContent = storeScores[i].initials + " " + storeScores[i].score;

        highScores.appendChild(addScore);
    }
};


