import { Link } from "@tanstack/react-router";
import { Brain, LogOut, Moon, Sun } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/guidance", label: "Career Guidance" },
] as const;

export function NavBar() {
  const { user, logout, theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-4 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <Brain className="size-5" />
          </span>
          <span className="text-base font-extrabold tracking-tight">
            Career<span className="text-chart-1">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-secondary text-foreground" }}
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              {l.label}
            </Link>
          ))}

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {user ? (
            <Button variant="outline" size="sm" onClick={logout} className="gap-1">
              <LogOut className="size-4" />
              <span className="hidden sm:inline">{user.name}</span>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
