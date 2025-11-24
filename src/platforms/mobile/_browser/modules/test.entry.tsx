import generatePage from '@mobile-browser/helpers/generate-page';
import App from '@mobile/modules/test';

generatePage(<App />);

export default {
  title: 'Mobile-browser',
  langJsonPicker: ['test', 'global'],
};
