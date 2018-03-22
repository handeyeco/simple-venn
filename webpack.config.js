module.exports = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    filename: './dist/simple-venn.dist.js',
    library: 'SimpleVenn',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};
