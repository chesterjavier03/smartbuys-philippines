import nextConnect from 'next-connect';
import db from 'database/db';

import Product from 'models/product';
import axios from 'axios';

const handler = nextConnect();

handler.get('/api/products/getAll', async (req, res) => {
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

handler.get('/api/products/filter/byCategory', async (req, res) => {
  try {
    const data = {
      collection: process.env.NEXT_PUBLIC_COLLECTION,
      database: process.env.NEXT_PUBLIC_DATABASE,
      dataSource: process.env.NEXT_PUBLIC_DATASOURCE,
      filter: {
        category: req.query.category,
      },
    };

    const config = {
      method: 'post',
      url: process.env.NEXT_PUBLIC_DATASOURCE_URL,
      headers: {
        'Content-Type': 'application/ecmascript',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.NEXT_PUBLIC_DATASOURCE_API_KEY,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.status(error.status || 500).end(error.message);
      });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
});

handler.get('/api/products/filter/byType', async (req, res) => {
  try {
    const data = {
      collection: process.env.NEXT_PUBLIC_COLLECTION,
      database: process.env.NEXT_PUBLIC_DATABASE,
      dataSource: process.env.NEXT_PUBLIC_DATASOURCE,
      filter: {
        type: req.query.type,
      },
    };

    const config = {
      method: 'post',
      url: process.env.NEXT_PUBLIC_DATASOURCE_URL,
      headers: {
        'Content-Type': 'application/ecmascript',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.NEXT_PUBLIC_DATASOURCE_API_KEY,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.status(error.status || 500).end(error.message);
      });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
});

handler.get('/api/products/', async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.status(200).json(product);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
