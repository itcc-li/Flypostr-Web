const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV || 'development';

const paths = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

const htmlPlugin = {
  endpoint: (env === 'production') ? '' : ''
};

const development = {
  entry: {
    app: ['react-hot-loader/patch', paths.app]
  },
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: paths.app
    }, {
      // test: /\.css$/,
      test: /(\.scss|\.css)$/,
      loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass'],
      include: [paths.app]
    }, {
      test: /\.(jpg|jpeg|png|svg)$/,
      loader: 'file?name=assets/[name].[hash].[ext]',
      include: paths.app
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file?name=assets/[name].[hash].[ext]',
      include: paths.app
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(paths.app, 'index.ejs'),
      title: 'Flypostr 2.0',
      endpoint: htmlPlugin.endpoint
    })
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: paths.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only'
  },
  postcss: function () {
    return [autoprefixer];
  }
};

const production = {
  entry: {
    app: [paths.app],
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: paths.build,
    filename: '[name].js',
    // chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: paths.app
    }, {
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'),
      include: [paths.app]
    }, {
      test: /\.(jpg|png|svg)$/,
      loader: 'file?name=assets/[name].[ext]',
      include: paths.app
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file?name=assets/[name].[ext]',
      include: paths.app
    }]
  },
  plugins: [
    new CleanPlugin([paths.build]),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.app, 'index.ejs'),
      title: 'Flypostr 2.0',
      endpoint: htmlPlugin.endpoint,
      minify: {
        html5: true,
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  postcss: function () {
    return [autoprefixer];
  }
};

console.log(`Info: Webpack using ${env === 'production' ? 'production' : 'development'} config.`);

if (env == 'production') {
  module.exports = production;
} else {
  module.exports = development;
}
