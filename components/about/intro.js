import { Spacer, Grid, Text, Image } from '@nextui-org/react';

const Intro = () => {
  return (
    <>
      <Spacer y={2} />
      <Grid lg={12} xl={12} sm={12} md={12} xs={12} justify="center">
        <Image
          priority="true"
          src="/static/smartbuys_wings.webp"
          objectFit="cover"
          alt="SmartBuys Philippines"
        />
      </Grid>
      <Spacer y={3} />
      <Grid lg={12} xl={12} sm={12} md={12} xs={12} justify="center">
        <Text
          css={{
            fontFamily: 'Ubuntu',
            fontWeight: '$normal',
            fontSize: '$3xl',
            letterSpacing: '$widest',
            textAlign: 'center',
            lineHeight: '$sm',
          }}
          color={'$gray700'}
        >
          {`"Discover a world of smart shopping at SmartBuys Philippines. Experience the perfect blend of quality, affordability, and convenience as you explore our curated selection of premium products. Elevate your lifestyle with our wide range of offerings, ensuring a seamless online shopping experience for the discerning Filipino shopper."`}
        </Text>
      </Grid>
      <Spacer y={5} />
    </>
  );
};

export default Intro;
