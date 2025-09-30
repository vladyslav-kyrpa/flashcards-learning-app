import { ObjectId } from "mongodb";
import { getDatabase } from "../data-access/mongoDb.js";
import schema from "../schema/profile.schema.js";
import { validateSchema } from "../schema/validator.js";

export async function getUser(id) {
    const db = getDatabase();

    const user = await db.collection("users")
        .findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
}

export async function updateProfile(profile) {
    const errors = validateSchema(schema, profile);
    if (errors.length > 0)
        throw Error("Invalid profile object");

    const db = getDatabase();

    await db.collection("users").updateOne({ _id: new ObjectId(profile.id) }, {
        $set: { name: profile.name, email: profile.email }
    }, {});
}

export async function deleteProfile(id) {
    const db = getDatabase();

    const result = await db.collection("users")
        .deleteOne({ _id: new ObjectId(id) });

    if (!result)
        throw Error("User not found");
}

export default { getUser, updateProfile, deleteProfile };