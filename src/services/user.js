import axios from '../utils/axios';

export const getMyInfo = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(`/users/me/`, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

export const userUpdate = async (userInfo) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.put(`/users/account/update-user/`, userInfo, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

export const createPayment = async (paymentInfo) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(`/users/payment/`, paymentInfo, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};
