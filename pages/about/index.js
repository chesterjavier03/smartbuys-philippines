import { Grid, Spacer } from '@nextui-org/react';
import AppCostCalculator from 'components/about/app_cost_calculator';
import Intro from 'components/about/intro';
import OurPurpose from 'components/about/our_purpose';
import Reviews from 'components/about/reviews';
import WeAre from 'components/about/we_are';
import WeDo from 'components/about/we_do';
import { useSelector } from 'react-redux';

const About = () => {
  const darkMode = useSelector((state) => state.user.darkMode);
  return (
    <Grid.Container
      alignContent="center"
      alignItems="center"
      align="center"
      justify="center"
    >
      <Intro darkMode={darkMode} />
      <WeAre darkMode={darkMode} />
      <OurPurpose darkMode={darkMode} />
      <WeDo darkMode={darkMode} />
      <Reviews darkMode={darkMode} />
      <AppCostCalculator darkMode={darkMode} />
      <Spacer y={8} />
    </Grid.Container>
  );
};

export default About;
