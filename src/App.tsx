import { useState } from "react";
import Landing from "@/routes/index";
import Assessment from "@/routes/assessment";
import Results from "@/routes/results";

export default function App() {
  const [page, setPage] = useState<"landing" | "assessment" | "results">("landing");
  const [result, setResult] = useState<any>(null);
  const [answers, setAnswers] = useState<any>(null);

  const navigate = (target: string, state?: any) => {
    if (state) {
      setResult(state.result);
      setAnswers(state.answers);
    }
    setPage(target as "landing" | "assessment" | "results");
  };

  return (
    <>
      {page === "landing" && <Landing onNavigate={navigate} />}
      {page === "assessment" && <Assessment onNavigate={navigate} />}
      {page === "results" && <Results result={result} answers={answers} onNavigate={navigate} />}
    </>
  );
}
