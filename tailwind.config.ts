import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "ubuntu-bold": ["Ubuntu-Bold", "sans-serif"],
        "ubuntu-medium": ["Ubuntu-Medium", "sans-serif"],
        "ubuntu-regular": ["Ubuntu-Regular", "sans-serif"],
      },
      backgroundImage: {
        desktop: "url('/images/bg-sidebar-desktop.svg')",
        mobile: "url('/images/bg-sidebar-mobile.svg')",
      },
      colors: {
        primary: {
          marineBlue: "hsl(213, 96%, 18%)",
          purplishBlue: "hsl(243, 100%, 62%)",
          pastelBlue: "hsl(228, 100%, 84%)",
          lightBlue: "hsl(206, 94%, 87%)",
          strawberryRed: "hsl(354, 84%, 57%)",
        },
        neutral: {
          coolGray: "hsl(231, 11%, 63%)",
          lightGray: "hsl(229, 24%, 87%)",
          magnolia: "hsl(217, 100%, 97%)",
          alabaster: "hsl(231, 100%, 99%)",
          white: "hsl(0, 0%, 100%)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
