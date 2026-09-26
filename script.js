function search() {
    const query = document.getElementById("search").value;

    if (query.trim() === "") {
        alert("Please enter something to search for.");
        return;
    }

    alert("You searched for: " + query);
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    const button = document.getElementById("theme-toggle");

    if (document.body.classList.contains("dark")) {
        button.textContent = "☀️ Light Mode";
    } else {
        button.textContent = "🌙 Dark Mode";
    }
}
