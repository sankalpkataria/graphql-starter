import {sign, verify} from "jsonwebtoken";
import {constants} from "../config";
import {throwUnAuthenticatedError} from "../errors";

const {SECRET} = constants;

export const authenticateUserWithToken = function (auth) {
	if (!auth) {
		throwUnAuthenticatedError("Access denied.");
	}
	const authParts = auth.split(" ");
	if (authParts.length !== 2) {
		throwUnAuthenticatedError("Format is: Bearer <token>");
	}
	const [scheme, token] = authParts;
	if (new RegExp("^Bearer$").test(scheme)) {
		try {
			return verify(token, SECRET);
		} catch (e) {
			throwUnAuthenticatedError(e.message);
		}
	} else {
		throwUnAuthenticatedError("Format is: Bearer <token>");
	}
};

export const createToken = function (payload) {
	const tokenPayload = Object.assign({time: new Date().getTime()}, payload);
	return sign(tokenPayload, SECRET, {expiresIn: "7 days"});
};
