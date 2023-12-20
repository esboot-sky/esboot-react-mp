import 'rsuite/dist/rsuite.css';
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/locales/zh_CN';
// import { useLanguage } from '@pc/hooks/use-language';
import { useUserConfig } from '@pc/hooks/use-user-config';
import { ReactNode } from 'react';
import { SupportedThemes } from '@pc/constants/config';

export function withRSuite(App): any {
  return function RSuiteApp({ ...rest }) {
    // const language = useLanguage();
    const { userConfig: { theme } } = useUserConfig();

    const rsuiteTheme = theme === SupportedThemes.light ? 'light' : 'dark';

    return (
      // 暂时只需要中文
      <CustomProvider theme={rsuiteTheme} locale={zhCN}>
        <App {...rest} />
      </CustomProvider>
    );
  };
}

export function wrapRSuite(element: ReactNode) {
  const App = withRSuite(() => element);

  return <App />;
}
