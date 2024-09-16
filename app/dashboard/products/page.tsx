import prisma from '@/prisma/client';
import { DataTable } from './data-table';
import { Columns } from './columns';

const Products = async () => {
  const products = await prisma?.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (!products) throw new Error('No products found');

  const dataTable = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
  });

  if (!dataTable) throw new Error('No data found');

  return (
    <div>
      <DataTable columns={Columns} data={dataTable} />
    </div>
  );
};

export default Products;
