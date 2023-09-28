import { listenError } from '@/hoc/query-client';

/**
 * app传过来的原始设置信息, 代码中不使用此类型，使用dz web app标准类型IStandardAppUserConfig
 */
export interface IRawAppUserConfig {
  theme: 'dark' | 'light';
  deviceNo: string;
  language: 'zh-CN' | 'zh-TW' | 'en-US';
  orderToConfirmByDialog: boolean;
  raise: 'green' | 'red';
  global_font_scale: number;
}

/**
 * 不同的app user info不可能统一格式
 * 在这里根据app提供的内容，改成自己的格式即可
 */
export interface IUserInfo {
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

listenError((friendlyMessage, error, meta) => {
  console.error('还未添加全局错误提示', friendlyMessage, error, meta);
});
