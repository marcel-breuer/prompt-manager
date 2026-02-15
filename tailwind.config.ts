import type { Config } from "tailwindcss";

const config: Config = {
    future: {
        hoverOnlyWhenSupported: true,
        respectDefaultRingColorOpacity: true,
        disableColorOpacityUtilitiesByDefault: true
    },
    darkMode: "media",
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

};
export default config;