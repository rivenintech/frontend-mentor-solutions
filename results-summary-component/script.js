const colors = [
    { bg: "bg-light-red/5", text: "text-light-red" },
    { bg: "bg-orangey-yellow/5", text: "text-orangey-yellow" },
    { bg: "bg-green-teal/5", text: "text-green-teal" },
    { bg: "bg-cobalt-blue/5", text: "text-cobalt-blue" },
];

// Get the data from data.json
fetch("./data.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let score = 0;
        // Loop through data.json and create the elements dynamically
        for (let i = 0; i < data.length; i++) {
            const div = document.createElement("div");
            div.classList.add("flex", "justify-between", colors[i].bg, "rounded-lg", "p-4", "gap-16");

            const innerDiv = document.createElement("div");
            innerDiv.classList.add("flex", "gap-3");

            const img = document.createElement("img");
            img.src = data[i].icon;
            img.alt = "icon";

            const p = document.createElement("p");
            p.classList.add(colors[i].text, "font-semibold");
            p.textContent = data[i].category;

            innerDiv.appendChild(img);
            innerDiv.appendChild(p);

            const p2 = document.createElement("p");
            p2.classList.add("text-dark-grayblue", "font-bold");
            p2.textContent = `${data[i].score} `;

            const span = document.createElement("span");
            span.classList.add("text-neutral-400");
            span.textContent = "/ 100";

            p2.appendChild(span);

            div.appendChild(innerDiv);
            div.appendChild(p2);

            document.querySelector("#content").appendChild(div);
            score += data[i].score;
        }
        // Calculate the average score
        document.querySelector("#score").textContent = Math.trunc(score / data.length);
    });
