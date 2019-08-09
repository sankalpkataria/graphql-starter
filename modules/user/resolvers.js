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
export const resolvers = {
    Query: {
        user: (parent, args, {auth}, info) => {
			if (!args.id) {
                throw new Error("User id required.")
            }
            return users.find(user => user.id === args.id);
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
