import mongoose from "mongoose";

const DeckSchema = new mongoose.Schema({
    authorId: mongoose.Schema.ObjectId,
    title: String,
    cards: [],
});

export const DeckModel = mongoose.models.deck
    || mongoose.model("deck", DeckSchema);