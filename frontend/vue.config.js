// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: [path.resolve(__dirname, './src/assets/styles/global.scss')]
		}
	},
	devServer: {
		proxy: 'http://localhost:3000/api'
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "@/assets/styles/setup/_variables.scss";
				`
			}
		}
	}
}
