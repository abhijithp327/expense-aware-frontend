import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expense from '../services/expense';





const initialState = {

    // get all categories
    // isExpenseAllLoading: false,
    // isExpenseAllLoaded: false,
    // isExpenseAllLoadError: false,
    // categories: [],

    // create Expense
    isExpenseCreating: false,
    isExpenseCreated: false,
    isExpenseCreatedError: false,


};


// export const getAllCategories = createAsyncThunk(
//     "getAllCategories",
//     async (_, thunkAPI) => {
//         try {
//             const response = await Expense.getCategories();
//             return thunkAPI.fulfillWithValue(response.data.result);
//         } catch (error) {
//             console.log("Get all categories error:", error);
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


export const createExpense = createAsyncThunk(
    "createExpense",
    async (data, thunkAPI) => {
        try {
            const response = await expense.createExpense(data);
            console.log("result of expense", response);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("create Expense:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);



const ExpenseSlice = createSlice({
    name: 'Expense',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(getAllCategories.pending, (state) => {
            //     state.isExpenseAllLoading = true;
            //     state.isExpenseAllLoaded = false;
            //     state.isExpenseAllLoadError = false
            // })
            // .addCase(getAllCategories.fulfilled, (state, action) => {
            //     state.isExpenseAllLoading = false;
            //     state.isExpenseAllLoaded = true;
            //     state.isExpenseAllLoadError = false;
            //     state.categories = action.payload;
            // })
            // .addCase(getAllCategories.rejected, (state, action) => {
            //     state.isExpenseAllLoading = false;
            //     state.isExpenseAllLoaded = false;
            //     state.isExpenseAllLoadError = true;
            // })

            .addCase(createExpense.pending, (state) => {
                state.isExpenseCreating = true;
                state.isExpenseCreated = false;
                state.isExpenseCreatedError = false
            })
            .addCase(createExpense.fulfilled, (state) => {
                state.isExpenseCreating = false;
                state.isExpenseCreated = true;
                state.isExpenseCreatedError = false;
            })
            .addCase(createExpense.rejected, (state, action) => {
                state.isExpenseCreating = false;
                state.isExpenseCreated = false;
                state.isExpenseCreatedError = true;
            })

    },
});




export default ExpenseSlice.reducer;
