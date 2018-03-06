/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const getPostcssPlugins = require("./postcss_plugins.js");
const helpers = require("./helpers");

const context = helpers.root("src");

const webpackConfig = function(options) {
	const { env } = options;
	const folder = options.folder || "";

	const isProd = env === "prod" || env === "production";

	return {
		context,
		entry: {
			polyfills: ["babel-polyfill"],
			app: [helpers.root("src", "index.jsx")]
		},
		output: {
			path: helpers.root("build"),
			publicPath: isProd ? "" : "/",
			filename: `${folder}[name].js`
		},
		resolve: {
			extensions: [".js", ".jsx", ".json"],
			modules: [helpers.root("src"), helpers.root("node_modules")],
			alias: {
				"@": path.resolve(__dirname, "../src/")
			}
		},
		module: {
			rules: [
				// scripts
				{
					test: /\.jsx?$/,
					use: {
						loader: "babel-loader",
						query: {
							plugins: [
								"transform-react-jsx",
								[
									"react-css-modules",
									{
										context
									}
								]
							]
						}
					},
					include: [helpers.root("src")]
				},
				// styles
				{
					use: [
						"style-loader",
						"css-loader?importLoader=1&modules=true&localIdentName=[name]__[local]__[hash:base64:5]"
					],
					test: /\.css?$/
				},
				// images
				{
					test: /\.(jpe?g|png|gif)$/,
					use: {
						loader: "file-loader",
						options: { name: `${folder}[name].[ext]` }
					},
					include: [helpers.root("src"), helpers.root("node_modules")]
				},
				{
					test: /\.(svg)$/,
					use: {
						loader: "svg-sprite-loader",
						options: { name: `${folder}[name].[ext]` }
					},
					include: [helpers.root("src"), helpers.root("node_modules")]
				},
				// fonts
				{
					test: /.(eot)$/,
					use: {
						loader: "file-loader",
						options: {
							mimetype: "application/vnd.ms-fontobject",
							name: `${folder}[name].[ext]`
						}
					}
				},
				{
					test: /.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: {
						loader: "file-loader",
						options: {
							mimetype: "application/font-woff",
							name: `${folder}[name].[ext]`
						}
					}
				},
				{
					test: /.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: {
						loader: "file-loader",
						options: {
							mimetype: "application/octet-stream",
							name: `${folder}[name].[ext]`
						}
					}
				},
				{
					test: /\.html$/,
					loader: "html-loader?minimize=false"
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify(options.env)
			}),
			new HtmlWebpackPlugin({
				inject: "body",
				template: "stub.html"
			}),
			new webpack.LoaderOptionsPlugin({
				options: {
					postcss: getPostcssPlugins()
				}
			}),
			new CopyWebpackPlugin([
				{
					from: helpers.root("src", "assets", "static"),
					to: helpers.root("build", "static"),
					flatten: true
				}
			])
			// uncomment if you want to load only `moment/locale/ru.js`
			// new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
		]
	};
};

module.exports = webpackConfig;
