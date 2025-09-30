import { MongoClient } from "mongodb";

let client;
let db;

export async function connect(connectionString, dbName) {
    console.log("Init database connection...");
    client = new MongoClient(connectionString, {
        serverSelectionTimeoutMS: 5000
    });
    await client.connect();
    console.log("Connected to a database");
    db = client.db(dbName);
    console.log("Db connection established");
}

export function getDatabase() {
    console.log("Get database");
    return db;
}

export async function close() {
    console.log("Close Db connection");
    client.close();
}

export default { connect, getDatabase, close }