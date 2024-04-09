'use client';

import { orderSummarySchema } from '@/app/_utility/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  Divider,
  Input,
  Link,
  Modal,
  ModalContent,
  Spacer,
  useDisclosure,
} from '@nextui-org/react';
import { Product } from '@prisma/client';
import axios from 'axios';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdArrowForward } from 'react-icons/md';
import { z } from 'zod';

const OrderFormSubmitted = dynamic(() => import('./OrderFormSubmitted'), {
  ssr: false,
});

const TextTitle = dynamic(() => import('./TextTitle'), {
  ssr: false,
});

const TextValue = dynamic(() => import('./TextValue'), {
  ssr: false,
});

type OrderSummarySchema = z.infer<typeof orderSummarySchema>;

interface Props {
  product: Product;
  size: string;
  setCount: (value: number) => void;
  setSize: (value: string) => void;
  setTotal: (value: number) => void;
  quantity: string;
  total: string;
}

const OrderSummary = ({
  product,
  size,
  setCount,
  setSize,
  setTotal,
  quantity,
  total,
}: Props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderSummarySchema>({
    resolver: zodResolver(orderSummarySchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    let newData = {
      imageUrl: product.image,
      productName: product.name,
      productDescription: product.description,
      productSize: size,
      productQuantity: quantity,
      productPrice: product.category !== 'Food' ? product.price : 'N/A',
      orderTotal: total,
      customerName: data.fullName,
      customerEmail: session?.user.email,
      customerAddress: data.address,
      customerMobile: data.mobile,
    };
    try {
      setIsSubmitting(true);
      await axios.post('/api/order', newData);
      onOpen();
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  });

  const isButtonEnabled = () => {
    let isCategoryFood = product.category === 'Food';
    return (isSubmitting || isCategoryFood ? false : !size) ? true : false;
  };

  const resetOrderForm = () => {
    reset();
    onClose();
    router.push('/');
    setCount(1);
    setSize('');
    setTotal(product!.price);
    setIsSubmitting(false);
  };

  return (
    <>
      <Card
        className=" border-solid border-1 xl:h-[calc(80vh)] h-full md:mb-5 bg-white/60 mx-5 xl:w-auto sm:w-[calc(93vw)] p-5 cursor-pointer"
        radius="sm"
        shadow="sm"
      >
        <div className="text-2xl uppercase text-center text-pretty mb-2 text-default-500">
          Order Summary
        </div>
        <Divider className="mb-5 bg-[#ff0000]" />
        <Spacer y={1} />
        <div className="text-2xl font-semibold text-start text-pretty mb-2 text-default-500">
          Product Details:
        </div>
        <div className="flex flex-col justify-around align-middle mt-1 gap-y-2">
          <div className="flex flex-row justify-between align-middle text-center">
            <TextTitle title={'Name:'} />
            <TextValue value={product?.name ?? ''} />
          </div>
          {(product?.category ?? '') !== 'Food' && (
            <div className="flex flex-row justify-between align-middle text-center">
              <TextTitle title={'Size:'} />
              <TextValue value={size} />
            </div>
          )}
          <div className="flex flex-row justify-between align-middle text-center">
            <TextTitle title={'Pieces:'} />
            <TextValue value={quantity} />
          </div>
          <div className="flex flex-row justify-between align-middle text-center">
            <TextTitle title={'OrderTotal:'} />
            <TextValue value={total} />
          </div>
        </div>
        <Spacer y={5} />

        <div className="text-2xl font-semibold text-start text-pretty mb-5 text-default-500">
          Customer Information:
        </div>
        {!session && (
          <div className="grid grid-cols-1 justify-items-center h-full w-full">
            <div className="flex text-xl font-normal text-default-500/80 flex-col flex-wrap justify-center align-middle">
              You need to login to proceed to checkout
            </div>
            <Button
              as={Link}
              href="/login"
              isLoading={isSubmitting}
              variant="solid"
              color="primary"
              disableRipple
              type="submit"
              fullWidth
              size="lg"
              className="md:w-1/3 w-full md:text-xl text-lg"
              radius="md"
            >
              {isSubmitting ? 'Login' : 'Login'}
            </Button>
          </div>
        )}
        {session && (
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-2 justify-center align-middle object-contain md:py-0 py-5 md:mb-0 mb-10"
          >
            <div
              className={classNames({
                'flex flex-col justify-around align-middle mt-0': true,
                'gap-y-0': !errors,
              })}
            >
              <Input
                isDisabled={isSubmitting}
                variant="flat"
                fullWidth
                size="sm"
                radius="sm"
                label="Full Name"
                isInvalid={errors.fullName !== undefined}
                errorMessage={errors.fullName?.message}
                className={classNames({
                  'mb-5': errors.fullName?.message === undefined,
                  'mb-0': errors.fullName?.message !== undefined,
                })}
                classNames={{
                  mainWrapper: 'w-full h-auto mb-1',
                  label: 'text-[#1a3d57] text-md text-start font-normal w-2/5',
                  input: [
                    'bg-transparent',
                    'text-md font-medium',
                    'text-[#1a3d57]',
                    'placeholder:text-[#1a3d57]/40',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'shadow-md',
                    'bg-default-200/30',
                    'backdrop-blur-lg',
                    'backdrop-saturate-200',
                    'hover:bg-default-200/70',
                    'group-data-[focused=true]:bg-default-200/50',
                    'dark:group-data-[focused=true]:bg-default/60',
                    '!cursor-text',
                    'border-[#1a3d57] border-solid border-2',
                  ],
                }}
                {...register('fullName')}
              />
              <Input
                isDisabled={isSubmitting}
                variant="flat"
                fullWidth
                size="sm"
                radius="sm"
                label="Address"
                isInvalid={errors.address !== undefined}
                errorMessage={errors.address?.message}
                className={classNames({
                  'mb-5': errors.address?.message === undefined,
                  'mb-0': errors.address?.message !== undefined,
                })}
                classNames={{
                  mainWrapper: 'w-full h-auto mb-1',
                  label: 'text-[#1a3d57] text-md text-start font-normal w-2/5',
                  input: [
                    'bg-transparent',
                    'text-md font-medium',
                    'text-[#1a3d57]',
                    'placeholder:text-[#1a3d57]/40',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'shadow-md',
                    'bg-default-200/30',
                    'backdrop-blur-lg',
                    'backdrop-saturate-200',
                    'hover:bg-default-200/70',
                    'group-data-[focused=true]:bg-default-200/50',
                    'dark:group-data-[focused=true]:bg-default/60',
                    '!cursor-text',
                    'border-[#1a3d57] border-solid border-2',
                  ],
                }}
                {...register('address')}
              />
              <Input
                isDisabled={true}
                variant="flat"
                fullWidth
                size="sm"
                radius="sm"
                label="Email"
                value={session?.user!.email!}
                isInvalid={errors.email !== undefined}
                errorMessage={errors.email?.message}
                className={classNames({
                  'mb-5': errors.email?.message === undefined,
                  'mb-0': errors.email?.message !== undefined,
                })}
                classNames={{
                  mainWrapper: 'w-full h-auto',
                  label: 'text-[#1a3d57] text-md text-start font-normal w-2/5',
                  input: [
                    'bg-transparent',
                    'text-md font-medium',
                    'text-[#1a3d57]',
                    'placeholder:text-[#1a3d57]/40',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'shadow-md',
                    'bg-default-200/30',
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
              <Input
                isDisabled={isSubmitting}
                variant="flat"
                fullWidth
                size="sm"
                radius="sm"
                label="Mobile"
                isInvalid={errors.mobile !== undefined}
                errorMessage={errors.mobile?.message}
                className={classNames({
                  'mb-5': errors.mobile?.message === undefined,
                  'mb-0': errors.mobile?.message !== undefined,
                })}
                classNames={{
                  mainWrapper: 'w-full h-auto mb-1',
                  label: 'text-[#1a3d57] text-md text-start font-normal w-2/5',
                  input: [
                    'bg-transparent',
                    'text-md font-medium',
                    'text-[#1a3d57]',
                    'placeholder:text-[#1a3d57]/40',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'shadow-md',
                    'bg-default-200/30',
                    'backdrop-blur-lg',
                    'backdrop-saturate-200',
                    'hover:bg-default-200/70',
                    'group-data-[focused=true]:bg-default-200/50',
                    'dark:group-data-[focused=true]:bg-default/60',
                    '!cursor-text',
                    'border-[#1a3d57] border-solid border-2',
                  ],
                }}
                {...register('mobile')}
              />
              <Button
                isDisabled={
                  (isSubmitting || product?.category === 'Food' ? false : !size)
                    ? true
                    : false
                }
                isLoading={isSubmitting}
                variant="solid"
                color="primary"
                disableRipple
                type="submit"
                fullWidth
                size="md"
                className="md:w-1/3 w-full md:place-self-end text-base"
                radius="sm"
                endContent={<MdArrowForward />}
              >
                {isSubmitting ? 'Processing....' : 'Place Order'}
              </Button>
            </div>
          </form>
        )}
      </Card>
      <Modal
        backdrop={'blur'}
        isOpen={isOpen}
        onClose={resetOrderForm}
        size="5xl"
        isDismissable
        shadow="sm"
        placement="center"
        className="bg-[#1a3d57]/90 md:h-1/2 h-52 md:mx-0 mx-10 md:px-0 px-5"
      >
        <ModalContent className="justify-center place-items-center align-middle">
          {(onClose) => <OrderFormSubmitted onClose={resetOrderForm} />}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderSummary;
