const CREDENTIALS_HASH =
  "77b9724755ea5ac4a9ebd47c0a56eaf2f60d00b5c01c7a61449c38227e5f0504";

const SESSION_KEY = "portfolio-admin-session";

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const hash = await sha256(`${email.trim().toLowerCase()}:${password}`);
  return hash === CREDENTIALS_HASH;
}

export function createSession(): void {
  sessionStorage.setItem(SESSION_KEY, CREDENTIALS_HASH);
}

export function hasSession(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === CREDENTIALS_HASH;
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
