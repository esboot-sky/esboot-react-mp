import { CacheStore } from '@dz-web/cache';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd-mobile';
import { clsx } from '@dz-web/esboot-browser';
import { FormattedMessage } from 'react-intl';

import './index.scss';
import { increase, selectCount } from './model/hello/slice';
import { useAppDispatch, useAppSelector } from './model/store';

const AppHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const queryClient = useQueryClient();
  CacheStore.setItem('userInfoTest', { name: 'test' });

  console.log('query client: ', queryClient);

  const onClick = () => {
    dispatch(increase(1));
  };

  return (
    <div>
      <p styleName={clsx({ test: true })}>
        <FormattedMessage id="global.project" />: {count}
      </p>

      <Button onClick={onClick}>
        <FormattedMessage id="global.project" />
      </Button>
    </div>
  );
};

export default AppHome;
