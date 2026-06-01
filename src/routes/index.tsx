import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Leaf, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AyurvedaAI — Discover your Dosha" },
      { name: "description", content: "An AI-guided Ayurvedic assessment that reveals your dominant Dosha and gives personalized wellness recommendations." },
      { property: "og:title", content: "AyurvedaAI — Discover your Dosha" },
      { property: "og:description", content: "AI-guided Ayurvedic assessment with personalized wellness recommendations." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-accent"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Trained on 5,000+ Ayurvedic profiles · 87% accuracy
            </motion.div>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              Discover the <span className="text-accent">elements</span> that shape you.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              AyurvedaAI uses a machine-learning model to predict your dominant
              Dosha — Vata, Pitta, or Kapha — and turns it into clear,
              personalized wellness guidance in under two minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/assessment"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-accent-foreground font-medium hover:brightness-105 transition"
              >
                Start your assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="text-xs text-muted-foreground">
                11 questions · ~90 seconds · no signup
              </span>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-3 max-w-xl">
              {[
                { icon: Brain, title: "Explainable", body: "See the traits that shaped your result." },
                { icon: Leaf, title: "Personalized", body: "Diet, sleep, and movement guidance." },
                { icon: ShieldCheck, title: "Private", body: "No account, no tracking." },
              ].map((f) => (
                <div key={f.title} className="glass rounded-2xl p-4">
                  <f.icon className="h-4 w-4 text-accent" />
                  <div className="mt-2 text-sm font-medium">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.body}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="relative"
          >
            <div className="glass rounded-[2rem] p-6 sm:p-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Today's reading</div>
              <div className="mt-3 font-display text-4xl">Kapha · 68%</div>
              <div className="text-sm text-muted-foreground">Earth & Water — steady, calm, grounded</div>
              <div className="mt-6 space-y-3">
                {[
                  { dosha: "Kapha", pct: 68, color: "var(--kapha)" },
                  { dosha: "Pitta", pct: 22, color: "var(--pitta)" },
                  { dosha: "Vata",  pct: 10, color: "var(--vata)"  },
                ].map((b) => (
                  <div key={b.dosha}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span>{b.dosha}</span><span>{b.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${b.pct}%` }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: b.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-white/5 p-4 text-sm">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Why this prediction
                </div>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li>✓ Slow, steady pace of work</li>
                  <li>✓ Deep sleep, hard to wake</li>
                  <li>✓ Heavy joints, sturdy frame</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
