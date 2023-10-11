import { parseKeyValues } from '@websaber/string-utils';

export const initPageQuery: {
  lang?: string;
  theme?: string;
  raise?: string;
} = parseKeyValues(window.location.href);
