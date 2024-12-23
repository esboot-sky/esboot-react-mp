import { bridge } from '@dz-web/bridge';

import { oldStyle2Standard } from './customize';

import type { UserInfo } from '@pc/types';

/**
 * 换肤等配置信息变化
 *
 */
export function onUpdateUserConfig(handle: (data: any) => void) {
  return bridge.register('updateUserConfig', ((res) => handle(oldStyle2Standard(res))) as any);
}

/**
 * 用户账户信息变化
 *
 */
export function onUpdateUserInfo(handle: (data: UserInfo) => void) {
  return bridge.register<typeof handle>('updateUserInfo', handle);
}
