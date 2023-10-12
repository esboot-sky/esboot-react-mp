import { DEFAULT_RAISE_MODE, RaiseModeColorScheme, RaiseMode } from '@/constants/config';

/**
 * 传入redux中的涨跌颜色模式，返回对应的up down颜色
 */
export function getRaiseModeColor(raiseMode: RaiseMode) {
  const colorScheme = RaiseModeColorScheme[raiseMode];

  if (colorScheme) {
    return colorScheme;
  }

  // 如不存在，返回默认
  return DEFAULT_RAISE_MODE;
}
