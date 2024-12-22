import { RouterProvider } from 'react-router-dom';

import './index.scss';
import router from './router';

export default function RouterApp() {
  return <RouterProvider router={router} fallbackElement={<div>*</div>} />;
}
