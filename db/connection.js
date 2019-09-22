const mongoose = require("mongoose");
const {constants} = require("../config");

const {MONGO_URI} = constants;

mongoose.connect(MONGO_URI);

mongoose.connection.on("connect", () => {
	console.log("MongoDb connected on port 27017");
});
mongoose.connection.on("error", (err) => {
	console.log(`An error occurred. ERROR: ${err}`);
});
mongoose.connection.on("disconnect", () => {
	console.log("MongoDb disconnected!");
});
