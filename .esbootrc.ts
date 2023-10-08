import { defineConfig, CodeSplittingType } from '@dz-web/esboot';

export default defineConfig((runtimeCfg) => ({
  TSChecker: false,
  // port: 8081,
  analyze: false,
  /**
   * 调试库兼容性问题时，可以关闭mfsu
   */
  mfsu: false,
  pxtorem: {
    enable: true,
    rootValue: runtimeCfg.isMobile ? 200 : 13,
  },
  extraBabelIncludes: [
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
      frameworkBundles: [
        '@dz-web/bridge',
        '@dz-web/request',
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
  define: {
    'process.env.isMobile': runtimeCfg.isMobile as any,
    'process.env.isBrowser': runtimeCfg.isBrowser as any,
  },
}));

export const afterHooks = (cfg) => {
  console.log(cfg.entry, '<-- cfg');
}