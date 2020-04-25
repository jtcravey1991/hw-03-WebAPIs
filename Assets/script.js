//DOM variables
var quizContainer = document.getElementById("quizContainer");
var startButton = document.getElementById("startButton");
var questionContent = document.getElementById("questionContent");
var questionNumberSpan = document.getElementById("questionNumberSpan");
var currentQuestion = document.getElementById("currentQuestion");
var answerDisplayList = document.getElementById("answerDisplayList");
var timeLeftSpan = document.getElementById("timeLeftSpan");
var results = document.getElementById("results");
var victoryScreen = document.getElementById("victoryScreen");
var finalScoreSpan = document.getElementById("finalScoreSpan");

// used to track current index
var currentIndex = 0;

// time left on the clock
var timeLeft = 60;

// declaring interval variable
var timer;

// array of question objects
var questionObjects = [
    {
        question: "What does DOM stand for?",
        possibleAnswers: ["Donuts On Monday", "Dont Order Macaroni", "Dorks Only Memorize", "Document Object Model"],
        correctAnswer: "3"
    },
    {
        question: "What type of function, often called in an event listener, does not need to be named?",
        possibleAnswers: ["Mystery Function", "Anonymous Function", "Nameless Function", "Listener Function"],
        correctAnswer: "1"
    },
    {
        question: "What is the document method for changing an elements attributes?",
        possibleAnswers: ["setAttribute()", "getAttribute()", "pushAttribute()", "attributeSet()"],
        correctAnswer: "0"
    },
    {
        question: "What is it called when you add an element to the end of another element?",
        possibleAnswers: ["prepend", "suspend", "append", "add to the bottom"],
        correctAnswer: "2"
    },
    {
        question: "What is the function to stop an interval?",
        possibleAnswers: ["stopTime()", "clearInterval()", "clearTimeout()", "stop()"],
        correctAnswer: "1"
    },
    {
        question: "What is the term for adding an event listener to an element, then using if statements to determine if the function runs based on the event targets id?",
        possibleAnswers: ["Event Delegation", "Listener Statement", "Event Separation", "Event Ifs"],
        correctAnswer: "0"
    },
    {
        question: "What function do you call to stop a submit button in a form from refreshing the page?",
        possibleAnswers: ["stopRefresh()", "cancelSubmit()", "dontDoIt()", "preventDefault()"],
        correctAnswer: "3"
    },
    {
        question: "What is JSON data?",
        possibleAnswers: ["A name minus the 'a'", "Jean Shorts On Never", "Javascript Object Notation", "Just Smell Only Noodles"],
        correctAnswer: "2"
    }
]

// start button listener
startButton.addEventListener("click", function () {
    timeLeft = 60;
    currentIndex = 0;
    victoryScreen.style.display = "none";
    startButton.classList.add("hide");
    highScoresButton.classList.add("hide");
    questionContent.style.display = "block";
    quizContainer.style.display = "block";
    displayQuestion(currentIndex);
    startTimer();
    timeLeftSpan.textContent = timeLeft;
});

// answer list listener
answerDisplayList.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        var answer = e.target.getAttribute("id");
        var isCorrect = checkAnswer(currentIndex, answer);
        if (isCorrect === true) {
            results.textContent = "Correct";
        }
        else {
            results.textContent = "Wrong";
            timeLeft -= 10;
            timeLeftSpan.textContent = timeLeft;
        }
        setTimeout(clearResults, 1500)
        currentIndex++;
        if (currentIndex === questionObjects.length) {
            clearInterval(timer);
            displayVictoryScreen();
            return;
        }
        displayQuestion(currentIndex);
    }
});

/* displays a question from the questionObjects array, along with possible answers
Arguments:
index: index of questionObjects of the question you'd like to display
*/
function displayQuestion(index) {
    answerDisplayList.innerHTML = "";
    questionNumberSpan.textContent = parseInt(index) + 1;
    currentQuestion.textContent = questionObjects[index].question;
    for (var i = 0; i < questionObjects[index].possibleAnswers.length; i++) {
        var question = document.createElement("li");
        var qButton = document.createElement("button");
        qButton.setAttribute("type", "button");
        qButton.setAttribute("id", i);
        qButton.textContent = questionObjects[index].possibleAnswers[i];
        question.appendChild(qButton);
        answerDisplayList.appendChild(question);
    }
}

/* checks if the user answer is correct
Arguments:
index: the index of the current question in questionObjects
answer: the users answer
*/
function checkAnswer(index, answer) {
    var userAnswer = parseInt(answer);
    var correctAnswer = parseInt(questionObjects[index].correctAnswer)
    var isCorrect = false;
    if (userAnswer === correctAnswer) {
        isCorrect = true;
    }
    return isCorrect;
}

function clearResults() {
    results.textContent = "";
}

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft < 0) {
            alert("You have failed, please try again!");
            initialize();
            clearInterval(timer);
        }
        timeLeftSpan.textContent = timeLeft;
    }, 1000)
}

function initialize() {
    currentIndex = 0;
    timeLeft = 60;
    victoryScreen.style.display = "none";
    questionContent.style.display = "none";
    startButton.textContent = "Start!";
    startButton.classList.remove("hide");
    highScoresButton.classList.remove("hide");
    quizContainer.setAttribute("style", "justify-content: center;");
}

function displayVictoryScreen() {
    questionContent.style.display = "none";
    finalScoreSpan.textContent = timeLeft;
    startButton.textContent = "Play Again!";
    victoryScreen.style.display = "block";
    startButton.classList.remove("hide");
    highScoresButton.classList.remove("hide");
}