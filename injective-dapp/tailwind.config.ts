export default {
  content: ["./components/**/*.vue", "./pages/**/*.vue", "./layouts/*.vue"],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        "2xs": "375px",
        xs: "475px",
        sm: "640px",
        md: "768px",
        "2md": "800px",
        "3md": "840px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1366px",
        "3xl": "1440px",
        "4xl": "1681px",
      },

      fontSize: {
        xs: ["12px", "1rem"],
        sm: ["14px", "1.25rem"],
        base: ["16px", "1.5rem"],
        lg: ["18px", "1.75rem"],
        xl: ["20px", "1.75rem"],
        "2xl": ["24px", "2rem"],
        "3xl": ["30px", "2.25rem"],
        "4xl": ["36px", "2.5rem"],
        "3xs": "8px",
        "2xs": "10px",
        "4.5xl": "40px",
      },
    },

    colors: {
      current: "currentColor",
      white: "#fff",
      black: "#08090c",
      transparent: "transparent",
    },
  },
};
