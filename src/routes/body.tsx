import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Page, Disclaimer } from "@/components/AppShell";
import { bodyAreas, type BodyArea } from "@/lib/data";
import { useLang, useSavedExercises } from "@/lib/store";

export const Route = createFileRoute("/body")({
  head: () => ({
    meta: [
      { title: "Interactive Body Map — My Fitness Journey" },
      { name: "description", content: "Tap a muscle group to see home, gym and calisthenics exercise ideas for that area." },
      { property: "og:title", content: "Interactive Body Map — My Fitness Journey" },
      { property: "og:description", content: "Front and back body map with exercise ideas per muscle group." },
    ],
  }),
  component: BodyPage,
});

const front: Record<string, { x: number; y: number; w: number; h: number; rx?: number }> = {
  shoulders: { x: 26, y: 52, w: 68, h: 14, rx: 7 },
  chest: { x: 34, y: 68, w: 52, h: 22, rx: 8 },
  arms: { x: 12, y: 70, w: 14, h: 46, rx: 7 },
  core: { x: 38, y: 92, w: 44, h: 30, rx: 8 },
  quads: { x: 34, y: 126, w: 22, h: 44, rx: 9 },
  calves: { x: 34, y: 174, w: 22, h: 32, rx: 9 },
};

const back: Record<string, { x: number; y: number; w: number; h: number; rx?: number }> = {
  shoulders: { x: 26, y: 52, w: 68, h: 14, rx: 7 },
  back: { x: 34, y: 68, w: 52, h: 40, rx: 8 },
  arms: { x: 94, y: 70, w: 14, h: 46, rx: 7 },
  glutes: { x: 34, y: 112, w: 52, h: 22, rx: 9 },
  hamstrings: { x: 34, y: 138, w: 22, h: 36, rx: 9 },
  calves: { x: 62, y: 174, w: 22, h: 32, rx: 9 },
};

function Silhouette({
  map,
  onPick,
  label,
}: {
  map: Record<string, { x: number; y: number; w: number; h: number; rx?: number }>;
  onPick: (id: string) => void;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="mb-2 text-center text-xs font-semibold text-muted-foreground">{label}</p>
      <svg viewBox="0 0 120 215" className="mx-auto h-80 w-auto">
        <circle cx="60" cy="30" r="16" className="fill-secondary stroke-border" />
        <rect x="24" y="50" width="72" height="80" rx="16" className="fill-secondary stroke-border" />
        <rect x="10" y="66" width="16" height="56" rx="8" className="fill-secondary stroke-border" />
        <rect x="94" y="66" width="16" height="56" rx="8" className="fill-secondary stroke-border" />
        <rect x="32" y="124" width="24" height="86" rx="12" className="fill-secondary stroke-border" />
        <rect x="64" y="124" width="24" height="86" rx="12" className="fill-secondary stroke-border" />
        {Object.entries(map).map(([id, r]) => (
          <rect
            key={id}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            rx={r.rx ?? 6}
            onClick={() => onPick(id)}
            className="cursor-pointer fill-primary/25 stroke-primary transition-all hover:fill-primary/60"
          />
        ))}
      </svg>
    </div>
  );
}

function BodyPage() {
  const { lang } = useLang();
  const { save } = useSavedExercises();
  const [gender, setGender] = useState("neutral");
  const [area, setArea] = useState<BodyArea | null>(null);

  const pick = (id: string) => setArea(bodyAreas.find((a) => a.id === id) ?? null);

  return (
    <Page
      title={lang === "en" ? "Body Map" : "शरीर नक्सा"}
      subtitle={lang === "en" ? "Tap a highlighted area to see exercise ideas." : "व्यायाम सुझाव हेर्न भाग छान्नुहोस्।"}
    >
      <div className="flex gap-2">
        {[
          { id: "male", en: "Male", np: "पुरुष" },
          { id: "female", en: "Female", np: "महिला" },
          { id: "neutral", en: "Neutral", np: "तटस्थ" },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => setGender(g.id)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              gender === g.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
            }`}
          >
            {lang === "en" ? g.en : g.np}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Silhouette map={front} onPick={pick} label={lang === "en" ? "Front" : "अगाडि"} />
        <Silhouette map={back} onPick={pick} label={lang === "en" ? "Back" : "पछाडि"} />
      </div>

      <div className="flex flex-wrap gap-2">
        {bodyAreas.map((a) => (
          <Button key={a.id} size="sm" variant="outline" onClick={() => setArea(a)}>
            {lang === "en" ? a.en : a.np}
          </Button>
        ))}
      </div>

      <Drawer open={!!area} onOpenChange={(o) => !o && setArea(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{area ? (lang === "en" ? area.en : area.np) : ""}</DrawerTitle>
          </DrawerHeader>
          {area && (
            <div className="space-y-3 px-4 pb-8">
              {(["home", "gym", "calisthenics"] as const).map((k) => (
                <Card key={k} className="glass-card">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">{k}</p>
                    <ul className="mt-1 list-inside list-disc text-sm">
                      {area[k].map((ex) => (
                        <li key={ex}>{ex}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
              <Button
                className="w-full"
                onClick={() => {
                  save(`${area.en}: ${area.home[0]}`);
                  toast.success(lang === "en" ? "Saved to My Workout" : "मेरो व्यायाममा सेभ भयो");
                  setArea(null);
                }}
              >
                {lang === "en" ? "Save to My Workout" : "मेरो व्यायाममा सेभ गर्नुहोस्"}
              </Button>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      <Disclaimer />
    </Page>
  );
}
