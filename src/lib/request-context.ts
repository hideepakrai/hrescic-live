export interface RequestContext {
  requestId: string;
  ip: string | null;
  userAgent: string | null;
}

function readHeader(req: Request, key: string): string | null {
  const value = req.headers.get(key);
  return value && value.trim().length > 0 ? value.trim() : null;
}

function extractForwardedIp(value: string | null): string | null {
  if (!value) return null;
  const candidate = value.split(",")[0]?.trim();
  return candidate && candidate.length > 0 ? candidate : null;
}

export function getRequestContext(req?: Request | null): RequestContext {
  if (!req) {
    return {
      requestId: crypto.randomUUID(),
      ip: null,
      userAgent: null,
    };
  }

  const requestId =
    readHeader(req, "x-request-id") ||
    readHeader(req, "x-vercel-id") ||
    crypto.randomUUID();

  const ip =
    extractForwardedIp(readHeader(req, "x-forwarded-for")) ||
    readHeader(req, "x-real-ip");

  const userAgent = readHeader(req, "user-agent");

  return {
    requestId,
    ip,
    userAgent,
  };
}
