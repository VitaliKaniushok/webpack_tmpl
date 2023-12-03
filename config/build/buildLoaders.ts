import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

import {buildBabelLoader} from './babel/buildBabelLoader'

import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConnfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      "sass-loader",
    ],
  };

  // const tsLoader = {
  //    // Umie obslugiwac JSX
  //    // Gdyby nie był używany typescript, potrzebny był by babel-loader
  //    test: /\.tsx?$/,
  //    use: 'ts-loader',
  //    exclude: /node_modules/,
  // }

  const tsLoader = {
    //  Umie obslugiwac JSX
    // Gdyby nie był używany typescript, potrzebny był by babel-loader
    test: /\.tsx?$/,
    exclude: /node_modules/,

    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true, // nie sprawdza typy w typiscript pod czas kompilacji co przyspiesza ją
        },
      },
    ],
  };

  const babelLoader = buildBabelLoader(options)

  return [
    assetLoader,
    cssLoader,
    // tsLoader,
    babelLoader,
    svgLoader,
  ];
}
