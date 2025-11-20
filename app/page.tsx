import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Acts from "@/components/Acts";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  // Schema.org structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Karlo Janke",
    givenName: "Karlo",
    familyName: "Janke",
    jobTitle: "Cyr Wheel & Aerial Artist",
    description: "Professioneller Zirkusartist spezialisiert auf Cyr Wheel und Aerial Straps. Ausgebildet an der Schule für zeitgenössischen Zirkus 'Die Etage' in Berlin. Performances für Events, Festivals und Theater.",
    email: "karlo.janke@hotmail.de",
    telephone: "+4915789115708",
    url: "https://karlojanke.com",
    sameAs: [
      "https://www.instagram.com/karlojanke/",
      "https://www.youtube.com/@karlojanke"
    ],
    performerIn: {
      "@type": "Event",
      name: "Zirkusperformances und Artistik-Shows",
      eventType: "Performance"
    },
    knowsAbout: [
      "Cyr Wheel",
      "Aerial Arts",
      "Aerial Straps",
      "Zeitgenössischer Zirkus",
      "Contemporary Circus",
      "Stage Performance",
      "Event Entertainment",
      "Artistik"
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Die Etage - Schule für zeitgenössischen Zirkus",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Berlin",
        addressCountry: "DE"
      }
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Zirkusartist",
      occupationLocation: {
        "@type": "Country",
        name: "Deutschland"
      }
    }
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
      <CookieBanner />
    </>
  );
}
