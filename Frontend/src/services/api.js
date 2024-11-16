import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Authentication
export const signUp = (userData) => API.post('/auth/signup', userData);
export const logIn = (userData) => API.post('/auth/login', userData);

// Car Management
export const createCar = (carData) => API.post('/cars', carData);
export const getCars = () => API.get('/cars');
export const searchCars = (keyword) => API.get(`/cars/search?keyword=${keyword}`);
export const getCarById = (id) => API.get(`/cars/${id}`);
export const updateCar = (id, carData) => API.put(`/cars/${id}`, carData);
export const deleteCar = (id) => API.delete(`/cars/${id}`);
