import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './reducers/notifications.reducer';
import userReducer from './reducers/user.reducer';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import orderReducer from './reducers/order.reducer';
import storage from 'redux-persist/lib/storage';
import productReducer from './reducers/product.reducer';
import adminReducer from './reducers/admin.reducer';

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     notification: notificationsReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  order: orderReducer,
  product: productReducer,
  admin: adminReducer,
});

const persistConfig = {
  key: 'smartbuys_root',
  storage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: true,
  //   }),
  middleware: [thunk],
});

export const persistor = persistStore(store);
