import { configureStore } from '@reduxjs/toolkit';
import requestSlice from './slices/request.slice';
import categorySlice from './slices/category.slice';

export const store = configureStore({
    reducer: {
        category: categorySlice 
    },
})