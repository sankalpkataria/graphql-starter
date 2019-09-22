const {ApolloServer} = require("apollo-server-express");
const depthLimit = require("graphql-depth-limit");
const {resolvers, typeDefs} = require("./modules");
const {constants} = require("./config");
const {logger} = require("./errors");

const {ENV, ENVIRONMENTS, ERROR, LOG_LEVELS} = constants;

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({req}) => ({authToken: req.headers.authorization}),
	formatError: (error) => {
		if (!error.extensions || !error.extensions.exception || !error.extensions.exception.type) {
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
		}
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

module.exports = {
	apolloServer
};
