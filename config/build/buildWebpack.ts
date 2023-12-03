import webpack from 'webpack'

import {BuildOptions} from './types/types'

import {buildLoaders} from './buildLoaders'
import {buildPlugins} from './buildPlugins'
import {buildResolver} from './buildResolver'
import {buildDevServer} from './buildDevServer'


export function buildWebpack(options: BuildOptions): webpack.Configuration {

   const {mode, paths} = options
   const isDev = options.mode === 'development'

   return {
      mode: mode ?? 'development',
      entry: paths.entry,
      output: {
         path: paths.output,
         filename: '[name]_[contenthash].js',
         chunkFilename: '[name]_[contenthash].js',
         clean: true,
      },
      plugins: buildPlugins(options),
      module: {
         rules: buildLoaders(options),
       },
       resolve: buildResolver(options),
       devtool: isDev && 'inline-source-map',
       devServer: isDev ? buildDevServer(options) : undefined
   }
}