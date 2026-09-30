import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // 2. Validate Resend API Key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "RESEND_API_KEY is not configured in your environment (.env.local). Please set your Resend API key.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const emailSubject = subject?.trim()
      ? `[Portfolio Dispatch] ${subject.trim()}`
      : `New Inquiry from ${name.trim()}`;

    // 3. Dispatch email to Naren's personal inbox
    const data = await resend.emails.send({
      from: "Portfolio Dispatch <onboarding@resend.dev>",
      to: ["narensarkar607@gmail.com"],
      replyTo: email.trim(),
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #f6f4ee;
                color: #1c1b18;
                padding: 24px;
                margin: 0;
              }
              .container {
                max-width: 580px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid rgba(28, 27, 24, 0.12);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
              }
              .header {
                background-color: #1c1b18;
                color: #e6e2d7;
                padding: 24px 28px;
              }
              .header h2 {
                margin: 0 0 4px 0;
                font-size: 18px;
                letter-spacing: 0.08em;
                text-transform: uppercase;
              }
              .header p {
                margin: 0;
                font-size: 12px;
                opacity: 0.75;
                font-family: monospace;
              }
              .content {
                padding: 28px;
              }
              .field {
                margin-bottom: 20px;
              }
              .field-label {
                font-size: 11px;
                font-family: monospace;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: #8a8475;
                margin-bottom: 4px;
              }
              .field-value {
                font-size: 15px;
                color: #1c1b18;
                font-weight: 500;
              }
              .message-box {
                background-color: #f7f6f2;
                border: 1px solid rgba(28, 27, 24, 0.08);
                border-radius: 12px;
                padding: 16px 20px;
                font-size: 14px;
                line-height: 1.6;
                white-space: pre-wrap;
                color: #2b2823;
              }
              .footer {
                padding: 20px 28px;
                background-color: #faf8f3;
                border-top: 1px solid rgba(28, 27, 24, 0.08);
                font-size: 11px;
                color: #8a8475;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .reply-btn {
                display: inline-block;
                padding: 8px 16px;
                background-color: #1c1b18;
                color: #e6e2d7;
                text-decoration: none;
                border-radius: 8px;
                font-size: 12px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Portfolio Inquiry</h2>
                <p>TRANSMISSION // NAREN ROY PORTFOLIO DISPATCH</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Sender Name</div>
                  <div class="field-value">${name.trim()}</div>
                </div>
                <div class="field">
                  <div class="field-label">Sender Email</div>
                  <div class="field-value">
                    <a href="mailto:${email.trim()}" style="color: #b45309; text-decoration: none;">
                      ${email.trim()}
                    </a>
                  </div>
                </div>
                ${
                  subject?.trim()
                    ? `
                <div class="field">
                  <div class="field-label">Subject / Scope</div>
                  <div class="field-value">${subject.trim()}</div>
                </div>
                `
                    : ""
                }
                <div class="field">
                  <div class="field-label">Message</div>
                  <div class="message-box">${message.trim()}</div>
                </div>
                <div style="margin-top: 24px;">
                  <a href="mailto:${email.trim()}?subject=Re: ${encodeURIComponent(
        emailSubject
      )}" class="reply-btn">
                    Reply Directly to ${name.trim()} →
                  </a>
                </div>
              </div>
              <div class="footer">
                <span>Received via narenroy portfolio</span>
                <span>${new Date().toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })} (IST)</span>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (err: unknown) {
    console.error("Resend API contact error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to process inquiry dispatch.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
