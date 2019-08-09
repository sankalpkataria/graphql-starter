import {gql} from "apollo-server-express";

export const rootTypes = gql`

    type Mutation {
        root: String
    }
	
    type Query {
        root: String
    }
`;
