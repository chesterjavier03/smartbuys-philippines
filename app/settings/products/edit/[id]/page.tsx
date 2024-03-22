import { Spinner } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';

const ProductForm = dynamic(() => import('../../_component/ProductForm'), {
  ssr: false,
  loading: () => (
    <div className="h-full">
      <Spinner
        color="success"
        size="lg"
        className="flex h-[calc(100vh-4rem)] align-middle justify-center justify-items-center content-center overflow-hidde"
      />
    </div>
  ),
});

interface Props {
  params: { id: string };
}

const EditProductPage = async ({ params }: Props) => {
  const product = await prisma?.product.findUnique({
    where: { id: params.id },
  });

  if (!product) notFound();

  return <ProductForm product={product} />;
};

export default EditProductPage;
