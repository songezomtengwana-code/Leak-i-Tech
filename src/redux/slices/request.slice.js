import defaultExport from '@react-native-firebase/firestore';
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';

const requestSlice = createSlice({
    name: 'requests',
    initialState: [],
    reducers: {
        addRequest(state, action) {
            const { id, postedon, authorName, authorTag, category, imagesrc, description, location, geolocation, isTerminated, isApproved } = action.payload
            state.push({ id: uuid(), postedon: Date.now(), authorName, authorTag, category, imagesrc, description, location, geolocation, isTerminated: false, isApproved: false })
        },
    }
})

export const { addRequest } = requestSlice.actions
export default requestSlice.reducer