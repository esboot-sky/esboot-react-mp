import { enableDebug, isDev } from '@/constants/config';

if (enableDebug && isDev) {
  import('eruda').then((eruda) => {
    eruda.default.init();
  });
}
