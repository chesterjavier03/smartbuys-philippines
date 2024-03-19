'use client';

import { Product } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import FilterNav from './_component/FilterNav';
import ShopProductList from './_component/ShopProductList';
import {
  MdOutlineFilterList,
  MdOutlineFilterListOff,
  MdRefresh,
} from 'react-icons/md';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Checkbox,
  ScrollShadow,
  Spinner,
} from '@nextui-org/react';
import classNames from 'classnames';
import { PageContext } from './Main';

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
  const isNavMenuOpen = useContext(PageContext);

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
          <aside
            className={classNames({
              'md:hidden fixed top-[4rem] overflow-y-scroll left-0 z-40 w-[200px] transition-transform h-[calc(100vh-8rem)]':
                true,
              '-translate-x-full': !isNavMenuOpen,
              'sm:translate-x-0': isNavMenuOpen,
            })}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto !text-white bg-[#ff0000]">
              <nav className="flex flex-col justify-between inset-0 w-full">
                <ul className="flex flex-col gap-2 items-stretch">
                  <li className="flex flex-col cursor-pointer transition-colors duration-300 rounded-md mx-3">
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
                  </li>
                  <li className="flex flex-col cursor-pointer transition-colors duration-300 rounded-md mx-3">
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
                  </li>
                  <li className="flex flex-col  cursor-pointer transition-colors duration-300 rounded-md p-2 mx-3 gap-4 ">
                    <Button
                      size="sm"
                      fullWidth
                      // color="default"
                      className="bg-[#1a3d57] text-white text-sm tracking-widest"
                      variant="solid"
                      onClick={reset}
                      radius="sm"
                      disableRipple
                      endContent={<MdRefresh size={20} color="white" />}
                    >
                      Reset
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
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
