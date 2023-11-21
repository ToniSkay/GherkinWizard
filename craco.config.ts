const sassResourcesLoader = require('sass-resources-loader');
const CracoEsbuildPlugin = require('craco-esbuild');

const path = require('path');

export default {
  webpack: {
    alias: {
      'common-components': path.resolve(__dirname, 'src/common/components'),
      'utils': path.resolve(__dirname, 'src/common/utils'),
    },
  },
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
