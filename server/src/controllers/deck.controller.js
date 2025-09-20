import response from "../utils/responses.js";
import { validateSchema } from "../schema/validator.js";
import schema from "../schema/deck.schema.js";
import service from "../services/deck.service.js";

export async function getDeck(req, res) {
    const { id } = req.params;
    if(!id){
        response.badRequest(res, `Deck id was not provided`);
        return;
    }
    const deck = await service.getOne(id);
    response.ok(res, deck)
}

export async function getDeckList(req, res) {
    try {
        const decks = await service.getAll();
        response.ok(res, decks ?? []);
    } catch(e){
        console.error(e);
    }
}

export async function createDeck(req, res) {
    const deck = req.body;

    const errors = validateSchema(schema, deck);
    if(errors.length > 0){
        console.error(`Incorrect input ${errors}`);
        response.badRequest(res, "Invalid object");
        return;
    }

    await service.create(deck);

    response.ok(res, "deck was created");
}

export async function updateDeck(req, res) {
    const { id } = req.params;
    const deck = req.body;

    const errors = validateSchema(schema, deck);
    if(errors.length > 0){
        console.error(`Incorrect input ${errors}`);
        response.badRequest(res, "Invalid object");
        return;
    }
    if(!id){
        response.badRequest(res, `Deck id was not provided`);
        return;
    }

    await service.update(id, deck);

    response.ok(res, `deck ${id} was updated`);
}

export async function removeDeck(req, res) {
    const { id } = req.params;

    if(!id){
        response.badRequest(res, `Deck id was not provided`);
        return;
    }

    await service.remove(id);

    response.ok(res, `deck ${id} was removed`);
}