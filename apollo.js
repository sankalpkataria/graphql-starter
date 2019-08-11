import {ApolloServer} from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import {resolvers, typeDefs} from "./modules";
import {constants} from "./config";
import {logger} from "./errors";

const {ENV, ENVIRONMENTS, ERROR, LOG_LEVELS} = constants;

export const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({req}) => ({auth: req.headers.authorization}),
	formatError: (error) => {
		logger.log(
			LOG_LEVELS.ERROR,
			error.message,
			{
				code: ERROR.INTERNAL_SERVER_ERROR.CODE,
				type: ERROR.INTERNAL_SERVER_ERROR.TYPE,
				time: new Date(),
				isOperational: false
			}
		);
		if (ENV === ENVIRONMENTS.PRODUCTION) {
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
	debug: ENV !== ENVIRONMENTS.PRODUCTION,
	introspection: ENV !== ENVIRONMENTS.PRODUCTION,
	playground: ENV !== ENVIRONMENTS.PRODUCTION,
	tracing: ENV !== ENVIRONMENTS.PRODUCTION,
	validationRules: [depthLimit(4)]
});
