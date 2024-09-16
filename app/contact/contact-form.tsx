'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { contactUs } from '@/server/actions/contact-us';
import { ContactSchema } from '@/types/contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import { toast } from 'sonner';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';

const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      message: '',
    },
  });
  const { execute, status } = useAction(contactUs, {
    onSuccess: (result) => {
      if (result.data?.error) {
        toast.error(result.data.error);
      }
      if (result.data?.success) {
        toast.success(result.data.success);
        form.reset();
      }
    },
  });

  async function onSubmit(values: z.infer<typeof ContactSchema>) {
    execute(values);
  }
  return (
    <Card className="w-screen shadow-lg mt-5">
      <CardHeader>
        <CardTitle className="text-3xl text-SBP_BLUE">
          Say hello to us!
        </CardTitle>
        <CardDescription className='text-SBP_BLUE"'>
          Let&apos;s talk business or just have a coffee. <br />
          We would love to hear from you!
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
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email Address"
                      type="email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <PhoneInput
                      limitMaxLength={true}
                      displayInitialValueAsLocalNumber={true}
                      international={true}
                      countrySelectProps={{ unicodeFlags: true }}
                      country="PH"
                      countries={['PH']}
                      addInternationalOption={false}
                      defaultCountry="PH"
                      numberInputProps={{
                        className:
                          'rounded-md focus:outline-none border-[1px] focus:outline-0 p-1 shadow-sm rounded-md',
                      }}
                      placeholder="Enter phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={status === 'executing'}
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your Message"
                      className="resize-none h-28 max-h-52"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your message will be sent directly to our team.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={status === 'executing'}
              type="submit"
            >
              {status === 'executing' ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                'Send'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
