import { Card, CardFooter, Checkbox, Image, Spinner } from '@nextui-org/react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import { convertMoney } from '../_utility/MoneyFormatter';

interface Props {
  products: Product[];
  isLoading: boolean;
}

const ShopProductList = ({ products, isLoading }: Props) => {
  return (
    <>
      <div className="overflow-y-auto w-full md:pt-0 md:pb-0 pt-0 pb-5">
        <div className="grid grid-cols-2 mx-1 gap-2 justify-around content-start my-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:mx-5 md:my-5 md:gap-5 align-middle justify-items-start ">
          {products?.map((product, index) => {
            return (
              <Card
                key={index}
                shadow="lg"
                disableRipple
                radius="sm"
                isHoverable
                className="hover:scale-105"
                isFooterBlurred
              >
                <Link href={`/${product.id}`}>
                  <Image
                    shadow="sm"
                    radius="sm"
                    alt={product.name}
                    className="w-80 h-96 object-cover z-0"
                    src={product.image}
                    srcSet={product.image}
                    loading={'lazy'}
                  />
                </Link>
                <CardFooter className="absolute bg-black/55 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 ">
                  <div className="flex flex-row justify-between align-middle content-center w-full h-unit-xl place-items-center">
                    <div className="flex flex-col justify-start align-middle place-content-start content-start">
                      <span className="truncate w-20 md:w-36 text-neutral-200 text-start">
                        {product.name}
                      </span>
                    </div>
                    <div className="cursor-pointer hover:scale-125 !duration-300">
                      <span className="text-[#fff000] md:text-lg text-start">
                        {convertMoney(product.price)}
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShopProductList;
