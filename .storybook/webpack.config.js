module.exports = {
  module: {
    rules: [
      { test: /.woff$|.woff2$|.ttf$|.eot$|.svg$/, loaders: 'url-loader' },
    ],
  },
};
