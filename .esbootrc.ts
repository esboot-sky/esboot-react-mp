import { defineConfig, PluginHooks, definePlugin } from '@dz-web/esboot';
import { BundlerWebpack as Bundler, type BundlerWebpackOptions as BundlerOptions, CodeSplittingType } from '@dz-web/esboot-bundler-webpack';
import vitestPlugin from '@dz-web/esboot-plugin-vitest';
import docsPlugin from '@dz-web/esboot-plugin-docs';

export default defineConfig<BundlerOptions>((cfg) => ({
  bundler: Bundler,
  useLangJsonPicker: true,
  bundlerOptions: {
    mfsu: true,
    pxtorem: {
      enable: true,
      // 设计稿为默认750, 浏览器以375为基准，16px是为了方便使用tailwindcss, 32px对应750px设计稿中的16px
      rootValue: cfg.isMobile ? 32 : 16,
    },
    extraBabelIncludes: [
      /tailwind-merge/i,
      /filter-obj/i,
      /immer/i,
      /zustand/i,
      /query-string/i,
      /react-intl/i,
      /common/i,
      /d3-/i,
      /@tanstack/i,
      /@react-spring/i,
      /@floating-ui/i,
    ],
    codeSplitting: {
      jsStrategy: CodeSplittingType.granularChunks,
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
        ]
      },
    },
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
        console.log(cfg.entry);
      },
    }),
  ],
}));
