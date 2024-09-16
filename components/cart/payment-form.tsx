'use client';

import { useCartStore } from '@/lib/client-store';
import { createOrder } from '@/server/actions/create-order';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { createId } from '@paralleldrive/cuid2';

const PaymentForm = ({ totalPrice }: { totalPrice: number }) => {
  const { cart, setCheckoutProgress, clearCart, setCartOpen } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const { execute } = useAction(createOrder, {
    onSuccess: (result) => {
      if (result.data?.error) {
        toast.error(result.data.error);
      }
      if (result.data?.success) {
        setIsLoading(false);
        toast.success(result.data.success);
        setCheckoutProgress('confirmation-page');
        clearCart();
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    execute({
      paymentIntentId: createId(),
      status: 'pending',
      total: totalPrice,
      products: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });
    /**
     * TODO: setup payment method stripe of paymongo
     * if(!stripe || !elements) {
     * setIsLoading(false);
     * return;
     * }
     *
     * const { error: submitError } = await elements.submit()
     *
     * if (submitError) {
     *   setErrorMessage(submitError.message!)
     *   setIsLoading(false)
     *   return
     * }
     *
     * const { data } = await createPaymentIntent({
     *   amount: totalPrice * 100,
     *   currency: "usd",
     *   cart: cart.map((item) => ({
     *     quantity: item.variant.quantity,
     *     productID: item.id,
     *     title: item.name,
     *     price: item.price,
     *     image: item.image,
     *   })),
     * });
     *
     * if (data?.error) {
     *   setErrorMessage(data.error)
     *   setIsLoading(false)
     *   router.push("/auth/login")
     *   setCartOpen(false)
     *   return
     * }
     *
     * if (data?.success) {
     *   const { error } = await stripe.confirmPayment({
     *     elements,
     *     clientSecret: data.success.clientSecretID!,
     *     redirect: "if_required",
     *     confirmParams: {
     *       return_url: "http://localhost:3000/success",
     *       receipt_email: data.success.user as string,
     *     },
     *   })
     *
     *   if (error) {
     *     setErrorMessage(error.message!)
     *     setIsLoading(false)
     *     return
     *   } else {
     *     setIsLoading(false)
     *     execute({
     *       status: "pending",
     *       paymentIntentID: data.success.paymentIntentID,
     *       total: totalPrice,
     *       products: cart.map((item) => ({
     *         productID: item.id,
     *         variantID: item.variant.variantID,
     *         quantity: item.variant.quantity,
     *       })),
     *     })
     *   }
     * }
     *
     */
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <PaymentElement /> */}
      {/* <AddressElement options={{ mode: 'shipping' }} /> */}
      <Button
        className="my-4  w-full"
        // disabled={!stripe || !elements || isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Pay now'}
      </Button>
    </form>
  );
};

export default PaymentForm;
