document.addEventListener("DOMContentLoaded", function () {
    const settings = JSON.parse(localStorage.getItem("triviaSettings"));
    const questionContainer = document.getElementById("quiz-container");
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeRemaining = 15;
    let startTime = Date.now();  // Track start time for total time taken
    let questions = [];

    // Fetch trivia questions based on saved settings
    fetchQuestions();

    // Fetch questions from the API
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

    // Load a question
    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        document.getElementById("questionText").textContent = question.question;
        document.getElementById("questionNumber").textContent = `Question ${currentQuestionIndex + 1} of ${settings.amount}`;

        // Set up timer
        timeRemaining = 15;
        document.getElementById("timer").textContent = `Time Remaining: ${timeRemaining}s`;
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);

        // Display answer options
        const options = [...question.incorrect_answers, question.correct_answer];
        shuffleArray(options);  // Shuffle the answer options

        const answerOptions = document.getElementById("answerOptions");
        answerOptions.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement("button");
            button.classList.add("btn", "btn-outline-primary", "m-2");
            button.textContent = option;
            button.disabled = false;  // Enable the button initially
            button.addEventListener("click", () => checkAnswer(button, option, question.correct_answer));
            answerOptions.appendChild(button);
        });

        // Reset feedback and next button visibility
        document.getElementById("feedback").textContent = '';
        document.getElementById("nextButton").style.display = "none";
    }

    // Timer update
    function updateTimer() {
        timeRemaining--;
        document.getElementById("timer").textContent = `Time Remaining: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }

    // Check if the answer is correct
    function checkAnswer(button, selectedAnswer, correctAnswer) {
        const feedback = document.getElementById("feedback");
        const nextButton = document.getElementById("nextButton");

        // Stop the timer when an answer is selected
        clearInterval(timer);

        // Disable all other buttons
        const answerButtons = document.querySelectorAll("#answerOptions button");
        answerButtons.forEach(btn => btn.disabled = true);

        // Check if the answer is correct
        if (selectedAnswer === correctAnswer) {
            feedback.textContent = "Correct!";
            score++;
        } else {
            feedback.textContent = "Wrong!";
        }

        // Show Next Button
        nextButton.style.display = "block";
        nextButton.addEventListener("click", nextQuestion);
    }

    // Move to the next question
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    // Show the results at the end of the quiz
    function showResults() {
        clearInterval(timer);
        document.getElementById("quiz-container").classList.add("d-none");
        document.getElementById("results").classList.remove("d-none");

        // Calculate total time taken
        const totalTime = Math.floor((Date.now() - startTime) / 1000); // in seconds
        document.getElementById("score").textContent = `${score} out of ${questions.length}`;
        document.getElementById("timeTaken").textContent = `${totalTime} seconds`;

        // Save result to localStorage
        document.getElementById("saveResult").addEventListener("click", function () {
            const result = {
                score: score,
                timeTaken: totalTime,
                date: new Date().toLocaleString()
            };
            saveResult(result);
        });
    }

    // Save result to localStorage
    function saveResult(result) {
        let results = JSON.parse(localStorage.getItem("quizResults")) || [];
        results.push(result);
        localStorage.setItem("quizResults", JSON.stringify(results));
        alert("Result saved!");
    }

    // Shuffle array function for randomizing answers
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
