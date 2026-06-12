const CREDENTIALS_HASH =
  "40473ecfba2181dbf379a2f01c21d15d9e4708475c292f80a470fd10657312af";

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
