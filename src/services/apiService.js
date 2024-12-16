import axios from 'axios';

const API_URL = 'https://backend-proyectofinal-4qkh.onrender.com/budgets'; // Aquí se ajusta la URL base

// Función para obtener el token JWT almacenado
const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

// Configurar axios para que envíe el token JWT en el encabezado de las solicitudes
axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para obtener todos los presupuestos
export const getBudgets = () => {
  return axios.get(`${API_URL}/budgets`);
};

// Función para obtener un presupuesto por su ID
export const getBudgetById = (id) => {
  return axios.get(`${API_URL}/budgets/${id}`);
};

// Función para crear un presupuesto
export const createBudget = (budgetData) => {
  return axios.post(`${API_URL}/budgets`, budgetData);
};

// Función para actualizar un presupuesto
export const updateBudget = (id, budgetData) => {
  return axios.put(`${API_URL}/budgets/${id}`, budgetData);
};

// Función para eliminar un presupuesto
export const deleteBudget = (id) => {
  return axios.delete(`${API_URL}/budgets/${id}`);
};
