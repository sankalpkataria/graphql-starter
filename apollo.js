import {ApolloServer} from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import {resolvers, typeDefs} from "./modules";
import {constants} from "./config";

export const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	formatError: (error) => {
		if (constants.ENV === constants.PRODUCTION) {
			return error.message;
		}
		return error;
	},
	schemaDirectives: {
		// define directives here
	},
	subscriptions: {
		onConnect: (connectionParams, webSocket) => {
			// Do something here
		},
		onDisconnect: () => {
			// Do something here
		}
	},
	debug: constants.ENV !== constants.PRODUCTION,
	introspection: constants.ENV !== constants.PRODUCTION,
	playground: constants.ENV !== constants.PRODUCTION,
	tracing: constants.ENV !== constants.PRODUCTION,
	validationRules: [depthLimit(4)]
});
