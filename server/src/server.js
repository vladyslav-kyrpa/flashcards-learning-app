import express from "express";
import deckRoutes from "./routes/deck.routes.js";
import cors from "cors";

export function initServer() {
    const app = express();

    // Middleware
    app.use(express.json());

    app.use(cors());

    // Routes
    app.use("/decks", deckRoutes);

    return app;
}
