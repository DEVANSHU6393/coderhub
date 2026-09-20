import { Resend } from "resend";

// Initialize Resend client
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Email] RESEND_API_KEY not set. Emails will be skipped.");
    return null;
  }
  return new Resend(apiKey);
}

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  year: string;
  branch: string;
  skills: string[];
  interests: string[];
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  reason: string;
}

// Send notification to admin when a new application is submitted
export async function sendAdminNotification(application: ApplicationData) {
  const resend = getResend();
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "CoderHub <onboarding@resend.dev>";

  if (!resend || !adminEmail) {
    console.log("[Email] Skipping admin notification — not configured.");
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a1a; color: #e0e0ff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #0f0f2a; border: 1px solid #00ffff33; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #00ffff22, #7c3aed22); padding: 30px; text-align: center; border-bottom: 1px solid #00ffff33; }
        .header h1 { margin: 0; color: #00ffff; font-size: 24px; letter-spacing: 2px; }
        .header p { margin: 8px 0 0; color: #a0a0cc; }
        .body { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7c3aed; margin-bottom: 4px; }
        .value { font-size: 15px; color: #e0e0ff; background: #ffffff0a; padding: 10px 14px; border-radius: 6px; border-left: 3px solid #00ffff; }
        .tag { display: inline-block; background: #00ffff22; color: #00ffff; border: 1px solid #00ffff44; padding: 3px 10px; border-radius: 20px; font-size: 12px; margin: 2px; }
        .reason { font-size: 14px; color: #c0c0e0; line-height: 1.6; background: #ffffff0a; padding: 14px; border-radius: 6px; border-left: 3px solid #7c3aed; }
        .footer { background: #ffffff05; padding: 20px 30px; text-align: center; border-top: 1px solid #ffffff11; }
        .footer a { color: #00ffff; text-decoration: none; font-size: 13px; }
        .btn { display: inline-block; background: linear-gradient(135deg, #00ffff, #7c3aed); color: #000; font-weight: bold; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-top: 10px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚡ CODER HUB</h1>
          <p>New Membership Application Received</p>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${application.fullName}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${application.email}" style="color:#00ffff">${application.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone</div>
            <div class="value">${application.phone}</div>
          </div>
          <div class="field">
            <div class="label">Year & Branch</div>
            <div class="value">${application.year} Year — ${application.branch}</div>
          </div>
          <div class="field">
            <div class="label">Skills</div>
            <div class="value">${application.skills.map(s => `<span class="tag">${s}</span>`).join(" ")}</div>
          </div>
          <div class="field">
            <div class="label">Areas of Interest</div>
            <div class="value">${application.interests.map(i => `<span class="tag">${i}</span>`).join(" ")}</div>
          </div>
          ${application.githubUrl ? `<div class="field"><div class="label">GitHub</div><div class="value"><a href="${application.githubUrl}" style="color:#00ffff">${application.githubUrl}</a></div></div>` : ""}
          ${application.linkedinUrl ? `<div class="field"><div class="label">LinkedIn</div><div class="value"><a href="${application.linkedinUrl}" style="color:#00ffff">${application.linkedinUrl}</a></div></div>` : ""}
          <div class="field">
            <div class="label">Why they want to join</div>
            <div class="reason">${application.reason}</div>
          </div>
          <div style="text-align:center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin" class="btn">Review in Admin Panel →</a>
          </div>
        </div>
        <div class="footer">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}">CoderHub — Bundelkhand University</a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `🚀 New Application: ${application.fullName}`,
      html,
    });

    if (error) {
      console.error("[Email] Admin notification FAILED:", error);
    } else {
      console.log("[Email] Admin notification sent! ID:", data?.id);
    }
  } catch (err) {
    console.error("[Email] Admin notification error:", err);
  }
}

// Send confirmation email to the applicant
export async function sendApplicantConfirmation(name: string, email: string) {
  const resend = getResend();
  const fromEmail = process.env.RESEND_FROM_EMAIL || "CoderHub <onboarding@resend.dev>";

  if (!resend) {
    console.log("[Email] Skipping applicant confirmation — not configured.");
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a1a; color: #e0e0ff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #0f0f2a; border: 1px solid #00ffff33; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #00ffff22, #7c3aed22); padding: 40px 30px; text-align: center; border-bottom: 1px solid #00ffff33; }
        .header h1 { margin: 0; color: #00ffff; font-size: 28px; letter-spacing: 2px; }
        .body { padding: 30px; text-align: center; }
        .body h2 { color: #00ffff; font-size: 22px; }
        .body p { color: #a0a0cc; line-height: 1.7; font-size: 15px; }
        .highlight { color: #e0e0ff; font-weight: bold; }
        .footer { background: #ffffff05; padding: 20px 30px; text-align: center; border-top: 1px solid #ffffff11; }
        .footer a { color: #00ffff; text-decoration: none; font-size: 13px; }
        .icon { font-size: 48px; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚡ CODER HUB</h1>
        </div>
        <div class="body">
          <div class="icon">🎉</div>
          <h2>Application Received, ${name}!</h2>
          <p>Thank you for applying to join <span class="highlight">Coder Hub</span> at Bundelkhand University!</p>
          <p>Your application has been successfully submitted and is now under review by our team. We'll get back to you soon with the next steps.</p>
          <p style="color: #7c3aed; font-size: 13px; margin-top: 30px;">Meanwhile, check out our events and stay connected!</p>
        </div>
        <div class="footer">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}">CoderHub — Bundelkhand University</a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `✅ Your Coder Hub Application is Received!`,
      html,
    });

    if (error) {
      console.error("[Email] Applicant confirmation FAILED:", error);
    } else {
      console.log("[Email] Applicant confirmation sent! ID:", data?.id);
    }
  } catch (err) {
    console.error("[Email] Applicant confirmation error:", err);
  }
}
