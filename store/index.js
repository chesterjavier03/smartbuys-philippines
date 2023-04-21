import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './reducers/notifications.reducer';
import userReducer from './reducers/user.reducer';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import orderReducer from './reducers/order.reducer';
import productReducer from './reducers/product.reducer';
import adminReducer from './reducers/admin.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  key: 'smartbuys_storage',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: [thunk],
});

export const persistor = persistStore(store);
