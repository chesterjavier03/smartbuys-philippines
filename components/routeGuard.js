import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '@nextui-org/react';
import { useSelector } from 'react-redux';

const RouteGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/', undefined, { shallow: true });
    } else {
      setLoading(false);
    }
  }, [router, userInfo]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default RouteGuard;
