
const path = require("path");
const webpack = require("webpack");
const LoadablePlugin = require('@loadable/webpack-plugin');

const nodeExternals = require('webpack-node-externals');
const common = require('./webpack.common');
module.exports = (env, argv) => {
    var isProd = common.isProd(env, argv);

    return {
        devtool: common.devtool(isProd),
        entry: {
            server: "./src/side-server/server.ts"
        },
        target: 'node',
        externals: nodeExternals(),
        output: {
            path: path.resolve("dist.server"),
            filename: common.bundleName(isProd && false),
            chunkFilename: common.chunkName(isProd),
            publicPath: '/asset/'
        },

        resolve: common.resolve(isProd),
        module: {
            rules: [
                common.tsLoader(isProd),
                common.cssLoader(isProd),
                common.cssModuleLoader(isProd),
                common.imgLoader(isProd),
            ]
        },
        plugins: [
            new LoadablePlugin(),
            // new webpack.DefinePlugin({ __isBrowser__: "false" }),
            common.miniCssExtractPlugin(isProd),
            common.pluginManifestPlugin(isProd),
        ],
    }
};