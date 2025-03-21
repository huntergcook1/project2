document.addEventListener("DOMContentLoaded", function () {
    // Display previous quiz results
    const resultsContainer = document.getElementById("resultsContainer");
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];

    if (results.length > 0) {
        results.forEach(result => {
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("result-item", "mb-3");
            resultDiv.innerHTML = `
                <p>Date: ${result.date}</p>
                <p>Score: ${result.score} out of ${result.totalQuestions}</p>
                <p>Time Taken: ${result.timeTaken} seconds</p>
                <p>Category: ${result.category} | Difficulty: ${result.difficulty}</p>
            `;
            resultsContainer.appendChild(resultDiv);
        });
    } else {
        resultsContainer.innerHTML = "<p>No results available.</p>";
    }

    // General stats
    const totalGames = results.length;
    const totalScore = results.reduce((acc, result) => acc + result.score, 0);
    const avgScore = totalGames > 0 ? (totalScore / totalGames).toFixed(2) : 0;
    const fastestTime = results.reduce((acc, result) => {
        return result.timeTaken < acc ? result.timeTaken : acc;
    }, Infinity);

    document.getElementById("totalGames").textContent = `Total Games Played: ${totalGames}`;
    document.getElementById("avgScore").textContent = `Average Score: ${avgScore}`;
    document.getElementById("fastestTime").textContent = `Fastest Completion Time: ${fastestTime} seconds`;

    // Return to Setup Button
    document.getElementById("returnToSetup").addEventListener("click", function () {
        window.location.href = "login.html"; // Redirect to login.html
    });
});
