import connectToDb from 'database/db';
import Product from 'models/product';
import { toJson } from 'utils/functions';
import Shop from './shop/index';

const Home = ({ products }) => {
  return (
    <>
      <Shop products={products}></Shop>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  await connectToDb();
  try {
    const products = await Product.find({}).lean();

    const items = products.map((item) => ({
      ...item,
      itemCount: 0,
      subTotal: 0,
    }));
    return { props: { products: toJson(items) } };
  } catch (error) {
    return { props: { products: [] } };
  }
};
