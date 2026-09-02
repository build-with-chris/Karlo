"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialLinks from "@/components/SocialLinks";

export default function Contact() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventDate: "",
    eventLocation: "",
    message: "",
    consent: false,
    // Honeypot: bleibt bei echten Besuchern leer, Bots fuellen es aus
    website: "",
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
      newErrors.name = t.contact.nameRequired;
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t.contact.emailRequired;
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.contact.emailInvalid;
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.messageRequired;
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.contact.messageMinLength;
      isValid = false;
    }

    if (!formData.consent) {
      newErrors.consent = t.contact.consentRequired;
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
          eventDate: formData.eventDate,
          eventLocation: formData.eventLocation,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.contact.error);
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        eventDate: "",
        eventLocation: "",
        message: "",
        consent: false,
        website: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Fehler beim Senden:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : t.contact.error
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
          <h2 className="text-center mb-8 lg:mb-10">{t.contact.title}</h2>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Honeypot gegen Spam-Bots. Fuer Menschen unsichtbar und
                    fuer Screenreader ausgeblendet. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website (bitte frei lassen)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-earth-700 mb-2"
                  >
                    {t.contact.name} <span className="text-accent">*</span>
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
                    placeholder={t.contact.namePlaceholder}
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
                    {t.contact.email} <span className="text-accent">*</span>
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
                    placeholder={t.contact.emailPlaceholder}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Optional, aber die beiden Angaben machen Karlos erste
                    Antwort deutlich konkreter. */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="eventDate"
                      className="block text-sm font-medium text-earth-700 mb-2"
                    >
                      {t.contact.eventDate}{" "}
                      <span className="font-normal text-earth-700/60">
                        ({t.contact.optional})
                      </span>
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-3 border border-earth-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="eventLocation"
                      className="block text-sm font-medium text-earth-700 mb-2"
                    >
                      {t.contact.eventLocation}{" "}
                      <span className="font-normal text-earth-700/60">
                        ({t.contact.optional})
                      </span>
                    </label>
                    <input
                      type="text"
                      id="eventLocation"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                      className="w-full px-4 py-3 border border-earth-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                      placeholder={t.contact.eventLocationPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-earth-700 mb-2"
                  >
                    {t.contact.message} <span className="text-accent">*</span>
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
                    placeholder={t.contact.messagePlaceholder}
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
                      {language === "de" ? (
                        <>
                          {t.contact.consent.split("Datenschutzerklärung")[0]}
                      <a href="/datenschutz" className="text-accent hover:underline">
                        Datenschutzerklärung
                          </a>
                          {" " + t.contact.consent.split("Datenschutzerklärung")[1]}
                        </>
                      ) : (
                        <>
                          {t.contact.consent.split("privacy policy")[0]}
                          <a href="/datenschutz" className="text-accent hover:underline">
                            Privacy Policy
                          </a>
                          {t.contact.consent.split("privacy policy")[1] || ""}
                        </>
                      )} <span className="text-accent">*</span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" className="text-red-600 text-sm">
                      {errors.consent}
                    </p>
                  )}

                  <p className="text-xs text-earth-700/70 leading-relaxed">
                    {t.contact.consentNote}
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
                    ? t.contact.submitting
                    : isSubmitted
                    ? t.contact.submitted
                    : t.contact.submit}
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
                    {t.contact.emailLabel}
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
                    {t.contact.phoneLabel}
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
                    {t.contact.socialMedia}
                  </h3>
                  <SocialLinks />
                </div>
              </div>

              {/* PepeShows Booking */}
              <div className="rounded-lg border border-accent/20 bg-accent/10 p-5 shadow-md transition-shadow duration-300 hover:shadow-xl">
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
                      {t.acts.booking.title}
                    </h3>
                    <p className="text-sm text-earth-700/85 leading-relaxed mb-3">
                      {t.acts.booking.description}
                    </p>
                    <a
                      href="https://pepeshows.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-earth-700 transition-colors"
                    >
                      {t.acts.booking.link}
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
              <div className="rounded-lg border border-earth-200 bg-earth-100/50 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-earth-500 mt-0 mb-3">
                  {t.contact.forAgencies.title}
                </h3>
                <p className="text-sm text-earth-700/80 leading-relaxed mb-0">
                  {t.contact.forAgencies.description}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
