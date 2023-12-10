import type { Configuration as DevServerConfiguration } from "webpack-dev-server"

import {BuildOptions} from './types/types'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
   return {
      port: options.port ?? 3000,
      open: true,
      //historyApiFallback - jeżeli oddawać static poprzez nginx to trzeba robić proxy na index.html
      historyApiFallback: true,
      hot: true, // hot replacement
   }
}