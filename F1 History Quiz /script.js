const questions = [
  {
    question: "Who was the Consecutive 4 time winner during 2021-24?",
    options: ["Lewis Hamilton", "Max Verstappen", "Charles Leclerc", "Lando Norris"],
    correctAnswer: 1
  },
  {
    question:  "Who was the Consecutive 4 time winner during 2017-20?",
    options: ["Kimi Räikkönen", "Max Verstappen", "Sebastian Vettel", "Lewis Hamilton"],
    correctAnswer: 3
  },
  // {
  //   question: "Who Was the F1 Drivers Championship winner in 2016?",
  //   options: ["Kimi Räikkönen", "Nico Rosberg", "Lewis Hamilton", "Sebastian Vettel"],
  //   correctAnswer: 1
  // },
  // {
  //   question: "Who was the consecutive 3 time winner during 2010-13?",
  //   options: ["Kimi Räikkönen", "Nico Rosberg", "Lewis Hamilton", "Sebastian Vettel"],
  //   correctAnswer: 3
  // },
  // {
  //   question: "Who Was the F1 Drivers Championship winner in 2009?",
  //   options: ["Mark Webber", "Jenson Button","Kimi Räikkönen","Lewis Hamilton"],
  //   correctAnswer: 1
  // },
  // {
  // question: "Who Was the F1 Drivers Championship winner in 2008?",
  // options: ["Fernando Alonso", "Michael Schumacher","Kimi Räikkönen","Lewis Hamilton"],
  // correctAnswer: 3
  // },
  // {
  // question: "Who Was the F1 Drivers Championship winner in 2007?",
  // options: ["Michael Schumacher", "Fernando Alonso","Kimi Räikkönen","Lewis Hamilton"],
  // correctAnswer: 2
  // },
  // {
  // question: "Who was the Consecutive 2 time winner during 2005-06?",
  // options: ["Michael Schumacher", "Fernando Alonso","Kimi Räikkönen","Lewis Hamilton"],
  // correctAnswer: 1
  // },
  // {
  // question: "Who was the Consecutive 5 time winner during 2000-04?",
  // options: ["Michael Schumacher", "Fernando Alonso","Kimi Räikkönen","Lewis Hamilton"],
  // correctAnswer: 0
  // }
];

let currentQuestion = 0;

const quizContainer = document.getElementById("quiz-container");

function showQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question">
      <h2>Q${currentQuestion + 1}: ${q.question}</h2>
      ${q.options.map((opt, i) => `<button onclick="selectAnswer(${i})">${opt}</button>`).join("<br><br>")}
      <p id="feedback" style="color: red; margin-top: 1rem;"></p>
    </div>
  `;
}

function selectAnswer(index) {
  const correct = questions[currentQuestion].correctAnswer;
  const feedback = document.getElementById("feedback");

  if (index === correct) {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  } else {
    feedback.textContent = "Try again!";
  }
}

function showResult() {
  quizContainer.innerHTML = `
    <div class="result">
      <h2>100% Quiz Complete!</h2>
      <p>Great job! You answered all questions correctly.</p>
      <button onclick="restartQuiz()">Retake Quiz</button>
    </div>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  showQuestion();
}

showQuestion();
