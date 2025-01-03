import App from '@mobile/modules/tttt';
import { store } from '@mobile/modules/tttt/model/store';
import generatePage from '@mobile-native/helpers/generate-page';

generatePage(<App />, {
  store,
});

export default {
  title: 'Mobile-Native',
  langJsonPicker: ['tttt', 'global'],
};
