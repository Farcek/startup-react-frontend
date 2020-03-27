import express from 'express'
import path from 'path'

import { ssr } from './render';
import { confLogger, confService, confEnvironment, confSystem } from './config';
import loggerDefault from './logger';
import { ExceptionConvert } from '@napp/exception';

const morgan = require('morgan');

const app = express();
if (confLogger.LOG_ACCESS) {
    app.use(morgan(confLogger.LOG_ACCESS_FORMAT));
}

app.use('/asset',express.static(path.resolve('dist.client')));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/*', async (req, res) => {
    try {
        await ssr(req, res);
    } catch (error) {
        let err = ExceptionConvert(error);
        loggerDefault.error('ssr rendering error', err.toObject())

    }
});

app.listen(confService.SERVER_PORT, confService.SERVER_HOST, () => {
    const serverType = confEnvironment.isProduction
        ? 'Production env'
        : confEnvironment.isDevelopment
            ? 'Development env'
            : confSystem.NODE_ENV;
    loggerDefault.info(`Server (${serverType}) running port="${confService.SERVER_PORT}", host="${confService.SERVER_HOST}"`, {
        port: confService.SERVER_PORT,
        host: confService.SERVER_HOST,
        app_instance: confSystem.APP_INSTANCE
    })
});