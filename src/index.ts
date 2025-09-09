import { SSRServer } from "./lib/server/index.js";

const server = new SSRServer({port: 8001});
server.init();