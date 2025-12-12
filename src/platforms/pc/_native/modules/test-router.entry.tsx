import generatePage from '@pc-native/helpers/generate-page';
import App from '@pc/modules/test-router';

generatePage(<App />);

export default {
  title: 'pc-Native',
  template: 'disable-rem',
  langJsonPicker: ['test-router', 'global'],
};
