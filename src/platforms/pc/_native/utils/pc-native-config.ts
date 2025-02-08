import { clamp } from 'lodash-es';

import { PC_FONT_SIZE_MAPPER } from '@pc/constants/config';

export function getRealPCNativeFontSize(pcFontSize: string) {
  const delta = PC_FONT_SIZE_MAPPER[pcFontSize as keyof typeof PC_FONT_SIZE_MAPPER] || 0;

  return clamp(16 + delta, 10, 18);
}
