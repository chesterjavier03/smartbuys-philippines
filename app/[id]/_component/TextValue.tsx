import classNames from 'classnames';
import React from 'react';
import { string } from 'yup';

const TextValue = ({ value }: { value: string }) => {
  return (
    <div
      className={classNames({
        'justify-center align-middle text-2xl font-semibold text-[#1a3d57]':
          true,
        'text-[#1a3d57]': value === 'string',
        'text-amber-500': value && value.charAt(0) === '₱',
      })}
    >
      {value}
    </div>
  );
};

export default TextValue;
