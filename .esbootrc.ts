import type { BabelPlugin, UserOptions } from '@dz-web/esboot';
import type { BundlerViteOptions } from '@dz-web/esboot-bundler-vite';
import type { BundlerWebpackOptions } from '@dz-web/esboot-bundler-webpack';
import process from 'node:process';
import { defineConfig, definePlugin, PluginHooks } from '@dz-web/esboot';
import { BundlerVite, CodeSplittingType as CodeSplittingTypeVite } from '@dz-web/esboot-bundler-vite';
import {
  BundlerWebpack,
  CodeSplittingType as CodeSplittingTypeWebpack,
  getImportPluginsOfRsuite,
} from '@dz-web/esboot-bundler-webpack';
import docsPlugin from '@dz-web/esboot-plugin-docs';
import vitestPlugin from '@dz-web/esboot-plugin-vitest';

export default defineConfig<BundlerWebpackOptions | BundlerViteOptions>(cfg => ({
  ...(process.env.ESBOOT_BUNDLER === 'vite' ? getBundlerViteOptions() : getBundlerWebpackOptions(cfg)),
  px2rem: {
    enable: true,
    // 设计稿为默认750, 浏览器以375为基准，16px是为了方便使用tailwindcss, 32px对应750px设计稿中的16px
    rootValue: cfg.isMobile ? 32 : 16,
  },
  define: {
    'process.env.isMobile': JSON.stringify(cfg.isMobile),
    'process.env.isBrowser': JSON.stringify(cfg.isBrowser),
  },
  plugins: [
    vitestPlugin(),
    docsPlugin(),
    definePlugin({
      key: 'log',
      [PluginHooks.afterCompile]: (cfg) => {
        const { isDev } = cfg;
        if (!isDev)
          return;

        console.log(cfg.entry);
      },
    }),
  ],
}));

function getBundlerViteOptions(): UserOptions<BundlerViteOptions> {
  return {
    bundler: BundlerVite,
    bundlerOptions: {
      codeSplitting: {
        jsStrategy: CodeSplittingTypeVite.granularChunks,
        jsStrategyOptions: {
          frameworkBundles: [
            '@dz-web/bridge',
            'dayjs',
            '@tanstack/react-query',
            'react-redux',
            '@reduxjs/toolkit',
            'zustand',
            'immer',
            'lodash',
            '@dz-web/axios',
            '@dz-web/axios-middlewares',
            'axios',
            'react-intl',
            '@loadable/component',
            'classnames',
          ],
        },
      },
    },
  };
}

function getBundlerWebpackOptions(cfg): UserOptions<BundlerWebpackOptions> {
  const extraBabelPlugins: BabelPlugin[] = [];
  if (!cfg.isMobile) {
    extraBabelPlugins.push(getImportPluginsOfRsuite([]));
  }

  return {
    bundler: BundlerWebpack,
    bundlerOptions: {
      mfsu: false,
      extraBabelPlugins,
      extraBabelIncludes: [
        /filter-obj/i,
        /immer/i,
        /zustand/i,
        /query-string/i,
        /react-intl/i,
        /d3-/i,
        /@tanstack/i,
        /@react-spring/i,
        /@floating-ui/i,
        /radash/i,
        /tailwind-merge/i,
        /@radix-ui/i,
        /quote-client-s6/i,
      ],
      codeSplitting: {
        jsStrategy: CodeSplittingTypeWebpack.granularChunks,
        jsStrategyOptions: {
          // 为了提高首屏速度，我们把一些非常非常常用的库打进公共代码库里, 不常用的让跟着页面js加载，以免影响大部分小页面的加载与js解析速度
          frameworkBundles: [
            // 不要添加router进来，我们绝大多数页面都是嵌入到webview中用的小页面，不需要router，所以router不需要打进公共代码库里。会影响大部分页面的加载速度
            '@dz-web/bridge',
            'dayjs',
            '@tanstack/react-query',
            'redux',
            'redux-thunk',
            'react-redux',
            '@reduxjs/toolkit',
            'zustand',
            'immer',
            'lodash',
            'nanoid',
            '@dz-web/axios',
            '@dz-web/axios-middlewares',
            'axios',
            'react-intl',
            '@loadable/component',
            'classnames',
            'perfect-scrollbar',
          ],
        },
      },
    },
  };
}
