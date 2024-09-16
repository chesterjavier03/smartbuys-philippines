'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Session } from 'next-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { SettingsSchema } from '@/types/settings-schema';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { FormError } from '@/components/auth/form-error';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { settings } from '@/server/actions/settings';
import FormSuccess from '@/components/auth/form-success';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LoaderCircle } from 'lucide-react';

const SettingsCard = ({ session }: { session: Session }) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [toBase64, setToBase64] = useState<string | undefined>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: session.user.name || undefined,
      email: session.user.email || undefined,
      image: session.user.image || undefined,
      isTwoFactorEnabled: session.user.isTwoFactorEnabled || undefined,
    },
  });

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

  const handleChange = async () => {
    let uploadedImage: File = hiddenFileInput.current?.files![0] as File;
    const base64 = await convertToBase64(uploadedImage as File);
    let result: string = base64 as string;
    form.setValue('image', result);
    setToBase64(result);
  };

  const { execute, status } = useAction(settings, {
    onSuccess: (result) => {
      if (result.data?.error) {
        setError(result.data.error);
      }
      if (result.data?.success) {
        setSuccess(result.data.success);
      }
    },
    onError: (_) => {
      setError('Something went wrong');
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    execute(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Settings</CardTitle>
        <CardDescription>Update your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      disabled={status === 'executing'}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <div className="flex items-center gap-4 cursor-pointer">
                    <Avatar onClick={() => hiddenFileInput.current?.click()}>
                      {!form.getValues('image') && (
                        <AvatarFallback className="bg-SBP_BLUE text-white">
                          <div className="font-bold">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </div>
                        </AvatarFallback>
                      )}
                      {form.getValues('image') && (
                        <Image
                          src={toBase64 ? toBase64 : form.getValues('image')!}
                          alt={session.user.name as string}
                          width={42}
                          height={42}
                          className="rounded-full"
                        />
                      )}
                    </Avatar>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      disabled={status === 'executing' || session.user.isOAuth}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      disabled={status === 'executing' || session.user.isOAuth}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <FormDescription>
                    Enable two factor authentication for your account
                  </FormDescription>
                  <FormControl>
                    <Switch
                      disabled={
                        status === 'executing' || session.user.isOAuth === true
                      }
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError error={error as string} />
            <FormSuccess message={success as string} />
            <Button
              type="submit"
              disabled={status === 'executing' || avatarUploading}
            >
              {status === 'executing' ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                'Update your settings'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
