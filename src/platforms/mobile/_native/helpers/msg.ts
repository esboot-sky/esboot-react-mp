import { bridge } from '@dz-web/bridge';
import { IStandardAppUserConfig } from '@mobile/model/app/slice';
import { IRawAppUserConfig, IUserInfo } from '@mobile/custom-types';

export function oldStyle2Standard(rawAppUserConfig: IRawAppUserConfig) {
  const {
    theme,
    language,
    raise,
    deviceNo,
  } = rawAppUserConfig;

  const standardUserConfig: IStandardAppUserConfig = {
    deviceNo,
    theme,
    language,
    raw: rawAppUserConfig,
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

/**
 * 中信等app在用的获取用户信息的方法, 新版app请用bridge自带的同名方法
 */
export function getUserInfo(): Promise<IUserInfo> {
  return bridge.sendMsg('userInfo').then((res: any) => (res));
}
