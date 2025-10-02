import mongoose from "mongoose";
import log from "../utils/logger.js";

export async function connect(connectionString, dbName) {
    log.info("Init database connection...");
    const url = `${connectionString}/${dbName}?authSource=admin`;
    await mongoose.connect(url);
    log.info("Db connection established");
}

export async function close() {
    db.disconnect();
    log.info("Database connection closed");
}

export const ObjectId = mongoose.Types.ObjectId;

export default {
    connect, close,
    ObjectId, //todo: find a better way to do it
}