import {
  Card,
  Col,
  Container,
  Divider,
  Grid,
  Spacer,
  Text,
} from '@nextui-org/react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import MailIcon from '@mui/icons-material/Mail';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { socialData } from 'database/data';

const Contact = () => {
  const darkMode = useSelector((state) => state.user.darkMode);
  return (
    <>
      <Spacer y={2} />
      <Grid.Container
        alignContent="center"
        alignItems="center"
        align="center"
        justify="center"
      >
        <Grid
          xs={12}
          lg={12}
          sm={12}
          md={12}
          xl={12}
          justify="center"
          alignContent="center"
          alignItems="center"
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
            Follow Us
          </Text>
        </Grid>
        <Spacer y={2} />
        <Grid xs={10} sm={5} lg={5} md={5} xl={5}>
          <Divider color="error" align="center" css={{ height: '2px' }} />
        </Grid>
        <Spacer y={5} />
        <Grid.Container
          justify="center"
          css={{ paddingTop: '1.5rem', margin: '0 auto' }}
        >
          {socialData.map((social) => (
            <Grid key={social.name} xs={12} lg={3} xl={3} justify="center">
              <Link href={social.link} target="_blank">
                <Image
                  src={social.image}
                  alt={social.name}
                  height={100}
                  width={100}
                />
              </Link>
            </Grid>
          ))}
        </Grid.Container>
        <Grid.Container
          justify="center"
          alignContent="center"
          alignItems="center"
          css={{ paddingTop: '5rem', margin: '0 auto' }}
        >
          <Grid xs={12} sm={12} lg={12} md={12} xl={12} justify="center">
            <Spacer y={1} />
            <Grid
              align="center"
              css={{ color: '$accents0', borderRadius: '$2xl' }}
              lg={12}
              xl={12}
              sm={12}
              md={12}
              xs={12}
              justify="center"
            >
              <Card
                css={{
                  w: '100%',
                  h: '550px',
                  borderColor: `red`,
                  borderWidth: 'lighter',
                }}
                justify="center"
                align="center"
                isPressable
                variant="bordered"
              >
                <Card.Body css={{ p: 0 }}>
                  <iframe
                    className="gmap_iframe"
                    width="100%"
                    height={631}
                    frameBorder="0"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=2000&amp;height=631&amp;hl=en&amp;q=smartbuys Philippines&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </Card.Body>
              </Card>
            </Grid>
            <Spacer y={1} />
          </Grid>
        </Grid.Container>
        <Spacer y={2} />
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={4} lg={4} md={4} xl={4}>
            <Col align="center">
              <Container>
                <MailIcon
                  style={{
                    color: '#5685F7',
                    fontSize: '6rem',
                    marginTop: '1.7rem',
                  }}
                />
              </Container>
              <Spacer y={2} />
              <Text
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  fontSize: '$2xl',
                  letterSpacing: '$widest',
                  textAlign: 'center',
                  lineHeight: '$sm',
                }}
                color={darkMode ? 'white' : '$gray700'}
              >
                smartbuys@duck.com
              </Text>
            </Col>
          </Grid>
          <Grid xs={12} sm={4} lg={4} md={4} xl={4}>
            <Col align="center">
              <Container>
                <RingVolumeIcon
                  style={{
                    color: '#F90502',
                    fontSize: '6rem',
                    marginTop: '1.7rem',
                  }}
                />
              </Container>
              <Spacer y={2} />
              <Text
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  fontSize: '$2xl',
                  letterSpacing: '$widest',
                  textAlign: 'center',
                  lineHeight: '$sm',
                }}
                color={darkMode ? 'white' : '$gray700'}
              >
                09953005644
              </Text>
              <Text
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  fontSize: '$2xl',
                  letterSpacing: '$widest',
                  textAlign: 'center',
                  lineHeight: '$sm',
                }}
                color={darkMode ? 'white' : '$gray700'}
              >
                09497309994
              </Text>
            </Col>
          </Grid>
          <Grid xs={12} sm={4} lg={4} md={4} xl={4}>
            <Col align="center">
              <Container>
                <FmdGoodIcon
                  style={{
                    color: 'Gold',
                    fontSize: '6rem',
                    marginTop: '1.7rem',
                  }}
                />
              </Container>
              <Spacer y={2} />
              <Text
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  fontSize: '$2xl',
                  letterSpacing: '$widest',
                  textAlign: 'center',
                  lineHeight: '$sm',
                }}
                color={darkMode ? 'white' : '$gray700'}
              >
                Las Pinas City, PHILIPPINES
              </Text>
            </Col>
          </Grid>
        </Grid.Container>
        <Spacer y={5} />
      </Grid.Container>
    </>
  );
};

export default Contact;
