import { bridge } from '@dz-web/bridge';
import { IStandardAppUserConfig } from '@mobile/model/app/slice';
import { config } from 'antd-mobile/es/components/toast/methods';

export interface IOldStyleAppUserConfig {
  theme: 'dark' | 'light';
  deviceNo: string;
  language: 'zh-CN' | 'zh-TW' | 'en-US';
  orderToConfirmByDialog: boolean;
  raise: 'green' | 'red';
  global_font_scale: number;
}

export function oldStyle2Standard({
  theme,
  language,
  raise,
  deviceNo,
}: IOldStyleAppUserConfig) {
  const standardUserConfig: IStandardAppUserConfig = {
    deviceNo,
    theme,
    language,
    raw: config,
    raise,
  };

  console.log('AppUserConfig(dz标准app用户配置): ', standardUserConfig);
  return standardUserConfig;
}
/**
 * 中信等app在用的获取用户信息的方法, 新版app请用bridge自带的同名方法
 */
export function getUserConfig() {
  return bridge.sendMsg('getUserConfiguration').then((res: any) => oldStyle2Standard(res));
}
