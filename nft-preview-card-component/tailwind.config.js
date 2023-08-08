/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html"],
    theme: {
        extend: {
            colors: {
                // Primary colors
                "soft-blue": "hsl(215, 29%, 70%)",
                cyan: "hsl(178, 100%, 50%)",
                // Neutral colors
                "blue-main-bg": "hsl(217, 54%, 11%)",
                "blue-card-bg": "hsl(216, 50%, 16%)",
                "blue-line": "hsl(215, 32%, 27%)",
            },
        },
    },
    plugins: [],
};
