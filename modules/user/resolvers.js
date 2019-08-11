import {AppError} from "../../errors";
import {constants} from "../../config";

const users = [
    {
        id: "1",
        name: "abc",
        email: "abc@xyz.com",
        age: 24
    },
    {
        id: "2",
        name: "def",
        email: "def@xyz.com",
        age: 25
    },
    {
        id: "3",
        name: "pqr",
        email: "pqr@xyz.com",
        age: 26
    }
];
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
