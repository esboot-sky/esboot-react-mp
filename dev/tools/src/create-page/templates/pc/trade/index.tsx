import { FormattedMessage } from 'react-intl';
import { useQueryClient } from '@tanstack/react-query';
import { CacheStore } from '@dz-web/cache';
import classNames from 'classnames';
import { a, sayHi } from '@/helpers/multi-platforms';
import './index.scss';
import { useAppDispatch, useAppSelector } from './model/store';
import { increase, selectCount } from './model/hello/slice';

const AppHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const queryClient = useQueryClient();
  CacheStore.setItem('userInfoTest', { name: 'test' });

  console.log('query client: ', queryClient);

  sayHi();
  console.log(a);

  return (
    <div>
      <p styleName={classNames({ test: true })}>
        <FormattedMessage id="global.mobile.page.quantity" />
        :
        {' '}
        {count}
      </p>

      <button
        onClick={() => dispatch(increase(1))}
        type="button"
      >
        <FormattedMessage id="global.mobile.page.increase" />
      </button>
    </div>
  );
};

export default AppHome;
