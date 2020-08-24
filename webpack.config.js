const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const config = require("./config/config");

module.exports = {
    entry: "./src/frontend/index.jsx",
    mode: "development",
    module: {
        rules: [
            {
                // Script loader
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] },
            },
            {
                // Styles loader
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                // Image loader
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/",
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: config.WEBPACK_DEV_PORT,
        publicPath: `http://localhost:${config.WEBPACK_DEV_PORT}/dist/`,
        historyApiFallback: true,
        hotOnly: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(config.NODE_ENV),
                API_URL: JSON.stringify(config.NODE_ADDRESS),
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public/",
                    to: "../dist",
                    globOptions: { ignore: ["scss/*.scss"] },
                },
            ],
        }),
        new WriteFilePlugin(),
        new CleanWebpackPlugin(),
    ],
};
