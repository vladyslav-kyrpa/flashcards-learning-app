import jwt from "jsonwebtoken";
import schema from "../schema/register.schema.js";
import 'dotenv/config';
import { getDatabase } from "../data-access/mongoDb.js";
import { getHash, verifyHash } from "../utils/hash.js";
import { validateSchema } from "../schema/validator.js";

export async function login(credentials) {
    const db = getDatabase();

    const user = await db.collection("users")
        .findOne({ "email": credentials.email });

    if (!user || !verifyHash(user.passwordHash, credentials.password))
        throw Error("Invalid user credentials");

    const payload = {
        "id": user._id,
        "name": user.name,
        "email": user.email
    };

    const issuerKey = process.env.JWT_ISSUER_KEY;
    if (!issuerKey)
        throw Error("JWT_ISSUER_KEY is not defined in .env");

    return jwt.sign(payload, issuerKey, { expiresIn: "12h" });
}

export async function register(userData) {
    const db = getDatabase();

    const errors = validateSchema(schema, userData);
    if (errors.length > 0)
        throw Error("Invalid user register data");

    const hash = await getHash(userData.password);

    await db.collection("users").insertOne({
        name: userData.name,
        email: userData.email,
        passwordHash: hash
    });
}

export default { login, register };