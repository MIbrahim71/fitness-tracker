import api from './api';

export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getWorkoutById = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createWorkout = async (workoutData) => {
  try {
    const response = await api.post('/workouts', workoutData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await api.put(`/workouts/${id}`, workoutData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteWorkout = async (id) => {
  try {
    await api.delete(`/workouts/${id}`);
    return { success: true };
  } catch (error) {
    throw error.response.data;
  }
};


// Add other CRUD operations as needed
