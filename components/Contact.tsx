"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import Image from "next/image";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    consent: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
      consent: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Bitte geben Sie Ihren Namen ein.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Bitte geben Sie eine Nachricht ein.";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Ihre Nachricht sollte mindestens 10 Zeichen lang sein.";
      isValid = false;
    }

    if (!formData.consent) {
      newErrors.consent = "Bitte bestätigen Sie die Datenschutzeinwilligung.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Senden der Nachricht");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "", consent: false });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Fehler beim Senden:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-earth-50 pt-6 md:pt-8 lg:pt-10">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center mb-8 lg:mb-10">Kontakt</h2>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-earth-700 mb-2"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-400 focus:ring-red-300"
                        : "border-earth-300 focus:ring-accent/30"
                    }`}
                    placeholder="Ihr Name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-earth-700 mb-2"
                  >
                    E-Mail <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-400 focus:ring-red-300"
                        : "border-earth-300 focus:ring-accent/30"
                    }`}
                    placeholder="ihre@email.de"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-earth-700 mb-2"
                  >
                    Nachricht <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? "border-red-400 focus:ring-red-300"
                        : "border-earth-300 focus:ring-accent/30"
                    }`}
                    placeholder="Erzählen Sie mir von Ihrem Event..."
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-600 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* DSGVO Consent */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 border-earth-300 rounded text-accent focus:ring-2 focus:ring-accent/30"
                      aria-invalid={errors.consent ? "true" : "false"}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                    />
                    <label htmlFor="consent" className="text-sm text-earth-700/90 leading-relaxed">
                      Ich habe die{" "}
                      <a href="/datenschutz" className="text-accent hover:underline">
                        Datenschutzerklärung
                      </a>{" "}
                      zur Kenntnis genommen. Ich stimme zu, dass meine Angaben zur Kontaktaufnahme
                      und für Rückfragen dauerhaft gespeichert werden. <span className="text-accent">*</span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" className="text-red-600 text-sm">
                      {errors.consent}
                    </p>
                  )}

                  <p className="text-xs text-earth-700/70 leading-relaxed">
                    <strong>Hinweis:</strong> Sie können Ihre Einwilligung jederzeit für die Zukunft per E-Mail
                    an info@karlojanke.com widerrufen.
                  </p>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitted || isLoading}
                >
                  {isLoading
                    ? "Wird gesendet..."
                    : isSubmitted
                    ? "✓ Nachricht gesendet"
                    : "Nachricht senden"}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-10"
            >
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-earth-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-accent"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-earth-500 mt-0 mb-2">
                    E-Mail
                  </h3>
                  <a
                    href="mailto:info@karlojanke.com"
                    className="text-earth-700 hover:text-accent no-underline text-base"
                  >
                    info@karlojanke.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-earth-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-accent"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-earth-500 mt-0 mb-2">
                    Telefon
                  </h3>
                  <a
                    href="tel:+4915789115708"
                    className="text-earth-700 hover:text-accent no-underline text-base"
                  >
                    +49 (0) 157 89115708
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-earth-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-accent"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-earth-500 mt-0 mb-3">
                    Social Media
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href="https://www.instagram.com/karlojanke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-earth-100 hover:bg-accent hover:text-white flex items-center justify-center text-earth-700 transition-all duration-200"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@karlojanke"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-earth-100 hover:bg-accent hover:text-white flex items-center justify-center text-earth-700 transition-all duration-200"
                      aria-label="YouTube"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* PepeShows Booking */}
              <div 
                className="bg-accent/10 border border-accent/20 rounded-lg p-5 transition-all duration-300"
                style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(176, 138, 91, 0.15), 0 4px 6px -4px rgba(176, 138, 91, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-earth-800 flex items-center justify-center flex-shrink-0 p-2">
                    <Image
                      src="/PEPE_logos_shows.svg"
                      alt="PepeShows Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mt-0 mb-2">
                      Direktbuchung
                    </h3>
                    <p className="text-sm text-earth-700/85 leading-relaxed mb-3">
                      Fertige Acts von Karlo können Sie direkt über PepeShows buchen. 
                      Professionelle Kommunikation und einfache Abwicklung inklusive.
                    </p>
                    <a
                      href="https://pepeshows.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-earth-700 transition-colors"
                    >
                      Zu PepeShows
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Agency Note */}
              <div 
                className="bg-earth-100/50 border border-earth-200 rounded-lg p-6 transition-all duration-300"
                style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(45, 36, 28, 0.12), 0 4px 6px -4px rgba(45, 36, 28, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
                }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-earth-500 mt-0 mb-3">
                  Für Agenturen
                </h3>
                <p className="text-sm text-earth-700/80 leading-relaxed mb-0">
                  Sie planen ein Event und suchen außergewöhnliche Artistik? Ich arbeite gerne
                  mit professionellen Agenturen zusammen. Kontaktieren Sie mich für Details zu
                  Verfügbarkeit und Konditionen.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
