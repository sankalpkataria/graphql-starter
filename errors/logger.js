const {createLogger, format, transports} = require("winston");
const {join} = require("path");
const {constants} = require("../config");

const errorLogPath = join(__dirname, "/../logs");
const {ENV, ENVIRONMENTS, LOG_LEVELS} = constants;

const logger = createLogger({
	level: LOG_LEVELS.DEBUG,
	format: format.json(),
	transports: [
		new transports.File({filename: join(errorLogPath, "error.log"), level: LOG_LEVELS.ERROR}),
		new transports.File({filename: join(errorLogPath, "combined.log")})
	]
});

if (ENV !== ENVIRONMENTS.PRODUCTION) {
	logger.add(new transports.Console({
		format: format.simple(),
		level: LOG_LEVELS.INFO
	}));
}

module.exports = {
	logger
};
