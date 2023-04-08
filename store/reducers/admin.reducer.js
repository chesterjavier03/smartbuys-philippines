import { createSlice } from '@reduxjs/toolkit';
import {
  adminDeleteProduct,
  adminFetchOrderList,
  adminFetchProductList,
  adminFetchUserList,
  adminFilterProductListByCategory,
  adminFilterProductListByType,
} from 'store/actions/admin.actions';

const DEFAULT_STATE = {
  loading: false,
  users: [],
  orders: [],
  products: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState: DEFAULT_STATE,
  reducers: {
    signOutAdminUser: (state) => {
      state.loading = false;
      state.users = [];
      state.orders = [];
      state.products = [];
    },
    adminUpdateUser: (state, action) => {
      const updateUser = action.payload;
      const userList = state.users.map((user) =>
        user.email === updateUser.email
          ? {
              ...user,
            }
          : user
      );
      state.users = userList;
    },
    adminAddUser: (state, action) => {
      const newUser = action.payload;
      const existUser = state.users.find((user) =>
        user.email === newUser.email ? true : false
      );
      const userList = existUser
        ? state.users.map((user) =>
            user.email === existUser.email ? newUser : user
          )
        : [...state.users, newUser];
      state.users = userList;
    },
    adminRemoveUser: (state, action) => {
      const removeUser = action.payload;
      const userList = state.users.filter((user) =>
        user.email === removeUser.email ? false : true
      );
      state.users = userList;
    },
    adminUpdateProduct: (state, action) => {
      const updateProduct = action.payload;
      const productList = state.products.map((product) =>
        product._id === updateProduct._id
          ? {
              ...product,
            }
          : product
      );
      state.products = productList;
    },
    adminAddProduct: (state, action) => {
      const newProduct = action.payload;
      const existProduct = state.products.find((product) =>
        product._id === newProduct._id ? true : false
      );
      const productList = existProduct
        ? state.products.map((product) =>
            product._id === existProduct._id ? newProduct : product
          )
        : [...state.products, newProduct];
      state.products = productList;
    },
    adminRemoveProduct: (state, action) => {
      const productList = state.products.filter((product) =>
        product._id === action.payload._id ? false : true
      );
      state.products = productList;
    },
    adminFilterProductByCategory: (state, action) => {
      const productList = state.products.filter((product) =>
        product.category === action.payload ? true : false
      );
      state.products = productList;
    },
    adminFilterProductByType: (state, action) => {
      const productList = state.products.filter((product) =>
        product.type === action.payload ? true : false
      );
      state.products = productList;
    },
    adminUpdateOrder: (state, action) => {
      const updateProduct = action.payload;
      const productList = state.products.map((product) =>
        product._id === updateProduct._id
          ? {
              ...product,
            }
          : product
      );
      state.products = productList;
    },
    adminAddOrder: (state, action) => {
      const newOrder = action.payload;
      const existOrder = state.orders.find((order) =>
        order._id === newOrder._id ? true : false
      );
      const orderList = existOrder
        ? state.orders.map((order) =>
            order._id === existOrder._id ? newOrder : order
          )
        : [...state.orders, newOrder];
      state.orders = orderList;
    },
    adminRemoveOrder: (state, action) => {
      const orderList = state.orders.filter((order) =>
        order._id === action.payload._id ? false : true
      );
      state.orders = orderList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminFetchUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminFetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(adminFetchUserList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(adminFetchProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminFetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(adminFetchProductList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(adminFilterProductListByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminFilterProductListByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(adminFilterProductListByCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(adminFilterProductListByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminFilterProductListByType.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(adminFilterProductListByType.rejected, (state) => {
        state.loading = false;
      })
      .addCase(adminDeleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminDeleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(adminDeleteProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(adminFetchOrderList.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminFetchOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(adminFetchOrderList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  adminUpdateUser,
  adminAddUser,
  adminRemoveUser,
  adminUpdateProduct,
  adminAddProduct,
  adminRemoveProduct,
  adminFilterProductByCategory,
  adminFilterProductByType,
  adminUpdateOrder,
  adminAddOrder,
  adminRemoveOrder,
  signOutAdminUser,
} = adminSlice.actions;
export default adminSlice.reducer;
