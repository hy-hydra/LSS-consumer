import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  searchType: 'products',
  searchValue: '',
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

    // SET SEARCH TYPE
    setSearchTypes(state, action) {
      const type = action.payload;
      state.searchType = type;
      state.searchValue = '';
    },

    // SET SEARCH VALUE
    setSearchValues(state, action) {
      const value = action.payload;
      state.searchValue = value;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function setSearchType(type) {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(slice.actions.setSearchTypes(type));
    }, 10);
  };
}

export function setSearchValue(value) {
  return async (dispatch) => {
    dispatch(slice.actions.setSearchValues(value));
  };
}
