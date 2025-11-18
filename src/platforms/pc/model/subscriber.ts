import { CacheStore } from '@dz-web/cache';
import isDeepEqual from 'react-fast-compare';

import { CACHE_KEY_PC_USER_CONFIG, CACHE_KEY_PC_USER_INFO } from '@/constants/caches';
import { isBrowser } from '@/utils/platforms';
import { updateRootClass } from '@pc/helpers/theme';

import { useAppStore } from './app/slice';

export function subscribeUserAndCache() {
  let previousState = useAppStore.getState();

  updateRootClass(
    previousState.userConfig.theme,
    previousState.userConfig.raise,
    previousState.userConfig.language,
    previousState.userConfig.appFontSize,
    previousState.userConfig.appFontWeight,
  );

  if (isBrowser()) {
    CacheStore.setItem(CACHE_KEY_PC_USER_CONFIG, previousState.userConfig);
  }

  return useAppStore.subscribe((currentState) => {
    if (currentState === previousState) return;

    updateRootClass(
      currentState.userConfig.theme,
      currentState.userConfig.raise,
      currentState.userConfig.language,
      currentState.userConfig.appFontSize,
      currentState.userConfig.appFontWeight,
    );

    if (isBrowser()) {
      if (!isDeepEqual(currentState.userConfig, previousState.userConfig)) {
        CacheStore.setItem(CACHE_KEY_PC_USER_CONFIG, currentState.userConfig);
      }

      if (!isDeepEqual(currentState.userInfo, previousState.userInfo)) {
        CacheStore.setItem(CACHE_KEY_PC_USER_INFO, currentState.userInfo);
      }
    }
    previousState = currentState;
  });
}
