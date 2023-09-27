import { bridge, BridgePlatforms } from '@dz-web/bridge';
import { mounteReact } from '@/helpers/react';
import { useBridgeMock } from '@/constants/config';

import { wrapRedux } from '@/hoc/redux';
import wrapNative from './hoc/native';
import wrapI18n, { I18nOption } from './hoc/i18n';

import '@/styles/index.scss';
import '@mobile/styles/index.scss';

interface GeneratePageOptions {
  store: any;
  native?: boolean;
  i18n?: I18nOption;
}

function mounte(native: boolean, innerApp: React.ReactElement) {
  if (native) {
    bridge.ready(() => {
      mounteReact(innerApp);
    });
  } else {
    mounteReact(innerApp);
  }
}

export default function generatePage(App: React.ReactNode, options: GeneratePageOptions): void {
  const { native = true, i18n, store } = options;
  let wrapApp: React.ReactNode = App;

  if (i18n) wrapApp = wrapI18n(wrapApp, i18n);
  if (native) {
    bridge.initPlatforms(useBridgeMock ? BridgePlatforms.mock : BridgePlatforms.webview);
    wrapApp = wrapNative(wrapApp);
  }

  wrapApp = wrapRedux(wrapApp, store);
  mounte(native, wrapApp as React.ReactElement);
}
