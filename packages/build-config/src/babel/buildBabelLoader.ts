import {BuildOptions} from '../types/types';
import {removeDataTestIdbabelCorePlugin} from './removeDataTestIdBabelPlugin';

export function buildBabelLoader({mode}: BuildOptions) {
   
   const isDev = mode === 'development'
   const isProd = mode === 'production'

   const plugins = []

   if(isProd) {
      plugins.push([
         removeDataTestIdbabelCorePlugin,
         {
            props: ['data-test']
         }
      ])
   }

   return {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
         loader: "babel-loader",
         options: {
            presets: [
               "@babel/preset-env",
               "@babel/preset-typescript",
               [
                  "@babel/preset-react",
                  {
                     runtime: isDev ? "automatic" : "classic", //dla działania hot reload
                  },
               ],
            ],
            plugins: plugins.length ? plugins : undefined
         },
      },
   };
}