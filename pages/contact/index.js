import {
  Button,
  Card,
  Divider,
  Grid,
  Image,
  Spacer,
  Text,
  Textarea,
} from '@nextui-org/react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import { socialData } from 'database/data';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField } from '@mui/material';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => document.body?.scrollTo(0, 0), []);

  const submitHandler = async (data) => {
    setIsSubmitting(true);

    const res = await axios({
      method: 'POST',
      url: '/api/contact-form',
      data: data,
    })
      .then((res) => {
        setIsSubmitting(false);
        return res;
      })
      .catch((e) => {
        alert('An error occurred. See log for details.');
        console.error(e);
      });

    if (res.data.status === 1) {
      setIsSubmitted(true);
    } else {
      alert(res.data.message);
    }
  };

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
            color={'$gray800'}
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
            <Grid key={social.name} xs={3} lg={3} xl={3} justify="center">
              <Link href={social.link} target="_blank">
                <Card
                  isHoverable
                  variant="shadow"
                  css={{ backgroundColor: 'transparent' }}
                >
                  <Image
                    src={social.image}
                    alt={social.name}
                    height={100}
                    width={100}
                    objectFit="cover"
                    autoResize
                  />
                </Card>
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
                isHoverable
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
        <Grid.Container gap={2} justify="space-around" align="center">
          <Grid>
            <Card
              variant="flat"
              css={{
                alignItems: 'center !important',
                backgroundColor: 'transparent',
              }}
            >
              <MailIcon
                style={{
                  color: '#5685F7',
                  fontSize: '6rem',
                  marginTop: '1.7rem',
                  alignContent: 'center',
                }}
              />
            </Card>
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
              color={'$gray700'}
            >
              smartbuys@duck.com
            </Text>
          </Grid>
          <Grid>
            <Card
              variant="flat"
              css={{
                alignItems: 'center !important',
                backgroundColor: 'transparent',
              }}
            >
              <RingVolumeIcon
                style={{
                  color: '#F90502',
                  fontSize: '6rem',
                  marginTop: '1.7rem',
                }}
              />
            </Card>
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
              color={'$gray700'}
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
              color={'$gray700'}
            >
              09497309994
            </Text>
          </Grid>
          <Grid>
            <Card
              variant="flat"
              css={{
                alignItems: 'center !important',
                backgroundColor: 'transparent',
              }}
            >
              <FmdGoodIcon
                style={{
                  color: 'Gold',
                  fontSize: '6rem',
                  marginTop: '1.7rem',
                }}
              />
            </Card>
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
              color={'$gray700'}
            >
              Las Pinas City, PHILIPPINES
            </Text>
          </Grid>
        </Grid.Container>
        <Spacer y={2} />
        <Card
          css={{
            margin: '0 auto',
            p: '$10',
            marginTop: '2rem',
            border: '.5px Red solid',
            backgroundColor: '$backgroundAlpha',
          }}
          borderWeight="extrabold"
          variant="shadow"
          isHoverable
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(submitHandler)}>
              <Card.Header>
                <Text
                  h2
                  color={'$gray600'}
                  css={{ margin: '0 auto', letterSpacing: '$wide' }}
                >
                  Message Us
                </Text>
              </Card.Header>
              <Card.Body>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Full Name"
                      placeholder="e.g. Jose Rizal"
                      inputProps={{
                        type: 'text',
                      }}
                      error={Boolean(errors.name)}
                      helperText={
                        errors.name
                          ? errors.name.type === 'minLength'
                            ? 'Name length is more than 5'
                            : 'Name is required'
                          : ''
                      }
                      {...field}
                    />
                  )}
                />
                <Spacer y={1} />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      placeholder="e.g. joserizal@something.com"
                      inputProps={{ type: 'email' }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === 'pattern'
                            ? 'Email is not valid'
                            : 'Email is required'
                          : ''
                      }
                      {...field}
                    />
                  )}
                />
                <Spacer y={1} />
                <Controller
                  name="mobile"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      placeholder="e.g. 09xxxxxxxxx"
                      inputProps={{ type: 'text', minLength: 11 }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.mobile
                          ? errors.mobile.type === 'minLength'
                            ? 'Mobile is not valid'
                            : 'Mobile is required'
                          : ''
                      }
                      {...field}
                    />
                  )}
                />
                <Spacer y={1} />
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <Textarea
                      bordered
                      status="default"
                      placeholder="Enter your message...."
                      rows={5}
                      fullWidth
                      id="message"
                      label="Message"
                      css={{
                        borderRadius: '1px',
                        backgroundColor: 'transparent',
                        '.nextui-c-jeuecp': {
                          color: '$gray800',
                        },
                        '.nextui-input-container': {
                          backgroundColor: 'transparent',
                          borderRadius: '1px',
                          boxShadow: '0 0 0 1px gray',
                        },
                        '.nextui-c-eXOOPO-fWIJar-cv:hover': {
                          boxShadow: 'white',
                        },
                        '.nextui-c-eXOOPO-iLMmYc-isTextarea-true': {
                          borderRadius: '.2rem',
                          boxShadow: 'none',
                        },
                        '.nextui-c-eXOOPO-bVYyaA-cv:hover': {
                          boxShadow: '0 0 0 1px gray',
                        },
                        '.nextui-c-eXOOPO-fWIJar-cv': {
                          boxShadow: '0 0 0 1px gray',
                        },
                      }}
                      inputProps={{
                        type: 'text',
                        minLength: 8,
                      }}
                      error={Boolean(errors.message)}
                      helperText={
                        errors.message
                          ? errors.message.type === 'minLength'
                            ? 'Message length is more than 5'
                            : 'Message is required'
                          : ''
                      }
                      {...field}
                    />
                  )}
                />
              </Card.Body>
              <Card.Footer>
                <Grid.Container>
                  <Grid lg={12} xs={12}>
                    <Button
                      size={'lg'}
                      ripple
                      animated
                      type="submit"
                      css={{
                        margin: '0 auto',
                        backgroundColor: 'Red',
                        color: 'White',
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit'}
                    </Button>
                  </Grid>
                  <Spacer y={1} />
                </Grid.Container>
              </Card.Footer>
            </form>
          ) : (
            <>
              <Text h1 css={{ color: 'OrangeRed', letterSpacing: '$widest' }}>
                Thank you!
              </Text>
              <Text
                h4
                size="$md"
                css={{ color: '$gray700', letterSpacing: '$widest' }}
              >
                Your message has been received. Please check your email for
                confirmation.
              </Text>
            </>
          )}
        </Card>
        <Spacer y={5} />
      </Grid.Container>
    </>
  );
};

export default Contact;
