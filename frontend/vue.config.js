const path = require('path');

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000/api'
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/assets/styles/global.scss')]
    }
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
};
