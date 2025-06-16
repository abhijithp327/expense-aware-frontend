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

    // update category
    isCategoryUpdating: false,
    isCategoryUpdated: false,
    isCategoryUpdatedError: false,

    // Delete category
    isCategoryDeleting: false,
    isCategoryDeleted: false,
    isCategoryDeletedError: false,

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


export const updateCategory = createAsyncThunk(
    "updateCategory",
    async (data, thunkAPI) => {
        try {
            const response = await category.updateCategory(data);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("Get all categories error:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "deleteCategory",
    async (id, thunkAPI) => {
        try {
            const response = await category.deleteCategory(id);
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

            .addCase(updateCategory.pending, (state) => {
                state.isCategoryUpdating = true;
                state.isCategoryUpdated = false;
                state.isCategoryUpdatedError = false
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.isCategoryUpdating = false;
                state.isCategoryUpdated = true;
                state.isCategoryUpdatedError = false;
            })

            .addCase(updateCategory.rejected, (state, action) => {
                state.isCategoryUpdating = false;
                state.isCategoryUpdated = false;
                state.isCategoryUpdatedError = true;
            })

            .addCase(deleteCategory.pending, (state) => {
                state.isCategoryDeleting = true;
                state.isCategoryDeleted = false;
                state.isCategoryDeletedError = false
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.isCategoryDeleting = false;
                state.isCategoryDeleted = true;
                state.isCategoryDeletedError = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isCategoryDeleting = false;
                state.isCategoryDeleted = false;
                state.isCategoryDeletedError = true;
            })

    },
});




export default categorySlice.reducer;
