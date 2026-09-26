async function search() {
    const query = document.getElementById("search").value.trim();

    if (query === "") {
        alert("Please enter something to search for.");
        return;
    }

    const fileName = query.toLowerCase() + ".md";

    try {
        const response = await fetch(fileName);

        if (!response.ok) {
            alert("Page not found.");
            return;
        }

        const text = await response.text();

        document.getElementById("content").textContent = text;
    } catch (error) {
        alert("Something went wrong while searching.");
    }
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
