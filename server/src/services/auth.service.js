import jwt from "jsonwebtoken";
import 'dotenv/config';

export async function login(credentials) {
    const payload = {
        id: 123,
        username: "user",
        email:credentials.email
    };

    const issuerKey = process.env.JWT_ISSUER_KEY; 
    if(!issuerKey) throw Error("JWT_ISSUER_KEY is not defined in .env");

    const token = jwt.sign(payload, issuerKey, { expiresIn: "12h" });

    return token;
}

export async function register(userData) {

}

export default { login, register };