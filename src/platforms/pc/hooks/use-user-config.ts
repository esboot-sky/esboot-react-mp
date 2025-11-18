import type { ThemeValues } from '@pc/constants/config';
import type { IStandardAppUserConfig } from '@pc/model/app/slice';
import { selectUserConfig, setTheme as setThemeAction, setUserConfig as setUserConfigAction } from '@pc/model/app/slice';
import { useMinimalAppSelector } from '@pc/model/minimal-store';

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
