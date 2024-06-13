import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';

// routes
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    if (pathname === PATH_PAGE.settings.root) {
      replace(PATH_PAGE.settings.profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_PAGE.settings.profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
