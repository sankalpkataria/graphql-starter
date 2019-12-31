const { gql } = require("apollo-server-express");

const rootTypes = gql`
    type Mutation {
        root: String
    }

    type Query {
        root: String
    }
`;

module.exports = {
    rootTypes
};
