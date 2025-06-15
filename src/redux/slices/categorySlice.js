import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import category from '../services/category';




const initialState = {

    // get all categories
    isCategoryAllLoading: false,
    isCategoryAllLoaded: false,
    isCategoryAllLoadError: false,
    categories: [],

    // create category
    isCategoryCreating: false,
    isCategoryCreated: false,
    isCategoryCreatedError: false,


};


export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async (_, thunkAPI) => {
        try {
            const response = await category.getCategories();
            return thunkAPI.fulfillWithValue(response.data.result);
        } catch (error) {
            console.log("Get all categories error:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const createCategory = createAsyncThunk(
    "createCategory",
    async (data, thunkAPI) => {
        try {
            const response = await category.createCategory(data);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("Get all categories error:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);



const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isCategoryAllLoading = true;
                state.isCategoryAllLoaded = false;
                state.isCategoryAllLoadError = false
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isCategoryAllLoading = false;
                state.isCategoryAllLoaded = true;
                state.isCategoryAllLoadError = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isCategoryAllLoading = false;
                state.isCategoryAllLoaded = false;
                state.isCategoryAllLoadError = true;
            })

            .addCase(createCategory.pending, (state) => {
                state.isCategoryCreating = true;
                state.isCategoryCreated = false;
                state.isCategoryCreatedError = false
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.isCategoryCreating = false;
                state.isCategoryCreated = true;
                state.isCategoryCreatedError = false;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isCategoryCreating = false;
                state.isCategoryCreated = false;
                state.isCategoryCreatedError = true;
            })

    },
});




export default categorySlice.reducer;
