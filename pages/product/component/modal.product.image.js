import { Card, Image, Modal } from '@nextui-org/react';

const ModalProductImage = ({ visible, closeHandler, handler, product }) => {
  return (
    <Modal
      noPadding
      blur
      animated
      autoMargin
      objectFit="cover"
      open={visible}
      onClose={closeHandler}
      css={{ w: 'fit-content', h: 'fit-content' }}
    >
      <Modal.Body>
        <Card
          objectFit="cover"
          css={{
            borderColor: 'red',
          }}
          variant="bordered"
          onPress={handler}
        >
          <Image
            // src={`data:image/webp;base64, ` + product.image}
            src={product.image}
            // src={
            //   `data:image/webp;base64, ` +
            //   Buffer.from(product.image.Data, 'base64').toString('base64')
            // }
            autoResize
            objectFit="cover"
            alt={product.name}
          />
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProductImage;
