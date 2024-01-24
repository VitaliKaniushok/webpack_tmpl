import webpack from 'webpack'
import path from 'path'

import {buildWebpack, BuildPaths, BuildMode, BuildPlatform} from '@packages/build-config'

import packageJson from './package.json'

interface EnVariables {
   port?: number
   mode?: BuildMode
   analizer?: boolean
   platform?: BuildPlatform
   SHOP_REMOTE_URL?: string
   ADMIN_REMOTE_URL?: string
}

module.exports = (env: EnVariables) => {

   const paths: BuildPaths = {
      output: path.resolve(__dirname, 'build'),
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public')
   }

   const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
   const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

   const config:  webpack.Configuration = buildWebpack({
      port: env.port ?? 3000,
      mode: env.mode ?? 'development',
      paths,
      analizer: env.analizer,
      platform: env.platform ?? 'desktop'
   })

   config.plugins.push(new webpack.container.ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
         shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
         admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`
      },
      shared: {
         ...packageJson.dependencies,
         react: {
            eager: true,
            // requiredVersion: packageJson.dependencies['react']
         },
        'react-router-dom': {
            eager: true,
            // requiredVersion: packageJson.dependencies['react-router-dom']
        },
        'react-dom': {
            eager: true,
            // requiredVersion: packageJson.dependencies['react-dom']
         }
      }
   }))

   return config
};