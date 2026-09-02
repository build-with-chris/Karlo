const INSTAGRAM_URL = "https://www.instagram.com/karlojanke/";
const YOUTUBE_URL = "https://www.youtube.com/@karlojanke";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const InstagramIcon = () => (
  <svg {...iconProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg {...iconProps}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

// onImage: helle Glas-Optik fuer den dunklen Hero. onSurface: dezent auf hellem Grund.
const variants = {
  onImage:
    "h-10 w-10 rounded-full border-[1.5px] border-white/25 bg-white/12 text-white backdrop-blur-sm hover:scale-105 hover:border-white/40 hover:bg-white/20",
  onSurface:
    "h-9 w-9 rounded-lg bg-earth-100 text-earth-700 hover:bg-accent hover:text-white",
} as const;

export default function SocialLinks({
  variant = "onSurface",
}: {
  variant?: keyof typeof variants;
}) {
  const linkClass = `inline-flex items-center justify-center no-underline transition-all duration-300 ${variants[variant]}`;

  return (
    <div className="flex gap-3">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Karlo Janke bei Instagram"
        className={linkClass}
      >
        <InstagramIcon />
      </a>
      <a
        href={YOUTUBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Karlo Janke bei YouTube"
        className={linkClass}
      >
        <YouTubeIcon />
      </a>
    </div>
  );
}
