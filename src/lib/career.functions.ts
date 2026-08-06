import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const guidanceInputSchema = z.object({
  fullName: z.string().min(1),
  age: z.string().min(1),
  qualification: z.string().min(1),
  skills: z.string().min(1),
  interests: z.string().min(1),
  dreamJob: z.string().min(1),
});

export type GuidanceInput = z.infer<typeof guidanceInputSchema>;

export type GuidanceResult = {
  bestCareer: string;
  whyThisCareer: string;
  requiredSkills: string[];
  learningRoadmap: { phase: string; duration: string; focus: string[] }[];
  recommendedProjects: { title: string; description: string }[];
  freeResources: { name: string; url: string; note: string }[];
  salaryRange: { india: string; global: string; note: string };
  interviewTips: string[];
};

function extractJson(text: string): unknown {
  const cleaned = text
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("AI response was not valid JSON");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export const generateGuidance = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => guidanceInputSchema.parse(input))
  .handler(async ({ data }): Promise<GuidanceResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this project.");

    const prompt = `You are an expert career counsellor for students. Using the student profile below, return career guidance as a single JSON object only (no markdown, no commentary).

Student profile:
- Full name: ${data.fullName}
- Age: ${data.age}
- Qualification: ${data.qualification}
- Skills: ${data.skills}
- Interests: ${data.interests}
- Dream job: ${data.dreamJob}

Required JSON shape:
{
  "bestCareer": "string",
  "whyThisCareer": "3-5 sentences, personalised to the profile",
  "requiredSkills": ["6-10 concrete skills"],
  "learningRoadmap": [{"phase":"string","duration":"string","focus":["string"]}],
  "recommendedProjects": [{"title":"string","description":"string"}],
  "freeResources": [{"name":"string","url":"https://...","note":"string"}],
  "salaryRange": {"india":"string","global":"string","note":"string"},
  "interviewTips": ["6-8 actionable tips"]
}
Give 4 roadmap phases, 4 projects and 5 real free resources with working URLs.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          {
            role: "system",
            content:
              "You are an AI career guidance engine. Always reply with valid minified json only.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`AI gateway error [${res.status}]: ${body}`);
      if (res.status === 429) throw new Error("Too many requests — please try again shortly.");
      if (res.status === 402)
        throw new Error("AI credits exhausted. Please add credits to continue.");
      throw new Error(`AI request failed (${res.status}).`);
    }

    const payload = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new Error("The AI returned an empty response. Please retry.");

    return extractJson(content) as GuidanceResult;
  });
