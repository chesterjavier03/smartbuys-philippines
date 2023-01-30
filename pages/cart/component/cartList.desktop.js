import { Box } from '@mui/material';
import {
  Button,
  Card,
  Grid,
  Spacer,
  Text,
  Image,
  Row,
} from '@nextui-org/react';
import { moneyFormat } from 'utils/functions';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CartListDesktop = ({
  item,
  _incrementItem,
  _decrementItem,
  _removeItem,
  router,
}) => {
  return (
    <Card
      css={{
        backgroundColor: '$backgroundAlpha',
        border: '1px solid red',
        height: 'fit-content',
      }}
      isHoverable
      variant="shadow"
      borderWeight="bold"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
      >
        <Row justify="flex-start" align="center" gap={1}>
          <Grid
            css={{
              paddingTop: 10,
              paddingBottom: 10,
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
          <Grid>
            <Text h3 color="gray">
              {item.product.name}
            </Text>
            <Text
              h4
              color="$gray700"
              css={{
                width: '14rem',
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
                css={{ width: '10rem' }}
              >
                {item.selectedSize.display}
              </Text>
            )}
            <Text h4 color="orange">
              {moneyFormat(item.product.price)}
            </Text>
          </Grid>
          <Spacer x={1} />
          <Grid>
            <Grid.Container align="center" justify="center">
              <Grid
                lg={6}
                md={6}
                sm={6}
                xl={6}
                xs={6}
                css={{ cursor: 'pointer' }}
              >
                <Row>
                  <Grid.Container
                    align="center"
                    justify="center"
                    css={{
                      backgroundColor: '$blue600',
                      borderRadius: '$xs',
                      paddingTop: '$2',
                      paddingBottom: '$2',
                      paddingLeft: '$5',
                      paddingRight: '$5',
                      width: '20vw',
                      height: '48px',
                      '@xs': {
                        width: '15vw',
                        height: '58px',
                      },
                    }}
                  >
                    <Row align="center" justify="center" size="lg">
                      <Button
                        key={'subtract'}
                        size={''}
                        css={{
                          color: 'transparent',
                          backgroundColor: 'transparent',
                          width: '100%',
                          '@xs': {
                            width: '100%',
                          },
                        }}
                        onPress={() => {
                          _decrementItem(item);
                        }}
                        icon={
                          <RemoveIcon
                            style={{
                              fontSize: '2rem',
                              color: 'rgb(255,255,0,0.9)',
                            }}
                          />
                        }
                      ></Button>
                      <Grid xs={1}>
                        <Spacer x={0.5} />
                      </Grid>
                      <Grid.Container
                        justify="center"
                        css={{
                          backgroundColor: '$white',
                          borderRadius: '4px',
                          paddingTop: '$2',
                          paddingLeft: '$5',
                          paddingRight: '$5',
                          height: '38px',
                          '@xs': {
                            height: '48px',
                          },
                        }}
                      >
                        <Text
                          color={'grey'}
                          weight="bold"
                          css={{
                            userSelect: 'none',
                            fontSize: '$md',
                            '@xs': {
                              userSelect: 'none',
                              fontSize: '$2xl',
                            },
                          }}
                        >
                          {item.itemCount}
                        </Text>
                      </Grid.Container>
                      <Grid xs={1}>
                        <Spacer x={0.5} />
                      </Grid>
                      <Button
                        key={'add'}
                        size={''}
                        css={{
                          color: 'transparent',
                          backgroundColor: 'transparent',
                          width: '100%',
                        }}
                        onPress={() => {
                          _incrementItem(item);
                        }}
                        icon={
                          <AddIcon
                            style={{
                              fontSize: '2rem',
                              color: 'rgb(255,255,0,0.9)',
                            }}
                          />
                        }
                      ></Button>
                    </Row>
                  </Grid.Container>
                </Row>
              </Grid>
            </Grid.Container>
          </Grid>
          <Spacer x={1} />
          <Grid gap={1}>
            <Text h3 color="Orange">
              ₱
              {item.subTotal
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
          </Grid>
          <Spacer x={2} />
          <Grid
            justify="center"
            alignContent="center"
            alignItems="center"
            css={{
              display: 'flex',
              width: '50%',
              height: '20vh',
            }}
          >
            <Button
              auto
              size=""
              css={{ backgroundColor: 'transparent' }}
              onPress={() => _removeItem(item)}
              icon={
                <DeleteIcon
                  style={{
                    cursor: 'pointer',
                    color: 'red',
                    fontSize: '2.5rem',
                    margin: '0 auto',
                  }}
                />
              }
            />
          </Grid>
        </Row>
      </Box>
    </Card>
  );
};

export default CartListDesktop;
