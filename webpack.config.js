const path = require('path');

const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/index.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },

  module: {
    rules: [
			{
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
      },
      {
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
    ],
  },

  plugins: [
		new HTMLWebpackPlugin({
			template: './public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css',
		}),
	],
}