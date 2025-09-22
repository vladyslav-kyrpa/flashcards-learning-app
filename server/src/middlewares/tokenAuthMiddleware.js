import jwt from "jsonwebtoken";

export default function useTokenAuth(req, res, next){
    const issuerKey = process.env.JWT_ISSUER_KEY ||
        "ecs3ZiY1I00cKV1aFOjuaiMfYAPtRIOwr2FDXprXhwE="; // ALERT: only for dev
    const token = req.token;

    if(!token){
        res.sendStatus(403);
        return;
    }
    jwt.verify(token, issuerKey, (err, user)=>{
        if(err){
            res.sendStatus(403);
            return;
        }
        req.user = user;
        next();
    });
}