const {resolvers} = require("./resolvers");
const {constants} = require(__basedir + "/config");
const users = require(__basedir + "/.data/user");
const {AppError} = require(__basedir + "/errors");

const {ERROR, LOG_LEVELS} = constants;

let args = {};

beforeEach(() => {
	args = null;
});

describe("User resolvers happy path", () => {
	it("should return user data", () => {
		try {
			const res = {
				"id": "1",
				"name": "abc",
				"email": "abc@xyz.com",
				"age": 24
			};
			args = {id: "1"};
			const user = resolvers.Query.user({}, args, {}, {});
			expect(user).toMatchObject(res);
		} catch (e) {
			console.log(e);
			throw e;
		}
	});

	it("should return array of users", () => {
		try {
			const result = resolvers.Query.users({}, {}, {}, {});
			expect(result).toMatchObject(users);
		} catch (e) {
			console.log(e);
			throw e;
		}
	});

	it("should create a new user", () => {
		try {
			args = {
				id: "4",
				name: "some-name",
				email: "some-email",
				age: 10
			};
			const result = resolvers.Mutation.createUser({}, args, {}, {});
			expect(result).toBe("User added successfully.");
		} catch (e) {
			console.log(e);
			throw e;
		}
	});
});

describe("User resolvers error path", () => {
	it("should throw error if user is not present", () => {
		try {
			args = {id: "99"};
			resolvers.Query.user({}, args, {}, {});
		} catch (e) {
			expect(e).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.NOT_FOUND.TYPE, "User not found.", ERROR.NOT_FOUND.CODE, true));
		}
	});
});
