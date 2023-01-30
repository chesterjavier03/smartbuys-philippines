import { Spacer, Grid, Text, Image } from '@nextui-org/react';

const Intro = ({ darkMode }) => {
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
          color={darkMode ? 'white' : '$gray700'}
        >
          {`"SmartBuys Philippines is committed to provide Filipino Entrepreneurs like you with the best prices in wholesale clothing,
          home decor, and frozen food items for your own boutique or store. Every day is a bazaar, all year long!"`}
        </Text>
      </Grid>
      <Spacer y={5} />
    </>
  );
};

export default Intro;
