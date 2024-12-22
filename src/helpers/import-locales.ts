import { flattenLangObject } from '@dz-web/esboot-browser';

import { supportedLanguage, isDev } from '@/constants/config';
import enUS from '@/lang/en-US.json';
import zhCN from '@/lang/zh-CN.json';
import zhTW from '@/lang/zh-TW.json';
import { i18nMessageDict } from '@/types';

export function getPageI18n(): i18nMessageDict {
  const locales = {
    [supportedLanguage.ZH_TW]: flattenLangObject(zhTW),
    [supportedLanguage.ZH_CN]: flattenLangObject(zhCN),
    [supportedLanguage.EN_US]: flattenLangObject(enUS),
  };

  if (isDev) {
    console.log('多语言配置:', locales);
  }

  return locales;
}
