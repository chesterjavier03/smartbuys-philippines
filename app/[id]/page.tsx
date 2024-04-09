'use client';

import {
  Button,
  Card,
  Checkbox,
  Divider,
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
import { MdFace, MdFace3, MdFastfood, MdHome } from 'react-icons/md';

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
          <div className="text-3xl font-bold tracking-widest text-[#1a3d57] w-auto text-start my-10">
            {product?.name}
          </div>
          <div className="flex cursor-pointer justify-between text-amber-500 text-6xl font-medium tracking-normal mb-10">
            {convertMoney(product?.price!)}
          </div>
          <div className="text-xl font-semibold tracking-widest text-[#1a3d57] w-auto text-start mb-10">
            {product?.description}
          </div>
          <div className="flex flex-row flex-wrap w-auto justify-between align-middle content-center items-center mb-10">
            <Divider className="mb-2 bg-[#ff0000]" />
            <div className="grid grid-cols-2 w-[45%] justify-center align-middle items-center content-center text-2xl font-semibold tracking-widest text-[#1a3d57]">
              <div className="flex justify-start align-middle">Category:</div>
              <div
                className={classNames({
                  'flex justify-end align-middle content-end items-end': true,
                })}
              >
                {product?.category === 'Boys' ? (
                  <MdFace
                    color="rgb(59 130 246)"
                    size={44}
                    className="justify-end align-middle"
                  />
                ) : product?.category === 'Girls' ? (
                  <MdFace3
                    color="rgb(236 72 153)"
                    size={44}
                    className="justify-end align-middle"
                  />
                ) : product?.category === 'Home' ? (
                  <MdHome
                    color="rgb(34 197 94)"
                    size={44}
                    className="justify-end align-middle"
                  />
                ) : product?.category === 'Food' ? (
                  <MdFastfood
                    color="#ff0000"
                    size={44}
                    className="justify-end align-middle"
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <Divider
              orientation="vertical"
              className="w-[1px] h-10 bg-[#ff0000]"
            />
            <div className="grid grid-cols-2 w-[45%] justify-around text-2xl font-medium tracking-widest">
              <div className="text-[#1a3d57]">Type:</div>
              <div
                className={classNames({
                  'text-end': true,
                  'text-blue-500':
                    product?.type === 'Shirt' ||
                    product?.type === 'Sando' ||
                    product?.type === 'Jogger' ||
                    product?.type === 'Shorts',
                  'text-pink-500':
                    product?.type === 'Dress' || product?.type === 'Terno',
                  'text-green-500': product?.category === 'Home',
                  'text-[#ff0000]': product?.category === 'Food',
                })}
              >
                {product?.type}
              </div>
            </div>
            <Divider className="mt-2 bg-[#ff0000]" />
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
