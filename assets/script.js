// Function to fetch the JSON file
async function fetchJSON() {
    try {
        const response = await fetch("content.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching JSON file:", error);
        return null;
    }
}

// Function to sort the data array by difficulty
function sortByDifficulty(data, descending = false) {
    return data.slice().sort((a, b) => (descending ? b.difficulty - a.difficulty : a.difficulty - b.difficulty));
}

// Function to create the HTML element dynamically
function createDynamicElement(data) {
    if (!data || data.length === 0) return;

    const contentContainer = document.querySelector("#content");
    contentContainer.innerHTML = "";

    for (const item of data) {
        const { title, difficulty, tags, url, image } = item;

        const element = document.createElement("a");
        element.href = url;
        element.classList = "rounded shadow-lg shadow-blue-500/10 fade-in";

        const imageElement = document.createElement("img");
        imageElement.src = image;
        imageElement.alt = "test dsaf";
        imageElement.classList = "h-72 object-cover m-auto";

        const contentDiv = document.createElement("div");
        contentDiv.classList = "px-6 py-4";

        const heading = document.createElement("h2");
        heading.classList = "font-bold text-xl";
        heading.textContent = title;

        const difficultyDiv = document.createElement("div");
        difficultyDiv.classList = "flex items-center py-1";

        const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= difficulty);

        difficultyDiv.innerHTML = `
        <p class="text-sm font-medium text-gray-500">Difficulty:&nbsp;</p>
        ${stars
            .map(
                (filled) => `
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 22 20" class="w-4 h-4 mr-1 ${filled ? "text-yellow-300" : "text-gray-300"}">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
            </svg>
          `
            )
            .join("")}
      `;

        const tagsDiv = document.createElement("div");
        tagsDiv.classList = "text-sm font-semibold text-neutral-600 pt-5";

        tags.forEach((tag) => {
            const tagSpan = document.createElement("span");
            tagSpan.classList = `rounded-full px-3 py-1 mr-2 ${tag}`;
            tagSpan.textContent = `#${tag}`;
            tagsDiv.appendChild(tagSpan);
        });

        contentDiv.appendChild(heading);
        contentDiv.appendChild(difficultyDiv);
        contentDiv.appendChild(tagsDiv);

        element.appendChild(imageElement);
        element.appendChild(contentDiv);

        // Initially, set opacity to 0
        element.style.opacity = 0;
        contentContainer.appendChild(element);
    }
}

// Function to load the challenges
function loadChallenges(descending = false, btn = null) {
    fetchJSON().then((data) => {
        if (data) {
            if (btn) {
                document.querySelector(".active").classList.remove("active");
                btn.classList.add("active");
            }
            const sortedByEasy = sortByDifficulty(data, descending);
            createDynamicElement(sortedByEasy);

            // Use setTimeout to ensure elements are added to the DOM before applying the fade-in effect
            setTimeout(() => {
                const elements = document.querySelectorAll(".fade-in");
                elements.forEach((el, index) => {
                    el.style.transitionDelay = `${index * 0.1}s`;
                    el.style.opacity = 1;
                });
            }, 100); // You can adjust the delay (milliseconds) as needed
        }
    });
}

// // Initially, load the challenges and create the dynamic elements sorted by easiest
loadChallenges();
