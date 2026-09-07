import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Page, Disclaimer } from "@/components/AppShell";
import { assistantChat } from "@/lib/data";
import { useLang } from "@/lib/store";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Fitness Assistant — My Fitness Journey" },
      { name: "description", content: "A bilingual chat preview answering three common fitness questions — general guidance only." },
      { property: "og:title", content: "Fitness Assistant — My Fitness Journey" },
      { property: "og:description", content: "Sample bilingual answers about calories, dal bhat and training with knee pain." },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  const { lang } = useLang();
  const [asked, setAsked] = useState<number[]>([]);

  return (
    <Page
      title={lang === "en" ? "Fitness Assistant" : "फिटनेस सहायक"}
      subtitle={lang === "en" ? "General fitness guidance only — not medical advice." : "सामान्य फिटनेस मार्गदर्शन मात्र — चिकित्सकीय सल्लाह होइन।"}
    >
      <Card className="glass-card">
        <CardContent className="space-y-3 p-5">
          <div className="rounded-2xl bg-secondary p-3 text-sm">
            {lang === "en" ? "Namaste! Pick a question below to see a sample answer." : "नमस्ते! नमुना उत्तर हेर्न तलको प्रश्न छान्नुहोस्।"}
          </div>
          {assistantChat.map((c, i) =>
            asked.includes(i) ? (
              <div key={i} className="space-y-2">
                <p className="ml-auto max-w-[85%] rounded-2xl bg-primary px-3 py-2 text-sm text-primary-foreground">
                  {c.q[lang]}
                </p>
                <p className="max-w-[90%] rounded-2xl bg-secondary px-3 py-2 text-sm">{c.a[lang]}</p>
              </div>
            ) : null,
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {assistantChat.map((c, i) => (
              <Button key={i} size="sm" variant="outline" onClick={() => setAsked((a) => Array.from(new Set([...a, i])))}>
                {c.q[lang]}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Disclaimer />
    </Page>
  );
}
