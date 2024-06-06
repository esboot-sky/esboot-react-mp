import { CacheStore } from '@dz-web/cache';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd-mobile';
import classNames from 'classnames';
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

  return (
    <div>
      <p styleName={classNames({ test: true })}>
        <FormattedMessage id="global.project" />: {count}
      </p>

      <Button onClick={() => dispatch(increase(1))}>
        <FormattedMessage id="test1.nest2.key2" />
      </Button>
    </div>
  );
};

export default AppHome;
