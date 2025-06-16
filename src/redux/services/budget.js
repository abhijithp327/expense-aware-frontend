import axios from '../lib/axios';


export const budget = {

    createBudget: async (data) => {
        try {
            const result = await axios.post('/budgets/create', data);
            console.log("result of expense", result);
            return result;
        } catch (error) {
            console.error('Error creating budget:', error);
            throw error;
        }
    },

    getAllBudgets: async () => {
        try {
            const result = await axios.get('/budgets/get-all');
            console.log("result of fetching budgets", result);
            return result;
        } catch (error) {
            console.error('Error fetching budgets:', error);
            throw error;
        }
    },

    updateBudget: async (data) => {
        try {
            const result = await axios.put(`/budgets/update/${data.id}`, data);
            console.log("result of updating budget", result);
            return result;
        } catch (error) {
            console.error('Error updating budget:', error);
            throw error;
        }
    },

    deleteBudget: async (id) => {
        try {
            const result = await axios.delete(`/budgets/delete/${id}`);
            console.log("result of deleting budget", result);
            return result;
        } catch (error) {
            console.error('Error deleting budget:', error);
            throw error;
        }
    },

};


