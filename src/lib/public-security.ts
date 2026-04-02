import { getRequestContext } from "@/lib/request-context";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 6;
const leadRateLimit = new Map<string, number[]>();

function getRateLimitKey(req: Request): string {
  const context = getRequestContext(req);
  return context.ip || "unknown";
}

export function isRateLimited(req: Request): boolean {
  const key = getRateLimitKey(req);
  const now = Date.now();
  const existing = leadRateLimit.get(key) || [];
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const filtered = existing.filter((timestamp) => timestamp >= windowStart);
  filtered.push(now);
  leadRateLimit.set(key, filtered);

  return filtered.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function verifyCaptchaToken(token?: string | null): Promise<boolean> {
  const normalized = typeof token === "string" ? token.trim() : "";
  if (!normalized) {
    return false;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Dev fallback for placeholder CAPTCHA UI.
  if (!secret) {
    return normalized === "local-pass";
  }

  try {
    const params = new URLSearchParams({
      secret,
      response: normalized,
    });

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json()) as { success?: boolean; score?: number };
    if (!payload.success) {
      return false;
    }

    if (typeof payload.score === "number" && payload.score < 0.3) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
