import { describe, expect, it } from 'vitest';

import { getRaiseModeColor } from './colors';

import '@pc/constants/config';

describe('测试', () => {
  it('获取涨跌颜色函数存在', () => {
    console.log('ok');
    expect(typeof getRaiseModeColor === 'function').toBeTruthy();
  });
});
