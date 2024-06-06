import App from '@pc/modules/index';
import { store } from '@pc/modules/index/model/store';
import generatePage from '@pc-browser/helpers/generate-page';

generatePage(<App />, {
  store,
});

export default {
  langPick: ['global', 'test1.nest2'],
  title: 'pc-browser',
  template: 'disable-rem',
};
