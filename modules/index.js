import {merge} from "lodash";
import {userResolvers, userTypeDef} from "./user";
import {rootTypes} from "./root.graphql";
import {rootResolvers} from "./root.resolver";

export const typeDefs = [rootTypes, userTypeDef];
export const resolvers = [rootResolvers, userResolvers].reduce(merge);
