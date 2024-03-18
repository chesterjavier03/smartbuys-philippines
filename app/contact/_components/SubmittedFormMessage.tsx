import React from 'react';

const SubmittedFormMessage = () => {
  return (
    <div className="flex flex-col place-items-center gap-10 md:mt-10 md:mb-20">
      <div className="md:text-6xl text-xl text-orange-500 tracking-widest">
        Thank you!
      </div>
      <div className="md:text-2xl text-md text-white tracking-widest text-center">
        Your message has been received. We will get back to you
      </div>
    </div>
  );
};

export default SubmittedFormMessage;
