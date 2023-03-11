import {
  Grid,
  Text,
  Spacer,
  Divider,
  Button,
  Link,
  Card,
} from '@nextui-org/react';
import { appCostCalculator } from 'database/data';

const AppCostCalculator = () => {
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
          App Cost Calculator
        </Text>
      </Grid>
      <Spacer y={2} />
      <Grid xs={10} sm={5} lg={5} md={5} xl={5}>
        <Divider color="error" align="center" css={{ height: '2px' }} />
      </Grid>
      <Spacer y={3} />
      <Grid lg={12} xl={12} sm={12} md={12} xs={12} justify="center">
        <Text
          h4
          css={{
            fontFamily: 'Ubuntu',
            letterSpacing: '$widest',
            textAlign: 'center',
            lineHeight: '$sm',
          }}
          color={'$gray700'}
        >
          {
            'Thinking of building a website or an app for your brand of business?'
          }
        </Text>
      </Grid>
      <Spacer y={1} />
      <Grid lg={12} xl={12} sm={12} md={12} xs={12} justify="center">
        <Text
          h4
          css={{
            fontFamily: 'Ubuntu',
            letterSpacing: '$widest',
            textAlign: 'center',
            lineHeight: '$sm',
          }}
          color={'$gray700'}
        >
          {
            'Use our app cost calculator to find out how much it will cost to build an app and how long it will take to launch it.'
          }
        </Text>
      </Grid>
      <Spacer y={1} />
      <Grid lg={12} xl={12} sm={12} md={12} xs={12} justify="center">
        <Text
          h4
          css={{
            fontFamily: 'Ubuntu',
            letterSpacing: '$widest',
            textAlign: 'center',
            lineHeight: '$sm',
          }}
          color={'$gray700'}
        >
          {
            'It is important to keep in mind that the technology you use to communicate with your customers will have a direct impact on their experience with your brand.'
          }
        </Text>
      </Grid>
      <Spacer y={3} />
      <Grid.Container gap={1} justify="space-between">
        {appCostCalculator.map((app) => (
          <Grid key={app} xs={12} sm={4} lg={4} md={4} xl={4} justify="center">
            <Card
              isHoverable
              css={{ backgroundColor: 'transparent', cursor: 'pointer' }}
              variant="shadow"
            >
              {app.image}
            </Card>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer y={6.5} />
      <Grid xs={12} sm={12} lg={12} md={12} xl={12} justify="center">
        <Link href="https://horustech.ml/ " target="_blank">
          <Button size="xl" css={{ backgroundColor: '#3694FF' }}>
            <Text
              h4
              css={{
                fontFamily: 'Ubuntu',
                color: '$white',
                letterSpacing: '$widest',
                margin: '0 auto',
              }}
            >
              Estimate My App
            </Text>
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default AppCostCalculator;
