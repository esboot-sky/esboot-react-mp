import App from '@mobile/modules/tttt';
import { store } from '@mobile/modules/tttt/model/store';
import generatePage from '@mobile-browser/helpers/generate-page';

generatePage(<App />, {
  store,
});

export default {
  title: 'Mobile-browser',
  langJsonPicker: ['tttt', 'global'],
};
