/**
 * bridge mock
 */
let defaultUseBridgeMock = true;
// let defaultUseBridgeMock = false;

if (process.env.NODE_ENV === 'production') defaultUseBridgeMock = false;
export const useBridgeMock = defaultUseBridgeMock;

/**
 * 多语言
 *
 */
export const supportedLanguage = {
  ZH_CN: 'zh-CN',
  ZH_TW: 'zh-TW',
  EN_US: 'en-US',
} as const;

export type Language = typeof supportedLanguage[keyof typeof supportedLanguage];

export const DEFAULT_LANGUAGE = supportedLanguage.ZH_CN;
