const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
	.filter(x => { return ['bin'].indexOf(x) === -1 })
	.forEach(mod => { nodeModules[mod] = 'commonjs ' + mod });

module.exports = [

	// Client CSS
	{
		devtool: 'source-map',
		entry: {
			'style' : path.join(__dirname, 'src', 'css', 'style.scss')
		},
		output: {
			path: path.join(__dirname, 'dist', 'css'),
			filename: '[name].css'
		},
		module: {
			loaders: [
				{
					test: /\_*.scss$/,
					loader: ExtractTextPlugin.extract("css-loader!sass-loader")
				}
			]
		},
		plugins: [
			new ExtractTextPlugin({
				allChunks: true,
				filename: '../css/[name].css'
			})
		]
	},

	// Client JavaScript
	{
		devtool: 'source-map',
		entry: path.join(__dirname, 'src', 'js', 'app.js'),
		output: {
			path: path.join(__dirname, 'dist', 'js'),
			filename: 'bundle.js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: [
						path.join(__dirname, 'dist')
					],
					loader: ['babel-loader']
				}
			]
		}
	}
]