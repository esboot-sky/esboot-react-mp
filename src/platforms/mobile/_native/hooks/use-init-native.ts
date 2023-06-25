import { useEffect, useRef } from 'react';
import { useSafeState } from 'ahooks';

import { RequestProxyScope } from '@/constants/request';
import { requestProxyManager } from '@dz-web/request';

import { DEFAULT_THEME, THEME_MAP, RISE_FALL_COLORS_DICT, IRiseFallColor, DEFAULT_LAN } from '@mobile/constants/config';
import { getUserConfig, getUserInfo } from '@mobile-native/helpers/native/msg';
import { updateUserConfig, IUserConfigRaw, updateUserInfo } from '@mobile-native/helpers/native/register';

const { classList } = document.documentElement;
const codeStorage = {};

export interface IUserConfig {
  riseFallColor?: IRiseFallColor;
  language: string;
  theme?: string;
}

export interface IUserInfo {
  sessionCode?: string;
}

interface IUseInitNative {
  userConfig: IUserConfig;
  userInfo: IUserInfo;
}

export const defaultUserConfig = {
  language: DEFAULT_LAN,
};

export const defaultUserInfo = {};

export default function useInitNative(): IUseInitNative {
  const [userConfig, setUserConfig] = useSafeState<IUserConfig>(defaultUserConfig);
  const [userInfo, setUserInfo] = useSafeState<IUserInfo>(defaultUserInfo);
  const userConfigRef = useRef(userConfig);

  function updateUserConfigProxy(rawConfig: IUserConfigRaw): void {
    const { theme: prevTheme } = userConfigRef.current || {};
    const { raise, theme, language } = rawConfig;
    const nextTheme = THEME_MAP[theme] || DEFAULT_THEME;

    const config = {
      theme: nextTheme,
      language,
      riseFallColor: RISE_FALL_COLORS_DICT[raise],
    };

    setUserConfig(config);
    classList.remove(prevTheme || 'null');
    classList.add(nextTheme);
  }

  function updateUserInfoProxy(res, isInit = false): void {
    setUserInfo({ ...res });
    codeStorage.userInfo = res;

    if (isInit) {
      requestProxyManager.clear(RequestProxyScope.DEFAULT);
    }
  }

  useEffect(() => {
    getUserConfig()
      .then((res) => updateUserConfigProxy(res))
      .catch((err) => console.log(`获取用户配置失败: ${err}`));

    updateUserConfig((res) => updateUserConfigProxy(res));

    getUserInfo()
      .then((res) => updateUserInfoProxy(res, true))
      .catch((err) => console.log('err:', err));

    updateUserInfo((res) => updateUserInfoProxy(res));
  }, []);

  useEffect(() => {
    userConfigRef.current = userConfig;
  }, [userConfig]);

  return { userConfig, userInfo };
}
