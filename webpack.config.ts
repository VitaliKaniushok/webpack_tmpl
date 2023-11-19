import path from 'path';
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"

type Mode = 'production' | 'development'

interface EnVariables {
   mode: Mode,
   port: number
}

module.exports = (env: EnVariables) => {

   const isDev = env.mode === 'development'

   const config:  webpack.Configuration = {
      mode: env.mode ?? 'development',
      // entry: {
      //    helloWorld: path.resolve(__dirname, 'src', 'index.ts'),
      //    helloWorld2: path.resolve(__dirname, 'src', 'index2.ts')
      // },
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      output: {
         path: path.resolve(__dirname, 'build'),
         filename: '[name]_[contenthash].js',
         clean: true,
      },
      plugins: [
         new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'public', 'index.html') 
         }),
         isDev && new webpack.ProgressPlugin() // slove
      ].filter(Boolean),
      module: {
         rules: [
           {
             test: /\.tsx?$/,
             use: 'ts-loader',
             exclude: /node_modules/,
           },
         ],
       },
       resolve: {
         extensions: ['.tsx', '.ts', '.js'],
       },
       devtool: isDev && 'inline-source-map',
       devServer: isDev ? {
         port: env.port ?? 3000,
         open: true
      } : undefined
   }
   return config
};