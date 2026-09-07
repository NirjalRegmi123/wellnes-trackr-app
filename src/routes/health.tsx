import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Page, Disclaimer, ResourceButtons } from "@/components/AppShell";
import { healthCards } from "@/lib/data";
import { useLang } from "@/lib/store";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "Health & Conditions — My Fitness Journey" },
      { name: "description", content: "General movement ideas for common health conditions, with professional clearance reminders." },
      { property: "og:title", content: "Health & Conditions — My Fitness Journey" },
      { property: "og:description", content: "Safe, general movement guidance for diabetes, back pain, PCOS, pregnancy and more." },
    ],
  }),
  component: HealthPage,
});

function HealthPage() {
  const { lang } = useLang();
  return (
    <Page
      title={lang === "en" ? "Health & Conditions" : "स्वास्थ्य अवस्था"}
      subtitle={lang === "en" ? "General movement ideas only." : "सामान्य गतिविधि सुझाव मात्र।"}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {healthCards.map((c) => (
          <Card key={c.en} className="glass-card">
            <CardContent className="space-y-2 p-4">
              <h3 className="font-semibold">{lang === "en" ? c.en : c.np}</h3>
              <p className="text-sm text-muted-foreground">{c.tip}</p>
              <Badge className="bg-warm text-warm-foreground">
                {lang === "en" ? "Professional clearance recommended" : "विशेषज्ञको स्वीकृति सिफारिस"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <ResourceButtons />
      <Disclaimer />
    </Page>
  );
}
