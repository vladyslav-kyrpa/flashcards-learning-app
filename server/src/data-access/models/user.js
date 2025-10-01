import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String
});

export const UserModel = mongoose.models.user
    || mongoose.model("user", UserSchema);