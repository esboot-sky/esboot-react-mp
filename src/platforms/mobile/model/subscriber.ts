import isDeepEqual from 'react-fast-compare';
import { CacheStore } from '@dz-web/cache';
import { isBrowser } from '@/utils/platforms';
import { CACHE_KEY_USER_CONFIG, CACHE_KEY_USER_INFO } from '@/constants/caches';
import { MinimalStoreType } from './minimal-store';

export function subscribeUserAndCache(store: MinimalStoreType) {
  const preiousAppState = store.getState();

  store.subscribe(() => {
    const currentAppState = store.getState();
    // check if userConfig changed
    const currentApp = currentAppState.app;
    const previousApp = preiousAppState.app;
    // 非浏览器环境不缓存, 从原生app读取
    if (!isBrowser()) return;

    if (!isDeepEqual(currentApp.userConfig, previousApp.userConfig)) {
      CacheStore.setItem(CACHE_KEY_USER_CONFIG, currentApp.userConfig);
    }

    if (!isDeepEqual(currentApp.userInfo, previousApp.userInfo)) {
      CacheStore.setItem(CACHE_KEY_USER_INFO, currentApp.userInfo);
    }
  });
}
