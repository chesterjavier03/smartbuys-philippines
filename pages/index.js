import db from 'database/db';
import Product from 'models/product';
import { toJson } from 'utils/functions';
import Shop from './shop/index';
import { Container } from '@nextui-org/react';

const Home = ({ products }) => {
  return (
    <Container lg>
      <Shop products={products}></Shop>
    </Container>
  );
};

export default Home;

export const getServerSideProps = async () => {
  await db.connect();
  try {
    const products = await Product.find({}).lean();

    const items = products.map((item) => ({
      ...item,
      itemCount: 0,
      subTotal: 0,
    }));
    await db.disconnect();
    return { props: { products: toJson(items) } };
  } catch (error) {
    await db.disconnect();
    return { props: { products: [] } };
  }
};
