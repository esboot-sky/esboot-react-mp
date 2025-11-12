import { enableDebug, isDev } from '@/constants/config';

export async function initDebug() {
  if (enableDebug && isDev) {
    const eruda = await import('eruda');
    eruda.default.init();
  }
}
