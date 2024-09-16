import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistance, subMinutes } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Orders = async () => {
  const user = await auth();

  if (!user) {
    redirect('/login');
  }

  const userOrders = await prisma?.orders.findMany({
    where: { userId: user.user.id },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>Check the status of your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of your recent purchase.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>₱&nbsp;{order.total}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      order.status === 'succeeded'
                        ? 'bg-SBP_GREEN hover:bg-SBP_GREEN/80 text-SBP_BLUE uppercase shadow-lg'
                        : 'bg-SBP_YELLOW hover:bg-SBP_YELLOW/80 text-SBP_RED uppercase shadow-lg'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {formatDistance(subMinutes(order.createdAt!, 0), new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'}>
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <DialogTrigger asChild>
                            <Button className="w-full h-6" variant={'ghost'}>
                              View Details
                            </Button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                        {order.receiptUrl ? (
                          <DropdownMenuItem>
                            <Button
                              asChild
                              variant={'ghost'}
                              className="w-full h-6"
                            >
                              <Link href={order.receiptUrl} target="_blank">
                                Download Receipt
                              </Link>
                            </Button>
                          </DropdownMenuItem>
                        ) : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="rounded-md max-w-4xl max-h-96 w-1/2 h-full">
                      <DialogHeader>
                        <DialogTitle>Order Details #{order.id}</DialogTitle>
                        <DialogDescription>
                          Your order total is ₱&nbsp;{order.total}
                        </DialogDescription>
                      </DialogHeader>
                      <Card className="overflow-auto p-2 flex flex-col gap-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Image</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Product</TableHead>
                              <TableHead>Quantity</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.orderProducts.map((orderProduct) => (
                              <TableRow key={orderProduct.id}>
                                <TableCell>
                                  <Image
                                    className="rounded-md"
                                    src={orderProduct.product.image}
                                    width={150}
                                    height={250}
                                    loading="eager"
                                    fetchPriority="high"
                                    style={{
                                      objectFit: 'cover',
                                      width: '100%',
                                      height: '100%',
                                    }}
                                    alt={orderProduct.product.name}
                                  />
                                </TableCell>
                                <TableCell>
                                  ₱&nbsp;{orderProduct.product.price}
                                </TableCell>
                                <TableCell>
                                  {orderProduct.product.name}
                                </TableCell>
                                <TableCell>{orderProduct.quantity}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Card>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
