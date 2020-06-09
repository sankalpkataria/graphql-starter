const { gql } = require("apollo-server-express");

const rootTypes = gql`
    type Mutation {
        welcome: String
    }

    type Query {
        appName: String
    }
`;

module.exports = {
    rootTypes
};
