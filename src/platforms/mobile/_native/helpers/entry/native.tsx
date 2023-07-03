import { useEffect } from 'react';
import { requestProxyManager, RequestProxyScope } from '@dz-web/request';

import { useAppStore } from '@mobile/model/app';
import { DEFAULT_THEME, THEME_MAP, QUOTE_COLOR_DICT } from '@/constants/config';
import { getUserConfig, getUserInfo } from '@mobile-native/helpers/native/msg';
import { updateUserConfig, IUserConfigRaw, updateUserInfo } from '@mobile-native/helpers/native/register';

const { classList } = document.documentElement;

export function getDisplayName(WrappedComponent: React.FC): string {
  return WrappedComponent.displayName || 'Component';
}

export default function wrapNative(App): React.ReactNode {
  const InternalApp = () => {
    const setLanguage = useAppStore((state) => state.setLanguage);
    const setSessionCode = useAppStore((state) => state.setSessionCode);
    const setUserConfig = useAppStore((state) => state.setUserConfig);
    const setUserInfo = useAppStore((state) => state.setUserInfo);

    function _updateUserConfig(config: IUserConfigRaw): void {
      const prevTheme = useAppStore.getState().userConfig.theme;
      const { raise, theme, language } = config;
      const nextTheme = THEME_MAP[theme] || DEFAULT_THEME;

      const cfg = {
        theme: nextTheme,
        quoteColor: QUOTE_COLOR_DICT[raise],
      };

      setUserConfig(cfg);
      setLanguage(language);

      classList.remove(prevTheme || 'null');
      classList.add(nextTheme);
    }

    function _updateUserInfo(userInfo, isInit = false): void {
      setUserInfo({ ...userInfo });

      setSessionCode(userInfo.sessionCode);
      if (isInit) requestProxyManager.clear(RequestProxyScope.DEFAULT);
    }

    useEffect(() => {
      getUserConfig()
        .then((res) => _updateUserConfig(res))
        .catch((err) => console.log(`获取用户配置失败: ${err}`));

      updateUserConfig((res) => _updateUserConfig(res));

      getUserInfo()
        .then((res) => _updateUserInfo(res, true))
        .catch((err) => console.log('err:', err));

      updateUserInfo((res) => _updateUserInfo(res));
    }, []);

    return App;
  };

  InternalApp.displayName = `wrapNative(${getDisplayName(App)})`;
  return <InternalApp />;
}
