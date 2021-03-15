// Global variables Bellow
var startBtn = document.getElementById("button");
var quiz = document.getElementById("quiz");
var timer = document.getElementById("timer");
var questionDiv = document.getElementById("questionsDiv");
var quizQuestion = document.getElementById("question");
var aEl = document.getElementById("a");
var bEl = document.getElementById("b");
var cEl = document.getElementById("c");
var dEl = document.getElementById("d");
var resultsDiv = document.getElementById("results");
var answersEl = document.querySelectorAll(".answer");
var userInput = document.getElementById("userInput");
var submit = document.getElementById("submitButton");
var time = 60;
var timerId;
var currentQuestion = 0;
var score = 0;
// Questions Array
var questions = [
  {
    question: "What is JavaScript?",
    a: "A script of various coffee flavors",
    b: "A lightweight, interpreted programming language with first-class functions",
    c: "A programming paradigm",
    d: "A type of font in css",
    answer: "A lightweight, interpreted programming language with first-class functions",
  },
  {
    question: "Who invented JavaScript?",
    a: "Douglas Crockford",
    b: "Steve Jobs",
    c: "Elon Musk",
    d: "Brendan Eich",
    answer: "Brendan Eich",
  },
  {
    question: "Inside which HTML elment do we put the JavaScript?",
    a: "<scripting>",
    b: "<script>",
    c: "<javascript>",
    d: "<js>",
    answer: "<script>",
  },
  {
    question: 'How do you alert the message "Hello World"?',
    a: 'alertBox("Hello World")',
    b: 'msg("Hello World")',
    c: 'alert("Hello World")',
    d: 'msgBox("Hello World")',
    answer: 'alert("Hello World")',
  },
  {
    question: 'How do you create a function in JavaScript"?',
    a: "function myFunction()",
    b: "function: myFunction()",
    c: "function = myFunction",
    d: "function(myFunction)",
    answer: "function myFunction()",
  },
];
// Event Handling Bellow
startBtn.onclick = startQuiz;
submit.onclick = saveData;
// Logic Functions Bellow
function startQuiz() {
  quiz.setAttribute("class", "hidden");
  userInput.setAttribute("class", "hidden");
  submit.setAttribute("class", "hidden");
  timerId = setInterval(countDown, 1000);
  timer.textContent = time;
  currentQuestion = 0;
  loadNextQuestion();
}

function countDown() {
  time--;
  timer.textContent = time;
  if (time <= 0) {
    clearInterval(timerId);
  }
}

function loadNextQuestion() {
  quizQuestion.textContent = questions[currentQuestion].question;
  aEl.textContent = questions[currentQuestion].a;
  bEl.textContent = questions[currentQuestion].b;
  cEl.textContent = questions[currentQuestion].c;
  dEl.textContent = questions[currentQuestion].d;
}

function handleCorrect() {
  score++;
  console.log(score);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadNextQuestion();
  } else showResults();
}

function handleIncorrect() {
  time = time - 5;
  console.log(false);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadNextQuestion();
  }
}

function saveData() {
  var userInitals = userInput.value;
  var userScore = { name: userInitals, userScore: score };
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push(userScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  resultsDiv.append(
    JSON.stringify(highScores[0].name + ":" + "" + highScores[0].userScore)
  );
}

function showResults() {
  questionDiv.setAttribute("class", "hidden");
  clearInterval(timerId);
  userInput.classList.remove("hidden");
  submit.classList.remove("hidden");
  var highscore = window.localStorage.getItem("");
}

answersEl.forEach((answerEl) => {
  answerEl.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.textContent === questions[currentQuestion].answer) {
      handleCorrect();
    } else handleIncorrect();
  });
});






