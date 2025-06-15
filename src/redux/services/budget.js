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

};


