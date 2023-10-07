import globalCNLocales from '@/locales/zh-CN.json';
import globalTWLocales from '@/locales/zh-TW.json';
import globalENLocales from '@/locales/en-US.json';
import mobileCNLocales from '@mobile/locales/zh-CN.json';
import mobileTWLocales from '@mobile/locales/zh-TW.json';
import mobileENLocales from '@mobile/locales/en-US.json';
import pcCNLocales from '@pc/locales/zh-CN.json';
import pcTWLocales from '@pc/locales/zh-TW.json';
import pcENLocales from '@pc/locales/en-US.json';
import mobileNativeCNLocales from '@mobile-native/locales/zh-CN.json';
import mobileNativeTWLocales from '@mobile-native/locales/zh-TW.json';
import mobileNativeENLocales from '@mobile-native/locales/en-US.json';
import mobileBrowserCNLocales from '@mobile-browser/locales/zh-CN.json';
import mobileBrowserTWLocales from '@mobile-browser/locales/zh-TW.json';
import mobileBrowserENLocales from '@mobile-browser/locales/en-US.json';
import pcBrowserCNLocales from '@pc-browser/locales/zh-CN.json';
import pcBrowserTWLocales from '@pc-browser/locales/zh-TW.json';
import pcBrowserENLocales from '@pc-browser/locales/en-US.json';
import pcNativeCNLocales from '@pc-native/locales/zh-CN.json';
import pcNativeTWLocales from '@pc-native/locales/zh-TW.json';
import pcNativeENLocales from '@pc-native/locales/en-US.json';
import { Language, defaultLanguage } from '../constants/config';
import type { I18nOption } from '../platforms/mobile/hoc/i18n';

export function importLocales(pageLocales: Record<string, string>, lang: Language) {
  // eslint-disable-next-line prefer-destructuring
  const isMobile = process.env.isMobile;
  // eslint-disable-next-line prefer-destructuring
  const isBrowser = process.env.isBrowser;

  if (lang === defaultLanguage.ZH_CN) {
    return {
      ...globalCNLocales,
      ...(isMobile ? {
        ...mobileCNLocales,
        ...(isBrowser ? mobileBrowserCNLocales : mobileNativeCNLocales),
      } : {
        ...pcCNLocales,
        ...(isBrowser ? pcBrowserCNLocales : pcNativeCNLocales),
      }),
      ...pageLocales,
    };
  }
  if (lang === defaultLanguage.ZH_TW) {
    return {
      ...globalTWLocales,
      ...(isMobile ? {
        ...mobileTWLocales,
        ...(isBrowser ? mobileBrowserTWLocales : mobileNativeTWLocales),
      } : {
        ...pcTWLocales,
        ...(isBrowser ? pcBrowserTWLocales : pcNativeTWLocales),
      }),
      ...pageLocales,
    };
  }
  if (lang === defaultLanguage.EN_US) {
    return {
      ...globalENLocales,
      ...(isMobile ? {
        ...mobileENLocales,
        ...(isBrowser ? mobileBrowserENLocales : mobileNativeENLocales),
      } : {
        ...pcENLocales,
        ...(isBrowser ? pcBrowserENLocales : pcNativeENLocales),
      }),
      ...pageLocales,
    };
  }

  return pageLocales;
}

export function getPageI18n(dict: I18nOption['messageDict']) {
  const locales = {
    [defaultLanguage.ZH_TW]: importLocales(dict['zh-TW'], defaultLanguage.ZH_TW),
    [defaultLanguage.ZH_CN]: importLocales(dict['zh-CN'], defaultLanguage.ZH_CN),
    [defaultLanguage.EN_US]: importLocales(dict['en-US'], defaultLanguage.EN_US),
  };

  console.log('多语言配置:', locales);
  return {
    messageDict: locales,
  };
}
