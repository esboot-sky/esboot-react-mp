/**
 * 此文件为项目标准格式，禁止修改，需要修改请联系负责人进行迭代
 */
import { useEffect, FC, ComponentPropsWithoutRef, ReactNode } from 'react';
import { DEFAULT_THEME, SupportedThemes } from '@mobile/constants/config';
import { onUpdateUserConfig, onUpdateUserInfo } from '@mobile-native/helpers/register';
import { useMinimalAppDispatch } from '@mobile/model/minimal-store';
import { IStandardAppUserConfig, setUserInfo } from '@mobile/model/app/slice';
import { getUserInfo, getUserConfig } from '@mobile-native/helpers/msg';
import { useUserConfig } from '@mobile/hooks/use-user-config';
import { listenLoginExpired } from '@/global-events';

const { classList } = document.documentElement;

export function getDisplayName(WrappedComponent: React.FC): string {
  return WrappedComponent.displayName || 'Component';
}

export function withNative(Component: FC<any>) {
  return function NativeApp(props: ComponentPropsWithoutRef<typeof Component>) {
    const dispatch = useMinimalAppDispatch();
    const {
      userConfig,
      setUserConfig,
    } = useUserConfig();

    function _updateUserConfig(appUserConfig: IStandardAppUserConfig): void {
      const { theme: prevTheme, raise: prevRaise } = userConfig;

      const { theme } = appUserConfig;
      const nextTheme = SupportedThemes[theme] || DEFAULT_THEME;

      classList.remove(prevRaise);
      classList.add(appUserConfig.raise);
      classList.remove(`dz-theme-${prevTheme}` || 'null');
      classList.add(`dz-theme-${nextTheme}`);

      setUserConfig(appUserConfig);
    }

    function _updateUserInfo(userInfo): void {
      dispatch(setUserInfo(userInfo));
    }

    useEffect(() => {
      getUserConfig()
        .then((res) => _updateUserConfig(res))
        .catch((err) => console.log(`获取用户配置失败: ${err}`));

      onUpdateUserConfig((res) => _updateUserConfig(res));

      getUserInfo()
        .then((res) => _updateUserInfo(res))
        .catch((err) => console.log('err:', err));

      onUpdateUserInfo((res) => _updateUserInfo(res));
    }, []);

    return <Component {...props} />;
  };
}

export default function wrapNative(App: ReactNode): React.ReactNode {
  const WrappedComponent = withNative(() => App);
  return <WrappedComponent />;
}

listenLoginExpired(() => {
  console.warn('原生app登录过期, 调用退出登录交互');
});
