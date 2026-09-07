import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Page, Disclaimer } from "@/components/AppShell";
import { dietPlans } from "@/lib/data";
import { useLang } from "@/lib/store";

export const Route = createFileRoute("/diet")({
  head: () => ({
    meta: [
      { title: "Diet Plans — Nepali-friendly Meals | My Fitness Journey" },
      { name: "description", content: "Sample fat loss, muscle gain, healthy weight gain and maintenance meal plans with substitutions and a grocery list." },
      { property: "og:title", content: "Diet Plans — My Fitness Journey" },
      { property: "og:description", content: "Nepali-friendly sample meals, water targets, swaps and grocery lists." },
    ],
  }),
  component: DietPage,
});

function DietPage() {
  const { lang } = useLang();
  const [tab, setTab] = useState(dietPlans[0].id);
  const plan = dietPlans.find((p) => p.id === tab)!;

  return (
    <Page
      title={lang === "en" ? "Diet Plan" : "आहार योजना"}
      subtitle={lang === "en" ? "Sample plans — adjust portions to your appetite." : "नमुना योजना — भोक अनुसार परिमाण मिलाउनुहोस्।"}
    >
      <div className="flex flex-wrap gap-2">
        {dietPlans.map((p) => (
          <button
            key={p.id}
            onClick={() => setTab(p.id)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              tab === p.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
            }`}
          >
            {lang === "en" ? p.en : p.np}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="glass-card">
          <CardContent className="p-5">
            <p className="font-semibold">{lang === "en" ? "Sample day" : "नमुना दिन"}</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {plan.meals.map((m) => (
                <li key={m} className="rounded-xl bg-secondary p-2">
                  {m}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <div className="space-y-3">
          <Card className="glass-card">
            <CardContent className="p-5 text-sm">
              <p className="font-semibold">{lang === "en" ? "Water target" : "पानी लक्ष्य"}</p>
              <p className="text-muted-foreground">{plan.water}</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-5 text-sm">
              <p className="font-semibold">{lang === "en" ? "Substitutions" : "विकल्प"}</p>
              <ul className="mt-1 list-inside list-disc text-muted-foreground">
                {plan.subs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-5 text-sm">
              <p className="font-semibold">{lang === "en" ? "Grocery list" : "किनमेल सूची"}</p>
              <p className="text-muted-foreground">{plan.grocery.join(" · ")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Disclaimer />
    </Page>
  );
}
