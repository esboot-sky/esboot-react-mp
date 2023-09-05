import { bridge } from '@dz-web/bridge';

/**
 * 用户更新配置
 *
 */
export interface UserConfigRaw {
  skin: string; // white black
  theme: string; // dark light red
  language: string; // zh-TW  zh-CN
  raise: string; // 红涨绿跌 还是绿涨红跌
  orderToConfirmByDialog: boolean;
  font: {
    additionalSize: number;
    weight: string;
  };
}

/**
 * pc修改完个人信息返回修改过后信息
 * @param {Function} handle 处理函数
 *
 */
export function updateUserInfo(handler: unknown): unknown {
  return bridge.register('updateUserInfo', handler);
}

/**
 * pc换肤回调
 *
 */
export function updateUserConfig(handler: unknown): unknown {
  return bridge.register('updateUserConfig', handler);
}
