import App from '@mobile/modules/index';
import { store } from '@mobile/modules/index/model/store';
import generatePage from '@mobile-native/helpers/generate-page';

generatePage(<App />, {
  store,
});

export default {
  title: 'Mobile-Native',
};
