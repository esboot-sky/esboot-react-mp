import { bridge } from '@dz-web/bridge';
import { IStandardAppUserConfig } from '../../types';

export interface IOldStyleAppUserConfig {
  theme: 'dark' | 'light';
  deviceNo: string;
  language: 'zh-CN' | 'zh-TW' | 'en-US';
  orderToConfirmByDialog: boolean;
  raise: 'green' | 'red';
  global_font_scale: number;
}
/**
 * 中信等app在用的获取用户信息的方法, 新版app请用bridge自带的同名方法
 */
export function getUserConfig() {
  return bridge.sendMsg('getUserConfiguration').then((res: any) => {
    const {
      theme,
      language,
      raise,
      global_font_scale: globalFontScale,
      deviceNo,
    } = res as IOldStyleAppUserConfig;

    const standardUserConfig: IStandardAppUserConfig = {
      deviceNo,
      theme,
      language,
      raw: res,
      raise,
      globalFontScale,
    };

    console.log('AppUserConfig(dz标准app用户配置): ', standardUserConfig);
    return standardUserConfig;
  });
}
