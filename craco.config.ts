const sassResourcesLoader = require('sass-resources-loader');
const CracoEsbuildPlugin = require('craco-esbuild');

export default {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildLoaderOptions: {
          loader: 'tsx',
          target: 'ES2022',
        },
        esbuildMinimizerOptions: {
          target: 'ES2022',
          css: true,
        },
        skipEsbuildJest: false,
      },
    },
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/**/*.scss',
      },
    },
  ],
};
