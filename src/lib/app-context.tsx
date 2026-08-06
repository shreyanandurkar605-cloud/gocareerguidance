import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type User = { name: string; email: string };

type AppState = {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const AppContext = createContext<AppState | null>(null);

const USER_KEY = "acgs-user";
const THEME_KEY = "acgs-theme";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
      const t = localStorage.getItem(THEME_KEY);
      if (t === "light" || t === "dark") setTheme(t);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const login = useCallback((email: string, name?: string) => {
    const next: User = { email, name: name?.trim() || email.split("@")[0] };
    setUser(next);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const value = useMemo(
    () => ({ user, login, logout, theme, toggleTheme }),
    [user, login, logout, theme, toggleTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
