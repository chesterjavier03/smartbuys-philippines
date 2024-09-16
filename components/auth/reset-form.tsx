'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { reset } from '@/server/actions/password-reset';
import { ResetPasswordSchema } from '@/types/reset-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import AuthCard from './auth-card';
import { Button } from '../ui/button';
import FormSuccess from './form-success';
import { FormError } from './form-error';
import Link from 'next/link';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { execute, status } = useAction(reset, {
    onSuccess(result) {
      if (result.data?.error) setError(result.data.error);
      if (result.data?.success) setSuccess(result.data.success);
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    execute(values);
  };

  return (
    <AuthCard
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      cardTitle="Forgot your password?"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                disabled={status === 'executing'}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email Address"
                        type="email"
                        disabled={status === 'executing'}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError error={error} />
              <Button size={'sm'} variant={'link'} asChild>
                <Link href="/auth/reset">Forgot your password</Link>
              </Button>
            </div>
            <Button
              type="submit"
              className={cn(
                'w-full',
                status === 'executing' ? 'animate-pulse' : ''
              )}
            >
              {status === 'executing' ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};

export default ResetForm;
