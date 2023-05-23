import { Spacer, Grid, Text, Divider } from '@nextui-org/react';

const OurPurpose = () => {
  return (
    <>
      <Spacer y={5} />
      <Grid
        xs={12}
        justify="center"
        alignContent="flex-start"
        alignItems="flex-start"
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
          Our Mission
        </Text>
      </Grid>
      <Spacer y={2} />
      <Grid xs={10} sm={5} lg={5} md={5} xl={5}>
        <Divider color="error" align="center" css={{ height: '2px' }} />
      </Grid>
      <Spacer y={5} />
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
          {`"At SmartBuys Philippines, our mission is to revolutionize the online shopping experience by providing our customers 
          with a seamless platform to discover, explore, and purchase a wide range of high-quality products at the best prices. 
          We strive to be the go-to destination for smart shoppers in the Philippines, offering an extensive selection of consumer electronics, 
          fashion, home essentials, and more. With our commitment to exceptional customer service, secure transactions, and timely delivery, 
          we aim to exceed expectations and delight our customers at every step of their shopping journey."`}
        </Text>
      </Grid>
      <Spacer y={5} />
      <Grid
        xs={12}
        justify="center"
        alignContent="flex-start"
        alignItems="flex-start"
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
          Our Vision
        </Text>
      </Grid>
      <Spacer y={2} />
      <Grid xs={10} sm={5} lg={5} md={5} xl={5}>
        <Divider color="error" align="center" css={{ height: '2px' }} />
      </Grid>
      <Spacer y={5} />
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
          {`"Our vision at SmartBuys Philippines is to empower Filipinos with convenient access to a world of affordable and reliable products, 
          enabling them to make informed purchasing decisions and elevate their lifestyles. We envision a future where every customer can find the perfect item, 
          whether it's the latest gadget, stylish fashion piece, or essential home product, all in one place. Through continuous innovation, strategic partnerships, 
          and a customer-centric approach, we aspire to be the trusted online shopping destination that brings joy and satisfaction to every Filipino shopper. 
          Together, we are shaping the future of online retail in the Philippines."`}
        </Text>
      </Grid>
      <Spacer y={5} />
    </>
  );
};

export default OurPurpose;
