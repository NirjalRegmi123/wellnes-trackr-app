import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Page, Disclaimer } from "@/components/AppShell";
import { workoutCats, workouts } from "@/lib/data";
import { useLang, useSavedExercises } from "@/lib/store";

export const Route = createFileRoute("/workout")({
  head: () => ({
    meta: [
      { title: "Workouts — Home, Gym & Calisthenics | My Fitness Journey" },
      { name: "description", content: "Filter home, gym, calisthenics, fat loss, mobility, low impact and recovery workouts with sets, reps and safety notes." },
      { property: "og:title", content: "Workouts — My Fitness Journey" },
      { property: "og:description", content: "Bilingual workout cards with level, equipment, muscles and safety notes." },
    ],
  }),
  component: WorkoutPage,
});

function WorkoutPage() {
  const { lang } = useLang();
  const [cat, setCat] = useState("home");
  const { saved, save } = useSavedExercises();
  const list = workouts.filter((w) => w.cats.includes(cat));

  return (
    <Page
      title={lang === "en" ? "Workouts" : "व्यायाम"}
      subtitle={lang === "en" ? "Pick a style and move at your own pace." : "आफ्नो शैली छान्नुहोस् र आफ्नै गतिमा गर्नुहोस्।"}
    >
      <div className="flex flex-wrap gap-2">
        {workoutCats.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"
            }`}
          >
            {lang === "en" ? c.en : c.np}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => (
          <Card key={w.id} className="glass-card">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-base font-bold">{lang === "en" ? w.en : w.np}</h3>
                <Badge variant="secondary">{w.level}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{lang === "en" ? w.np : w.en}</p>
              <p className="text-sm">{w.sets}</p>
              <p className="text-xs text-muted-foreground">
                🎯 {w.muscles} · 🧰 {w.equipment}
              </p>
              <p className="rounded-xl bg-warm/10 p-2 text-xs">⚠️ {w.safety}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    save(w.en);
                    toast.success(lang === "en" ? "Saved to My Workout" : "मेरो व्यायाममा सेभ भयो");
                  }}
                  variant={saved.includes(w.en) ? "secondary" : "default"}
                >
                  {saved.includes(w.en) ? (lang === "en" ? "Saved" : "सेभ भयो") : lang === "en" ? "Save" : "सेभ"}
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={w.link} target="_blank" rel="noopener noreferrer">
                    {lang === "en" ? "Learn More" : "थप जान्नुहोस्"}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {saved.length > 0 && (
        <Card className="glass-card">
          <CardContent className="p-5">
            <p className="font-semibold">{lang === "en" ? "My saved exercises" : "सेभ गरिएका व्यायाम"}</p>
            <p className="mt-1 text-sm text-muted-foreground">{saved.join(" · ")}</p>
          </CardContent>
        </Card>
      )}

      <Disclaimer />
    </Page>
  );
}
