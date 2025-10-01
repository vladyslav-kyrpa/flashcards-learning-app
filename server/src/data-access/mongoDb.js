import mongoose from "mongoose";

export async function connect(connectionString, dbName) {
    console.log("Init database connection...");
    const url = `${connectionString}/${dbName}?authSource=admin`;
    await mongoose.connect(url);
    console.log("Db connection established");
}

export async function close() {
    db.disconnect();
    console.log("Database connection closed");
}

export const ObjectId = mongoose.Schema.ObjectId;

export default {
    connect, close,
    ObjectId, //todo: find a better way to do it
}