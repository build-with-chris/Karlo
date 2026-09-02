import type { ReactNode } from "react";

// Stabile IDs. Sie steuern die Zuordnung im Code, angezeigt wird immer der
// uebersetzte Titel aus lib/i18n.ts.
export type ActId = "aerial" | "cyrWheel";

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const actIcons: Record<ActId, (size: number) => ReactNode> = {
  cyrWheel: (size) => (
    <svg {...svgProps} width={size} height={size}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  aerial: (size) => (
    <svg {...svgProps} width={size} height={size}>
      <path d="M12 2v20" />
      <path d="M8 6c0 4-1 8-4 10" />
      <path d="M16 6c0 4 1 8 4 10" />
      <circle cx="12" cy="4" r="2" />
    </svg>
  ),
};

export type Act = {
  id: ActId;
  video: string;
  poster: string;
  videoTitle: string;
  /** Sekunde, ab der die Karte laeuft. Der Anfang beider Trailer ist dunkel
      und fast leer, hier steht der Artist deutlich im Bild. */
  startAt: number;
};

export const acts: Act[] = [
  {
    id: "aerial",
    video: "/Straps_Trailer.mp4",
    poster: "/StrapsPoster.webp",
    videoTitle: "Karlo Janke Aerial Straps Performance Trailer",
    startAt: 29,
  },
  {
    id: "cyrWheel",
    video: "/Cyr-Wheel_Trailer.mp4",
    poster: "/CyrWheelPoster.webp",
    videoTitle: "Karlo Janke Cyr Wheel Performance Trailer",
    startAt: 15,
  },
];

// Ein Clip ist das, was im Modal laeuft. Cyr Wheel hat zwei Trailer, zwischen
// denen die Pfeile im Modal hin und her schalten.
export type Clip = {
  id: string;
  actId: ActId;
  video: string;
  poster: string;
  videoTitle: string;
  /** Haengt hinter dem uebersetzten Act-Titel, etwa "Cyr Wheel - Trailer 2" */
  titleSuffix?: string;
  prev?: string;
  next?: string;
};

export const clips: Record<string, Clip> = {
  aerial: {
    id: "aerial",
    actId: "aerial",
    video: "/Straps_Trailer.mp4",
    poster: "/StrapsPoster.webp",
    videoTitle: "Karlo Janke Aerial Straps Performance Trailer",
  },
  cyrWheel: {
    id: "cyrWheel",
    actId: "cyrWheel",
    video: "/Cyr-Wheel_Trailer.mp4",
    poster: "/CyrWheelPoster.webp",
    videoTitle: "Karlo Janke Cyr Wheel Performance Trailer",
    next: "cyrWheelSecond",
  },
  cyrWheelSecond: {
    id: "cyrWheelSecond",
    actId: "cyrWheel",
    video: "/CyrHero.mp4",
    poster: "/HeroPoster.webp",
    videoTitle: "Karlo Janke Cyr Wheel Performance Trailer 2",
    titleSuffix: "Trailer 2",
    prev: "cyrWheel",
  },
};
