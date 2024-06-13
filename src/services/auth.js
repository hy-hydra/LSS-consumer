import axios from '../utils/axios'; // Import the custom Axios instance

export const mailVerifying = async (uidb64, token) => {
  try {
    const response = await axios.get(`/users/account/activate/${uidb64}/${token}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

export const resendMailVerifying = async () => {
  try {
    const response = await axios.post(`/users/resend-activation-mail/`);
    return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};
