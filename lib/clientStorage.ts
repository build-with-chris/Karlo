/**
 * Lesezugriff auf den localStorage fuer useSyncExternalStore.
 *
 * Der localStorage liegt ausserhalb von React. Liest man ihn in einem Effect
 * aus und schreibt das Ergebnis in den State, rendert die Komponente zweimal.
 * useSyncExternalStore liest ihn direkt: beim Serverrendern und beim Hydrieren
 * gilt der Serverwert, danach der gespeicherte.
 */

const listeners = new Set<() => void>();

/** Meldet einen Leser an. Das storage-Event deckt die anderen Tabs ab. */
export function subscribeToStorage(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/**
 * Schreibt einen Wert und benachrichtigt die Leser im eigenen Tab. Das
 * storage-Event feuert nur in den anderen Tabs, daher der eigene Aufruf.
 */
export function writeToStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  listeners.forEach((listener) => listener());
}
