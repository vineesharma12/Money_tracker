import crypto from "node:crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const secret = process.env.AUTH_SECRET || "khataflow-dev-secret-change-me";

const base64url = value => Buffer.from(value).toString("base64url");

const sign = value => crypto.createHmac("sha256", secret).update(value).digest("base64url");

export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const passwordHash = crypto.pbkdf2Sync(password, salt, 120000, 64, "sha512").toString("hex");
  return { passwordHash, passwordSalt: salt };
}

export function verifyPassword(password, salt, expectedHash) {
  const { passwordHash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(passwordHash, "hex"), Buffer.from(expectedHash, "hex"));
}

export function createToken(user) {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    exp: Date.now() + TOKEN_TTL_MS
  };
  const encodedPayload = base64url(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyToken(token) {
  try {
    if (!token || !token.includes(".")) return null;
    const [encodedPayload, signature] = token.split(".");
    const expectedSignature = sign(encodedPayload);
    const received = Buffer.from(signature || "");
    const expected = Buffer.from(expectedSignature);
    if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) return null;
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
