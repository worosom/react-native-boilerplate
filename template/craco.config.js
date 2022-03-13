const path = require('path')
const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const i = webpackConfig.module.rules[1].oneOf.findIndex(
        ({ include }) => include === paths.appSrc,
      )
      webpackConfig.module.rules[1].oneOf[i].include = [
        paths.appSrc,
        path.resolve(__dirname, 'node_modules/react-native-gesture-handler'),
        path.resolve(__dirname, 'node_modules/react-native-reanimated'),
        // path.resolve(__dirname, 'node_modules/react-native-elements'),
        // path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
        // path.resolve(__dirname, 'node_modules/react-native-ratings'),
      ]
      webpackConfig.resolve.alias['@'] = path.resolve(__dirname, 'src')
      return webpackConfig
    },
    plugins: [
      // Inject the React Native '__DEV__' global variable.
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
      }),
    ],
  },
}
