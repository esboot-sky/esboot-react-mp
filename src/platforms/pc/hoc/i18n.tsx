import type { i18nMessageDict } from '@/types';

import { usePCStore } from '@pc/model/pc';
import { IntlProvider } from 'react-intl';
import { getPageI18n } from '@/helpers/import-locales';

export default function wrapI18n(App: any, i18n = true): React.ReactNode {
  if (!i18n)
    return App;
  const messageDict: i18nMessageDict = getPageI18n();

  function I18nApp() {
    const language = usePCStore(state => state.userConfig.language);

    return (
      <IntlProvider messages={messageDict[language]} locale={language}>
        {App}
      </IntlProvider>
    );
  }

  return <I18nApp />;
}
