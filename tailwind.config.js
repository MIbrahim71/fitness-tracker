/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#232323",
        "bg-secondary": "#31363F",
        "header-color": "#76ABAE",
        "text-color": "#EEEEEE",
      },
    },
  },
  plugins: [],
};
