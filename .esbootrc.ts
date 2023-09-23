import { defineConfig } from '@dz-web/esboot';
import type { CompileTimeConfig } from '@dz-web/esboot';

export default defineConfig({
  mfsu: true,
  // extraBabelIncludes: [
  //   /filter-obj/i,
  //   /immer/i,
  //   /zustand/i,
  //   /query-string/i,
  //   /react-intl/i,
  //   /d3-/i,
  //   /@tanstack/i,
  //   /@react-spring/i,
  //   /@floating-ui/i,
  // ],
});

export const afterHooks = (compileTimeConfig: CompileTimeConfig) => {
  console.log(compileTimeConfig, '<-- compileTimeConfig');
}
