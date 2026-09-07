export type Lang = "en" | "np";

export const t = {
  home: { en: "Home", np: "गृह" },
  food: { en: "Food", np: "खाना" },
  workout: { en: "Workout", np: "व्यायाम" },
  body: { en: "Body", np: "शरीर" },
  progress: { en: "Progress", np: "प्रगति" },
  profile: { en: "Profile", np: "प्रोफाइल" },
  health: { en: "Health", np: "स्वास्थ्य" },
  assistant: { en: "Assistant", np: "सहायक" },
  diet: { en: "Diet Plan", np: "आहार योजना" },
  dashboard: { en: "Dashboard", np: "ड्यासबोर्ड" },
  start: { en: "Start My Journey", np: "मेरो यात्रा सुरु गर्नुहोस्" },
  createPlan: { en: "Create My Plan", np: "मेरो योजना बनाउनुहोस्" },
  welcome: { en: "Welcome", np: "स्वागत छ" },
  goodMorning: { en: "Good morning", np: "शुभ प्रभात" },
  calcCalories: {
    en: "Calculate My Total Daily Calories",
    np: "मेरो दैनिक कुल क्यालोरी गणना गर्नुहोस्",
  },
  goDashboard: { en: "Go to My Dashboard", np: "ड्यासबोर्डमा जानुहोस्" },
  viewDiet: { en: "View Diet Plan", np: "आहार योजना हेर्नुहोस्" },
  startWorkout: { en: "Start Workout", np: "व्यायाम सुरु गर्नुहोस्" },
  scanFood: { en: "Scan Food", np: "खाना स्क्यान" },
  logMeal: { en: "Log Meal", np: "खाना दर्ता" },
  exploreBody: { en: "Explore Body", np: "शरीर हेर्नुहोस्" },
  bmr: { en: "Estimated BMR", np: "अनुमानित BMR" },
  next: { en: "Next", np: "अर्को" },
  back: { en: "Back", np: "पछाडि" },
  finish: { en: "Finish", np: "सम्पन्न" },
  resources: { en: "Trusted Resources", np: "भरपर्दो स्रोतहरू" },
  disclaimer: {
    en: "General fitness information only — not medical advice. Estimates may be inaccurate. Consult a qualified professional before changing diet, exercise or medication. Avoid steroids, unsafe fat burners, detox teas, laxatives, extreme fasting and unverified supplements.",
    np: "यो सामान्य फिटनेस जानकारी मात्र हो — चिकित्सकीय सल्लाह होइन। अनुमानहरू फरक हुन सक्छन्। आहार, व्यायाम वा औषधि परिवर्तन गर्नुअघि योग्य विशेषज्ञसँग परामर्श गर्नुहोस्। स्टेरोइड, असुरक्षित फ्याट बर्नर, डिटक्स टी, ल्याक्जेटिभ, अत्यधिक उपवास र अप्रमाणित सप्लिमेन्टबाट टाढा रहनुहोस्।",
  },
  foodDisclaimer: {
    en: "Food scans and calorie values are estimates. Confirm serving size and nutrition details before saving.",
    np: "खाना स्क्यान र क्यालोरी मान अनुमान मात्र हुन्। सेभ गर्नुअघि परिमाण र पोषण विवरण पुष्टि गर्नुहोस्।",
  },
} as const;

export const tr = (key: keyof typeof t, lang: Lang) => t[key][lang];

export const resources = [
  { label: { en: "Check Calories", np: "क्यालोरी जाँच" }, url: "https://www.niddk.nih.gov/bwp" },
  {
    label: { en: "Check BMI", np: "BMI जाँच" },
    url: "https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc",
  },
  {
    label: { en: "Food Nutrition Database", np: "खाद्य पोषण डाटाबेस" },
    url: "https://fdc.nal.usda.gov/",
  },
  {
    label: { en: "Exercise Videos", np: "व्यायाम भिडियो" },
    url: "https://www.nhs.uk/live-well/exercise/",
  },
  {
    label: { en: "Health Information", np: "स्वास्थ्य जानकारी" },
    url: "https://medlineplus.gov/exerciseandphysicalfitness.html",
  },
  {
    label: { en: "Supplement Safety", np: "सप्लिमेन्ट सुरक्षा" },
    url: "https://ods.od.nih.gov/factsheets/list-all/",
  },
];

export type FoodItem = {
  id: string;
  en: string;
  np: string;
  portion: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  emoji: string;
};

export const scannedFood: FoodItem & { ingredients: string[]; confidence: number } = {
  id: "dalbhat",
  en: "Dal Bhat Tarkari",
  np: "दाल भात तरकारी",
  portion: "1 plate",
  kcal: 620,
  protein: 22,
  carbs: 98,
  fat: 14,
  fiber: 11,
  emoji: "🍛",
  ingredients: ["Steamed rice", "Lentil soup (dal)", "Seasonal vegetable curry", "Pickle", "Ghee"],
  confidence: 87,
};

export const localFoods: FoodItem[] = [
  { id: "momo", en: "Momo (10 pcs)", np: "मःम", portion: "10 pieces", kcal: 520, protein: 24, carbs: 62, fat: 18, fiber: 4, emoji: "🥟" },
  { id: "roti", en: "Roti", np: "रोटी", portion: "1 piece", kcal: 120, protein: 3, carbs: 22, fat: 2, fiber: 2, emoji: "🫓" },
  { id: "chiura", en: "Chiura", np: "चिउरा", portion: "1 cup", kcal: 180, protein: 3, carbs: 40, fat: 1, fiber: 1, emoji: "🍚" },
  { id: "selroti", en: "Sel Roti", np: "सेल रोटी", portion: "1 piece", kcal: 210, protein: 3, carbs: 33, fat: 8, fiber: 1, emoji: "🍩" },
  { id: "milktea", en: "Milk Tea", np: "दूध चिया", portion: "1 cup", kcal: 90, protein: 3, carbs: 12, fat: 3, fiber: 0, emoji: "🍵" },
  { id: "yogurt", en: "Yogurt (Dahi)", np: "दही", portion: "1 bowl", kcal: 150, protein: 8, carbs: 12, fat: 8, fiber: 0, emoji: "🥛" },
  { id: "eggs", en: "Boiled Eggs (2)", np: "उमालेको अण्डा", portion: "2 eggs", kcal: 155, protein: 13, carbs: 1, fat: 11, fiber: 0, emoji: "🥚" },
  { id: "chicken", en: "Chicken Curry", np: "कुखुराको मासु", portion: "1 bowl", kcal: 320, protein: 28, carbs: 8, fat: 20, fiber: 2, emoji: "🍗" },
  { id: "veg", en: "Mixed Vegetables", np: "तरकारी", portion: "1 bowl", kcal: 110, protein: 4, carbs: 16, fat: 4, fiber: 5, emoji: "🥦" },
  { id: "fruit", en: "Seasonal Fruit", np: "मौसमी फलफूल", portion: "1 serving", kcal: 95, protein: 1, carbs: 24, fat: 0, fiber: 3, emoji: "🍎" },
  { id: "thukpa", en: "Thukpa", np: "थुक्पा", portion: "1 bowl", kcal: 380, protein: 18, carbs: 52, fat: 10, fiber: 5, emoji: "🍜" },
];

export type Workout = {
  id: string;
  en: string;
  np: string;
  cats: string[];
  level: string;
  equipment: string;
  sets: string;
  muscles: string;
  safety: string;
  link: string;
};

export const workoutCats = [
  { id: "home", en: "Home", np: "घर" },
  { id: "gym", en: "Gym", np: "जिम" },
  { id: "calisthenics", en: "Calisthenics", np: "क्यालिस्थेनिक्स" },
  { id: "fatloss", en: "Fat Loss", np: "बोसो घटाउने" },
  { id: "muscle", en: "Muscle Gain", np: "मांसपेशी" },
  { id: "mobility", en: "Mobility", np: "लचकता" },
  { id: "lowimpact", en: "Low Impact", np: "हल्का" },
  { id: "recovery", en: "Recovery", np: "रिकभरी" },
];

export const workouts: Workout[] = [
  { id: "w1", en: "Bodyweight Squat", np: "बडीवेट स्क्वाट", cats: ["home", "calisthenics", "fatloss", "muscle"], level: "Beginner", equipment: "None", sets: "3 sets × 12 reps · 60s rest", muscles: "Quads, glutes, core", safety: "Keep knees tracking over toes; stop if knee pain.", link: "https://www.nhs.uk/live-well/exercise/" },
  { id: "w2", en: "Push-Up", np: "पुश-अप", cats: ["home", "calisthenics", "muscle"], level: "Beginner", equipment: "None", sets: "3 sets × 8–12 reps · 60s rest", muscles: "Chest, shoulders, triceps", safety: "Use knee push-ups if wrists or shoulders hurt.", link: "https://www.nhs.uk/live-well/exercise/" },
  { id: "w3", en: "Dumbbell Bench Press", np: "डम्बल बेन्च प्रेस", cats: ["gym", "muscle"], level: "Intermediate", equipment: "Dumbbells, bench", sets: "4 sets × 8 reps · 90s rest", muscles: "Chest, triceps", safety: "Use a spotter with heavy loads.", link: "https://medlineplus.gov/exerciseandphysicalfitness.html" },
  { id: "w4", en: "Lat Pulldown", np: "ल्याट पुलडाउन", cats: ["gym", "muscle"], level: "Beginner", equipment: "Cable machine", sets: "3 sets × 10 reps · 75s rest", muscles: "Back, biceps", safety: "Avoid pulling behind the neck.", link: "https://medlineplus.gov/exerciseandphysicalfitness.html" },
  { id: "w5", en: "Brisk Walk Intervals", np: "छिटो हिँडाइ", cats: ["fatloss", "lowimpact", "home"], level: "Beginner", equipment: "None", sets: "20–30 min · 2 min fast / 2 min easy", muscles: "Full body, heart", safety: "Reduce pace if breathless or dizzy.", link: "https://www.nhs.uk/live-well/exercise/" },
  { id: "w6", en: "Plank Hold", np: "प्ल्याङ्क", cats: ["home", "calisthenics", "muscle", "mobility"], level: "Beginner", equipment: "Mat", sets: "3 sets × 30s · 45s rest", muscles: "Core, shoulders", safety: "Keep hips level; avoid with acute back pain.", link: "https://www.nhs.uk/live-well/exercise/" },
  { id: "w7", en: "Pull-Up / Assisted Pull-Up", np: "पुल-अप", cats: ["calisthenics", "gym", "muscle"], level: "Advanced", equipment: "Bar or band", sets: "4 sets × 5 reps · 90s rest", muscles: "Back, biceps", safety: "Use a band for assistance; no jerking.", link: "https://www.nhs.uk/live-well/exercise/" },
  { id: "w8", en: "Hip Mobility Flow", np: "हिप मोबिलिटी", cats: ["mobility", "recovery", "lowimpact"], level: "Beginner", equipment: "Mat", sets: "2 rounds × 6 min", muscles: "Hips, lower back", safety: "Move slowly within a pain-free range.", link: "https://www.nhs.uk/live-well/exercise/" },
  { id: "w9", en: "Chair Sit-to-Stand", np: "कुर्सी उठ-बस", cats: ["lowimpact", "recovery", "home"], level: "Beginner", equipment: "Chair", sets: "3 sets × 10 reps · 60s rest", muscles: "Legs, core", safety: "Great for joint pain or early recovery.", link: "https://medlineplus.gov/exerciseandphysicalfitness.html" },
  { id: "w10", en: "Glute Bridge", np: "ग्लुट ब्रिज", cats: ["home", "muscle", "recovery", "lowimpact"], level: "Beginner", equipment: "Mat", sets: "3 sets × 15 reps · 45s rest", muscles: "Glutes, hamstrings", safety: "Squeeze glutes, don't arch the lower back.", link: "https://www.nhs.uk/live-well/exercise/" },
  { id: "w11", en: "Calf Raise", np: "काफ रेज", cats: ["home", "gym", "calisthenics"], level: "Beginner", equipment: "Step (optional)", sets: "3 sets × 15 reps · 45s rest", muscles: "Calves", safety: "Hold support for balance.", link: "https://www.nhs.uk/live-well/exercise/" },
  { id: "w12", en: "Stretch & Breathe Cooldown", np: "स्ट्रेच र सास", cats: ["recovery", "mobility", "lowimpact"], level: "Beginner", equipment: "Mat", sets: "8 min gentle flow", muscles: "Full body", safety: "Never stretch into sharp pain.", link: "https://medlineplus.gov/exerciseandphysicalfitness.html" },
];

export type BodyArea = {
  id: string;
  en: string;
  np: string;
  home: string[];
  gym: string[];
  calisthenics: string[];
};

export const bodyAreas: BodyArea[] = [
  { id: "shoulders", en: "Shoulders", np: "काँध", home: ["Wall slides", "Band lateral raise"], gym: ["Dumbbell shoulder press", "Cable lateral raise"], calisthenics: ["Pike push-up", "Wall handstand hold"] },
  { id: "chest", en: "Chest", np: "छाती", home: ["Knee push-up", "Floor press with bottles"], gym: ["Bench press", "Chest fly"], calisthenics: ["Push-up", "Dips"] },
  { id: "arms", en: "Arms", np: "पाखुरा", home: ["Bottle curls", "Chair triceps dip"], gym: ["Barbell curl", "Cable pushdown"], calisthenics: ["Close-grip push-up", "Chin-up"] },
  { id: "core", en: "Core", np: "पेट", home: ["Plank", "Dead bug"], gym: ["Cable crunch", "Hanging knee raise"], calisthenics: ["Hollow hold", "Leg raise"] },
  { id: "back", en: "Back", np: "ढाड", home: ["Superman hold", "Band row"], gym: ["Lat pulldown", "Seated row"], calisthenics: ["Pull-up", "Inverted row"] },
  { id: "glutes", en: "Glutes", np: "चाक", home: ["Glute bridge", "Step-up"], gym: ["Hip thrust", "Cable kickback"], calisthenics: ["Single-leg bridge", "Bulgarian split squat"] },
  { id: "quads", en: "Quads", np: "तिघ्रा", home: ["Bodyweight squat", "Wall sit"], gym: ["Leg press", "Leg extension"], calisthenics: ["Jump squat", "Pistol squat progression"] },
  { id: "hamstrings", en: "Hamstrings", np: "ह्यामस्ट्रिङ", home: ["Hip hinge", "Slider curl"], gym: ["Romanian deadlift", "Leg curl"], calisthenics: ["Nordic curl negative", "Single-leg RDL"] },
  { id: "calves", en: "Calves", np: "पिँडुला", home: ["Calf raise", "Stair raise"], gym: ["Seated calf raise", "Standing calf machine"], calisthenics: ["Single-leg calf raise", "Skipping"] },
];

export const healthCards = [
  { en: "Diabetes", np: "मधुमेह", tip: "Regular walking after meals and light resistance work 2–3× a week." },
  { en: "Hypertension", np: "उच्च रक्तचाप", tip: "Steady aerobic movement; avoid breath-holding during lifts." },
  { en: "Obesity", np: "मोटोपन", tip: "Low-impact cardio, gradual volume increase, joint-friendly options." },
  { en: "Asthma / COPD", np: "दम / सीओपीडी", tip: "Warm up longer, keep intervals short, carry prescribed inhaler." },
  { en: "Arthritis", np: "बाथ", tip: "Range-of-motion work, water-based movement, avoid painful ranges." },
  { en: "Back / Knee Pain", np: "ढाड / घुँडा दुखाइ", tip: "Core stability and hip strength within a pain-free range." },
  { en: "Osteoporosis", np: "अस्थिक्षय", tip: "Gentle weight-bearing and balance drills; avoid spinal flexion loading." },
  { en: "PCOS", np: "पीसीओएस", tip: "Mix of resistance training and walking supports energy and mood." },
  { en: "Pregnancy / Postpartum", np: "गर्भावस्था / सुत्केरी", tip: "Breathing, pelvic floor and gentle strength as cleared by your clinician." },
  { en: "Menopause", np: "रजोनिवृत्ति", tip: "Resistance training and balance work support bone and muscle." },
  { en: "Anxiety / Depression", np: "चिन्ता / डिप्रेसन", tip: "Short daily movement and outdoor walks; consistency over intensity." },
  { en: "Heart Conditions", np: "मुटु सम्बन्धी", tip: "Follow prescribed limits; stop with chest pain or dizziness." },
  { en: "Disability", np: "अपाङ्गता", tip: "Seated and adapted movement patterns with supported equipment." },
  { en: "Injury Recovery", np: "चोटपटक रिकभरी", tip: "Progress load slowly and follow your rehab plan." },
];

export const assistantChat = [
  {
    q: { en: "How many calories should I eat?", np: "मैले कति क्यालोरी खानुपर्छ?" },
    a: {
      en: "Your dashboard shows an estimate based on your profile. It is a starting point — adjust slowly and check with a professional if you have a medical condition.",
      np: "तपाईंको ड्यासबोर्डमा प्रोफाइल अनुसार अनुमान देखिन्छ। यो सुरुवात बिन्दु मात्र हो — बिस्तारै समायोजन गर्नुहोस् र स्वास्थ्य समस्या भए विशेषज्ञसँग परामर्श गर्नुहोस्।",
    },
  },
  {
    q: { en: "Is dal bhat good for fat loss?", np: "दाल भात बोसो घटाउन राम्रो हो?" },
    a: {
      en: "Yes, with balance: keep rice moderate, add more dal, vegetables and a protein source, and use less oil.",
      np: "हो, सन्तुलनसहित: भात मध्यम राख्नुहोस्, दाल, तरकारी र प्रोटिन बढाउनुहोस्, तेल कम गर्नुहोस्।",
    },
  },
  {
    q: { en: "Can I train with knee pain?", np: "घुँडा दुख्दा व्यायाम गर्न मिल्छ?" },
    a: {
      en: "Choose low-impact options such as chair sit-to-stand, glute bridges and walking, and get clearance from a clinician first.",
      np: "कुर्सी उठ-बस, ग्लुट ब्रिज र हिँडाइ जस्ता हल्का विकल्प रोज्नुहोस्, र पहिले चिकित्सकको सल्लाह लिनुहोस्।",
    },
  },
];

export const dietPlans = [
  {
    id: "fatloss",
    en: "Fat Loss",
    np: "बोसो घटाउने",
    meals: ["Breakfast: 2 eggs + 1 roti + milk tea (no sugar)", "Lunch: Dal bhat with extra tarkari, moderate rice", "Snack: Yogurt + seasonal fruit", "Dinner: Thukpa with vegetables and chicken"],
    water: "2.5–3 L per day",
    subs: ["Sel roti → chiura with yogurt", "Fried momo → steamed momo"],
    grocery: ["Lentils", "Green vegetables", "Eggs", "Yogurt", "Chicken", "Fruit"],
  },
  {
    id: "muscle",
    en: "Muscle Gain",
    np: "मांसपेशी बढाउने",
    meals: ["Breakfast: 3 eggs + 2 roti + milk", "Lunch: Dal bhat + chicken curry", "Snack: Chiura + yogurt + banana", "Dinner: Rice + paneer/soya + vegetables"],
    water: "3–3.5 L per day",
    subs: ["Milk tea → plain milk", "Add an extra dal serving for protein"],
    grocery: ["Eggs", "Milk", "Chicken or soya", "Rice", "Peanuts", "Bananas"],
  },
  {
    id: "gain",
    en: "Healthy Weight Gain",
    np: "स्वस्थ तौल बढाउने",
    meals: ["Breakfast: Sel roti + milk + eggs", "Lunch: Dal bhat with ghee and meat/soya", "Snack: Peanut chiura + fruit", "Dinner: Thukpa + yogurt"],
    water: "3 L per day",
    subs: ["Add nuts and ghee for calorie-dense energy"],
    grocery: ["Ghee", "Nuts", "Rice", "Milk", "Eggs", "Fruit"],
  },
  {
    id: "maintain",
    en: "Maintenance",
    np: "सन्तुलन",
    meals: ["Breakfast: Roti + vegetables + tea", "Lunch: Balanced dal bhat tarkari", "Snack: Fruit or yogurt", "Dinner: Light thukpa or soup with roti"],
    water: "2.5–3 L per day",
    subs: ["Swap deep-fried snacks for steamed or roasted"],
    grocery: ["Vegetables", "Lentils", "Rice", "Yogurt", "Fruit"],
  },
];

export const weightSeries = [
  { d: "Wk 1", weight: 72.4, calories: 2100, protein: 88, water: 2.2, workouts: 3, steps: 6400, sleep: 6.8, mood: 6, waist: 88 },
  { d: "Wk 2", weight: 72.0, calories: 2050, protein: 95, water: 2.4, workouts: 4, steps: 7200, sleep: 7.1, mood: 7, waist: 87.5 },
  { d: "Wk 3", weight: 71.5, calories: 1980, protein: 102, water: 2.6, workouts: 4, steps: 7900, sleep: 7.0, mood: 7, waist: 87 },
  { d: "Wk 4", weight: 71.1, calories: 2020, protein: 108, water: 2.8, workouts: 5, steps: 8600, sleep: 7.4, mood: 8, waist: 86.2 },
  { d: "Wk 5", weight: 70.6, calories: 1960, protein: 112, water: 3.0, workouts: 5, steps: 9100, sleep: 7.5, mood: 8, waist: 85.8 },
  { d: "Wk 6", weight: 70.2, calories: 1990, protein: 115, water: 3.0, workouts: 5, steps: 9400, sleep: 7.6, mood: 8, waist: 85.1 },
];
