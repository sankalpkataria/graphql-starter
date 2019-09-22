import {Users} from "../models";

export const getUserById = (userId, selection = {}) => Users.findOne({
	_id: userId
}, selection).lean();

export const getUsers = (condition = {}, selection = {}) => Users.find(condition, selection).lean();

export const createUser = (userObj) => {
	const user = new Users(userObj);
	return user.save();
};

export const updateUserById = (userId, updates) => Users.updateOne({
	_id: userId
}, {
	$set: updates
});

export const updateUsers = (condition = {}, updates) => Users.updateMany(condition, {
	$set: updates
});

export const users = {
	getUsers,
	getUserById,
	createUser,
	updateUsers,
	updateUserById
};
