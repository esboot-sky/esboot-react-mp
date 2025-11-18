import { CacheStore } from '@dz-web/cache';
import isDeepEqual from 'react-fast-compare';

import { CACHE_KEY_USER_CONFIG, CACHE_KEY_USER_INFO } from '@/constants/caches';
import { isBrowser } from '@/utils/platforms';
import { updateRootClass } from '@mobile/helpers/theme';

import { useAppStore } from './app/slice';

export function subscribeUserAndCache() {
  let previousState = useAppStore.getState();

  updateRootClass(previousState.userConfig.theme, previousState.userConfig.raise);

  if (isBrowser()) {
    CacheStore.setItem(CACHE_KEY_USER_CONFIG, previousState.userConfig);
  }

  return useAppStore.subscribe((currentState) => {
    if (currentState === previousState) return;

    updateRootClass(currentState.userConfig.theme, currentState.userConfig.raise);

    if (isBrowser()) {
      if (!isDeepEqual(currentState.userConfig, previousState.userConfig)) {
        CacheStore.setItem(CACHE_KEY_USER_CONFIG, currentState.userConfig);
      }

      if (!isDeepEqual(currentState.userInfo, previousState.userInfo)) {
        CacheStore.setItem(CACHE_KEY_USER_INFO, currentState.userInfo);
      }
    }
    previousState = currentState;
  });
}
