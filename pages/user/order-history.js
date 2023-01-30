import { Card, Grid, Text } from '@nextui-org/react';
import LeftPanelMenu from './component/left.panel.menu';

const OrderHistory = () => {
  return (
    <Grid.Container gap={1}>
      <Grid lg={3} md={3} xl={3} sm={3} xs={12}>
        <LeftPanelMenu />
      </Grid>
      <Grid xl={9} lg={9} md={9} xs={12} sm={9}>
        <Card
          css={{
            backgroundColor: '$backgroundAlpha',
            border: '1px solid red',
            marginBottom: '1.2rem',
            '@xs': {
              marginTop: '1.2rem',
              marginRight: '.5rem',
              marginBottom: '1.2rem',
            },
          }}
          isHoverable
          variant="bordered"
          borderWeight="normal"
        >
          <Text h1 color="$blue600">
            Order History
          </Text>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default OrderHistory;
