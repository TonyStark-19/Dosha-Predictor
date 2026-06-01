import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-9 w-9 rounded-xl glass">
              <Leaf className="h-4 w-4 text-accent" />
            </span>
            <span className="font-display text-lg tracking-tight">
              Ayurveda<span className="text-accent">AI</span>
            </span>
          </Link>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Educational wellness tool — not medical advice
          </span>
        </div>
      </header>
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <footer className="mx-auto max-w-6xl w-full px-6 py-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} AyurvedaAI · Ancient wisdom, modern intelligence
      </footer>
    </div>
  );
}
