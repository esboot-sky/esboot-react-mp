/**
 * 多皮肤
 *
 */
export enum THEME {
  WHITE = 'light',
  BLACK = 'dark',
}

export const THEME_MAP = {
  [THEME.WHITE]: 'white',
  [THEME.BLACK]: 'black',
  // 安卓端中信app会返回black与theme，临时加上
  black: 'black',
  white: 'white',
};

export const DEFAULT_THEME = THEME_MAP[THEME.WHITE];
