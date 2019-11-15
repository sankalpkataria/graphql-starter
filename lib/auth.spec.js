const {sign, verify} = require("jsonwebtoken");
const {constants} = require(__basedir + "/config");
const {AppError} = require(__basedir + "/errors");
const {createToken, authenticateUserWithToken} = require("./auth");

const {ERROR, LOG_LEVELS} = constants;
let token;

beforeEach(() => {
	token = null;
});

describe("Auth error path", () => {

	it("should throw error if auth token not present", async () => {
		try {
			await authenticateUserWithToken();
		} catch (e) {
			expect(e).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.UNAUTHENTICATED.TYPE, "Access denied.", ERROR.UNAUTHENTICATED.CODE, true));
		}
	});

	it("should throw error if auth token format is incorrect", async () => {
		try {
			token = "token";
			await authenticateUserWithToken(token);
		} catch (e) {
			expect(e).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.UNAUTHENTICATED.TYPE, "Format is: Bearer <token>", ERROR.UNAUTHENTICATED.CODE, true));
		}
	});

	it("should throw error if token scheme is not Bearer", async () => {
		try {
			token = "scheme token";
			await authenticateUserWithToken(token);
		} catch (e) {
			expect(e).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.UNAUTHENTICATED.TYPE, "Format is: Bearer <token>", ERROR.UNAUTHENTICATED.CODE, true));
		}
	});

});
