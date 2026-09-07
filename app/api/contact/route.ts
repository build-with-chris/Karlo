import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validierung
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich." },
        { status: 400 }
      );
    }

    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse." },
        { status: 400 }
      );
    }

    // SMTP-Transporter konfigurieren (GMX)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.gmx.net",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true für 465, false für andere Ports
      auth: {
        user: process.env.SMTP_USER, // GMX E-Mail-Adresse
        pass: process.env.SMTP_PASSWORD, // GMX Passwort
      },
    });

    // E-Mail-Inhalt
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL || "mailforwebsite@gmx.de",
      subject: `Kontaktanfrage von ${name} - ${process.env.SITE_NAME || "Karlo Website"}`,
      text: `
Neue Kontaktanfrage von der Website:

Name: ${name}
E-Mail: ${email}

Nachricht:
${message}

---
Diese E-Mail wurde automatisch über das Kontaktformular auf ${process.env.SITE_URL || "https://karlojanke.com"} gesendet.
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d241c;">Neue Kontaktanfrage von der Website</h2>
          <div style="background-color: #f5f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #b08a5b; margin: 20px 0;">
            <h3 style="color: #2d241c; margin-top: 0;">Nachricht:</h3>
            <p style="white-space: pre-wrap; color: #2d241c;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e5e0; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Diese E-Mail wurde automatisch über das Kontaktformular auf 
            <a href="${process.env.SITE_URL || "https://karlojanke.com"}" style="color: #b08a5b;">
              ${process.env.SITE_URL || "https://karlojanke.com"}
            </a> gesendet.
          </p>
        </div>
      `,
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Nachricht erfolgreich gesendet!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return NextResponse.json(
      { error: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut." },
      { status: 500 }
    );
  }
}

