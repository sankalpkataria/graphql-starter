import {gql} from "apollo-server-express";

export const types = gql`	
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
            name: String!
            email: String!
            age: Int!
        ): String
    }
`;
