// src/services/shiftService.js

import api from './api';

export const getShiftTypes = async () => {
  try {
    const response = await api.get('shifts/types', {
      headers: {
        'Authorization': 'Token b22b9cabbed38326c9a6a93e2f23372d29900b24',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных: ', error);
    throw error;  // Пробрасываем ошибку для дальнейшей обработки
  }
};

export const getTimeSlots = async () => {
  try {
    const response = await api.get('timeslots', {
      headers: {
        'Authorization': 'Token b22b9cabbed38326c9a6a93e2f23372d29900b24',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных: ', error);
    throw error;  // Пробрасываем ошибку для дальнейшей обработки
  }
};

export const getShifts = async () => {
  try {
    const response = await api.get('shifts', {
      headers: {
        'Authorization': 'Token b22b9cabbed38326c9a6a93e2f23372d29900b24',
        'Content-Type': 'application/json',
      }
    }); // Используем API для получения данных (в данном случае, список постов)

    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных: ', error);
    throw error;  // Пробрасываем ошибку для дальнейшей обработки
  }
};

