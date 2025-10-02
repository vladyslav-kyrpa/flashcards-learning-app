import { initServer } from "./server.js";
import mongo from "./data_access/mongo_db.js";
import log from "./utils/logger.js";

const PORT = process.env.PORT || 8080;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "";
const DB_NAME = process.env.DB_NAME || "";

run().catch((error) => {
  log.error(error);
  mongo.close();
});

async function run() {
  await mongo.connect(DB_CONNECTION_STRING, DB_NAME);
  const server = initServer();

  server.listen(PORT, () => {
    log.info(`Server running at http://localhost:${PORT}`);
  });
}



