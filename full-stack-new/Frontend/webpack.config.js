// webpack.config.js
import path from "path";

export default {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // other rules...
    ],
  },
  plugins: [
    // your plugins...
  ],
};
