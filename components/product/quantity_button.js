import { Button, Container, Grid, Row, Text } from '@nextui-org/react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const QuantityButton = ({ itemCount, incrementItem, decrementItem }) => {
  return (
    <Grid.Container
      wrap="wrap"
      justify="flex-end"
      align="center"
      alignContent="center"
      alignItems="center"
    >
      <Grid
        css={{
          cursor: 'pointer',
        }}
      >
        <Row>
          <Container
            align="center"
            justify="center"
            css={{
              backgroundColor: '$blue600',
              borderRadius: '$sm',
              paddingTop: '$2',
              paddingBottom: '$2',
              width: 'auto',
            }}
          >
            <Row align="center" justify="center" css={{}}>
              <Button
                key={'subtract'}
                size={''}
                css={{
                  color: 'transparent',
                  backgroundColor: 'transparent',
                  width: '100%',
                }}
                onPress={decrementItem}
                icon={
                  <RemoveIcon
                    style={{ fontSize: '2rem', color: 'rgb(255,255,0,0.9)' }}
                  />
                }
              ></Button>
              <Container
                color="blue"
                align="center"
                css={{
                  backgroundColor: '$white',
                  borderRadius: '$sm',
                  justify: 'center',
                  paddingTop: '$1',
                  paddingBottom: '$1',
                  paddingRight: '$10',
                  paddingLeft: '$10',
                  marginLeft: '$6',
                  marginRight: '$6',
                }}
              >
                <Text
                  color={'grey'}
                  weight="bold"
                  css={{ userSelect: 'none', fontSize: '$2xl' }}
                >
                  {itemCount}
                </Text>
              </Container>
              <Button
                key={'add'}
                size={''}
                css={{
                  color: 'transparent',
                  backgroundColor: 'transparent',
                  width: '100%',
                }}
                onPress={incrementItem}
              >
                <AddIcon
                  style={{ fontSize: '2rem', color: 'rgb(255,255,0,0.9)' }}
                />
              </Button>
            </Row>
          </Container>
        </Row>
      </Grid>
    </Grid.Container>
  );
};

export default QuantityButton;
