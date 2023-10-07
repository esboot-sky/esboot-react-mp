import { IntlProvider } from 'react-intl';
import { Language } from '@/constants/config';
import { useLanguage } from '@mobile/hooks/use-language';

export interface I18nOption {
  messageDict: Record<Language, Record<string, string>>;
}

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
