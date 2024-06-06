import { mounteReact } from '@/helpers/react';
import wrapI18n from '@/hoc/i18n';
import { wrapReactQuery } from '@/hoc/query-client';
import { wrapRedux } from '@/hoc/redux';
import { wrapTopErrorBoundary } from '@/hoc/top-error-boundary';
import '@/styles/index.scss';
import { GeneratePageOptions } from '@/types';
import { TopErrorBoundaryFallback } from '@pc/components/top-error-boundary-fallback';
import { subscribeUserAndCache } from '@pc/model/subscriber';
import '@pc/styles/index.scss';
import wrapBrowser from '@pc-browser/hoc/browser';

export default function generatePage(App: React.ReactNode, options: GeneratePageOptions): void {
  const { i18n, store } = options;
  let wrapApp: React.ReactNode = App;

  wrapApp = wrapBrowser(wrapApp);
  wrapApp = wrapReactQuery(wrapApp);

  wrapApp = wrapTopErrorBoundary(wrapApp, TopErrorBoundaryFallback);
  wrapApp = wrapI18n(wrapApp, i18n);
  wrapApp = wrapRedux(wrapApp, store);
  mounteReact(wrapApp as React.ReactElement);

  subscribeUserAndCache(store);
}
