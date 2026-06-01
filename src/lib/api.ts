import axios from "axios";
import type { AssessmentAnswers, PredictionResult } from "./dosha";
import { scoreLocally } from "./dosha";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export async function predictDosha(answers: AssessmentAnswers): Promise<{
  result: PredictionResult;
  source: "api" | "local";
  error?: string;
}> {
  if (!BASE_URL) {
    return { result: scoreLocally(answers), source: "local", error: "VITE_API_BASE_URL not set" };
  }
  try {
    const { data } = await axios.post<PredictionResult>(`${BASE_URL}/predict`, answers, {
      timeout: 10_000,
      headers: { "Content-Type": "application/json" },
    });
    return { result: data, source: "api" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed";
    return { result: scoreLocally(answers), source: "local", error: message };
  }
}
