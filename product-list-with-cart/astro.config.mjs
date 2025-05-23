import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
    site: isProd ? "https://rivenintech.github.io" : "https://localhost:4321",
    base: isProd ? "/product-list-with-cart" : "/",
    integrations: [react()],
    vite: { plugins: [tailwindcss()] },
    // Avoid Jekyll excluding Astro default folder (_astro)
    build: {
        assets: "astro",
    },
});
