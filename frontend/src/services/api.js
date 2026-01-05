import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const uploadDataset = async (file, context = 'analytics') => {
  const formData = new FormData();
  
  formData.append('file', file);
  formData.append('context', context); // We keep this for profile switching!

  try {
    const response = await axios.post(`${API_URL}/evaluate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getFixSuggestions = async (issue) => {
  try {
    const response = await axios.post(`${API_URL}/fix`, { issue });
    return response.data.fix;
  } catch (error) {
    console.error("Fix Error:", error);
    return "Unable to connect to AI for help.";
  }
};

export const sendChatMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data.reply;
  } catch (error) {
    console.error("Chat Error:", error);
    return "Error connecting to AI.";
  }
};