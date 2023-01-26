var startBtn = document.querySelector(".start_btn");
var questionSection = document.querySelector(".question-section");
var questionH3 = document.querySelector(".question");
var answerListDiv = document.querySelector(".answer_list");
var resultBoxDiv = document.querySelector(".result_box");
var timerSecDiv = document.querySelector(".timer_sec");
var initialsInput = document.querySelector("#initials_input");
var saveScoreBtn = document.querySelector("#save_score");

var currentIndex = 0;
var timeLeft = 60;
var totalScore = 0;

var timer;

var questions = [
    {
        text: "Which one of the following is not a JavaScript Data Type?",
        options: [
            "Number",
            "String",
            "Boolean",
            "Object",
            "Undefined",
            "Function"
        ],
        correct: "Function"
    },
    {
        text: "What is the difference between == and === operator?",
        options: [
            "=== will render true only if both values are strictly the same, and == will render true if the value is the same and doesn't matter if the data type is different.",
            "=== is a typo.",
            "Both will render the same result no matter what the data type.",
            "=== does not exist in JavaScript"
        ],
        correct: "=== will render true only if both values are strictly the same, and == will render true if the value is the same and doesn't matter if the data type is different."
    },
    {
        text: "The following is NOT a type of Pop up box available in JavaScript",
        options: [
            "Alert",
            "Confirm",
            "Calculate",
            "Prompt"
        ],
        correct: "Calculate"
    },
    {
        text: "Which is NOT a way to define a variable in JavaScript",
        options: [
            "Select",
            "Var",
            "Let",
            "Const"
        ],
        correct: "Select"
    },
    {
        text: "The [ ] symbol is used to create what in Javascript",
        options: [
            "A Function",
            "A Boolean",
            "An Array",
            "A Variable"
        ],
        correct: "An Array"
    },

];

function startQuiz() {
    questionSection.classList.remove("hide");
    startTimer();
    displayQuestion();
}

function startTimer() {
    timerSecDiv.textContent = timeLeft;

    timer = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            timerSecDiv.textContent = timeLeft;
        } else {
            endGame();
        }
    }, 1000)
}

function displayQuestion() {
    questionH3.textContent = questions[currentIndex].text;

    answerListDiv.innerHTML = "";

    for (i = 0; i < questions[currentIndex].options.length; i++) {
        var newBtn = document.createElement("button");
        newBtn.textContent = questions[currentIndex].options[i];
        newBtn.addEventListener("click", nextQuestion);
        answerListDiv.append(newBtn)
    }
}

function nextQuestion(event) {

    // check the answer
    var selectedAnswer = event.target.textContent;
    var correctAnswer = questions[currentIndex].correct;
    var feedback = document.querySelector("#feedback");

    if (selectedAnswer == correctAnswer) {
        feedback.innerHTML = "Correct!";
        totalScore++;
    } else {
        feedback.innerHTML = "Wrong!";
        timeLeft = timeLeft - 10;
    }



    currentIndex++;

    if (currentIndex < questions.length) {
        displayQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    questionSection.classList.add("hide");
    resultBoxDiv.classList.remove("hide");
    var initial = document.querySelector("#initial");
    initial.classList.remove("hide");
}

function saveScore() {
    var initials = initialsInput.value;
    var score = totalScore;

    var obj = {
        initials,
        score
    }

    console.log(obj);
    var scoreText = document.querySelector(".score_text");
    scoreText.innerHTML = "Your final score is " + score;
    localStorage.setItem("score", JSON.stringify(obj))
}

startBtn.addEventListener("click", startQuiz);
saveScoreBtn.addEventListener("click", saveScore)