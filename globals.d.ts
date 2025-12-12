declare interface Window {
  __router__?: any;
  GLOBAL_CONFIG: {
    debug: boolean;
    COMMON_SERVERS: any;
  };
  esboot_urlParams: Record<string, string>;
}

declare namespace NodeJS {
  interface ProcessEnv {
    isBrowser: string;
    isMobile: string;
  }
}
