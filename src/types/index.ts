import { Language } from '@/constants/config';

export type i18nMessageDict = Record<Language, Record<string, string>>;

export interface GeneratePageOptions {
  store: any;
  i18n?: boolean;
  /**
   * native不监听登录过期事件，自己对接第三方登录时需要设置为true
   */
  disabledLoginExpired?: boolean;
}
