import App from '@mobile/modules/test';
import generatePage from '@mobile-browser/helpers/generate-page';

generatePage(<App />);

export default {
  title: 'Mobile-browser',
  langJsonPicker: ['test', 'global'],
};
