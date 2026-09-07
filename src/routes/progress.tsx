import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Page } from "@/components/AppShell";
import { weightSeries } from "@/lib/data";
import { useLang } from "@/lib/store";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress Charts — My Fitness Journey" },
      { name: "description", content: "Demo charts for weight, calories, protein, water, workouts, steps, sleep, mood and waist." },
      { property: "og:title", content: "Progress Charts — My Fitness Journey" },
      { property: "og:description", content: "Track trends over days, weeks and months with clean charts." },
    ],
  }),
  component: ProgressPage,
});

const metrics = [
  { key: "weight", en: "Weight (kg)", np: "तौल", type: "area" },
  { key: "calories", en: "Calories", np: "क्यालोरी", type: "bar" },
  { key: "protein", en: "Protein (g)", np: "प्रोटिन", type: "area" },
  { key: "water", en: "Water (L)", np: "पानी", type: "bar" },
  { key: "workouts", en: "Workouts", np: "व्यायाम", type: "bar" },
  { key: "steps", en: "Steps", np: "पाइला", type: "area" },
  { key: "sleep", en: "Sleep (h)", np: "निद्रा", type: "area" },
  { key: "mood", en: "Mood (1–10)", np: "मुड", type: "bar" },
  { key: "waist", en: "Waist (cm)", np: "कम्मर", type: "area" },
] as const;

function ProgressPage() {
  const { lang } = useLang();
  const [range, setRange] = useState("weekly");
  const data = range === "daily" ? weightSeries.slice(-3) : range === "monthly" ? weightSeries : weightSeries.slice(-4);

  return (
    <Page title={lang === "en" ? "Progress" : "प्रगति"} subtitle={lang === "en" ? "Demo data for this prototype." : "यो प्रोटोटाइपको डेमो डाटा।"}>
      <div className="flex gap-2">
        {["daily", "weekly", "monthly"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`rounded-full border px-3 py-1.5 text-sm capitalize ${
              range === r ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.key} className="glass-card">
            <CardContent className="p-4">
              <p className="text-sm font-semibold">{lang === "en" ? m.en : m.np}</p>
              <div className="mt-2 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  {m.type === "bar" ? (
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="d" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey={m.key} fill="var(--color-chart-3)" radius={6} />
                    </BarChart>
                  ) : (
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="d" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area dataKey={m.key} stroke="var(--color-chart-1)" fill="var(--color-chart-2)" fillOpacity={0.25} strokeWidth={2} />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Page>
  );
}
