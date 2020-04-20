require('dotenv').config();

const tailwindConfig = './tailwind.config.js';
const tailwindcss = require('tailwindcss')(tailwindConfig);
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const purgecss = require('@fullhuman/postcss-purgecss')({
	content: [ './src/**/*.html', './src/**/*.component.ts' ],
	defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
	whitelistPatterns: [ /^cdk-|mat-/ ]
});

module.exports = (webpackConfig) => {
	const mode = process.env.MODE;
	const isProductionMode = mode === 'production';
	const postcssPlugins = [ autoprefixer, ...(isProductionMode ? [ cssnano ] : []), ...(isProductionMode ? [ purgecss ] : []) ];

	console.log(`Using '${mode}' mode`);

	webpackConfig.mode = mode;
	webpackConfig.module.rules.push(
		...[
			{
				test: /\.css$/,
				use: [
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							syntax: 'postcss-scss',
							plugins: [ tailwindcss, ...postcssPlugins ]
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: `postcss-loader`,
						options: {
							syntax: 'postcss-scss',
							plugins: postcssPlugins
						}
					},
					{
						loader: 'sass-loader'
						// options: {
						// 	implementation: require('sass'),
						// 	sassOptions: {
						// 		includePaths: [ './node_modules' ]
						// 	}
						// }
					}
				]
			}
		]
	);

	return webpackConfig;
};
