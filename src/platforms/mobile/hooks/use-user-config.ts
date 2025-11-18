import type { ThemeValues } from '@mobile/constants/config';
import type { IStandardAppUserConfig } from '@mobile/model/app/slice';
import { selectUserConfig, setTheme as setThemeAction, setUserConfig as setUserConfigAction } from '@mobile/model/app/slice';
import { useMinimalAppSelector } from '@mobile/model/minimal-store';

export function useUserConfig() {
  const userConfig = useMinimalAppSelector(selectUserConfig);

  return {
    userConfig,
    setUserConfig(newValue: IStandardAppUserConfig) {
      setUserConfigAction(newValue);
    },
    setTheme(theme: ThemeValues) {
      setThemeAction(theme);
    },
  };
}
