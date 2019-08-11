import {createServer} from "http";
import open from "open";
import {logger} from "./errors";

import {constants} from "./config";
import {apolloServer} from "./apollo";
import {app} from "./app";

const {PORT} = constants;
const server = createServer(app);

apolloServer.applyMiddleware({app});
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
