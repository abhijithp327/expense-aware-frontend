import axios from '../lib/axios';
import { updateBudget } from '../slices/budgetSlice';



const expense = {

    createExpense: async (data) => {
        try {
            const result = await axios.post('/expenses/create', data);
            return result;
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    getExpenses: async (month) => {
        try {
            const result = await axios.get(`/expenses/get-all-expenses?month=${month}`);
            return result;
        } catch (error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }
    },

    updateExpense: async (data) => {
        try {
            const result = await axios.put(`/expenses/update/${data.id}`, data);
            return result;
        } catch (error) {
            console.error('Error updating expense:', error);
            throw error;
        }
    },

    deleteExpense: async (expenseId) => {
        try {
            const result = await axios.delete(`/expenses/delete/${expenseId}`);
            return result;
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    },

};


export default expense;