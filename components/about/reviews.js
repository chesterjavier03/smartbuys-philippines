import { Spacer, Text, Grid, Divider, Col, Card } from '@nextui-org/react';
import { reviewList } from 'database/data';

const Reviews = () => {
  return (
    <>
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
          Reviews
        </Text>
      </Grid>
      <Spacer y={2} />
      <Grid xs={10} sm={5} lg={5} md={5} xl={5}>
        <Divider color="error" align="center" css={{ height: '2px' }} />
      </Grid>
      <Spacer y={3} />
      <Grid.Container gap={1} justify="center">
        {reviewList.map((review) => (
          <Grid
            key={review.name}
            xs={12}
            sm={6}
            lg={3}
            md={3}
            xl={3}
            justify="center"
          >
            <Col>
              <Card
                css={{
                  w: '100%',
                  h: '450px',
                  borderColor: `gold`,
                  borderWidth: 'medium',
                }}
                isPressable
                variant="bordered"
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    showSkeleton
                    src={review.image}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt={`SmartBuys Philippines Shop Rating Review ${review.name}`}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer y={5} />
    </>
  );
};

export default Reviews;
