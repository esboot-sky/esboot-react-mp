import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { parseKeyValues } from '@websaber/string-utils';
import { globalBlocker } from '@dz-web/axios-middlewares';
import { Language, defaultLanguage } from '@/constants/config';
import { IRawAppUserConfig, IUserInfo, accessToken } from '../../customize';
import { MinimalRootState } from '../minimal-store';

/**
 * 点证web app移动端标准用户设置
 * 代码里统一从redux中读取此用户配置，代码不应关心用户配置的来源，并且格式应该统一,
 * 需要读取原始配置，请读取raw字段
 */
export interface IStandardAppUserConfig {
  theme: 'dark' | 'light';
  language: Language;
  raise: 'green' | 'red';
  deviceNo: string;
  raw: IRawAppUserConfig;
}

// Define a type for the slice state
interface IState {
  initialized: boolean;
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
    theme,
    language,
    raise,
  } = parseKeyValues(window.location.href);

  const defaultState = {
    /**
     * 成功初始化，获取到pc主题信息, 防止抖动, 其它方案目前都有小问题未解决，暂时先这样处理
     */
    initialized: false,
    userInfo: {
      sessionCode: '',
    },
    userConfig: {
      // TODO: 从url取默认值
      theme: 'light',
      deviceNo: '',
      // TODO: 从url取默认值
      language: defaultLanguage.ZH_CN,
      // TODO: 从url取默认值
      raise: 'red',
      raw: {} as IRawAppUserConfig,
    },
  } as IState;

  if (theme === 'dark' || theme === 'light') {
    defaultState.userConfig.theme = theme;
  }

  if (raise === 'green' || raise === 'red') {
    defaultState.userConfig.raise = raise as 'green' | 'red';
  }

  if (language === 'zh-CN' || language === 'zh-TW' || language === 'en-US') {
    defaultState.userConfig.language = language;
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
      state.initialized = true;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;

      const token = accessToken(action.payload);
      if (token) {
        globalBlocker.done();
      }
    },
    setLanguage: (state, action: PayloadAction<any>) => {
      state.userConfig.language = action.payload;
    },
  },
});

export const {
  setUserConfig,
  setUserInfo,
} = slice.actions;

export const selectUserConfig = (state: MinimalRootState) => state.app.userConfig;
export const selectLanguage: (state: MinimalRootState) => string = (state) => state.app.userConfig.language;
export const selectInitialized = (state: MinimalRootState) => state.app.initialized;

export default slice.reducer;
