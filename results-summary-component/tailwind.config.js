/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            colors: {
                // Neutral colors
                "pale-blue": "hsla(221, 100%, 96%, 0.4)",
                "light-lavender": "hsla(241, 100%, 89%, 0.95)",
                "dark-grayblue": "hsl(224, 30%, 27%)",
                // Primary colors
                "light-red": "hsl(0, 100%, 67%)",
                "orangey-yellow": "hsl(39, 100%, 56%)",
                "green-teal": "hsl(166, 100%, 37%)",
                "cobalt-blue": "hsl(234, 85%, 45%)",
                // Gradient colors
                "light-slate-blue": "hsl(251, 100%, 64%)",
                "light-royal-blue": "hsl(241, 81%, 54%)",
                "violet-blue": "hsla(254, 72%, 46%, 1)",
                "persian-blue": "hsla(241, 72%, 46%, 0)",
            },
        },
    },
    // Add classes that are loaded dynamically
    safelist: [
        "bg-light-red",
        "text-light-red",
        "bg-orangey-yellow",
        "text-orangey-yellow",
        "bg-green-teal",
        "text-green-teal",
        "bg-cobalt-blue",
        "text-cobalt-blue",
    ],
    plugins: [],
};
