import { IntlProvider } from 'react-intl';

import { I18nOption } from '@/types';
import { useLanguage } from '@mobile/hooks/use-language';

export default function wrapI18n(App: any, options: I18nOption): React.ReactNode {
  function I18nApp() {
    const language = useLanguage();

    return (
      <IntlProvider messages={options.messageDict[language]} locale={language}>
        {App}
      </IntlProvider>
    );
  }

  return <I18nApp />;
}
