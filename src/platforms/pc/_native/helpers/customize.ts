import { Language } from '@/constants/config';
import { listenReactQueryError } from '@/global-events';
import { ThemeValues, RaiseMode, TOKEN_KEY } from '@pc/constants/config';
import { IStandardAppUserConfig } from '@pc/model/app/slice';
import { getRealPCNativeFontSize } from '@pc-native/utils/pc-native-config';

import type { UserInfo } from '@pc/types';

/**
 * app传过来的原始设置信息, 代码中不使用此类型，使用dz web app标准类型IStandardAppUserConfig
 */
export interface IRawAppUserConfig {
  font: {
    additionalSize: number;
    list: number[];
    weight: 'normal' | 'bold';
  };
  theme: ThemeValues;
  language: Language;
  raise: RaiseMode;
}

/**
 * 转换原始app用户配置为标准app用户配置
 */
export function oldStyle2Standard(rawAppUserConfig: IRawAppUserConfig) {
  const { theme, language, raise, font } = rawAppUserConfig;

  const standardUserConfig: IStandardAppUserConfig = {
    theme,
    language,
    // app端不需要跟随系统颜色设置，因为app端有自己的颜色设置，变化了会通知webview页面
    followSystemPrefersColorSchemeWhenInBrowser: false,
    raw: rawAppUserConfig,
    raise,
    appFontSize: getRealPCNativeFontSize(font.additionalSize.toString()),
    appFontWeight: font.weight,
    deviceNo: '',
  };

  console.log('AppUserConfig(dz标准pc用户配置): ', standardUserConfig);
  return standardUserConfig;
}

/**
 * 根据项目提供的用户信息，返回access token
 */
export function accessToken(userInfo: UserInfo) {
  return userInfo[TOKEN_KEY];
}

// 监听react query错误
listenReactQueryError((friendlyMessage, error, meta) => {
  console.error('还未添加全局错误提示', friendlyMessage, error, meta);
});

// TODO: 监听请求失败错误, 通常不统一报错，而是在各个页面自己处理，否则有错误定制需求的页面会重复报错
// 或者使用react query管理请求，重试请求失败后，会统一处理报错，并且可以通过meta抑制错误提示
