import {
  Grid,
  Spacer,
  Text,
  Divider,
  Card,
  Image,
  Link,
} from '@nextui-org/react';
import { weAreProductList } from 'database/data';

const WeAre = () => {
  return (
    <>
      <Spacer y={5} />
      <Grid
        xs={12}
        justify="center"
        alignContent="center"
        alignItems="center"
        align="center"
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
          We Are
        </Text>
      </Grid>
      <Spacer y={2} />
      <Grid xs={10} sm={5} lg={5} md={5} xl={5}>
        <Divider color="error" css={{ height: '2px' }} />
      </Grid>
      <Spacer y={5} />
      <Grid.Container justify="space-between" gap={2}>
        {weAreProductList.map((productData) => (
          <Grid
            key={productData.name}
            xs={4}
            sm={2}
            lg={2}
            md={2}
            xl={2}
            align="center"
          >
            <Link
              href={productData.url !== '' ? productData.url : null}
              target="_blank"
            >
              <Card
                css={{ backgroundColor: 'transparent', cursor: 'pointer' }}
                variant="flat"
              >
                <Image
                  priority="true"
                  src={productData.image}
                  width={productData.width}
                  height={productData.height}
                  objectFit="contain"
                  autoResize
                  alt={productData.description}
                />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer y={5} />
    </>
  );
};

export default WeAre;
