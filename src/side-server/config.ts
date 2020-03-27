import envalid from 'envalid';

const confEnv = envalid.cleanEnv(
    process.env,
    {
        NODE_ENV: envalid.str({default : 'development'}),
        NODE_APP_INSTANCE: envalid.num({
            default: 0,
        }),

        SERVER_HOST: envalid.host({ default: '0.0.0.0' }),
        SERVER_PORT: envalid.port({
            default: 3000,
            desc: 'The port to start the server on'
        }),



        LOG_DIR: envalid.str({ default: 'log', desc: 'file log write dir' }),

        // access log
        LOG_ACCESS: envalid.bool({ default: true, desc: 'access log write flag' }),
        LOG_ACCESS_FORMAT: envalid.str({
            choices: ['combined', 'common', 'short', 'dev', 'tiny'],
            default: 'common', devDefault: 'dev', desc: 'access log write format'
        }),




        // default log file
        LOG_DEFAULT_FILE: envalid.bool({ default: true, desc: 'default logg file write flag' }),
        LOG_DEFAULT_FILE_LEVEL: envalid.str({
            choices: ['debug', 'info', 'warn', 'error'],
            default: 'info', devDefault: 'debug', desc: 'default logg file write level(min value)'
        }),
        LOG_DEFAULT_FILE_FILESIZE: envalid.num({
            default: 10485760, desc: 'log file size. vlues is bytes. default=10mb'
        }),
        LOG_DEFAULT_FILE_MAXFILE: envalid.num({
            default: 10, desc: 'log file max count. vlues is bytes. default=10'
        }),

        // default log console
        LOG_DEFAULT_CONSOLE: envalid.bool({ default: true, desc: 'default console logg write flag' }),
        LOG_DEFAULT_CONSOLE_LEVEL: envalid.str({
            choices: ['debug', 'info', 'warn', 'error'],
            default: 'info', devDefault: 'debug', desc: 'default logg console write level(min value)'
        }),


    },
    { strict: true }
);

export namespace confSystem {
    export const NODE_ENV = confEnv.NODE_ENV;
    export const APP_INSTANCE = confEnv.NODE_APP_INSTANCE;
}

export namespace confEnvironment {
    export const isDevelopment = confEnv.isDevelopment;
    export const isProduction = confEnv.isProduction;
    export const isTest = confEnv.isTest;
}

export namespace confService {
    export const SERVER_HOST = confEnv.SERVER_HOST;
    export const SERVER_PORT = confEnv.SERVER_PORT;
}

export namespace confLogger {
    export const LOG_DIR = confEnv.LOG_DIR;
    export const LOG_ACCESS = confEnv.LOG_ACCESS;
    export const LOG_ACCESS_FORMAT = confEnv.LOG_ACCESS_FORMAT;


    export const LOG_DEFAULT_FILE = confEnv.LOG_DEFAULT_FILE;
    export const LOG_DEFAULT_FILE_LEVEL = confEnv.LOG_DEFAULT_FILE_LEVEL;
    export const LOG_DEFAULT_FILE_FILESIZE = confEnv.LOG_DEFAULT_FILE_FILESIZE;
    export const LOG_DEFAULT_FILE_MAXFILE = confEnv.LOG_DEFAULT_FILE_MAXFILE;

    export const LOG_DEFAULT_CONSOLE = confEnv.LOG_DEFAULT_CONSOLE;
    export const LOG_DEFAULT_CONSOLE_LEVEL = confEnv.LOG_DEFAULT_CONSOLE_LEVEL;
}