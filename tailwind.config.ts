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
      },
    },
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "150%",
          letterSpacing: "0.15px",
          fontWeight: "400",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "150%",
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
      xl: "1.25rem",
      Headline5: [
        "1.5rem",
        {
          lineHeight: "32px",
          letterSpacing: "0em",
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