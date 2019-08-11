import {sign, verify} from "jsonwebtoken";
import {constants} from "../config";

const {SECRET} = constants
export const authenticateUserWithToken = function (auth) {
	if (!auth) {
		throw new Error("Access denied.");
	}
	const authParts = auth.split(" ");
	if (authParts.length !== 2) {
		throw new Error("Format is: Bearer <token>");
	}
	const [scheme, token] = authParts;
	if (new RegExp("^Bearer$").test(scheme)) {
		try {
			return verify(token, SECRET);
		} catch (e) {
			throw new Error(e);
		}
	} else {
		throw new Error("Format is: Bearer <token>");
	}
};

export const createToken = function (payload) {
	const tokenPayload = Object.assign({time: new Date().getTime()}, payload);
	return sign(tokenPayload, SECRET, {expiresIn: "7 days"});
};
