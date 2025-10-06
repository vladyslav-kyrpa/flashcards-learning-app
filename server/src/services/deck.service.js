import { DeckModel } from "../data_access/models/index.js";
import { UserModel } from "../data_access/models/index.js";
import { ObjectId } from "../data_access/mongo_db.js";
import { validateSchema } from "../utils/schema/schema_validator.js";
import schema from "../utils/schema/deck.schema.js";

export async function create(deck, authorId) {
    if (!authorId)
        throw Error("Cannot create a deck without author")

    const authorExists = await UserModel.exists({ _id: toObjectId(authorId) });
    if (!authorExists)
        throw Error("Author doesn't exist");

    const errors = validateSchema(schema, deck);
    if (errors.length > 0)
        throw Error(errors.join("; "))

    const newDeck = DeckModel({
        title: deck.title,
        authorId: authorId,
        cards: deck.cards
    });

    await newDeck.save();
}

export async function remove(id) {
    const result = await DeckModel
        .findByIdAndDelete(toObjectId(id));

    if (!result) throw Error("Deck not found");
}

export async function isAuthor(deckId, userId) {
    const result = await DeckModel.findOne({
        _id: toObjectId(deckId),
        authorId: toObjectId(userId)
    });
    return result ? true : false;
}

function toObjectId(value) {
    try {
        return new ObjectId(value);
    } catch (error) {
        throw Error("Invalid Deck ID");
    }
}

export async function update(id, updatedDeck) {
    const errors = validateSchema(schema, updatedDeck);
    if (errors.length > 0)
        throw Error(errors.join("; "))

    const deck = await DeckModel.findById(new ObjectId(id));
    if (!deck) throw Error("Deck not found");

    deck.cards = updatedDeck.cards;
    deck.title = updatedDeck.title;

    await deck.save();
}

export async function getOne(id) {
    const deck = await DeckModel.findById(id);
    if (!deck) throw Error("Deck not found");

    const author = await UserModel.findById(deck.authorId);
    if (!author) throw Error("Deck author not found");

    return {
        id: deck._id,
        title: deck.title,
        cards: deck.cards,
        author: {
            id: author._id,
            name: author.name
        }
    };
}

export async function getAll() {
    const decks = await DeckModel.find();
    return decks.map((deck) => ({
        id: deck._id,
        title: deck.title,
        cards: deck.cards
    }));
}

export default { create, remove, update, getAll, getOne, isAuthor };