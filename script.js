async function loadArticles() {
    const response = await fetch("articles.json");

    if (!response.ok) {
        throw new Error("Could not load article list.");
    }

    return await response.json();
}


async function search() {
    const query = document.getElementById("search").value.trim().toLowerCase();

    if (query === "") {
        alert("Please enter something to search for.");
        return;
    }

    try {
        const articles = await loadArticles();

        const matches = articles.filter(article =>
            article.file.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            document.getElementById("content").innerHTML =
                "<h2>No results found.</h2>";
            return;
        }

        let resultsHTML = "<h2>Search Results</h2>";

        matches.forEach(article => {
            const title = article.file.replace(".md", "");

            resultsHTML += `
                <button onclick="openArticle('${article.file}')">
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


// Browse menu
async function toggleBrowse() {
    const menu = document.getElementById("browse-menu");

    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
        await loadBrowseMenu();
    } else {
        menu.style.display = "none";
    }
}


// Build the Browse menu
async function loadBrowseMenu() {
    const menu = document.getElementById("browse-menu");

    try {
        const articles = await loadArticles();

        const topics = {};

        articles.forEach(article => {
            if (!topics[article.topic]) {
                topics[article.topic] = [];
            }

            topics[article.topic].push(article);
        });

        let html = "";

        Object.keys(topics).sort().forEach(topic => {
            html += `<details>`;
            html += `<summary>${topic}</summary>`;

            const topicArticles = topics[topic].sort((a, b) =>
                a.file.localeCompare(b.file)
            );

            let currentLetter = "";

            topicArticles.forEach(article => {
                const title = article.file.replace(".md", "");
                const firstLetter = title.charAt(0).toUpperCase();

                if (firstLetter !== currentLetter) {
                    currentLetter = firstLetter;
                    html += `<strong>${currentLetter}</strong>`;
                }

                html += `
                    <button onclick="openArticle('${article.file}')">
                        ${title}
                    </button>
                `;
            });

            html += `</details>`;
        });

        menu.innerHTML = html;

    } catch (error) {
        menu.innerHTML = "<p>Could not load browse menu.</p>";
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


// Show the missing page report form
function showMissingPageReport() {
    document.getElementById("missing-page-report").style.display = "block";
}


// Hide the missing page report form
function hideMissingPageReport() {
    document.getElementById("missing-page-report").style.display = "none";
}


// Submit the missing page report
function submitMissingPageReport() {
    const page = document.getElementById("missing-page").value.trim();
    const details = document.getElementById("missing-details").value.trim();
    const sources = document.getElementById("missing-sources").value.trim();

    if (page === "") {
        alert("Please tell us what page or article you're looking for.");
        return;
    }

    const subject = encodeURIComponent("Wikitoo Missing Page Report");

    const body = encodeURIComponent(
        "Wikitoo Missing Page Report\n\n" +
        "Page/article requested:\n" +
        page + "\n\n" +
        "Anything else:\n" +
        (details || "Not specified") + "\n\n" +
        "Sources you'd like to see:\n" +
        (sources || "Not specified")
    );

    window.location.href =
        "mailto:gorillaznumberonefan@icloud.com?subject=" +
        subject +
        "&body=" +
        body;
}


// Language menu test
function toggleLanguage() {
    alert("Language button works!");
}


// Select a language
function selectLanguage(language) {
    alert("Language selected: " + language);
}


// Pressing Enter in the search box searches
document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        search();
    }
});