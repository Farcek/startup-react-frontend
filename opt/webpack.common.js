const { loadableTransformer } = require('loadable-ts-transformer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
module.exports.isProd = (env, argv) => argv.mode === 'production';

module.exports.tsLoader = (isProd) => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader',
    options: {
        getCustomTransformers: () => ({ before: [loadableTransformer] }),
    },
});

module.exports.cssLoader = (isProd) => {
    return {
        test: /\.g\.(sa|sc|c)ss$/,
        exclude: /\.m\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
    };
}
module.exports.cssModuleLoader = (isProd) => {
    return {
        test: /\.m\.(sa|sc|c)ss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: true,
                },
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: {
                        localIdentName: '[name]_[local]_[hash:5]',
                    }
                },
            },
            //   'postcss-loader',
            'sass-loader',
        ]
    };
}

module.exports.imgLoader = (isProd) => {
    return {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
            name: isProd ? '[name].[hash:5].[ext]' : '[name].[ext]',
            outputPath: 'images',
            esModule: false,
        },
    };
}
module.exports.miniCssExtractPlugin = (isProd) => {
    return new MiniCssExtractPlugin({
        filename: isProd ? '[name].bundle.[hash:5].css' : '[name].bundle.css',
        chunkFilename: isProd ? '[name].chunk.[id].[hash:5].css' : '[name].[id].chunk.css'
    })
}
module.exports.pluginManifestPlugin = (isProd) => {
    return new ManifestPlugin({
        
    })
}

module.exports.resolve = (isProd) => ({
    extensions: [".ts", ".tsx", ".js"]
});


module.exports.bundleName = (isProd) => isProd ? "[name].bundle.[hash:5].js" : "[name].bundle.js";
module.exports.chunkName = (isProd) => isProd ? "[name].chunk.[id].[hash:5].js" : "[name].[id].chunk.js";


// module.exports.devtool = (isProd) => isProd ? "source-map" : "eval";
module.exports.devtool = (isProd) => isProd ? "(none)" : "eval";