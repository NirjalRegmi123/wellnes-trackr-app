import { Link } from "@tanstack/react-router";
import {
  Activity,
  Apple,
  Dumbbell,
  HeartPulse,
  Home,
  LineChart,
  MessageCircleHeart,
  ScanLine,
  Salad,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import { useLang } from "@/lib/store";
import { t, resources, type Lang } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const navItems = [
  { to: "/dashboard", key: "home", icon: Home },
  { to: "/food", key: "food", icon: Apple },
  { to: "/workout", key: "workout", icon: Dumbbell },
  { to: "/body", key: "body", icon: Activity },
  { to: "/progress", key: "progress", icon: LineChart },
  { to: "/profile", key: "profile", icon: User },
] as const;

const extraItems = [
  { to: "/health", key: "health", icon: HeartPulse },
  { to: "/assistant", key: "assistant", icon: MessageCircleHeart },
  { to: "/diet", key: "diet", icon: Salad },
] as const;

export function Header() {
  const { lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="hero-gradient flex size-9 items-center justify-center rounded-xl text-primary-foreground">
            <ScanLine className="size-5" />
          </span>
          <span className="font-display text-base font-bold tracking-tight">My Fitness Journey</span>
        </Link>
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {[...navItems, ...extraItems].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-semibold" }}
            >
              {t[item.key][lang]}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 rounded-full border border-border bg-card p-1">
          {(["en", "np"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {l === "en" ? "English" : "नेपाली"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { lang } = useLang();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-6">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 py-2 text-[10px] text-muted-foreground"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            <item.icon className="size-5" />
            {t[item.key][lang]}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function ResourceButtons() {
  const { lang } = useLang();
  return (
    <div className="flex flex-wrap gap-2">
      {resources.map((r) => (
        <Button key={r.url} variant="outline" size="sm" asChild>
          <a href={r.url} target="_blank" rel="noopener noreferrer">
            {r.label[lang]}
          </a>
        </Button>
      ))}
    </div>
  );
}

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  return (
    <p
      className={`rounded-2xl border border-warm/40 bg-warm/10 p-4 text-xs leading-relaxed text-muted-foreground ${
        compact ? "" : "sm:text-sm"
      }`}
    >
      ⚠️ {t.disclaimer[lang]}
    </p>
  );
}

export function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-28 lg:pb-16">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <ResourceButtons />
        <Disclaimer />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} My Fitness Journey — a demo prototype. No data leaves your device.
        </p>
      </div>
    </footer>
  );
}
