import type { i18nMessageDict } from '@/helpers/import-locales';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { getPageI18n } from '@/helpers/import-locales';
import { useStore } from '@/helpers/multi-platforms';

export type I18nProps = boolean;

export default function wrapI18n(App: React.ReactNode, i18n: I18nProps = true): React.ReactNode {
  if (!i18n)
    return App;

  function I18nApp() {
    const [messageDict, setMessageDict] = useState<i18nMessageDict | null>(null);
    const [loading, setLoading] = useState(true);
    const language = useStore(state => state.userConfig.language);
    const lan = language?.replace(/_/g, '-') as keyof i18nMessageDict; // 解决国际化不支持 下划线形式

    useEffect(() => {
      setTimeout(() => {
        setLoading(true);
      }, 0);

      getPageI18n(lan)
        .then((dict) => {
          setMessageDict({ ...dict, [lan]: dict[lan] });
        })
        .catch((error) => {
          console.error('Failed to load i18n messages:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [lan]);

    if (loading) {
      return null;
    }

    return (
      <IntlProvider messages={messageDict?.[lan] || {}} locale={lan}>
        {App}
      </IntlProvider>
    );
  }

  return <I18nApp />;
}
