import {createLogger, format, transports} from "winston";
import {join} from "path";
import {constants} from "../config";

const errorLogPath = join(__dirname, "/../logs");
const {ENV, ENVIRONMENTS, LOG_LEVELS} = constants;

export const logger = createLogger({
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
