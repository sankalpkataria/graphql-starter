const {users} = require(__basedir + "/db/operations");
const {throwNotFoundError} = require(__basedir + "/errors");
const {createToken, authenticateUserWithToken} = require(__basedir + "/lib");

const resolvers = {
	Query: {
		user: async (parent, args, {authToken}) => {
			try {
				const user = await authenticateUserWithToken(authToken);
				const userObj = await users.getUserById(user._id);
				if (!userObj) {
					throwNotFoundError("User not found.");
				}
				return userObj;
			} catch (e) {
				throw e;
			}
		},
		getToken: async (parent, {email}) => {
			try {
				const user = await users.getUser({email});
				if (!user) {
					throwNotFoundError("User not found.");
				}
				const token = await createToken(user);
				return {
					user,
					token
				};
			} catch (e) {
				throw e;
			}
		}
	},
	Mutation: {
		createUser: async (parent, args) => {
			try {
				const user = await users.createUser(args);
				const token = await createToken(user);
				return {
					user,
					token
				};
			} catch (e) {
				throw e;
			}
		}
	},
};

module.exports = {
	resolvers
};
