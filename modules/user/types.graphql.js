const {gql} = require("apollo-server-express");

const types = gql`
    type User {
        _id: ID
        name: String
        email: String
        age: Int
    }

    extend type Query {
        user (
            _id: ID!
        ): User

        users: [User]
    }

    extend type Mutation {
        createUser(
            name: String!
            email: String!
            age: Int!
        ): String
    }
`;

module.exports = {
	types
};
