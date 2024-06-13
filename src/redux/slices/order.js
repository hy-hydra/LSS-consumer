import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
  order: [],
};

const slice = createSlice({
  name: 'order',
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

    // GET ORDERS
    getOrdersSuccess(state, action) {
      state.isLoading = false;
      state.orders = action.payload;
    },

    // UPDATE ORDER
    updateOrder(state, action) {
      state.isLoading = false;
      const updatedOrder = action.payload;

      const updatedOrders = state.orders.map((order) => {
        if (order.id === updatedOrder.id) {
          return {
            ...order,
            order_status: updatedOrder.order_status,
          };
        }
        return order;
      });

      state.orders = updatedOrders;
    },

    // CREATE ORDER
    createOrder(state, action) {
      state.isLoading = false;
      state.order = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getOrders(type) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/orders/orderDetails', {
        params: { order_status: type },
      });
      dispatch(slice.actions.getOrdersSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateOrder(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/orders/orderDetails/${id}`, data);
      dispatch(slice.actions.updateOrder(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createOrder() {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('orders/orderDetails');
      dispatch(slice.actions.createOrder(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
