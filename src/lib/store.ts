import { useCallback, useEffect, useState } from "react";
import type { Lang } from "./data";

export type Profile = {
  name: string;
  ageGroup: string;
  gender: string;
  height: number;
  weight: number;
  activity: string;
  goal: string;
  location: string;
  equipment: string;
  foodPref: string;
  conditions: string[];
  time: string;
};

export type LoggedFood = {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: string;
  at: number;
};

const KEY = "mfj:profile";
const LOG = "mfj:log";
const LANG = "mfj:lang";
const SAVED = "mfj:savedExercises";

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

function usePersisted<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(read<T>(key, fallback));
    setHydrated(true);
    const onChange = () => setValue(read<T>(key, fallback));
    window.addEventListener("mfj:update", onChange);
    return () => window.removeEventListener("mfj:update", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T) => {
      window.localStorage.setItem(key, JSON.stringify(next));
      setValue(next);
      window.dispatchEvent(new Event("mfj:update"));
    },
    [key],
  );

  return { value, setValue: update, hydrated };
}

export const useLang = () => {
  const { value, setValue } = usePersisted<Lang>(LANG, "en");
  return { lang: value, setLang: setValue };
};

export const useProfile = () => {
  const { value, setValue, hydrated } = usePersisted<Profile | null>(KEY, null);
  return { profile: value, setProfile: setValue, hydrated };
};

export const useFoodLog = () => {
  const { value, setValue } = usePersisted<LoggedFood[]>(LOG, []);
  const add = (item: Omit<LoggedFood, "at">) => setValue([...value, { ...item, at: Date.now() }]);
  const clear = () => setValue([]);
  return { log: value, add, clear };
};

export const useSavedExercises = () => {
  const { value, setValue } = usePersisted<string[]>(SAVED, []);
  const save = (name: string) => setValue(Array.from(new Set([...value, name])));
  return { saved: value, save };
};

export const calcBmr = (p: Profile) => {
  const age = { teen: 16, "18-29": 24, "30-44": 37, "45-59": 52, "60+": 65 }[p.ageGroup] ?? 30;
  const base = 10 * p.weight + 6.25 * p.height - 5 * age;
  return Math.round(p.gender === "female" ? base - 161 : base + 5);
};

export const activityFactor = (a: string) =>
  ({ sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, athlete: 1.9 })[a] ?? 1.375;

export const goalAdjust = (g: string) =>
  ({ lose: -0.15, muscle: 0.1, gain: 0.15, fit: 0, stamina: 0.05 })[g] ?? 0;

export const calcTargets = (p: Profile) => {
  const bmr = calcBmr(p);
  const tdee = bmr * activityFactor(p.activity);
  const calories = Math.round(tdee * (1 + goalAdjust(p.goal)));
  const protein = Math.round(p.weight * (p.goal === "muscle" || p.goal === "lose" ? 1.6 : 1.2));
  const water = Math.round(p.weight * 0.035 * 10) / 10;
  return { bmr, calories, protein, water, carbs: Math.round((calories * 0.45) / 4), fat: Math.round((calories * 0.28) / 9) };
};

export const needsReview = (p: Profile) =>
  p.ageGroup === "teen" ||
  p.conditions.some((c) => ["pregnancy", "postpartum", "medical", "injury", "medication"].includes(c));

export const calcBmi = (p: Profile) => Math.round((p.weight / (p.height / 100) ** 2) * 10) / 10;
