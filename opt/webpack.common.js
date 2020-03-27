const { loadableTransformer } = require('loadable-ts-transformer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports.isProd = (env, argv) => argv.mode === 'production';

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        // localIdentName: '[name]_[local]_[hash:base64:5]',
        // importLoaders: 2,
        // camelCase: true,
        // sourceMap: false, // turned off as causes delay
    }
}
// For our normal CSS files we would like them globally scoped
const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: "global",
        importLoaders: 2,
        camelCase: true,
        sourceMap: false, // turned off as causes delay
    }
}
//  // Our PostCSSLoader
//  const autoprefixer = require('autoprefixer')
//  const PostCSSLoader = {
//     loader: 'postcss-loader',
//     options: {
//       ident: 'postcss',
//       sourceMap: false, // turned off as causes delay
//       plugins: () => [
//         autoprefixer({
//          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
//         })
//       ]
//     }
//  }
// Standard style loader (prod and dev covered here)


module.exports.tsLoader = (isProd) => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader',
    options: {
        getCustomTransformers: () => ({ before: [loadableTransformer] }),
    },
});
module.exports.styleLoader1 = (isProd) => ({
    test: /\.scss?$/,
    loader: 'typings-for-css-modules-loader',
    options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]___[hash:base64:5]',
        namedExport: true,
        camelCase: true,
        banner: '// *** Generated File - Do not Edit ***'
    },
});
module.exports.cssLoader = (isProd) => {
    return {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
    };
}
module.exports.cssModuleLoader = (isProd) => {
    return {
        // test: /\.module\.css$/i,
        test: /\.css$/i,
        use: [
            MiniCssExtractPlugin.loader, 'css-loader'
        ]
    };
}
module.exports.styleLoader = (isProd) => {
    let isDevelopment = false;
    return [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
        // {
        //     test: /\.module\.s(a|c)ss$/,
        //     loader: [
        //         isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        //         {
        //             loader: 'css-loader',
        //             options: {
        //                 modules: true,
        //                 sourceMap: isDevelopment
        //             }
        //         },
        //         {
        //             loader: 'sass-loader',
        //             options: {
        //                 sourceMap: isDevelopment
        //             }
        //         }
        //     ]
        // },
        // {
        //     test: /\.s(a|c)ss$/,
        //     exclude: /\.module.(s(a|c)ss)$/,
        //     loader: [
        //         isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        //         'css-loader',
        //         {
        //             loader: 'sass-loader',
        //             options: {
        //                 sourceMap: isDevelopment
        //             }
        //         }
        //     ]
        // }
    ]
};

module.exports.miniCssExtractPlugin = (isProd) => {
    return new MiniCssExtractPlugin({
        filename: !isProd ? '[name].css' : '[name].[hash].css',
        chunkFilename: !isProd ? '[id].css' : '[id].[hash].css'
    })
}

module.exports.resolve = (isProd) => ({
    extensions: [".ts", ".tsx", ".js"]
});


module.exports.bundleName = (isProd) => isProd ? "[name].bundle.[hash:3].js" : "[name].bundle.js";
module.exports.chunkName = (isProd) => isProd ? "[name].chunk.[hash:3].js" : "[name].chunk.js";


// module.exports.devtool = (isProd) => isProd ? "source-map" : "eval";
module.exports.devtool = (isProd) => isProd ? "(none)" : "eval";