import { createSlice } from '@reduxjs/toolkit';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { persistReducer } from 'reduxjs-toolkit-persist';

const persistConfig = {
  key: 'auth',
  storage,
};

const initialState = {
  value: null,
  role: null,
  inTotal: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setIncomesTotal: (state, action) => {
      state.inTotal = action.payload;
    },
    logout: state => {
      state.value = null;
      state.role = null;
      state.inTotal = 0;
    },
  },
});

export const { login, logout, setRole, setIncomesTotal } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
