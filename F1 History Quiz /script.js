document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button[data-index]");
  const feedback = document.getElementById("feedback");

  const currentPage = window.location.pathname;
  let questionAttempts = JSON.parse(localStorage.getItem("attempts")) || {};

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = parseInt(button.getAttribute("data-index"));
      const correct = parseInt(button.getAttribute("data-correct"));

      // Track attempts for this page
      questionAttempts[currentPage] = (questionAttempts[currentPage] || 0) + 1;
      localStorage.setItem("attempts", JSON.stringify(questionAttempts));

      if (selected === correct) {
        const nextPage = button.getAttribute("data-next");
        const carImage = button.getAttribute("data-car");

        let score = parseInt(localStorage.getItem("score")) || 0;
        localStorage.setItem("score", score + 1);

        // Car animation
        button.classList.add("car-btn", "car-drive");
        button.style.backgroundImage = `url(${carImage})`;

        setTimeout(() => {
          window.location.href = nextPage;
        }, 2000);
      } else {
        if (feedback) {
          feedback.textContent = "Try again!";
        }
      }
    });
  });

  // ✅ Restart button sends user to the index page
  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      localStorage.removeItem("score");
      localStorage.removeItem("attempts");
      window.location.href = "index.html";
    });
  }

  // Score and attempt summary on result page
  const scoreDisplay = document.getElementById("score-display");
  const summary = document.getElementById("attempt-summary");

  if (scoreDisplay && summary) {
    const finalScore = localStorage.getItem("score") || 0;
    scoreDisplay.textContent = `You got ${finalScore} out of 9!`;

    const attempts = JSON.parse(localStorage.getItem("attempts")) || {};
    let html = "<h3>Question Attempts:</h3><ul>";

    Object.keys(attempts).forEach((page, index) => {
      const qNum = index + 1;
      const tries = attempts[page];
      const status = tries === 1 ? "✅ First try" : `❌ ${tries} tries`;
      html += `<li>Question ${qNum}: ${status}</li>`;
    });

    html += "</ul>";
    summary.innerHTML = html;
  }
});
