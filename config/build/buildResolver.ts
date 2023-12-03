import {Configuration} from 'webpack'

import {BuildOptions} from './types/types'

export function buildResolver(options: BuildOptions): Configuration['resolve'] {
   return {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
         '@src': options.paths.src
      }
   }
}