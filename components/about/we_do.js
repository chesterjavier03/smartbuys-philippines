import {
  Grid,
  Col,
  Spacer,
  Container,
  Card,
  Text,
  Divider,
} from '@nextui-org/react';
import { weDoProductList } from 'database/data';

const WeDo = () => {
  return (
    <>
      <Grid xs={12} justify="center">
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
          We Do
        </Text>
      </Grid>
      <Spacer y={2} />
      <Grid xs={10} sm={5} lg={5} md={5} xl={5}>
        <Divider color="error" align="center" css={{ height: '2px' }} />
      </Grid>
      <Spacer y={5} />
      <Grid.Container
        gap={1}
        justify="center"
        alignContent="flex-start"
        alignItems="flex-start"
        align="center"
      >
        {weDoProductList.map((weDo) => (
          <Grid
            key={weDo.name}
            xs={12}
            sm={6}
            lg={3}
            md={3}
            xl={3}
            justify="center"
          >
            <Col key={weDo.name}>
              <Spacer y={1} />
              <Card
                isHoverable
                css={{ backgroundColor: 'transparent', cursor: 'pointer' }}
                variant="shadow"
              >
                <Container
                  key={weDo.name}
                  css={{
                    borderStyle: 'solid',
                    borderRadius: '$rounded',
                    borderColor: `${weDo.color}`,
                    borderWidth: 'medium',
                    height: '8rem',
                    width: '8.5rem',
                    position: 'relative',
                  }}
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                  fluid
                  responsive
                >
                  {weDo.icon}
                </Container>
              </Card>
              <Spacer y={1} />
              <Card
                css={{
                  w: '100%',
                  h: '450px',
                  borderColor: `${weDo.color}`,
                  borderWidth: 'medium',
                }}
                isHoverable
                isPressable
                variant="bordered"
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    showSkeleton
                    src={weDo.image}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt={`SmartBuys Philippines ${weDo.contentTitle}`}
                  />
                </Card.Body>
              </Card>
              <Spacer y={2} />
              <Text
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  fontSize: '$xl',
                  letterSpacing: '$widest',
                  textAlign: 'center',
                  lineHeight: '$sm',
                }}
                color={'$gray700'}
              >
                {weDo.contentTitle}
              </Text>
              <Spacer y={2} />
              <Text
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  fontSize: '$md',
                  letterSpacing: '$widest',
                  textAlign: 'center',
                  lineHeight: '$sm',
                  justifyContent: 'center',
                }}
                color={'$gray600'}
              >
                {weDo.contentDetails}
              </Text>
            </Col>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer y={5} />
    </>
  );
};

export default WeDo;
