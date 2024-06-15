'use client';

import {
  Button,
  Card,
  Divider,
  Image as ImageData,
  Input,
  Modal,
  ModalContent,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { Product } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import Swal from 'sweetalert2';
import { convertMoney } from '../../_utility/MoneyFormatter';
export const dynamic = 'force-dynamic';

const ProductManagerPage = () => {
  const router = useRouter();
  const { data: products, error, isLoading } = useProducts();
  let result: Product[] = products as Product[];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productData, setProductData] = useState<Product[]>(
    result ?? products ?? []
  );
  const [selectedItem, setSelectedItem] = useState<Product>();

  const [filterValue, setFilterValue] = useState('');
  const [singleProduct, setSingleProduct] = useState<Product>();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredProducts = [...productData];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          product.category.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [productData, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  useEffect(() => {
    axios
      .get<Product[]>('/api/products')
      .then(({ data }) => setProductData(data));
  }, []);

  const handleDelete = async (productId: string) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      confirmButtonColor: '#336ee5',
      cancelButtonColor: '#ff0000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { status } = await axios.delete('/api/products/' + productId);
        if (status === 200) {
          await axios.get<Product[]>('/api/products').then(({ data }) => {
            setProductData(data);
          });
        }
        router.push('/settings/products');
        router.refresh();
      }
    });
  };

  return (
    <>
      <div className='px-8 py-2 justify-between align-middle grid grid-cols-1 gap-5'>
        <Table
          layout='auto'
          shadow='md'
          bottomContentPlacement='inside'
          selectionMode='single'
          aria-label='Products Table'
          className='w-full text-start'
          classNames={{
            th: 'text-start w-auto tracking-widest',
            td: 'text-md font-medium text-neutral-500 p-2 cursor-pointer !w-36',
          }}
          bottomContent={
            pages > 0 ? (
              <div className='flex w-full h-full justify-center align-middle '>
                <Pagination
                  showControls
                  color='primary'
                  showShadow
                  page={page}
                  total={pages}
                  onChange={setPage}
                />
              </div>
            ) : null
          }
          topContent={
            <div className='grid grid-cols-2 w-full'>
              <div className='flex w-full justify-start align-middle'>
                <Input
                  isClearable
                  classNames={{
                    base: 'w-full max-w-[100%]',
                    inputWrapper:
                      'border-[1px] border-[#1a3d57] hover:border-[#1a3d57] hover:border-[1px]',
                    label:
                      '!text-[#1a3d57] !text-2xl !font-bold tracking-widest',
                  }}
                  placeholder='Search...'
                  size='sm'
                  startContent={
                    <FaSearch className='text-[#1a3d57]' size={18} />
                  }
                  value={filterValue}
                  variant='bordered'
                  onClear={() => setFilterValue('')}
                  onValueChange={onSearchChange}
                />
              </div>
              <div className='flex w-full h-full justify-end align-middle'>
                <Button
                  color='primary'
                  size='md'
                  className='sm:tracking-widest tracking-normal'
                  onClick={() => router.push('/products/create')}
                >
                  Create New Student
                </Button>
              </div>
            </div>
          }
        >
          <TableHeader>
            <TableColumn align='center' allowsSorting isRowHeader>
              IMAGE
            </TableColumn>
            <TableColumn align='center' allowsSorting isRowHeader>
              NAME
            </TableColumn>
            <TableColumn align='center' allowsSorting isRowHeader>
              DESCRIPTION
            </TableColumn>
            <TableColumn align='center' allowsSorting isRowHeader>
              TYPE
            </TableColumn>
            <TableColumn align='center' allowsSorting isRowHeader>
              CATEGORY
            </TableColumn>
            <TableColumn align='center' allowsSorting isRowHeader>
              PRICE
            </TableColumn>
            <TableColumn
              isRowHeader
              className='flex justify-center align-middle items-center'
            >
              ACTION
            </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={'No rows to display.'}
            items={items}
            isLoading={isLoading}
            loadingContent={
              <Spinner
                color='success'
                size='lg'
                className='flex h-[calc(100vh-4rem)] align-middle justify-center justify-items-center content-center overflow-hidden'
              />
            }
          >
            {(data: any) => (
              <TableRow key={data.id}>
                <TableCell
                  className='text-left !w-28 mx-0 p-0 m-0.5'
                  onClick={() => {
                    setSingleProduct(data);
                    onOpen();
                  }}
                >
                  <Card
                    className='justify-center m-1 align-middle w-28 h-28 rounded-sm border-[1px] bg-white/20 border-green-500 aspect-auto border-solid'
                    radius='sm'
                    shadow='sm'
                  >
                    <Image
                      alt={data.name}
                      fill={true}
                      priority={true}
                      style={{
                        objectFit: 'cover',
                      }}
                      quality={100}
                      src={data.image}
                    />
                  </Card>
                </TableCell>
                <TableCell className='text-ellipsis truncate text-left !w-48 font-bold text-gray-600 capitalize'>
                  {data.name}
                </TableCell>
                <TableCell className='text-md w-36 font-medium text-neutral-500'>
                  {data.description}
                </TableCell>
                <TableCell className='text-md w-36 font-medium text-neutral-500 capitalize'>
                  {data.type}
                </TableCell>
                <TableCell className='text-md w-36 font-medium text-neutral-500 uppercase'>
                  {data.category}
                </TableCell>
                <TableCell className='text-md w-36 font-medium text-neutral-500'>
                  {convertMoney(data.price)}
                </TableCell>
                <TableCell className='w-auto px-2 mx-2'>
                  <div className='grid grid-cols-3 justify-start gap-x-1'>
                    <Tooltip content='Edit?' className='justify-start'>
                      <div
                        className='cursor-pointer rounded-full flex h-12 w-12
                      justify-center align-middle self-center hover:bg-black/10 hover:border-black/10'
                        onClick={() => {
                          setSelectedItem(data);
                          router.push(`/settings/products/edit/${data.id}`);
                        }}
                      >
                        <GrEdit
                          className='self-center'
                          size={20}
                          color='#1a3d57'
                        />
                      </div>
                    </Tooltip>
                    <div
                      className='flex h-12 w-12
                      justify-center align-middle self-center'
                    >
                      <Divider orientation='vertical' />
                    </div>
                    <Tooltip content='Delete?'>
                      <div
                        className='cursor-pointer rounded-full flex h-12 w-12
                      justify-center align-middle self-center hover:bg-[#ff000010] hover:border-[#ff000010]'
                        onClick={() => handleDelete(data.id)}
                      >
                        <BiSolidTrash
                          className='self-center text-[border]'
                          size={20}
                          color='#ff0000'
                        />
                      </div>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Modal
        backdrop={'blur'}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable
        shadow='sm'
        placement='top-center'
        className='md:h-auto h-3/4 md:mx-0 mx-10 object-contain'
      >
        <ModalContent>
          {(onClose) => (
            <div className='grid grid-cols-1 md:justify-self-end justify-self-center w-auto'>
              <Card
                className='h-auto w-auto border-2 aspect-auto border-solid border-[#ff0000]'
                radius='md'
                disableRipple
              >
                <ImageData
                  disableAnimation
                  removeWrapper
                  fallbackSrc={'/images/smartbuys_logo.png'}
                  loading='eager'
                  shadow='sm'
                  radius='sm'
                  alt={singleProduct!.name}
                  className={classNames({
                    'w-[100vw] h-full object-cover z-0': true,
                    'pointer-events-none':
                      process.env.NODE_ENV === 'production',
                  })}
                  src={singleProduct!.image}
                />
              </Card>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
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

export default ProductManagerPage;
