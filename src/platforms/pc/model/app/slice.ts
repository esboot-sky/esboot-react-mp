import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { globalBlocker } from '@dz-web/axios-middlewares';
import { Language, DEFAULT_LANGUAGE, supportedLanguage } from '@/constants/config';
import { IRawAppUserConfig, IUserInfo, accessToken } from '@pc/customize';
import { DEFAULT_THEME, SupportedThemes, ThemeValues, RaiseMode, DEFAULT_RAISE_MODE } from '@pc/constants/config';
import { initPageQuery } from '@/helpers/init-page-query';
import { CacheStore } from '@dz-web/cache';
import { isSupportedLanguage } from '@/utils/capacities';
import { CACHE_KEY_PC_USER_CONFIG, CACHE_KEY_PC_USER_INFO } from '@/constants/caches';
import { isBrowser } from '@/utils/platforms';
import { MinimalRootState } from '@pc/model/minimal-store';
import { getRealPCNativeFontSizee } from '@pc-native/utils/pc-native-config';
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
 * 代码里统一从redux中读取此用户配置，代码不应关心用户配置的来源，并且格式应该统一,
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
  appFontSize: number;
  appFontWeight: 'normal' | 'bold';
  raw: IRawAppUserConfig;
}

// Define a type for the slice state
interface IState {
  /**
   * 类型待定，暂无标准
   */
  userInfo: IUserInfo;
  /**
   * 标准dz web app用户设置, 不需要关心来源
   */
  userConfig: IStandardAppUserConfig;
}

function createInitializedState(): IState {
  const {
    lang,
    raise,
    additionalSize,
    fontWeight,
  } = initPageQuery;

  function getValueButIgnoreInNative<T>(run: () => T | undefined | null, defaultValue: T) {
    if (isBrowser()) {
      const v = run();

      if (v) return v;

      return defaultValue;
    }

    return defaultValue;
  }

  const defaultState = {
    userInfo: getValueButIgnoreInNative(() => CacheStore.getItem(CACHE_KEY_PC_USER_INFO), {
      sessionCode: '',
    } as IUserInfo),
    userConfig: getValueButIgnoreInNative(() => CacheStore.getItem(CACHE_KEY_PC_USER_CONFIG), {
      theme: DEFAULT_THEME,
      deviceNo: '',
      followSystemPrefersColorSchemeWhenInBrowser: isBrowser() && !(window as any).__disable_follow_system_theme,
      language: DEFAULT_LANGUAGE,
      raise: DEFAULT_RAISE_MODE,
      appFontSize: 14,
      appFontWeight: 'normal',
      raw: {} as IRawAppUserConfig,
    }),
  } as IState;

  const theme = getDefaultTheme(
    defaultState.userConfig.followSystemPrefersColorSchemeWhenInBrowser,
    DEFAULT_THEME,
  );

  if (isSupportedTheme(theme)) {
    defaultState.userConfig.theme = theme as ThemeValues;
  }

  if (isValidRaiseMode(raise)) {
    defaultState.userConfig.raise = raise as RaiseMode;
  }

  if (isSupportedLanguage(lang)) {
    defaultState.userConfig.language = lang as Language;
  }

  const intAdditionalSize = parseInt(additionalSize || '', 10);
  if (intAdditionalSize) {
    defaultState.userConfig.appFontSize = getRealPCNativeFontSizee(intAdditionalSize);
  }

  if (fontWeight === 'bold' || fontWeight === 'normal') {
    defaultState.userConfig.appFontWeight = fontWeight;
  }

  return defaultState;
}

export const slice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: createInitializedState(),
  reducers: {
    setUserConfig: (state, action: PayloadAction<IStandardAppUserConfig>) => {
      state.userConfig = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;

      const token = accessToken(action.payload);
      if (token) {
        globalBlocker.done();
      }
    },
    setLanguage: (state, action: PayloadAction<any>) => {
      const language = action.payload;

      const langs = Object.keys(supportedLanguage).map((key) => supportedLanguage[key]);
      if (langs.includes(language)) {
        state.userConfig.language = language;
      } else {
        console.error('无效语言设置: ', action.payload);
      }
    },
    setTheme(state, action: PayloadAction<ThemeValues>) {
      const theme = SupportedThemes[action.payload];
      // 判断主题是否有效
      if (theme) {
        state.userConfig.theme = theme;
      } else {
        console.error('无效主题设置: ', action.payload);
      }
    },
    setRaise(state, action: PayloadAction<RaiseMode>) {
      if (action.payload === 'green' || action.payload === 'red') {
        state.userConfig.raise = action.payload;
      } else {
        console.error('无效涨跌颜色设置: ', action.payload);
      }
    },
    toggleFollowSystemPrefersColorSchemeWhenInBrowser(state) {
      const { followSystemPrefersColorSchemeWhenInBrowser } = state.userConfig;
      state.userConfig.followSystemPrefersColorSchemeWhenInBrowser = !followSystemPrefersColorSchemeWhenInBrowser;
    },
    disableFollowSystemPrefersColorSchemeWhenInBrowser(state) {
      state.userConfig.followSystemPrefersColorSchemeWhenInBrowser = false;
    },
  },
});

export const {
  setUserConfig,
  setUserInfo,
  setTheme,
  setRaise,
  toggleFollowSystemPrefersColorSchemeWhenInBrowser,
  disableFollowSystemPrefersColorSchemeWhenInBrowser,
} = slice.actions;

export const selectUserConfig = (state: MinimalRootState) => state.app.userConfig;
export const selectUserInfo = (state: MinimalRootState) => state.app.userInfo;
export const selectLanguage: (state: MinimalRootState) => string = (state) => state.app.userConfig.language;

export default slice.reducer;
