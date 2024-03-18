'use client';

import {
  Button,
  Card,
  Checkbox,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { Product } from '@prisma/client';
import axios from 'axios';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { convertMoney } from '../_utility/MoneyFormatter';
import ItemImage from './_component/ItemImage';
import OrderSummary from './_component/OrderSummary';
import ShowImageModal from './_component/ShowImageModal';

const sizeList = [{ label: 'Small' }, { label: 'Medium' }, { label: 'Large' }];

interface Props {
  params: { id: string };
}

const ProductDetailsPage = ({ params }: Props) => {
  // const { data: product, error, isLoading } = fetchProcutById(params.id);
  const { status, data: session } = useSession();
  const [size, setSize] = useState('');
  const [showErrorQuantity, setShowErrorQuantity] = useState(false);
  const [count, setCount] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState<Product>();
  const [total, setTotal] = useState<number>(product?.price!);

  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    setIsLoading(true);
    const { data } = await axios.get<Product>(`/api/products/${params.id}`);
    setIsLoading(false);
    setProduct(data);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const decrementQuantity = () => {
    let newCount = count;
    setShowErrorQuantity(false);
    setCount(newCount < 2 ? newCount : --newCount);
    setTotal(product?.price! * newCount);
  };

  const incrementQuantity = () => {
    let newCount = count;
    if (newCount >= 10) {
      setShowErrorQuantity(true);
      setCount(newCount);
    } else {
      setShowErrorQuantity(false);
      setCount(++newCount);
    }
    setTotal(product?.price! * newCount);
  };

  if (isLoading)
    return (
      <Spinner
        color="success"
        size="lg"
        className="flex h-screen align-middle justify-center justify-items-center content-center overflow-hidde"
      />
    );

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:mx-5 grid-cols-1 h-[calc(100vh-4rem)]">
        <ItemImage
          onOpen={onOpen}
          productName={product?.name!}
          productImage={product?.image!}
        />
        <div className="grid grid-cols-1 h-auto justify-self-start mt-10 px-5 md:mx-0 w-full items-start place-content-start">
          <div className="text-5xl font-bold tracking-widest text-[#1a3d57] w-auto text-start mb-10">
            {product?.name}
          </div>
          <div className="text-2xl font-semibold tracking-widest text-[#1a3d57] w-auto text-start mb-10">
            {product?.description}
          </div>
          <div className="grid grid-cols-2 justify-between text-2xl font-semibold tracking-widest text-[#1a3d57] mb-10">
            <div>Price:</div>
            <div className="cursor-pointer text-amber-500 text-end">
              {convertMoney(product?.price!)}
            </div>
          </div>

          <div className="grid grid-cols-2 justify-between text-2xl font-semibold tracking-widest text-[#1a3d57] mb-10">
            <div>Category:</div>
            <div
              className={classNames({
                'text-end text-blue-500': true,
                'text-pink-500': product?.category === 'Girls',
                'text-blue-500': product?.category === 'Boys',
                'text-green-500': product?.category === 'Food',
              })}
            >
              {product?.category}
            </div>
          </div>
          <div className="grid grid-cols-2 justify-around text-2xl font-semibold tracking-widest text-[#1a3d57] mb-10">
            <div>Type:</div>
            <div
              className={classNames({
                'text-end': true,
                'text-blue-500':
                  product?.type === 'Shirts' || product?.type === 'Sando',
                'text-violet-500':
                  product?.type === 'Jogger' || product?.type === 'Shorts',
                'text-pink-500':
                  product?.type === 'Dress' || product?.type === 'Terno',
                'text-green-500': product?.category === 'Food',
              })}
            >
              {product?.type}
            </div>
          </div>
          {product?.category !== 'Food' && (
            <div className="flex flex-row justify-between text-xl font-semibold tracking-widest text-[#1a3d57] mb-10">
              <div className="w-auto text-2xl">Size:</div>
              <div className="flex gap-x-5 w-auto align-middle justify-center place-content-center content-center justify-items-center">
                {sizeList.map((data, index) => (
                  <Checkbox
                    key={index}
                    className="inline-flex text-[#ff0000]"
                    classNames={{
                      label: 'text-[#1a3d57] font-normal ',
                      base: ['text-lg font-medium'],
                      icon: ['text-white'],
                      wrapper: [
                        'flex rounded text-white border-[#1a3d57] border-solid border-0',
                      ],
                    }}
                    size="md"
                    radius="sm"
                    color="success"
                    value={size}
                    isSelected={sizeList[index].label == size}
                    onChange={() => setSize(data.label)}
                  >
                    <span
                      className={classNames({
                        'text-[#1a3d57] text-medium font-bold': true,
                      })}
                    >
                      {data.label}
                    </span>
                  </Checkbox>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-row justify-between font-semibold tracking-widest text-[#1a3d57] mb-5">
            <div className="w-auto text-2xl flex align-middle justify-center place-self-center">
              Quantity:
            </div>
            <Card
              shadow="lg"
              radius="sm"
              fullWidth
              className="flex flex-row gap-x-2 w-auto h-auto px-5 bg-blue-500 border-1 border-solid "
            >
              <Button
                isDisabled={!size && product?.category !== 'Food'}
                disableRipple
                className="bg-transparent flex align-middle justify-center text-[#fff000]"
                isIconOnly
                startContent={<FaMinus size={25} />}
                onClick={decrementQuantity}
              />
              <div className="border-2 w-24 border-solid text-2xl border-blue-500 px-8 rounded-lg bg-white flex align-middle justify-center place-self-center">
                {count}
              </div>
              <Button
                isDisabled={!size && product?.category !== 'Food'}
                disableRipple
                className=" bg-transparent flex align-middle justify-center text-[#fff000]"
                isIconOnly
                startContent={<FaPlus size={25} />}
                onClick={incrementQuantity}
              />
            </Card>
          </div>
          <div className="text-[#ff0000] font-medium text-lg justify-end flex align-middle w-full pr-14">
            {showErrorQuantity ? 'Limit reached' : ''}
          </div>
        </div>
        <div className="grid grid-cols-1 w-full justify-center align-middle mt-10 h-auto md:pb-0 pb-10">
          <OrderSummary
            product={product!}
            setSize={setSize}
            setCount={setCount}
            size={size}
            quantity={count.toString() + 'x'}
            setTotal={setTotal}
            total={convertMoney(total ?? product?.price)}
          />
        </div>
      </div>
      <ShowImageModal
        isOpen={isOpen}
        onClose={onClose}
        productName={product?.name!}
        productImage={product?.image!}
      />
    </>
  );
};

export default ProductDetailsPage;
