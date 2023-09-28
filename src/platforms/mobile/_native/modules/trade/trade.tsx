import { Button } from 'antd-mobile';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { a, sayHi } from '@/helpers/multi-platforms';
import './trade.scss';
import { useAppDispatch, useAppSelector } from '../model/store';
import { increase, selectCount } from '../model/hello/slice';

const AppHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const queryClient = useQueryClient();

  console.log('query client: ', queryClient);

  sayHi();
  console.log(a);

  return (
    <div>
      <p styleName={classNames({ test: true })}>
        Counter:
        {' '}
        {count}
      </p>

      <Button onClick={() => dispatch(increase(1))}>Add</Button>
    </div>
  );
};

export default AppHome;
