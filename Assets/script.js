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
var highScoreScreen = document.getElementById("highScoreScreen");
var highScoreList = document.getElementById("highScoreList");
var backButton =document.getElementById("backButton");

// used to track current index
var currentIndex;

// time left on the clock
var timeLeft;

// declaring interval variable
var timer;

// array of high scores
var highScores = [
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    }
];

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

//initializes webpage
initialize();

// start button listener
startButton.addEventListener("click", function () {
    timeLeft = 60;
    currentIndex = 0;
    victoryScreen.style.display = "none";
    highScoreScreen.style.display = "none";
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
            checkScore();
            return;
        }
        displayQuestion(currentIndex);
    }
});

// high scores button listener
highScoresButton.addEventListener("click", function () {
    renderHighScores();
    displayHighScoreScreen();
});

//back button event listener
backButton.addEventListener("click", function () {
    initialize();
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

// clears the results of the last question
function clearResults() {
    results.textContent = "";
}

// starts the clock for the timed quiz
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

//initializes the page, resetting everything
function initialize() {
    currentIndex = 0;
    timeLeft = 60;
    highScoreScreen.style.display = "none";
    victoryScreen.style.display = "none";
    questionContent.style.display = "none";
    startButton.textContent = "Start!";
    startButton.classList.remove("hide");
    highScoresButton.classList.remove("hide");
    quizContainer.setAttribute("style", "justify-content: center;");
}

//displays victory screen and gets ready to run again
function displayVictoryScreen() {
    questionContent.style.display = "none";
    finalScoreSpan.textContent = timeLeft;
    startButton.textContent = "Play Again!";
    victoryScreen.style.display = "block";
    startButton.classList.remove("hide");
    highScoresButton.classList.remove("hide");
}

function displayHighScoreScreen() {
    questionContent.style.display = "none";
    victoryScreen.style.display = "none";
    startButton.textContent = "Start!";
    startButton.classList.add("hide");
    highScoresButton.classList.add("hide");
    highScoreScreen.style.display = "block";
    
}

//checks if score is top 5 and adds it to array if so
function checkScore() {
    var highScore = {
        name: "",
        score: timeLeft
    };

    for (var i = 0; i < highScores.length; i++) {
        if (timeLeft > parseInt(highScores[i].score)) {
            highScore.name = prompt("Congrats! You made a high score! Please enter your name.")
            highScores.splice(i, 1, highScore);
            i = highScores.length;
        }
    }
}

// adds high scores to the high scores page
function renderHighScores() {
    highScoreList.innerHTML = "";
    for (var i = 0; i < highScores.length; i++) {
        var score = document.createElement("li");
        score.textContent = ((i + 1) + ".  " + highScores[i].name + ":  " + highScores[i].score);
        highScoreList.appendChild(score);
    }
}
