import nodemailer, { Transporter } from "nodemailer";
import { getCmsCollectionModel } from "@/models";

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

let cachedTransporterKey = "";
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

async function readMailerConfig(): Promise<MailerConfig> {
  let dbData: any = {};
  try {
    const Settings = await getCmsCollectionModel("settings");
    const config = await Settings.findOne({ key: "integrations" });
    if (config?.data) {
      dbData = config.data;
    }
  } catch (error) {
    console.warn("Could not fetch mailer config from DB, falling back to env variables:", error);
  }

  const host = (dbData.smtpHost || process.env.SMTP_HOST || "").trim();
  const port = parsePort(dbData.smtpPort || process.env.SMTP_PORT);
  const secure = parseBoolean(process.env.SMTP_SECURE, false) || port === 465;
  const user = (dbData.smtpUser || process.env.SMTP_USER || "").trim();
  const pass = (dbData.smtpPass || process.env.SMTP_PASS || "").trim();
  const fromEmail = (dbData.smtpFrom || process.env.SMTP_FROM_EMAIL || dbData.smtpUser || process.env.SMTP_USER || "").trim();
  const fromName = (dbData.smtpFromName || process.env.SMTP_FROM_NAME || "Hrescic").trim();
  const notifyTo = parseRecipients(dbData.notifyRecipients || process.env.LEAD_NOTIFY_TO);
  const enabled = dbData.notificationsEnabled !== undefined 
    ? Boolean(dbData.notificationsEnabled) 
    : parseBoolean(process.env.LEAD_EMAIL_NOTIFICATIONS_ENABLED, false);

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
  const key = JSON.stringify({ h: config.host, p: config.port, u: config.user, s: config.secure });
  if (cachedTransporter && cachedTransporterKey === key) return cachedTransporter;
  
  cachedTransporterKey = key;
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
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    dateStyle: 'medium', 
    timeStyle: 'short', 
    timeZone: 'UTC' 
  }).format(input.createdAt) + " (UTC)";
  const fullPageUrl = input.page.startsWith('http') ? input.page : `https://www.hrescic.com${input.page.startsWith('/') ? '' : '/'}${input.page}`;

  const messageLabel = input.formType === 'ask' ? 'What do you need help with?' : 'What would you like to improve?';

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h2 style="margin:0 0 12px;">New ${escapeHtml(input.formType.toUpperCase())} lead received</h2>
      <p style="margin:0 0 16px;">A new lead was submitted from the website contact flow.</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        <tr><td style="padding:6px 0;font-weight:bold;width:150px;">Lead ID</td><td style="padding:6px 0;">${escapeHtml(input.leadId)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Form Type</td><td style="padding:6px 0;">${escapeHtml(input.formType)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Page</td><td style="padding:6px 0;"><a href="${escapeHtml(fullPageUrl)}">${escapeHtml(fullPageUrl)}</a></td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Language</td><td style="padding:6px 0;">${escapeHtml(input.locale)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Submitted At</td><td style="padding:6px 0;">${escapeHtml(formattedDate)}</td></tr>
        <tr><td colspan="2" style="padding:12px 0 4px; border-bottom:1px solid #e5e7eb;"></td></tr>
        <tr><td style="padding:12px 0 6px;font-weight:bold;">Name</td><td style="padding:12px 0 6px;">${escapeHtml(input.name)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Email</td><td style="padding:6px 0;">${escapeHtml(input.email)}</td></tr>
        ${input.formType !== 'ask' ? `<tr><td style="padding:6px 0;font-weight:bold;">Company</td><td style="padding:6px 0;">${escapeHtml(input.company || "-")}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Website</td><td style="padding:6px 0;">${escapeHtml(input.website || "-")}</td></tr>` : ''}
      </table>
      <h3 style="margin:20px 0 6px;">${escapeHtml(messageLabel)}</h3>
      <p style="white-space:pre-wrap;line-height:1.5;background:#f9fafb;border:1px solid #e5e7eb;padding:12px;border-radius:8px;">${escapeHtml(input.message)}</p>
    </div>
  `;
}

function buildNotificationText(input: LeadNotificationPayload): string {
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    dateStyle: 'medium', 
    timeStyle: 'short', 
    timeZone: 'UTC' 
  }).format(input.createdAt) + " (UTC)";
  const fullPageUrl = input.page.startsWith('http') ? input.page : `https://www.hrescic.com${input.page.startsWith('/') ? '' : '/'}${input.page}`;

  const messageLabel = input.formType === 'ask' ? 'What do you need help with?' : 'What would you like to improve?';

  return [
    `New ${input.formType.toUpperCase()} lead received`,
    "",
    `Lead ID: ${input.leadId}`,
    `Form Type: ${input.formType}`,
    `Page: ${fullPageUrl}`,
    `Language: ${input.locale}`,
    `Submitted At: ${formattedDate}`,
    "----------------------------------------",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    ...(input.formType !== 'ask' ? [
      `Company: ${input.company || "-"}`,
      `Website: ${input.website || "-"}`,
    ] : []),
    "",
    `${messageLabel}:`,
    input.message,
  ].join("\n");
}

export async function sendLeadNotificationEmail(input: LeadNotificationPayload): Promise<void> {
  const config = await readMailerConfig();

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
