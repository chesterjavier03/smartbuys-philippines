import { Card, Image } from '@nextui-org/react';
import classNames from 'classnames';
import React from 'react';

interface Props {
  onOpen: () => void;
  productName: string;
  productImage: any;
}

const ItemImage = ({ onOpen, productName, productImage }: Props) => {
  return (
    <div className='grid grid-cols-1 md:justify-self-end justify-self-center w-auto'>
      <Card
        className='mx-5 mt-10 h-[calc(80vh)] border-2 aspect-auto border-solid border-[#ff0000]'
        radius='sm'
        disableRipple
        isHoverable
        isPressable
        onPress={() => onOpen()}
      >
        <Image
          isZoomed
          disableAnimation
          removeWrapper
          fallbackSrc={'/images/smartbuys_logo.png'}
          loading='eager'
          shadow='sm'
          radius='sm'
          alt={productName}
          className={classNames({
            'w-[100vw] h-full object-cover z-0': true,
            'pointer-events-none': process.env.NODE_ENV === 'production',
          })}
          src={productImage}
          srcSet={productImage}
        />
      </Card>
    </div>
  );
};

export default ItemImage;
