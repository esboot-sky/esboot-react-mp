import { bridge } from '@dz-web/bridge';

import { useBridgeMock } from '@/constants/config';
import { mounteReact } from '@/helpers/react';
import { wrapReactQuery } from '@/hoc/query-client';
import { wrapRedux } from '@/hoc/redux';
import { wrapTopErrorBoundary } from '@/hoc/top-error-boundary';
import '@/styles/index.scss';
import { GeneratePageOptions } from '@/types';
import { TopErrorBoundaryFallback } from '@mobile/components/top-error-boundary-fallback';
import { initDebug } from '@mobile/helpers/debug';
import wrapI18n from '@mobile/hoc/i18n';
import { subscribeUserAndCache } from '@mobile/model/subscriber';
import '@mobile/styles/index.scss';
import wrapNative from '@mobile-native/hoc/native';

export default async function generatePage(App: React.ReactNode, options: GeneratePageOptions): Promise<void> {
  const { i18n, store, disableStrictMode, disabledLoginExpired } = options;
  let wrapApp: React.ReactNode = App;

  await initDebug();

  if (useBridgeMock) {
    const mockbridge = await import('@dz-web/bridge/platforms/mock');
    bridge.init(mockbridge.createBridge());
  } else {
    const webviewbridge = await import('@dz-web/bridge/platforms/webview');
    bridge.init(webviewbridge.createBridge());
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
