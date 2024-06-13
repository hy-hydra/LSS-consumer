import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  userError: null,
  users: [],
  currentUser: [],
  paymentMethod: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.userError = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.currentUser = action.payload;
    },

    // GET PAYMENT METHOD
    getPaymentMethod(state, action) {
      state.isLoading = false;
      state.paymentMethod = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers(page, search = '', order_by = 'username', desc = true) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/users', {
        params: { p: page, page_size: 10, is_active: true, search, order_by, desc },
      });
      console.log('firstfirstfirst', response.data.results);
      dispatch(slice.actions.getUsersSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/users/${id}`);
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPaymentMethod(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/users/payment/${id}`);
      dispatch(slice.actions.getPaymentMethod(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
