const {gql} = require("apollo-server-express");

const types = gql`
    type User {
        id: ID
        name: String
        email: String
        age: Int
    }

    extend type Query {
        user (
            id: ID!
        ): User

        users: [User]
    }

    extend type Mutation {
        createUser(
            id: ID!
            name: String!
            email: String!
            age: Int!
        ): String
    }
`;

module.exports = {
	types
};
