//  Create the modal instance outside of the function
let difficultyModal = new bootstrap.Modal(document.getElementById("difficultyModal"));

let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedQuestions = [];
let timer;
let timeLeft = 10; // 10 seconds per question

//  Show the difficulty selection modal when the page loads
document.addEventListener("DOMContentLoaded", function () {
    difficultyModal.show(); // Show modal on page load
});

// Start the quiz when the user selects difficulty and clicks "Start"
function startQuiz() {
    let difficulty = document.getElementById("difficulty").value;
    selectedQuestions = questions[difficulty]; // Load questions based on difficulty

    currentQuestionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    document.getElementById("correctCount").textContent = "0";
    document.getElementById("wrongCount").textContent = "0";

    document.getElementById("quizContainer").style.display = "block"; // Show quiz

    //  Close the modal programmatically using the created instance
    difficultyModal.hide(); // Hide the modal after clicking Start Quiz

    loadQuestion(); // Load first question
}

// Load a question
function loadQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        endQuiz(); // End quiz if no more questions
        return;
    }

    let questionData = selectedQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous options

    questionData.options.forEach(option => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn", "btn-outline-primary", "m-2");
        button.onclick = function () { checkAnswer(option, questionData.answer); };
        optionsContainer.appendChild(button);
    });

    // Start timer
    timeLeft = 10;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

// Timer function (decreases every second)
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(timer);
        wrongCount++;
        document.getElementById("wrongCount").textContent = wrongCount;
        nextQuestion(); // Move to next question if time runs out
    }
}

// Check if the answer is correct
function checkAnswer(selectedOption, correctAnswer) {
    clearInterval(timer); // Stop timer

    if (selectedOption === correctAnswer) {
        correctCount++;
        document.getElementById("correctCount").textContent = correctCount;
    } else {
        wrongCount++;
        document.getElementById("wrongCount").textContent = wrongCount;
    }

    nextQuestion(); // Load next question
}

//  Load the next question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// End the quiz
function endQuiz() {
    alert(`Quiz Over! Correct: ${correctCount}, Wrong: ${wrongCount}`);
    restartQuiz(); // Restart quiz
}

//  Restart the quiz (resets everything and shows the modal)
function restartQuiz() {
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongCount = 0;

    document.getElementById("correctCount").textContent = "0";
    document.getElementById("wrongCount").textContent = "0";
    document.getElementById("quizContainer").style.display = "none"; // Hide quiz

    difficultyModal.show(); // Show difficulty selection modal again
}

//  Question bank categorized by difficulty
let questions = {
    easy: [
        { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        { question: "What color is the sky?", options: ["Blue", "Green", "Red"], answer: "Blue" }
    ],
    medium: [
        { question: "What is the capital of France?", options: ["London", "Paris", "Berlin"], answer: "Paris" },
        { question: "Which element has the symbol O?", options: ["Gold", "Oxygen", "Iron"], answer: "Oxygen" }
    ],
    hard: [
        { question: "What is the square root of 144?", options: ["10", "12", "14"], answer: "12" },
        { question: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo"], answer: "Newton" }
    ]
};
