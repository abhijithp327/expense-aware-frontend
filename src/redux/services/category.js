
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


  updateCategory: async (data) => {
    try {
      const result = await axios.put(`/categories/update/${data.id}`, data);
      return result;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      const result = await axios.delete(`/categories/delete/${id}`);
      return result;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }


};

export default category;
