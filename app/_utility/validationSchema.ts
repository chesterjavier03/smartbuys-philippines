import { optional, z } from 'zod';

export const productSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine(
      (file) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
          file?.type
        ),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  name: z.string().min(6, 'Name must be at least 6 characters.').max(50),
  description: z
    .string()
    .min(6, 'Description must be at least 6 characters')
    .max(255),
  price: z.string().min(1, 'Price must be at least 1 characters').max(4),
  category: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
});

export const editProductSchema = z.object({
  image: z
    .any()
    .optional()
    .nullable(),
  name: z.string().min(6, 'Name must be at least 6 characters.').max(50).optional().nullable(),
  description: z
    .string()
    .min(6, 'Description must be at least 6 characters')
    .max(255).optional().nullable(),
  price: z.string().min(1, 'Price must be at least 1 characters').max(4).optional().nullable(),
  category: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, 'Email is required').max(50),
});

export const orderSummarySchema = z.object({
  fullName: z.string().min(6, 'Name must be at least 6 characters.').max(50),
  address: z
    .string()
    .min(6, 'Address must be at least 6 characters')
    .max(255),
  email: z.string().email().optional(),
  mobile: z.string()
    .regex(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
    .min(1, 'Mobile number is required.').max(11),
});

export const contactUsSchema = z.object({
  name: z.string().min(6, 'Name must be at least 6 characters.').max(50),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(255),
  email: z.string().email().min(1, 'Email is required').max(50),
});

export const patchIssueSchema = z.object({
  title: z.string()
    .min(1, "Title is required.")
    .max(255)
    .optional(),
  description: z.string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z.string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable()
});
