import { Button, Grid, Text } from '@nextui-org/react';

const SizeSection = ({
  sizeList,
  selectedSize,
  isPressed,
  setIsPressed,
  setSelectedSize,
  setItemCount,
}) => {
  return (
    <Grid
      xs={12}
      lg={12}
      sm={12}
      xl={12}
      md={12}
      css={{ cursor: 'pointer' }}
      alignItems="center"
      justify="center"
      alignContent="center"
    >
      <Text
        h4
        css={{
          fontFamily: 'Ubuntu',
          fontWeight: '$normal',
          color: '$gray600',
        }}
        color="gray"
      >
        Size:
      </Text>
      <Grid.Container
        gap={1}
        justify="space-around"
        alignContent="center"
        alignItems="center"
      >
        {sizeList.map((size, index) => (
          <Grid key={index} css={{ cursor: 'pointer' }}>
            <Button
              auto
              size="lg"
              css={{
                backgroundColor: selectedSize
                  ? sizeList[index].name === selectedSize.name
                    ? (sizeList[index].color = 'Red')
                    : 'LightGray'
                  : 'LightGray',
                borderColor: selectedSize
                  ? sizeList[index].name === selectedSize.name
                    ? (sizeList[index].color = 'WhiteSmoke')
                    : 'WhiteSmoke'
                  : 'WhiteSmoke',
                borderStyle: 'solid',
                borderWidth: 'thin',
                // width: '40vw',
                // height: '4vh',
                // '@xs': { width: '40vw' },
                '&:hover': {
                  transform: 'translateY(-5px)',
                  '&:after': {
                    transform: 'scaleX(1.5) scaleY(1.6)',
                    opacity: 0,
                  },
                },
              }}
              onPress={() => {
                setIsPressed(!isPressed);
                setSelectedSize(size);
                setItemCount(1);
              }}
            >
              <Text
                h5
                css={{
                  margin: '0 auto',
                  color: selectedSize
                    ? sizeList[index].name === selectedSize.name
                      ? (sizeList[index].color = 'WhiteSmoke')
                      : 'LightSlateGray'
                    : 'LightSlateGray',
                }}
                weight="semibold"
                size="$md"
              >
                {size.display}
              </Text>
            </Button>
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};

export default SizeSection;
