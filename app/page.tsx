import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Acts from "@/components/Acts";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  // Schema.org structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Karlo",
    jobTitle: "Artist",
    description: "Professional Cyr Wheel and Aerial Artist specializing in contemporary circus performances",
    email: "karlo.janke@hotmail.de",
    sameAs: [
      "https://www.instagram.com/karlojanke/",
      "https://www.youtube.com/@karlojanke"
    ],
    performerIn: {
      "@type": "Event",
      name: "International Circus Performances"
    },
    knowsAbout: ["Cyr Wheel", "Aerial Arts", "Contemporary Circus", "Stage Performance"],
    alumniOf: "Professional Circus Training",
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Navigation />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <About />
        <Acts />
        <Portfolio />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
