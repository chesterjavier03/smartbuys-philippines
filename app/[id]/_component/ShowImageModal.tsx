import { Image, Modal, ModalContent } from '@nextui-org/react';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
}

const ShowImageModal = ({
  isOpen,
  onClose,
  productName,
  productImage,
}: Props) => {
  return (
    <Modal
      backdrop={'blur'}
      isOpen={isOpen}
      onClose={onClose}
      isDismissable
      shadow="sm"
      placement="top-center"
      className="md:h-auto h-3/4 md:mx-0 mx-10 object-contain"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <Image
              removeWrapper
              fallbackSrc={'/images/smartbuys_logo.png'}
              loading="eager"
              shadow="sm"
              radius="sm"
              alt={productName}
              className="w-[100vw] h-[80vh] object-cover z-0"
              src={productImage}
            />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShowImageModal;