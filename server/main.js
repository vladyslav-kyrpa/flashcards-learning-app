import { initServer } from "./src/server.js";
import mongo from "./src/data-access/mongoDb.js";

const PORT = process.env.PORT || 8080;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "";
const DB_NAME = process.env.DB_NAME || "";

run().catch((error) => {
  console.error(error);
  mongo.close();
});

async function run() {
  await mongo.connect(DB_CONNECTION_STRING, DB_NAME);
  const server = initServer();

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}



