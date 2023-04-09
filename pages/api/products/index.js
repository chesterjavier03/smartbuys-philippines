import db from 'database/db';
import Product from 'models/product';
import nextConnect from 'next-connect';

const handler = nextConnect();

export const config = {
  api: {
    responseLimit: '1000gb',
  },
};

handler.get(async (req, res) => {
  try {
    await db.connect();
    const productList = await Product.find({}).lean();
    await db.disconnect();
    res.status(200).json(productList);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;

// export default async function handler(req, res) {
//   try {
//     const data = {
//       collection: process.env.NEXT_PUBLIC_COLLECTION,
//       database: process.env.NEXT_PUBLIC_DATABASE,
//       dataSource: process.env.NEXT_PUBLIC_DATASOURCE,
//     };

//     const config = {
//       method: 'post',
//       url: process.env.NEXT_PUBLIC_DATASOURCE_URL,
//       headers: {
//         'Content-Type': 'application/ecmascript',
//         'Access-Control-Request-Headers': '*',
//         'api-key': process.env.NEXT_PUBLIC_DATASOURCE_API_KEY,
//       },
//       data: data,
//     };

//     axios(config)
//       .then(function (response) {
//         res.status(200).json(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//         res.status(error.status || 500).end(error.message);
//       });
//   } catch (error) {
//     console.error(error);
//     return res.status(error.status || 500).end(error.message);
//   }
// }
