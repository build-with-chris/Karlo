"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Liefert auf dem Server false und im Browser ab dem ersten Render true.
 * Ersatz fuer das uebliche setState im Mount-Effekt, das eine zweite
 * Renderrunde ausloest.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
