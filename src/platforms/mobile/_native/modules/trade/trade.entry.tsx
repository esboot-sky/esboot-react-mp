import generatePage from '@mobile-native/helpers/generate-page';

import zhTW from '@mobile/modules/trade/locales/zh-TW.json';
import enUS from '@mobile/modules/trade/locales/en-US.json';

import App from '@mobile/modules/trade/trade';
import { store } from '@mobile/modules/trade/model/store';
import { getPageI18n } from '@/locales/import-locales';

const zhCN = require('@mobile/modules/trade/locales/zh-CN.json');

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
