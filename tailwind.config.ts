// Daisi UI theme
export const theme = {
  "primary": "hsl(180 100% 10%)",
  "secondary": "hsl(0 39% 39%)",
  "accent": "hsl(150 100% 50%)",
  "neutral": "hsl(0 0% 20%)",
  "base-100": "hsl(0 0% 100%)",
  "success": "hsl(150 62% 95%)",
  "warning": "hsl(43 100% 95%)",
  "error": "hsl(9 100% 95%)",
  "info": "hsl(220 100% 97%)",
};

export default {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      fontSize: {
        "heading-1": ["56px", "67.2px"],
        "heading-2": ["40px", "42px"],
        "heading-desktop-2": ["48px", "48px"],
        "heading-3": ["16px", "26px"],
        "heading-desktop-3": ["20px", "24px"],
        "menu": ["16px", "20px"],
        "button": ["14px", "18px"],
        "body": ["16px", "20px"],
        "caption-desktop": ["14px", "16px"],
        "caption": ["12px", "14px"],
        "list-price-desktop": ["14px", "16px"],
        "list-price": ["12px", "14px"],
      },
      fontWeight: {
        "heading-1": "700",
        "heading-2": "700",
        "heading-3": "700",
        "menu": "400",
        "button": "700",
        "body": "400",
        "caption": "400",
        "list-price": "400",
      },
      spacing: {
        "21": "5.125rem", // 81
        "75": "18.75rem", // 300
      },
      animation: {
        "slide-left": "slide-left-frame 0.4s ease normal",
        "slide-right": "slide-right-frame 0.4s ease normal",
        "slide-bottom": "slide-bottom-frame 0.4s ease normal",
        "progress": "progress-frame ease normal",
      },
      ShadowRoot: {
        "sm": "0 5px 7px rgba(0,0,0,.2)",
      },
      keyframes: {
        "slide-left-frame": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right-frame": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-bottom-frame": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "progress-frame": {
          from: {
            "--dot-progress": "0%",
          },
          to: {
            "--dot-progress": "100%",
          },
        },
      },
    },
    boxShadow: {
      sm: "0px 1px 3px 0px #00000014",
      default: "0px 1px 4px 0px #0000001F",
      md: "0px 1px 5px 0px #00000024",
      lg: "0px 4px 10px 0px #0000001F",
    },
    fontFamily: {
      title: ["Century Gothic", "Montserrat", "sans-serif"],
      sans: ["Montserrat", "sans-serif"],
      serif: ["inherit", "serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
};
