import { defineConfig } from '@dz-web/esboot';

export default defineConfig({
  mfsu: false,
  port: 5004,
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
