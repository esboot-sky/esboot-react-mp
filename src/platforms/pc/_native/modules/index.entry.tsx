import App from '@pc/modules/index';
import { store } from '@pc/modules/index/model/store';
import generatePage from '@pc-native/helpers/generate-page';

generatePage(<App />, {
  store,
});

export default {
  title: 'pc-Native',
  template: 'disable-rem',
};
