import fastify, { FastifyInstance, FastifyLoggerInstance, FastifyServerOptions } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import router from "./router";

const serverOptions: FastifyServerOptions<Server, FastifyLoggerInstance> = {
    // Logger only for production
    logger: process.env.NODE_ENV === "production"
};

const app: FastifyInstance<Server,
    IncomingMessage,
    ServerResponse> = fastify(serverOptions);

// Middleware: Router
app.register(router);

export default app;
