"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Respektiert die Systemeinstellung "Bewegung reduzieren". Die Regel in
 * globals.css greift nur fuer CSS-Animationen, alle Einblendungen der Seite
 * laufen aber ueber framer-motion.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
