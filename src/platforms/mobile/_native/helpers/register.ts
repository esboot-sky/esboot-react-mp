import type { IUserInfo } from '@/platforms/mobile/helpers/customize';

import { bridge } from '@dz-web/bridge';
import { oldStyle2Standard } from '@/platforms/mobile/helpers/customize';

/**
 * 换肤等配置信息变化
 *
 */
export function onUpdateUserConfig(handle: (data: any) => void) {
  return bridge.register('updateUserConfiguration', (res => handle(oldStyle2Standard(res))) as any);
}

/**
 * 用户账户信息变化
 *
 */
export function onUpdateUserInfo(handle: (data: IUserInfo) => void) {
  return bridge.register<typeof handle>('updateUserInfo', handle);
}
