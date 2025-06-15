import axios from '../lib/axios';



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

};


export default expense;