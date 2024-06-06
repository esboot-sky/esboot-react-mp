import App from '@mobile/modules/index';
import { store } from '@mobile/modules/index/model/store';
import generatePage from '@mobile-browser/helpers/generate-page';

generatePage(<App />, {
  store,
});

export default {
  title: 'Mobile-browser',
};
