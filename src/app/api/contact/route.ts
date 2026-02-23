/** API-маршрут отправки письма через SMTP (nodemailer). */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message, locale } = await request.json();
    const isRu = locale === "ru";

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"NotFound Studio" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: isRu
        ? `Заявка с сайта от ${name}`
        : `Website inquiry from ${name}`,
      text: isRu
        ? `Имя: ${name}\nEmail: ${email}\n\nСообщение:\n${message}`
        : `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
<!DOCTYPE html>
<html lang="${isRu ? "ru" : "en"}">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#000;color:#fff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #222;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.5px;">NF</span>
                    <span style="font-size:12px;color:#666;margin-left:12px;letter-spacing:1px;text-transform:uppercase;">STUDIO</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:#555;font-family:monospace;letter-spacing:1px;">${new Date().toLocaleDateString(isRu ? "ru-RU" : "en-US", { day: "2-digit", month: "short", year: "numeric" })}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:40px 40px 8px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.5px;">${isRu ? "Новая заявка" : "New inquiry"}</h1>
            </td>
          </tr>

          <!-- Subtitle -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0;font-size:14px;color:#666;">${isRu ? "Получена через форму на сайте" : "Received via the website contact form"}</p>
            </td>
          </tr>

          <!-- Info cards -->
          <tr>
            <td style="padding:0 40px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111;border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1.5px;">${isRu ? "Имя" : "Name"}</p>
                    <p style="margin:0;font-size:16px;color:#fff;font-weight:500;">${name}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111;border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1.5px;">Email</p>
                    <p style="margin:0;font-size:16px;">
                      <a href="mailto:${email}" style="color:#fff;text-decoration:none;border-bottom:1px solid #333;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background-color:#222;"></div>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:32px 40px 8px;">
              <p style="margin:0;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1.5px;">${isRu ? "Сообщение" : "Message"}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 40px 40px;">
              <p style="margin:0;font-size:15px;color:#ccc;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </td>
          </tr>

          <!-- Reply button -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#fff;border-radius:100px;">
                    <a href="mailto:${email}" style="display:inline-block;padding:14px 32px;font-size:13px;font-weight:600;color:#000;text-decoration:none;letter-spacing:0.3px;">
                      ${isRu ? "Ответить →" : "Reply →"}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #222;">
              <p style="margin:0;font-size:11px;color:#444;line-height:1.6;">
                NotFound Studio · not-found.tech<br/>
                ${isRu ? "Это автоматическое уведомление" : "This is an automated notification"}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
