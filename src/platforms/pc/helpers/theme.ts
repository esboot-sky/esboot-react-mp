import type { ThemeValues } from '@pc/constants/config';
import { SupportedThemes } from '@pc/constants/config';
import { isSupportedTheme } from '@pc/utils/capacities';
import { initPageQuery } from '@/helpers/init-page-query';

export function getDefaultTheme(followSystem: boolean, defaultTheme: ThemeValues) {
  const { theme } = initPageQuery;
  // 优先使用url指定的主题初始化
  if (isSupportedTheme(theme))
    return theme as ThemeValues;

  // 浏览器模式下，设置了跟随系统设置, 则根据系统设置初始化
  if (followSystem) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? SupportedThemes.dark : SupportedThemes.light;
  }

  return defaultTheme;
}

export function updateBaseRootClass(prefix: string, prev: string, next: string) {
  const { classList } = document.documentElement;
  if (prev) {
    classList.remove(`${prefix}${prev}`);
  }
  classList.add(`${prefix}${next}`);
}

export function updateThemeRootClass(prevTheme: ThemeValues, nextTheme: ThemeValues) {
  updateBaseRootClass('dz-theme-', prevTheme, nextTheme);
}

export function updateQuotesUpDownColorRootClass(prevQuotesUpDownColor: string, nextQuotesUpDownColor: string) {
  updateBaseRootClass('dz-quotes-up-down-color-', prevQuotesUpDownColor, nextQuotesUpDownColor);
}

