import { mounteReact } from '@/helpers/react';

import wrapNative from './entry/native';
import wrapI18n, { I18nOption } from './entry/i18n';
import bridge from './native/bridge';

import '@/styles/index.scss';
import '@mobile/styles/index.scss';

interface IOptions {
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

export default function generatePage(App: React.ReactNode, options: IOptions = {}): void {
  const { native = true, i18n } = options;
  let wrapApp: React.ReactNode = App;

  if (i18n) wrapApp = wrapI18n(wrapApp, i18n);
  if (native) wrapApp = wrapNative(wrapApp);

  mounte(native, wrapApp as React.ReactElement);
}
