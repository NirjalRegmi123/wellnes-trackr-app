# My Fitness Journey

# One-pass, low-credit Lovable prompt — My Fitness Journey

Build this project **in one implementation pass**. Do not ask follow-up questions, do not split work into phases, and do not wait for approval. Deliver a polished, complete, static frontend prototype that prioritizes working navigation and core user flow over unnecessary complexity.

If the available Lovable credits or generation budget are limited, keep every required feature as a compact screen, tab, drawer, modal, or data-driven card. Do **not** remove the core onboarding → calorie summary → dashboard → food scan flow. Use elegant static placeholders for secondary features rather than expensive integrations.

## App and technical scope

Create **My Fitness Journey**, a premium bilingual English / नेपाली mobile-first fitness website.

- Use React + TypeScript + Vite + Tailwind CSS and shadcn/ui-style components.
- Static frontend only: no backend, database, authentication, serverless functions, subscriptions, paid APIs, or real AI/camera scanning.
- Store the user profile, food log, language selection, and demo progress in `localStorage`.
- Use a hash router so the app works on GitHub Pages.
- Use a small `data.ts` file for all sample foods, workouts, body-map details, translations, and charts.
- Use Lucide icons and gradient/photo placeholders; do not generate custom illustrations or use an image-generation service.
- Do not create dead buttons or `#` links. Buttons must navigate, update demo state, open a modal/drawer, or open a trusted resource in a new tab.
- Create a Vite-ready project that builds to `dist` with `npm run build`.

## Visual system

- Brand: supportive, modern, safe, non-judgmental.
- Palette: white, navy, green, warm orange, and small purple-gradient accents.
- Use rounded cards, light glass panels, soft shadows, clear typography, progress rings, and clean charts.
- Create a responsive desktop layout and mobile bottom navigation: Home, Food, Workout, Body, Progress, Profile.
- Header must have a functional English / नेपाली toggle; translate main navigation, headings, buttons, and sample messages.

## Build these core screens in one pass

### 1. Landing screen

- Title: **Your Health. Your Strength. Your Journey.**
- Nepali subtitle: **तपाईंको स्वास्थ्य, तपाईंको शक्ति, तपाईंको यात्रा।**
- Buttons: Start My Journey and Create My Plan.
- Compact feature cards: Daily Calories, Scan Food, BMR/BMI, Workouts, Body Map, Progress, Fitness Assistant.
- Add Home Workout, Gym Workout, Calisthenics, trusted resources, and a safety disclaimer as sections on this same page.

### 2. Onboarding screen — ask for information first

Collect information in a simple 2–3 step form:

- Name (required)
- Age group, optional gender, height, weight, activity level
- Goal: Lose Fat, Gain Muscle, Gain Healthy Weight, Stay Fit, Improve Stamina
- Workout location and available equipment
- Food preference and language
- Health conditions/injury/pain/pregnancy/postpartum checkboxes
- Available workout time

Never hard-code a user name. Save the entered name in localStorage.

### 3. Personal summary — required core flow

After onboarding, show one summary page using the user’s actual name:

**Welcome, [User Name]!**

Display height, weight, activity level, goal, equipment, and an **Estimated BMR** card.

Below BMR, put the largest button on the page:

**Calculate My Total Daily Calories**

On click, reveal an estimated daily calorie requirement, estimated protein target, and water target. Use labels such as “estimate,” never “you must eat.” For child, pregnancy, medical-condition, injury-recovery, or medication selections, show a professional-review notice instead of an aggressive target.

Add buttons: Go to My Dashboard, View Diet Plan, and Start Workout.

### 4. Dashboard — required core flow

Use the entered name everywhere, for example: **Good morning, [User Name]!**

Show:

- Height, weight, BMR, and daily calorie estimate
- Calories eaten, calories remaining, protein, carbs, fats, water
- A circular calorie ring
- Today’s workout, streak, steps, sleep, mood, energy, and small weight chart
- Quick actions: Scan Food, Log Meal, Start Workout, Explore Body, Progress

Use mock starter values, but update the calories and macros when food is added.

### 5. Food tracker and simulated scan — required core flow

Create one Food page with tabs: Meal Photo, Barcode, Label, Search, and Nepali Foods.

Use a simulated scan result for **Dal Bhat Tarkari / दाल भात तरकारी**:

- 1 plate, 620 kcal, 22g protein, 98g carbs, 14g fat, 11g fiber
- Include food image placeholder, portion selector, ingredients, allergen placeholder, meal type, and confidence tag
- Buttons: Edit Portion, Add to Today’s Calories, Save Favourite, View Nutrition Online, Search This Food Online

Adding food must update the dashboard’s daily calories, remaining calories, macro totals, meal history, and progress ring.

Include a small local-food list: momo, roti, chiura, sel roti, milk tea, yogurt, eggs, chicken curry, vegetables, fruit, and thukpa.

Show: “Food scans and calorie values are estimates. Confirm serving size and nutrition details before saving.”

### 6. Workouts and Body Map

Create one Workout page with filter tabs: Home, Gym, Calisthenics, Fat Loss, Muscle Gain, Mobility, Low Impact, Recovery.

Use reusable data-driven workout cards with English/Nepali names, level, equipment, sets/reps/rest, muscle targets, safety note, and Learn More link.

Create one compact interactive Body Map page. Use simple front/back SVG-style body silhouettes; do not use expensive custom artwork. Include Male, Female, and Neutral toggles. Clickable areas: shoulders, chest, arms, core, back, glutes, quads, hamstrings, calves. Clicking an area opens a drawer with sample Home/Gym/Calisthenics exercises and Save to My Workout.

### 7. Progress, health, and assistant

- Progress page: daily/weekly/monthly mock charts for weight, calories, protein, water, workouts, steps, sleep, mood, and waist measurement.
- Health page: compact informational cards for diabetes, hypertension, obesity, asthma/COPD, arthritis, back/knee pain, osteoporosis, PCOS, pregnancy/postpartum, menopause, anxiety/depression, heart conditions, disability, and recovery. Use general movement ideas only and a “Professional clearance recommended” badge.
- Assistant page: simple bilingual chat preview with three sample questions and answers; label it “General fitness guidance only — not medical advice.”

### 8. Diet, resources, and safety

- Create an optional Diet Plan drawer/page with fat loss, muscle gain, healthy weight gain, and maintenance tabs. Include Nepali-friendly sample meals, water target, substitutions, and a grocery list.
- Add trusted external buttons that open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`:
  - Check Calories: https://www.niddk.nih.gov/bwp
  - Check BMI: https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc
  - Food Nutrition Database: https://fdc.nal.usda.gov/
  - Exercise Videos: https://www.nhs.uk/live-well/exercise/
  - Health Information: https://medlineplus.gov/exerciseandphysicalfitness.html
  - Supplement Safety: https://ods.od.nih.gov/factsheets/list-all/
- Add the safety disclaimer to the footer and health/food pages. Warn against steroids, unsafe fat burners, detox teas, laxatives, extreme fasting, unverified supplements, and using fitness content as medical treatment.

## GitHub Pages CI artifact — create this exact file

Create `.github/workflows/deploy-pages.yml` with the following content:

```yaml
name: Build and deploy static app to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build -- --base=/${{ github.event.repository.name }}/
      - uses: actions/upload-artifact@v4
        with:
          name: fitness-prototype-dist
          path: dist
          if-no-files-found: error
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Final delivery rule

Finish the full prototype in this one pass. Keep the code simple, reusable, data-driven, and visually polished. If any optional feature would increase complexity, implement it as a well-designed static card, tab, modal, or mock interaction instead of omitting it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2872f522-df2b-4603-ac38-a998f1ea5fc8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
