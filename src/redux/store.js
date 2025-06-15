import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import categoryReducer from '../redux/slices/categorySlice';
import budgetReducer from '../redux/slices/budgetSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    budget: budgetReducer,
  },
});

export default store;
