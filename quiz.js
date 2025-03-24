document.addEventListener("DOMContentLoaded", function () {
    const settings = JSON.parse(localStorage.getItem("triviaSettings"));
    const questionContainer = document.getElementById("quiz-container");
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeRemaining = 15;
    let startTime = Date.now();
    let questions = [];

    // Fetch trivia questions based on saved settings
    fetchQuestions();

    function fetchQuestions() {
        const url = `https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                questions = data.results;
                loadQuestion();
            })
            .catch(error => console.error("Error fetching questions:", error));
    }

    function loadQuestion() {
        const question = questions[currentQuestionIndex];

        // Decode HTML entities for question text
        document.getElementById("questionText").innerHTML = decodeHTMLEntities(question.question);
        document.getElementById("questionNumber").textContent = `Question ${currentQuestionIndex + 1} of ${settings.amount}`;

        // Set up timer
        timeRemaining = 15;
        document.getElementById("timer").textContent = `Time Remaining: ${timeRemaining}s`;
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);

        // Display answer options
        const options = [...question.incorrect_answers, question.correct_answer];
        shuffleArray(options);

        const answerOptions = document.getElementById("answerOptions");
        answerOptions.innerHTML = "";
        options.forEach(option => {
            const button = document.createElement("button");
            button.classList.add("btn", "btn-outline-primary", "m-2");

            // Decode HTML entities for answer options
            button.innerHTML = decodeHTMLEntities(option);

            button.disabled = false;
            button.addEventListener("click", () => checkAnswer(button, option, question.correct_answer));
            answerOptions.appendChild(button);
        });

        document.getElementById("feedback").textContent = "";
        document.getElementById("nextButton").style.display = "none";
    }

    function updateTimer() {
        timeRemaining--;
        document.getElementById("timer").textContent = `Time Remaining: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }

    function checkAnswer(button, selectedAnswer, correctAnswer) {
        const feedback = document.getElementById("feedback");
        const nextButton = document.getElementById("nextButton");

        clearInterval(timer);

        // Disable all buttons
        const answerButtons = document.querySelectorAll("#answerOptions button");
        answerButtons.forEach(btn => (btn.disabled = true));

        if (selectedAnswer === correctAnswer) {
            feedback.textContent = "Correct!";
            score++;
        } else {
            feedback.textContent = "Wrong!";
        }

        nextButton.style.display = "block";
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        clearInterval(timer);
        document.getElementById("quiz-container").classList.add("d-none");
        document.getElementById("results").classList.remove("d-none");

        const totalTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("score").textContent = `${score} out of ${questions.length}`;
        document.getElementById("timeTaken").textContent = `${totalTime} seconds`;

        const result = {
            score: score,
            timeTaken: totalTime,
            date: new Date().toLocaleString(),
            totalQuestions: questions.length,
            category: settings.category,
            difficulty: settings.difficulty
        };
        saveResult(result);

        setTimeout(() => {
            window.location.href = "stats.html";
        }, 2000);
    }

    function saveResult(result) {
        let results = JSON.parse(localStorage.getItem("quizResults")) || [];
        results.push(result);
        localStorage.setItem("quizResults", JSON.stringify(results));
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to decode HTML entities
    function decodeHTMLEntities(text) {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        return textArea.value;
    }

    document.getElementById("nextButton").addEventListener("click", nextQuestion);
});
