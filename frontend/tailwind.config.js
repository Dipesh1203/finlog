/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Include your app files
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./_layout.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",

    // NativeWind package
    "./node_modules/nativewind/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
