import { Language } from '@/constants/config';
import { listenReactQueryError } from '../../global-events';

/**
 * app传过来的原始设置信息, 代码中不使用此类型，使用dz web app标准类型IStandardAppUserConfig
 */
export interface IRawAppUserConfig {
  theme: 'dark' | 'light';
  deviceNo: string;
  language: Language;
  orderToConfirmByDialog: boolean;
  raise: 'green' | 'red';
  global_font_scale: number;
}

export interface IRequiredUserInfo {
  token: string;
}

/**
 * 不同的app user info不可能统一格式
 * 在这里根据app提供的内容，改成自己的格式即可
 */
export interface IUserInfo extends IRequiredUserInfo {
  sessionCode: string;
  bcanStatus: string;
  bindTrade: boolean;
  isLogin: boolean;
  mobile: string;
  nickName: string;
  orgCode: string;
  sessionId: string;
  trade2faCode: string;
  tradeToken: string;
  tradingAccSeq: string;
  userId: string;
}

/**
 * 根据项目提供的用户信息，返回access token
 */
export function accessToken(userInfo: IUserInfo) {
  return userInfo.sessionCode;
}

// 监听react query错误
listenReactQueryError((friendlyMessage, error, meta) => {
  console.error('还未添加全局错误提示', friendlyMessage, error, meta);
});

// TODO: 监听请求失败错误, 通常不统一报错，而是在各个页面自己处理，否则有错误定制需求的页面会重复报错
// 或者使用react query管理请求，重试请求失败后，会统一处理报错，并且可以通过meta抑制错误提示
