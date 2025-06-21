const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false }
    ]
  },
  {
    question: "Which language is used for web apps?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  }
];

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const jokeBtn = document.getElementById("joke-btn");
const jokeBox = document.getElementById("joke-box");

let currentIndex = 0;
let score = 0;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let current = questions[currentIndex];
  questionEl.innerText = `${currentIndex + 1}. ${current.question}`;
  current.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextBtn.style.display = "inline-block";
}

function handleNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionEl.innerText = `You scored ${score} out of ${questions.length}.`;
  nextBtn.innerText = "Play Again";
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length) {
    handleNext();
  } else {
    startQuiz();
  }
});

jokeBtn.style.display = "inline-block";
jokeBtn.addEventListener("click", () => {
  jokeBox.innerText = "Loading the joke...";
  fetch("https://v2.jokeapi.dev/joke/Dark?type=single")
    .then(response => response.json())
    .then(data => {
      jokeBox.innerText = data.joke;
    })
    .catch(() => {
      jokeBox.innerText = "Failed to load joke.";
    });
});

startQuiz();
