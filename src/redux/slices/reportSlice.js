import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import report from '../services/report';



const initialState = {

    // get  report with monthly
    isReportAllLoading: false,
    isReportAllLoaded: false,
    isReportAllLoadError: false,
    reports: [],


};



export const getAllMonthlyReports = createAsyncThunk(
    "getAllMonthlyReports",
    async (month, thunkAPI) => {
        try {
            const response = await report.getAllMonthlyReports(month);
            // console.log("result of Report", response);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log("create Report:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);



const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isReportAllLoading = true;
                state.isReportAllLoaded = false;
                state.isReportAllLoadError = false
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isReportAllLoading = false;
                state.isReportAllLoaded = true;
                state.isReportAllLoadError = false;
                state.reports = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isReportAllLoading = false;
                state.isReportAllLoaded = false;
                state.isReportAllLoadError = true;
            })

    },
});




export default reportSlice.reducer;
