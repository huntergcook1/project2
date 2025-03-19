document.addEventListener("DOMContentLoaded", function () {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const timerElement = document.getElementById("timer");
    const correctCountElement = document.getElementById("correctCount");
    const wrongCountElement = document.getElementById("wrongCount");

    let questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is the capital of France?", options: ["London", "Paris", "Berlin"], answer: "Paris" },
        { question: "What is the largest planet?", options: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" }
    ];

    let currentQuestionIndex = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let timeLeft = 10;
    let timer;

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            questionElement.textContent = "Quiz Over!";
            optionsElement.innerHTML = `<button class="btn btn-success" onclick="restartQuiz()">Restart</button>`;
            clearInterval(timer);
            return;
        }

        let currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";

        currentQuestion.options.forEach(option => {
            let button = document.createElement("button");
            button.textContent = option;
            button.classList.add("btn", "btn-outline-primary", "m-2");
            button.onclick = () => checkAnswer(option, currentQuestion.answer);
            optionsElement.appendChild(button);
        });

        resetTimer();
    }

    function checkAnswer(selected, correct) {
        clearInterval(timer);

        if (selected === correct) {
            correctCount++;
            correctCountElement.textContent = correctCount;
        } else {
            wrongCount++;
            wrongCountElement.textContent = wrongCount;
        }

        currentQuestionIndex++;
        setTimeout(loadQuestion, 1000);
    }

    function resetTimer() {
        timeLeft = 10;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer); wrongCount++; wrongCountElement.textContent = wrongCount;
                currentQuestionIndex++; loadQuestion();
            }
        }, 1000);
    } function restartQuiz() {
        currentQuestionIndex = 0;
        correctCount = 0; wrongCount = 0; correctCountElement.textContent = "0"; wrongCountElement.textContent = "0";
        loadQuestion();
    } loadQuestion();
});