import { enableDebug, isDev } from '@/constants/config';

export const initDebug = async () => {
  if (enableDebug && isDev) {
    const eruda = await import('eruda');
    eruda.default.init();
  }
};
