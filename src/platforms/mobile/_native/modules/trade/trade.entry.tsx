import generatePage from '@mobile-native/helpers/generate-page';
import { Language } from '@/constants/config';

import zhCN from '@/lang/zh-CN';
import zhTW from '@/lang/zh-TW';
import enUS from '@/lang/en-US';

import App from '@mobile/modules/trade/trade';
import { store } from '@mobile/modules/model/store';

generatePage(<App />, {
  store,
  i18n: { messageDict: { [Language.ZH_TW]: zhTW, [Language.ZH_CN]: zhCN, [Language.EN_US]: enUS } },
});

export default {
  title: 'Mobile-Native',
};
