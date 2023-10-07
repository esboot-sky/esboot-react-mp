import generatePage from '@mobile-native/helpers/generate-page';
import { defaultLanguage } from '@/constants/config';

import zhCN from '@/lang/zh-CN';
import zhTW from '@/lang/zh-TW';
import enUS from '@/lang/en-US';

import App from '@mobile/modules/trade/trade';
import { store } from '@mobile/modules/trade/model/store';

generatePage(<App />, {
  store,
  i18n: {
    messageDict: {
      [defaultLanguage.ZH_TW]: zhTW,
      [defaultLanguage.ZH_CN]: zhCN,
      [defaultLanguage.EN_US]: enUS,
    },
  },
});

export default {
  title: 'Mobile-Native',
};
