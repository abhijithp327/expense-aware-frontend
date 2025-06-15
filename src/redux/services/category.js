import axios from '../lib/axios';

const category = {

  getCategories: async () => {
    try {
      const result = await axios.get('/categories/get-all');
    //   console.log('Fetched categories:', result);
      return result;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  createCategory: async (data) => {
    try {
      const result = await axios.post('/categories/create', data);
      return result;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

    
};

export default category;
