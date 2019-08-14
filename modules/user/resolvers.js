import {constants} from "../../config";
import users from "../../.data/user";
import {throwNotFoundError} from "../../errors";

const {ERROR, LOG_LEVELS} = constants;
export const resolvers = {
	Query: {
		user: (parent, args, {authToken}, info) => {
			const user = users.find(user => user.id === args.id);
			if (!user) {
				throwNotFoundError("User not found.");
			}
			return user;
		},
		users: (parent, args, {authToken}, info) => {
			return users;
		}
	},
	Mutation: {
		createUser: (parent, args, {authToken}, info) => {
			users.push(args);
			return "User added successfully."
		}
	},
};
