export function isMobile() {
  return process.env.isMobile === 'true' || (process.env.isMobile as any) === true;
}

export function isPC() {
  return !isMobile();
}

export function isBrowser() {
  return process.env.isBrowser === 'true' || (process.env.isBrowser as any) === true;
}

export function isNative() {
  return !isBrowser();
}

export function isMobileBrowser() {
  return isMobile() && isBrowser();
}

export function isMobileNative() {
  return isMobile() && isNative();
}

export function isPCBrowser() {
  return isPC() && isBrowser();
}

export function isPCNative() {
  return isPC() && isNative();
}
