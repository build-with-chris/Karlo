export interface PortfolioItem {
  id: number;
  title: string;
  location: string;
  year: string;
  thumb: string;
  alt: string;
  category: "Cyr Wheel" | "Aerial";
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Festival Cirque du Monde",
    location: "Paris, France",
    year: "2024",
    thumb: "/portfolio/performance-01.jpg",
    alt: "Karlo performing with Cyr Wheel at Festival Cirque du Monde in Paris",
    category: "Cyr Wheel",
  },
  {
    id: 2,
    title: "Aerial Silk Solo",
    location: "Berlin, Germany",
    year: "2024",
    thumb: "/portfolio/performance-02.jpg",
    alt: "Karlo performing aerial silk routine in Berlin theater",
    category: "Aerial",
  },
  {
    id: 3,
    title: "Corporate Gala Event",
    location: "Zürich, Switzerland",
    year: "2023",
    thumb: "/portfolio/performance-03.jpg",
    alt: "Cyr Wheel performance at corporate gala in Zürich",
    category: "Cyr Wheel",
  },
  {
    id: 4,
    title: "Street Performance Festival",
    location: "Barcelona, Spain",
    year: "2023",
    thumb: "/portfolio/performance-04.jpg",
    alt: "Karlo performing at street festival in Barcelona",
    category: "Cyr Wheel",
  },
  {
    id: 5,
    title: "Vertical Dance",
    location: "Vienna, Austria",
    year: "2023",
    thumb: "/portfolio/performance-05.jpg",
    alt: "Aerial vertical dance performance in Vienna",
    category: "Aerial",
  },
  {
    id: 6,
    title: "Theater Production",
    location: "Amsterdam, Netherlands",
    year: "2022",
    thumb: "/portfolio/performance-06.jpg",
    alt: "Karlo in theater production featuring aerial artistry in Amsterdam",
    category: "Aerial",
  },
  {
    id: 7,
    title: "Cirque Éloize Guest Performance",
    location: "Montreal, Canada",
    year: "2021",
    thumb: "/portfolio/performance-07.jpg",
    alt: "Guest performance with Cirque Éloize in Montreal",
    category: "Cyr Wheel",
  },
  {
    id: 8,
    title: "Grand Opera Opening",
    location: "Milan, Italy",
    year: "2022",
    thumb: "/portfolio/performance-08.jpg",
    alt: "Opening performance at Grand Opera in Milan",
    category: "Aerial",
  },
  {
    id: 9,
    title: "Contemporary Circus Festival",
    location: "London, UK",
    year: "2023",
    thumb: "/portfolio/performance-09.jpg",
    alt: "Cyr Wheel performance at contemporary circus festival in London",
    category: "Cyr Wheel",
  },
  {
    id: 10,
    title: "Rooftop Performance",
    location: "Dubai, UAE",
    year: "2024",
    thumb: "/portfolio/performance-10.jpg",
    alt: "Aerial performance on rooftop venue in Dubai",
    category: "Aerial",
  },
];
