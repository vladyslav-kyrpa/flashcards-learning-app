import express from "express";
import deckRoutes from "./routes/deck.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import jwt from "./middlewares/tokenAuthMiddleware.js";
import logger from "./middlewares/requestLoggerMiddleware.js";

export function initServer() {
    const app = express();

    // Middleware
    app.use(cors({
        origin:"*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.options('/', cors());

    // parse token
    app.use((req, res, next) => {
        const header = req.header("Authorization");
        if(header) req.token = header.split(" ")[1];
        next();
    });

    app.use(express.json());
    app.use(logger);

    // Public routes 
    app.use("/auth", authRoutes);

    // Auth middleware
    app.use(jwt);

    // Secure routes 
    app.use("/decks", deckRoutes);

    return app;
}
