import api from './api';

export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch workouts' };
  }
};

export const getWorkoutById = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch workout' };
  }
};

export const createWorkout = async (workoutData) => {
  try {
    const response = await api.post('/workouts', workoutData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create workout' };
  }
};

export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await api.put(`/workouts/${id}`, workoutData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update workout' };
  }
};

export const deleteWorkout = async (id) => {
  try {
    const response = await api.delete(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete workout' };
  }
};
