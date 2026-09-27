async function search() {
    const query = document.getElementById("search").value.trim().toLowerCase();

    if (query === "") {
        alert("Please enter something to search for.");
        return;
    }

    try {
        const response = await fetch("articles.json");

        if (!response.ok) {
            alert("Could not load article list.");
            return;
        }

        const articles = await response.json();

        const matches = articles.filter(fileName =>
            fileName.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            document.getElementById("content").innerHTML =
                "<h2>No results found.</h2>";
            return;
        }

        let resultsHTML = "<h2>Search Results</h2>";

        matches.forEach(fileName => {
            const title = fileName.replace(".md", "");

            resultsHTML += `
                <button onclick="openArticle('${fileName}')">
                    ${title}
                </button>
            `;
        });

        document.getElementById("content").innerHTML = resultsHTML;

    } catch (error) {
        alert("Something went wrong while searching.");
    }
}


async function openArticle(fileName) {
    try {
        const response = await fetch(fileName);

        if (!response.ok) {
            alert("Page not found.");
            return;
        }

        const text = await response.text();

        document.getElementById("content").innerHTML = marked.parse(text);

    } catch (error) {
        alert("Something went wrong while opening the article.");
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


// Show the bug report form
function showBugReport() {
    document.getElementById("bug-report").style.display = "block";
}


// Hide the bug report form
function hideBugReport() {
    document.getElementById("bug-report").style.display = "none";
}


// Submit the bug report
function submitBugReport() {
    const page = document.getElementById("bug-page").value.trim();
    const description = document.getElementById("bug-description").value.trim();
    const expected = document.getElementById("bug-expected").value.trim();

    if (description === "") {
        alert("Please describe the bug.");
        return;
    }

    const subject = encodeURIComponent("Wikitoo Bug Report");

    const body = encodeURIComponent(
        "Wikitoo Bug Report\n\n" +
        "Page: " + (page || "Not specified") + "\n\n" +
        "What went wrong:\n" +
        description + "\n\n" +
        "What I expected:\n" +
        (expected || "Not specified")
    );

    window.location.href =
        "mailto:gorillaznumberonefan@icloud.com?subject=" +
        subject +
        "&body=" +
        body;
}


// Pressing Enter in the search box searches
document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        search();
    }
});
