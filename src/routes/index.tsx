import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Apple,
  Bot,
  Calculator,
  Dumbbell,
  Flame,
  LineChart,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Disclaimer, ResourceButtons } from "@/components/AppShell";
import { useLang } from "@/lib/store";
import { workouts } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Fitness Journey — Bilingual Fitness & Calorie Tracker" },
      {
        name: "description",
        content:
          "Track calories, scan Nepali meals, follow home or gym workouts and explore a body map — in English and नेपाली.",
      },
      { property: "og:title", content: "My Fitness Journey — Your Health. Your Strength." },
      {
        property: "og:description",
        content: "A supportive bilingual fitness prototype with calorie estimates, workouts and progress tracking.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Flame, en: "Daily Calories", np: "दैनिक क्यालोरी", to: "/dashboard" as const },
  { icon: ScanLine, en: "Scan Food", np: "खाना स्क्यान", to: "/food" as const },
  { icon: Calculator, en: "BMR / BMI", np: "बीएमआर / बीएमआई", to: "/summary" as const },
  { icon: Dumbbell, en: "Workouts", np: "व्यायाम", to: "/workout" as const },
  { icon: Activity, en: "Body Map", np: "शरीर नक्सा", to: "/body" as const },
  { icon: LineChart, en: "Progress", np: "प्रगति", to: "/progress" as const },
  { icon: Bot, en: "Fitness Assistant", np: "फिटनेस सहायक", to: "/assistant" as const },
];

const styles = [
  {
    id: "home",
    en: "Home Workout",
    np: "घरको व्यायाम",
    desc: { en: "No equipment, small space, 15–30 minutes.", np: "कुनै उपकरण नचाहिने, सानो ठाउँ, १५–३० मिनेट।" },
    cls: "hero-gradient",
  },
  {
    id: "gym",
    en: "Gym Workout",
    np: "जिम व्यायाम",
    desc: { en: "Machines and free weights with progressive load.", np: "मेसिन र वेटसहित क्रमिक भार।" },
    cls: "plum-gradient",
  },
  {
    id: "calisthenics",
    en: "Calisthenics",
    np: "क्यालिस्थेनिक्स",
    desc: { en: "Bodyweight strength and control skills.", np: "शरीरकै तौलमा शक्ति र नियन्त्रण।" },
    cls: "warm-gradient",
  },
];

function Landing() {
  const { lang } = useLang();
  return (
    <div className="pb-28 lg:pb-0">
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-95" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-primary-foreground sm:py-24">
          <span className="inline-flex rounded-full bg-background/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            English · नेपाली
          </span>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Your Health. Your Strength. Your Journey.
          </h1>
          <p className="mt-3 max-w-xl text-lg opacity-90">तपाईंको स्वास्थ्य, तपाईंको शक्ति, तपाईंको यात्रा।</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/onboarding">{lang === "en" ? "Start My Journey" : "मेरो यात्रा सुरु गर्नुहोस्"}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border border-primary-foreground/40 bg-transparent hover:bg-primary-foreground/10"
            >
              <Link to="/onboarding">{lang === "en" ? "Create My Plan" : "मेरो योजना बनाउनुहोस्"}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-xl font-bold">
          {lang === "en" ? "Everything in one place" : "सबै एकै ठाउँमा"}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {features.map((f) => (
            <Link key={f.en} to={f.to}>
              <Card className="glass-card h-full transition-transform hover:-translate-y-1">
                <CardContent className="flex flex-col gap-2 p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <f.icon className="size-5" />
                  </span>
                  <p className="text-sm font-semibold">{lang === "en" ? f.en : f.np}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="font-display text-xl font-bold">{lang === "en" ? "Choose your style" : "आफ्नो शैली छान्नुहोस्"}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {styles.map((s) => (
            <Card key={s.id} className="overflow-hidden border-0 p-0">
              <div className={`${s.cls} h-24 w-full`} />
              <CardContent className="space-y-2 p-4">
                <h3 className="font-semibold">{lang === "en" ? s.en : s.np}</h3>
                <p className="text-sm text-muted-foreground">{s.desc[lang]}</p>
                <p className="text-xs text-muted-foreground">
                  {workouts.filter((w) => w.cats.includes(s.id)).length}{" "}
                  {lang === "en" ? "sample exercises" : "नमुना व्यायाम"}
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/workout">{lang === "en" ? "View exercises" : "व्यायाम हेर्नुहोस्"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-4 px-4 pb-16">
        <h2 className="font-display text-xl font-bold">{lang === "en" ? "Trusted resources" : "भरपर्दो स्रोतहरू"}</h2>
        <ResourceButtons />
        <Disclaimer />
      </section>
    </div>
  );
}
