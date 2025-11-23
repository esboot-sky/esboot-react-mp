import generatePage from '@mobile-browser/helpers/generate-page';
import App from '@mobile/modules/test-router';

generatePage(<App />);

export default {
  title: 'Mobile-browser',
  langJsonPicker: ['test-router', 'global'],
};
