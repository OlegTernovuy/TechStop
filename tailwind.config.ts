import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      variants: {
        display:['group-hover']
       },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        deWiseMain: "#04C2C2",
        deWiseMainHover: "#04c2c21a",
        deWiseBlack: "#262626",
        deWiseGray: "#ffffffde",
        deWiseRed: "#FE0202",
        textBlack: "#000000DE",
        deWiseGrey: "rgba(0, 0, 0, 0.12)",
        deWiseGreyLight: "rgba(0, 0, 0, 0.38)"
      },
    },
    fontSize: {
      xs: [
        "10px",
        {
          lineHeight: "15px",
          letterSpacing: "0.15px",
          fontWeight: "400",
        },
      ],
      sm: [
        "12px",
        {
          lineHeight: "18px",
          letterSpacing: "0.15px",
          fontWeight: "400",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "24px",
          letterSpacing: "0.15px",
          fontWeight: "400",
        },
      ],
      xl: [
        "1.2rem",
        {
          lineHeight: "28px",
          letterSpacing: "0.15px",
          fontWeight: "400",
        },
      ],
      Headline5: [
        "1.5rem",
        {
          lineHeight: "32px",
          letterSpacing: "0em",
          fontWeight: "400",
        },
      ],
      Headline4: [
        "2.125rem",
        {
          lineHeight: "1.235",
          letterSpacing: "0.00735em",
          fontWeight: "400",
        },
      ],
      Headline3: [
        "3rem",
        {
          lineHeight: "1.167rem",
          letterSpacing: "0em",
          fontWeight: "400",
        },
      ],
      body1: [
        "24px",
        {
          lineHeight: "36px",
          letterSpacing: "0.15px",
          fontWeight: "400",
        },
      ],
      subtitle1: [
        "16px",
        {
          lineHeight: "28px",
          letterSpacing: "0.15px",
          fontWeight: "400",
        },
      ],
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
export default config;
