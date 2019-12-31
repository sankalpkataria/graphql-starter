const { merge } = require("lodash");
const { userResolvers, userTypeDef } = require("./user");
const { rootTypes } = require("./root.graphql");
const { rootResolvers } = require("./root.resolver");

const typeDefs = [ rootTypes, userTypeDef ];
const resolvers = [ rootResolvers, userResolvers ].reduce(merge);

module.exports = {
    typeDefs,
    resolvers
};
