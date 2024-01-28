const sassResourcesLoader = require('sass-resources-loader');
const CracoEsbuildPlugin = require('craco-esbuild');

const path = require('path');

export default {
  webpack: {
    alias: {
      'components': path.resolve(__dirname, 'src/common/components'),
      'utils': path.resolve(__dirname, 'src/common/utils'),
      'types': path.resolve(__dirname, 'src/common/types'),
      'enums': path.resolve(__dirname, 'src/common/enums'),
      'hooks': path.resolve(__dirname, 'src/common/hooks'),
      'stores': path.resolve(__dirname, 'src/common/stores'),
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
