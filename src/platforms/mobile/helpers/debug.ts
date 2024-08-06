import { enableDebug } from '@/constants/config';

if (enableDebug && process.env.NODE_ENV === 'development') {
  import('eruda').then((eruda) => eruda.default.init());
}
