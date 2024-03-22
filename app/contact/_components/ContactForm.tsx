'use client';

import {
  Button,
  Card,
  Input,
  Modal,
  ModalContent,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmittedFormMessage from './SubmittedFormMessage';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactUsSchema } from '@/app/_utility/validationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type ContactUsSchema = z.infer<typeof contactUsSchema>;

const ContactForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsSchema>({ resolver: zodResolver(contactUsSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/contact', data);
      onOpen();
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  });

  const resetForm = () => {
    reset();
    onClose();
    setIsSubmitting(false);
  };

  return (
    <>
      <Card
        fullWidth
        className="px-10 bg-white/60 hover:bg-white/80 border-2 border-solid "
        shadow="lg"
        radius="lg"
      >
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 justify-center align-middle object-contain md:py-10 py-5 md:mb-2 mb-10"
        >
          <div className="flex">
            <Input
              isDisabled={isSubmitting}
              variant="flat"
              size={'lg'}
              fullWidth
              radius="sm"
              label="Name"
              isInvalid={errors.name !== undefined}
              errorMessage={errors.name?.message}
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
              {...register('name')}
            />
          </div>
          <div className="flex">
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
          </div>
          <div className="flex font-medium">
            <Textarea
              isDisabled={isSubmitting}
              variant="flat"
              size={'lg'}
              fullWidth
              radius="sm"
              isInvalid={errors.message !== undefined}
              errorMessage={errors.message?.message}
              labelPlacement={'outside'}
              placeholder={'Enter your message.....'}
              label="Message"
              classNames={{
                base: 'max-w-full h-full',
                label: 'text-[#1a3d57] text-lg font-normal',
                input: [
                  'resize-y min-h-52',
                  'text-lg font-medium',
                  'bg-transparent',
                  'text-[#1a3d57]',
                  'placeholder:text-[#1a3d57]/40',
                ],
                innerWrapper: 'bg-transparent',
                inputWrapper: [
                  'shadow-xl',
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
              {...register('message')}
            />
          </div>
          <div className="flex justify-end align-middle">
            <Button
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
              {isSubmitting ? 'Sending....' : 'Send Message'}
            </Button>
          </div>
        </form>
      </Card>
      <Modal
        backdrop={'blur'}
        isOpen={isOpen}
        onClose={resetForm}
        size="5xl"
        isDismissable
        shadow="sm"
        placement="center"
        className="bg-[#1a3d57]/90 md:h-1/2 h-52 md:mx-0 mx-10 md:px-0 px-5"
      >
        <ModalContent className="justify-center place-items-center align-middle">
          {(onClose) => <SubmittedFormMessage />}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactForm;
