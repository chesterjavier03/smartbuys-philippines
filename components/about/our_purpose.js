import { Spacer, Grid, Text, Divider } from '@nextui-org/react';

const OurPurpose = ({ darkMode }) => {
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
          color={darkMode ? 'primary' : '$gray800'}
        >
          Our Purpose
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
          color={darkMode ? 'white' : '$gray700'}
        >
          {`"To Glorify God by being a faithful steward of all that is entrusted to us and to have a positive influence on all who came into contact
          with SmartBuys Philippines."`}
        </Text>
      </Grid>
      <Spacer y={5} />
    </>
  );
};

export default OurPurpose;
