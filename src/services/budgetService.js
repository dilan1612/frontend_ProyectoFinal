import axios from 'axios';

const API_URL = 'http://localhost:5000/api/budgets';

export const getBudgets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBudget = async (budget) => {
  const response = await axios.post(`${API_URL}/create`, budget);
  return response.data;
};

export const updateBudget = async (id, updatedBudget) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedBudget);
  return response.data;
};

export const deleteBudget = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
