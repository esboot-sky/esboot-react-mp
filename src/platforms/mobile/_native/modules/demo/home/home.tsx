import { Button } from 'antd-mobile';

import { useAppStore } from '@/model';

const AppHome: React.FC = () => {
  const bears = useAppStore((state) => state.bears);
  const increase = useAppStore((state) => state.increase);

  return (
    <div>
      <p>
        Bears:
        {' '}
        {bears}
      </p>

      <Button onClick={increase}>Add Bears</Button>
    </div>
  );
};

export default AppHome;
