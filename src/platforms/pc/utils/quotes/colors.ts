import type { QuotesUpDownColor } from '@pc/constants/config';
import { QuotesUpDownColorScheme } from '@pc/constants/config';

/**
 * 传入store中保存的涨跌颜色模式，返回对应的up down颜色, 如果与页面需求不一致，可以不使用这个，
 * 自己根据raise值red, green判断，red表示红涨绿跌，green表示相反的绿涨红跌，只有正反向两种，但颜色可以多种，参与此函数的实现
 */
export function getQuotesUpDownColor(quotesUpDownColor: QuotesUpDownColor) {
  const colorScheme = QuotesUpDownColorScheme[quotesUpDownColor];

  if (colorScheme) {
    return colorScheme;
  }

  // 如不存在，返回默认
  return QuotesUpDownColorScheme.red;
}
