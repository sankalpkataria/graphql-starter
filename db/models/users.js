import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	age: {
		type: Number
	}
});

export const Users = mongoose.model("Users", userSchema);
