const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.tsx",
    devtool: "eval-source-map", // source map geneartion for debugging
    resolve: {
        extensions: ['.js', '.ts', ".tsx"]
    },
    module: {
        rules: [
            {
                // compile all tsx file to java script
                test: /\.tsx?$/,
                // loader: 'ts-loader', // this is ts-loader
                loader: "babel-loader", // this is for babel-loader - recommended have more plugins 
                exclude: /node_modules/,
            },
            {
                // compile css files using loader
                test: /\.css$/,
                // loader: 'css-loader', //this will not attach to the document
                use: [
                    MiniCssExtractPlugin.loader, // we use this to attch
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true // enable css modules for the application
                        }
                    }
                ]
            },
            {
                // compile svg logo using external loader svgo/webpack
                test: /\.svg$/,
                loader: "@svgr/webpack",
                options: {
                    svgoConfig: {
                        plugins: {
                            removeViewBox: false // dont crop my image
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin(), // this will attach css file to the document
    ]
}