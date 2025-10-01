import { UserModel } from "../data-access/models/user.js";
import { ObjectId } from "../data-access/mongoDb.js";
import schema from "../schema/profile.schema.js";
import { validateSchema } from "../schema/validator.js";

export async function getUser(id) {
    const user = await UserModel.findById(new ObjectId(id));

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

    const user = await UserModel.findById(new ObjectId(profile.id));

    user.name = profile.name;
    user.email = profile.email;

    await user.save();
}

export async function deleteProfile(id) {
    const result = await UserModel.deleteOne({ _id: new ObjectId(id) });
    if (!result)
        throw Error("User not found");
}

export default { getUser, updateProfile, deleteProfile };