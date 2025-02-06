import axios from 'axios';

const api = axios.create({
  //  baseURL: 'http://localhost:8080/birds/api/v1/', 
  baseURL: 'https://base.ewnc.org/birds/api/v1/',
  timeout: 10000, // Устанавливаем таймаут для запросов
});

export default api;

api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  console.log('token=', token);
  if (token) {
    req.headers.Authorization = `Token ${token}`;
  }
  return req;
})

export const loadVolunteers = async () => {
  try {
    const response = await api.get('/volunteers');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const loadHQ = async () => {
  try {
    const response = await api.get('/hq');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const loadShifts = async () => {
  try {
    const response = await api.get('/shifts');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// // Здесь мы можем позже интегрировать API запросы
// export const getShifts = () => {
//   return [
//     { id: 1, name: 'Смена 1', description: 'Описание смены 1' },
//     { id: 2, name: 'Смена 2', description: 'Описание смены 2' },
//     { id: 3, name: 'Смена 3', description: 'Описание смены 3' }
//   ]
// }

