import response from "../utils/responses.js";
import service from "../services/profile.service.js";
import schema from "../utils/schema/profile.schema.js";
import { validateSchema } from "../utils/schema/schema_validator.js";
import log from "../utils/logger.js";

export async function getCurrent(req, res) {
    const user = req.user;
    if (!user.id) {
        log.error("User is not authenticated");
        throw Error("Authentication error in a protected route");
    }

    log.info(`User ${user.id} tries to get their profile`);

    const profile = await service.getUser(user.id);
    if (!profile) {
        log.error(`User profile was not found with id:${id}`);
        response.badRequest(res, "Profile not found")
        return;
    }

    response.ok(res, profile);
}

export async function getProfile(req, res) {
    const { id } = req.params;
    if (!id) {
        response.badRequest("User id was not provided");
        return;
    }

    log.info(`Get user ${id} profile`);

    const profile = await service.getUser(id);
    if (!profile) {
        log.error("User profile was not found");
        response.badRequest(res, "Profile not found")
        return;
    }

    response.ok(res, profile);
}

export async function updateProfile(req, res) {
    const profile = req.body;

    const errors = validateSchema(schema, profile);
    if (errors.length > 0) {
        response.badRequest(res, "Invalid object");
        return;
    }

    // check if owner
    if (profile.id !== req.user.id) {
        log.warning(`User ${req.user.name} tried to update user's ${req.user.id} profile`);
        response.badRequest(res, "You have no rights to update this profile");
        return;
    }

    await service.updateProfile(profile);
    log.info(`User ${req.user.id} successfuly updated it's profile`)
    response.ok(res, "Profile updated");
}

export async function deleteProfile(req, res) {
    const { id } = req.params;
    if (!id) {
        response.badRequest("User name was not provided");
        return;
    }

    // check if owner
    if (id !== req.user.id) {
        log.info(`User ${req.user.id} tried to delte user's (${id}) profile`);
        response.badRequest(res, "You have no rights to delete this profile");
        return;
    }

    await service.deleteProfile(id);
    log.info(`User ${req.user.id} successfuly deleted it's profile`);
    response.ok(res, "Profile deleted");
}