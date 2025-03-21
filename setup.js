document.addEventListener("DOMContentLoaded", function () {
    fetchCategories();

    document.getElementById("setupForm").addEventListener("submit", function (event) {
        event.preventDefault();
        saveSettings();
    });
});

// Fetch trivia categories from API
function fetchCategories() {
    fetch("https://opentdb.com/api_category.php")
        .then(response => response.json())
        .then(data => {
            let categorySelect = document.getElementById("category");
            data.trivia_categories.forEach(category => {
                let option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching categories:", error));
}

// Save settings and move to trivia game
function saveSettings() {
    let settings = {
        category: document.getElementById("category").value,
        difficulty: document.getElementById("difficulty").value,
        type: document.getElementById("questionType").value,
        amount: document.getElementById("numQuestions").value
    };

    localStorage.setItem("triviaSettings", JSON.stringify(settings));
    window.location.href = "quiz.html"; // Redirect to quiz page
}
