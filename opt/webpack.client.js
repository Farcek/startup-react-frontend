const path = require("path");
const webpack = require("webpack");
const LoadablePlugin = require('@loadable/webpack-plugin');


const common = require('./webpack.common');

module.exports = (env, argv) => {

    let isProd = common.isProd(env, argv);
   
    return {
        target: "web",
        devtool: common.devtool(isProd),
        entry: {
            client: path.resolve('src/side-client/startup.tsx'),
        },
        output: {
            path: path.resolve("dist.client"),
            filename: common.bundleName(isProd),
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
            // new HtmlWebpackPlugin({ template: 'src/index.html' }),
            new LoadablePlugin(),
            // new webpack.DefinePlugin({ __isBrowser__: "true" }),
            common.miniCssExtractPlugin(isProd),
            common.pluginManifestPlugin(isProd),
        ],
    }
};