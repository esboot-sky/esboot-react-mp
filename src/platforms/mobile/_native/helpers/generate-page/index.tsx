import { bridge, BridgePlatforms } from '@dz-web/bridge';
import { mounteReact } from '@/helpers/react';
import { useBridgeMock } from '@/constants/config';

import wrapI18n, { I18nOption } from '@mobile/hoc/i18n';
import { wrapRedux } from '@/hoc/redux';
import { wrapReactQuery } from '@/hoc/query-client';
import wrapNative from './hoc/native';

import '@/styles/index.scss';
import '@mobile/styles/index.scss';

interface GeneratePageOptions {
  store: any;
  native?: boolean;
  i18n?: I18nOption;
}

export default function generatePage(App: React.ReactNode, options: GeneratePageOptions): void {
  const { i18n, store } = options;
  let wrapApp: React.ReactNode = App;

  if (i18n) wrapApp = wrapI18n(wrapApp, i18n);
  bridge.initPlatforms(useBridgeMock ? BridgePlatforms.mock : BridgePlatforms.webview);
  wrapApp = wrapNative(wrapApp);

  wrapApp = wrapReactQuery(wrapApp);
  wrapApp = wrapRedux(wrapApp, store);
  mounteReact(wrapApp as React.ReactElement);
}
