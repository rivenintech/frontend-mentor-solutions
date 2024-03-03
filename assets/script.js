// Fetch the JSON file with the challenges data
const fetchChallenges = async () => {
    try {
        const response = await fetch("challenges.json");
        const challengesData = await response.json();
        return challengesData;
    } catch (error) {
        console.error("Error fetching JSON file:", error);
        return [];
    }
};

// Function to sort the challenges by difficulty
const sortByDifficulty = (challenges, descending = false) => {
    return challenges.slice().sort((a, b) => (descending ? b.difficulty - a.difficulty : a.difficulty - b.difficulty));
};

// Function to create the challenge cards
const createChallengeCards = (challenges) => {
    if (!challenges || challenges.length === 0) return;

    const contentContainer = document.querySelector("#content");
    contentContainer.innerHTML = "";

    for (const challenge of challenges) {
        const { title, difficulty, tags, url, image, datetime } = challenge;

        const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= difficulty)
            .map(
                (filled) => `
                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 22 20" class="w-4 h-4 mr-1 ${filled ? "text-yellow-300" : "text-gray-300"}">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
                </svg>
              `
            )
            .join("");

        const tagsHTML = tags.map((tag) => `<span class="rounded-full px-3 py-1 mr-2 ${tag}">#${tag}</span>`).join("");

        const elementHTML = `
            <div class="rounded shadow-lg shadow-blue-500/10 fade-in" style="opacity: 0;">
                <img src="${image}" alt="challenge preview image" class="h-72 object-cover m-auto">
                <div class="px-6 py-4">
                    <p class="text-sm text-gray-500">${getTimeAgo(datetime)}</p>
                    <h2 class="font-bold text-xl">${title}</h2>
                    <div class="flex items-center py-1">
                        <p class="text-sm font-medium text-gray-500">Difficulty:&nbsp;</p>
                        ${stars}
                    </div>
                    <div class="flex flex-col items-center py-3">
                        <a href="${url}" class="rounded-lg border-2 border-blue-500 py-1 font-semibold hover:bg-blue-500 hover:text-white duration-300 w-full text-center">Live Solution</a>
                        <button data-challenge="${url}" class="rounded-lg border-2 border-gray-300 py-1 hover:bg-gray-300 hover:text-white duration-300 w-full text-center mt-2">Challenge Details</button>
                    </div>
                    <div class="text-sm font-semibold text-neutral-600 py-1">
                        ${tagsHTML}
                    </div>
                </div>
            </div>
        `;

        contentContainer.innerHTML += elementHTML;
    }
};

// Function to apply a fade-in effect to the challenge cards
const applyFadeInEffect = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const elements = document.querySelectorAll(".fade-in");
            elements.forEach((el, index) => {
                el.style.transitionDelay = `${index * 0.1}s`;
                el.style.opacity = 1;
            });
            resolve();
        }, 100);
    });
};

// Function to load and display the challenges
const loadAndDisplayChallenges = async (descending = false, sortButton = null) => {
    const challenges = await fetchChallenges();

    if (sortButton) {
        document.querySelector(".active").classList.remove("active");
        sortButton.classList.add("active");
    }

    const sortedChallenges = sortByDifficulty(challenges, descending);
    createChallengeCards(sortedChallenges);

    // Apply the fade-in effect after the cards are created
    await applyFadeInEffect();
};

const setupChallengeInfoModals = () => {
    const modal = document.querySelector("#infoModal");
    const modalIframe = modal.querySelector("iframe");

    // Add event listeners to the challenge cards
    document.querySelector("#content").addEventListener("click", (event) => {
        // Check if the clicked element is a challenge details button
        if (event.target.matches("[data-challenge]")) {
            const challenge = event.target.dataset.challenge;
            modalIframe.src = `info/${challenge}`;

            modal.classList.add("open");
        }
    });

    // Add event listener to the modal to close it
    modal.addEventListener("click", (event) => {
        // Check if the clicked element is the modal itself or the exit button
        if (event.target.matches(".modal-exit")) {
            modal.classList.remove("open");
        }
    });
};

// Function to get the time ago from a date
function getTimeAgo(date) {
    const MINUTE = 60,
        HOUR = 3600,
        DAY = 86400,
        WEEK = 6048e2;

    const secondsAgo = Math.round((Date.now() - Date.parse(date)) / 1e3);

    if (secondsAgo < MINUTE) {
        return "Added just now";
    }

    let timeUnit, timeDivisor;

    if (secondsAgo < HOUR) {
        timeUnit = "minute";
        timeDivisor = MINUTE;
    } else if (secondsAgo < DAY) {
        timeUnit = "hour";
        timeDivisor = HOUR;
    } else if (secondsAgo < WEEK) {
        timeUnit = "day";
        timeDivisor = DAY;
    } else {
        return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    const count = Math.floor(secondsAgo / timeDivisor);
    return `Added ${count} ${timeUnit}${count !== 1 ? "s" : ""} ago`;
}

// Add event listener to the document to load the challenges and create the dynamic elements
document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners to the sort buttons
    document.querySelector("#sort-easy").addEventListener("click", (event) => loadAndDisplayChallenges(false, event.currentTarget));
    document.querySelector("#sort-hard").addEventListener("click", (event) => loadAndDisplayChallenges(true, event.currentTarget));

    loadAndDisplayChallenges();
    setupChallengeInfoModals();
});
