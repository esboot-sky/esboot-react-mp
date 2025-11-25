import type { RawAppUserConfig } from '@/platforms/mobile/helpers/customize';
import { _onPageHide, _onPageShow, _updateUserConfig, _updateUserInfo } from '@dz-web/bridge/actions/mobile';
import { oldStyle2Standard } from '@/platforms/mobile/helpers/customize';

export function onUpdateUserConfig(handle: Parameters<typeof _updateUserConfig>[0]) {
  return _updateUserConfig(res => handle(oldStyle2Standard(res as unknown as RawAppUserConfig)));
}

export function onUpdateUserInfo(handle: Parameters<typeof _updateUserInfo>[0]) {
  return _updateUserInfo(handle);
}

export function onPageShow(handle: Parameters<typeof _onPageShow>[0]) {
  return _onPageShow(handle);
}

export function onPageHide(handle: Parameters<typeof _onPageHide>[0]) {
  return _onPageHide(handle);
}
