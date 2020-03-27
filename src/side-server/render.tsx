import express from 'express';
import React from 'react'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { ExceptionConvert } from '@napp/exception';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { StaticRouterContext, StaticRouter } from 'react-router';
import AppMain from '../app';
import loggerDefault from './logger';
export class LayoutServer extends React.Component<{ content?: string, extractor?: ChunkExtractor }> {
    render() {
        let { content, extractor } = this.props;
        return (

            <html lang="en">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <title>Userly</title>
                    <base href="/" />
                    {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" /> */}
                    {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" /> */}
                    {/* {extractor.getLinkElements()} */}
                    {extractor?.getStyleElements()}
                </head>
                <body>
                    {content
                        ? <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
                        : null
                    }
                    {this.props.children}
                    {extractor?.getScriptElements()}
                </body>
            </html>
        );
    }
}

const tamga = `
<!--
Developed by farcek. 2019
-->
`;
const statsFile = path.resolve('dist.client/loadable-stats.json');

function sendResponse(status: number, element: React.ReactElement, res: express.Response) {
    try {
        res
            .status((99 < status && status < 600) ? status : 200)
            .set('Content-Type', 'text/html')
            .send('<!DOCTYPE html>' + tamga + ReactDOMServer.renderToStaticMarkup(element));
    } catch (error) {
        let err = ExceptionConvert(error);
        loggerDefault.error('can not send response. 1', err.toObject())
        try {
            return res.end();
        } catch (error) {
            let err = ExceptionConvert(error);
            loggerDefault.error('can not send response. 2', err.toObject())
        }
    }

}
export async function ssr(req: express.Request, res: express.Response) {

    try {
        const extractor = new ChunkExtractor({
            entrypoints: ['client'],
            statsFile,
        });
        
        const context: StaticRouterContext = {};
        const html = ReactDOMServer.renderToString(
            <ChunkExtractorManager extractor={extractor}>
                <StaticRouter location={req.url} context={context}>
                    <AppMain />
                </StaticRouter>
            </ChunkExtractorManager>,
        );

        res
            .status(200)
            .set('Content-Type', 'text/html')
            .send('<!DOCTYPE html>' + tamga + ReactDOMServer.renderToStaticMarkup(<LayoutServer content={html} extractor={extractor} />));
    } catch (error) {
        let err = ExceptionConvert(error);

        if (res.headersSent) {
            return res.end();
        }

        let status = err.getDataValue('status');
        sendResponse(typeof status === 'number' ? status : 500, <LayoutServer>
            <h1>Error</h1>
            <span>{err.name}</span>
            <p>{err.message}</p>
            <p>{JSON.stringify(err.data)}</p>
        </LayoutServer>, res)
    }
}