declare interface Window {
  __mobile__store__: any;
  GLOBAL_CONFIG: {
    COMMON_SERVERS: any;
  };
  esboot_urlParams: Record<string, string>;
}

declare module '*.svg';
declare module '*.png';

declare namespace React {
  interface Attributes {
    styleName?: string | undefined;
  }
  interface HTMLAttributes<T> {
    styleName?: string | undefined;
  }
  interface SVGAttributes<T> {
    styleName?: string | undefined;
  }
}

declare module '*.json' {
  const value: any;
  export default value;
}
