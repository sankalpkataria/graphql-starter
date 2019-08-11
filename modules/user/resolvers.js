import {AppError} from "../../errors";
import {constants} from "../../config";
import users from "../../.data/user";

const {ERROR, LOG_LEVELS} = constants;
export const resolvers = {
	Query: {
		user: (parent, args, {auth}, info) => {
			const user = users.find(user => user.id === args.id);
			if (!user) {
				throw new AppError(LOG_LEVELS.info, ERROR.NOT_FOUND.TYPE, "User not found.", ERROR.NOT_FOUND.CODE, true);
			}
			return user;
		},
		users: (parent, args, {auth}, info) => {
			return users;
		}
	},
	Mutation: {
		createUser: (parent, args, {auth}, info) => {
			users.push(args);
			return "User added successfully."
		}
	},
};
