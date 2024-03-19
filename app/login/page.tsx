'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  Image,
  Input,
  Modal,
  ModalContent,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  // password: Yup.string()
  //   .min(2, 'Password must be at least 6 characters')
  //   .required('Password is required'),
});

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (session) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      // await axios.post('/api/contact', data);
      const result = await signIn('email', {
        email: data.email,
        redirect: false,
        callbackUrl: '/',
      });
      if (result?.status === 200) router.push('/verify');
      setIsSubmitting(false);
      resetForm();
    } catch (error) {
      setIsSubmitting(false);
    }
  });

  const resetForm = () => {
    reset();
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="h-full">
        <Spinner
          color="success"
          size="lg"
          className="flex h-[calc(100vh-4rem)] align-middle justify-center justify-items-center content-center overflow-hidde"
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 w-screen justify-items-center mt-[15vh] place-items-start h-auto md:px-0 px-5">
        <Card
          shadow="lg"
          isBlurred
          className="grid grid-cols-1 justify-center align-middle justify-items-center place-items-center w-auto p-2 m-0 md:p-5 border-solid border-2 border-[#1a3d57] bg-white/40 backdrop-blur-sm
        cursor-pointer hover:bg-white/10"
        >
          <div className="flex flex-col w-full h-full place-content-start place-items-center my-5">
            <Image
              radius="sm"
              alt={'SmartBuys Philippines'}
              className="w-full h-full object-contain z-0 pb-10"
              width={'50%'}
              height={'50%'}
              src={'/images/smartbuys_wings.webp'}
              srcSet={'/images/smartbuys_wings.webp'}
              loading={'eager'}
            />
            <form
              onSubmit={onSubmit}
              className="flex flex-col w-full gap-2 place-content-center "
            >
              <div className="flex w-auto justify-center align-middle">
                <Input
                  isDisabled={isSubmitting}
                  variant="flat"
                  size={'lg'}
                  fullWidth
                  radius="sm"
                  label="Email"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                  labelPlacement={'outside'}
                  classNames={{
                    label: 'text-[#1a3d57] text-lg font-normal',
                    input: [
                      'bg-transparent',
                      'text-lg font-medium',
                      'text-[#1a3d57]',
                      'placeholder:text-[#1a3d57]/40',
                    ],
                    innerWrapper: 'bg-transparent',
                    inputWrapper: [
                      'shadow-xl',
                      'bg-default-200/10',
                      'backdrop-blur-lg',
                      'backdrop-saturate-200',
                      'hover:bg-default-200/70',
                      'group-data-[focused=true]:bg-default-200/50',
                      'dark:group-data-[focused=true]:bg-default/60',
                      '!cursor-text',
                      'border-[#1a3d57] border-solid border-2',
                    ],
                  }}
                  {...register('email')}
                />
              </div>
              <div className="flex flex-row justify-center align-middle">
                <Button
                  isLoading={isSubmitting}
                  variant="solid"
                  disableRipple
                  type="submit"
                  fullWidth
                  size="lg"
                  className="md:w-auto w-full md:text-md text-lg bg-[#ff0000] text-white mt-5"
                  radius="sm"
                >
                  {isSubmitting ? '' : 'Sign in with Email'}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
