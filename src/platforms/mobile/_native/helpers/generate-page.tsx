import type { GeneratePageOptions } from '@/types';

import { bridge } from '@dz-web/bridge';
import wrapNative from '@mobile-native/hoc/native';
import { TopErrorBoundaryFallback } from '@mobile/components/top-error-boundary-fallback';
import wrapI18n from '@mobile/hoc/i18n';
import { subscribeUserAndCache } from '@mobile/model/subscriber';
import { useBridgeMock } from '@/constants/config';
import { mounteReact } from '@/helpers/react';
import { wrapReactQuery } from '@/hoc/query-client';
import { wrapTopErrorBoundary } from '@/hoc/top-error-boundary';
import '@/styles/index.scss';
import '@mobile/styles/index.scss';

export default async function generatePage(App: React.ReactNode, options: GeneratePageOptions): Promise<void> {
  const { i18n, disableStrictMode, disabledLoginExpired } = options;
  let wrapApp: React.ReactNode = App;

  if (useBridgeMock) {
    const mockbridge = await import('@dz-web/bridge/platforms/mock');
    bridge.init(mockbridge.createBridge());
  }
  else {
    const webviewbridge = await import('@dz-web/bridge/platforms/webview');
    bridge.init(webviewbridge.createBridge());
  }
  wrapApp = wrapNative(wrapApp, {
    disabledLoginExpired,
  });
  wrapApp = wrapReactQuery(wrapApp);

  wrapApp = wrapTopErrorBoundary(wrapApp, TopErrorBoundaryFallback);
  wrapApp = wrapI18n(wrapApp, i18n);
  bridge.ready(() => {
    mounteReact(wrapApp as React.ReactElement, disableStrictMode);
  });

  subscribeUserAndCache();
}
