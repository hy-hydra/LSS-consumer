import React from 'react';
// next
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
// redirection page
import SplashPage from '.';
import SplashLayout from '../../layouts/splash/SplashLayout';

// ----------------------------------------------------------------------

LoginSteps.getLayout = (page) => <SplashLayout>{page}</SplashLayout>;

// ----------------------------------------------------------------------

export default function LoginSteps() {
  const {
    query: { stepName },
  } = useRouter();
  const params = useSearchParams();
  const uid = params.get('uid');
  const token = params.get('token');

  return <SplashPage stepName={stepName} uid={uid} token={token} />;
}
