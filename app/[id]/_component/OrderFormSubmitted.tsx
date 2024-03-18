import { Button } from '@nextui-org/react';
import React from 'react';

const OrderFormSubmitted = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col place-items-center gap-10 md:mt-10 md:mb-20">
      <div className="md:text-5xl text-xl text-orange-500 tracking-widest">
        Thank you for your purchase!
      </div>
      <div className="md:text-2xl text-md text-white tracking-widest text-center">
        Your order is being processed.
      </div>
      <div className="md:text-xl px-10 text-md text-white tracking-widest text-center">
        We sent an email for your reference. We will get back to you once your
        order is prepared and ready to ship.
      </div>
      <Button
        size="lg"
        radius="sm"
        color="primary"
        className="text-white text-xl w-auto"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
};

export default OrderFormSubmitted;
