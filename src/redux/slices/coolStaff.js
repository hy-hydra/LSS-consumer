import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  open: false,
};

const slice = createSlice({
  name: 'coolstaff',
  initialState,
  reducers: {
    openComponent(state) {
      state.open = true;
    },
    closeComponent(state) {
      state.open = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function openCoolStaff() {
  return async (dispatch) => {
    dispatch(slice.actions.openComponent());
  };
}

export function closeCoolStaff() {
  return async (dispatch) => {
    dispatch(slice.actions.closeComponent());
  };
}
