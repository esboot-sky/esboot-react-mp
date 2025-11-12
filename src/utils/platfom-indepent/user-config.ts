/* eslint-disable @dz-web/esboot/no-cross-platform-imports */
import type { MinimalStoreType } from '@mobile/model/minimal-store';
import type { MinimalStoreType as PCMinimalStoreType } from '@pc/model/minimal-store';
import { TOKEN_KEY as MOBILE_TOKEN_KEY } from '@mobile/constants/config';

import { TOKEN_KEY as PC_TOKEN_KEY } from '@pc/constants/config';
import { isMobile } from '@/utils/platforms';

export function getPlatformIndependentUserConfig() {
  if (isMobile()) {
    const store = (window as any).__mobile_store__ as MinimalStoreType;
    const {
      app: { userConfig, userInfo },
    } = store.getState();
    const { language } = userConfig;
    const token = userInfo[MOBILE_TOKEN_KEY];

    return {
      language,
      token,
    };
  }

  const store = (window as any).__mobile_store__ as PCMinimalStoreType;
  const {
    app: { userConfig, userInfo },
  } = store.getState();
  const { language } = userConfig;
  const token = userInfo[PC_TOKEN_KEY];

  return {
    language,
    token,
  };
}
