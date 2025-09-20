import { initServer } from "./src/server.js";

const PORT = process.env.PORT || 8080;

const server = initServer();

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});