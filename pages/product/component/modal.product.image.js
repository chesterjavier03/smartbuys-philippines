import { Card, Modal } from '@nextui-org/react';

const ModalProductImage = ({ visible, closeHandler, handler, product }) => {
  return (
    <Modal
      noPadding
      blur
      animated
      autoMargin
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Body>
        <Card
          css={{
            borderColor: 'red',
            borderWidth: 'medium',
          }}
          variant="bordered"
          onPress={handler}
        >
          <Card.Body css={{ p: 0 }} autoMargin>
            <Card.Image
              src={`data:image/webp;base64, ` + product.image}
              autoResize
              objectFit="cover"
              alt={product.name}
            />
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProductImage;
