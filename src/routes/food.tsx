import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Heart, Search, ScanBarcode, ScanLine, Tag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Page } from "@/components/AppShell";
import { localFoods, scannedFood, t, type FoodItem } from "@/lib/data";
import { useFoodLog, useLang } from "@/lib/store";

export const Route = createFileRoute("/food")({
  head: () => ({
    meta: [
      { title: "Food Tracker & Scan — My Fitness Journey" },
      { name: "description", content: "Simulated meal photo scan, barcode, label, search and Nepali food list with calorie estimates." },
      { property: "og:title", content: "Food Tracker & Scan — My Fitness Journey" },
      { property: "og:description", content: "Log dal bhat, momo, thukpa and more with estimated calories and macros." },
    ],
  }),
  component: FoodPage,
});

const meals = ["Breakfast", "Lunch", "Snack", "Dinner"];

function FoodPage() {
  const { lang } = useLang();
  const { log, add, clear } = useFoodLog();
  const [portion, setPortion] = useState(1);
  const [meal, setMeal] = useState("Lunch");
  const [query, setQuery] = useState("");
  const [favs, setFavs] = useState<string[]>([]);

  const scaled = (n: number) => Math.round(n * portion);

  const addScanned = () => {
    add({
      id: scannedFood.id,
      name: lang === "en" ? scannedFood.en : scannedFood.np,
      kcal: scaled(scannedFood.kcal),
      protein: scaled(scannedFood.protein),
      carbs: scaled(scannedFood.carbs),
      fat: scaled(scannedFood.fat),
      meal,
    });
    toast.success(lang === "en" ? "Added to today's calories" : "आजको क्यालोरीमा थपियो");
  };

  const addLocal = (f: FoodItem) => {
    add({ id: f.id, name: lang === "en" ? f.en : f.np, kcal: f.kcal, protein: f.protein, carbs: f.carbs, fat: f.fat, meal });
    toast.success(`${lang === "en" ? f.en : f.np} +${f.kcal} kcal`);
  };

  const filtered = localFoods.filter((f) =>
    (lang === "en" ? f.en : f.np).toLowerCase().includes(query.toLowerCase()),
  );

  const scanCard = (
    <Card className="glass-card overflow-hidden">
      <div className="hero-gradient flex h-36 items-center justify-center text-5xl">{scannedFood.emoji}</div>
      <CardContent className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-bold">
            {scannedFood.en} / {scannedFood.np}
          </h3>
          <Badge variant="secondary">{scannedFood.confidence}% confidence</Badge>
          <Badge className="bg-success text-success-foreground">{scannedFood.portion}</Badge>
        </div>
        <div className="grid grid-cols-5 gap-2 text-center">
          {[
            ["kcal", scaled(scannedFood.kcal)],
            ["Protein", `${scaled(scannedFood.protein)}g`],
            ["Carbs", `${scaled(scannedFood.carbs)}g`],
            ["Fat", `${scaled(scannedFood.fat)}g`],
            ["Fiber", `${scaled(scannedFood.fiber)}g`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-secondary p-2">
              <p className="font-display text-sm font-bold">{v}</p>
              <p className="text-[10px] text-muted-foreground">{k}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{lang === "en" ? "Portion" : "परिमाण"}</p>
          <div className="mt-2 flex gap-2">
            {[0.5, 1, 1.5, 2].map((p) => (
              <button
                key={p}
                onClick={() => setPortion(p)}
                className={`rounded-full border px-3 py-1 text-sm ${portion === p ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
              >
                {p}×
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{lang === "en" ? "Meal type" : "खानाको प्रकार"}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {meals.map((m) => (
              <button
                key={m}
                onClick={() => setMeal(m)}
                className={`rounded-full border px-3 py-1 text-sm ${meal === m ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          <strong>{lang === "en" ? "Ingredients" : "सामग्री"}:</strong> {scannedFood.ingredients.join(", ")}
        </p>
        <p className="text-xs text-muted-foreground">
          <strong>{lang === "en" ? "Allergens" : "एलर्जी"}:</strong>{" "}
          {lang === "en" ? "Not detected — check ingredients yourself." : "पत्ता लागेन — सामग्री आफैँ जाँच्नुहोस्।"}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setPortion(portion === 2 ? 0.5 : portion + 0.5)}>
            {lang === "en" ? "Edit Portion" : "परिमाण मिलाउनुहोस्"}
          </Button>
          <Button size="sm" onClick={addScanned}>
            <Check className="size-4" /> {lang === "en" ? "Add to Today's Calories" : "क्यालोरीमा थप्नुहोस्"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setFavs((f) => Array.from(new Set([...f, scannedFood.id])));
              toast.success(lang === "en" ? "Saved to favourites" : "मनपर्नेमा सेभ भयो");
            }}
          >
            <Heart className={`size-4 ${favs.includes(scannedFood.id) ? "fill-current" : ""}`} />{" "}
            {lang === "en" ? "Save Favourite" : "मनपर्ने"}
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener noreferrer">
              {lang === "en" ? "View Nutrition Online" : "पोषण अनलाइन हेर्नुहोस्"}
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a
              href="https://fdc.nal.usda.gov/food-search?query=dal%20bhat"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang === "en" ? "Search This Food Online" : "यो खाना अनलाइन खोज्नुहोस्"}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Page
      title={lang === "en" ? "Food Tracker" : "खाना ट्र्याकर"}
      subtitle={lang === "en" ? "Simulated scanning — no camera or AI is used." : "नक्कली स्क्यान — क्यामेरा वा एआई प्रयोग हुँदैन।"}
    >
      <p className="rounded-2xl border border-warm/40 bg-warm/10 p-4 text-xs">{t.foodDisclaimer[lang]}</p>

      <Tabs defaultValue="photo">
        <TabsList className="flex w-full flex-wrap">
          <TabsTrigger value="photo">
            <ScanLine className="mr-1 size-4" /> {lang === "en" ? "Meal Photo" : "फोटो"}
          </TabsTrigger>
          <TabsTrigger value="barcode">
            <ScanBarcode className="mr-1 size-4" /> {lang === "en" ? "Barcode" : "बारकोड"}
          </TabsTrigger>
          <TabsTrigger value="label">
            <Tag className="mr-1 size-4" /> {lang === "en" ? "Label" : "लेबल"}
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="mr-1 size-4" /> {lang === "en" ? "Search" : "खोज"}
          </TabsTrigger>
          <TabsTrigger value="nepali">{lang === "en" ? "Nepali Foods" : "नेपाली खाना"}</TabsTrigger>
        </TabsList>

        <TabsContent value="photo" className="mt-4">
          {scanCard}
        </TabsContent>
        <TabsContent value="barcode" className="mt-4 space-y-3">
          <Card className="glass-card">
            <CardContent className="p-5 text-sm text-muted-foreground">
              {lang === "en"
                ? "Demo barcode 8901234567890 matched a packaged food. Result below uses the same sample data."
                : "डेमो बारकोड 8901234567890 मिल्यो। तलको नतिजा उही नमुना डाटा हो।"}
            </CardContent>
          </Card>
          {scanCard}
        </TabsContent>
        <TabsContent value="label" className="mt-4 space-y-3">
          <Card className="glass-card">
            <CardContent className="p-5 text-sm text-muted-foreground">
              {lang === "en"
                ? "Nutrition label reading is simulated: per 100 g → 210 kcal, 7 g protein, 33 g carbs, 5 g fat."
                : "लेबल पढाइ नक्कली हो: प्रति १०० ग्राम → २१० क्यालोरी, ७ ग्राम प्रोटिन, ३३ ग्राम कार्ब, ५ ग्राम बोसो।"}
            </CardContent>
          </Card>
          {scanCard}
        </TabsContent>
        <TabsContent value="search" className="mt-4 space-y-3">
          <Input
            placeholder={lang === "en" ? "Search foods…" : "खाना खोज्नुहोस्…"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {filtered.map((f) => (
              <button
                key={f.id}
                onClick={() => addLocal(f)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left hover:bg-secondary"
              >
                <span className="text-2xl">{f.emoji}</span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{lang === "en" ? f.en : f.np}</span>
                  <span className="block text-xs text-muted-foreground">
                    {f.portion} · {f.kcal} kcal · {f.protein}g P
                  </span>
                </span>
                <Check className="size-4 text-success" />
              </button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="nepali" className="mt-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {localFoods.map((f) => (
              <Card key={f.id} className="glass-card">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="text-2xl">{f.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{lang === "en" ? f.en : f.np}</p>
                    <p className="text-xs text-muted-foreground">
                      {f.kcal} kcal · {f.protein}g P · {f.carbs}g C · {f.fat}g F
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => addLocal(f)}>
                    +
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="glass-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{lang === "en" ? "Today's meal history" : "आजको खाना इतिहास"}</p>
            {log.length > 0 && (
              <Button size="sm" variant="ghost" onClick={clear}>
                {lang === "en" ? "Clear" : "मेटाउनुहोस्"}
              </Button>
            )}
          </div>
          {log.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "en" ? "Nothing logged yet today." : "आज केही दर्ता भएको छैन।"}
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {log.map((f, i) => (
                <li key={i} className="flex justify-between rounded-xl bg-secondary px-3 py-2 text-sm">
                  <span>
                    {f.name} · <span className="text-muted-foreground">{f.meal}</span>
                  </span>
                  <span className="font-semibold">{f.kcal} kcal</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </Page>
  );
}
