'use client';

import { Product } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FilterNav from './_component/FilterNav';
import ShopProductList from './_component/ShopProductList';
import { MdOutlineFilterList, MdOutlineFilterListOff } from 'react-icons/md';
import {
  Accordion,
  AccordionItem,
  Card,
  Checkbox,
  ScrollShadow,
  Spinner,
} from '@nextui-org/react';
import classNames from 'classnames';

const categoryList = [{ label: 'Girls' }, { label: 'Boys' }, { label: 'Food' }];
const typeList = [
  { label: 'Shirt' },
  { label: 'Dress' },
  { label: 'Sando' },
  { label: 'Terno' },
  { label: 'Jogger' },
  { label: 'Shorts' },
];
const sizeList = [{ label: 'Small' }, { label: 'Medium' }, { label: 'Large' }];

const Home = () => {
  const [size, setSize] = useState('');
  const { data: products, error, isLoading } = useProducts();
  let result: Product[] = products as Product[];
  const [productList, setProductList] = useState<Product[]>(result);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const handleSelectCategory = (category: string) => {
    setCategory(category);
    setType('');
    let res = result?.filter((product) => {
      return category === product.category;
    });
    setProductList(res);
  };

  const handleSelectType = (type: string) => {
    setType(type);
    setCategory('');
    let res = result?.filter((product) => {
      return type === product.type;
    });
    setProductList(res);
  };

  const reset = () => {
    setCategory('');
    setType('');
    setProductList(result);
  };

  return (
    <div className="flex flex-col overflow-hidden md:h-[calc(100vh-4rem)] h-[calc(100vh-7rem)">
      <div className="overflow-hidden flex flex-row">
        <FilterNav
          handleSelectType={handleSelectType}
          handleSelectCategory={handleSelectCategory}
          reset={reset}
          categoryList={categoryList}
          typeList={typeList}
          category={category}
          type={type}
          setCategory={setCategory}
          setType={setType}
        />
        <div className="w-full grid grid-cols-1 justify-center align-middle">
          {isLoading && (
            <Spinner
              color="success"
              size="lg"
              className="flex h-[calc(100vh-4rem)] align-middle justify-center justify-items-center content-center overflow-hidden"
            />
          )}
          <Accordion className="md:hidden fixed z-50 top-14 !px-0 !py-0 !mt-0 text-white container w-full justify-center align-middle flex-wrap">
            <AccordionItem
              className="flex flex-col align-middle justify-center w-full"
              classNames={{
                base: 'text-xl text-white bg-[#ff0000] w-full !m-0',
                heading: 'text-xl text-white !px-2',
                trigger: 'trigger-classes !px-5',
                titleWrapper: '!px-0 !text-white !text-xl !pl-2',
                title: '!text-white !text-xl tracking-widest',
              }}
              aria-label="Filter"
              indicator={<MdOutlineFilterList color="#fff" size={30} />}
              title="Filter"
            >
              <div className="md:hidden flex justify-center align-middle gap-x-5">
                <Card
                  shadow="none"
                  radius="none"
                  className="flex flex-row w-full overflow-x-scroll bg-[#ff0000] justify-start align-middle gap-x-5 px-3 pt-1"
                >
                  {categoryList.map((data, index) => (
                    <Checkbox
                      key={index}
                      className="inline-flex my-0.5"
                      size="md"
                      radius="sm"
                      color="success"
                      value={category}
                      isSelected={categoryList[index].label == category}
                      onChange={() => {
                        handleSelectCategory(data.label);
                      }}
                    >
                      <span className="text-white text-medium font-bold">
                        {data.label}
                      </span>
                    </Checkbox>
                  ))}
                </Card>
              </div>
              <div className="md:hidden flex justify-center align-middle gap-x-5">
                <Card
                  shadow="none"
                  radius="none"
                  className="flex flex-row w-full overflow-x-scroll bg-[#ff0000] justify-start align-middle gap-x-3 px-3 pb-1"
                >
                  {typeList.map((data, index) => (
                    <Checkbox
                      key={index}
                      className="inline-flex my-0.5"
                      size="md"
                      color="success"
                      radius="sm"
                      value={type}
                      isSelected={typeList[index].label == type}
                      onChange={() => {
                        handleSelectType(data.label);
                      }}
                    >
                      <span className="text-white text-medium font-bold">
                        {data.label}
                      </span>
                    </Checkbox>
                  ))}
                </Card>
              </div>
            </AccordionItem>
          </Accordion>
          <ShopProductList
            products={productList ?? result}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () =>
      axios.get<Product[]>('/api/products').then(({ data }) => data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default Home;
