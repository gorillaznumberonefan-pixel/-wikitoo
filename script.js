function search() {
    const query = document.getElementById("search").value;

    if (query.trim() === "") {
        alert("Please enter something to search for.");
        return;
    }

    alert("You searched for: " + query);
}
