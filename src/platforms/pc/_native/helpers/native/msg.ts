import { bridge } from '@dz-web/bridge';

// 解析msg结果
function parseResult(res) {
  try {
    const { code, data } = res.result;
    return code === 0 ? JSON.parse(data) : {};
  } catch (err) {
    return {};
  }
}

/**
 * 获取用户配置
 *
 */
export function queryUserConfig(): Promise<any> {
  return bridge.sendMsg('getUserConfiguration')
    .then((res) => parseResult(res));
}

/**
 * 获取用户信息
 *
 */
export function queryUserInfo(): Promise<any> {
  return bridge.sendMsg('userInfo')
    .then((res) => parseResult(res));
}
