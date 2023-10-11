import { mounteReact } from '@/helpers/react';

import wrapI18n, { I18nOption } from '@mobile/hoc/i18n';
import { wrapRedux } from '@/hoc/redux';
import { wrapReactQuery } from '@/hoc/query-client';

import '@/styles/index.scss';
import '@mobile/styles/index.scss';
import '@/helpers/browser/init-page-query';

interface GeneratePageOptions {
  store: any;
  i18n?: I18nOption;
}

export default function generatePage(App: React.ReactNode, options: GeneratePageOptions): void {
  const { i18n, store } = options;
  let wrapApp: React.ReactNode = App;

  if (i18n) wrapApp = wrapI18n(wrapApp, i18n);

  wrapApp = wrapReactQuery(wrapApp);
  wrapApp = wrapRedux(wrapApp, store);
  mounteReact(wrapApp as React.ReactElement);
}
