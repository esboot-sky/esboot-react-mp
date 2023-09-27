import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRawAppUserConfig, IUserInfo } from '@mobile/custom-types';
import { MinimalRootState } from '../minimal-store';

/**
 * 点证web app移动端标准用户设置
 * 代码里统一从redux中读取此用户配置，代码不应关心用户配置的来源，并且格式应该统一,
 * 需要读取原始配置，请读取raw字段
 */
export interface IStandardAppUserConfig {
  theme: 'dark' | 'light';
  language: 'zh-CN' | 'zh-TW' | 'en-US';
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
  return {
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
      language: 'zh-CN',
      // TODO: 从url取默认值
      raise: 'red',
      raw: {} as IRawAppUserConfig,
    },
  };
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
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
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
