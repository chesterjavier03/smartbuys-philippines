'use client';

import { convertMoney } from '@/app/_utility/MoneyFormatter';
import { editProductSchema } from '@/app/_utility/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { Product } from '@prisma/client';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ProductSchema = z.infer<typeof editProductSchema>;

const categoryList = [
  { label: 'Girls' },
  { label: 'Boys' },
  { label: 'Food' },
  { label: 'Home' },
];
const typeList = [
  { label: 'Shirt' },
  { label: 'Dress' },
  { label: 'Sando' },
  { label: 'Terno' },
  { label: 'Jogger' },
  { label: 'Shorts' },
];

const ProductForm = ({ product }: { product?: Product }) => {
  const path = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(editProductSchema),
    mode: 'onBlur',
  });
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [toBase64, setToBase64] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setCategory(product.category);
      setType(product.type);
      setValue('name', product.name);
      setValue('image', product.image);
      setValue('description', product.description);
      setValue('category', category);
      setValue('type', type);
      setValue('price', product.price.toString());
      setToBase64(product.image);
    }
  }, []);

  const convertToBase64 = async (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      setIsSubmitting(true);
      let file: File = getValues('image') as File;
      const formData = new FormData();
      formData.set('file', file);
      formData.set('type', type ?? data.type);
      formData.set('description', data.description);
      formData.set('category', category ?? data.category);
      formData.set('name', data.name);
      formData.set('price', data.price);

      const {
        data: { message },
        status,
      } = !product
        ? await axios.post('/api/products/create', formData)
        : await axios.patch('/api/products/edit/' + product.id, formData);
      setIsSubmitting(false);
      if (status === 200) {
        setMessage(message);
        onOpen();
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  });

  const resetForm = () => {
    reset();
    onClose();
    if (!product) {
      setCategory('');
      setType('');
      setToBase64('');
    }
    setIsSubmitting(false);
  };

  const handleChange = async () => {
    let uploadedImage: File = hiddenFileInput.current?.files![0] as File;
    setValue('image', uploadedImage);
    const base64 = await convertToBase64(uploadedImage as File);
    let result: string = base64 as string;
    setToBase64(result);
  };

  const typeValidation = (category: string, label: string) => {
    switch (category) {
      case 'Food':
        setType(category);
        break;
      case 'Home':
        setType(category);
        break;
      default:
        setType(label);
        break;
    }
  };

  return (
    <>
      <Card
        className="flex m-auto container mt-5 w-8/12 justify-start align-middle bg-white/60 border-2 border-solid"
        radius="sm"
        shadow="lg"
      >
        <div
          className="flex ml-6 tracking-widest container mt-5 w-8/12 flex-row justify-start align-middle text-2xl font-semibold
      text-[#1a3d57]"
        >
          {path === '/settings/products/new'
            ? 'Create Product'
            : 'Edit Product'}
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 justify-center align-middle object-contain md:py-2 py-5 md:mb-2 mb-10"
        >
          <div className="flex m-1 w-full flex-row">
            <div className="flex justify-start align-middle ml-5">
              <Card
                className="flex justify-start align-middle my-5 w-[20vw] h-[60vh] border-1 bg-white/60 border-[#ff0000] aspect-auto border-solid"
                radius="sm"
                disableRipple
                shadow="lg"
                isPressable
                isDisabled={isSubmitting}
                onPress={() => hiddenFileInput.current?.click()}
              >
                <Image
                  alt={'Image'}
                  fill={true}
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: !product ? 'contain' : 'cover',
                  }}
                  quality={100}
                  className="w-[100vw] h-[100vh] object-cover z-0"
                  src={toBase64 ? toBase64 : '/images/smartbuys_logo.png'}
                />
                <input
                  disabled={isSubmitting}
                  hidden
                  accept="image/*"
                  className="hidden"
                  type="file"
                  {...register('image', {
                    onChange: handleChange,
                  })}
                  ref={hiddenFileInput}
                />
              </Card>
            </div>
            <div className="grid grid-cols-1 content-start m-5 align-top h-full w-full">
              <Card
                className="align-top justify-center place-content-start p-5 gap-y-[25.5px] border-1 border-solid border-[#1a3d57]"
                radius="sm"
                fullWidth
              >
                <div className="flex">
                  <Input
                    isDisabled={isSubmitting}
                    label={product ? '' : 'Product Name'}
                    defaultValue={product ? product.name : ''}
                    variant="flat"
                    type="text"
                    size={'lg'}
                    fullWidth
                    radius="sm"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    labelPlacement={'inside'}
                    classNames={{
                      label: 'text-[#1a3d57] text-lg font-medium',
                      input: [
                        'bg-transparent',
                        'text-lg font-medium',
                        'text-[#1a3d57]',
                        'placeholder:text-[#1a3d57]',
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
                        'border-default-600 border-solid border-1',
                      ],
                    }}
                    {...register('name')}
                  />
                </div>
                <div className="flex">
                  <Input
                    isDisabled={isSubmitting}
                    variant="flat"
                    label={product ? '' : 'Product Description'}
                    defaultValue={product ? product.description : ''}
                    type="text"
                    size={'lg'}
                    fullWidth
                    radius="sm"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                    labelPlacement={'inside'}
                    classNames={{
                      label: 'text-[#1a3d57] text-lg font-medium',
                      input: [
                        'bg-transparent',
                        'text-lg font-medium',
                        'text-[#1a3d57]',
                        'placeholder:text-[#1a3d57]',
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
                        'border-default-600 border-solid border-1',
                      ],
                    }}
                    {...register('description')}
                  />
                </div>
                <div className="flex">
                  <Input
                    isDisabled={isSubmitting}
                    label={product ? '' : 'Product Price'}
                    defaultValue={product ? convertMoney(product.price) : ''}
                    variant="flat"
                    type="text"
                    pattern="\d*"
                    maxLength={4}
                    size={'lg'}
                    fullWidth
                    radius="sm"
                    isInvalid={errors.price !== undefined}
                    errorMessage={errors.price?.message}
                    labelPlacement={'inside'}
                    classNames={{
                      label: 'text-[#1a3d57] text-lg font-medium',
                      input: [
                        'bg-transparent',
                        'text-lg font-medium',
                        'text-[#1a3d57]',
                        'placeholder:text-[#1a3d57]',
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
                        'border-default-600 border-solid border-1',
                      ],
                    }}
                    {...register('price')}
                  />
                </div>
                <div className="flex justify-start align-middle gap-x-5">
                  <div className="text-xl self-center font-medium tracking-widest">
                    Category:
                  </div>
                  <div className="flex flex-row gap-5">
                    {categoryList.map((data, index) => (
                      <Checkbox
                        isDisabled={isSubmitting}
                        key={index}
                        className="inline-flex my-0.5"
                        size="md"
                        radius="sm"
                        color="success"
                        defaultValue={
                          product ? product.category : category ?? ''
                        }
                        isSelected={categoryList[index].label == category}
                        {...register('category', {
                          onChange: () => setCategory(data.label),
                        })}
                      >
                        <span className="text-[#1a3d57] text-medium font-bold">
                          {data.label}
                        </span>
                      </Checkbox>
                    ))}
                  </div>
                </div>
                <div className="flex justify-start align-middle gap-x-5">
                  <div className="text-xl self-center font-medium tracking-widest">
                    Type:
                  </div>
                  <div className="flex flex-row gap-5">
                    {typeList.map((data, index) => (
                      <Checkbox
                        isDisabled={
                          isSubmitting ||
                          category === 'Food' ||
                          category === 'Home'
                        }
                        key={index}
                        className="inline-flex my-0.5"
                        size="md"
                        radius="sm"
                        color="success"
                        defaultValue={product ? product.type : type ?? ''}
                        isSelected={typeList[index].label == type}
                        {...register('type', {
                          onChange: () =>
                            category === 'Food'
                              ? setType('Food')
                              : category === 'Home'
                              ? setType('Home')
                              : setType(data.label),
                        })}
                      >
                        <span className="text-[#1a3d57] text-medium font-bold">
                          {data.label}
                        </span>
                      </Checkbox>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end align-middle mt-10">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    variant="solid"
                    color="primary"
                    disableRipple
                    size="md"
                    className="justify-end align-middle text-lg"
                    radius="sm"
                  >
                    {isSubmitting
                      ? product
                        ? 'Updating....'
                        : 'Creating....'
                      : product
                      ? 'Edit Product'
                      : 'Create new Product'}
                  </Button>
                </div>
              </Card>
            </div>
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
          {(onClose) => (
            <div className="flex flex-col place-items-center gap-10 md:mt-10 md:mb-20">
              <div className="md:text-6xl text-xl text-orange-500 tracking-widest">
                {message}
              </div>
              <div className="md:text-2xl text-md text-white tracking-widest text-center">
                Create more products or return to dashboard.
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductForm;
