'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { convertMoney } from '@/lib/money-formatter';
import { deleteProduct } from '@/server/actions/delete-product';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash, Trash2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

const ActionCell = ({
  row,
}: {
  row: Row<{
    name: string;
    price: number;
    image: string;
    id: string;
  }>;
}) => {
  const { execute, status } = useAction(deleteProduct, {
    onSuccess: (result) => {
      if (result.data?.error) {
        toast.error(result.data.error);
      }
      if (result.data?.success) {
        toast.success(result.data.success);
      }
    },
    onExecute: () => {
      toast.loading('Deleting Product...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const product = row.original;

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant={'ghost'} className="h-8 w-8 p-0">
    //       <MoreHorizontal className="h-5 w-4" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
    //       <Link href={`/dashboard/add-product?id=${product.id}`}>
    //         Edit Product
    //       </Link>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem
    //       onClick={() => execute({ id: product.id })}
    //       className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer"
    //     >
    //       Delete Product
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div className="font-medium cursor-pointer flex flex-row gap-3 justify-start">
      <div className="group">
        <Link href={`/dashboard/add-product?id=${product.id}`}>
          <Edit className="text-SBP_BLUE  group-hover:scale-125 transition-all duration-300 ease-in-out" />
        </Link>
      </div>
      <div className="group">
        <Trash2
          className="text-SBP_RED group-hover:scale-125 transition-all duration-300 ease-in-out"
          onClick={() => execute({ id: product.id })}
        />
      </div>
    </div>
  );
};

export const Columns: ColumnDef<{
  name: string;
  price: number;
  image: string;
  id: string;
}>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return (
        <div className="font-medium text-sm truncate sm:w-full w-24 text-ellipsis">
          {row.getValue('id')}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="font-medium text-sm truncate sm:w-full w-28 text-ellipsis">
          {row.getValue('name')}
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      return <div className="font-medium text-xs">{convertMoney(price)}</div>;
    },
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const cellImage = row.getValue('image') as string;
      const cellTitle = row.getValue('name') as string;
      return (
        <div className="">
          <Image
            src={cellImage}
            alt={cellTitle}
            width={50}
            height={50}
            loading="eager"
            fetchPriority="high"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            className="rounded-md object-cover"
          />
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ActionCell,
  },
];

export default ActionCell;
