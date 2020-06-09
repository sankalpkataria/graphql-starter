const { users } = require(__basedir + "/db/operations");
const { throwNotFoundError } = require(__basedir + "/errors");
const { createToken, authenticateUserWithToken } = require(__basedir + "/lib");

const resolvers = {
    Query: {
        user: async (parent, args, { authToken }) => {
            const user = await authenticateUserWithToken(authToken);
            const userObj = await users.getUserById(user._id);
            if (!userObj) {
                throwNotFoundError("User not found.");
            }
            return userObj;
        },
        getToken: async (parent, { email }) => {
            const user = await users.getUser({ email });
            if (!user) {
                throwNotFoundError("User not found.");
            }
            const token = await createToken(user);
            return {
                user,
                token
            };
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await users.createUser(args);
            const token = await createToken(user);
            return { user, token };
        }
    },
};

module.exports = {
    resolvers
};
