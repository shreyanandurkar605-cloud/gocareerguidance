import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  BookOpen,
  BrainCircuit,
  ExternalLink,
  IndianRupee,
  ListChecks,
  Loader2,
  Lock,
  MessagesSquare,
  Rocket,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/lib/app-context";
import { generateGuidance, type GuidanceInput, type GuidanceResult } from "@/lib/career.functions";

export const Route = createFileRoute("/guidance")({
  head: () => ({
    meta: [
      { title: "Career Guidance Form | CareerAI" },
      {
        name: "description",
        content:
          "Share your skills, interests and dream job to get an AI career recommendation with roadmap, projects, resources, salary range and interview tips.",
      },
      { property: "og:title", content: "AI Career Guidance Form | CareerAI" },
      {
        property: "og:description",
        content: "Generate a complete AI career plan from your student profile in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidancePage,
});

const empty: GuidanceInput = {
  fullName: "",
  age: "",
  qualification: "",
  skills: "",
  interests: "",
  dreamJob: "",
};

function SectionCard({
  icon: Icon,
  title,
  gradient,
  children,
}: {
  icon: typeof Target;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <section className="animate-in fade-in rounded-2xl border border-border bg-card p-6 shadow-sm duration-500 slide-in-from-bottom-3">
      <div className="flex items-center gap-3">
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-primary-foreground shadow`}
        >
          <Icon className="size-5" />
        </span>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

function Report({ result }: { result: GuidanceResult }) {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-chart-1/15 via-card to-chart-4/15 p-8 shadow-lg">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase">
          <Trophy className="size-3.5 text-chart-5" /> Best career recommendation
        </span>
        <h2 className="mt-4 bg-gradient-to-r from-chart-1 to-chart-4 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
          {result.bestCareer}
        </h2>
      </div>

      <SectionCard icon={BrainCircuit} title="Why this career" gradient="from-chart-1 to-chart-5">
        <p className="leading-relaxed">{result.whyThisCareer}</p>
      </SectionCard>

      <SectionCard icon={ListChecks} title="Required skills" gradient="from-chart-2 to-chart-3">
        <div className="flex flex-wrap gap-2">
          {result.requiredSkills?.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={Target} title="Learning roadmap" gradient="from-chart-4 to-chart-1">
        <ol className="space-y-4">
          {result.learningRoadmap?.map((p, i) => (
            <li key={p.phase} className="relative border-l border-border pl-6">
              <span className="absolute -left-2.5 grid size-5 place-items-center rounded-full bg-chart-1 text-[10px] font-bold text-primary-foreground">
                {i + 1}
              </span>
              <p className="font-semibold text-foreground">
                {p.phase} <span className="text-xs text-muted-foreground">· {p.duration}</span>
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {p.focus?.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard icon={Rocket} title="Recommended projects" gradient="from-chart-3 to-chart-2">
        <div className="grid gap-3 sm:grid-cols-2">
          {result.recommendedProjects?.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-background/50 p-4">
              <p className="font-semibold text-foreground">{p.title}</p>
              <p className="mt-1">{p.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={BookOpen} title="Free learning resources" gradient="from-chart-2 to-chart-4">
        <ul className="space-y-2">
          {result.freeResources?.map((r) => (
            <li key={r.name} className="flex items-start gap-2">
              <ExternalLink className="mt-0.5 size-4 shrink-0 text-chart-2" />
              <span>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-foreground underline decoration-chart-2/60 hover:decoration-chart-2"
                >
                  {r.name}
                </a>{" "}
                — {r.note}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard icon={IndianRupee} title="Salary range" gradient="from-chart-5 to-chart-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-background/50 p-4">
            <p className="text-xs uppercase">India</p>
            <p className="mt-1 text-lg font-bold text-foreground">{result.salaryRange?.india}</p>
          </div>
          <div className="rounded-xl border border-border bg-background/50 p-4">
            <p className="text-xs uppercase">Global</p>
            <p className="mt-1 text-lg font-bold text-foreground">{result.salaryRange?.global}</p>
          </div>
        </div>
        {result.salaryRange?.note && <p className="mt-3 text-xs">{result.salaryRange.note}</p>}
      </SectionCard>

      <SectionCard icon={MessagesSquare} title="Interview tips" gradient="from-chart-1 to-chart-2">
        <ul className="list-disc space-y-1.5 pl-5">
          {result.interviewTips?.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </SectionCard>
    </div>
  );
}

function GuidancePage() {
  const { user } = useApp();
  const [form, setForm] = useState<GuidanceInput>(empty);
  const generate = useServerFn(generateGuidance);

  const mutation = useMutation({
    mutationFn: (data: GuidanceInput) => generate({ data }),
    onError: (err: Error) => toast.error(err.message || "Could not generate guidance."),
    onSuccess: () => toast.success("Your AI career report is ready!"),
  });

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-28 text-center">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-chart-1 to-chart-4 text-primary-foreground shadow-lg">
          <Lock className="size-6" />
        </span>
        <h1 className="text-2xl font-bold">Login required</h1>
        <p className="text-sm text-muted-foreground">
          Please sign in to access the career guidance form.
        </p>
        <Button asChild>
          <Link to="/login">Go to login</Link>
        </Button>
      </div>
    );
  }

  function set<K extends keyof GuidanceInput>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const missing = Object.values(form).some((v) => !v.trim());
    if (missing) {
      toast.error("Please fill in every field.");
      return;
    }
    mutation.mutate(form);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
        <Sparkles className="size-3.5 text-chart-1" /> Career guidance form
      </span>
      <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
        Tell us about{" "}
        <span className="bg-gradient-to-r from-chart-1 to-chart-4 bg-clip-text text-transparent">
          you
        </span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The more detail you give, the sharper your AI career plan will be.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Aarav Sharma"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              inputMode="numeric"
              value={form.age}
              onChange={(e) => set("age", e.target.value)}
              placeholder="21"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="qualification">Qualification</Label>
          <Input
            id="qualification"
            value={form.qualification}
            onChange={(e) => set("qualification", e.target.value)}
            placeholder="B.Tech Computer Science, final year"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="skills">Skills</Label>
          <Textarea
            id="skills"
            rows={3}
            value={form.skills}
            onChange={(e) => set("skills", e.target.value)}
            placeholder="Python, SQL, basic React, data visualisation"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="interests">Interests</Label>
          <Textarea
            id="interests"
            rows={3}
            value={form.interests}
            onChange={(e) => set("interests", e.target.value)}
            placeholder="Machine learning, analytics, problem solving, teaching"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="dreamJob">Dream job</Label>
          <Input
            id="dreamJob"
            value={form.dreamJob}
            onChange={(e) => set("dreamJob", e.target.value)}
            placeholder="Data Scientist at a product company"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" className="gap-2" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {mutation.isPending ? "Generating…" : "Submit & Generate Guidance"}
          </Button>
          {mutation.data && (
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => {
                setForm(empty);
                mutation.reset();
              }}
            >
              <RotateCcw className="size-4" /> Start over
            </Button>
          )}
        </div>
      </form>

      {mutation.isPending && (
        <div className="mt-8 space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-border bg-card"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
          <p className="text-center text-sm text-muted-foreground">
            Our AI is analysing your profile…
          </p>
        </div>
      )}

      {mutation.data && (
        <div className="mt-10">
          <Report result={mutation.data} />
        </div>
      )}
    </div>
  );
}
