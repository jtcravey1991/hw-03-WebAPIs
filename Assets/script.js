var quizContainer = document.getElementById("quizContainer");
var startButton = document.getElementById("startButton");
var questionContent = document.getElementById("questionContent");
var questionNumberSpan = document.getElementById("questionNumberSpan");
var currentQuestion = document.getElementById("currentQuestion");
var answerDisplayList = document.getElementById("answerDisplayList");
var timeLeftSpan = document.getElementById("timeLeftSpan");

startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    questionContent.style.display = "block";
    quizContainer.style.display = "block";
});