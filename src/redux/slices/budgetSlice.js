import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { budget } from '../services/budget';





const initialState = {

    // get all categories
    // isBudgetAllLoading: false,
    // isBudgetAllLoaded: false,
    // isBudgetAllLoadError: false,
    // categories: [],

    // create Budget
    isBudgetCreating: false,
    isBudgetCreated: false,
    isBudgetCreatedError: false,


};


// export const getAllCategories = createAsyncThunk(
//     "getAllCategories",
//     async (_, thunkAPI) => {
//         try {
//             const response = await Budget.getCategories();
//             return thunkAPI.fulfillWithValue(response.data.result);
//         } catch (error) {
//             console.log("Get all categories error:", error);
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


export const createBudget = createAsyncThunk(
    "createBudget",
    async (data, thunkAPI) => {
        try {
            const response = await budget.createBudget(data);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("create budget:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);



const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(getAllCategories.pending, (state) => {
            //     state.isBudgetAllLoading = true;
            //     state.isBudgetAllLoaded = false;
            //     state.isBudgetAllLoadError = false
            // })
            // .addCase(getAllCategories.fulfilled, (state, action) => {
            //     state.isBudgetAllLoading = false;
            //     state.isBudgetAllLoaded = true;
            //     state.isBudgetAllLoadError = false;
            //     state.categories = action.payload;
            // })
            // .addCase(getAllCategories.rejected, (state, action) => {
            //     state.isBudgetAllLoading = false;
            //     state.isBudgetAllLoaded = false;
            //     state.isBudgetAllLoadError = true;
            // })

            .addCase(createBudget.pending, (state) => {
                state.isBudgetCreating = true;
                state.isBudgetCreated = false;
                state.isBudgetCreatedError = false
            })
            .addCase(createBudget.fulfilled, (state) => {
                state.isBudgetCreating = false;
                state.isBudgetCreated = true;
                state.isBudgetCreatedError = false;
            })
            .addCase(createBudget.rejected, (state, action) => {
                state.isBudgetCreating = false;
                state.isBudgetCreated = false;
                state.isBudgetCreatedError = true;
            })

    },
});




export default budgetSlice.reducer;
