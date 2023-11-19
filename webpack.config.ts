import webpack from 'webpack'
import path from 'path'

import {buildWebpack} from './config/build/buildWebpack'

import {BuildPaths, BuildMode, BuildPlatform} from './config/build/types/types'

interface EnVariables {
   port?: number
   mode?: BuildMode
   analizer?: boolean
   platform?: BuildPlatform
}

module.exports = (env: EnVariables) => {

   const paths: BuildPaths = {
      output: path.resolve(__dirname, 'build'),
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, 'src')
   }

   const config:  webpack.Configuration = buildWebpack({
      port: env.port ?? 3000,
      mode: env.mode ?? 'development',
      paths,
      analizer: env.analizer,
      platform: env.platform ?? 'desktop'
   })

   return config
};