import jwt from "jsonwebtoken";
import 'dotenv/config';

export default function useTokenAuth(req, res, next){
    const issuerKey = process.env.JWT_ISSUER_KEY;
    if(!issuerKey) throw Error("JWT_ISSUER_KEY is not defined in .env");

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