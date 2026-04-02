import nodemailer, { Transporter } from "nodemailer";

export type LeadNotificationPayload = {
  leadId: string;
  formType: "demo" | "ask";
  name: string;
  email: string;
  company?: string | null;
  website?: string | null;
  message: string;
  page: string;
  locale: string;
  createdAt: Date;
};

type MailerConfig = {
  enabled: boolean;
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
  notifyTo: string[];
};

let cachedTransporter: Transporter | null = null;

function parseBoolean(value: string | undefined, fallback = false): boolean {
  if (!value) return fallback;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function parsePort(value: string | undefined): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 587;
  return parsed > 0 ? parsed : 587;
}

function parseRecipients(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function readMailerConfig(): MailerConfig {
  const host = (process.env.SMTP_HOST || "").trim();
  const port = parsePort(process.env.SMTP_PORT);
  const secure = parseBoolean(process.env.SMTP_SECURE, false);
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();
  const fromEmail = (process.env.SMTP_FROM_EMAIL || "").trim();
  const fromName = (process.env.SMTP_FROM_NAME || "Hrescic").trim();
  const notifyTo = parseRecipients(process.env.LEAD_NOTIFY_TO);
  const enabled = parseBoolean(process.env.LEAD_EMAIL_NOTIFICATIONS_ENABLED, false);

  return {
    enabled,
    host,
    port,
    secure,
    user,
    pass,
    fromEmail,
    fromName,
    notifyTo,
  };
}

function configIsComplete(config: MailerConfig): boolean {
  return Boolean(
    config.host &&
      config.port &&
      config.user &&
      config.pass &&
      config.fromEmail &&
      config.notifyTo.length > 0,
  );
}

function getTransporter(config: MailerConfig): Transporter {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
  return cachedTransporter;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildNotificationHtml(input: LeadNotificationPayload): string {
  return `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h2 style="margin:0 0 12px;">New ${escapeHtml(input.formType.toUpperCase())} lead received</h2>
      <p style="margin:0 0 16px;">A new lead was submitted from the website contact flow.</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        <tr><td style="padding:6px 0;font-weight:bold;">Lead ID</td><td style="padding:6px 0;">${escapeHtml(input.leadId)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Form Type</td><td style="padding:6px 0;">${escapeHtml(input.formType)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Name</td><td style="padding:6px 0;">${escapeHtml(input.name)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Email</td><td style="padding:6px 0;">${escapeHtml(input.email)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Company</td><td style="padding:6px 0;">${escapeHtml(input.company || "-")}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Website</td><td style="padding:6px 0;">${escapeHtml(input.website || "-")}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Page</td><td style="padding:6px 0;">${escapeHtml(input.page)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Locale</td><td style="padding:6px 0;">${escapeHtml(input.locale)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Submitted At</td><td style="padding:6px 0;">${escapeHtml(input.createdAt.toISOString())}</td></tr>
      </table>
      <h3 style="margin:20px 0 6px;">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.5;background:#f9fafb;border:1px solid #e5e7eb;padding:12px;border-radius:8px;">${escapeHtml(input.message)}</p>
    </div>
  `;
}

function buildNotificationText(input: LeadNotificationPayload): string {
  return [
    `New ${input.formType.toUpperCase()} lead received`,
    "",
    `Lead ID: ${input.leadId}`,
    `Form Type: ${input.formType}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "-"}`,
    `Website: ${input.website || "-"}`,
    `Page: ${input.page}`,
    `Locale: ${input.locale}`,
    `Submitted At: ${input.createdAt.toISOString()}`,
    "",
    "Message:",
    input.message,
  ].join("\n");
}

export async function sendLeadNotificationEmail(input: LeadNotificationPayload): Promise<void> {
  const config = readMailerConfig();

  if (!config.enabled) {
    console.info(
      JSON.stringify({
        event: "lead_email.skipped",
        reason: "notifications_disabled",
        leadId: input.leadId,
      }),
    );
    return;
  }

  if (!configIsComplete(config)) {
    console.warn(
      JSON.stringify({
        event: "lead_email.skipped",
        reason: "smtp_config_incomplete",
        leadId: input.leadId,
      }),
    );
    return;
  }

  try {
    const transporter = getTransporter(config);
    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.notifyTo.join(", "),
      subject: `New ${input.formType.toUpperCase()} lead: ${input.name}`,
      text: buildNotificationText(input),
      html: buildNotificationHtml(input),
    });

    console.info(
      JSON.stringify({
        event: "lead_email.sent",
        leadId: input.leadId,
        formType: input.formType,
        recipients: config.notifyTo,
      }),
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "lead_email.failed",
        leadId: input.leadId,
        formType: input.formType,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    );
  }
}
