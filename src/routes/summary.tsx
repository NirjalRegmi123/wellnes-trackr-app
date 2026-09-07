import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Droplets, Flame, Beef, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Page, Disclaimer } from "@/components/AppShell";
import { calcBmi, calcTargets, needsReview, useLang, useProfile } from "@/lib/store";

export const Route = createFileRoute("/summary")({
  head: () => ({
    meta: [
      { title: "Your Personal Summary — My Fitness Journey" },
      { name: "description", content: "See your BMR estimate, daily calorie estimate, protein and water targets." },
      { property: "og:title", content: "Your Personal Summary — My Fitness Journey" },
      { property: "og:description", content: "Personalised estimates based on your height, weight, activity and goal." },
    ],
  }),
  component: Summary,
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

function Summary() {
  const { lang } = useLang();
  const { profile, hydrated } = useProfile();
  const [revealed, setRevealed] = useState(false);

  if (!hydrated) return <Page title="…">{null}</Page>;
  if (!profile)
    return (
      <Page title={lang === "en" ? "No profile yet" : "प्रोफाइल छैन"}>
        <Button asChild>
          <Link to="/onboarding">{lang === "en" ? "Start setup" : "सेटअप सुरु गर्नुहोस्"}</Link>
        </Button>
      </Page>
    );

  const targets = calcTargets(profile);
  const review = needsReview(profile);

  return (
    <Page
      title={`${lang === "en" ? "Welcome" : "स्वागत छ"}, ${profile.name}!`}
      subtitle={lang === "en" ? "Here is your starting picture — all values are estimates." : "यो तपाईंको सुरुवाती चित्र हो — सबै मान अनुमानित हुन्।"}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label={lang === "en" ? "Height" : "उचाइ"} value={`${profile.height} cm`} />
        <Stat label={lang === "en" ? "Weight" : "तौल"} value={`${profile.weight} kg`} />
        <Stat label="BMI (est.)" value={`${calcBmi(profile)}`} />
        <Stat label={lang === "en" ? "Activity" : "सक्रियता"} value={profile.activity} />
        <Stat label={lang === "en" ? "Goal" : "लक्ष्य"} value={profile.goal} />
        <Stat label={lang === "en" ? "Equipment" : "उपकरण"} value={profile.equipment} />
      </div>

      <Card className="hero-gradient border-0 text-primary-foreground">
        <CardContent className="p-6">
          <p className="text-sm opacity-85">{lang === "en" ? "Estimated BMR" : "अनुमानित BMR"}</p>
          <p className="font-display text-4xl font-bold">{targets.bmr} kcal</p>
          <p className="mt-1 text-xs opacity-80">
            {lang === "en"
              ? "Energy your body uses at complete rest — an estimate only."
              : "पूर्ण विश्राममा शरीरले प्रयोग गर्ने ऊर्जा — अनुमान मात्र।"}
          </p>
        </CardContent>
      </Card>

      <Button size="lg" className="h-16 w-full text-base font-bold" onClick={() => setRevealed(true)}>
        {lang === "en" ? "Calculate My Total Daily Calories" : "मेरो दैनिक कुल क्यालोरी गणना गर्नुहोस्"}
      </Button>

      {revealed &&
        (review ? (
          <Card className="border-warm/50 bg-warm/10">
            <CardContent className="flex gap-3 p-5 text-sm">
              <ShieldAlert className="size-5 shrink-0 text-warm" />
              <p>
                {lang === "en"
                  ? "Based on your answers (age group, pregnancy, medical condition, injury recovery or medication), we do not show a calorie target. Please ask a doctor or registered dietitian for a plan that fits you safely."
                  : "तपाईंको उत्तरअनुसार (उमेर समूह, गर्भावस्था, स्वास्थ्य अवस्था, चोट वा औषधि), हामी क्यालोरी लक्ष्य देखाउँदैनौं। कृपया चिकित्सक वा आहार विशेषज्ञसँग सुरक्षित योजना बनाउनुहोस्।"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            <Card className="glass-card">
              <CardContent className="p-5">
                <Flame className="size-5 text-warm" />
                <p className="mt-2 text-xs text-muted-foreground">{lang === "en" ? "Daily calories (estimate)" : "दैनिक क्यालोरी (अनुमान)"}</p>
                <p className="font-display text-2xl font-bold">{targets.calories} kcal</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-5">
                <Beef className="size-5 text-success" />
                <p className="mt-2 text-xs text-muted-foreground">{lang === "en" ? "Protein target (estimate)" : "प्रोटिन लक्ष्य (अनुमान)"}</p>
                <p className="font-display text-2xl font-bold">{targets.protein} g</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-5">
                <Droplets className="size-5 text-chart-5" />
                <p className="mt-2 text-xs text-muted-foreground">{lang === "en" ? "Water target (estimate)" : "पानी लक्ष्य (अनुमान)"}</p>
                <p className="font-display text-2xl font-bold">{targets.water} L</p>
              </CardContent>
            </Card>
          </div>
        ))}

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/dashboard">{lang === "en" ? "Go to My Dashboard" : "ड्यासबोर्डमा जानुहोस्"}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/diet">{lang === "en" ? "View Diet Plan" : "आहार योजना हेर्नुहोस्"}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/workout">{lang === "en" ? "Start Workout" : "व्यायाम सुरु गर्नुहोस्"}</Link>
        </Button>
      </div>

      <Disclaimer />
    </Page>
  );
}
