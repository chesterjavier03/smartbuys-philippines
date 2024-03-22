import { Spinner } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const ProductForm = dynamic(
  () => import('@/app/settings/products/_component/ProductForm'),
  {
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
  }
);

const CreateNewProductPage = () => {
  return <ProductForm />;
};

export default CreateNewProductPage;
