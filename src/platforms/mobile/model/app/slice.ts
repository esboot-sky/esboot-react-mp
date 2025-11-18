import { globalBlocker } from '@dz-web/axios-middlewares';
import { CacheStore } from '@dz-web/cache';
import { create } from 'zustand';

import { CACHE_KEY_USER_CONFIG, CACHE_KEY_USER_INFO } from '@/constants/caches';
import { Language, supportedLanguage, DEFAULT_LANGUAGE } from '@/constants/config';
import { initPageQuery } from '@/helpers/init-page-query';
import { isSupportedLanguage } from '@/utils/capacities';
import { isBrowser } from '@/utils/platforms';
import { DEFAULT_THEME, SupportedThemes, ThemeValues, RaiseMode, DEFAULT_RAISE_MODE } from '@mobile/constants/config';
import { IRawAppUserConfig, IUserInfo, accessToken } from '@mobile/customize';
import { isSupportedTheme, isValidRaiseMode } from '@mobile/utils/capacities';

const getDefaultTheme = (followSystem: boolean, defaultTheme: string) => {
  const { theme } = initPageQuery;
  // 优先使用url指定的主题初始化
  if (isSupportedTheme(theme)) return theme as ThemeValues;

  // 浏览器模式下，设置了跟随系统设置, 则根据系统设置初始化
  if (followSystem) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? SupportedThemes.dark : SupportedThemes.light;
  }

  return defaultTheme;
};

/**
 * 点证web app移动端标准用户设置
 * 代码里统一从store中读取此用户配置，代码不应关心用户配置的来源，并且格式应该统一,
 * 需要读取原始配置，请读取raw字段
 */
export interface IStandardAppUserConfig {
  theme: ThemeValues;
  language: Language;
  raise: RaiseMode;
  /**
   * 跟随系统颜色模式
   */
  followSystemPrefersColorSchemeWhenInBrowser: boolean;
  deviceNo: string;
  raw: IRawAppUserConfig;
}

interface IState {
  userInfo: IUserInfo;
  userConfig: IStandardAppUserConfig;
}

interface IAppStore extends IState {
  setUserConfig: (config: IStandardAppUserConfig) => void;
  setUserInfo: (info: IUserInfo) => void;
  setLanguage: (language: any) => void;
  setTheme: (theme: ThemeValues) => void;
  setRaise: (raise: RaiseMode) => void;
  toggleFollowSystemPrefersColorSchemeWhenInBrowser: () => void;
}

function createInitializedState(): IState {
  const { lang, language, raise } = initPageQuery;

  function getValueButIgnoreInNative<T>(run: () => T | undefined | null, defaultValue: T) {
    if (isBrowser()) {
      const v = run();

      if (v) return v;

      return defaultValue;
    }

    return defaultValue;
  }

  const defaultState = {
    userInfo: getValueButIgnoreInNative(() => CacheStore.getItem(CACHE_KEY_USER_INFO), {
      sessionCode: '',
    } as IUserInfo),
    userConfig: getValueButIgnoreInNative(() => CacheStore.getItem(CACHE_KEY_USER_CONFIG), {
      theme: DEFAULT_THEME,
      // TODO: 浏览器环境自动生成虚拟设备号
      deviceNo: '',
      /**
       * 跟随系统颜色模式，浏览器下默认为true, 在entry文件引入@/utils/disable-follow-system-theme.ts可以禁用
       */
      followSystemPrefersColorSchemeWhenInBrowser: isBrowser() && !(window as any).__disable_follow_system_theme,
      language: DEFAULT_LANGUAGE,
      raise: DEFAULT_RAISE_MODE,
      raw: {} as IRawAppUserConfig,
    }),
  } as IState;

  const theme = getDefaultTheme(defaultState.userConfig.followSystemPrefersColorSchemeWhenInBrowser, DEFAULT_THEME);

  if (isSupportedTheme(theme)) {
    defaultState.userConfig.theme = theme as ThemeValues;
  }

  if (isValidRaiseMode(raise)) {
    defaultState.userConfig.raise = raise as RaiseMode;
  }

  // 每次都强制检测浏览器语言, 使用配置好的默认语言
  if (isBrowser() && !isSupportedLanguage(lang) && (window as any).__force_detect_language_on_startup) {
    defaultState.userConfig.language = DEFAULT_LANGUAGE;
  } else if (isSupportedLanguage(lang)) {
    defaultState.userConfig.language = lang as Language;
  } else if (isSupportedLanguage(language)) {
    defaultState.userConfig.language = language as Language;
  }

  return defaultState;
}

export const useAppStore = create<IAppStore>((set) => {
  const initialState = createInitializedState();

  return {
    ...initialState,
    setUserConfig: (config: IStandardAppUserConfig) => {
      set({ userConfig: config });
    },
    setUserInfo: (info: IUserInfo) => {
      set({ userInfo: info });
      const token = accessToken(info);
      if (token) {
        globalBlocker.done();
      }
    },
    setLanguage: (language: any) => {
      const langs = Object.keys(supportedLanguage).map((key) => supportedLanguage[key]);
      if (langs.includes(language)) {
        set((state) => ({
          userConfig: { ...state.userConfig, language },
        }));
      } else {
        console.error('无效语言设置: ', language);
      }
    },
    setTheme: (theme: ThemeValues) => {
      const themeValue = SupportedThemes[theme];
      if (themeValue) {
        set((state) => ({
          userConfig: { ...state.userConfig, theme: themeValue },
        }));
      } else {
        console.error('无效主题设置: ', theme);
      }
    },
    setRaise: (raise: RaiseMode) => {
      if (raise === 'green' || raise === 'red') {
        set((state) => ({
          userConfig: { ...state.userConfig, raise },
        }));
      } else {
        console.error('无效涨跌颜色设置: ', raise);
      }
    },
    toggleFollowSystemPrefersColorSchemeWhenInBrowser: () => {
      set((state) => ({
        userConfig: {
          ...state.userConfig,
          followSystemPrefersColorSchemeWhenInBrowser: !state.userConfig.followSystemPrefersColorSchemeWhenInBrowser,
        },
      }));
    },
  };
});

export const selectUserConfig = (state: IAppStore) => state.userConfig;
export const selectUserInfo = (state: IAppStore) => state.userInfo;
export const selectLanguage = (state: IAppStore) => state.userConfig.language;

export const setUserConfig = (config: IStandardAppUserConfig) => useAppStore.getState().setUserConfig(config);
export const setUserInfo = (info: IUserInfo) => useAppStore.getState().setUserInfo(info);
export const setTheme = (theme: ThemeValues) => useAppStore.getState().setTheme(theme);
export const setRaise = (raise: RaiseMode) => useAppStore.getState().setRaise(raise);
export const toggleFollowSystemPrefersColorSchemeWhenInBrowser = () =>
  useAppStore.getState().toggleFollowSystemPrefersColorSchemeWhenInBrowser();
