import { Language } from '@/constants/config';

export interface I18nOption {
  messageDict: Record<Language, Record<string, string>>;
}

export interface GeneratePageOptions {
  store: any;
  i18n: I18nOption;
  /**
   * native不监听登录过期事件，自己对接第三方登录时需要设置为true
   */
  disabledLoginExpired?: boolean;
}
