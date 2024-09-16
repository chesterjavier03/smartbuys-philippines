'use client';

import { newVerification } from '@/server/actions/tokens';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import AuthCard from './auth-card';
import { FormError } from './form-error';
import FormSuccess from './form-success';

export const EmailVerificationForm = () => {
  const token = useSearchParams().get('token');
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError('No token found');
      return;
    }

    newVerification(token).then((result) => {
      if (result.error) {
        setError(result.error);
      }
      if (result.success) {
        setSuccess(result.success);
        router.push('/auth/login');
      }
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthCard
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      cardTitle="Verify your account."
    >
      <div className="flex items-center flex-col w-full justify-center">
        <p>{!success && !error ? 'Verifying email...' : null}</p>
        <FormSuccess message={success} />
        <FormError error={error} />
      </div>
    </AuthCard>
  );
};
