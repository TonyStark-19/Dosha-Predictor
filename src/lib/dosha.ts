export type Dosha = "Vata" | "Pitta" | "Kapha";

export interface AssessmentAnswers {
  bodyFrame: string;
  paceOfWork: string;
  bodyEnergy: string;
  hunger: string;
  hair: string;
  sleep: string;
  mentalActivity: string;
  voice: string;
  joints: string;
  skin: string;
  bodyOdor: string;
}

export interface QuestionOption {
  value: string;
  label: string;
  dosha: Dosha;
}

export interface Question {
  id: keyof AssessmentAnswers;
  title: string;
  hint?: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: "bodyFrame",
    title: "How would you describe your body frame?",
    hint: "Think about your natural build, not current weight.",
    options: [
      { value: "thin", label: "Thin and Lean", dosha: "Vata" },
      { value: "medium", label: "Medium", dosha: "Pitta" },
      { value: "well-built", label: "Well Built", dosha: "Kapha" },
    ],
  },
  {
    id: "paceOfWork",
    title: "What pace do you usually work at?",
    options: [
      { value: "fast", label: "Fast", dosha: "Vata" },
      { value: "medium", label: "Medium", dosha: "Pitta" },
      { value: "slow", label: "Slow & Steady", dosha: "Kapha" },
    ],
  },
  {
    id: "bodyEnergy",
    title: "How is your body's energy through the day?",
    options: [
      { value: "low", label: "Comes in bursts, then dips", dosha: "Vata" },
      { value: "high", label: "Intense and focused", dosha: "Pitta" },
      { value: "medium", label: "Steady and enduring", dosha: "Kapha" },
    ],
  },
  {
    id: "hunger",
    title: "How regular is your hunger?",
    options: [
      { value: "skips", label: "I often skip meals", dosha: "Vata" },
      { value: "sharp", label: "Sharp, must eat on time", dosha: "Pitta" },
      { value: "regular", label: "Regular but mild", dosha: "Kapha" },
    ],
  },
  {
    id: "hair",
    title: "What's your hair like?",
    options: [
      { value: "dry", label: "Dry & frizzy", dosha: "Vata" },
      { value: "normal", label: "Fine, normal", dosha: "Pitta" },
      { value: "greasy", label: "Thick & oily", dosha: "Kapha" },
    ],
  },
  {
    id: "sleep",
    title: "How do you sleep?",
    options: [
      { value: "light", label: "Light sleeper, easily disturbed", dosha: "Vata" },
      { value: "normal", label: "Moderate, 6–7 hrs", dosha: "Pitta" },
      { value: "deep", label: "Deep, hard to wake", dosha: "Kapha" },
    ],
  },
  {
    id: "mentalActivity",
    title: "How is your mind most days?",
    options: [
      { value: "restless", label: "Restless, lots of ideas", dosha: "Vata" },
      { value: "active", label: "Sharp and driven", dosha: "Pitta" },
      { value: "stable", label: "Calm and stable", dosha: "Kapha" },
    ],
  },
  {
    id: "voice",
    title: "What's your voice like?",
    options: [
      { value: "fast", label: "Fast & light", dosha: "Vata" },
      { value: "rough", label: "Clear & assertive", dosha: "Pitta" },
      { value: "deep", label: "Deep & slow", dosha: "Kapha" },
    ],
  },
  {
    id: "joints",
    title: "How do your joints feel?",
    options: [
      { value: "light", label: "Light, sometimes cracking", dosha: "Vata" },
      { value: "medium", label: "Medium, flexible", dosha: "Pitta" },
      { value: "heavy", label: "Heavy and sturdy", dosha: "Kapha" },
    ],
  },
  {
    id: "skin",
    title: "How would you describe your skin?",
    options: [
      { value: "dry", label: "Dry", dosha: "Vata" },
      { value: "rough", label: "Warm, prone to redness", dosha: "Pitta" },
      { value: "oily", label: "Soft & oily", dosha: "Kapha" },
      { value: "soft", label: "Smooth & cool", dosha: "Kapha" },
    ],
  },
  {
    id: "bodyOdor",
    title: "How is your natural body odor?",
    options: [
      { value: "mild", label: "Mild / barely any", dosha: "Vata" },
      { value: "strong", label: "Strong / sharp", dosha: "Pitta" },
      { value: "moderate", label: "Moderate / earthy", dosha: "Kapha" },
    ],
  },
];

export interface PredictionResult {
  primaryDosha: Dosha;
  confidence: number;
  secondaryDosha: Dosha;
  secondaryConfidence: number;
}

// Local fallback scoring so the app stays useful when the backend is unreachable.
export function scoreLocally(answers: Partial<AssessmentAnswers>): PredictionResult {
  const tally: Record<Dosha, number> = { Vata: 0, Pitta: 0, Kapha: 0 };
  for (const q of QUESTIONS) {
    const picked = answers[q.id];
    const opt = q.options.find((o) => o.value === picked);
    if (opt) tally[opt.dosha] += 1;
  }
  const total = Object.values(tally).reduce((a, b) => a + b, 0) || 1;
  const ranked = (Object.entries(tally) as [Dosha, number][])
    .map(([d, n]) => ({ d, p: n / total }))
    .sort((a, b) => b.p - a.p);
  return {
    primaryDosha: ranked[0].d,
    confidence: ranked[0].p,
    secondaryDosha: ranked[1].d,
    secondaryConfidence: ranked[1].p,
  };
}

export const DOSHA_META: Record<Dosha, {
  tagline: string;
  element: string;
  color: string;
  description: string;
  recommendations: string[];
}> = {
  Vata: {
    tagline: "Air & Ether",
    element: "Movement, creativity, change",
    color: "var(--vata)",
    description:
      "Vata energy is light, quick, and creative. When balanced you're imaginative and adaptable; when aggravated, anxious and scattered.",
    recommendations: [
      "Keep a consistent daily routine",
      "Favor warm, cooked, grounding meals",
      "Prioritize a steady sleep schedule",
      "Practice meditation and gentle yoga",
    ],
  },
  Pitta: {
    tagline: "Fire & Water",
    element: "Transformation, focus, drive",
    color: "var(--pitta)",
    description:
      "Pitta energy is sharp, focused, and ambitious. When balanced you're a confident leader; when aggravated, irritable and overheated.",
    recommendations: [
      "Favor cooling foods (cucumber, mint, leafy greens)",
      "Reduce spicy, fried, and fermented foods",
      "Build stress-management rituals into the day",
      "Stay well hydrated, especially in heat",
    ],
  },
  Kapha: {
    tagline: "Earth & Water",
    element: "Stability, strength, calm",
    color: "var(--kapha)",
    description:
      "Kapha energy is steady, strong, and grounded. When balanced you're calm and loving; when aggravated, sluggish and resistant to change.",
    recommendations: [
      "Get regular, energetic exercise",
      "Favor light, warm, spiced meals",
      "Keep an active, varied lifestyle",
      "Avoid oversleeping and daytime naps",
    ],
  },
};

export function topTraits(answers: Partial<AssessmentAnswers>, dosha: Dosha, n = 4) {
  const out: { question: string; label: string }[] = [];
  for (const q of QUESTIONS) {
    const picked = answers[q.id];
    const opt = q.options.find((o) => o.value === picked);
    if (opt && opt.dosha === dosha) {
      out.push({ question: q.title, label: opt.label });
    }
    if (out.length >= n) break;
  }
  return out;
}
