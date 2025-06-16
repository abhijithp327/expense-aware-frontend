import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expense from '../services/expense';





const initialState = {

    // get all // expenses
    isExpenseAllLoading: false,
    isExpenseAllLoaded: false,
    isExpenseAllLoadError: false,
    expenses: [],

    // create Expense
    isExpenseCreating: false,
    isExpenseCreated: false,
    isExpenseCreatedError: false,


    // update expense
    isExpenseUpdating: false,
    isExpenseUpdated: false,
    isExpenseUpdateError: false,


    // delete Expense
    isExpenseDeleting: false,
    isExpenseDeleted: false,
    isExpenseDeleteError: false,


};


export const getAllExpenses = createAsyncThunk(
    "getAllExpenses",
    async (month, thunkAPI) => {
        try {
            const response = await expense.getExpenses(month);
            return thunkAPI.fulfillWithValue(response.data.result);
        } catch (error) {
            console.log("Get all expenses error:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);


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


export const updateExpense = createAsyncThunk(
    "updateExpense",
    async (data, thunkAPI) => {
        try {
            const response = await expense.updateExpense(data);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("update Expense:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const deleteExpense = createAsyncThunk(
    "deleteExpense",
    async (expenseId, thunkAPI) => {
        try {
            const response = await expense.deleteExpense(expenseId);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("delete Expense:", error);
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
            .addCase(getAllExpenses.pending, (state) => {
                state.isExpenseAllLoading = true;
                state.isExpenseAllLoaded = false;
                state.isExpenseAllLoadError = false
            })
            .addCase(getAllExpenses.fulfilled, (state, action) => {
                state.isExpenseAllLoading = false;
                state.isExpenseAllLoaded = true;
                state.isExpenseAllLoadError = false;
                state.expenses = action.payload;
            })
            .addCase(getAllExpenses.rejected, (state, action) => {
                state.isExpenseAllLoading = false;
                state.isExpenseAllLoaded = false;
                state.isExpenseAllLoadError = true;
            })

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

            .addCase(updateExpense.pending, (state) => {
                state.isExpenseUpdating = true;
                state.isExpenseUpdated = false;
                state.isExpenseUpdateError = false
            })

            .addCase(updateExpense.fulfilled, (state) => {
                state.isExpenseUpdating = false;
                state.isExpenseUpdated = true;
                state.isExpenseUpdateError = false;
            })

            .addCase(updateExpense.rejected, (state, action) => {
                state.isExpenseUpdating = false;
                state.isExpenseUpdated = false;
                state.isExpenseUpdateError = true;
            })

            .addCase(deleteExpense.pending, (state) => {
                state.isExpenseDeleting = true;
                state.isExpenseDeleted = false;
                state.isExpenseDeleteError = false
            })

            .addCase(deleteExpense.fulfilled, (state) => {
                state.isExpenseDeleting = false;
                state.isExpenseDeleted = true;
                state.isExpenseDeleteError = false;
            })

            .addCase(deleteExpense.rejected, (state, action) => {
                state.isExpenseDeleting = false;
                state.isExpenseDeleted = false;
                state.isExpenseDeleteError = true;
            })



    },
});




export default ExpenseSlice.reducer;
