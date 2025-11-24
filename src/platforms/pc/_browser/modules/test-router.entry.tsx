import generatePage from '@pc-browser/helpers/generate-page';
import App from '@pc/modules/test-router';

generatePage(<App />);

export default {
  title: 'pc-browser',
  template: 'disable-rem',
  langJsonPicker: ['test-router', 'global'],
};
