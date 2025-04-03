import { bridge } from '@dz-web/bridge';

import { useBridgeMock } from '@/constants/config';
import { mounteReact } from '@/helpers/react';
import { wrapReactQuery } from '@/hoc/query-client';
import { wrapRedux } from '@/hoc/redux';
import { wrapTopErrorBoundary } from '@/hoc/top-error-boundary';
import '@/styles/index.scss';
import { GeneratePageOptions } from '@/types';
import { TopErrorBoundaryFallback } from '@pc/components/top-error-boundary-fallback';
import wrapI18n from '@pc/hoc/i18n';
import { subscribeUserAndCache } from '@pc/model/subscriber';
import '@pc/styles/index.scss';
import wrapNative from '@pc-native/hoc/native';

export default async function generatePage(App: React.ReactNode, options: GeneratePageOptions): Promise<void> {
  const { i18n, store, disableStrictMode, disabledLoginExpired } = options;
  let wrapApp: React.ReactNode = App;

  if (useBridgeMock) {
    const mockbridge = await import('@dz-web/bridge/platforms/mock');
    bridge.init(mockbridge.createBridge());
  } else {
    const pcbridge = await import('@dz-web/bridge/platforms/pc');
    bridge.init(pcbridge.createBridge());
  }

  wrapApp = wrapNative(wrapApp, {
    disabledLoginExpired,
  });
  wrapApp = wrapReactQuery(wrapApp);

  wrapApp = wrapTopErrorBoundary(wrapApp, TopErrorBoundaryFallback);
  wrapApp = wrapI18n(wrapApp, i18n);
  wrapApp = wrapRedux(wrapApp, store);
  bridge.ready(() => {
    mounteReact(wrapApp as React.ReactElement, disableStrictMode);
  });

  subscribeUserAndCache(store);
}
