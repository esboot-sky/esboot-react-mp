import { defineConfig } from '@dz-web/esboot';

export default defineConfig({
  mfsu: true,
  port: 5004,
  http2: true,
  open: true,
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
