import { SupportedThemes, validQuotesUpDownColors } from '@pc/constants/config';

import { find } from 'lodash-es';

export function isSupportedTheme(theme?: string): boolean {
  return !!theme && theme in SupportedThemes;
}

export function isValidQuotesUpDownColor(quotesUpDownColor?: QuotesUpDownColor) {
  return !!quotesUpDownColor && !!find(validQuotesUpDownColors, item => item === quotesUpDownColor);
}
