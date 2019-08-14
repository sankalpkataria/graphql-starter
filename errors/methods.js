import {AppError} from "./appError";
import {constants} from "../config";
const {ERROR, LOG_LEVELS, ENTITIES} = constants;

export const throwUnAuthenticatedError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.UNAUTHENTICATED.TYPE, message, ERROR.UNAUTHENTICATED.CODE, isOperational);
};

export const throwBadRequestError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.BAD_REQUEST.TYPE, message, ERROR.BAD_REQUEST.CODE, isOperational);
};

export const throwNotFoundError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.NOT_FOUND.TYPE, message, ERROR.NOT_FOUND.CODE, isOperational);
};

export const throwUnAuthorizedError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.UNAUTHORIZED.TYPE, message, ERROR.UNAUTHORIZED.CODE, isOperational);
};

export const throwInternalServerError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.INTERNAL_SERVER_ERROR.TYPE, message, ERROR.INTERNAL_SERVER_ERROR.CODE, isOperational);
};
