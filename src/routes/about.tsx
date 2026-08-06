import { createFileRoute } from "@tanstack/react-router";
import { Cpu, GraduationCap, ListChecks, ShieldCheck, Sparkles, Workflow } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the AI Career Guidance System | CareerAI" },
      {
        name: "description",
        content:
          "How the CareerAI final-year project works: React, TypeScript, Tailwind CSS and Gemini AI turn a student profile into a full career plan.",
      },
      { property: "og:title", content: "About CareerAI — AI Career Guidance System" },
      {
        property: "og:description",
        content:
          "Project overview, technology stack and workflow of the AI Career Guidance System.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const steps = [
  {
    icon: ListChecks,
    title: "1. Collect the profile",
    text: "The guidance form captures name, age, qualification, skills, interests and dream job.",
  },
  {
    icon: Cpu,
    title: "2. Ask the AI",
    text: "A secure server function sends the profile to Gemini AI with a structured prompt.",
  },
  {
    icon: Workflow,
    title: "3. Structure the answer",
    text: "The JSON response is validated and mapped into eight guidance sections.",
  },
  {
    icon: Sparkles,
    title: "4. Present the report",
    text: "An animated, colorful dashboard renders the recommendation with light and dark themes.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
        <GraduationCap className="size-3.5 text-chart-2" /> Final year project
      </span>
      <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
        About the{" "}
        <span className="bg-gradient-to-r from-chart-2 to-chart-1 bg-clip-text text-transparent">
          AI Career Guidance System
        </span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        Students often know their skills and interests but not the career path that connects them.
        This project uses generative AI to convert a simple profile into a complete, actionable
        career plan — recommendation, reasoning, required skills, a phased roadmap, portfolio
        projects, free learning resources, salary expectations and interview preparation tips.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {steps.map((s) => (
          <article
            key={s.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-chart-2 to-chart-4 text-primary-foreground shadow">
              <s.icon className="size-5" />
            </span>
            <h2 className="mt-4 font-semibold">{s.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold">Technology stack</h2>
        <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {[
            "React 19 + TypeScript",
            "Tailwind CSS design tokens",
            "TanStack Router + server functions",
            "Gemini AI (google/gemini-3.6-flash)",
            "Lucide icons + CSS animations",
            "Light / dark theme support",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-chart-2" /> {t}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-muted-foreground">
          The AI key never reaches the browser — every model call runs on the server, so the app is
          deployment ready as-is.
        </p>
      </section>
    </div>
  );
}
