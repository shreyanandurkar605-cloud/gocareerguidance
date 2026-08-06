import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound, Loader2, LogIn, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | CareerAI Career Guidance System" },
      {
        name: "description",
        content:
          "Sign in to CareerAI to generate your personalised AI career guidance report in seconds.",
      },
      { property: "og:title", content: "Login to CareerAI" },
      {
        property: "og:description",
        content: "Sign in and get your AI career recommendation, roadmap and interview tips.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      toast.error("Enter a valid email and a password of at least 4 characters.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      login(email, name);
      toast.success("Welcome to CareerAI!");
      navigate({ to: "/guidance" });
    }, 500);
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-14">
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-chart-1/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-chart-4/25 blur-3xl" />

      <div className="w-full max-w-md animate-in fade-in rounded-3xl border border-border bg-card/90 p-8 shadow-2xl backdrop-blur duration-500 slide-in-from-bottom-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-chart-1 to-chart-4 text-primary-foreground shadow-lg">
          <Sparkles className="size-6" />
        </span>
        <h1 className="mt-5 text-2xl font-black tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Login to generate your AI career guidance report.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aarav Sharma"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <KeyRound className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-9"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
              />
            </div>
          </div>
          <Button type="submit" className="w-full gap-2" disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
            {busy ? "Signing in…" : "Login"}
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Demo login for the project — any valid email works.{" "}
          <Link to="/about" className="underline hover:text-foreground">
            Learn more
          </Link>
        </p>
      </div>
    </div>
  );
}
