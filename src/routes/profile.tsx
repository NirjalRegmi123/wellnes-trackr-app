import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Page, Disclaimer } from "@/components/AppShell";
import { calcBmi, calcTargets, useFoodLog, useLang, useProfile, useSavedExercises } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — My Fitness Journey" },
      { name: "description", content: "Review your saved profile, language, estimates and saved exercises, all stored on your device." },
      { property: "og:title", content: "Your Profile — My Fitness Journey" },
      { property: "og:description", content: "Your details and estimates, stored locally in your browser." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { lang, setLang } = useLang();
  const { profile, setProfile, hydrated } = useProfile();
  const { saved } = useSavedExercises();
  const { log, clear } = useFoodLog();

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
  const rows: [string, string][] = [
    [lang === "en" ? "Name" : "नाम", profile.name],
    [lang === "en" ? "Age group" : "उमेर समूह", profile.ageGroup],
    [lang === "en" ? "Gender" : "लिङ्ग", profile.gender],
    [lang === "en" ? "Height" : "उचाइ", `${profile.height} cm`],
    [lang === "en" ? "Weight" : "तौल", `${profile.weight} kg`],
    ["BMI (est.)", `${calcBmi(profile)}`],
    [lang === "en" ? "Activity" : "सक्रियता", profile.activity],
    [lang === "en" ? "Goal" : "लक्ष्य", profile.goal],
    [lang === "en" ? "Location" : "स्थान", profile.location],
    [lang === "en" ? "Equipment" : "उपकरण", profile.equipment],
    [lang === "en" ? "Food preference" : "खानाको रुचि", profile.foodPref],
    [lang === "en" ? "Workout time" : "व्यायाम समय", profile.time],
    [lang === "en" ? "Health notes" : "स्वास्थ्य", profile.conditions.join(", ") || "—"],
    ["BMR", `${targets.bmr} kcal`],
  ];

  return (
    <Page title={`${profile.name}`} subtitle={lang === "en" ? "Saved on this device only." : "यही यन्त्रमा मात्र सेभ भएको।"}>
      <Card className="glass-card">
        <CardContent className="grid gap-2 p-5 sm:grid-cols-2">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between rounded-xl bg-secondary px-3 py-2 text-sm">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-semibold capitalize">{v}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="space-y-3 p-5 text-sm">
          <p className="font-semibold">{lang === "en" ? "Saved exercises" : "सेभ गरिएका व्यायाम"}</p>
          <p className="text-muted-foreground">{saved.join(" · ") || (lang === "en" ? "None yet" : "अहिलेसम्म छैन")}</p>
          <p className="font-semibold">{lang === "en" ? "Meals logged today" : "आज दर्ता खाना"}: {log.length}</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link to="/onboarding">{lang === "en" ? "Edit my details" : "विवरण सम्पादन"}</Link>
        </Button>
        <Button variant="outline" onClick={() => setLang(lang === "en" ? "np" : "en")}>
          {lang === "en" ? "नेपालीमा बदल्नुहोस्" : "Switch to English"}
        </Button>
        <Button variant="outline" onClick={clear}>
          {lang === "en" ? "Clear today's food log" : "आजको खाना मेटाउनुहोस्"}
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            setProfile(null);
            clear();
          }}
        >
          {lang === "en" ? "Reset my data" : "डाटा रिसेट"}
        </Button>
      </div>

      <Disclaimer />
    </Page>
  );
}
