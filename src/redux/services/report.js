import axios from '../lib/axios';



const report = {

    getAllMonthlyReports: async (month) => {
        try {
            const result = await axios.get(`/reports/get-monthly-report?month=${month}`);
            return result;
        } catch (error) {
            console.error('Error fetching report:', error);
            throw error;
        }
    },

};


export default report;