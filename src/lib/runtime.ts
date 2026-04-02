export function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getJwtSecret(): string {
  const secret = getRequiredEnv("JWT_SECRET");
  if (secret === "default_jwt_secret_change_me_in_prod") {
    throw new Error("JWT_SECRET must not use the default placeholder value");
  }
  return secret;
}

export function getAppBaseUrl(): string {
  return process.env.APP_URL || "https://www.hrescic.com";
}
