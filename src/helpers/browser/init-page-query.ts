import { parseKeyValues } from '@websaber/string-utils';

export const initPageQuery: {
  lang?: string;
  theme?: string;
  raise?: string;
  [key: string]: string | number | undefined;
} = parseKeyValues(window.location.href);
