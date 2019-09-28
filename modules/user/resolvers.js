const {constants} = require(__basedir + "/config");
const {users} = require(__basedir + "/db/operations");
const {throwNotFoundError} = require(__basedir + "/errors");

const {ERROR, LOG_LEVELS} = constants;
const resolvers = {
	Query: {
		user: async (parent, args, ctx, info) => {
			try {
				const user = await users.getUserById(args._id);
				if (!user) {
					throwNotFoundError("User not found.");
				}
				return user;
			} catch (e) {
				throw e;
			}
		},
		users: async (parent, args, ctx, info) => {
			try {
				const userList = await users.getUsers();
				if (!userList || !userList.length) {
					throwNotFoundError("No user found.");
				}
				return userList;
			} catch (e) {
				throw e;
			}
		}
	},
	Mutation: {
		createUser: async (parent, args, ctx, info) => {
			try {
				const user = await users.createUser(args);
				return "User added successfully."
			} catch (e) {
				throw e;
			}
		}
	},
};

module.exports = {
	resolvers
};
