import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name: 'category',
    initialState: [],
    reducers: {
        addCategory(state, action) {
            const { category } = action.payload
            state.push({ category})
        },
    }
})

export const { addCategory } = requestSlice.actions
export default requestSlice.reducer