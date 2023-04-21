import { FilterAlt } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { Button, Col, Collapse, Grid, Row, Text } from '@nextui-org/react';

const MobileFilterView = ({
  typeList,
  categoryList,
  filterByCategory,
  filterByType,
  setIsPressed,
  isPressed,
  fetchAll,
}) => {
  return (
    <Col align="start" justify="flex-start">
      <Collapse
        bordered
        shadow
        title={
          <Text h4 color="Gray" css={{ textTransform: 'uppercase' }}>
            Search Filter
          </Text>
        }
        css={{
          w: 'auto',
          margin: '.4rem',
          borderColor: 'Red',
          borderRadius: '$xs',
          color: '$accents9',
          '.nextui-collapse-title': {
            color: '$accents6',
          },
          '.nextui-collapse-subtitle': {
            color: '$gray800',
          },
        }}
        arrowIcon={<FilterAlt style={{ color: 'Red' }} />}
      >
        <Grid align="center" justify="center">
          <Divider css={{ backgroundColor: 'red' }} />
        </Grid>
        <Grid
          align="center"
          justify="center"
          alignContent="center"
          alignItems="center"
        >
          <Row justify="center" align="center" alignContent="center">
            <Grid.Container gap={1} justify="flex-start" align="center">
              {[...typeList, ...categoryList].map((data) => (
                <Grid xs={4} key={data}>
                  <Col>
                    <Button
                      css={{
                        zIndex: 0,
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          '&:after': {
                            transform: 'scaleX(1.5) scaleY(1.6)',
                            opacity: 0,
                          },
                        },
                      }}
                      auto
                      color={'error'}
                      onPress={() => {
                        data == 'Food' || data == 'Boys' || data == 'Girls'
                          ? filterByCategory(data)
                          : filterByType(data);
                      }}
                    >
                      <Text
                        h5
                        color={'white'}
                        weight="semibold"
                        css={{
                          letterSpacing: '$normal',
                          margin: '0 auto',
                        }}
                        size="$md"
                      >
                        {data}
                      </Text>
                    </Button>
                  </Col>
                </Grid>
              ))}
            </Grid.Container>
          </Row>
        </Grid>
        <Grid align="center" justify="center">
          <Button
            size={'lg'}
            css={{
              zIndex: 0,
              boxShadow: '$md',
              margin: '0 auto',
              '&:hover': {
                transform: 'translateY(-5px)',
                '&:after': {
                  transform: 'scaleX(1.5) scaleY(1.6)',
                  opacity: 0,
                },
              },
            }}
            color={'error'}
            onPress={() => {
              setIsPressed(!isPressed);
              fetchAll();
            }}
          >
            <Text
              h5
              color={'white'}
              weight="semibold"
              size="$md"
              css={{ margin: '0 auto' }}
            >
              Reset
            </Text>
          </Button>
        </Grid>
      </Collapse>
    </Col>
  );
};

export default MobileFilterView;
