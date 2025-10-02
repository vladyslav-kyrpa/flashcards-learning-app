import express from "express";
import deckRoutes from "./routes/deck.routes.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import cors from "cors";
import jwt from "./middlewares/jwt_auth.js";
import errorHandling from "./middlewares/error_handling.js";
import requestLogging from "./middlewares/request_logging.js";

export function initServer() {
    const app = express();

    // Middleware
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.options('/', cors());

    app.use(requestLogging);

    // parse token
    app.use((req, res, next) => {
        const header = req.header("Authorization");
        if (header) req.token = header.split(" ")[1];
        next();
    });

    app.use(express.json());

    // Public routes 
    app.use("/auth", authRoutes);

    // Auth middleware
    app.use(jwt);

    // Secure routes 
    app.use("/decks", deckRoutes);
    app.use("/profiles", profileRoutes);

    // Error handling
    app.use((req, res, next) => {
        res.status(404).json({ error: "Not Found" });
    });

    app.use(errorHandling);

    return app;
}
