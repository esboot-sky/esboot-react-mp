import { Link } from 'react-router';

import { genericMemo } from '@/utils/react-utils';

const Index = genericMemo(function Index() {
  return (
    <div>
      <Link
        style={{
          fontSize: 16,
        }}
        to="/detail"
      >
        Go To Detail
      </Link>

      <div className="h-[375px] w-[375px] bg-pink-300">375 width in 750 design</div>
    </div>
  );
});

export default Index;
