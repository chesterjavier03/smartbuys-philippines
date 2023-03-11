import { Box } from '@mui/material';
import { Card, Col, Grid, Image, Row, Spacer, Text } from '@nextui-org/react';
import { moneyFormat } from 'utils/functions';

const OrderList = ({ cartItems, router }) => {
  return (
    <Col align="start" justify="center">
      {cartItems.map((item) => (
        <>
          <Card
            css={{
              backgroundColor: '$backgroundAlpha',
              border: '1px solid red',
              marginBottom: '.2rem',
            }}
            isHoverable
            variant="shadow"
            borderWeight="bold"
          >
            <Box
              css={{
                width: 'fit-content',
                '@xs': {
                  width: 'fit-content',
                },
              }}
            >
              <Row justify="flex-start" align="center" gap={1}>
                <Grid
                  css={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    '@xs': {},
                  }}
                >
                  <Card
                    css={{
                      borderColor: 'red',
                      borderWidth: 'thin',
                      borderRadius: '$xs',
                    }}
                    isPressable
                    variant="bordered"
                  >
                    <Image
                      priority
                      src={`data:image/webp;base64, ` + item.product.image}
                      autoResize
                      width={120}
                      height={180}
                      objectFit="cover"
                      alt={item.product.name}
                      onClick={() =>
                        router.push(`/product/${item.product._id}`, undefined, {
                          shallow: true,
                        })
                      }
                    />
                  </Card>
                </Grid>
                <Spacer x={0.5} />
                <Grid justify="center" align="flex-start">
                  <Text h3 color="gray">
                    {item.product.name}
                  </Text>
                  <Text
                    h4
                    color="$gray700"
                    css={{
                      width:
                        item.product.description.length < 40
                          ? '55vw'
                          : 'fit-content',
                      '@xs': {
                        width: '40vw',
                      },
                    }}
                  >
                    {item.product.description}
                  </Text>
                  {item.product.category !== 'Food' && (
                    <Text
                      h5
                      color={
                        item.selectedSize.name === 'large'
                          ? 'warning'
                          : item.selectedSize.name === 'medium'
                          ? 'error'
                          : 'success'
                      }
                    >
                      {item.selectedSize.display}
                    </Text>
                  )}
                  <Grid xs={0} lg={4} md={4} xl={4} sm={4}>
                    <Text h4 color="orange">
                      {moneyFormat(item.product.price)}
                    </Text>
                  </Grid>
                  <Grid lg={0} xs={10} md={0} xl={0} sm={0}>
                    <Row justify="space-between" align="flex-start">
                      <Text h4 color="orange">
                        {moneyFormat(item.product.price)}
                      </Text>
                      <Text h4 color="red">
                        {item.itemCount} pcs
                      </Text>
                      <Text h4 color="orange">
                        {moneyFormat(item.subTotal)}
                      </Text>
                    </Row>
                  </Grid>
                </Grid>
                <Grid xs={0} lg={4} md={4} xl={4} sm={4}>
                  <Row justify="space-evenly">
                    <Text h3 color="red">
                      {item.itemCount} pcs
                    </Text>
                    <Text h3 color="orange">
                      {moneyFormat(item.subTotal)}
                    </Text>
                  </Row>
                </Grid>
              </Row>
            </Box>
          </Card>
        </>
      ))}
      <Grid xs={1}>
        <Spacer y={1} />
      </Grid>
    </Col>
  );
};

export default OrderList;
