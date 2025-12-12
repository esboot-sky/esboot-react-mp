import { render } from '@testing-library/react';
import { expect, it } from 'vitest';

import Detail from './detail';

it('detail component should render correctly', () => {
  const { container } = render(<Detail />);

  expect(container?.textContent).equals('detail');
});
