import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#000000",
        lightBg: "#F4F4F4",
        lightText: "#333333",
        borderClr: "#C1C1C1",
        darkBg: "#CCCCCC",
      },
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
        mobile: { max: "540px" },
      },
    },
  },
  plugins: [],
} satisfies Config;
