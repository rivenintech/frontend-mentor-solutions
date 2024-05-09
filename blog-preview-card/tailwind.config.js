/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html"],
    theme: {
        extend: {
            colors: {
                black: "hsl(0, 0%, 7%)",
                grey: "hsl(0, 0%, 50%)",
                yellow: "hsl(47, 88%, 63%)",
            },
        },
    },
    plugins: [],
};
