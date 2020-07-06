const { ApolloServer } = require("apollo-server-express");
const depthLimit = require("graphql-depth-limit");
const { resolvers, typeDefs } = require("./modules");
const { constants } = require("./config");
const { logger } = require("./errors");

const { ENV, ENVIRONMENTS, ERROR, LOG_LEVELS } = constants;

const formatError = (error) => {
    const errorInfo = {
        code: ERROR.INTERNAL_SERVER_ERROR.CODE,
        type: ERROR.INTERNAL_SERVER_ERROR.TYPE,
        time: new Date(),
        path: error.path,
        isOperational: false
    };
    const exception = error.extensions && error.extensions.exception;
    if (exception) {
        errorInfo.code = exception.code;
        errorInfo.type = exception.type;
        errorInfo.time = exception.time;
        errorInfo.isOperational = exception.isOperational;
        if (ENV === ENVIRONMENTS.PRODUCTION) {
            errorInfo.stacktrace = JSON.stringify(exception.stacktrace, null, 2);
            delete exception.stacktrace;
        }
        logger.log(LOG_LEVELS.ERROR, error.message, errorInfo);
        return exception;
    }
    
    // For errors that do not reach our resolvers such as graphQL validations, etc
    logger.log(LOG_LEVELS.ERROR, error.message, errorInfo);
    return error;
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({ authToken: req.headers.authorization }),
    formatError: formatError,
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
    validationRules: [ depthLimit(4) ]
});

module.exports = {
    apolloServer
};
