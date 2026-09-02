import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_LENGTHS = { name: 100, email: 200, message: 5000 };

// Einfaches Limit pro IP im Arbeitsspeicher. Reicht gegen Bots, die das
// Formular im Sekundentakt abschicken. Nach einem Neustart ist es leer.
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs
  );

  if (recent.length >= RATE_LIMIT.max) {
    submissions.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissions.set(ip, recent);

  // Alte Eintraege gelegentlich aufraeumen, damit die Map nicht unbegrenzt waechst
  if (submissions.size > 1000) {
    for (const [key, times] of submissions) {
      if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) {
        submissions.delete(key);
      }
    }
  }

  return false;
}

/** Verhindert, dass Zeilenumbrueche im Namen eigene Mail-Header erzeugen */
function stripNewlines(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Maskiert Zeichen, die im HTML-Teil der Mail sonst als Markup gelten */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, website, eventDate, eventLocation } = body;

    // Honeypot: ein Feld, das nur Bots ausfuellen. Wir melden Erfolg, senden aber nichts.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json(
        { message: "Nachricht erfolgreich gesendet!" },
        { status: 200 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unbekannt";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429 }
      );
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich." },
        { status: 400 }
      );
    }

    if (
      name.length > MAX_LENGTHS.name ||
      email.length > MAX_LENGTHS.email ||
      message.length > MAX_LENGTHS.message
    ) {
      return NextResponse.json(
        { error: "Eine der Angaben ist zu lang." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse." },
        { status: 400 }
      );
    }

    const safeName = stripNewlines(name);
    const safeEmail = stripNewlines(email);
    // Optional, deshalb nur uebernehmen wenn ausgefuellt und kurz genug
    const safeDate =
      typeof eventDate === "string" ? stripNewlines(eventDate).slice(0, 40) : "";
    const safeLocation =
      typeof eventLocation === "string"
        ? stripNewlines(eventLocation).slice(0, 120)
        : "";
    const siteName = process.env.SITE_NAME || "Karlo Website";
    const siteUrl = process.env.SITE_URL || "https://karlojanke.com";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.gmx.net",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true für 465, false für andere Ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      // Absender bleibt das eigene Postfach, sonst weist der Provider die Mail ab
      from: { name: safeName, address: process.env.SMTP_USER ?? "" },
      replyTo: safeEmail,
      to: process.env.CONTACT_EMAIL || "mailforwebsite@gmx.de",
      subject: `Kontaktanfrage von ${safeName} - ${siteName}`,
      text: [
        "Neue Kontaktanfrage von der Website:",
        "",
        `Name: ${safeName}`,
        `E-Mail: ${safeEmail}`,
        ...(safeDate ? [`Datum: ${safeDate}`] : []),
        ...(safeLocation ? [`Ort: ${safeLocation}`] : []),
        "",
        "Nachricht:",
        message,
        "",
        "---",
        `Diese E-Mail wurde automatisch über das Kontaktformular auf ${siteUrl} gesendet.`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d241c;">Neue Kontaktanfrage von der Website</h2>
          <div style="background-color: #f5f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
            <p><strong>E-Mail:</strong> <a href="mailto:${encodeURI(safeEmail)}">${escapeHtml(safeEmail)}</a></p>
            ${safeDate ? `<p><strong>Datum:</strong> ${escapeHtml(safeDate)}</p>` : ""}
            ${safeLocation ? `<p><strong>Ort:</strong> ${escapeHtml(safeLocation)}</p>` : ""}
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #b08a5b; margin: 20px 0;">
            <h3 style="color: #2d241c; margin-top: 0;">Nachricht:</h3>
            <p style="white-space: pre-wrap; color: #2d241c;">${escapeHtml(message)}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e5e0; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Diese E-Mail wurde automatisch über das Kontaktformular auf
            <a href="${escapeHtml(siteUrl)}" style="color: #b08a5b;">${escapeHtml(siteUrl)}</a> gesendet.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Nachricht erfolgreich gesendet!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return NextResponse.json(
      {
        error:
          "Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.",
      },
      { status: 500 }
    );
  }
}
