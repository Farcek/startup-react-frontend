import * as winston from 'winston';
import * as path from 'path';
import { confSystem,confLogger } from './config';

const formatFile = winston.format.combine(
    winston.format.timestamp({}),
    winston.format.json({})
);
const colorizer = winston.format.colorize({});
const formatConsole = winston.format.combine(
    winston.format.timestamp({}),
    winston.format.printf(msg => {
        let text = msg.timestamp
            + colorizer.colorize(msg.level, ` [${msg.level}] `)
            + msg.message;

        let meta: Record<string, any> = {};
        for (let k of Object.keys(msg)) {
            if (k === 'level' || k === 'message' || k === 'timestamp') {
                continue;
            }
            meta[k] = msg[k];
        }

        return text + ' ' + colorizer.colorize('info', `${JSON.stringify(meta)}`);
    })
);

export const loggerDefault = winston.createLogger({
    transports: [],
    exceptionHandlers: [
        new winston.transports.File({
            format: formatFile,
            filename: path.resolve(confLogger.LOG_DIR, `exceptions-${confSystem.APP_INSTANCE}.log`),
        }),
        new winston.transports.Console({
            format: formatConsole
        })
    ]
});

if (confLogger.LOG_DEFAULT_FILE) {
    loggerDefault.add(new winston.transports.File({
        format: formatFile,
        filename: path.resolve(confLogger.LOG_DIR, `default-${confSystem.APP_INSTANCE}.log`),
        level: confLogger.LOG_DEFAULT_FILE_LEVEL,
        maxsize: confLogger.LOG_DEFAULT_FILE_FILESIZE,
        maxFiles: confLogger.LOG_DEFAULT_FILE_MAXFILE
    }));
}

if (confLogger.LOG_DEFAULT_CONSOLE) {
    loggerDefault.add(new winston.transports.Console({
        format: formatConsole,
        level: confLogger.LOG_DEFAULT_CONSOLE_LEVEL
    }));
}

export default loggerDefault;