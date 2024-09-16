import { auth } from '@/server/auth';
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react';
import ProductForm from './product-form';

const AddProduct = async () => {
  const session = await auth();
  if (session?.user.role !== Role.ADMIN) return redirect('/dashboard/settings');

  return <ProductForm />;
};

export default AddProduct;
