import { Grid, Image, Spacer, Text, Divider } from '@nextui-org/react';
import { weAreProductList } from 'database/data';

const WeAre = () => {
  return (
    <>
      <Spacer y={5} />
      <Grid
        xs={12}
        justify="center"
        alignContent="center"
        alignItems="center"
        align="center"
      >
        <Text
          css={{
            fontFamily: 'Ubuntu',
            fontWeight: '$normal',
            fontSize: '$6xl',
            letterSpacing: '$widest',
            textAlign: 'center',
            lineHeight: '$sm',
          }}
          color={'$gray800'}
        >
          We Are
        </Text>
      </Grid>
      <Spacer y={2} />
      <Grid xs={10} sm={5} lg={5} md={5} xl={5}>
        <Divider color="error" css={{ height: '2px' }} />
      </Grid>
      <Spacer y={5} />
      <Grid.Container justify="space-between" gap={2}>
        {weAreProductList.map((productData) => (
          <Grid
            key={productData.name}
            xs={4}
            sm={2}
            lg={2}
            md={2}
            xl={2}
            align="center"
          >
            <Image
              priority="true"
              src={productData.image}
              width={productData.width}
              height={productData.height}
              objectFit="contain"
              alt={productData.description}
            />
          </Grid>
        ))}
      </Grid.Container>
      <Spacer y={5} />
    </>
  );
};

export default WeAre;
