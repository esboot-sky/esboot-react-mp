import { Link } from 'react-router-dom';

import { genericMemo } from '@/utils/react-utils';

import './index.scss';

const Index = genericMemo(function Index() {
  return (
    <div>
      <Link
        style={{
          fontSize: 16,
        }}
        to="/detail"
      >
        go to detail
      </Link>

      <ul>
        <li>24332</li>
        <li>24332</li>
      </ul>

      <h3>23423</h3>
      <div styleName="w375">375 width in 750 design</div>
    </div>
  );
});

export default Index;
