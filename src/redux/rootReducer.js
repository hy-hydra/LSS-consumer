import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import productReducer from './slices/product';
import coolstaffReducer from './slices/coolStaff';
import orderReducer from './slices/order';
import searchReducer from './slices/search';
import userReducer from './slices/user';

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  coolstaff: coolstaffReducer,
  order: orderReducer,
  search: searchReducer,
  user: userReducer,
  product: persistReducer(productPersistConfig, productReducer),
});

export default rootReducer;
