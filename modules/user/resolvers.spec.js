const {resolvers} = require("./resolvers");
const {constants} = require(__basedir + "/config");
const {users} = require(__basedir + "/db/operations");
const {AppError} = require(__basedir + "/errors");

const {getUserById, getUsers, createUser} = users;
const {ERROR, LOG_LEVELS} = constants;

jest.mock(__basedir + "/db/operations/users", () => ({
	getUserById: jest.fn(),
	getUsers: jest.fn(),
	createUser: jest.fn(),
}));

let args = {};
let id;

beforeEach(() => {
	args = null;
	id = null;
	getUserById.mockClear();
	getUsers.mockClear();
	createUser.mockClear();
});

describe("User resolvers happy path", () => {
	it("should return user data", async () => {
		try {
			id = "some-id";
			const res = {
				"_id": id,
				"name": "some-name",
				"email": "some-email",
				"age": 24
			};

			getUserById.mockResolvedValue(res);

			args = {_id: id};

			const user = await resolvers.Query.user({}, args);
			expect(getUserById).toHaveBeenCalledTimes(1);
			expect(getUserById).toHaveBeenCalledWith(id);
			expect(user).toMatchObject(res);
		} catch (e) {
			console.log(e);
			throw e;
		}
	});

	it("should return array of users", async () => {
		try {
			const res = [{
				"_id": "some-id",
				"name": "some-name",
				"email": "some-email",
				"age": 24
			}, {
				"_id": "some-other-id",
				"name": "some-other-name",
				"email": "some-other-email",
				"age": 25
			}];
			getUsers.mockResolvedValue(res);
			const data = await resolvers.Query.users();
			expect(getUsers).toHaveBeenCalledTimes(1);
			expect(data).toMatchObject(res);
		} catch (e) {
			console.log(e);
			throw e;
		}
	});

	it("should create a new user", async () => {
		try {
			const args = {
				"name": "abc",
				"email": "abc@xyz.com",
				"age": 24
			};
			const res = Object.assign({_id: "some-id"}, args);

			createUser.mockResolvedValue(res);

			const data = await resolvers.Mutation.createUser({}, args);
			expect(createUser).toHaveBeenCalledTimes(1);
			expect(createUser).toHaveBeenCalledWith(args);
			expect(data).toBe("User added successfully.");
		} catch (e) {
			console.log(e);
			throw e;
		}
	});
});

describe("User resolvers error path", () => {
	it("should throw error if user is not present", async () => {
		try {
			id = "some-id";
			args = {_id: id};

			getUserById.mockResolvedValue(null);
			await resolvers.Query.user({}, args);
		} catch (e) {
			expect(e).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.NOT_FOUND.TYPE, "User not found.", ERROR.NOT_FOUND.CODE, true));
			expect(getUserById).toHaveBeenCalledTimes(1);
			expect(getUserById).toHaveBeenCalledWith(id);
		}
	});

	it("should throw error if no user is present in DB", async () => {
		try {
			getUsers.mockResolvedValue(null);
			await resolvers.Query.users();
		} catch (e) {
			expect(e).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.NOT_FOUND.TYPE, "No user found.", ERROR.NOT_FOUND.CODE, true));
			expect(getUsers).toHaveBeenCalledTimes(1);
		}
	});
});
