import type { i18nMessageDict } from '@/types';

import { useAppStore } from '@mobile/model/mobile';
import { IntlProvider } from 'react-intl';
import { getPageI18n } from '@/helpers/import-locales';

export default function wrapI18n(App: any, i18n = true): React.ReactNode {
  if (!i18n)
    return App;
  const messageDict: i18nMessageDict = getPageI18n();

  function I18nApp() {
    const language = useAppStore(state => state.userConfig.language);

    return (
      <IntlProvider messages={messageDict[language as keyof typeof messageDict]} locale={language}>
        {App}
      </IntlProvider>
    );
  }

  return <I18nApp />;
}
