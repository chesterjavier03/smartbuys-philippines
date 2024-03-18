'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Spinner,
  Button,
  Pagination,
  Card,
  Modal,
  ModalContent,
  useDisclosure,
  Image,
} from '@nextui-org/react';
import { Product } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { list } from 'postcss';
import React, { useState } from 'react';
import { convertMoney } from '../_utility/MoneyFormatter';

const ProductManagerPage = () => {
  const { data: products, error, isLoading } = useProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productData, setProductData] = useState<Product[]>(products ?? []);
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(productData.length / rowsPerPage);
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedItem, setSelectedItem] = useState<Product>();

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...productData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [productData, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  // const sortedItems = React.useMemo(() => {
  //   return [...items].sort((a: Product, b: Product) => {
  //     const first = a[sortDescriptor.column as keyof Product] as number;
  //     const second = b[sortDescriptor.column as keyof Product] as number;
  //     const cmp = first < second ? -1 : first > second ? 1 : 0;

  //     return sortDescriptor.direction === 'descending' ? -cmp : cmp;
  //   });
  // }, [sortDescriptor, items]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex flex-row flex-wrap self-center">
        <Pagination
          showControls
          classNames={{
            base: 'justify-center align-center',
            cursor: 'bg-foreground text-background',
          }}
          color="success"
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <div className="p-10 justify-between align-middle grid grid-cols-1 gap-5">
        <Card radius="md" shadow="lg" className="p-5">
          <div className="text-xl font-semibold">Product List</div>
          <Table
            isCompact
            aria-label="Example static collection table"
            isHeaderSticky
            radius="sm"
            bottomContent={bottomContent}
            color="success"
            fullWidth
            shadow="lg"
            selectionBehavior="replace"
            selectionMode="single"
            classNames={{
              base: 'h-full overflow-scroll',
              table: 'h-full',
            }}
          >
            <TableHeader>
              <TableColumn align="center" allowsSorting isRowHeader>
                NAME
              </TableColumn>
              <TableColumn align="center" allowsSorting isRowHeader>
                ROLE
              </TableColumn>
              <TableColumn align="center" allowsSorting isRowHeader>
                TYPE
              </TableColumn>
              <TableColumn align="center" allowsSorting isRowHeader>
                CATEGORY
              </TableColumn>
              <TableColumn align="center" allowsSorting isRowHeader>
                PRICE
              </TableColumn>
              <TableColumn
                isRowHeader
                className="flex justify-center align-middle items-center"
              >
                ACTION
              </TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={<div>No Products to display</div>}
              items={items}
              isLoading={isLoading}
              onError={() => {}}
              loadingContent={
                <Spinner
                  color="success"
                  size="lg"
                  className="flex h-[calc(100vh-4rem)] align-middle justify-center justify-items-center content-center overflow-hidde"
                />
              }
            >
              {items.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.type}</TableCell>
                  <TableCell>{data.category}</TableCell>
                  <TableCell>{convertMoney(data.price)}</TableCell>
                  <TableCell>
                    <div className="flex flex-row justify-around align-middle w-auto">
                      <Button
                        size="sm"
                        color="primary"
                        onClick={() => {
                          setSelectedItem(data);
                          onOpen();
                        }}
                      >
                        Edit
                      </Button>
                      <Button size="sm" className="bg-[#ff0000] text-white">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      <Modal
        backdrop={'blur'}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable
        shadow="sm"
        placement="top-center"
        className="md:h-auto h-3/4 md:mx-0 mx-10 object-contain"
      >
        <ModalContent>{(onClose) => <>{selectedItem?.name}</>}</ModalContent>
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
