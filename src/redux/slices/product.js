import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  selectedCategory: null,
  error: null,
  products: [],
  categories: [],
  product: null,
  search: 'products',
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: null,
    billing: null,
    paymentMethodId: 0,
    paymentMethods: [
      {
        created_at: '2023-11-07T19:05:13.739537Z',
        cvc: null,
        date: null,
        id: 0,
        is_default: true,
        is_deleted: false,
        method: 'bank',
        modified_at: '2023-11-07T19:05:03.714888Z',
        name: 'Adam',
        provider: '1231231231231232346583',
        user_id: 11,
      },
      {
        created_at: '2023-11-08T11:14:21.524444Z',
        cvc: '123',
        date: '2023-11-23T00:00:00Z',
        id: 1,
        is_default: false,
        is_deleted: false,
        method: 'card',
        modified_at: '2023-11-08T11:14:21.524459Z',
        name: 'asdasd',
        provider: '123123123123123123123',
        user_id: 11,
      },
    ],
    shippingPrice: 0,
    totalItems: 0,
  },
  page: 1,
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // GET CATEGORIES
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },

    // SET CATEGORY TO GET PRODUCT
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const totalItems = sum(cart.map((product) => product.quantity));
      const subtotal = sum(cart.map((product) => product.price * product.quantity));
      state.checkout.cart = cart;
      state.checkout.discount = state.checkout.discount || 0;
      state.checkout.shipping = state.checkout.shipping || null;
      state.checkout.billing = state.checkout.billing || null;
      state.checkout.shippingPrice = state.checkout.shippingPrice || 0;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - state.checkout.discount;
      state.checkout.totalItems = totalItems;
    },

    addToCart(state, action) {
      const newProduct = action.payload;
      const isEmptyCart = !state.checkout.cart.length;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, newProduct];
      } else {
        state.checkout.cart = state.checkout.cart.map((product) => {
          const isExisted = product.id === newProduct.id;

          if (isExisted) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }

          return product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, newProduct], 'id');
      state.checkout.totalItems = sum(state.checkout.cart.map((product) => product.quantity));
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((product) => product.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.cart = [];
      state.checkout.billing = null;
      state.checkout.activeStep = 0;
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = null;
      state.checkout.shippingPrice = null;
      state.checkout.totalItems = 0;
    },

    backStep(state) {
      state.checkout.activeStep -= 1;
    },

    nextStep(state) {
      state.checkout.activeStep += 1;
    },

    gotoStep(state, action) {
      const step = action.payload;
      state.checkout.activeStep = step;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;

      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    createShipping(state, action) {
      state.checkout.shipping = action.payload;
    },

    applyPaymentMethod(state, action) {
      state.checkout.paymentMethodId = action.payload;
    },

    setPaymentMethod(state, action) {
      state.checkout.paymentMethod = action.paymentMethod;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shippingPrice = action.payload;
      state.checkout.shippingPrice = shippingPrice;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shippingPrice;
    },

    // SEARCH PRODCUT / PEOPLE
    setSearchTypes(state, action) {
      const type = action.payload;
      state.search = type;
    },

    // ORDER
    getOrders(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    setPageNumber(state, action) {
      state.page = action.payload;
    },

    createOrder(state, action) {
      // const newOrder = action.payload;
      // const isEmptyOrder = !state.orders.length;
      // state.orders = [...state.orders, newOrder];
      // state.checkout.cart = uniqBy([...state.checkout.cart, newProduct], 'id');
      // state.checkout.totalItems = sum(state.checkout.cart.map((product) => product.quantity));
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  deleteCart,
  createBilling,
  createShipping,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  setSearchTypes,
  applyPaymentMethod,
  setPaymentMethod,
  setSelectedCategory,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts(page, search = '', category_id = null) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/products', {
        params: { p: page, page_size: 5, is_active: true, search, category_id, is_published: true },
      });
      dispatch(slice.actions.getProductsSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/products/${id}`);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCategories() {
  return async (dispatch) => {
    try {
      const response = await axios.get('/admin/categories', {
        params: { is_active: true, is_deleted: false },
      });
      dispatch(slice.actions.getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setSearchType(type) {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(slice.actions.setSearchTypes(type));
    }, 10);
  };
}

// ----------------------------------------------------------------------

export function getOrders(type) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('https://longstory.sh/api/orders/orderDetails');
      // console.log(response.data);
      // dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
