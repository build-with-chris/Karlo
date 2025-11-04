# Karlo – Artist Portfolio

Professionelle Portfolio-Website für Karlo, einen international renommierten Cyr-Wheel- und Luftartisten. Die Website präsentiert seine Performances mit elegantem Design und fokussiert auf Präzision, Timing und künstlerischen Ausdruck.

## 🎨 Design System

### Farbpalette

```css
--color-earth-50:  #faf7f2  /* Hintergrund, sehr hell */
--color-earth-100: #efe8dc  /* Hintergrund, Karten */
--color-earth-200: #e0d5c4  /* Borders, dezente Elemente */
--color-earth-300: #cdbba4  /* Borders, Trennlinien */
--color-earth-500: #9b7f62  /* Sekundärfarbe, Hover */
--color-earth-700: #6e5742  /* Primärtext, Überschriften */
--color-accent:    #b08a5b  /* Akzentfarbe, Links, CTAs */
```

**Farbverwendung:**
- Hintergründe: `earth-50` (Haupthintergrund), `earth-100` (Karten/Bereiche)
- Text: `earth-700` (Haupttext), `earth-700/80-90` (sekundärer Text)
- Akzente: `accent` (Buttons, Links, Hervorhebungen)
- Borders: `earth-200`, `earth-300`

### Typografie

**Schriftarten:**
- **Libre Baskerville** (Serif): Überschriften H1-H6
- **Inter** (Sans-serif): Fließtext, UI-Elemente

**Größenskala:**
```css
H1: clamp(2.5rem, 5vw, 3.75rem)   /* 40-60px */
H2: clamp(2rem, 4vw, 3rem)        /* 32-48px */
H3: clamp(1.5rem, 3vw, 2.25rem)   /* 24-36px */
H4: clamp(1.25rem, 2vw, 1.875rem) /* 20-30px */
P:  clamp(1rem, 1.5vw, 1.125rem)  /* 16-18px */
```

### Spacing-System

```css
--spacing-xs:   0.5rem  /* 8px  - kleine Abstände */
--spacing-sm:   1rem    /* 16px - Standard-Abstände */
--spacing-md:   1.5rem  /* 24px - mittlere Abstände */
--spacing-lg:   2rem    /* 32px - große Abstände */
--spacing-xl:   3rem    /* 48px - sehr große Abstände */
--spacing-2xl:  4rem    /* 64px - Section-Padding mobil */
--spacing-3xl:  6rem    /* 96px - Section-Padding Tablet */
--spacing-4xl:  8rem    /* 128px - Section-Padding Desktop */
```

### Schatten-System

```css
--shadow-sm:  Subtile Schatten für kleine Elemente
--shadow-md:  Standard-Schatten für Karten
--shadow-lg:  Hover-Zustand für Karten
--shadow-xl:  Modals, Lightboxes
--shadow-2xl: Hervorgehobene Elemente
```

## 🧩 Komponenten

### Buttons

**Varianten:**

1. **Primary** (`.btn-primary`)
   - Hintergrund: `accent`
   - Hover: `earth-500`
   - Verwendung: Primäre CTAs

2. **Secondary** (`.btn-secondary`)
   - Hintergrund: `earth-100`
   - Hover: `earth-300`
   - Verwendung: Sekundäre Aktionen

3. **Outline** (`.btn-outline`)
   - Border: `accent`
   - Hover: Gefüllt mit `accent`
   - Verwendung: Tertiäre Aktionen, Ghost-Buttons

**Anatomie:**
```css
padding: 0.75rem 1.5rem
border-radius: 0.5rem
font-weight: 500
transition: all 200ms
```

### Cards

**Standard Card** (`.card`)
```css
background: white
border-radius: 0.75rem
shadow: shadow-md
border: 1px solid earth-200
padding: 1.5rem (mobil), 2rem (desktop)
hover: shadow-lg
```

**Verwendung:** Acts, Contact Info, Agency-Hinweis

### Container & Sections

**Container** (`.container`)
```css
max-width: 1280px
padding: 1rem (mobil), 1.5rem (tablet), 2rem (desktop)
margin: auto
```

**Section Spacing** (`.section`)
```css
padding-top/bottom:
  4rem (mobil)
  6rem (tablet)
  8rem (desktop)
```

## 📐 Komponenten-Struktur

### Navigation
- **Datei:** `components/Navigation.tsx`
- Sticky Navigation mit Scroll-Effekt
- Aktive Section-Tracking mit IntersectionObserver
- `aria-current` für aktuelle Section
- Smooth Scroll zu Sections

### Hero
- **Datei:** `components/Hero.tsx`
- Vollbild-Hero mit Background-Image
- Englisches Zitat, deutsche Kurzbeschreibung
- CTAs zu Portfolio und Kontakt
- Social Media Icons (Instagram, YouTube)
- Scroll-Indicator

### About
- **Datei:** `components/About.tsx`
- Zweispaltig: Portrait + Biografie
- Timeline mit 5 Meilensteinen
- Werte: Präzision, Timing, Kontrolle

### Acts
- **Datei:** `components/Acts.tsx`
- Zwei Cards: Cyr Wheel + Aerial
- Icons, Beschreibungen, Key Facts
- Tech-Rider Hinweis
- Custom Acts Callout

### Portfolio
- **Datei:** `components/Portfolio.tsx`
- Responsive Grid: 2 (mobil) → 3 (tablet) → 4 (desktop) Spalten
- Hover-Effekte: Scale, Shadow, Overlay
- Lightbox-Modal für Detailansicht
- Daten aus `data/portfolio.ts`

### Contact
- **Datei:** `components/Contact.tsx`
- Formular mit Client-Side Validation
- DSGVO-Checkbox mit Einwilligung
- Kontaktblöcke: Email, Social Media
- Agency-Hinweis

### Footer
- **Datei:** `components/SiteFooter.tsx`
- Minimal: Copyright + Links
- Impressum & Datenschutz

## ♿ Accessibility

### Implementiert:

- ✅ **Skip-Link** zum Hauptinhalt
- ✅ **aria-current** in Navigation
- ✅ **aria-labels** für alle Icons und Buttons
- ✅ **aria-invalid/aria-describedby** für Formular-Validierung
- ✅ **Fokus-Management** mit sichtbaren Focus-Rings
- ✅ **Tastaturnavigation** für alle interaktiven Elemente
- ✅ **Alt-Texte** für alle Bilder
- ✅ **Semantic HTML** (nav, main, section, article, etc.)
- ✅ **Color Contrast**: WCAG AA konform
- ✅ **Reduced Motion Support** via `prefers-reduced-motion`

### Kontrast-Verhältnisse:

- Text auf `earth-50`: 10.5:1 ✅
- Links/Accent auf `earth-50`: 7.2:1 ✅
- Text auf White: 11.2:1 ✅

## 🚀 Performance

### Optimierungen:

- ✅ **Next.js Image** überall verwendet
- ✅ **Font Preloading** für Inter & Libre Baskerville
- ✅ **Lazy Loading** für Portfolio-Bilder
- ✅ **Optimierte Bildgrößen** mit `sizes` Attribut
- ✅ **CSS-in-JS** vermieden (Tailwind CSS)
- ✅ **Staggered Animations** für bessere Performance
- ✅ **Intersection Observer** für Scroll-Animationen

## 🔍 SEO

### Implementiert:

- ✅ **Meta Tags** (Title, Description, Keywords)
- ✅ **Open Graph Tags** für Social Sharing
- ✅ **Twitter Cards**
- ✅ **Schema.org JSON-LD** (Person-Schema)
- ✅ **robots.txt** (`/public/robots.txt`)
- ✅ **sitemap.xml** (`/public/sitemap.xml`)
- ✅ **Semantic HTML** mit korrekter Heading-Hierarchie
- ✅ **Canonical URLs** via metadataBase

### Schema.org Daten:

```json
{
  "@type": "Person",
  "name": "Karlo",
  "jobTitle": "Artist",
  "email": "karlo.janke@hotmail.de",
  "sameAs": [
    "https://instagram.com/karlo",
    "https://youtube.com/@karlo"
  ]
}
```

## 📁 Projektstruktur

```
karlo/
├── app/
│   ├── layout.tsx          # Root Layout, Meta Tags
│   ├── page.tsx            # Homepage, Schema.org
│   └── globals.css         # Design System, Styles
├── components/
│   ├── Navigation.tsx      # Hauptnavigation
│   ├── Hero.tsx            # Hero-Section
│   ├── About.tsx           # Über-Section
│   ├── Acts.tsx            # Acts-Section
│   ├── Portfolio.tsx       # Portfolio-Grid + Lightbox
│   ├── Contact.tsx         # Kontaktformular
│   └── SiteFooter.tsx      # Footer
├── data/
│   └── portfolio.ts        # Portfolio-Daten (10 Items)
├── public/
│   ├── robots.txt          # SEO: Robots
│   ├── sitemap.xml         # SEO: Sitemap
│   ├── hero-still.jpg      # Hero Background
│   ├── portrait-karlo.jpg  # About Portrait
│   └── portfolio/          # Portfolio-Bilder (10)
│       ├── performance-01.jpg
│       └── ...
└── README.md               # Diese Datei
```

## 🎯 Responsive Breakpoints

```css
sm:  640px   /* Small devices */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

## 🌐 Browser Support

- Chrome/Edge (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- iOS Safari 12+
- Android Chrome 90+

## 📝 Copy & Tone

**Tonalität:** Elegant, sachlich, professionell
**Sprache:** Deutsch (außer Hero-Zitat auf Englisch)
**Style:** Reduziert, klare Hierarchie, viel Weißraum

**Beispiel-Copy:**
- Hero: Spannung, Präzision, Kontrolle → einzigartige Momente
- About: Internationales Renommee, technische Präzision
- Acts: Hypnotisierend, elegant, kraftvoll
- Portfolio: Ausgewählte Momente meiner künstlerischen Reise

## 🛠️ Entwicklung

```bash
# Installation
npm install

# Development Server
npm run dev

# Production Build
npm run build

# Start Production Server
npm start
```

## 📦 Abhängigkeiten

- **Next.js 16.0.1**: React Framework
- **React 19.2.0**: UI Library
- **Framer Motion 12.23.24**: Animations
- **Tailwind CSS 4.1.16**: Styling
- **TypeScript**: Type Safety

## 📄 Lizenz

Alle Inhalte und Designs sind Eigentum von Karlo. Nicht zur Wiederverwendung ohne Genehmigung.

---

**Kontakt:** karlo.janke@hotmail.de
