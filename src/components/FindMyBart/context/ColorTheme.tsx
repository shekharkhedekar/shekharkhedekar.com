import React, { useContext, createContext, useEffect, useState } from "react";

export type ColorTheme = {
  backgroundColorPrimary: string;
  borderColorPrimary: string;
  textColorPrimary: string;
  textColorSecondary: string;
  textColorSuccess: string;
  textLinkPrimary: string;
  boxShadow: string;
  boxShadowNoTop: string;
};

const THEMES: { LIGHT: ColorTheme; DARK: ColorTheme } = {
  LIGHT: {
    backgroundColorPrimary: "#FFF",
    borderColorPrimary: "#CCC",
    textColorPrimary: "#333",
    textColorSecondary: "#888",
    textColorSuccess: "green",
    textLinkPrimary: "#7070ff",
    boxShadow: "0 0 15px rgba(0,0,0,.3)",
    boxShadowNoTop: "0 15px 15px rgba(0,0,0,.3)",
  },
  DARK: {
    backgroundColorPrimary: "#222",
    borderColorPrimary: "#555",
    textColorPrimary: "#DDD",
    textColorSecondary: "#999",
    textColorSuccess: "#01a701",
    textLinkPrimary: "#a1a1ff",
    boxShadow: "0 0 15px rgba(0,0,0,.6)",
    boxShadowNoTop: "0 15px 15px rgba(0,0,0,.6)",
  },
};

export interface ColorThemeContextType {
  darkModeEnabled: boolean;
  theme: ColorTheme;
}

const ColorThemeContext = createContext<ColorThemeContextType>({
  darkModeEnabled: false,
  theme: THEMES.LIGHT,
});

export const useColorThemeContext = () => useContext(ColorThemeContext);

export const ColorThemeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const onMatchChange = (matches: boolean) => {
    if (matches) {
      setDarkModeEnabled(true);
      setTheme(THEMES.DARK);
    } else {
      setTheme(THEMES.LIGHT);
    }
  };

  useEffect(() => {
    onMatchChange(window.matchMedia("(prefers-color-scheme: dark)")?.matches);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      ?.addEventListener("change", (event) => {
        onMatchChange(event.matches);
      });
  }, []);

  return (
    <ColorThemeContext.Provider value={{ darkModeEnabled, theme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};
