document.addEventListener("DOMContentLoaded", function () {
    // Remove the h1 element from layout (I manually add h1 in the markdown file)
    document.querySelector("h1").remove();

    // Add target="_top" to all absolute URLs
    var links = document.links;
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
        if (links[i].hostname != window.location.hostname) {
            links[i].target = "_top";
        }
    }
});
