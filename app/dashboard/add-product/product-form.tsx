'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ProductSchema, zProductSchema } from '@/types/product-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhilippinePeso } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createProduct } from '@/server/actions/create-product';
import { getProduct } from '@/server/actions/get-products';
import Image from 'next/image';
import TipTap from '@/components/util/tiptap';

const ProductForm = () => {
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [toBase64, setToBase64] = useState<string | undefined>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const form = useForm<zProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      image: '',
    },
    mode: 'onChange',
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const editMode = searchParams.get('id');

  const checkProduct = async (id: string) => {
    if (editMode) {
      const data = await getProduct(id);
      if (data.error) {
        toast.error(data.error);
        router.push('/dashboard/products');
        return;
      }
      if (data.success) {
        const id = editMode;
        form.setValue('name', data.success.name);
        form.setValue('description', data.success.description);
        form.setValue('price', data.success.price);
        form.setValue('image', data.success.image);
        form.setValue('id', id);
      }
    }
  };

  useEffect(() => {
    if (editMode) {
      checkProduct(editMode);
    }
  }, []);

  const convertToBase64 = async (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const fileReader = new FileReader();
      if (file) {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  const handleChange = async () => {
    let uploadedImage: File = hiddenFileInput.current?.files![0] as File;
    const base64 = await convertToBase64(uploadedImage as File);
    let result: string = base64 as string;
    form.setValue('image', result);
    setToBase64(result);
  };

  const { execute, status } = useAction(createProduct, {
    onSuccess: (result) => {
      if (result.data?.error) {
        toast.error(result.data.error);
      }
      if (result.data?.success) {
        router.push('/dashboard/products');
        toast.success(result.data.success);
      }
    },
    onExecute: (result) => {
      if (editMode) {
        toast.loading('Editing Product');
      }
      if (!editMode) {
        toast.loading('Creating Product');
      }
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  async function onSubmit(values: zProductSchema) {
    execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? 'Edit Product' : 'Create Product'}</CardTitle>
        <CardDescription>
          {editMode
            ? 'Make changes to existing product'
            : 'Add a brand new product'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <TipTap
                      val={field.value}
                      placeholder={'Add a longer description for your products'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <div
                    className="flex items-center w-52 justify-start object-cover rounded-lg"
                    onClick={() => hiddenFileInput.current?.click()}
                  >
                    <div className="w-52 justify-start object-cover gap-4 cursor-pointer border-[1px] rounded-lg border-SBP_RED p-1 hover:bg-secondary">
                      {!form.getValues('image') && (
                        <Image
                          src={'/images/smartbuys_logo.png'}
                          alt={'SmartBuys Philippines'}
                          width={500}
                          height={500}
                          loading="eager"
                          fetchPriority="high"
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                          className="rounded-md object-cover hover:blur-sm"
                        />
                      )}
                      {form.getValues('image') && (
                        <Image
                          src={toBase64 ? toBase64 : form.getValues('image')!}
                          alt={form.getValues('image')!}
                          width={500}
                          height={500}
                          loading="eager"
                          fetchPriority="high"
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                          className="rounded-md object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <FormControl>
                    <Input
                      hidden={true}
                      aria-disabled={status === 'executing'}
                      accept="image/*"
                      className="hidden"
                      placeholder="Your Image"
                      type="file"
                      disabled={status === 'executing'}
                      {...form.register('image', {
                        onChange: handleChange,
                      })}
                      ref={hiddenFileInput}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <PhilippinePeso
                        size={36}
                        className="p-2 bg-muted  rounded-md"
                      />
                      <Input
                        {...field}
                        type="number"
                        placeholder="Your price in USD"
                        step="0.1"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={
                status === 'executing' ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
              type="submit"
            >
              {editMode ? 'Save Changes' : 'Create Product'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
