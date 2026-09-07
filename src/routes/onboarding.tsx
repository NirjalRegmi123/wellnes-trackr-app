import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Page } from "@/components/AppShell";
import { useLang, useProfile, type Profile } from "@/lib/store";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set Up Your Plan — My Fitness Journey" },
      { name: "description", content: "Tell us about your body, goal, equipment and health so we can estimate your daily needs." },
      { property: "og:title", content: "Set Up Your Plan — My Fitness Journey" },
      { property: "og:description", content: "A short 3-step setup for your personalised fitness estimates." },
    ],
  }),
  component: Onboarding,
});

const options = {
  ageGroup: ["teen", "18-29", "30-44", "45-59", "60+"],
  gender: ["female", "male", "prefer not to say"],
  activity: ["sedentary", "light", "moderate", "active", "athlete"],
  goal: ["lose", "muscle", "gain", "fit", "stamina"],
  location: ["home", "gym", "outdoor", "mixed"],
  equipment: ["none", "bands", "dumbbells", "full gym"],
  foodPref: ["vegetarian", "non-vegetarian", "vegan", "eggetarian"],
  time: ["15 min", "30 min", "45 min", "60+ min"],
};

const goalLabels: Record<string, string> = {
  lose: "Lose Fat",
  muscle: "Gain Muscle",
  gain: "Gain Healthy Weight",
  fit: "Stay Fit",
  stamina: "Improve Stamina",
};

const conditions = [
  { id: "none", label: "No known conditions" },
  { id: "medical", label: "Medical condition (diabetes, heart, BP…)" },
  { id: "injury", label: "Injury or joint pain" },
  { id: "pregnancy", label: "Pregnancy" },
  { id: "postpartum", label: "Postpartum" },
  { id: "medication", label: "Taking regular medication" },
];

function Chips({
  values,
  value,
  onChange,
  labels,
}: {
  values: string[];
  value: string;
  onChange: (v: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
            value === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"
          }`}
        >
          {labels?.[v] ?? v}
        </button>
      ))}
    </div>
  );
}

function Onboarding() {
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const { profile, setProfile } = useProfile();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Profile>(
    profile ?? {
      name: "",
      ageGroup: "18-29",
      gender: "prefer not to say",
      height: 165,
      weight: 65,
      activity: "light",
      goal: "fit",
      location: "home",
      equipment: "none",
      foodPref: "vegetarian",
      conditions: [],
      time: "30 min",
    },
  );
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setForm((f) => ({ ...f, [k]: v }));

  const toggleCondition = (id: string) =>
    set(
      "conditions",
      form.conditions.includes(id) ? form.conditions.filter((c) => c !== id) : [...form.conditions, id],
    );

  const submit = () => {
    setProfile(form);
    navigate({ to: "/summary" });
  };

  return (
    <Page
      title={lang === "en" ? "Let's set up your plan" : "तपाईंको योजना बनाऔं"}
      subtitle={lang === "en" ? `Step ${step} of 3 · Nothing leaves your device.` : `चरण ${step}/३ · डाटा यही यन्त्रमा रहन्छ।`}
    >
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="hero-gradient h-full transition-all" style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      <Card className="glass-card">
        <CardContent className="space-y-6 p-5">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">{lang === "en" ? "Your name" : "तपाईंको नाम"} *</Label>
                <Input
                  id="name"
                  value={form.name}
                  placeholder={lang === "en" ? "Enter your name" : "आफ्नो नाम लेख्नुहोस्"}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Age group" : "उमेर समूह"}</Label>
                <Chips values={options.ageGroup} value={form.ageGroup} onChange={(v) => set("ageGroup", v)} />
              </div>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Gender (optional)" : "लिङ्ग (वैकल्पिक)"}</Label>
                <Chips values={options.gender} value={form.gender} onChange={(v) => set("gender", v)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="h">{lang === "en" ? "Height (cm)" : "उचाइ (से.मि.)"}</Label>
                  <Input id="h" type="number" value={form.height} onChange={(e) => set("height", Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="w">{lang === "en" ? "Weight (kg)" : "तौल (के.जी.)"}</Label>
                  <Input id="w" type="number" value={form.weight} onChange={(e) => set("weight", Number(e.target.value))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Activity level" : "सक्रियता स्तर"}</Label>
                <Chips values={options.activity} value={form.activity} onChange={(v) => set("activity", v)} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Your goal" : "तपाईंको लक्ष्य"}</Label>
                <Chips values={options.goal} value={form.goal} onChange={(v) => set("goal", v)} labels={goalLabels} />
              </div>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Workout location" : "व्यायाम स्थान"}</Label>
                <Chips values={options.location} value={form.location} onChange={(v) => set("location", v)} />
              </div>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Available equipment" : "उपलब्ध उपकरण"}</Label>
                <Chips values={options.equipment} value={form.equipment} onChange={(v) => set("equipment", v)} />
              </div>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Available workout time" : "व्यायामको समय"}</Label>
                <Chips values={options.time} value={form.time} onChange={(v) => set("time", v)} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Food preference" : "खानाको रुचि"}</Label>
                <Chips values={options.foodPref} value={form.foodPref} onChange={(v) => set("foodPref", v)} />
              </div>
              <div className="space-y-2">
                <Label>{lang === "en" ? "Language" : "भाषा"}</Label>
                <Chips values={["en", "np"]} value={lang} onChange={(v) => setLang(v as "en" | "np")} labels={{ en: "English", np: "नेपाली" }} />
              </div>
              <div className="space-y-3">
                <Label>{lang === "en" ? "Health considerations" : "स्वास्थ्य अवस्था"}</Label>
                {conditions.map((c) => (
                  <label key={c.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-sm">
                    <Checkbox checked={form.conditions.includes(c.id)} onCheckedChange={() => toggleCondition(c.id)} />
                    {c.label}
                  </label>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between gap-3 pt-2">
            <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
              {lang === "en" ? "Back" : "पछाडि"}
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={step === 1 && form.name.trim().length === 0}>
                {lang === "en" ? "Next" : "अर्को"}
              </Button>
            ) : (
              <Button onClick={submit} disabled={form.name.trim().length === 0}>
                {lang === "en" ? "See my summary" : "मेरो सारांश हेर्नुहोस्"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Page>
  );
}
