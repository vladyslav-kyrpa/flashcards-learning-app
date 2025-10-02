import response from "../utils/responses.js";
import { validateSchema } from "../utils/schema/schema_validator.js";
import schema from "../utils/schema/deck.schema.js";
import service from "../services/deck.service.js";
import log from "../utils/logger.js";

export async function getDeck(req, res) {
    const { id } = req.params;
    if (!id) {
        response.badRequest(res, `Deck id was not provided`);
        return;
    }

    log.info(`User ${req.user.name} tries to get deck`);

    const deck = await service.getOne(id);
    response.ok(res, deck)
}

export async function getDeckList(req, res) {
    try {
        const decks = await service.getAll();
        response.ok(res, decks ?? []);
    } catch (e) {
        log.error(e);
    }
}

export async function createDeck(req, res) {
    const deck = req.body;

    const errors = validateSchema(schema, deck);
    if (errors.length > 0) {
        log.error(`Incorrect input ${errors}`);
        response.badRequest(res, "Invalid object");
        return;
    }

    await service.create(deck, req.user.id);

    log.info(`User ${req.user.id} created a deck`);
    response.ok(res, "deck was created");
}

export async function updateDeck(req, res) {
    const { id } = req.params;
    if (!id) {
        response.badRequest(res, `Deck id was not provided`);
        return;
    }

    if (!await service.isAuthor(id, req.user.id)) {
        log.warning(`User ${req.user.id} tries to update the deck(${id}) without permissions`);
        response.badRequest(res, `You have no rights to update this deck`);
        return;
    }

    const deck = req.body;
    const errors = validateSchema(schema, deck);
    if (errors.length > 0) {
        log.error(`Incorrect input ${errors}`);
        response.badRequest(res, "Invalid object");
        return;
    }

    await service.update(id, deck);

    log.info(`User ${req.user.id} updated the deck:${id}`);
    response.ok(res, `deck ${id} was updated`);
}

export async function removeDeck(req, res) {
    const { id } = req.params;

    if (!id) {
        response.badRequest(res, `Deck id was not provided`);
        return;
    }

    if (!await service.isAuthor(id, req.user.id)) {
        log.warning(`User ${req.user.id} tries to remove the deck(${id}) without permissions`);
        response.badRequest(res, `You have no rights to remove this deck`);
        return;
    }

    await service.remove(id);

    log.info(`User ${req.user.id} removed the deck:${id}`);
    response.ok(res, `deck ${id} was removed`);
}