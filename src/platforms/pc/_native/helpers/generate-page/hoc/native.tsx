import { ReactNode, useEffect } from 'react';
import { useSafeState, useGetState } from 'ahooks';

import {
  IUserConfig,
  IUserInfo,
  defaultUserConfig,
  defaultUserInfo,
} from '@pc-native/hooks-pure/use-init-native';

import { useAppStore } from '@pc-native/model/app';

import { queryUserConfig, queryUserInfo } from '@pc-native/helpers/native/msg';
import { updateUserConfig, IUserConfigRaw, updateUserInfo } from '@pc-native/helpers/native/register';

export function getDisplayName(WrappedComponent: ReactNode): string {
  return (WrappedComponent as any).displayName || 'Component';
}

export interface IUserConfig {
  riseFallColor?: IRiseFallColor;
  language: string;
  theme?: string;
}

export interface IUserInfo {
  tradeNo?: string;
  orgCode: any;
  token: string;
  isLoginTrade: boolean;
  areaCode?: string;
  cusNo?: string;
  mobile?: string;
  nickname?: string;
  avatar?: string;
  userId?: number;
}

interface IUseInitNative {
  userConfig: IUserConfig;
  userInfo: IUserInfo;
}

export const defaultUserConfig = {
  language: DEFAULT_LAN,
};

export const defaultUserInfo = {
  orgCode: '',
  mobile: '',
  token: '',
  isLoginTrade: false,
};

const defaultFontCfg = {
  additionalSize: FONT_ADD_SIZE,
  weight: FONT_WEIGHT,
};

export default function wrapNative(App): React.ReactNode {
  const InternalApp = () => {
    const setLanguage = useAppStore((state) => state.setLanguage);
    const setSessionCode = useAppStore((state) => state.setSessionCode);
    const setUserConfig = useAppStore((state) => state.setUserConfig);
    const setUserInfo = useAppStore((state) => state.setUserInfo);

    function _updateUserConfig(rawConfig: IUserConfigRaw): void {
      const { theme: prevTheme } = getUserConfig() || {};
      const { raise, theme, language, font = defaultFontCfg } = rawConfig;
      const { additionalSize, weight } = font;

      const nextTheme = THEME_MAP[theme] || DEFAULT_THEME;

      const config = {
        theme: nextTheme,
        language,
        riseFallColor: RISE_FALL_COLORS_DICT[raise],
      };

      setUserConfig(config);

      if (prevTheme) classList.remove(prevTheme);
      classList.add(nextTheme);

      if (raise === RISEFALLCOLOR.GREEN) {
        classList.remove(RISE_FALL_CLASS_DICT[RISEFALLCOLOR.RED]);
      } else if (raise === RISEFALLCOLOR.RED) {
        classList.remove(RISE_FALL_CLASS_DICT[RISEFALLCOLOR.GREEN]);
      }

      classList.add(RISE_FALL_CLASS_DICT[raise]);

      const fontDictSize = FONT_CFG_SIZE_DICT[additionalSize] || 0;
      document.documentElement.style.fontSize = `${Math.max(FONT_SIZE + fontDictSize, 12)}px`;
      document.documentElement.style.fontWeight = weight;
    }

    function _updateUserInfo(res): void {
      Object.assign(res, { token: res.sessionCode });

      setUserInfo({ ...res });
    }

    useEffect(() => {
      queryUserConfig()
        .then((res) => {
          updateUserConfig(res);
        })
        .catch((err) => console.log(`获取用户配置失败: ${err}`));

      queryUserInfo()
        .then((res) => _updateUserConfig(res))
        .catch((err) => console.log('err:', err));

      updateUserInfo((res) => _updateUserInfo(res));
    }, []);

    return App;
  };

  InternalApp.displayName = `wrapNative(${getDisplayName(App)})`;
  return <InternalApp />;
}
