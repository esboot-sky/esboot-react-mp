/**
 * 点证web app移动端标准用户设置
 * 代码里统一从redux中读取此用户配置，代码不应关心用户配置的来源，并且格式应该统一,
 * 需要读取原始配置，请读取raw字段
 */
export interface IStandardAppUserConfig {
  theme: 'dark' | 'light';
  language: 'zh-CN' | 'zh-TW' | 'en-US';
  globalFontScale: number;
  raise: 'green' | 'red';
  deviceNo: string;
  raw: any;
}
