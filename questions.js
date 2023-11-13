var questionTitle = document.querySelector("#qTitle")
var timer = document.querySelector("#timer");
var startButton = document.querySelector("#start");
var questionsDiv = document.querySelector("#questionsDiv");
var displayList = document.createElement("ul");
displayList.setAttribute("id", "optionsUl")
var newDiv = document.createElement("div");
var feedback = document.createElement("h3");
newDiv.setAttribute("id", "newDiv");

var score = 0;
var questions = [
    {
        theQuestion: "1 + 1: ",
        choices: ["0", "1", "2", "3"],
        theAnswer: "2"
    },
    {
        theQuestion: "3 + 5",
        choices: ["4", "8", "2", "15"],
        theAnswer: "8"
    },
    {
        theQuestion: "3 * 5",
        choices: ["4", "8", "2", "15"],
        theAnswer: "15"
    },
    {
        theQuestion: "0 + 0",
        choices: ["00", "01", "10", "11"],
        theAnswer: "00"
    },
    {
        theQuestion: "8 % 4",
        choices: ["32", "2", "0", "16"],
        theAnswer: "0"
    }
];
var questionIndex = 0;
var timeInterval = 0;
var countdown = 60;
var penalty = 5;
var i = 0;


startButton.addEventListener("click", function () {
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            countdown--;
            timer.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(timeInterval);
                endOfGame();
            }
        }, 1000);
    }
    newQuestion(questionIndex)
});

function newQuestion(questionIndex) {
    questionsDiv.innerHTML = "";
    displayList.innerHTML = "";
    var displayQuestion = document.createElement("h2");

    for (var i = 0; i < questions.length; i++) {
        displayQuestion.innerHTML = questions[questionIndex].theQuestion;
        var displayChoices = questions[questionIndex].choices;
        questionsDiv.appendChild(displayQuestion);
    }
    console.log(displayChoices);
    displayChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button>" + newItem + "</button>";
        questionsDiv.appendChild(displayList);
        displayList.appendChild(listItem);
        listItem.addEventListener("click", (confirmTheAnswer));
    })
}

function confirmTheAnswer(event) {
    var choice = event.target;
    questionsDiv.appendChild(newDiv);
    newDiv.appendChild(feedback);
    var next = document.createElement("button");
    next.setAttribute("id", "nextButton");
    next.textContent = "Next Question";

    if (choice.textContent == questions[questionIndex].theAnswer) {
        score++;
        feedback.textContent = "That's Correct!";
        newDiv.appendChild(feedback);

        newDiv.appendChild(next);
        next.addEventListener("click", (continueToNext));
    } else {
        countdown = countdown - penalty;
        feedback.textContent = "That's Incorrect!";
        newDiv.appendChild(feedback);
    }
}

function continueToNext(event) {
    newDiv.innerHTML = "";
    questionIndex++;
    if (questionIndex >= questions.length) {
        endOfGame();
    } else {
        newQuestion(questionIndex);

    }
}
function endOfGame() {
    questionsDiv.innerHTML = "";
    timer.innerHTML = "";

    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Done!"
    questionsDiv.appendChild(newH1);

    if (countdown >= 0) {
        score = countdown;
        clearInterval(timeInterval);
        var newP = document.createElement("p");
        newP.textContent = "Your score is: " + score;
        questionsDiv.appendChild(newP);
    } else {
        score = 0;
        var outOfTime = document.createElement("h2");
        outOfTime.textContent = "Timeout!";
        questionsDiv.appendChild(outOfTime);
        var newP = document.createElement("p");
        newP.textContent = "Your score is: " + score;
        questionsDiv.appendChild(newP);
    }

    var initialsPrompt = document.createElement("label");
    initialsPrompt.setAttribute("for", "inputBox");
    initialsPrompt.textContent = "Enter your name initials: ";
    questionsDiv.appendChild(initialsPrompt);

    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "inputBox")
    inputBox.textContent = "";
    questionsDiv.appendChild(inputBox)

    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";
    questionsDiv.appendChild(submit);

    submit.addEventListener("click", function () {
        var initials = inputBox.value;

        if (initials === "") {
            console.log("No initials entered")
            window.alert("Please enter your initials");

        } else {
            var finalScore = {
                initials: initials,
                score: score
            }
            var storeScores = localStorage.getItem("storeScores");
            if (storeScores === null) {
                storeScores = [];
            } else {
                storeScores = JSON.parse(storeScores);
            }
            storeScores.push(finalScore);
            var newScore = JSON.stringify(storeScores);
            localStorage.setItem("storeScores", newScore);
            window.location.replace("results.html");
        }
    });
};
