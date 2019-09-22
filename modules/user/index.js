const {types} = require("./types.graphql");
const {resolvers} = require("./resolvers");

module.exports = {
	userTypeDef: types,
	userResolvers: resolvers
};
