import { createContext, useState, useEffect } from "react";

interface IThemeContext {
  setTheme: (theme: string) => void;
  theme: string;
}

type Props = {
  initialTheme?: string;
  children?: React.ReactNode;
};

const defaultValues = {
  setTheme: () => {},
  theme: "",
};

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  return "dark"; // dark theme as the default;
};

export const ThemeContext = createContext<IThemeContext>(defaultValues);
export const ThemeProvider = ({ initialTheme, children }: Props) => {
  const [theme, setTheme] = useState<string>(getInitialTheme);

  const setUITheme = (UITheme: string) => {
    const root = window.document.documentElement;
    const isDark = UITheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(UITheme);

    localStorage.setItem("color-theme", UITheme);
  };

  if (initialTheme) {
    setUITheme(initialTheme);
  }

  useEffect(() => {
    setUITheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
