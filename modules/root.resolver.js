const rootResolvers = {
    Mutation: {
        welcome: () => "Welcome to GraphQL Starter Kit"
    },
    Query: {
        appName: () => "GraphQL starter kit"
    }
};
module.exports = {
    rootResolvers
};
