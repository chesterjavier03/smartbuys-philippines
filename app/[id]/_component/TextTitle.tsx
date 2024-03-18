import React from 'react';

const TextTitle = ({ title }: { title: string }) => {
  return (
    <div className="justify-center align-middle mt-1 font-medium text-default-500">
      {title}
    </div>
  );
};

export default TextTitle;
