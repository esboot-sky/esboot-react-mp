import { parseKeyValues } from '@websaber/string-utils';

export const initPageQuery: {
  language?: string;
  theme?: string;
  raise?: string;
  [key: string]: string | number | undefined;
} = parseKeyValues(window.location.href);
