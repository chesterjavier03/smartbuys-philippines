import Shop from './shop/index';

const Home = () => {
  return (
    <>
      <Shop />
    </>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   await db.connect();
//   try {
//     const products = await Product.find({}).lean();

//     const items = products.map((item) => ({
//       ...item,
//       itemCount: 0,
//       subTotal: 0,
//     }));
//     await db.disconnect();
//     return { props: { products: toJson(items) } };
//   } catch (error) {
//     await db.disconnect();
//     return { props: { products: [] } };
//   }
// };
