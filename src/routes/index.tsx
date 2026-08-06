import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Compass,
  IndianRupee,
  MessagesSquare,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerAI — AI Career Guidance System for Students" },
      {
        name: "description",
        content:
          "Get an AI-generated career recommendation, learning roadmap, project ideas, free resources, salary range and interview tips in seconds.",
      },
      { property: "og:title", content: "CareerAI — AI Career Guidance System" },
      {
        property: "og:description",
        content:
          "Personalised AI career guidance: best career fit, roadmap, projects, resources, salary and interview tips.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: Target,
    title: "Best Career Match",
    text: "A clear, personalised career recommendation based on your profile.",
    color: "from-chart-1 to-chart-5",
  },
  {
    icon: Compass,
    title: "Learning Roadmap",
    text: "Phase-by-phase plan with durations and focus areas.",
    color: "from-chart-2 to-chart-3",
  },
  {
    icon: Rocket,
    title: "Project Ideas",
    text: "Portfolio projects that prove your skills to recruiters.",
    color: "from-chart-4 to-chart-1",
  },
  {
    icon: BookOpen,
    title: "Free Resources",
    text: "Curated free courses, docs and practice platforms.",
    color: "from-chart-3 to-chart-2",
  },
  {
    icon: IndianRupee,
    title: "Salary Range",
    text: "Realistic India and global pay expectations.",
    color: "from-chart-5 to-chart-4",
  },
  {
    icon: MessagesSquare,
    title: "Interview Tips",
    text: "Targeted preparation advice for your chosen role.",
    color: "from-chart-1 to-chart-2",
  },
];

function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-chart-1/20 blur-3xl" />
      <div className="pointer-events-none absolute top-60 -right-32 size-[26rem] rounded-full bg-chart-4/20 blur-3xl" />

      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center">
        <span className="inline-flex animate-in fade-in items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="size-3.5 text-chart-1" />
          Powered by Gemini AI
        </span>
        <h1 className="mt-6 animate-in fade-in text-4xl font-black tracking-tight duration-700 slide-in-from-bottom-4 sm:text-6xl">
          Discover the career you were
          <span className="bg-gradient-to-r from-chart-1 via-chart-4 to-chart-2 bg-clip-text text-transparent">
            {" "}
            built for
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl animate-in fade-in text-base text-muted-foreground duration-1000 sm:text-lg">
          Fill one short form and our AI career guidance system builds a complete plan — the right
          career, why it fits you, the skills to learn, a roadmap, projects, free resources, salary
          expectations and interview tips.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gap-2 shadow-lg transition-transform hover:scale-105">
            <Link to="/guidance">
              Get My Career Guidance <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/about">How it works</Link>
          </Button>
        </div>

        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4">
          {[
            { k: "8", v: "Guidance sections" },
            { k: "60s", v: "Average result time" },
            { k: "100%", v: "Free resources" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm backdrop-blur"
            >
              <dt className="bg-gradient-to-r from-chart-1 to-chart-4 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                {s.k}
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          What your AI report includes
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-primary-foreground shadow-md transition-transform group-hover:rotate-6`}
              >
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-border bg-gradient-to-br from-chart-1/10 via-card to-chart-4/10 p-10 text-center">
          <BriefcaseBusiness className="size-8 text-chart-1" />
          <h2 className="text-xl font-bold sm:text-2xl">Ready to plan your future?</h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Login, fill the career guidance form, and get your personalised AI report instantly.
          </p>
          <Button asChild className="gap-2">
            <Link to="/guidance">
              Start now <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
