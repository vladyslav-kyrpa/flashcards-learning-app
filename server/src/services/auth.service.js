import jwt from "jsonwebtoken";
import schema from "../utils/schema/register.schema.js";
import 'dotenv/config';
import { getHash, verifyHash } from "../utils/hash.js";
import { validateSchema } from "../utils/schema/schema_validator.js";
import { UserModel } from "../data_access/models/index.js";

export async function login(credentials) {
    const user = await UserModel.findOne({ email: credentials.email });

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
    const errors = validateSchema(schema, userData);
    if (errors.length > 0)
        throw Error("Invalid user register data");

    const hash = await getHash(userData.password);

    const user = new UserModel({
        name: userData.name,
        email: userData.email,
        passwordHash: hash
    });
    await user.save();
}

export default { login, register };