import generatePage from '@mobile-native/helpers/generate-page';
import { LAN_ENUM } from '@/constants/config';

import zhCN from '@/lang/zh-CN';
import zhTW from '@/lang/zh-TW';
import enUS from '@/lang/en-US';

import App from './home';

const store = {};

generatePage(<App />, {
  store,
  i18n: { messageDict: { [LAN_ENUM.ZH_TW]: zhTW, [LAN_ENUM.ZH_CN]: zhCN, [LAN_ENUM.EN_US]: enUS } },
});

export default {
  title: 'Mobile-Native',
};
