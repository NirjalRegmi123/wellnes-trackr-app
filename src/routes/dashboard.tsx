import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Dumbbell, LineChart, ScanLine, Utensils } from "lucide-react";
import { Line, LineChart as RLineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Page } from "@/components/AppShell";
import { calcTargets, needsReview, useFoodLog, useLang, useProfile } from "@/lib/store";
import { weightSeries } from "@/lib/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard — My Fitness Journey" },
      { name: "description", content: "Calories eaten and remaining, macros, water, streak, steps, sleep and today's workout." },
      { property: "og:title", content: "Your Dashboard — My Fitness Journey" },
      { property: "og:description", content: "A daily snapshot of your calories, macros and movement." },
    ],
  }),
  component: Dashboard,
});

function Ring({ eaten, target }: { eaten: number; target: number }) {
  const pct = Math.min(100, Math.round((eaten / Math.max(target, 1)) * 100));
  const r = 62;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg width="160" height="160" className="-rotate-90">
        <circle cx="80" cy="80" r={r} strokeWidth="14" className="fill-none stroke-secondary" />
        <circle
          cx="80"
          cy="80"
          r={r}
          strokeWidth="14"
          strokeLinecap="round"
          className="fill-none stroke-primary transition-all"
          strokeDasharray={c}
          strokeDashoffset={c - (c * pct) / 100}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-2xl font-bold">{eaten}</p>
        <p className="text-xs text-muted-foreground">of {target} kcal</p>
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-base font-bold">{value}</p>
    </div>
  );
}

function Dashboard() {
  const { lang } = useLang();
  const { profile, hydrated } = useProfile();
  const { log } = useFoodLog();

  if (!hydrated) return <Page title="…">{null}</Page>;
  if (!profile)
    return (
      <Page title={lang === "en" ? "Set up first" : "पहिले सेटअप गर्नुहोस्"}>
        <Button asChild>
          <Link to="/onboarding">{lang === "en" ? "Start setup" : "सेटअप सुरु गर्नुहोस्"}</Link>
        </Button>
      </Page>
    );

  const targets = calcTargets(profile);
  const review = needsReview(profile);
  const eaten = log.reduce((s, f) => s + f.kcal, 0);
  const protein = log.reduce((s, f) => s + f.protein, 0);
  const carbs = log.reduce((s, f) => s + f.carbs, 0);
  const fat = log.reduce((s, f) => s + f.fat, 0);

  return (
    <Page
      title={`${lang === "en" ? "Good morning" : "शुभ प्रभात"}, ${profile.name}!`}
      subtitle={lang === "en" ? "Estimates update as you log food." : "खाना दर्ता गर्दा अनुमान अपडेट हुन्छ।"}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile label={lang === "en" ? "Height" : "उचाइ"} value={`${profile.height} cm`} />
        <Tile label={lang === "en" ? "Weight" : "तौल"} value={`${profile.weight} kg`} />
        <Tile label="BMR" value={`${targets.bmr} kcal`} />
        <Tile label={lang === "en" ? "Daily estimate" : "दैनिक अनुमान"} value={review ? "See notice" : `${targets.calories} kcal`} />
      </div>

      <Card className="glass-card">
        <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row">
          <Ring eaten={eaten} target={targets.calories} />
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
            <Tile label={lang === "en" ? "Eaten" : "खाएको"} value={`${eaten} kcal`} />
            <Tile label={lang === "en" ? "Remaining" : "बाँकी"} value={`${Math.max(0, targets.calories - eaten)} kcal`} />
            <Tile label={lang === "en" ? "Water" : "पानी"} value={`${targets.water} L`} />
            <Tile label={lang === "en" ? "Protein" : "प्रोटिन"} value={`${protein} / ${targets.protein} g`} />
            <Tile label={lang === "en" ? "Carbs" : "कार्ब"} value={`${carbs} / ${targets.carbs} g`} />
            <Tile label={lang === "en" ? "Fats" : "बोसो"} value={`${fat} / ${targets.fat} g`} />
          </div>
        </CardContent>
      </Card>

      {review && (
        <p className="rounded-2xl border border-warm/40 bg-warm/10 p-4 text-sm">
          {lang === "en"
            ? "Professional review recommended before following a calorie target."
            : "क्यालोरी लक्ष्य पालना गर्नुअघि विशेषज्ञको सल्लाह लिनुहोस्।"}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="warm-gradient border-0 text-warm-foreground">
          <CardContent className="p-5">
            <p className="text-xs opacity-80">{lang === "en" ? "Today's workout" : "आजको व्यायाम"}</p>
            <p className="font-display text-lg font-bold">
              {profile.location === "gym" ? "Gym Strength · 40 min" : "Home Full Body · 30 min"}
            </p>
            <Button asChild size="sm" variant="secondary" className="mt-3">
              <Link to="/workout">{lang === "en" ? "Start Workout" : "व्यायाम सुरु"}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="glass-card sm:col-span-2">
          <CardContent className="grid grid-cols-3 gap-3 p-5">
            <Tile label={lang === "en" ? "Streak" : "स्ट्रिक"} value="6 days" />
            <Tile label={lang === "en" ? "Steps" : "पाइला"} value="8,420" />
            <Tile label={lang === "en" ? "Sleep" : "निद्रा"} value="7.2 h" />
            <Tile label={lang === "en" ? "Mood" : "मुड"} value="🙂 Good" />
            <Tile label={lang === "en" ? "Energy" : "ऊर्जा"} value="78%" />
            <Tile label={lang === "en" ? "Meals logged" : "दर्ता खाना"} value={`${log.length}`} />
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardContent className="p-5">
          <p className="text-sm font-semibold">{lang === "en" ? "Weight trend (demo)" : "तौल प्रवृत्ति (डेमो)"}</p>
          <div className="mt-3 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <RLineChart data={weightSeries}>
                <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="var(--color-chart-2)" strokeWidth={3} dot={false} />
              </RLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { to: "/food" as const, icon: ScanLine, en: "Scan Food", np: "खाना स्क्यान" },
          { to: "/food" as const, icon: Utensils, en: "Log Meal", np: "खाना दर्ता" },
          { to: "/workout" as const, icon: Dumbbell, en: "Start Workout", np: "व्यायाम" },
          { to: "/body" as const, icon: Activity, en: "Explore Body", np: "शरीर" },
          { to: "/progress" as const, icon: LineChart, en: "Progress", np: "प्रगति" },
        ].map((a, i) => (
          <Button key={i} asChild variant="outline" className="h-auto flex-col gap-2 py-4">
            <Link to={a.to}>
              <a.icon className="size-5" />
              <span className="text-xs">{lang === "en" ? a.en : a.np}</span>
            </Link>
          </Button>
        ))}
      </div>
    </Page>
  );
}
