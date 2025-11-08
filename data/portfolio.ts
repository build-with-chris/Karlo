export interface PortfolioItem {
  id: number;
  title: string;
  location: string;
  year: string;
  thumb: string;
  alt: string;
  category: "Cyr Wheel" | "Aerial Straps" | "Aerial";
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Cyr Wheel Performance",
    location: "Deutschland",
    year: "2024",
    thumb: "/Cyr1.webp",
    alt: "Karlo Janke performing with Cyr Wheel",
    category: "Cyr Wheel",
  },
  {
    id: 2,
    title: "Aerial Straps",
    location: "Deutschland",
    year: "2024",
    thumb: "/Straps.webp",
    alt: "Karlo Janke performing Aerial Straps routine",
    category: "Aerial Straps",
  },
  {
    id: 3,
    title: "Cyr Wheel Artistik",
    location: "Deutschland",
    year: "2024",
    thumb: "/Cyr2.webp",
    alt: "Karlo Janke Cyr Wheel performance",
    category: "Cyr Wheel",
  },
];
