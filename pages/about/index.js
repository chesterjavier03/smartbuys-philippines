import { Grid, Spacer } from '@nextui-org/react';
import AppCostCalculator from 'components/about/app_cost_calculator';
import Intro from 'components/about/intro';
import OurPurpose from 'components/about/our_purpose';
import Reviews from 'components/about/reviews';
import WeAre from 'components/about/we_are';
import WeDo from 'components/about/we_do';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => document.body?.scrollTo(0, 0), []);
  return (
    <Grid.Container
      alignContent="center"
      alignItems="center"
      align="center"
      justify="center"
    >
      <Intro />
      <WeAre />
      <OurPurpose />
      <WeDo />
      <Reviews />
      <AppCostCalculator />
      <Spacer y={8} />
    </Grid.Container>
  );
};

export default About;
