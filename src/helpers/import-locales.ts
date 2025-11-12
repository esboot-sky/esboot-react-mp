import type { i18nMessageDict } from '@/types';

import { flattenLangObject } from '@dz-web/esboot-browser';
import { isDev, supportedLanguage } from '@/constants/config';
import enUS from '@/lang/en-US.json';
import zhCN from '@/lang/zh-CN.json';
import zhTW from '@/lang/zh-TW.json';

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
