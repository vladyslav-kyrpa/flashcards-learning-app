import jwt from "jsonwebtoken";

export async function login(credentials) {
    const payload = {
        id: 123,
        username: "alice",
        role: "admin",
        email:"user@mail.com"
    };

    const issuerKey = process.env.JWT_ISSUER_KEY ||
        "ecs3ZiY1I00cKV1aFOjuaiMfYAPtRIOwr2FDXprXhwE="; // ALERT: only for dev

    const token = jwt.sign(payload, issuerKey, { expiresIn: "12h" });

    return token;
}

export async function register(userData) {

}

export default { login, register };