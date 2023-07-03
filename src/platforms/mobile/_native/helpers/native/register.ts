import { THEME, Language } from '@/constants/config';
import bridge from './bridge';

const { getInstance } = bridge;

/**
 * 更新用户信息
 *
 */
export interface IUserInfoRaw {
  sessionCode: string;
}

export function updateUserInfo(func: (config: IUserInfoRaw) => void): void {
  getInstance().register('updateUserInfo', func, () => 'updateUserInfo ===> received message');
}

/**
 * 用户更新配置
 *
 */
export interface IUserConfigRaw {
  raise: string; // 涨跌色
  theme: THEME;
  language: Language;
}

export function updateUserConfig(func: (config: IUserConfigRaw) => void): void {
  getInstance().register('updateUserConfiguration', func, () => 'updateUserConfiguration ===> received message');
}
