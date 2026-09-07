/**
 * Karlo Design System
 *
 * Zentrale Definition für Farben, Abstände, Radien und weitere Design-Tokens.
 * Diese Datei ermöglicht konsistente Design-Entscheidungen über die gesamte App.
 */

// Farbpalette "Earth" - Warme, natürliche Töne
export const colors = {
  earth: {
    50: "#faf7f2",   // Hellster Ton - Hintergrund
    100: "#efe8dc",  // Heller Ton - Sekundärer Hintergrund
    300: "#cdbba4",  // Mittlerer Ton - Borders, Subtle UI
    500: "#9b7f62",  // Basis Ton - Hover States
    700: "#6e5742",  // Dunkler Ton - Primärer Text
  },
  accent: "#b08a5b", // Akzentfarbe - CTAs, Links, Highlights
  white: "#ffffff",
  black: "#000000",
} as const;

// Spacing Scale - 8px Basis-System
export const spacing = {
  xs: "0.5rem",    // 8px
  sm: "0.75rem",   // 12px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
  "3xl": "4rem",   // 64px
  "4xl": "6rem",   // 96px
  "5xl": "8rem",   // 128px

  // Spezielle Spacing-Werte
  container: "4.5rem",  // 72px - Standard Container Padding
  section: "8rem",      // 128px - Vertikaler Section Abstand
} as const;

// Border Radius - Weiche, moderne Rundungen
export const radius = {
  none: "0",
  sm: "0.25rem",   // 4px
  base: "0.5rem",  // 8px
  md: "0.75rem",   // 12px
  lg: "1rem",      // 16px
  xl: "1.5rem",    // 24px
  "2xl": "2rem",   // 32px
  full: "9999px",  // Vollständig rund
} as const;

// Typography Scale
export const fontSize = {
  xs: "0.75rem",     // 12px
  sm: "0.875rem",    // 14px
  base: "1rem",      // 16px
  lg: "1.125rem",    // 18px
  xl: "1.25rem",     // 20px
  "2xl": "1.5rem",   // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem",  // 36px
  "5xl": "3rem",     // 48px
  "6xl": "3.75rem",  // 60px
  "7xl": "4.5rem",   // 72px
} as const;

// Font Weights
export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// Line Heights
export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Letter Spacing
export const letterSpacing = {
  tighter: "-0.02em",
  tight: "-0.01em",
  normal: "0",
  wide: "0.01em",
  wider: "0.02em",
  widest: "0.05em",
} as const;

// Shadows - Subtile Schatten für Tiefe
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  none: "none",
} as const;

// Transitions
export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  slower: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// Breakpoints - Mobile First
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Container Max Widths
export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px",
  full: "100%",
} as const;

// Z-Index Scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

// Helper Funktionen
export const theme = {
  colors,
  spacing,
  radius,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  shadows,
  transitions,
  breakpoints,
  containers,
  zIndex,
} as const;

// Type Exports für TypeScript
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type FontSize = typeof fontSize;
export type Theme = typeof theme;

export default theme;
