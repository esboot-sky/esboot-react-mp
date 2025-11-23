import { memo } from 'react';
import useHelloStore, { increase, selectCount } from '../../model/hello';

const Detail = () => {
  const count = useHelloStore(selectCount);

  return (
    <div>
      detail {count}
      <button onClick={() => increase(1)}>increase</button>
    </div>
  );
};

export default memo(Detail);
