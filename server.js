const { createServer } = require("http");
const open = require("open");
const { logger } = require("./errors");
const { constants } = require("./config");
const { apolloServer } = require("./apollo");
const { app } = require("./app");
const { connectToMongoDb } = require("./db/connection");

const { PORT } = constants;

connectToMongoDb();

const server = createServer(app);

apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(server);

server.listen(PORT, err => {
    if (err) {
        return console.log(`Something went wrong: \n${err}`);
    }
    console.log(`Server is listening on port: ${PORT}`);
    open(`http://localhost:${PORT}/graphql`);
});

process.on("unhandledRejection", error => {
    process.exit(1);
});

process.on("exit", code => {
    console.log(`Exiting with code: ${code}`);
});
