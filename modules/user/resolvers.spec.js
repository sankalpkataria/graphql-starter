const { resolvers } = require("./resolvers");
const { constants } = require(__basedir + "/config");
const { users } = require(__basedir + "/db/operations");
const { AppError } = require(__basedir + "/errors");
const { createToken, authenticateUserWithToken } = require(__basedir + "/lib");

const { getUserById, createUser } = users;
const { ERROR, LOG_LEVELS } = constants;

jest.mock(__basedir + "/db/operations/users", () => ({
    getUserById: jest.fn(),
    createUser: jest.fn(),
}));

jest.mock(__basedir + "/lib/auth", () => ({
    createToken: jest.fn(),
    authenticateUserWithToken: jest.fn(),
}));

let args, id, res, ctx;

beforeEach(() => {
    args = null;
    id = null;
    ctx = null;
    res = null;
    getUserById.mockClear();
    createUser.mockClear();
    createToken.mockClear();
    authenticateUserWithToken.mockClear();
});

describe("User resolvers happy path", () => {
    it("should return user data", async () => {
        try {
            ctx = { authToken: "some-token" };
            id = "some-id";
            res = {
                "_id": id,
                "name": "some-name",
                "email": "some-email",
                "age": 24
            };

            getUserById.mockResolvedValue(res);
            authenticateUserWithToken.mockResolvedValue({ _id: id });

            const user = await resolvers.Query.user({}, {}, ctx);
            expect(authenticateUserWithToken).toHaveBeenCalledTimes(1);
            expect(authenticateUserWithToken).toHaveBeenCalledWith(ctx.authToken);
            expect(getUserById).toHaveBeenCalledTimes(1);
            expect(getUserById).toHaveBeenCalledWith(id);
            expect(user).toMatchObject(res);
        } catch (e) {
            console.log(e);
            throw e;
        }
    });

    it("should create a new user", async () => {
        try {
            args = {
                "name": "abc",
                "email": "abc@xyz.com",
                "age": 24
            };
            res = Object.assign({ _id: "some-id" }, args);
            const token = "some-token";
            const output = {
                user: res,
                token
            };

            createUser.mockResolvedValue(res);
            createToken.mockResolvedValue(token);

            const data = await resolvers.Mutation.createUser({}, args);
            expect(createToken).toHaveBeenCalledTimes(1);
            expect(createToken).toHaveBeenCalledWith(res);
            expect(createUser).toHaveBeenCalledTimes(1);
            expect(createUser).toHaveBeenCalledWith(args);
            expect(data).toMatchObject(output);
        } catch (e) {
            console.log(e);
            throw e;
        }
    });
});

describe("User resolvers error path", () => {
    it("should throw error if user is not present", async () => {
        try {
            ctx = { authToken: "some-token" };
            id = "some-id";
            args = { _id: id };

            getUserById.mockResolvedValue(null);
            authenticateUserWithToken.mockResolvedValue({ _id: id });
            await resolvers.Query.user({}, args, ctx);
        } catch (e) {
            expect(e).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.NOT_FOUND.TYPE, "User not found.", ERROR.NOT_FOUND.CODE, true));
            expect(authenticateUserWithToken).toHaveBeenCalledTimes(1);
            expect(authenticateUserWithToken).toHaveBeenCalledWith(ctx.authToken);
            expect(getUserById).toHaveBeenCalledTimes(1);
            expect(getUserById).toHaveBeenCalledWith(id);
        }
    });
});
