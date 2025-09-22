import service from "../services/auth.service.js";
import responses from "../utils/responses.js";
import jwt from "jsonwebtoken";

export async function check(req, res) {
    const issuerKey = process.env.JWT_ISSUER_KEY ||
        "ecs3ZiY1I00cKV1aFOjuaiMfYAPtRIOwr2FDXprXhwE="; // ALERT: only for dev

    const token = req.token;

    jwt.verify(token, issuerKey, (err, user)=>{
        if(err) 
            responses.badRequest(res, "Not authenticated");
        else
            responses.ok(res, `Authenticated as ${user.email}`);
    });
}

export async function login(req, res) {
    const data = req.body;
    // todo: validate data
    const token = await service.login({data});
    responses.ok(res, {token});
}

export async function register(req, res) {
     
}