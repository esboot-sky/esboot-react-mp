import { createHashRouter } from 'react-router-dom';
import loadable from '@loadable/component';

import App from './app';

import demoRouters from '../demo/router';

const NotFound = loadable(() => import('../misc/not-found/not-found'));

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [demoRouters],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

/**
 * 不同页面有不同的路由实例，统一导出到window.__router__，使用页面当前的路由实例
 */
window.__router__ = router;

export default router;
