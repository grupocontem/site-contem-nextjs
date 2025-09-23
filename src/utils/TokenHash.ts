import crypto from "crypto";

function getKey() {
    const b64 = process.env.ADMIN_SECRET_B64!;
    console.log(b64);
    const key = Buffer.from(b64, "base64");
    if (key.length !== 32) throw new Error("ADMIN_SECRET_B64 precisa ter 32 bytes (base64).");

    return key;
}

export function makeEncryptedToken(ttlSec = 60) {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + ttlSec,
        sub: "admin",
    };
    const key = getKey();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
    const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const tag = cipher.getAuthTag();

    return `${iv.toString("base64")}.${ciphertext.toString("base64")}.${tag.toString("base64")}`;
}

export async function adminFetch(path: string, init?: RequestInit & { bodyObj?: unknown }) {
    const {bodyObj, ...rest} = init || {};
    const body = bodyObj ? JSON.stringify(bodyObj) : undefined;

    const token = makeEncryptedToken(90);
    const resp = await fetch(`${process.env.API_URL}${path}`, {
        ...rest,
        method: rest.method ?? (body ? "POST" : "GET"),
        headers: {
            ...(body && {"Content-Type": "application/json"}),
            "X-Admin-Token": token,
            ...(rest.headers || {}),
        },
        body,
        cache: "no-store",
    });

    if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${await resp.text()}`);
    try {
        const res = await resp.json();

        console.log(res);
        return res;
    } catch {
        return ({});
    }
}
