import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      variants: {
        display: ["group-hover"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        TechStopWhite: "#FFFFFF",
        TechStopBlue: "#022750",
        TechStopBlue60: "#02275099",
        TechStopBlue40: "#02275066",
        TechStopBlue10: "#0227501A",
        TechStopBronze: "#CC7E00",
        TechStopBronze20: "rgba(204, 126, 0, 0.2)",
        TechStopRed: "#B10F2E",
        DisabledBackground: "#0000001F",
        DisabledBackgroundText: "#00000061",
        TechStopGreen: '#06AD03',

        deWiseMain: "#04C2C2",
        deWiseMainHover: "#04c2c21a",
        deWiseBlack: "#262626",
        deWiseGray: "#ffffffde",
        deWiseRed: "#FE0202",
        textBlack: "#000000DE",
        deWiseGrey: "rgba(0, 0, 0, 0.12)",
        deWiseGreyLight: "rgba(0, 0, 0, 0.38)",
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
        "14px",
        {
          lineHeight: "21px",
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
      Headline6: [
        "20px",
        {
          lineHeight: "32px",
          letterSpacing: "0em",
          fontWeight: "500",
        },
      ],
      Headline5: [
        "24px",
        {
          lineHeight: "32px",
          letterSpacing: "0em",
          fontWeight: "400",
        },
      ],
      Headline4: [
        "34px",
        {
          lineHeight: "42px",
          letterSpacing: "0.25px",
          fontWeight: "400",
        },
      ],
      Headline3: [
        "48px",
        {
          lineHeight: "56px",
          letterSpacing: "0em",
          fontWeight: "400",
        },
      ],
      Headline2: [
        "60px",
        {
          lineHeight: "120%",
          letterSpacing: "-0.5px",
          fontWeight: "500",
        },
      ],
      Headline1: [
        "162px",
        {
          lineHeight: "120%",
          letterSpacing: "-0.5px",
          fontWeight: "500",
        },
      ],
      body1: [
        "16px",
        {
          lineHeight: "24px",
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
      subtitle2: [
        "14px",
        {
          lineHeight: "22px",
          letterSpacing: "0.1px",
          fontWeight: "500",
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
