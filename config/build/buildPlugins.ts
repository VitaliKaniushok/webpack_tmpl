import webpack, {Configuration, DefinePlugin} from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin';

import path from 'path'

import {BuildOptions} from './types/types'

export function buildPlugins({mode, paths, analizer, platform}: BuildOptions): Configuration['plugins'] {

   const isDev = mode === 'development'
   const isProd = mode === 'production'

   const plugins: Configuration['plugins'] = [
      new HtmlWebpackPlugin({ 
         template: paths.html,
         favicon: path.resolve(paths.public, 'favicon.ico')
      }),
      new DefinePlugin({
         __PLATFORM__: JSON.stringify(platform),
         __ENV__: JSON.stringify(mode)
      }),
   ]

   if (isDev) {
      plugins.push(new webpack.ProgressPlugin()) // slove
      plugins.push(new ForkTsCheckerWebpackPlugin()) // Sprawdza typy w typescrip oddzielnie od kompilacji
      plugins.push(new ReactRefreshWebpackPlugin()) // wprowadza zmiany bez przeładowania strony jeżeli używany używany z ts-loader albo babel
   }

   if (isProd) {
     plugins.push(new MiniCssExtractPlugin({
         filename: 'css/[name].[contenthash:8].css',
         chunkFilename: 'css/[name].[contenthash:8].css',
      }))
      plugins.push(new CopyPlugin({
         patterns: [
           {from: path.resolve(paths.public, 'locale'), to: path.resolve(paths.output, 'locale')}, //kopiuje pliki do zbildowanego folderu 
         ],
       }),)
   }

   if(analizer) {
      plugins.push(new BundleAnalyzerPlugin())
   }

   return plugins;
}