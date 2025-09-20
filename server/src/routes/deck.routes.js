import express from "express";
import { createDeck, getDeck, getDeckList, removeDeck, updateDeck } from "../controllers/deck.controller.js";

const router = express.Router();

router.get("/", getDeckList);
router.post("/create", createDeck);
router.post("/update/:id", updateDeck);
router.post("/remove/:id", removeDeck);
router.get("/:id", getDeck);

export default router;