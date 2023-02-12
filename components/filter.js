import {
  Button,
  Col,
  Divider,
  Grid,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Filter = ({
  darkMode,
  filterByCategory,
  categoryList,
  typeList,
  filterByType,
  setIsPressed,
  fetchAll,
  isPressed,
}) => {
  return (
    <Grid.Container
      gap={1}
      align="flex-start"
      justify="flex-start"
      alignContent="flex-start"
    >
      <Grid xs={12} align="center" justify="center">
        <Row css={{ width: 'inherit' }}>
          <FilterAltIcon
            style={{
              color: darkMode ? 'white' : 'gray',
              fontSize: '2rem',
            }}
          />
          <Spacer y={1} />
          <Text
            h4
            color={darkMode ? 'white' : '$gray800'}
            weight="medium"
            size="$xl"
          >
            SEARCH FILTER
          </Text>
        </Row>
      </Grid>
      <Grid xs={12} lg={12} align="center" justify="center">
        <Divider css={{ backgroundColor: darkMode ? 'yellow' : 'red' }} />
      </Grid>
      <Grid xs={0} lg={12} align="center" justify="center">
        <Row>
          <Text
            h5
            color={darkMode ? 'white' : '$gray800'}
            weight="semibold"
            size="$md"
          >
            Filter By Category:
          </Text>
        </Row>
        <Spacer y={0.5} />
      </Grid>
      <Grid
        xs={0}
        lg={12}
        align="center"
        alignContent="center"
        alignItems="center"
      >
        <Row justify="center">
          <Grid.Container gap={0.5} justify="center">
            {categoryList.map((category) => (
              <Grid xs={3} sm={2} md={3} xl={5} lg={5} key={category}>
                <Col>
                  <Button
                    color={'error'}
                    css={{
                      cursor: 'pointer',
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
                    key={category}
                    onPress={() => filterByCategory(category)}
                  >
                    <Text
                      h5
                      color="white"
                      weight="semibold"
                      size="$md"
                      css={{ margin: '0 auto' }}
                    >
                      {category}
                    </Text>
                  </Button>
                </Col>
              </Grid>
            ))}
          </Grid.Container>
        </Row>
      </Grid>
      <Grid xs={0} lg={12} align="center" justify="center">
        <Divider css={{ backgroundColor: darkMode ? 'yellow' : 'red' }} />
      </Grid>
      <Grid xs={0} lg={12} align="center" justify="flex-start">
        <Row>
          <Text
            h5
            color={darkMode ? 'white' : '$gray800'}
            weight="semibold"
            size="$md"
          >
            Filter By Type:
          </Text>
        </Row>
      </Grid>
      <Grid xs={0} lg={12} align="center" justify="center">
        <Row justify="center">
          <Grid.Container gap={1} justify="flex-start" align="center">
            {typeList.map((type) => (
              <Grid xs={3} sm={2} md={3} xl={5} lg={5} key={type}>
                <Col>
                  <Button
                    color={'error'}
                    css={{
                      cursor: 'pointer',
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
                    onPress={() => filterByType(type)}
                  >
                    <Text
                      h5
                      color={'white'}
                      weight="semibold"
                      css={{ letterSpacing: '$wider', margin: '0 auto' }}
                      size="$md"
                    >
                      {type}
                    </Text>
                  </Button>
                </Col>
              </Grid>
            ))}
          </Grid.Container>
        </Row>
      </Grid>
      <Grid xs={0} lg={12} align="center" justify="center">
        <Divider css={{ backgroundColor: darkMode ? 'yellow' : 'red' }} />
      </Grid>
      <Grid
        xs={12}
        lg={0}
        align="center"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Row justify="center" align="center" alignContent="center">
          <Grid.Container gap={1} justify="flex-start" align="center">
            {[...typeList, ...categoryList].map((data) => (
              <Grid xs={3} sm={2} md={3} xl={5} lg={5} key={data}>
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
                      css={{ letterSpacing: '$wider', margin: '0 auto' }}
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
      <Grid xs={12} lg={12} align="center" justify="center">
        <Col>
          <Button
            size={'md'}
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
        </Col>
      </Grid>
      <Grid xs={12} lg={0} align="center" justify="center">
        <Divider css={{ backgroundColor: 'red' }} />
      </Grid>
    </Grid.Container>
  );
};

export default Filter;
