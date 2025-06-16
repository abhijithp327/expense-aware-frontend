import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { budget } from '../services/budget';





const initialState = {

    // get all budgets
    isBudgetAllLoading: false,
    isBudgetAllLoaded: false,
    isBudgetAllLoadError: false,
    budgets: [],

    // create Budget
    isBudgetCreating: false,
    isBudgetCreated: false,
    isBudgetCreatedError: false,

    //   update Budget
    isBudgetUpdating: false,
    isBudgetUpdated: false,
    isBudgetUpdatedError: false,

    // delete Budget
    isBudgetDeleting: false,
    isBudgetDeleted: false,
    isBudgetDeletedError: false,

};


export const getAllBudgets = createAsyncThunk(
    "getAllBudgets",
    async (_, thunkAPI) => {
        try {
            const response = await budget.getAllBudgets();
            return thunkAPI.fulfillWithValue(response.data.result);
        } catch (error) {
            console.log("Get all budgets error:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);


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


export const updateBudget = createAsyncThunk(
    "updateBudget",
    async (data, thunkAPI) => {
        try {
            const response = await budget.updateBudget(data);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("update budget:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const deleteBudget = createAsyncThunk(
    "deleteBudget",
    async (id, thunkAPI) => {
        try {
            const response = await budget.deleteBudget(id);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("delete budget:", error);
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
            .addCase(getAllBudgets.pending, (state) => {
                state.isBudgetAllLoading = true;
                state.isBudgetAllLoaded = false;
                state.isBudgetAllLoadError = false
            })
            .addCase(getAllBudgets.fulfilled, (state, action) => {
                state.isBudgetAllLoading = false;
                state.isBudgetAllLoaded = true;
                state.isBudgetAllLoadError = false;
                state.budgets = action.payload;
            })
            .addCase(getAllBudgets.rejected, (state) => {
                state.isBudgetAllLoading = false;
                state.isBudgetAllLoaded = false;
                state.isBudgetAllLoadError = true;
            })

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

            .addCase(updateBudget.pending, (state) => {
                state.isBudgetUpdating = true;
                state.isBudgetUpdated = false;
                state.isBudgetUpdatedError = false
            })

            .addCase(updateBudget.fulfilled, (state) => {
                state.isBudgetUpdating = false;
                state.isBudgetUpdated = true;
                state.isBudgetUpdatedError = false;
            })

            .addCase(updateBudget.rejected, (state) => {
                state.isBudgetUpdating = false;
                state.isBudgetUpdated = false;
                state.isBudgetUpdatedError = true;
            })

            .addCase(deleteBudget.pending, (state) => {
                state.isBudgetDeleting = true;
                state.isBudgetDeleted = false;
                state.isBudgetDeletedError = false
            })

            .addCase(deleteBudget.fulfilled, (state) => {
                state.isBudgetDeleting = false;
                state.isBudgetDeleted = true;
                state.isBudgetDeletedError = false;
            })

            .addCase(deleteBudget.rejected, (state) => {
                state.isBudgetDeleting = false;
                state.isBudgetDeleted = false;
                state.isBudgetDeletedError = true;
            });

    },
});




export default budgetSlice.reducer;
