/**
 * 此文件为项目标准格式，禁止修改，需要修改请联系负责人进行迭代
 */
import { useEffect, FC, ComponentPropsWithoutRef, ReactNode } from 'react';
import { onUpdateUserConfig, onUpdateUserInfo } from '@mobile-native/helpers/register';
import { setUserInfo } from '@mobile/model/app/slice';
import { getUserInfo, getUserConfig } from '@mobile-native/helpers/msg';
import { useUserConfig } from '@mobile/hooks/use-user-config';
import { listenLoginExpired } from '@/global-events';

export function getDisplayName(WrappedComponent: React.FC): string {
  return WrappedComponent.displayName || 'Component';
}

export function withNative(Component: FC<any>) {
  return function NativeApp(props: ComponentPropsWithoutRef<typeof Component>) {
    const {
      setUserConfig,
    } = useUserConfig();

    useEffect(() => {
      getUserConfig()
        .then(setUserConfig)
        .catch((err) => console.log(`获取用户配置失败: ${err}`));

      const disposeUserConfigListener = onUpdateUserConfig(setUserConfig);

      getUserInfo()
        .then(setUserInfo)
        .catch((err) => console.log('err:', err));

      const disposeUserInfoListener = onUpdateUserInfo(setUserInfo);

      return () => {
        disposeUserConfigListener();
        disposeUserInfoListener();
      };
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
