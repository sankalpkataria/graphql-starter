const {constants} = require("../../config");
const {users} = require("../../db/operations");
const {throwNotFoundError} = require("../../errors");

const {ERROR, LOG_LEVELS} = constants;
const resolvers = {
	Query: {
		user: async (parent, args, {authToken}, info) => {
			const user = await users.getUserById(args.id);
			if (!user) {
				throwNotFoundError("User not found.");
			}
			return user;
		},
		users: async (parent, args, {authToken}, info) => {
			const users = await users.getUsers();
			if (!users || !users.length) {
				throwNotFoundError("No user found.");
			}
			return users;
		}
	},
	Mutation: {
		createUser: async (parent, args, {authToken}, info) => {
			const user = await users.createUser(args);
			return "User added successfully."
		}
	},
};

module.exports = {
	resolvers
};
