import { genericMemo } from '@/utils/react-utils';
import { Link } from 'react-router-dom';

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
    </div>
  );
});

export default Index;
