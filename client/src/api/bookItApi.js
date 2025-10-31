import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

export const getExperiences = async () => {
  const res = await axios.get(`${BASE_URL}/experiences`);
  return res.data;
};
export const getExperienceById = async (id) => {
  const res = await axios.get(`${BASE_URL}/experiences/${id}`);
  return res.data;
};
export const createBooking = async (data) => {
  const res = await axios.post(`${BASE_URL}/bookings`, data);
  return res.data;
};
export const validatePromo = async (promoCode) => {
  const res = await axios.post(`${BASE_URL}/promo/validate`, { promoCode });
  return res.data;
};
