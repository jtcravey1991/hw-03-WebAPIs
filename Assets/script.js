var quizContainer = document.getElementById("quizContainer");
var startButton = document.getElementById("startButton");
var questionContent = document.getElementById("questionContent");
var questionNumberSpan = document.getElementById("questionNumberSpan");
var currentQuestion = document.getElementById("currentQuestion");
var answerDisplayList = document.getElementById("answerDisplayList");
var timeLeftSpan = document.getElementById("timeLeftSpan");

var questionObjects = [
    {
        question: "What does DOM stand for?",
        possibleAnswers: ["Donuts On Monday", "Dont Order Macaroni", "Dorks Only Memorize", "Document Object Model"],
        correctAnswer:"3"
    },
    {
        question: "What type of function, often called in an event listener, does not need to be named?",
        possibleAnswers: ["Mystery Function", "Anonymous Function", "Nameless Function", "Listener Function"],
        correctAnswer:"1"
    },
    {
        question: "What is the document method for changing an elements attributes?",
        possibleAnswers: ["setAttribute()", "getAttribute()", "pushAttribute()", "attributeSet()"],
        correctAnswer:"0"
    },
    {
        question: "What is it called when you add an element to the end of another element?",
        possibleAnswers: ["prepend", "suspend", "append", "add to the bottom"],
        correctAnswer:"2"
    },
    {
        question: "What is the function to stop an interval?",
        possibleAnswers: ["stopTime()", "clearInterval()", "clearTimeout()", "stop()"],
        correctAnswer:"1"
    },
    {
        question: "What is the term for adding an event listener to an element, then using if statements to determine if the function runs based on the event targets id?",
        possibleAnswers: ["Event Delegation", "Listener Statement", "Event Separation", "Event Ifs"],
        correctAnswer:"0"
    },
    {
        question: "What function do you call to stop a submit button in a form from refreshing the page?",
        possibleAnswers: ["stopRefresh()", "cancelSubmit()", "dontDoIt()", "preventDefault()"],
        correctAnswer:"3"
    },
    {
        question: "What is JSON data?",
        possibleAnswers: ["A name minus the 'a'", "Jean Shorts On Never", "Javascript Object Notation", "Just Smell Only Noodles"],
        correctAnswer:"2"
    }
]

startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    questionContent.style.display = "block";
    quizContainer.style.display = "block";
    displayQuestion(0);
});

function displayQuestion (index) {
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

