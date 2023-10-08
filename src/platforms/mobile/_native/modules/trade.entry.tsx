import generatePage from '@mobile-native/helpers/generate-page';

import zhCN from '@mobile/modules/trade/locales/zh-CN.json';
import zhTW from '@mobile/modules/trade/locales/zh-TW.json';
import enUS from '@mobile/modules/trade/locales/en-US.json';

import App from '@mobile/modules/trade';
import { store } from '@mobile/modules/trade/model/store';
import { getPageI18n } from '@/locales/import-locales';

generatePage(<App />, {
  store,
  i18n: getPageI18n({
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
  }),
});

export default {
  title: 'Mobile-Native',
};

/**
 * 为api请求失败时，提供自定义的退出登录的方法, 如不提供，不会调用
 */
window.__logout__ = () => {
  console.warn('call logout native app');
};
