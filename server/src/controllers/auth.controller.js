import service from "../services/auth.service.js";
import responses from "../utils/responses.js";
import jwt from "jsonwebtoken";
import { validateSchema } from "../utils/schema/schema_validator.js";
import loginSchema from "../utils/schema/login.schema.js";
import registerSchema from "../utils/schema/register.schema.js";
import 'dotenv/config';
import log from "../utils/logger.js";

export async function check(req, res) {
    const issuerKey = process.env.JWT_ISSUER_KEY
    if (!issuerKey) throw Error("JWT_ISSUER_KEY is not defined in .env");

    jwt.verify(req.token, issuerKey, (err, user) => {
        if (err) responses.badRequest(res, "Not authenticated");
        else responses.ok(res, `Authenticated as ${user.email}`);
    });
}

export async function login(req, res) {
    const credentials = req.body;

    const errors = validateSchema(loginSchema, credentials);
    if (errors.length > 0) {
        responses.badRequest(res, { errors });
        log.error(`Error during logging-in: ${errors.reduce((v, c) => `${v}, ${c}`)}`)
        return;
    }

    try {
        const token = await service.login(credentials);
        log.info(`User ${credentials.email} logged-in`)
        responses.ok(res, { token });
    } catch (error) {
        log.error(error);
        responses.badRequest(res, { "error": "Failed log-in attempt" });
    }
}

export async function register(req, res) {
    const userData = req.body;

    const errors = validateSchema(registerSchema, userData);
    if (errors.length > 0) {
        responses.badRequest(res, { errors });
        log.error(`Error during registration: ${errors.reduce((v, c) => `${v}, ${c}`)}`);
        return;
    }

    try {
        await service.register(userData);
        log.info(`User ${userData.email} registered`)
        responses.ok(res, "Registered");
    } catch (error) {
        log.error(error);
        responses.badRequest(res, { "error": "Failed register attempt" });
    }
}