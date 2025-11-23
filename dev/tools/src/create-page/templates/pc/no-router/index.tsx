import { CacheStore } from '@dz-web/cache';
import { clsx } from '@dz-web/esboot-browser';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';

import { increase, selectCount } from './model/hello/slice';
import { useAppSelector } from './model/store';
import './index.scss';

const AppHome: React.FC = () => {
  const count = useAppSelector(selectCount);
  const queryClient = useQueryClient();
  CacheStore.setItem('userInfoTest', { name: 'test' });

  console.log('query client: ', queryClient);

  return (
    <div>
      <p styleName={clsx({ test: true })}>
        <FormattedMessage id="global.project" />
        :
        {count}
      </p>

      <button onClick={() => increase(1)} type="button">
        <FormattedMessage id="global.project" />
      </button>
    </div>
  );
};

export default AppHome;
