const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin')


const common = require('./webpack.common');

module.exports = (env, argv) => {

    let isProd = common.isProd(env, argv);

    return {
        target: "web",
        devtool: common.devtool(isProd),
        entry: {
            client: path.resolve('src/main.tsx'),
        },
        output: {
            path: path.resolve("dist"),
            filename: common.bundleName(isProd),
            chunkFilename: common.chunkName(isProd),
            publicPath: '/app/'
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
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            common.miniCssExtractPlugin(isProd),
            common.pluginManifestPlugin(isProd),
        ],
        devServer: {
            contentBase: path.resolve('dist'),
            // compress: true,
            port: 9000,
            proxy: {
                '/api': 'http://localhost:3000'
            },
            publicPath: '/app/'
        }
    }
};