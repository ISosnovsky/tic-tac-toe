/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
// const webpackMerge = require("webpack-merge");

const ENV = "development";
const commonConfig = require("./webpack.common.js")({ env: ENV });
// uncomment if you want to see configs merge result
// const helpers = require('./helpers');

// const config = webpackMerge.smart(commonConfig, {
// 	module: {
// 		rules: [
// 			{
// 				use: [
// 					"style-loader",
// 					"css-loader?importLoader=1&localIdentName=[hash:base64:5]"
// 				],
// 				test: /\.css?$/
// 			}
// 		]
// 	}
// });

// uncomment if you want to see configs merge result
// helpers.writeJSON(config);

module.exports = commonConfig;
