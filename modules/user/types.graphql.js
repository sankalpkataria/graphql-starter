const {gql} = require("apollo-server-express");

const types = gql`
    type User {
        _id: ID
        name: String
        email: String
        age: Int
    }
	
	type UserToken {
		user: User
		token: String
	}

    extend type Query {
        user: User
    }

    extend type Mutation {
        createUser(
            name: String!
            email: String!
            age: Int!
        ): UserToken
    }
`;

module.exports = {
	types
};
