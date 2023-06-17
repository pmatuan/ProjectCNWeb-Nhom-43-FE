/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        b1: "url('http://localhost:5173/src/assets/B1.jpeg')",
      },
    },
  },
  plugins: [],
});
