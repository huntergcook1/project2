document.addEventListener("DOMContentLoaded", function () {
    // Retrieve quiz results from localStorage
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];
    const gameList = document.getElementById("gameList");

    // If results exist, display them in the table
    if (results.length > 0) {
        results.forEach(result => {
            const row = document.createElement("tr");

            // Create table data for each field
            const dateCell = document.createElement("td");
            dateCell.textContent = result.date;
            row.appendChild(dateCell);

            const scoreCell = document.createElement("td");
            scoreCell.textContent = `${result.score} out of ${result.totalQuestions}`;
            row.appendChild(scoreCell);

            const timeCell = document.createElement("td");
            timeCell.textContent = `${result.timeTaken} seconds`;
            row.appendChild(timeCell);

            const categoryCell = document.createElement("td");
            categoryCell.textContent = result.category;
            row.appendChild(categoryCell);

            const difficultyCell = document.createElement("td");
            difficultyCell.textContent = result.difficulty;
            row.appendChild(difficultyCell);

            // Append the row to the table
            gameList.appendChild(row);
        });
    } else {
        gameList.innerHTML = "<tr><td colspan='5'>No results available.</td></tr>";
    }

    // General stats calculation
    const totalGames = results.length;
    const totalScore = results.reduce((acc, result) => acc + result.score, 0);
    const avgScore = totalGames > 0 ? (totalScore / totalGames).toFixed(2) : 0;
    const fastestTime = results.reduce((acc, result) => {
        return result.timeTaken < acc ? result.timeTaken : acc;
    }, Infinity);

    document.getElementById("totalGames").textContent = `Total Games Played: ${totalGames}`;
    document.getElementById("averageScore").textContent = `Average Score: ${avgScore}`;
    document.getElementById("fastestTime").textContent = `Fastest Completion Time: ${fastestTime} seconds`;

    // Event listener for the Return to Setup button
    document.getElementById("returnToSetup").addEventListener("click", function () {
        window.location.href = "login.html"; // Redirect to login.html
    });
});
