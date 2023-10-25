import generatePage from '@mobile-browser/helpers/generate-page';

import zhCN from '@mobile/modules/test-ui/locales/zh-CN.json';
import zhTW from '@mobile/modules/test-ui/locales/zh-TW.json';
import enUS from '@mobile/modules/test-ui/locales/en-US.json';

import App from '@mobile/modules/test-ui';
import { store } from '@mobile/modules/test-ui/model/store';
import { getPageI18n } from '@/helpers/import-locales';

generatePage(<App />, {
  store,
  i18n: getPageI18n({
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
  }),
});

export default {
  title: 'Mobile-browser',
};
