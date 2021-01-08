const path = require('path');

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000/api/'
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [ path.resolve(__dirname, './src/assets/styles/_global.sass') ]
    }
  },
};
